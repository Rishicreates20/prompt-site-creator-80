import { useState, useEffect, lazy, Suspense } from "react";
import { PromptInput } from "@/components/builder/PromptInput";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { CustomizationPanel } from "@/components/builder/CustomizationPanel";
import { ModelSelector } from "@/components/builder/ModelSelector";
import { TemplateSelector } from "@/components/builder/TemplateSelector";
import { CreditsDisplay } from "@/components/builder/CreditsDisplay";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrowLeft, Download, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useProjects } from "@/hooks/useProjects";
import { useCredits } from "@/hooks/useCredits";
import type { StoreData, Customization } from "@/lib/types";

// Lazy load GeneratedSite for better performance
const GeneratedSite = lazy(() => import("@/components/builder/GeneratedSite").then(module => ({ default: module.GeneratedSite })));

const Builder = () => {
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const { refetchCredits } = useCredits();
  
  const [showTemplates, setShowTemplates] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [customization, setCustomization] = useState<Customization>({});
  const [selectedModel, setSelectedModel] = useState("google/gemini-2.5-flash");
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [storeData, setStoreData] = useState<StoreData>({
    storeName: "Your Store Name",
    products: [
      { id: 1, name: "Product 1", description: "Premium quality product description", price: 29.99, images: {} },
      { id: 2, name: "Product 2", description: "Premium quality product description", price: 59.98, images: {} },
      { id: 3, name: "Product 3", description: "Premium quality product description", price: 89.97, images: {} },
    ],
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsAuthChecking(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in to use the builder");
      navigate("/auth");
      return;
    }
    setUser(session.user);
    setIsAuthChecking(false);
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
        const errorMsg = error.message || '';
        const errorContext = JSON.stringify(error);
        
        if (errorMsg.includes("Insufficient credits") || errorContext.includes("Insufficient credits") || error.status === 402) {
          toast.error("You've run out of daily credits. They reset tomorrow!");
          refetchCredits(); // Refresh credits display
        } else if (errorMsg.includes("Rate limit") || error.status === 429) {
          toast.error("Too many requests. Please wait a moment.");
        } else {
          toast.error(errorMsg || "Failed to generate website. Please try again.");
        }
        return;
      }

      // Parse the AI-generated content
      const generatedData = typeof data.content === 'string' 
        ? JSON.parse(data.content) 
        : data.content;

      // Apply the generated store data and customization
      if (generatedData.storeName) {
        setStoreData({
          storeName: generatedData.storeName,
          products: generatedData.products || []
        });
      }
      
      if (generatedData.customization) {
        setCustomization(generatedData.customization);
      }

      // Store the raw response for download/save
      setGeneratedHTML(JSON.stringify(generatedData, null, 2));
      setIsGenerating(false);
      setHasGenerated(true);
      
      // Show success with suggestions if available
      toast.success("Website generated successfully!");
      if (generatedData.suggestions && generatedData.suggestions.length > 0) {
        setTimeout(() => {
          toast.info(`💡 ${generatedData.suggestions[0]}`);
        }, 1000);
      }
      
      // Refresh credits after generation
      refetchCredits();
    } catch (error: any) {
      toast.error(error.message || "Failed to generate website");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectTemplate = (template: any) => {
    setCustomization(template.customization || {});
    setStoreData(template.store_data || storeData);
    setShowTemplates(false);
    setHasGenerated(true);
    toast.success(`${template.name} template applied!`);
  };

  const handleSkipTemplates = () => {
    setShowTemplates(false);
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

    setIsSaving(true);
    try {
      await createProject.mutateAsync({
        name: `Project - ${new Date().toLocaleDateString()}`,
        prompt: currentPrompt,
        customization: customization,
        html_content: generatedHTML,
      });
    } catch (error: any) {
      // Error is handled by the mutation
    } finally {
      setIsSaving(false);
    }
  };

  if (isAuthChecking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-xl px-6 py-4">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Website Builder</h1>
          <CreditsDisplay />
        </div>
        <div className="flex gap-2">
          {hasGenerated && (
            <>
              <Button 
                variant="outline" 
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
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
      {showTemplates ? (
        <div className="flex-1 overflow-y-auto">
          <TemplateSelector 
            onSelectTemplate={handleSelectTemplate}
            onSkip={handleSkipTemplates}
          />
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Prompt & Customization */}
          <div className="w-80 border-r border-border/40 overflow-y-auto p-6 space-y-6">
            <ModelSelector value={selectedModel} onChange={setSelectedModel} />
            <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
            
            {hasGenerated && (
              <div className="border-t border-border/40 pt-6">
                <CustomizationPanel 
                  onCustomize={handleCustomize}
                  storeData={storeData}
                  onStoreDataChange={setStoreData}
                />
              </div>
            )}
          </div>

          {/* Center - Preview */}
          <div className="flex-1">
            <PreviewPanel
              isGenerating={isGenerating}
              generatedContent={
                hasGenerated ? (
                  <Suspense fallback={<LoadingSpinner size="lg" />}>
                    <GeneratedSite customization={customization} storeData={storeData} />
                  </Suspense>
                ) : null
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;