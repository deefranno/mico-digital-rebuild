import { siteConfig } from "@/data/site";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "dark" for light backgrounds (black text), "light" for dark backgrounds. */
  variant?: "dark" | "light";
  withWordmark?: boolean;
  className?: string;
  /** Renders the logo as a link to the homepage. */
  to?: string;
}

/**
 * Official Mico crest + wordmark.
 *
 * The crest image is `public/assets/micologo.jpeg` (referenced through
 * `siteConfig.logo`). On dark backgrounds ("light" variant) it is shown on a
 * small white tile so the crest's white background blends cleanly.
 */
export function Logo({
  variant = "dark",
  withWordmark = true,
  className,
  to = "/",
}: LogoProps) {
  const mark = (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center",
        variant === "light" && "rounded-sm bg-white p-1 shadow-sm",
      )}
    >
      <img
        src={siteConfig.logo}
        alt=""
        width={64}
        height={64}
        className="h-12 w-auto sm:h-14"
        aria-hidden="true"
      />
    </span>
  );

  const wordmark = withWordmark ? (
    // Hidden below xl so the 9-item desktop mega-menu keeps enough width on
    // mid-size screens; the crest remains as the brand mark until xl.
    <span className="hidden flex-col leading-none xl:flex">
      <span
        className={cn(
          "font-display text-lg font-extrabold uppercase tracking-[0.14em]",
          variant === "light" ? "text-white" : "text-black",
        )}
      >
        The Mico
      </span>
      <span
        className={cn(
          "mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em]",
          variant === "light" ? "text-white/70" : "text-mico-mid",
        )}
      >
        University College
      </span>
    </span>
  ) : null;

  const inner = (
    <span className={cn("flex items-center gap-3", className)}>
      {mark}
      {wordmark}
    </span>
  );

  if (to) {
    return (
      <Link
        to={to}
        aria-label={`${siteConfig.name} — home`}
        className="inline-flex items-center rounded-sm"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}
