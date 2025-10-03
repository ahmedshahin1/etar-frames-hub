import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ShoppingCart, Frame } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>("medium");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products" as any)
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = () => {
    // Cart logic will be implemented later
    toast.success("تم إضافة المنتج إلى السلة");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <p>المنتج غير موجود</p>
        </div>
      </div>
    );
  }

  const prices = product.base_price_json as Record<string, number>;
  const currentPrice = prices[selectedSize];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-cairo font-bold text-4xl mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-lg font-semibold mb-3 block">اختر المقاس</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                {Object.entries(prices).map(([size, price]) => (
                  <div key={size} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={size} id={size} />
                    <Label htmlFor={size} className="cursor-pointer">
                      {size === "small" && "صغير"}
                      {size === "medium" && "متوسط"}
                      {size === "large" && "كبير"}
                      {" - "}
                      <span className="font-bold">{price} جنيه</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-primary">
              {currentPrice} جنيه
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="ml-2 h-5 w-5" />
                أضف إلى السلة
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/customize")}
                className="flex-1"
              >
                <Frame className="ml-2 h-5 w-5" />
                تخصيص
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
