import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Type, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface FontCustomizationProps {
  onFontChange: (fontFamily: string, fontUrl?: string) => void;
}

const GOOGLE_FONTS = [
  { name: "Inter", value: "Inter" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open+Sans" },
  { name: "Lato", value: "Lato" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Playfair Display", value: "Playfair+Display" },
  { name: "Poppins", value: "Poppins" },
  { name: "Raleway", value: "Raleway" },
  { name: "Merriweather", value: "Merriweather" },
  { name: "Oswald", value: "Oswald" },
];

export const FontCustomization = ({ onFontChange }: FontCustomizationProps) => {
  const [selectedFont, setSelectedFont] = useState<string>("Inter");
  const [uploadedFont, setUploadedFont] = useState<File | null>(null);
  const [customFontName, setCustomFontName] = useState<string>("");

  const handleGoogleFontSelect = (fontValue: string) => {
    setSelectedFont(fontValue);
    const fontName = GOOGLE_FONTS.find(f => f.value === fontValue)?.name || fontValue;
    
    // Add Google Font link to document
    const existingLink = document.getElementById('google-font-link') as HTMLLinkElement;
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontValue}:wght@400;500;600;700&display=swap`;
    
    if (existingLink) {
      existingLink.href = fontUrl;
    } else {
      const link = document.createElement('link');
      link.id = 'google-font-link';
      link.rel = 'stylesheet';
      link.href = fontUrl;
      document.head.appendChild(link);
    }
    
    onFontChange(fontName.replace(/\+/g, ' '));
    toast.success(`Font changed to ${fontName.replace(/\+/g, ' ')}`);
  };

  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.ttf', '.otf', '.woff', '.woff2'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      toast.error("Please upload a valid font file (.ttf, .otf, .woff, .woff2)");
      return;
    }

    setUploadedFont(file);
    toast.success("Font file uploaded successfully");
  };

  const handleApplyCustomFont = () => {
    if (!uploadedFont || !customFontName) {
      toast.error("Please provide a font name and upload a font file");
      return;
    }

    // Create a data URL from the uploaded font
    const reader = new FileReader();
    reader.onload = (e) => {
      const fontUrl = e.target?.result as string;
      
      // Create and inject @font-face rule
      const styleId = 'custom-font-style';
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }

      const fontFormat = uploadedFont.name.endsWith('.woff2') ? 'woff2' :
                        uploadedFont.name.endsWith('.woff') ? 'woff' :
                        uploadedFont.name.endsWith('.ttf') ? 'truetype' : 'opentype';

      styleElement.textContent = `
        @font-face {
          font-family: '${customFontName}';
          src: url('${fontUrl}') format('${fontFormat}');
          font-weight: normal;
          font-style: normal;
        }
      `;

      onFontChange(customFontName, fontUrl);
      toast.success(`Custom font "${customFontName}" applied successfully`);
    };

    reader.readAsDataURL(uploadedFont);
  };

  const handleRemoveUploadedFont = () => {
    setUploadedFont(null);
    setCustomFontName("");
    toast.info("Font upload removed");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Type className="h-4 w-4 text-primary" />
        <Label className="text-sm font-medium">Font Options</Label>
      </div>

      {/* Google Fonts */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Google Fonts</Label>
        <Select value={selectedFont} onValueChange={handleGoogleFontSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {GOOGLE_FONTS.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.name }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Upload Custom Font */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Upload Custom Font</Label>
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Font family name (e.g., My Custom Font)"
            value={customFontName}
            onChange={(e) => setCustomFontName(e.target.value)}
            className="text-sm"
          />
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={handleFontUpload}
                className="text-sm"
                id="font-upload"
              />
            </div>
            {uploadedFont && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveUploadedFont}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {uploadedFont && (
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <Upload className="h-3 w-3" />
              {uploadedFont.name}
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleApplyCustomFont}
            disabled={!uploadedFont || !customFontName}
            className="w-full"
          >
            Apply Custom Font
          </Button>
        </div>
      </div>
    </div>
  );
};
