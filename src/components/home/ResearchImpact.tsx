import { SectionHeading } from "@/components/shared/SectionHeading";
import { featuredResearch, researchAreas } from "@/data/research";
import { Icon } from "@/lib/icon-map";
import { formatDate } from "@/lib/format";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/** Research & impact — featured story and six research areas. */
export function ResearchImpact() {
  return (
    <section className="bg-mico-light py-16 sm:py-24" aria-labelledby="research-heading">
      <div className="container-site">
        <SectionHeading
          id="research-heading"
          eyebrow="Research & impact"
          title="Inquiry that changes classrooms"
          description="Mico researchers study the questions that matter for Jamaican education — and put the answers to work."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Featured research story */}
          <Link
            to={featuredResearch.href}
            className="group relative block overflow-hidden bg-black"
          >
            <img
              src={featuredResearch.image.src}
              alt={featuredResearch.image.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-mico-gold">
                Featured research · {formatDate(featuredResearch.date)}
              </p>
              <h3 className="mt-3 font-display text-xl font-extrabold leading-snug text-white sm:text-2xl">
                {featuredResearch.title}
              </h3>
              <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-white/75 sm:block">
                {featuredResearch.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mico-gold transition-colors group-hover:text-white">
                Read the research story
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>

          {/* Research areas */}
          <ul className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
            {researchAreas.map((area) => (
              <li key={area.id} className="bg-white">
                <Link
                  to="/research"
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-mico-gold-soft"
                >
                  <Icon
                    name={area.icon}
                    className="size-5 text-mico-gold-deep transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mt-4 font-display text-sm font-bold text-black">
                    {area.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-mico-mid">
                    {area.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 rounded-sm border border-black/25 px-6 py-3 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            Explore research at Mico
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
