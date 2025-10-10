import { Zap, Palette, Code, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete e-commerce websites in under 30 seconds with our advanced AI."
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Tweak colors, fonts, layouts, and content - all through simple prompts or visual controls."
  },
  {
    icon: Code,
    title: "No Code Required",
    description: "Built for non-technical users. Just describe what you want in plain English."
  },
  {
    icon: Globe,
    title: "Instant Publishing",
    description: "Your site goes live immediately with hosting, domain, and SSL included."
  }
];

export const Features = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Succeed Online</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed for entrepreneurs who want to launch fast
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-primary/50 hover-lift animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'backwards'
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-primary">{feature.title}</h3>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{feature.description}</p>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 shimmer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
