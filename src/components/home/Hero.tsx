import { CTAButton } from "@/components/shared/CTAButton";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site";
import { ArrowRight, ChevronDown } from "lucide-react";

/**
 * Full-width homepage hero. The header sits transparently above this section
 * (see SiteHeader). Dark overlay keeps white text readable.
 */
export function Hero() {
  return (
    <section className="relative isolate -mt-[4.5rem] min-h-[92vh] overflow-hidden bg-black">
      <img
        src={images.heroCampus.src}
        alt={images.heroCampus.alt}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

      <div className="container-site relative flex min-h-[92vh] flex-col justify-end pb-16 pt-40 sm:pb-20">
        <div className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mico-gold">
            <span aria-hidden="true" className="h-px w-10 bg-mico-gold" />
            {siteConfig.name} · Est. {siteConfig.founded}
          </p>
          <h1 className="text-hero text-white">{siteConfig.tagline}</h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CTAButton href="/programmes" variant="gold" size="lg">
              Explore Programmes
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
            <CTAButton href="/admissions" variant="outline-light" size="lg">
              Apply Now
            </CTAButton>
          </div>
        </div>

        <div className="mt-16 hidden justify-center sm:flex" aria-hidden="true">
          <a
            href="#quick-links"
            className="flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-mico-gold"
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em]">
              Scroll
            </span>
            <ChevronDown className="size-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
