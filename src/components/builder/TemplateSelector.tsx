import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShoppingBag, Briefcase, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  customization: any;
  store_data: any;
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  onSkip: () => void;
}

const categoryIcons = {
  ecommerce: ShoppingBag,
  portfolio: Briefcase,
  landing: Rocket,
};

const categoryColors = {
  ecommerce: "bg-purple-100 text-purple-700",
  portfolio: "bg-green-100 text-green-700",
  landing: "bg-red-100 text-red-700",
};

export const TemplateSelector = ({ onSelectTemplate, onSkip }: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      console.error('Error loading templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 mx-auto animate-pulse text-primary" />
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose a Template</h2>
        <p className="text-muted-foreground">Start with a professional design or build from scratch</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => {
          const Icon = categoryIcons[template.category as keyof typeof categoryIcons] || Sparkles;
          const colorClass = categoryColors[template.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-700";

          return (
            <Card 
              key={template.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                <Icon className="h-24 w-24 text-primary/20 group-hover:scale-110 transition-transform" />
                <Badge className={`absolute top-3 right-3 ${colorClass}`}>
                  {template.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.description}
                </p>
                <Button 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(template);
                  }}
                >
                  Use Template
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg" onClick={onSkip}>
          Start from Scratch
        </Button>
      </div>
    </div>
  );
};