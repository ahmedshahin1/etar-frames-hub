import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  // Cart functionality will be implemented later
  const cartItems: any[] = [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-cairo font-bold text-4xl mb-8">سلة التسوق</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="font-cairo text-2xl font-semibold mb-2">
              سلة التسوق فارغة
            </h2>
            <p className="text-muted-foreground mb-6">
              ابدأ بإضافة منتجات إلى سلتك
            </p>
            <Button asChild>
              <Link to="/explore">تصفح المنتجات</Link>
            </Button>
          </div>
        ) : (
          <div>
            {/* Cart items will be displayed here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
