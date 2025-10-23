import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, AlertCircle } from "lucide-react";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

const MAX_PROMPT_LENGTH = 2000;

export const PromptInput = ({ onGenerate, isGenerating }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const handleChange = (newValue: string) => {
    if (newValue.length > MAX_PROMPT_LENGTH) {
      setError(`Prompt must be ${MAX_PROMPT_LENGTH} characters or less`);
      return;
    }
    setError("");
    setPrompt(newValue);
  };

  const handleSubmit = () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      setError(`Prompt must be ${MAX_PROMPT_LENGTH} characters or less`);
      return;
    }
    setError("");
    if (!isGenerating) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Describe Your E-Commerce Website</Label>
        <Textarea
          placeholder="e.g., A modern online store selling handmade jewelry with a minimalist design, featuring a hero section, product gallery, and contact form..."
          value={prompt}
          onChange={(e) => handleChange(e.target.value)}
          className="min-h-32 resize-none"
          disabled={isGenerating}
          maxLength={MAX_PROMPT_LENGTH}
        />
        <div className="flex items-center justify-between text-xs">
          <p className="text-muted-foreground">
            Be specific about your products, style, and features
          </p>
          <span className={prompt.length > MAX_PROMPT_LENGTH * 0.9 ? "text-destructive" : "text-muted-foreground"}>
            {prompt.length}/{MAX_PROMPT_LENGTH}
          </span>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!prompt.trim() || isGenerating}
        className="w-full gradient-primary glow-primary"
        size="lg"
      >
        {isGenerating ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            Generating Your Website...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Website
          </>
        )}
      </Button>

      {!isGenerating && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Luxury fashion boutique",
              "Organic skincare store",
              "Tech gadgets shop"
            ].map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs transition-colors hover:border-primary hover:bg-primary/10"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
