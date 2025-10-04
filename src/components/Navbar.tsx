import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-primary p-2">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">PromptSite</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/builder">
              <Button variant="ghost">Try it Free</Button>
            </Link>
            <Button className="gradient-primary">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
