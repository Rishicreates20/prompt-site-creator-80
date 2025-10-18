-- Create templates table
CREATE TABLE public.templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  html_content TEXT NOT NULL,
  customization JSONB,
  store_data JSONB,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Public templates are viewable by everyone
CREATE POLICY "Public templates are viewable by everyone"
ON public.templates
FOR SELECT
USING (is_public = true OR auth.uid() = created_by);

-- Users can create their own templates
CREATE POLICY "Users can create templates"
ON public.templates
FOR INSERT
WITH CHECK (auth.uid() = created_by);

-- Users can update their own templates
CREATE POLICY "Users can update their own templates"
ON public.templates
FOR UPDATE
USING (auth.uid() = created_by);

-- Users can delete their own templates
CREATE POLICY "Users can delete their own templates"
ON public.templates
FOR DELETE
USING (auth.uid() = created_by);

-- Add trigger for updated_at
CREATE TRIGGER update_templates_updated_at
BEFORE UPDATE ON public.templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert starter templates
INSERT INTO public.templates (name, description, category, html_content, customization, store_data, is_public, created_by) VALUES
(
  'Modern E-commerce',
  'Clean and professional online store template',
  'ecommerce',
  '<html><body>Template content</body></html>',
  '{"primaryColor": "#8b5cf6", "accentColor": "#3b82f6", "layout": "minimal"}',
  '{"storeName": "Modern Store", "products": [{"id": 1, "name": "Premium Product", "description": "High-quality item", "price": 49.99, "images": {}}]}',
  true,
  NULL
),
(
  'Portfolio Showcase',
  'Elegant portfolio for creatives and professionals',
  'portfolio',
  '<html><body>Portfolio template</body></html>',
  '{"primaryColor": "#10b981", "accentColor": "#f59e0b", "layout": "elegant"}',
  '{"storeName": "Creative Portfolio", "products": [{"id": 1, "name": "Project 1", "description": "Creative work showcase", "price": 0, "images": {}}]}',
  true,
  NULL
),
(
  'Landing Page Pro',
  'High-converting landing page template',
  'landing',
  '<html><body>Landing page</body></html>',
  '{"primaryColor": "#ef4444", "accentColor": "#f97316", "layout": "bold"}',
  '{"storeName": "Launch Your Product", "products": [{"id": 1, "name": "Featured Product", "description": "Amazing product description", "price": 99.99, "images": {}}]}',
  true,
  NULL
);