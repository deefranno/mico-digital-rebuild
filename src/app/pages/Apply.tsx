import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTAButton } from "@/components/shared/CTAButton";
import { images } from "@/data/images";
import { downloadBlankApplicationPdf } from "@/lib/admission-pdf";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import {
  CalendarDays,
  Check,
  FileDown,
  FileText,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";

const keyDates = [
  { term: "September 2026 intake", deadline: "31 July 2026" },
  { term: "January 2027 intake", deadline: "30 November 2026" },
];

const documentChecklist = [
  "Certified copy of birth certificate",
  "Certified copies of CSEC/CXC or CAPE results",
  "Transcripts from any tertiary institution",
  "Two (2) references (academic or professional)",
  "National ID or passport-sized photograph",
  "Police record check (education programmes)",
];

export default function Apply() {
  const [downloading, setDownloading] = useState(false);

  async function handleBlankDownload() {
    setDownloading(true);
    try {
      await downloadBlankApplicationPdf();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <>
      <Seo
        title="Application for Admission"
        description="Apply online for admission to The Mico University College — complete the interactive multi-step application form or download the printable PDF version."
        path="/admissions/apply"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Admissions", href: "/admissions" },
            { label: "Apply", href: "/admissions/apply" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Admissions"
        title="Application for admission"
        description="Complete the online application below, or download the printable PDF form to apply offline. All fields marked * are required."
        crumbs={[
          { label: "Admissions", href: "/admissions" },
          { label: "Apply" },
        ]}
      >
        <CTAButton href="#online-form" variant="gold">
          Start the online form
        </CTAButton>
        <button
          type="button"
          onClick={() => void handleBlankDownload()}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mico-gold"
        >
          <FileDown aria-hidden="true" className="size-4" />
          {downloading ? "Preparing PDF…" : "Download blank form (PDF)"}
        </button>
      </PageHeader>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* Main form column */}
          <div id="online-form" className="min-w-0 scroll-mt-24">
            <div className="mb-8 border-b border-black/10 pb-5">
              <h2 className="font-display text-2xl font-extrabold text-black">
                Online application
              </h2>
              <p className="mt-1 max-w-xl text-sm text-mico-mid">
                Ten short sections covering everything the Admissions Office
                needs. You can move back and forth and change any answer
                before submitting — expect about 20 minutes.
              </p>
            </div>

            {/* Key dates — just above the form */}
            <div className="mb-8 flex flex-col gap-4 rounded-sm border border-black/10 bg-mico-light p-5 sm:flex-row sm:items-center sm:justify-between">
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
                {keyDates.map((d) => (
                  <li key={d.term} className="flex items-baseline gap-2 text-sm">
                    <span className="text-mico-mid">{d.term}</span>
                    <span className="font-semibold text-black">
                      {d.deadline}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-mico-mid">
                Placeholder dates — confirm with the Admissions Office.
              </p>
            </div>

            <AdmissionForm />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="border border-black/10 bg-mico-light p-6">
              <div className="flex items-center gap-2">
                <FileText aria-hidden="true" className="size-5 text-mico-gold-deep" />
                <h2 className="font-display text-base font-bold text-black">
                  Prefer to apply offline?
                </h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-mico-mid">
                Download the blank form, complete it by hand or on your device,
                and return it to the Admissions Office with your documents.
              </p>
              <button
                type="button"
                onClick={() => void handleBlankDownload()}
                disabled={downloading}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-mico-gold hover:text-black disabled:opacity-60"
              >
                <FileDown aria-hidden="true" className="size-4" />
                {downloading ? "Preparing PDF…" : "Download blank form (PDF)"}
              </button>
              <p className="mt-3 text-xs text-mico-mid">
                A4 PDF, opens in your browser's print preview — use “Save as
                PDF” or print directly.
              </p>
            </div>

            <div className="border border-black/10 bg-white p-6">
              <h2 className="font-display text-base font-bold text-black">
                Documents to prepare
              </h2>
              <ul className="mt-4 space-y-2.5">
                {documentChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-mico-dark">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-mico-gold text-black">
                      <Check aria-hidden="true" className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-black bg-black p-6 text-white">
              <h2 className="font-display text-base font-bold">Need help?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                The Admissions Office is happy to assist with your application.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2.5">
                  <Phone aria-hidden="true" className="size-4 text-mico-gold" />
                  +1 (876) 929-5226
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="size-4 text-mico-gold" />
                  admissions@mico.edu.jm
                </li>
              </ul>
              <a
                href="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-mico-gold underline-offset-4 hover:underline"
              >
                Contact page
              </a>
            </div>

            <img
              src={images.studyGroup.src}
              alt={images.studyGroup.alt}
              loading="lazy"
              decoding="async"
              className="hidden aspect-[4/3] w-full object-cover lg:block"
            />
          </aside>
        </div>
      </section>
    </>
  );
}
