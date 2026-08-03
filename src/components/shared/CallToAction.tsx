import type { CTABlock } from "@/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { CTAButton } from "./CTAButton";

interface CallToActionProps {
  cta: CTABlock;
  /** Optional background image (dimmed). */
  image?: { src: string; alt: string };
}

/**
 * Full-width closing call to action — black background, display headline and
 * the site's primary action buttons.
 */
export function CallToAction({ cta, image }: CallToActionProps) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {image && (
        <>
          <img
            src={image.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </>
      )}
      <div className="container-site relative py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-mico-gold">
            <span aria-hidden="true" className="h-px w-8 bg-mico-gold" />
            Get started
          </p>
          <h2 className="text-display text-white">{cta.heading}</h2>
          {cta.description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {cta.description}
            </p>
          )}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CTAButton href={cta.primaryHref} variant="gold" size="lg">
              {cta.primaryLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
            {cta.secondaryLabel && cta.secondaryHref && (
              <CTAButton href={cta.secondaryHref} variant="outline-light" size="lg">
                {cta.secondaryLabel}
              </CTAButton>
            )}
          </div>
          {cta.links && cta.links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {cta.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="link-underline text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
