import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { featuredResearch, researchAreas, researchCentres } from "@/data/research";
import { Icon } from "@/lib/icon-map";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight, BookOpen, FileText, Globe2, Library } from "lucide-react";
import { Link } from "react-router";

export default function Research() {
  return (
    <>
      <Seo
        title="Research & Impact"
        description="Research at The Mico University College — centres, publications, partnerships and applied inquiry that serves Jamaican education."
        path="/research"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Research", href: "/research" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Research & impact"
        title="Inquiry that changes classrooms"
        description="Mico research is applied, collaborative and rooted in the needs of Jamaican education. (Placeholder content throughout.)"
        crumbs={[{ label: "Research" }]}
      >
        <CTAButton href="/contact#enquiry" variant="outline-light">
          Partner with Mico Research
          <ArrowRight aria-hidden="true" className="size-4" />
        </CTAButton>
      </PageHeader>

      {/* Research areas */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="areas-heading">
        <div className="container-site">
          <SectionHeading
            id="areas-heading"
            eyebrow="Research areas"
            title="What we study"
          />
          <ul className="mt-12 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <li key={area.id} className="bg-white p-7 transition-colors duration-300 hover:bg-mico-gold-soft">
                <Icon name={area.icon} className="size-6 text-mico-gold-deep" />
                <h3 className="mt-4 font-display text-base font-bold text-black">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mico-mid">{area.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured story */}
      <section className="bg-black py-16 text-white sm:py-20" aria-labelledby="featured-research-heading">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <Link to={featuredResearch.href} className="group block overflow-hidden">
            <img
              src={featuredResearch.image.src}
              alt={featuredResearch.image.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-mico-gold">
              Featured research · {formatDate(featuredResearch.date)}
            </p>
            <SectionHeading
              id="featured-research-heading"
              eyebrow="Featured story"
              title={featuredResearch.title}
              tone="light"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/70">{featuredResearch.excerpt}</p>
            <Link
              to={featuredResearch.href}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mico-gold transition-colors hover:text-white"
            >
              Read the story
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Research centres */}
      <section id="centres" className="bg-mico-light py-16 sm:py-20" aria-labelledby="centres-heading">
        <div className="container-site">
          <SectionHeading
            id="centres-heading"
            eyebrow="Research centres"
            title="Focused centres of inquiry"
            description="Placeholder centres — names and descriptions to be confirmed by the institution."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {researchCentres.map((centre) => (
              <li key={centre.id} className="border border-black/10 bg-white p-7">
                <Library aria-hidden="true" className="size-5 text-mico-gold-deep" />
                <h3 className="mt-4 font-display text-base font-bold text-black">{centre.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mico-mid">{centre.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Publications + partnerships */}
      <section id="publications" className="bg-white py-16 sm:py-20" aria-labelledby="pub-heading">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="border border-black/10 bg-white p-8">
            <BookOpen aria-hidden="true" className="size-6 text-mico-gold-deep" />
            <SectionHeading id="pub-heading" eyebrow="Publications" title="Research outputs" />
            <p className="mt-4 text-sm leading-relaxed text-mico-mid">
              Journal articles, working papers, conference proceedings and
              postgraduate theses from Mico researchers. (Placeholder — a full
              publications list will be added.)
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-mico-dark">
              <li>Annual research symposium proceedings</li>
              <li>Working paper series</li>
              <li>Graduate theses repository</li>
            </ul>
          </div>
          <div id="partnerships" className="border border-black/10 bg-mico-light p-8">
            <Globe2 aria-hidden="true" className="size-6 text-mico-gold-deep" />
            <SectionHeading eyebrow="Partnerships" title="Working together" />
            <p className="mt-4 text-sm leading-relaxed text-mico-mid">
              Mico collaborates with ministries, schools, universities and
              regional bodies. (Placeholder — partner details to be confirmed.)
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-mico-dark">
              <li>Ministry of Education partnerships</li>
              <li>Regional universities and research networks</li>
              <li>School-based research collaborations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outputs note */}
      <section className="bg-black py-14 text-white">
        <div className="container-site flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold">Have a research question?</h2>
            <p className="mt-2 text-sm text-white/65">
              Contact the Graduate Studies and Research office (placeholder).
            </p>
          </div>
          <CTAButton href="/contact#enquiry" variant="gold">
            <FileText aria-hidden="true" className="size-4" />
            Contact Research Office
          </CTAButton>
        </div>
      </section>
    </>
  );
}
