import { useState, useEffect } from "react";
import { PromptInput } from "@/components/builder/PromptInput";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { CustomizationPanel } from "@/components/builder/CustomizationPanel";
import { GeneratedSite } from "@/components/builder/GeneratedSite";
import { ModelSelector } from "@/components/builder/ModelSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Builder = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [customization, setCustomization] = useState({});
  const [selectedModel, setSelectedModel] = useState("google/gemini-2.5-flash");
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in to use the builder");
      navigate("/auth");
      return;
    }
    setUser(session.user);
  };

  const handleGenerate = async (prompt: string) => {
    if (!user) {
      toast.error("Please sign in first");
      navigate("/auth");
      return;
    }

    setIsGenerating(true);
    setCurrentPrompt(prompt);
    toast.loading("Generating your website...");
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-website', {
        body: { prompt, model: selectedModel }
      });

      if (error) {
        if (error.message?.includes("Insufficient credits")) {
          toast.error("You've run out of daily credits. They reset tomorrow!");
        } else if (error.message?.includes("Rate limit")) {
          toast.error("Too many requests. Please wait a moment.");
        } else {
          throw error;
        }
        return;
      }

      setGeneratedHTML(data.content);
      setIsGenerating(false);
      setHasGenerated(true);
      toast.success("Website generated successfully!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate website");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomize = (type: string, value: any) => {
    setCustomization((prev) => ({ ...prev, [type]: value }));
    toast.success("Customization applied!");
  };

  const handleDownload = () => {
    const content = generatedHTML || "<h1>Your Generated Website</h1>";
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Website downloaded!");
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        name: `Project - ${new Date().toLocaleDateString()}`,
        prompt: currentPrompt,
        customization: customization,
        html_content: generatedHTML,
      });

      if (error) throw error;
      toast.success("Project saved!");
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error("Failed to save project");
    }
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
        <div className="flex gap-2">
          {hasGenerated && (
            <>
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Prompt & Customization */}
        <div className="w-80 border-r border-border/40 overflow-y-auto p-6 space-y-6">
          <ModelSelector value={selectedModel} onChange={setSelectedModel} />
          <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
          
          {hasGenerated && (
            <div className="border-t border-border/40 pt-6">
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