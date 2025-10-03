import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface ProductCardProps {
  id: string;
  slug: string;
  title: string;
  images: string[];
  basePriceJson: Record<string, number>;
  isTrending?: boolean;
  category: string;
}

export const ProductCard = ({
  slug,
  title,
  images,
  basePriceJson,
  isTrending,
  category,
}: ProductCardProps) => {
  const minPrice = Math.min(...Object.values(basePriceJson));
  const categoryLabels: Record<string, string> = {
    cars: "سيارات",
    motorbikes: "دراجات نارية",
    art: "فنون",
    misc: "متنوع",
  };

  return (
    <Link to={`/product/${slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={images[0] || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {isTrending && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              رائج
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2">
            {categoryLabels[category]}
          </Badge>
          <h3 className="font-cairo font-semibold text-lg mb-1">{title}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">
            يبدأ من <span className="font-bold text-primary">{minPrice} جنيه</span>
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
