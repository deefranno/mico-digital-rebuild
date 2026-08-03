import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";

const sections = [
  {
    id: "privacy",
    title: "Privacy Notice",
    text: [
      "This website is a demonstration build. The privacy notice below is placeholder content and must be replaced with the institution's official privacy notice before launch.",
      "When connected to a backend, the site may collect information you submit through forms (name, email address, message content). That information is used solely to respond to your enquiry.",
      "We do not sell personal information. Cookies are limited to what is required for the site to function.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility Statement",
    text: [
      "The Mico University College website aims to meet WCAG 2.2 AA standards where practical. (Placeholder statement.)",
      "The site is designed to be keyboard-accessible, with visible focus states, a skip-to-content link, semantic landmarks, meaningful alternative text and support for reduced-motion preferences.",
      "If you encounter an accessibility barrier, please contact us so we can address it. (Placeholder contact details.)",
    ],
  },
  {
    id: "terms",
    title: "Terms of Use",
    text: [
      "This website is a demonstration build; terms of use below are placeholder content.",
      "All content is provided for general information. Programme details, fees, deadlines and other information must be confirmed with the institution.",
      "External links are provided for convenience and do not imply endorsement.",
    ],
  },
];

export default function Policies() {
  return (
    <>
      <Seo
        title="Policies"
        description="Privacy notice, accessibility statement and terms of use for the Mico University College website."
        path="/policies"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Policies", href: "/policies" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Policies"
        title="Policies & notices"
        description="Placeholder policy content — to be replaced with the institution's official documents."
        crumbs={[{ label: "Policies" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site max-w-4xl space-y-14">
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <SectionHeading as="h2" eyebrow="Policy" title={section.title} />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-mico-dark">
                {section.text.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
