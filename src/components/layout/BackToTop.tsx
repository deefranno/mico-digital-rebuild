import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Floating "back to top" button. Appears after the visitor scrolls past the
 * first viewport, with a gold progress ring that fills as they descend and a
 * smooth scroll back to the top on click. Matches the site's black/gold
 * minimalism and includes focus + reduced-motion support.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 480);
      setProgress(scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/30 transition-all duration-300 motion-reduce:transition-none",
        "hover:-translate-y-1 hover:bg-mico-gold hover:text-black hover:shadow-xl hover:shadow-mico-gold/30",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mico-gold",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {/* Scroll-progress ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="absolute inset-0 size-full -rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-white/20 transition-colors duration-300 group-hover:text-black/15"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          className="text-mico-gold transition-colors duration-300 group-hover:text-black"
        />
      </svg>
      <ArrowUp
        aria-hidden="true"
        className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </button>
  );
}
