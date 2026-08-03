import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** "light" = for dark backgrounds, "default" = for light backgrounds. */
  tone?: "default" | "light";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

/**
 * Consistent section header: gold eyebrow, display heading and optional
 * supporting text. Keeps the editorial hierarchy uniform across the site.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn("max-w-3xl", centered && "mx-auto text-center", className)}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em]",
            tone === "light" ? "text-mico-gold" : "text-mico-gold-deep",
            centered && "justify-center",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("h-px w-8", tone === "light" ? "bg-mico-gold" : "bg-mico-gold-deep")}
          />
          {eyebrow}
          {centered && (
            <span
              aria-hidden="true"
              className={cn("h-px w-8", tone === "light" ? "bg-mico-gold" : "bg-mico-gold-deep")}
            />
          )}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "text-section",
          tone === "light" ? "text-white" : "text-black",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-white/70" : "text-mico-mid",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
