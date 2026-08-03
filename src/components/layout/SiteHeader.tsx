import { Logo } from "@/components/shared/Logo";
import { CTAButton } from "@/components/shared/CTAButton";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { SearchOverlay } from "./SearchOverlay";
import { UtilityBar } from "./UtilityBar";

/**
 * Site header.
 *
 * On the homepage the header starts transparent over the hero (white text)
 * and transitions to a solid white header after the user scrolls. On every
 * other page it is solid white from the start.
 */
export function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      <UtilityBar onOpenSearch={() => setSearchOpen(true)} />
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-300",
          transparent
            ? "bg-transparent"
            : "border-b border-black/10 bg-white shadow-sm",
        )}
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
          <Logo variant={transparent ? "light" : "dark"} />

          <MegaMenu tone={transparent ? "light" : "dark"} />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className={cn(
                "rounded-sm p-2.5 transition-colors",
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-mico-light",
              )}
            >
              <Search aria-hidden="true" className="size-5" />
            </button>

            <div className="hidden md:block">
              <CTAButton href="/admissions" variant="gold" size="sm" className="px-5">
                Apply Now
              </CTAButton>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className={cn(
                "rounded-sm p-2.5 transition-colors lg:hidden",
                transparent
                  ? "text-white hover:bg-white/10"
                  : "text-black hover:bg-mico-light",
              )}
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
