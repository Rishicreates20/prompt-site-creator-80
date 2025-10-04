import { useState } from "react";
import { PromptInput } from "@/components/builder/PromptInput";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { CustomizationPanel } from "@/components/builder/CustomizationPanel";
import { GeneratedSite } from "@/components/builder/GeneratedSite";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Builder = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [customization, setCustomization] = useState({});

  const handleGenerate = (prompt: string) => {
    setIsGenerating(true);
    toast.success("Generating your website...");
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      toast.success("Website generated successfully!");
    }, 3000);
  };

  const handleCustomize = (type: string, value: any) => {
    setCustomization((prev) => ({ ...prev, [type]: value }));
    toast.success("Customization applied!");
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-4">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-bold">Website Builder</h1>
        <Button className="gradient-primary">
          <Download className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Prompt & Customization */}
        <div className="w-80 border-r border-border/40 overflow-y-auto p-6">
          <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
          
          {hasGenerated && (
            <div className="mt-8 border-t border-border/40 pt-8">
              <CustomizationPanel onCustomize={handleCustomize} />
            </div>
          )}
        </div>

        {/* Center - Preview */}
        <div className="flex-1">
          <PreviewPanel
            isGenerating={isGenerating}
            generatedContent={
              hasGenerated ? <GeneratedSite customization={customization} /> : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Builder;
