import { Logo } from "@/components/shared/Logo";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { siteConfig, footerColumns } from "@/data/site";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router";

const socialIcons = {
  Facebook,
  Instagram,
  "X (Twitter)": Twitter,
  YouTube: Youtube,
  LinkedIn: Linkedin,
} as const;

/**
 * Site footer: identity, contact, newsletter placeholder, link columns and
 * the legal bar. All link targets resolve to existing routes.
 */
export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container-site py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Identity + contact */}
          <div>
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              {siteConfig.description} Founded in {siteConfig.founded} — the
              Mico community continues to shape educators and transform
              Jamaica.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold" />
                <span>
                  {siteConfig.campus.address}, {siteConfig.campus.city},{" "}
                  {siteConfig.campus.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-mico-gold" />
                <span>
                  {siteConfig.contact.telephone}{" "}
                  <span className="text-white/45">(placeholder)</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-mico-gold" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <ul className="mt-7 flex items-center gap-3">
              {siteConfig.social.map((social) => {
                const Icon =
                  socialIcons[social.label as keyof typeof socialIcons] ??
                  Facebook;
                return (
                  <li key={social.label}>
                    {/* PLACEHOLDER hrefs — replace with the institution's profiles */}
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (placeholder link)`}
                      className="flex size-9 items-center justify-center rounded-sm border border-white/15 text-white/70 transition-colors hover:border-mico-gold hover:text-mico-gold"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Link columns + newsletter */}
          <div className="grid gap-10 sm:grid-cols-2">
            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={`Footer — ${column.heading}`}>
                <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-mico-gold">
                  {column.heading}
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="max-w-xl">
            <h2 className="font-display text-lg font-bold text-white">
              Stay in the know
            </h2>
            <p className="mt-2 text-sm text-white/60">
              News, open days and application deadlines, straight to your inbox.
              (Placeholder signup.)
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/policies#privacy" className="transition-colors hover:text-white">
                Privacy Notice
              </Link>
            </li>
            <li>
              <Link to="/policies#accessibility" className="transition-colors hover:text-white">
                Accessibility Statement
              </Link>
            </li>
            <li>
              <Link to="/policies#terms" className="transition-colors hover:text-white">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
