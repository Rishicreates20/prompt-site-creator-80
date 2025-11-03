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
          placeholder="e.g., A premium online store selling artisan coffee beans with a warm, earthy design. Include 4-5 different coffee varieties from around the world, with detailed descriptions about origin and flavor notes. Use brown and cream colors with a modern font."
          value={prompt}
          onChange={(e) => handleChange(e.target.value)}
          className="min-h-36 resize-none"
          disabled={isGenerating}
          maxLength={MAX_PROMPT_LENGTH}
        />
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <p className="text-muted-foreground">
              Include: product type, quantity, style, and color preferences
            </p>
            <span className={prompt.length > MAX_PROMPT_LENGTH * 0.9 ? "text-destructive" : "text-muted-foreground"}>
              {prompt.length}/{MAX_PROMPT_LENGTH}
            </span>
          </div>
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
          <p className="text-xs text-muted-foreground">Quick start examples:</p>
          <div className="flex flex-col gap-2">
            {[
              "Modern tech accessories store with 5 products (phone cases, chargers, earbuds). Use sleek black and blue colors with a bold layout.",
              "Organic skincare boutique featuring 4 natural products. Earthy green and cream tones, elegant minimalist design.",
              "Vintage vinyl records shop with 6 classic albums. Retro orange and brown colors, playful retro font style."
            ].map((example, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(example)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-left text-xs transition-colors hover:border-primary hover:bg-primary/10"
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
