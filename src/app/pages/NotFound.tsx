import { CTAButton } from "@/components/shared/CTAButton";
import { Seo } from "@/lib/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you requested could not be found." noindex />

      <section className="flex min-h-[70vh] items-center bg-black py-24 text-white">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="font-display text-7xl font-extrabold leading-none text-mico-gold sm:text-8xl">
              404
            </p>
            <h1 className="mt-6 text-display text-white">Page not found</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              The page you are looking for may have been moved, renamed or no
              longer exists. Try searching the site or head back to the homepage.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CTAButton href="/" variant="gold" size="lg">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to homepage
              </CTAButton>
              <CTAButton href="/search" variant="outline-light" size="lg">
                Search the site
                <ArrowRight aria-hidden="true" className="size-4" />
              </CTAButton>
            </div>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <li>
                <Link to="/programmes" className="link-underline text-white/70 hover:text-white">
                  Programmes
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="link-underline text-white/70 hover:text-white">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/news" className="link-underline text-white/70 hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline text-white/70 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
