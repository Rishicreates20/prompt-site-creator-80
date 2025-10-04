import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PreviewPanelProps {
  isGenerating: boolean;
  generatedContent: React.ReactNode;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

export const PreviewPanel = ({ isGenerating, generatedContent }: PreviewPanelProps) => {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");

  const viewportSizes = {
    desktop: "w-full",
    tablet: "max-w-3xl",
    mobile: "max-w-sm"
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border/40 bg-card/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant={viewport === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewport("desktop")}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewport === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewport("tablet")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewport === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewport("mobile")}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">Preview</div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-muted/20 p-8">
        <div className={`mx-auto transition-all duration-300 ${viewportSizes[viewport]}`}>
          <div className="rounded-lg border border-border/40 bg-background shadow-xl overflow-hidden">
            {isGenerating ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Creating your website...</p>
                </div>
              </div>
            ) : generatedContent ? (
              <div className="h-full">{generatedContent}</div>
            ) : (
              <div className="flex h-96 items-center justify-center">
                <p className="text-muted-foreground">Enter a prompt to generate your website</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
