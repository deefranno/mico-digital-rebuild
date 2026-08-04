import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Floating "back to top" button. Appears after the visitor scrolls past the
 * first viewport with a spring pop-in animation, shows a black progress ring
 * that fills as they descend, and smooth-scrolls back to the top on click.
 * Gold button with a black arrow that fully reverses to a black button with a
 * gold arrow + gold ring on hover. Includes focus + reduced-motion support.
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
      style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 50 }}
      className={cn(
        "group flex size-12 items-center justify-center rounded-full",
        // Default: gold button, black arrow
        "bg-mico-gold text-mico-black shadow-lg shadow-mico-gold/40 ring-1 ring-mico-gold-deep/30",
        // Hover: fully reversed — black button, gold arrow
        "hover:-translate-y-1 hover:bg-mico-black hover:text-mico-gold hover:shadow-xl hover:shadow-black/40 hover:ring-mico-gold",
        "transition-all duration-200 ease-out motion-reduce:transition-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mico-black",
        visible
          ? "animate-back-to-top-pop"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      {/* Scroll-progress ring — colors swap on hover alongside the button */}
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
          className="text-black/15 transition-colors duration-200 group-hover:text-mico-gold/25"
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
          className="text-mico-black transition-colors duration-200 group-hover:text-mico-gold"
        />
      </svg>
      <ArrowUp
        aria-hidden="true"
        className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
    </button>
  );
}
