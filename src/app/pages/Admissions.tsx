import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { images } from "@/data/images";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight, CalendarDays, Check } from "lucide-react";

const steps = [
  { title: "Explore programmes", text: "Browse the programme directory and shortlist what interests you." },
  { title: "Check requirements", text: "Review the entry requirements for your chosen programme." },
  { title: "Prepare your documents", text: "Transcripts, certificates, identification and references." },
  { title: "Submit your application", text: "Apply online before the deadline for your intake." },
  { title: "Interview & offer", text: "Some programmes include an interview; offers follow review." },
  { title: "Enrol", text: "Accept your offer, complete registration and start at Mico." },
];

const requirements = [
  { level: "Undergraduate", text: "CSEC/CXC, CAPE or equivalent qualifications (placeholder details)." },
  { level: "Graduate", text: "Bachelor's degree plus relevant professional experience (placeholder)." },
  { level: "Certificate / Short Courses", text: "Varies by course — see individual programme pages (placeholder)." },
  { level: "International", text: "Equivalent international qualifications plus English proficiency (placeholder)." },
];

const deadlines = [
  { term: "September 2026 intake", deadline: "31 July 2026", note: "Placeholder" },
  { term: "January 2027 intake", deadline: "30 November 2026", note: "Placeholder" },
];

export default function Admissions() {
  return (
    <>
      <Seo
        title="Admissions"
        description="How to apply to The Mico University College — entry requirements, tuition and fees, scholarships, key dates and support for international students."
        path="/admissions"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Admissions", href: "/admissions" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Admissions"
        title="Begin your journey at Mico"
        description="Everything you need to apply — requirements, fees, scholarships and key dates. All information on this page is placeholder until confirmed by the institution."
        crumbs={[{ label: "Admissions" }]}
      >
        <CTAButton href="#online-form" variant="gold">
          Start your application
          <ArrowRight aria-hidden="true" className="size-4" />
        </CTAButton>
      </PageHeader>

      {/* How to apply */}
      <section id="how-to-apply" className="bg-white py-16 sm:py-20" aria-labelledby="apply-heading">
        <div className="container-site">
          <SectionHeading
            id="apply-heading"
            eyebrow="How to apply"
            title="Six steps to your place at Mico"
          />
          <ol className="mt-12 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-white p-7">
                <span className="font-display text-3xl font-extrabold text-mico-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mico-mid">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements */}
      <section id="requirements" className="bg-mico-light py-16 sm:py-20" aria-labelledby="req-heading">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="req-heading" eyebrow="Entry requirements" title="What you need to qualify" />
            <ul className="mt-8 space-y-4">
              {requirements.map((req) => (
                <li key={req.level} className="flex items-start gap-3 border border-black/10 bg-white p-5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mico-gold text-black">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-black">{req.level}</h3>
                    <p className="mt-1 text-sm text-mico-mid">{req.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-mico-mid">
              Placeholder requirements — always confirm with the Admissions Office.
            </p>
          </div>
          <img
            src={images.studyGroup.src}
            alt={images.studyGroup.alt}
            loading="lazy"
            decoding="async"
            className="hidden aspect-[4/3] w-full object-cover lg:block"
          />
        </div>
      </section>

      {/* Fees + scholarships */}
      <section id="fees" className="bg-white py-16 sm:py-20" aria-labelledby="fees-heading">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="border border-black/10 bg-white p-8">
            <SectionHeading id="fees-heading" eyebrow="Tuition & fees" title="Understanding the cost" />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              Fees vary by programme, level and study mode. The programme pages
              include placeholder fee notes — official figures will be published
              here once confirmed.
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-mico-dark">
              <li>Tuition per academic year (placeholder)</li>
              <li>Examination and practicum charges (placeholder)</li>
              <li>Payment plans and refund policies (placeholder)</li>
            </ul>
          </div>
          <div id="scholarships" className="border border-black/10 bg-mico-light p-8">
            <SectionHeading eyebrow="Scholarships" title="Financial support" />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              A range of scholarships, bursaries and government funding options
              may be available to eligible students. (Placeholder — full details
              to be published.)
            </p>
            <CTAButton href="/contact#enquiry" variant="black" className="mt-6">
              Ask about scholarships
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
          </div>
        </div>
      </section>

      {/* International + parents */}
      <section id="international" className="bg-black py-16 text-white sm:py-20" aria-labelledby="intl-heading">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="intl-heading" eyebrow="International students" title="Studying at Mico from abroad" tone="light" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
              <p>
                Mico welcomes international students from across the Caribbean and
                beyond. (Placeholder — visa guidance, fees and support services to
                be confirmed.)
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>International qualifications equivalency</li>
                <li>English language requirements</li>
                <li>Student visa and registration support</li>
                <li>Orientation for new international students</li>
              </ul>
            </div>
          </div>
          <div id="parents" className="border-t border-white/10 pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <SectionHeading eyebrow="Parents & families" title="Supporting your student" tone="light" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/75">
              <p>
                We know a university journey is a family journey. (Placeholder —
                information for parents and guardians to be added.)
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Understanding fees and payment</li>
                <li>Student support and wellbeing services</li>
                <li>Communication during the academic year</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Online application — the multi-step wizard */}
      <section
        id="online-form"
        className="scroll-mt-24 bg-mico-light py-16 sm:py-20"
        aria-labelledby="online-heading"
      >
        <div className="container-site">
          <SectionHeading
            id="online-heading"
            eyebrow="Apply online"
            title="Online application form"
          />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mico-mid">
            The application is split into ten short guided steps covering
            everything the Admissions Office needs — personal details, programme
            choice, education history, qualifications, referees and supporting
            documents. You can move back and forth and change any answer before
            submitting. Expect about 20 minutes.
          </p>

          {/* Key dates — just above the form */}
          <div className="mt-8 flex flex-col gap-4 rounded-sm border border-black/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="size-5 text-mico-gold-deep"
              />
              <h2 className="font-display text-base font-bold text-black">
                Key dates
              </h2>
            </div>
            <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              {deadlines.map((d) => (
                <li key={d.term} className="flex items-baseline gap-2 text-sm">
                  <span className="text-mico-mid">{d.term}</span>
                  <span className="font-semibold text-black">{d.deadline}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-mico-mid">
              Placeholder dates — confirm with the Admissions Office.
            </p>
          </div>

          <div className="mt-6">
            <AdmissionForm />
          </div>
        </div>
      </section>
    </>
  );
}
