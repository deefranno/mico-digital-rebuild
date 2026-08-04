import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/data/site";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const CAMPUS_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.7844049351247!2d-76.78960822482112!3d17.988764783004605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f9bde2a93f9%3A0xd8d4a22fb1de44e1!2sMico%20University%20College!5e0!3m2!1sen!2sjm!4v1785851445962!5m2!1sen!2sjm";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact The Mico University College — address, telephone, email and general enquiries."
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

      {/* Campus map */}
      <section id="map" className="bg-white pb-16 sm:pb-20" aria-labelledby="map-heading">
        <div className="container-site">
          <SectionHeading
            id="map-heading"
            eyebrow="Find us"
            title="Visit the campus"
          />
          <div className="mt-8 overflow-hidden border border-black/10">
            <iframe
              src={CAMPUS_MAP_SRC}
              title="Map of The Mico University College"
              className="block h-[380px] w-full sm:h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
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
              Use the request-information form on the relevant programme page.
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
    </>
  );
}
