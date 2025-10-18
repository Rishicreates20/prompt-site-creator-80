import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, productName, amount, currency = 'INR' } = await req.json();

    console.log('Payment request received:', { productId, productName, amount, currency });

    // Dummy payment processing - always returns success
    // In production, this would integrate with Razorpay or another payment gateway
    const dummyOrderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const dummyPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({
        success: true,
        orderId: dummyOrderId,
        paymentId: dummyPaymentId,
        amount,
        currency,
        status: 'captured',
        message: 'Payment processed successfully (demo mode)',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
