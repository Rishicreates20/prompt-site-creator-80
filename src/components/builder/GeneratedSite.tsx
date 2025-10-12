import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { StoreData } from "./ProductEditor";

interface GeneratedSiteProps {
  customization?: {
    primaryColor?: string;
    accentColor?: string;
    font?: string;
    layout?: string;
  };
  storeData?: StoreData;
}

export const GeneratedSite = ({ customization, storeData }: GeneratedSiteProps) => {
  const primaryColor = customization?.primaryColor || "#8b5cf6";
  const accentColor = customization?.accentColor || "#3b82f6";
  const storeName = storeData?.storeName || "Your Store Name";
  const products = storeData?.products || [
    { id: 1, name: "Product 1", description: "Premium quality product description", price: 29.99, images: {} },
    { id: 2, name: "Product 2", description: "Premium quality product description", price: 59.98, images: {} },
    { id: 3, name: "Product 3", description: "Premium quality product description", price: 89.97, images: {} },
  ];

  const [selectedImages, setSelectedImages] = useState<Record<number, keyof typeof products[0]["images"]>>({});

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
          {storeName}
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
          {products.map((product) => {
            const availableImages = Object.entries(product.images).filter(([_, url]) => url);
            const currentImageKey = selectedImages[product.id] || (availableImages[0]?.[0] as keyof typeof product.images);
            const currentImageUrl = product.images[currentImageKey];
            
            const cycleImage = (direction: 'next' | 'prev') => {
              if (availableImages.length <= 1) return;
              const currentIndex = availableImages.findIndex(([key]) => key === currentImageKey);
              let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
              if (newIndex >= availableImages.length) newIndex = 0;
              if (newIndex < 0) newIndex = availableImages.length - 1;
              setSelectedImages(prev => ({ ...prev, [product.id]: availableImages[newIndex][0] as keyof typeof product.images }));
            };

            return (
              <div key={product.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="relative h-48 w-full group">
                  {currentImageUrl ? (
                    <>
                      <img 
                        src={currentImageUrl} 
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                      {availableImages.length > 1 && (
                        <>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => cycleImage('prev')}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => cycleImage('next')}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {availableImages.map(([key]) => (
                              <div
                                key={key}
                                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                                  key === currentImageKey ? 'bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div 
                      className="h-full w-full flex items-center justify-center"
                      style={{ backgroundColor: `${primaryColor}20` }}
                    >
                      <ShoppingBag className="h-12 w-12 opacity-30" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-semibold">{product.name}</h3>
                  <div className="mb-2 flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-3 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: primaryColor }}>
                      ${product.price.toFixed(2)}
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
            );
          })}
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
