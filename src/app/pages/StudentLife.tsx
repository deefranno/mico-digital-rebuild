import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { campusFeatures } from "@/data/campus";
import { images } from "@/data/images";
import { Icon } from "@/lib/icon-map";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight, HeartHandshake, Home, Music, Trophy, Users } from "lucide-react";
import { Link } from "react-router";

export default function StudentLife() {
  return (
    <>
      <Seo
        title="Student Life"
        description="Student life at The Mico University College — campus life, organisations, sports and recreation, support services, accommodation and career development."
        path="/student-life"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Student Life", href: "/student-life" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Student life"
        title="A community that feels like family"
        description="Beyond lectures and tutorials, Mico is a place of connection — clubs, sport, the arts, support and lifelong friendships. (Placeholder content.)"
        crumbs={[{ label: "Student Life" }]}
      />

      {/* Feature cards */}
      <section id="campus-life" className="bg-white py-16 sm:py-20" aria-labelledby="life-heading">
        <div className="container-site">
          <SectionHeading
            id="life-heading"
            eyebrow="Life on campus"
            title="Six ways to get involved"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campusFeatures.map((feature) => (
              <li key={feature.id} className="group border border-black/10 bg-white transition-all duration-300 hover:border-black hover:shadow-lg">
                <Link to={feature.href} className="flex h-full flex-col p-7">
                  <span className="flex size-11 items-center justify-center rounded-sm bg-black text-mico-gold transition-colors group-hover:bg-mico-gold group-hover:text-black">
                    <Icon name={feature.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-black">{feature.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mico-mid">{feature.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors group-hover:text-mico-gold-deep">
                    Learn more
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Organisations + culture */}
      <section id="organisations" className="bg-mico-light py-16 sm:py-20" aria-labelledby="org-heading">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <img
            src={images.community.src}
            alt={images.community.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionHeading
              id="org-heading"
              eyebrow="Organisations & culture"
              title="Find your people"
            />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              The Mico Guild, faith groups, service clubs, debate, the arts and
              more — there is a place for every interest. (Placeholder copy.)
            </p>
            <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {[
                { icon: Users, label: "The Mico Guild & student councils" },
                { icon: Music, label: "Choir, drama and cultural groups" },
                { icon: HeartHandshake, label: "Service and outreach clubs" },
                { icon: Trophy, label: "Inter-house and intramural teams" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3 border border-black/10 bg-white p-4">
                  <item.icon aria-hidden="true" className="size-4 shrink-0 text-mico-gold-deep" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="bg-white py-16 sm:py-20" aria-labelledby="support-heading">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="support-heading"
              eyebrow="Student support"
              title="You are not on your own"
            />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              From academic advising to counselling and disability support, Mico
              helps you succeed. (Placeholder copy.)
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Academic advising and tutoring",
                "Counselling and wellbeing services",
                "Library and learning resource centre",
                "Financial aid guidance",
                "Disability and accessibility support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 border border-black/10 bg-mico-light p-4">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mico-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={images.library.src}
            alt={images.library.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </section>

      {/* Accommodation + careers */}
      <section id="accommodation" className="bg-mico-light py-16 sm:py-20" aria-labelledby="accom-heading">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="border border-black/10 bg-white p-8">
            <Home aria-hidden="true" className="size-6 text-mico-gold-deep" />
            <SectionHeading id="accom-heading" eyebrow="Accommodation" title="Where to live" />
            <p className="mt-4 text-sm leading-relaxed text-mico-mid">
              Information about on-campus and nearby housing, costs and how to
              apply. (Placeholder — accommodation details to be confirmed.)
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-mico-dark">
              <li>On-campus residence options</li>
              <li>Approved off-campus housing list</li>
              <li>Guidance from the Office of Student Affairs</li>
            </ul>
          </div>
          <div id="careers" className="border border-black/10 bg-white p-8">
            <Users aria-hidden="true" className="size-6 text-mico-gold-deep" />
            <SectionHeading eyebrow="Career development" title="From campus to career" />
            <p className="mt-4 text-sm leading-relaxed text-mico-mid">
              Placements, internships, workshops and employer connections that
              set you up for work after graduation. (Placeholder copy.)
            </p>
            <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-mico-dark">
              <li>Teaching practicum and school placements</li>
              <li>Careers fair and employer visits</li>
              <li>CV and interview workshops</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-16 text-white">
        <div className="container-site flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold">Ready to join the community?</h2>
            <p className="mt-2 text-sm text-white/65">
              Explore programmes and start your application today.
            </p>
          </div>
          <CTAButton href="/admissions" variant="gold">
            Apply Now
            <ArrowRight aria-hidden="true" className="size-4" />
          </CTAButton>
        </div>
      </section>
    </>
  );
}
