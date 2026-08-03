import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scroll restoration for the SPA: scrolls to the top on navigation, or to
 * the matching element when the URL contains a hash (e.g. /about#history).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
