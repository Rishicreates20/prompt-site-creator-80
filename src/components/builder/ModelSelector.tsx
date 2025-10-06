import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain } from "lucide-react";

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const ModelSelector = ({ value, onChange }: ModelSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Brain className="h-4 w-4 text-primary" />
        <Label className="text-sm font-medium">AI Model</Label>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select AI model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="google/gemini-2.5-flash">Gemini Flash (Recommended)</SelectItem>
          <SelectItem value="google/gemini-2.5-pro">Gemini Pro (Best Quality)</SelectItem>
          <SelectItem value="google/gemini-2.5-flash-lite">Gemini Lite (Fastest)</SelectItem>
          <SelectItem value="openai/gpt-5-nano">GPT-5 Nano</SelectItem>
          <SelectItem value="openai/gpt-5-mini">GPT-5 Mini</SelectItem>
          <SelectItem value="openai/gpt-5">GPT-5 (Premium)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        {value?.startsWith("google") ? "✨ Free during promotion" : "💳 Paid model"}
      </p>
    </div>
  );
};