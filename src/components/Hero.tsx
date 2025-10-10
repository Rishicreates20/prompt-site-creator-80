import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-glow" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm animate-fade-in backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-foreground/80">AI-Powered Website Generation</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            Build Your Dream{" "}
            <span className="gradient-text inline-block animate-shimmer bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]">
              E-Commerce Site
            </span>
            <br />
            With Just a Prompt
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            No coding. No design skills. Just describe your vision and watch as AI creates
            a fully functional, customizable e-commerce website in seconds.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            <Button
              size="lg"
              className="gradient-primary glow-primary group text-lg relative overflow-hidden transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/builder")}
            >
              <span className="relative z-10">Start Building Free</span>
              <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 shimmer" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary/5">
              See Examples
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <div className="transition-transform duration-300 hover:scale-110">
              <div className="text-4xl font-bold gradient-text">10k+</div>
              <div className="text-sm text-muted-foreground">Sites Created</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-110" style={{ transitionDelay: '50ms' }}>
              <div className="text-4xl font-bold gradient-text">30s</div>
              <div className="text-sm text-muted-foreground">Avg. Build Time</div>
            </div>
            <div className="transition-transform duration-300 hover:scale-110" style={{ transitionDelay: '100ms' }}>
              <div className="text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">Customizable</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};
