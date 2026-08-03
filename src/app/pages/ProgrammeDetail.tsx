import { ProgrammeCard } from "@/components/cards/ProgrammeCard";
import { RequestInfoForm } from "@/components/forms/RequestInfoForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { getProgrammeBySlug, getProgrammes } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, courseJsonLd, Seo } from "@/lib/seo";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Clock,
  Download,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Link, useParams } from "react-router";

function NotFoundState() {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-black">Programme not found</h1>
      <p className="mt-3 text-mico-mid">
        The programme you are looking for may have been renamed or removed.
      </p>
      <div className="mt-8">
        <CTAButton href="/programmes" variant="black">
          Browse all programmes
          <ArrowRight aria-hidden="true" className="size-4" />
        </CTAButton>
      </div>
    </div>
  );
}

export default function ProgrammeDetail() {
  const { slug = "" } = useParams();
  const state = useAsyncData(() => getProgrammeBySlug(slug), [slug]);
  const allState = useAsyncData(getProgrammes);
  const programme = state.data;
  const all = allState.data ?? [];

  if (state.status === "error" || (state.status === "success" && !programme)) {
    return <NotFoundState />;
  }
  if (state.status === "loading" || !programme) {
    return (
      <div className="container-site py-24">
        <div className="h-8 w-2/3 animate-pulse bg-mico-light" />
        <div className="mt-6 h-64 animate-pulse bg-mico-light" />
      </div>
    );
  }

  const related = (programme.relatedSlugs ?? [])
    .map((s) => all.find((p) => p.slug === s))
    .filter(Boolean) as typeof all;

  return (
    <>
      <Seo
        title={programme.title}
        description={programme.overview}
        path={`/programmes/${programme.slug}`}
        type="course"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Programmes", href: "/programmes" },
            { label: programme.title, href: `/programmes/${programme.slug}` },
          ]),
          courseJsonLd({
            name: programme.title,
            description: programme.overview,
            provider: programme.faculty,
          }),
        ]}
      />

      <header className="bg-black pb-12 pt-8 text-white sm:pb-16">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Programmes", href: "/programmes" },
              { label: programme.title },
            ]}
          />
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-sm border border-mico-gold/60 bg-mico-gold-soft/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-mico-gold">
              {programme.level}
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-white/60">
              {programme.awardType}
            </span>
          </div>
          <h1 className="mt-5 max-w-4xl text-display text-white">{programme.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {programme.overview}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/admissions" variant="gold" size="lg">
              Apply Now
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
            <CTAButton href="#enquire" variant="outline-light" size="lg">
              Request Information
            </CTAButton>
          </div>
        </div>
      </header>

      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.8fr_1fr] sm:py-20">
        {/* Main content */}
        <div className="space-y-14">
          {programme.highlights && (
            <section aria-labelledby="highlights-heading">
              <SectionHeading as="h2" id="highlights-heading" eyebrow="Why this programme" title="Highlights" />
              <ul className="mt-6 space-y-3">
                {programme.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 border border-black/10 bg-mico-light p-4 text-sm text-mico-dark">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mico-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="overview" aria-labelledby="overview-heading">
            <SectionHeading as="h2" id="overview-heading" eyebrow="Overview" title="About this programme" />
            <p className="mt-5 text-base leading-relaxed text-mico-dark">{programme.overview}</p>
            <p className="mt-3 text-sm text-mico-mid">
              Placeholder content — full programme details will be supplied by the institution.
            </p>
          </section>

          <section id="structure" aria-labelledby="structure-heading">
            <SectionHeading as="h2" id="structure-heading" eyebrow="Course structure" title="What you will study" />
            <div className="mt-6 space-y-6">
              {programme.courseStructure.map((item) => (
                <div key={item.label} className="border border-black/10 bg-white p-6">
                  <h3 className="font-display text-base font-bold text-black">{item.label}</h3>
                  <p className="mt-1 text-sm text-mico-mid">{item.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.modules.map((module) => (
                      <li key={module} className="rounded-sm border border-mico-gold/40 bg-mico-gold-soft px-2.5 py-1 text-xs font-medium text-mico-gold-deep">
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="requirements" aria-labelledby="requirements-heading">
            <SectionHeading as="h2" id="requirements-heading" eyebrow="Entry requirements" title="What you need" />
            <ul className="mt-6 space-y-3">
              {programme.entryRequirements.map((req, i) => (
                <li key={req} className="flex items-start gap-3 text-sm text-mico-dark">
                  <span aria-hidden="true" className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-black font-display text-[0.6rem] font-bold text-mico-gold">
                    {i + 1}
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </section>

          <section id="careers" aria-labelledby="careers-heading">
            <SectionHeading as="h2" id="careers-heading" eyebrow="Your future" title="Career opportunities" />
            <ul className="mt-6 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
              {programme.careerOpportunities.map((career) => (
                <li key={career} className="bg-mico-light p-4 text-sm font-medium text-mico-dark">
                  {career}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="border border-black/10 bg-white p-6">
            <h2 className="font-display text-base font-bold text-black">Key facts</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <GraduationCap aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Award type</dt>
                  <dd className="text-mico-mid">{programme.awardType}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Faculty</dt>
                  <dd className="text-mico-mid">{programme.faculty}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Duration</dt>
                  <dd className="text-mico-mid">{programme.duration}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Study mode</dt>
                  <dd className="text-mico-mid">{programme.studyMode.join(", ")}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Campus</dt>
                  <dd className="text-mico-mid">{programme.campus}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="border border-black/10 bg-mico-light p-6">
            <h2 className="font-display text-base font-bold text-black">Tuition & fees</h2>
            <p className="mt-3 text-sm leading-relaxed text-mico-mid">{programme.fees.note}</p>
            {programme.fees.details?.map((detail) => (
              <p key={detail} className="mt-2 text-xs leading-relaxed text-mico-mid">
                • {detail}
              </p>
            ))}
          </div>

          <div className="border border-black/10 bg-white p-6">
            <h2 className="font-display text-base font-bold text-black">Application deadlines</h2>
            <ul className="mt-4 space-y-3">
              {programme.applicationDeadlines.map((deadline) => (
                <li key={deadline.term} className="flex items-start gap-3 text-sm">
                  <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                  <div>
                    <p className="font-semibold text-black">{deadline.term}</p>
                    <p className="text-mico-mid">
                      {deadline.deadline}
                      {deadline.note && (
                        <span className="text-xs"> ({deadline.note})</span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <CTAButton href={programme.brochureUrl ?? "/programmes"} variant="outline" className="w-full">
            <Download aria-hidden="true" className="size-4" />
            Download Brochure (placeholder)
          </CTAButton>

          <div id="enquire" className="border border-black/10 bg-white p-6">
            <h2 className="font-display text-base font-bold text-black">Request information</h2>
            <p className="mt-2 text-xs text-mico-mid">Ask about this programme.</p>
            <div className="mt-4">
              <RequestInfoForm programmeTitle={programme.title} compact />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-mico-light py-16 sm:py-20" aria-labelledby="related-heading">
          <div className="container-site">
            <SectionHeading id="related-heading" eyebrow="Related programmes" title="You may also like" />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <ProgrammeCard programme={p} />
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm">
              <Link to="/programmes" className="inline-flex items-center gap-1.5 font-semibold text-black hover:text-mico-gold-deep">
                View all programmes
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
