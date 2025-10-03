import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const Explore = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-cairo font-bold text-4xl mb-8">استكشف جميع المنتجات</h1>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                title={product.title}
                images={product.images}
                basePriceJson={product.base_price_json as Record<string, number>}
                isTrending={product.is_trending}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
