import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, model = "google/gemini-2.5-flash" } = await req.json();
    
    // Input validation
    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid prompt' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (prompt.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Prompt must be 2000 characters or less' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (prompt.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: 'Prompt must be at least 10 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    // Check and deduct credits (initialize if missing)
    const { data: creditsRow, error: creditsError } = await supabase
      .from('user_credits')
      .select('daily_credits')
      .eq('user_id', user.id)
      .maybeSingle();

    if (creditsError) {
      return new Response(
        JSON.stringify({ error: 'Failed to check credits' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let availableCredits = creditsRow?.daily_credits ?? null;

    if (availableCredits === null) {
      // Initialize credits for first-time users
      const { data: inserted, error: insertError } = await supabase
        .from('user_credits')
        .insert({ user_id: user.id, daily_credits: 10 })
        .select('daily_credits')
        .single();

      if (insertError) {
        return new Response(
          JSON.stringify({ error: 'Unable to initialize credits' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      availableCredits = inserted.daily_credits;
    }

    if ((availableCredits ?? 0) <= 0) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits' }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Deduct one credit
    const { error: deductError } = await supabase
      .from('user_credits')
      .update({ daily_credits: (availableCredits as number) - 1 })
      .eq('user_id', user.id);

    if (deductError) {
      return new Response(
        JSON.stringify({ error: 'Failed to deduct credit. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are an expert e-commerce website designer and developer. Generate a comprehensive JSON response for an e-commerce store.

IMPORTANT: Return ONLY valid JSON in this EXACT structure (no markdown, no code blocks):
{
  "storeName": "Store Name Here",
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Detailed product description (50-100 chars)",
      "price": 99.99,
      "images": {}
    }
  ],
  "customization": {
    "primaryColor": "#hexcolor",
    "accentColor": "#hexcolor",
    "font": "modern",
    "layout": "minimal"
  },
  "suggestions": ["Improvement suggestion 1", "Improvement suggestion 2", "Improvement suggestion 3"]
}

Guidelines:
- Generate 3-6 products that match the user's description
- Make product descriptions compelling and detailed
- Choose prices that fit the product category
- Select appropriate colors that match the store theme
- Font options: "modern", "classic", or "playful"
- Layout options: "minimal", "bold", or "elegant"
- Provide 3-5 actionable improvement suggestions
- Ensure all product names and descriptions are relevant to the prompt`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;

    // Parse the AI response to extract JSON
    try {
      // Remove markdown code blocks if present
      content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      // Validate it's proper JSON
      const parsedContent = JSON.parse(content);
      
      // Ensure required fields exist
      if (!parsedContent.storeName || !parsedContent.products || !Array.isArray(parsedContent.products)) {
        throw new Error('Invalid response structure');
      }

      return new Response(JSON.stringify({ 
        content: parsedContent,
        success: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      
      // Return a fallback response with error details
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse AI response. Please try again with a different prompt.',
          details: parseError instanceof Error ? parseError.message : 'Unknown error'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});