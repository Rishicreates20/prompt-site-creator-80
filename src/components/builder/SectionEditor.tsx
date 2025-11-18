import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Layout } from "lucide-react";

interface SectionEditorProps {
  title: string;
  onUpdate: (section: string, content: any) => void;
  headerData?: any;
  footerData?: any;
}

export const SectionEditor = ({ title, onUpdate, headerData, footerData }: SectionEditorProps) => {
  const [headerText, setHeaderText] = useState(headerData?.text || "");
  const [headerSubtext, setHeaderSubtext] = useState(headerData?.subtext || "");
  const [headerBgColor, setHeaderBgColor] = useState(headerData?.bgColor || "#1a1a1a");
  const [showLogo, setShowLogo] = useState(headerData?.showLogo ?? true);
  const [logoText, setLogoText] = useState(headerData?.logoText || "");
  
  const [footerText, setFooterText] = useState(footerData?.text || "");
  const [footerLinks, setFooterLinks] = useState(footerData?.links?.join(', ') || "");
  const [footerBgColor, setFooterBgColor] = useState(footerData?.bgColor || "#0a0a0a");
  const [showSocials, setShowSocials] = useState(footerData?.showSocials ?? true);

  // Real-time update function
  const updateHeader = (updates: any) => {
    const headerData = {
      text: headerText,
      subtext: headerSubtext,
      bgColor: headerBgColor,
      showLogo,
      logoText,
      ...updates
    };
    onUpdate("header", headerData);
  };

  const updateFooter = (updates: any) => {
    const footerData = {
      text: footerText,
      links: footerLinks.split(',').map(link => link.trim()).filter(Boolean),
      bgColor: footerBgColor,
      showSocials,
      ...updates
    };
    onUpdate("footer", footerData);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Layout className="h-4 w-4 text-primary" />
        <Label className="text-sm font-medium">{title}</Label>
      </div>

      {/* Header Section */}
      <div className="space-y-3 p-4 border border-border/40 rounded-lg">
        <h4 className="text-sm font-medium">Header Settings</h4>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Header Title</Label>
          <Input
            placeholder="Enter header title"
            value={headerText}
            onChange={(e) => {
              setHeaderText(e.target.value);
              updateHeader({ text: e.target.value });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Subtitle</Label>
          <Input
            placeholder="Enter subtitle"
            value={headerSubtext}
            onChange={(e) => {
              setHeaderSubtext(e.target.value);
              updateHeader({ subtext: e.target.value });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Background Color</Label>
          <Input
            type="color"
            value={headerBgColor}
            onChange={(e) => {
              setHeaderBgColor(e.target.value);
              updateHeader({ bgColor: e.target.value });
            }}
            className="h-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Show Logo</Label>
          <Switch 
            checked={showLogo} 
            onCheckedChange={(checked) => {
              setShowLogo(checked);
              updateHeader({ showLogo: checked });
            }}
          />
        </div>

        {showLogo && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Logo Text</Label>
            <Input
              placeholder="Enter logo text"
              value={logoText}
              onChange={(e) => {
                setLogoText(e.target.value);
                updateHeader({ logoText: e.target.value });
              }}
            />
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="space-y-3 p-4 border border-border/40 rounded-lg">
        <h4 className="text-sm font-medium">Footer Settings</h4>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Footer Text</Label>
          <Textarea
            placeholder="Enter footer text/copyright"
            value={footerText}
            onChange={(e) => {
              setFooterText(e.target.value);
              updateFooter({ text: e.target.value });
            }}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Links (comma-separated)</Label>
          <Input
            placeholder="About, Contact, Privacy, Terms"
            value={footerLinks}
            onChange={(e) => {
              setFooterLinks(e.target.value);
              updateFooter({ links: e.target.value.split(',').map(link => link.trim()).filter(Boolean) });
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Background Color</Label>
          <Input
            type="color"
            value={footerBgColor}
            onChange={(e) => {
              setFooterBgColor(e.target.value);
              updateFooter({ bgColor: e.target.value });
            }}
            className="h-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Show Social Icons</Label>
          <Switch 
            checked={showSocials} 
            onCheckedChange={(checked) => {
              setShowSocials(checked);
              updateFooter({ showSocials: checked });
            }}
          />
        </div>
      </div>
    </div>
  );
};
