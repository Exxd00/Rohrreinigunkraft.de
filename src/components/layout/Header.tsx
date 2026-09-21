"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Phone,
  MapPin,
  Wrench,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { company } from "@/data/company";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";
import CallConfirmModal from "./CallConfirmModal";
import municipalities from "@/data/municipalities.json";
const citySlugs = new Set(municipalities.map((city) => city.slug));
const navigation = [
  { name: "Leistungen", href: "/leistungen" },
  { name: "Städte", href: "/staedte" },
  { name: "Preise", href: "/preise" },
  { name: "Für Gewerbe", href: "/hausverwaltung" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
];
const quickServices = [
  { name: "Rohrreinigung", slug: "rohrreinigung" },
  { name: "Kanalreinigung", slug: "kanalreinigung" },
  { name: "Abflussreinigung", slug: "abflussreinigung" },
  { name: "Notdienst 24/7", slug: "rohrreinigung-notdienst" },
  { name: "TV-Inspektion", slug: "kamera-inspektion" },
];
const darkHeroPages = ["/", "/service", "/preise", "/hausverwaltung", "/faq"];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const hasDarkHero =
    darkHeroPages.some((page) =>
      page === "/" ? pathname === "/" : pathname.startsWith(page),
    ) || citySlugs.has(pathname.split("/")[1]);
  const lightText = !isScrolled && hasDarkHero;
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  const closeMenu = () => setIsMobileMenuOpen(false);
  const handlePhoneClick = () => {
    closeMenu();
    setIsCallModalOpen(true);
  };
  const isActive = (href: string) =>
    pathname === href ||
    (href === "/staedte" && citySlugs.has(pathname.split("/")[1])) ||
    (href === "/leistungen" && pathname.startsWith("/service/"));
  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="header"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 py-3 transition-colors motion-reduce:transition-none ${isScrolled ? "bg-white/95 shadow-lg backdrop-blur-lg dark:bg-gray-900/95" : hasDarkHero ? "bg-black/10 backdrop-blur-sm" : "bg-white/90 backdrop-blur-sm dark:bg-gray-900/90"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              aria-label="Rohrreinigung Kraft – Startseite"
              className="group flex shrink-0 items-center gap-2"
            >
              <AnimatedLogo />
              <div className="flex flex-col">
                <span
                  className={`text-base font-bold sm:text-lg ${lightText ? "text-white" : "text-gray-900 dark:text-white"}`}
                >
                  Rohrreinigung
                </span>
                <span className="text-sm font-semibold text-primary">
                  Kraft
                </span>
              </div>
            </Link>
            <nav
              aria-label="Hauptnavigation"
              className="hidden items-center gap-1 xl:flex"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold transition-colors ${lightText ? "text-white hover:bg-white/15" : "text-gray-700 hover:bg-sky-50 hover:text-sky-800 dark:text-gray-200 dark:hover:bg-slate-800"} ${isActive(item.href) ? "underline decoration-2 underline-offset-8" : ""}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-3 xl:flex">
              <ThemeToggle onDarkBackground={lightText} />
              <Button
                onClick={handlePhoneClick}
                className="min-h-11 gap-2 bg-sky-700 font-semibold text-white shadow-lg hover:bg-sky-800"
              >
                <Phone className="h-4 w-4" />
                {company.contact.phoneDisplay}
              </Button>
            </div>
            <div className="flex items-center gap-1 xl:hidden">
              <Button
                aria-label="Anrufen"
                onClick={handlePhoneClick}
                variant="ghost"
                size="icon"
                className={`h-11 w-11 ${lightText ? "text-white hover:bg-white/10" : "text-sky-800 dark:text-sky-300"}`}
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    aria-label="Menü öffnen"
                    variant="ghost"
                    size="icon"
                    className={`h-11 w-11 ${lightText ? "text-white hover:bg-white/10" : ""}`}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[360px] max-w-[94vw] p-0"
                >
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetDescription className="sr-only">
                    Leistungen, Städte und Gemeinden sowie Kontakt
                  </SheetDescription>
                  <div className="flex h-full min-h-0 flex-col">
                    <div className="flex items-center justify-between gap-1 border-b p-4 pr-14">
                      <Link
                        href="/"
                        onClick={closeMenu}
                        className="inline-flex min-h-11 items-center gap-2 font-bold text-gray-900 dark:text-white"
                      >
                        <AnimatedLogo size="sm" />
                        <span>Kraft · Startseite</span>
                      </Link>
                      <ThemeToggle />
                    </div>
                    <nav
                      aria-label="Mobile Navigation"
                      className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4"
                    >
                      {[
                        {
                          name: "Leistungen",
                          description: "Hilfe nach Anliegen finden",
                          href: "/leistungen",
                          icon: Wrench,
                        },
                        {
                          name: "Städte & Gemeinden",
                          description: "Ihren Ort im 30-km-Gebiet finden",
                          href: "/staedte",
                          icon: MapPin,
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                          className="mb-3 flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sky-950 hover:border-sky-400 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100"
                        >
                          <item.icon
                            className="h-5 w-5 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block font-bold">{item.name}</span>
                            <span className="mt-1 block text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                              {item.description}
                            </span>
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                        </Link>
                      ))}
                      {navigation.slice(2).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                          className="mb-1 flex min-h-12 items-center rounded-lg px-4 font-medium text-gray-700 hover:bg-sky-50 dark:text-gray-200 dark:hover:bg-slate-800"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <details className="mt-3 border-t pt-2">
                        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 px-4 text-sm font-semibold">
                          Häufig gesuchte Leistungen
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        </summary>
                        <div className="space-y-1">
                          {quickServices.map((item) => (
                            <Link
                              key={item.slug}
                              href={`/service/${item.slug}`}
                              onClick={closeMenu}
                              className="flex min-h-11 items-center rounded-lg px-4 text-sm text-slate-600 hover:bg-sky-50 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </details>
                    </nav>
                    <div className="border-t bg-slate-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:bg-slate-900">
                      <Button
                        onClick={handlePhoneClick}
                        className="h-12 w-full gap-2 bg-sky-700 font-semibold text-white hover:bg-sky-800"
                      >
                        <Phone className="h-5 w-5" />
                        Jetzt anrufen
                      </Button>
                      <p className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
                        24/7 telefonische Notdienstaufnahme
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
