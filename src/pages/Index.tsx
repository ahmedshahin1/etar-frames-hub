import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Car, Bike, Palette, Sparkles, Frame } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Index = () => {
  const categories = [
    {
      icon: Car,
      title: "للسيارات",
      description: "إطارات مخصصة لسيارتك المميزة",
      href: "/category/cars",
    },
    {
      icon: Bike,
      title: "للدراجات النارية",
      description: "تصاميم فريدة لدراجتك",
      href: "/category/motorbikes",
    },
    {
      icon: Palette,
      title: "للفنون",
      description: "إطارات أنيقة للوحاتك الفنية",
      href: "/category/art",
    },
    {
      icon: Frame,
      title: "متنوع",
      description: "شهادات، مرايا، وأكثر",
      href: "/category/misc",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center gap-8">
            <img
              src={logo}
              alt="ETAR Logo"
              className="h-32 w-32 rounded-2xl shadow-xl"
            />
            <h1 className="font-cairo font-bold text-4xl lg:text-6xl text-primary-foreground max-w-3xl">
              أطر مخصصة تعكس شخصيتك
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl">
              صمم إطارك الخاص لسيارتك، دراجتك النارية، أو لوحاتك الفنية
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="font-cairo">
                <Link to="/customize">
                  <Frame className="ml-2 h-5 w-5" />
                  ابدأ التخصيص
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
                asChild
              >
                <Link to="/explore">استكشف المنتجات</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="font-cairo font-bold text-3xl text-center mb-12">
            تصفح حسب الفئة
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.href}
                  to={cat.href}
                  className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="rounded-full bg-primary/10 p-4 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-cairo font-semibold text-xl mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Sparkles className="h-6 w-6 text-accent" />
            <h2 className="font-cairo font-bold text-3xl text-center">
              الأكثر رواجاً
            </h2>
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/trends">عرض جميع المنتجات الرائجة</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="rounded-2xl bg-primary p-8 lg:p-16 text-center">
            <h2 className="font-cairo font-bold text-3xl lg:text-4xl text-primary-foreground mb-4">
              لديك تصميم خاص؟
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              ارفع صورتك الخاصة وسنقوم بإنشاء إطار مخصص يناسب احتياجاتك تماماً
            </p>
            <Button size="lg" variant="secondary" asChild className="font-cairo">
              <Link to="/customize">
                <Frame className="ml-2 h-5 w-5" />
                صمم إطارك الآن
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-cairo">© 2025 إطار | ETAR. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
