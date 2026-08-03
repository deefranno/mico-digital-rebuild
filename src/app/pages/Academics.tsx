import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { images } from "@/data/images";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight, BookOpen, Briefcase, CalendarDays, GraduationCap, Layers } from "lucide-react";
import { Link } from "react-router";

const academicLevels = [
  {
    icon: GraduationCap,
    title: "Undergraduate",
    text: "Bachelor's degrees and diplomas across education, humanities, science and technology.",
    href: "/programmes?level=Undergraduate",
    cta: "Browse undergraduate",
  },
  {
    icon: BookOpen,
    title: "Graduate Studies",
    text: "Master's, M.Phil. and Ph.D. programmes with a strong research tradition.",
    href: "/programmes?level=Graduate",
    cta: "Browse graduate",
  },
  {
    icon: Briefcase,
    title: "Professional Development",
    text: "Evening, weekend and online courses that keep practising professionals current.",
    href: "/programmes?level=Professional Development",
    cta: "Browse professional development",
  },
  {
    icon: Layers,
    title: "Certificate & Short Courses",
    text: "Focused certificates and short courses for specific skills and audiences.",
    href: "/programmes?level=Certificate",
    cta: "Browse certificates",
  },
];

export default function Academics() {
  return (
    <>
      <Seo
        title="Academics"
        description="Academic life at The Mico University College — undergraduate and graduate programmes, faculties, professional development, short courses and the academic calendar."
        path="/academics"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Academics", href: "/academics" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Academics"
        title="Programmes built for real classrooms"
        description="From your first degree to doctoral study and professional development, Mico offers pathways for every stage of an educator's journey."
        crumbs={[{ label: "Academics" }]}
      >
        <CTAButton href="/programmes" variant="gold">
          Explore all programmes
          <ArrowRight aria-hidden="true" className="size-4" />
        </CTAButton>
      </PageHeader>

      {/* Study levels */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="levels-heading">
        <div className="container-site">
          <SectionHeading
            id="levels-heading"
            eyebrow="Study levels"
            title="Choose your level"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {academicLevels.map((level) => (
              <li key={level.title} className="group border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg">
                <level.icon aria-hidden="true" className="size-6 text-mico-gold-deep" />
                <h3 className="mt-4 font-display text-lg font-bold text-black">{level.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mico-mid">{level.text}</p>
                <Link
                  to={level.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors group-hover:text-mico-gold-deep"
                >
                  {level.cta}
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Faculties strip */}
      <section className="bg-black py-16 text-white sm:py-20" aria-labelledby="units-heading">
        <div className="container-site flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <SectionHeading
              id="units-heading"
              eyebrow="Academic units"
              title="Five faculties, one mission"
              tone="light"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Our programmes are delivered by five academic units — explore each
              one's departments, staff and offerings.
            </p>
          </div>
          <CTAButton href="/faculties" variant="gold">
            Explore faculties
            <ArrowRight aria-hidden="true" className="size-4" />
          </CTAButton>
        </div>
      </section>

      {/* Graduate + professional + calendar */}
      <section id="graduate" className="bg-white py-16 sm:py-20" aria-labelledby="grad-heading">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="border border-black/10 bg-white p-8">
            <SectionHeading id="grad-heading" eyebrow="Graduate studies" title="Research at the highest level" />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              Graduate study at Mico combines rigorous coursework with
              supervised research that speaks directly to Jamaican education.
              (Placeholder copy.)
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-mico-dark">
              <li>Master of Education (Educational Leadership)</li>
              <li>M.Phil. and Ph.D. in Education</li>
              <li>Research centres and graduate seminars</li>
            </ul>
            <Link to="/research" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-mico-gold-deep">
              Visit Research
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div id="professional" className="border border-black/10 bg-white p-8">
            <SectionHeading eyebrow="Professional development" title="Grow while you work" />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              Evening, weekend and online courses for teachers, leaders and
              professionals who want to stay current. (Placeholder copy.)
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-mico-dark">
              <li>Educational technology for the classroom</li>
              <li>Data literacy for educators</li>
              <li>Certificate courses and custom training</li>
            </ul>
            <CTAButton href="/contact#enquiry" variant="black" className="mt-6">
              Enquire about training
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Academic calendar */}
      <section id="calendar" className="bg-mico-light py-16 sm:py-20" aria-labelledby="calendar-heading">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="calendar-heading" eyebrow="Academic calendar" title="Semesters and key dates" />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              The academic year runs on two main semesters with a summer session.
              (Placeholder — the full academic calendar will be published here.)
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3 border border-black/10 bg-white p-4">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-mico-gold-deep" />
                Semester One — September to December (placeholder)
              </li>
              <li className="flex items-center gap-3 border border-black/10 bg-white p-4">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-mico-gold-deep" />
                Semester Two — January to May (placeholder)
              </li>
            </ul>
          </div>
          <img
            src={images.lecture.src}
            alt={images.lecture.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
