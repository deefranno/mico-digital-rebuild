import type { ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

type CTAVariant = "gold" | "black" | "outline" | "outline-light" | "link";
type CTASize = "sm" | "md" | "lg";

interface CTAButtonProps {
  href: string;
  variant?: CTAVariant;
  size?: CTASize;
  className?: string;
  children: ReactNode;
  /** Open in a new tab (for external placeholder links). */
  external?: boolean;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mico-gold";

const variants: Record<CTAVariant, string> = {
  gold: "bg-mico-gold text-black hover:bg-mico-gold-deep hover:text-white shadow-sm",
  black: "bg-black text-white hover:bg-mico-dark",
  outline:
    "border border-black/25 text-black hover:border-black hover:bg-black hover:text-white",
  "outline-light":
    "border border-white/40 text-white hover:bg-white hover:text-black",
  link: "text-mico-gold-deep underline-offset-4 hover:underline p-0",
};

const sizes: Record<CTASize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Primary action button. Renders a react-router `<Link>` when the href is an
 * internal path, otherwise a real anchor (external links, mailto, #anchors).
 */
export function CTAButton({
  href,
  variant = "gold",
  size = "md",
  className,
  children,
  external,
  ariaLabel,
}: CTAButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <Link to={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
