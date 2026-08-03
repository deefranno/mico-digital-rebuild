import { Outlet } from "react-router";
import { ScrollToTop } from "./ScrollToTop";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/**
 * Public site shell — used by every route except the auth flow.
 * Includes the skip-to-content link (WCAG 2.4.1) and semantic landmarks.
 */
export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
