import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icon } from "@/lib/icon-map";
import { audienceLinks } from "@/data/site";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/** Six audience pathways: prospective, current, international, graduate, parents, staff. */
export function AudienceQuickLinks() {
  return (
    <section id="quick-links" className="bg-mico-light py-16 sm:py-24" aria-labelledby="quick-links-heading">
      <div className="container-site">
        <SectionHeading
          id="quick-links-heading"
          eyebrow="Who are you?"
          title="Find your pathway at Mico"
          description="Whether you are beginning university study, returning as a graduate or joining our community in another way — there is a place for you here."
        />
        <ul className="mt-12 grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {audienceLinks.map((link) => (
            <li key={link.id} className="bg-white">
              <Link
                to={link.href}
                className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-mico-gold-soft"
              >
                <span className="flex size-11 items-center justify-center rounded-sm border border-black/10 bg-black text-mico-gold transition-colors duration-300 group-hover:border-mico-gold">
                  <Icon name={link.icon} className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-bold text-black">
                  {link.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mico-mid">
                  {link.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors group-hover:text-mico-gold-deep">
                  Explore
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
