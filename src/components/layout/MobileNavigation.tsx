import { mainNavigation as fallbackNavigation } from "@/data/site";
import { getMainNavigation } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { CTAButton } from "@/components/shared/CTAButton";
import { Plus, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Slide-out mobile navigation drawer.
 *  - `role="dialog"` + `aria-modal` with a labelled heading
 *  - Native `<details>` accordions for nested items (keyboard accessible)
 *  - Escape closes, body scroll is locked, focus returns to the toggle
 * Menu items come from the content service (WordPress when configured).
 */
export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const location = useLocation();
  const closeRef = useRef<HTMLButtonElement>(null);

  const { data } = useAsyncData(getMainNavigation);
  const navigation = data ?? fallbackNavigation;

  // Close on route change
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock body scroll + Escape + focus the close button when opened
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-black">
            Menu
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-sm p-2 text-mico-mid transition-colors hover:bg-mico-light hover:text-black"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      className="flex items-center justify-between rounded-sm px-3 py-3 text-base font-semibold text-black transition-colors hover:bg-mico-light"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-sm px-3 py-3 text-base font-semibold text-black transition-colors hover:bg-mico-light [&::-webkit-details-marker]:hidden">
                      <NavLink
                        to={item.href}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1"
                      >
                        {item.label}
                      </NavLink>
                      <Plus
                        aria-hidden="true"
                        className="size-4 shrink-0 text-mico-mid transition-transform group-open:rotate-45"
                      />
                    </summary>
                    <ul className="mb-2 ml-3 border-l border-black/10 pl-3">
                      {item.children!.map((child) => (
                        <li key={child.label}>
                          <NavLink
                            to={child.href}
                            className="block rounded-sm px-3 py-2.5 text-sm text-mico-mid transition-colors hover:bg-mico-light hover:text-black"
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={cn("border-t border-black/10 p-5")}>
          <CTAButton href="/admissions" variant="gold" size="lg" className="w-full">
            Apply Now
          </CTAButton>
          <p className="mt-3 text-center text-xs text-mico-mid">
            Marescaux Road, Kingston 5, Jamaica
          </p>
        </div>
      </div>
    </div>
  );
}
