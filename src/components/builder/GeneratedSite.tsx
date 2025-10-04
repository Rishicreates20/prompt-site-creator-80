import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";

interface GeneratedSiteProps {
  customization?: {
    primaryColor?: string;
    accentColor?: string;
    font?: string;
    layout?: string;
  };
}

export const GeneratedSite = ({ customization }: GeneratedSiteProps) => {
  const primaryColor = customization?.primaryColor || "#8b5cf6";
  const accentColor = customization?.accentColor || "#3b82f6";

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div 
        className="relative px-8 py-20 text-center"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}15)`,
        }}
      >
        <h1 className="mb-4 text-5xl font-bold" style={{ color: primaryColor }}>
          Your Store Name
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Discover our curated collection of premium products
        </p>
        <Button 
          size="lg" 
          style={{ 
            backgroundColor: primaryColor,
            color: 'white'
          }}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Shop Now
        </Button>
      </div>

      {/* Products Grid */}
      <div className="px-8 py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div 
                className="h-48 w-full"
                style={{ backgroundColor: `${primaryColor}20` }}
              />
              <div className="p-4">
                <h3 className="mb-2 font-semibold">Product {i}</h3>
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-3 text-sm text-gray-600">
                  Premium quality product description
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold" style={{ color: primaryColor }}>
                    ${(i * 29.99).toFixed(2)}
                  </span>
                  <Button 
                    size="sm"
                    style={{ 
                      backgroundColor: accentColor,
                      color: 'white'
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-8 py-8 text-center">
        <p className="text-sm text-gray-600">
          © 2024 Your Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};
