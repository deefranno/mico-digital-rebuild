import { CampusVisitForm } from "@/components/forms/CampusVisitForm";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact The Mico University College — address, telephone, email, general enquiries and campus visit requests."
        path="/contact"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Contact"
        title="We would love to hear from you"
        description="Questions about programmes, admissions, research or visiting campus — reach out and the right office will respond. (Contact details are placeholders.)"
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact details */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="details-heading">
        <div className="container-site">
          <h2 id="details-heading" className="sr-only">
            Contact details
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <li className="border border-black/10 bg-white p-6">
              <MapPin aria-hidden="true" className="size-5 text-mico-gold-deep" />
              <h3 className="mt-3 font-display text-sm font-bold text-black">Visit us</h3>
              <p className="mt-2 text-sm text-mico-mid">
                {siteConfig.campus.name}
                <br />
                {siteConfig.campus.address}
                <br />
                {siteConfig.campus.city}, {siteConfig.campus.country}
              </p>
            </li>
            <li className="border border-black/10 bg-white p-6">
              <Phone aria-hidden="true" className="size-5 text-mico-gold-deep" />
              <h3 className="mt-3 font-display text-sm font-bold text-black">Call us</h3>
              <p className="mt-2 text-sm text-mico-mid">
                {siteConfig.contact.telephone}
                <br />
                <span className="text-xs">{siteConfig.contact.telephoneNote}</span>
              </p>
            </li>
            <li className="border border-black/10 bg-white p-6">
              <Mail aria-hidden="true" className="size-5 text-mico-gold-deep" />
              <h3 className="mt-3 font-display text-sm font-bold text-black">Email us</h3>
              <p className="mt-2 text-sm text-mico-mid break-all">
                <a href={`mailto:${siteConfig.contact.email}`} className="underline-offset-4 hover:underline">
                  {siteConfig.contact.email}
                </a>
                <br />
                <span className="text-xs">{siteConfig.contact.emailNote}</span>
              </p>
            </li>
            <li className="border border-black/10 bg-white p-6">
              <Clock aria-hidden="true" className="size-5 text-mico-gold-deep" />
              <h3 className="mt-3 font-display text-sm font-bold text-black">Office hours</h3>
              <p className="mt-2 text-sm text-mico-mid">
                Monday – Friday
                <br />
                8:30 am – 4:30 pm
                <br />
                <span className="text-xs">(placeholder hours)</span>
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="bg-mico-light py-16 sm:py-20" aria-labelledby="enquiry-heading">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              id="enquiry-heading"
              eyebrow="General enquiry"
              title="Send us a message"
            />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              Use this form for general questions. Programme-specific questions?
              Use the request-information form on the relevant programme page, or
              the campus visit form for visits.
            </p>
            <p className="mt-4 text-xs text-mico-mid">
              This form is a placeholder — submission is simulated until a backend
              (WordPress, HubSpot, Fluent Forms or Gravity Forms) is connected.
            </p>
          </div>
          <div className="border border-black/10 bg-white p-8">
            <GeneralEnquiryForm />
          </div>
        </div>
      </section>

      {/* Campus visit */}
      <section id="visit" className="bg-white py-16 sm:py-20" aria-labelledby="visit-heading">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              id="visit-heading"
              eyebrow="Visit the campus"
              title="Plan your visit"
            />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              Open days are a great first step — but we also welcome scheduled
              visits for prospective students, families and school groups.
              (Placeholder — visit logistics to be confirmed.)
            </p>
            <div className="mt-8 overflow-hidden border border-black/10">
              <div className="flex h-48 items-center justify-center bg-mico-light">
                <p className="px-6 text-center text-xs text-mico-mid">
                  Interactive map placeholder
                  <br />
                  {siteConfig.campus.address}, {siteConfig.campus.city}
                </p>
              </div>
            </div>
          </div>
          <div className="border border-black/10 bg-mico-light p-8">
            <CampusVisitForm />
          </div>
        </div>
      </section>
    </>
  );
}
