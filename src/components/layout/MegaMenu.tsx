import { mainNavigation } from "@/data/site";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

/**
 * Desktop mega menu. Keyboard accessible:
 *  - Tab reaches each trigger; Enter/Space toggles the panel
 *  - Tab moves through the panel links; Escape closes and returns focus
 *  - Hover opens/closes with a small delay guard
 * The panel closes automatically when the route changes.
 */
export function MegaMenu({ tone }: { tone: "light" | "dark" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();
  const rootRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);

  // Close when navigating
  useEffect(() => {
    setOpenIndex(null);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  function openWithDelay(index: number | null) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (index !== null) {
      setOpenIndex(index);
    } else {
      closeTimer.current = window.setTimeout(() => setOpenIndex(null), 120);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    if (event.key === "Escape" && openIndex === index) {
      setOpenIndex(null);
      const trigger = rootRef.current?.querySelector<HTMLButtonElement>(
        `#mega-trigger-${index}`,
      );
      trigger?.focus();
    }
  }

  // whitespace-nowrap keeps two-word labels ("News & Events", "Student Life")
  // on a single line even when the header row is tight.
  const linkClass = cn(
    "inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-sm font-semibold transition-colors",
    tone === "light" ? "text-white hover:text-mico-gold" : "text-black hover:text-mico-gold-deep",
  );

  return (
    <nav aria-label="Main navigation" ref={rootRef} className="hidden lg:block">
      <ul className="flex items-center">
        {mainNavigation.map((item, index) => (
          <li
            key={item.label}
            onMouseEnter={() => openWithDelay(index)}
            onMouseLeave={() => openWithDelay(null)}
            className="relative"
          >
            {item.children && item.children.length > 0 ? (
              <>
                <button
                  id={`mega-trigger-${index}`}
                  type="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`mega-panel-${index}`}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={cn(linkClass, "cursor-pointer")}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-3.5 transition-transform",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </button>
                <div
                  id={`mega-panel-${index}`}
                  className={cn(
                    "absolute left-0 top-full z-40 w-[26rem] border-t-2 border-mico-gold bg-white shadow-xl",
                    openIndex === index ? "block" : "hidden",
                  )}
                >
                  <p className="px-6 pb-1 pt-5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-mico-mid">
                    {item.label}
                  </p>
                  <ul className="grid gap-1 p-3">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          to={child.href}
                          onClick={() => setOpenIndex(null)}
                          className="group flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-mico-light"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mico-gold transition-transform group-hover:scale-150"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-black group-hover:text-mico-gold-deep">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 block text-xs text-mico-mid">
                                {child.description}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <Link to={item.href} className={linkClass}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
