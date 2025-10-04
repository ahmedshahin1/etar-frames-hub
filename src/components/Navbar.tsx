import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import logoColored from "@/assets/logo-colored.png";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/explore", label: t('nav.explore') },
    { href: "/trends", label: t('nav.trends') },
    { href: "/category/cars", label: t('nav.cars') },
    { href: "/category/motorbikes", label: t('nav.motorbikes') },
    { href: "/category/art", label: t('nav.art') },
    { href: "/customize", label: t('nav.customize') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex lg:mr-6">
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <img src={logoColored} alt="ETAR" className="h-12 w-12" />
            <span className="hidden font-bold text-xl sm:inline-block font-cairo">
              إطار | ETAR
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex lg:gap-6 mr-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 mr-auto lg:mr-0">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
