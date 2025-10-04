import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Palette, Type, Layout, Image } from "lucide-react";

interface CustomizationPanelProps {
  onCustomize: (type: string, value: any) => void;
}

export const CustomizationPanel = ({ onCustomize }: CustomizationPanelProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Customize Your Site</h3>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <Label className="text-sm font-medium">Brand Colors</Label>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground w-20">Primary</Label>
            <Input
              type="color"
              defaultValue="#8b5cf6"
              className="h-8 w-full"
              onChange={(e) => onCustomize("primaryColor", e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground w-20">Accent</Label>
            <Input
              type="color"
              defaultValue="#3b82f6"
              className="h-8 w-full"
              onChange={(e) => onCustomize("accentColor", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-primary" />
          <Label className="text-sm font-medium">Typography</Label>
        </div>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("font", "modern")}
          >
            Modern Sans-Serif
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("font", "classic")}
          >
            Classic Serif
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("font", "playful")}
          >
            Playful Rounded
          </Button>
        </div>
      </div>

      {/* Layout */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-primary" />
          <Label className="text-sm font-medium">Layout Style</Label>
        </div>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("layout", "minimal")}
          >
            Minimal
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("layout", "bold")}
          >
            Bold & Vibrant
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("layout", "elegant")}
          >
            Elegant
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Image className="h-4 w-4 text-primary" />
          <Label className="text-sm font-medium">Add Sections</Label>
        </div>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("addSection", "testimonials")}
          >
            + Testimonials
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("addSection", "features")}
          >
            + Features Grid
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => onCustomize("addSection", "faq")}
          >
            + FAQ Section
          </Button>
        </div>
      </div>
    </div>
  );
};
