import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Store, Package } from "lucide-react";

export interface ProductImage {
  front?: string;
  back?: string;
  side?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage;
}

export interface StoreData {
  storeName: string;
  products: Product[];
}

interface ProductEditorProps {
  storeData: StoreData;
  onChange: (data: StoreData) => void;
}

export const ProductEditor = ({ storeData, onChange }: ProductEditorProps) => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const handleStoreNameChange = (name: string) => {
    onChange({ ...storeData, storeName: name });
  };

  const handleProductChange = (index: number, field: keyof Product, value: any) => {
    const newProducts = [...storeData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    onChange({ ...storeData, products: newProducts });
  };

  const handleImageChange = (index: number, angle: keyof ProductImage, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newProducts = [...storeData.products];
      newProducts[index] = {
        ...newProducts[index],
        images: {
          ...newProducts[index].images,
          [angle]: reader.result as string,
        },
      };
      onChange({ ...storeData, products: newProducts });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number, angle: keyof ProductImage) => {
    const newProducts = [...storeData.products];
    const { [angle]: removed, ...rest } = newProducts[index].images;
    newProducts[index] = { ...newProducts[index], images: rest };
    onChange({ ...storeData, products: newProducts });
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: storeData.products.length + 1,
      name: `Product ${storeData.products.length + 1}`,
      description: "Premium quality product description",
      price: 29.99,
      images: {},
    };
    onChange({ ...storeData, products: [...storeData.products, newProduct] });
    setSelectedProduct(storeData.products.length);
  };

  const removeProduct = (index: number) => {
    const newProducts = storeData.products.filter((_, i) => i !== index);
    onChange({ ...storeData, products: newProducts });
    if (selectedProduct >= newProducts.length) {
      setSelectedProduct(Math.max(0, newProducts.length - 1));
    }
  };

  const ImageUploadBox = ({
    label,
    imageSrc,
    onUpload,
    onRemove,
  }: {
    label: string;
    imageSrc?: string;
    onUpload: (file: File) => void;
    onRemove: () => void;
  }) => (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      <div className="relative h-32 w-full rounded-md border-2 border-dashed border-border bg-muted/50 hover:bg-muted/70 transition-colors">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={label}
              className="h-full w-full object-cover rounded-md"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-1 right-1 h-6 w-6 p-0"
              onClick={onRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          </>
        ) : (
          <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Upload</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onUpload(file);
              }}
            />
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          Edit Your Store
        </h3>
      </div>

      {/* Store Name */}
      <div className="space-y-2">
        <Label>Store Name</Label>
        <Input
          value={storeData.storeName}
          onChange={(e) => handleStoreNameChange(e.target.value)}
          placeholder="Your Store Name"
        />
      </div>

      {/* Products Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            Products ({storeData.products.length})
          </Label>
          <Button size="sm" variant="outline" onClick={addProduct}>
            + Add Product
          </Button>
        </div>

        {storeData.products.length > 0 && (
          <Tabs value={selectedProduct.toString()} onValueChange={(v) => setSelectedProduct(parseInt(v))}>
            <TabsList className="w-full flex-wrap h-auto">
              {storeData.products.map((product, index) => (
                <TabsTrigger key={index} value={index.toString()} className="flex-1">
                  Product {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {storeData.products.map((product, index) => (
              <TabsContent key={index} value={index.toString()} className="space-y-4 mt-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {/* Product Name */}
                    <div className="space-y-2">
                      <Label>Product Name</Label>
                      <Input
                        value={product.name}
                        onChange={(e) => handleProductChange(index, "name", e.target.value)}
                        placeholder="Product name"
                      />
                    </div>

                    {/* Product Description */}
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={product.description}
                        onChange={(e) => handleProductChange(index, "description", e.target.value)}
                        placeholder="Product description"
                        rows={3}
                      />
                    </div>

                    {/* Product Price */}
                    <div className="space-y-2">
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, "price", parseFloat(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>

                    {/* Product Images */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Product Images</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <ImageUploadBox
                          label="Front"
                          imageSrc={product.images.front}
                          onUpload={(file) => handleImageChange(index, "front", file)}
                          onRemove={() => removeImage(index, "front")}
                        />
                        <ImageUploadBox
                          label="Back"
                          imageSrc={product.images.back}
                          onUpload={(file) => handleImageChange(index, "back", file)}
                          onRemove={() => removeImage(index, "back")}
                        />
                        <ImageUploadBox
                          label="Side"
                          imageSrc={product.images.side}
                          onUpload={(file) => handleImageChange(index, "side", file)}
                          onRemove={() => removeImage(index, "side")}
                        />
                      </div>
                    </div>

                    {/* Remove Product Button */}
                    {storeData.products.length > 1 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => removeProduct(index)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove Product
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
};
