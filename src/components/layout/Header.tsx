"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { company } from "@/data/company";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";
import CallConfirmModal from "./CallConfirmModal";
import municipalities from "@/data/municipalities.json";

const citySlugs = new Set(municipalities.map(city => city.slug));

const navigation = [
  {
    name: "Leistungen",
    href: "/leistungen",
    submenu: [
      { name: "Rohrreinigung", href: "/service/rohrreinigung" },
      { name: "Kanalreinigung", href: "/service/kanalreinigung" },
      { name: "Abflussreinigung", href: "/service/abflussreinigung" },
      { name: "Notdienst 24/7", href: "/service/rohrreinigung-notdienst" },
      { name: "TV-Inspektion", href: "/service/kamera-inspektion" },
    ]
  },
  { name: "Preise", href: "/preise" },
  { name: "Einsatzgebiet", href: "/staedte" },
  { name: "Für Gewerbe", href: "/hausverwaltung" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
];

// Pages with dark/gradient hero sections that need light text when not scrolled
// Note: /staedte has a LIGHT hero, so not included here
const darkHeroPages = ["/", "/service", "/preise", "/hausverwaltung", "/faq"];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  // Check if current page has a dark hero
  const hasDarkHero = darkHeroPages.some(page =>
    page === "/" ? pathname === "/" : pathname.startsWith(page)
  ) || citySlugs.has(pathname.split("/")[1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePhoneClick = () => {
    setIsMobileMenuOpen(false);
    setIsCallModalOpen(true);
  };

  // Determine text color based on scroll state and page type
  const getTextColorClasses = () => {
    if (isScrolled) {
      return "text-gray-900 dark:text-white";
    }
    if (hasDarkHero) {
      return "text-white";
    }
    return "text-gray-900 dark:text-white";
  };

  const getNavTextColorClasses = () => {
    if (isScrolled) {
      return "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary";
    }
    if (hasDarkHero) {
      return "text-white/90 hover:text-white";
    }
    return "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary";
  };

  return (
    <>
      {/* Call Confirmation Modal */}
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="header"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg py-2"
            : hasDarkHero
              ? "bg-black/10 backdrop-blur-sm py-4"
              : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <AnimatedLogo />
              <div className="flex flex-col">
                <span className={`text-lg md:text-xl font-bold transition-colors ${getTextColorClasses()} group-hover:text-primary`}>
                  Rohrreinigung
                </span>
                <span className="text-sm font-semibold text-primary">Kraft</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10 ${getNavTextColorClasses()}`}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Submenu */}
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-56 animate-fade-in-up">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 overflow-hidden">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle onDarkBackground={!isScrolled && hasDarkHero} />
              <Button
                onClick={handlePhoneClick}
                className="gradient-primary text-white hover:opacity-90 btn-shimmer gap-2 font-semibold shadow-lg shadow-primary/30"
              >
                <Phone className="w-4 h-4" />
                {company.contact.phoneDisplay}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle onDarkBackground={!isScrolled && hasDarkHero} />
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    aria-label="Menü öffnen"
                    variant="ghost"
                    size="icon"
                    className={`lg:hidden ${!isScrolled && hasDarkHero ? "text-white hover:bg-white/10" : ""}`}
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] max-w-[90vw] p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetDescription className="sr-only">Leistungen, Einsatzgebiet und Kontakt</SheetDescription>
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <AnimatedLogo size="sm" />
                        <span className="font-bold text-gray-900 dark:text-white">Rohrreinigung Kraft</span>
                      </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                      {navigation.map((item) => (
                        <div key={item.name} className="mb-2">
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                          >
                            {item.name}
                          </Link>
                          {item.submenu && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>

                    {/* Mobile CTA */}
                    <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
                      <Button
                        onClick={handlePhoneClick}
                        className="w-full gradient-primary text-white gap-2 font-semibold h-12"
                      >
                        <Phone className="w-5 h-5" />
                        Jetzt anrufen
                      </Button>
                      <p className="text-center text-sm text-gray-500 mt-2">
                        24/7 Notdienst verfügbar
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
