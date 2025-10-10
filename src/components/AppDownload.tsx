import { Smartphone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppDownload = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left content */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm backdrop-blur-sm">
                <Smartphone className="h-4 w-4 text-accent" />
                <span className="text-foreground/80">Available on Mobile</span>
              </div>

              <h2 className="text-4xl font-bold lg:text-5xl">
                Take Your Business{" "}
                <span className="gradient-text">On The Go</span>
              </h2>

              <p className="text-lg text-muted-foreground">
                Download our mobile app and manage your e-commerce site from anywhere. 
                Available now on iOS and Android with all the features you love.
              </p>

              {/* App store buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-card border border-border hover:border-primary/50 text-foreground hover:bg-card/80 transition-all duration-300 hover-lift group"
                  onClick={() => window.open('https://play.google.com', '_blank')}
                >
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Button>

                <Button
                  size="lg"
                  className="bg-card border border-border hover:border-primary/50 text-foreground hover:bg-card/80 transition-all duration-300 hover-lift group"
                  onClick={() => window.open('https://www.apple.com/app-store/', '_blank')}
                >
                  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div className="transition-transform duration-300 hover:scale-110">
                  <div className="text-2xl font-bold gradient-text">4.8★</div>
                  <div className="text-xs text-muted-foreground">App Rating</div>
                </div>
                <div className="transition-transform duration-300 hover:scale-110">
                  <div className="text-2xl font-bold gradient-text">100k+</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
                <div className="transition-transform duration-300 hover:scale-110">
                  <div className="text-2xl font-bold gradient-text">50k+</div>
                  <div className="text-xs text-muted-foreground">Reviews</div>
                </div>
              </div>
            </div>

            {/* Right - Phone mockup */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
              <div className="relative mx-auto w-64 animate-float">
                {/* Phone frame */}
                <div className="relative rounded-[2.5rem] border-8 border-foreground/20 bg-card p-4 shadow-2xl">
                  {/* Screen */}
                  <div className="relative rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden aspect-[9/19]">
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-background/50 backdrop-blur-sm flex items-center justify-between px-4 text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-3 border border-current rounded-sm" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pt-12">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 animate-pulse">
                        <Download className="h-8 w-8 text-white" />
                      </div>
                      <div className="space-y-2 w-full">
                        <div className="h-3 bg-foreground/20 rounded w-3/4 mx-auto shimmer" />
                        <div className="h-3 bg-foreground/20 rounded w-1/2 mx-auto shimmer" style={{ animationDelay: '0.5s' }} />
                        <div className="h-8 bg-primary/30 rounded-lg mt-4 shimmer" style={{ animationDelay: '1s' }} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Smartphone className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                  <Download className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
