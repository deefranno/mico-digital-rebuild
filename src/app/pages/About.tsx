import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const values = [
  {
    title: "Excellence",
    description:
      "Rigorous programmes, dedicated faculty and high expectations for every student. (Placeholder copy.)",
  },
  {
    title: "Heritage",
    description:
      "A proud Jamaican identity and a legacy of service to education since 1836. (Placeholder copy.)",
  },
  {
    title: "Innovation",
    description:
      "Modern teaching, research and technology that respond to the needs of the nation. (Placeholder copy.)",
  },
  {
    title: "Community",
    description:
      "A warm, inclusive community that believes in the potential of every learner. (Placeholder copy.)",
  },
];

const leadership = [
  { role: "President", name: "Placeholder Name", note: "Office of the President" },
  { role: "Deputy President (Academic Affairs)", name: "Placeholder Name", note: "Academic Affairs" },
  { role: "Registrar", name: "Placeholder Name", note: "Registry" },
  { role: "Dean, Faculty of Education", name: "Placeholder Name", note: "Faculty of Education" },
];

function Section({ id, eyebrow, title, children, tone = "white" }: { id: string; eyebrow: string; title: string; children: React.ReactNode; tone?: "white" | "light" }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={tone === "white" ? "bg-white py-16 sm:py-20" : "bg-mico-light py-16 sm:py-20"}
    >
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading id={`${id}-heading`} eyebrow={eyebrow} title={title} />
        <div className="text-base leading-relaxed text-mico-dark">{children}</div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Seo
        title="About Mico"
        description="Learn about The Mico University College — our history, mission, values, leadership and campuses."
        path="/about"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="About Mico"
        title="A legacy of leadership since 1836"
        description="The Mico University College is a Jamaican institution with a long tradition of preparing educators, advancing research and serving the nation."
        crumbs={[{ label: "About" }]}
      />

      {/* History */}
      <section id="history" className="bg-white py-16 sm:py-20" aria-labelledby="history-heading">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <img
            src={images.campusLawn.src}
            alt={images.campusLawn.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionHeading id="history-heading" eyebrow="Our history" title="Over 180 years of shaping Jamaica's educators" />
            <div className="mt-6 space-y-4">
              <p>
                Established in {siteConfig.founded}, Mico is one of the oldest
                teacher-training institutions in the Western Hemisphere. (Placeholder
                history — to be written with the institution.)
              </p>
              <p>
                From its earliest days the college prepared young men and women to
                teach, and generations of Mico graduates have led classrooms,
                schools and communities across Jamaica and the Caribbean.
              </p>
              <p className="text-sm text-mico-mid">
                Please treat this section as placeholder copy until the official
                institutional history is supplied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & values */}
      <Section id="mission" eyebrow="Mission & values" title="What we stand for" tone="light">
        <p>
          Our mission is to provide high-quality education, research and service
          that develop competent, caring and creative professionals — and through
          them, transform Jamaica. (Placeholder mission statement.)
        </p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <li key={value.title} className="border-l-2 border-mico-gold bg-white p-5">
              <h3 className="font-display text-base font-bold text-black">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mico-mid">{value.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Leadership */}
      <Section id="leadership" eyebrow="Leadership" title="Senior leadership" tone="white">
        <p className="text-sm text-mico-mid">
          Placeholder — the senior leadership team will be listed here once
          confirmed by the institution.
        </p>
        <ul className="mt-6 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
          {leadership.map((person) => (
            <li key={person.role} className="bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-mico-gold-deep">
                {person.role}
              </p>
              <p className="mt-2 font-display text-base font-bold text-black">{person.name}</p>
              <p className="text-sm text-mico-mid">{person.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Staff & faculty */}
      <Section id="staff" eyebrow="Faculty & staff" title="The people of Mico" tone="light">
        <p>
          Our academic and support staff are the heart of the Mico experience —
          experienced educators, researchers and professionals committed to
          student success. (Placeholder copy.)
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm">
          <li>Dedicated teaching faculty across five academic units</li>
          <li>Professional services in registry, admissions, finance and student affairs</li>
          <li>Learning support, library and IT teams</li>
        </ul>
        <p className="mt-6 text-sm text-mico-mid">
          A staff directory will be added here. Placeholder content.
        </p>
      </Section>

      {/* Campuses */}
      <Section id="campuses" eyebrow="Campuses" title="Where to find us" tone="white">
        <div className="space-y-4">
          <div className="border border-black/10 bg-white p-6">
            <h3 className="font-display text-base font-bold text-black">
              {siteConfig.campus.name}
            </h3>
            <p className="mt-2 text-sm text-mico-mid">
              {siteConfig.campus.address}, {siteConfig.campus.city},{" "}
              {siteConfig.campus.country}
            </p>
            <p className="mt-2 text-xs text-mico-mid">
              (Placeholder — additional campuses and locations to be confirmed.)
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-mico-gold-deep"
            >
              Contact & directions
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Accreditation */}
      <Section id="accreditation" eyebrow="Quality" title="Quality & accreditation" tone="light">
        <p>
          Mico is committed to quality assurance and continuous improvement in
          all its programmes. (Placeholder — accreditation details must be
          confirmed with the institution before publication.)
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm">
          <li>Programme review and quality assurance processes</li>
          <li>Alignment with national teacher-education standards</li>
          <li>External examining and partnerships with other universities</li>
        </ul>
      </Section>
    </>
  );
}
