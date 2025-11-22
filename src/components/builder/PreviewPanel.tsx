import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PreviewPanelProps {
  isGenerating: boolean;
  generatedContent: React.ReactNode;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

interface ViewportConfig {
  width: string;
  height: string;
  label: string;
  scale: string;
}

export const PreviewPanel = ({ isGenerating, generatedContent }: PreviewPanelProps) => {
  const [viewport, setViewport] = useState<ViewportSize>("mobile");

  const viewportSizes: Record<ViewportSize, ViewportConfig> = {
    mobile: {
      width: "375px",
      height: "667px",
      label: "iPhone SE",
      scale: "scale-90"
    },
    tablet: {
      width: "768px",
      height: "1024px",
      label: "iPad",
      scale: "scale-75"
    },
    desktop: {
      width: "100%",
      height: "100%",
      label: "Desktop",
      scale: "scale-100"
    }
  };

  const currentViewport = viewportSizes[viewport];

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border/40 bg-card/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant={viewport === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewport("mobile")}
            className="gap-2"
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">iPhone</span>
          </Button>
          <Button
            variant={viewport === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewport("tablet")}
            className="gap-2"
          >
            <Tablet className="h-4 w-4" />
            <span className="hidden sm:inline">iPad</span>
          </Button>
          <Button
            variant={viewport === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewport("desktop")}
            className="gap-2"
          >
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Desktop</span>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">{currentViewport.label}</div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4 sm:p-8 flex items-center justify-center">
        <div 
          className={`transition-all duration-300 ${currentViewport.scale} mx-auto`}
          style={{
            width: currentViewport.width,
            height: viewport !== "desktop" ? currentViewport.height : "calc(100vh - 180px)",
            maxWidth: "100%"
          }}
        >
          <div className="rounded-lg border border-border/40 bg-background shadow-2xl overflow-hidden h-full">
            {isGenerating ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Creating your website...</p>
                </div>
              </div>
            ) : generatedContent ? (
              <div className="h-full overflow-auto">{generatedContent}</div>
            ) : (
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-muted-foreground text-center">Enter a prompt to generate your website</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
