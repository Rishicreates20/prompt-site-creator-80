import { Sparkles } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";

export const CreditsDisplay = () => {
  const { credits, isLoading } = useCredits();

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  if (!credits) {
    return null;
  }

  return (
    <Badge variant="secondary" className="gap-2">
      <Sparkles className="h-3 w-3" />
      <span className="text-xs font-medium">
        {credits.daily_credits} credits left
      </span>
    </Badge>
  );
};
