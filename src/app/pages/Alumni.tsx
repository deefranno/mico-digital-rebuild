import { EventCard } from "@/components/cards/EventCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { getEvents } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight, GraduationCap, Handshake, Network } from "lucide-react";

export default function Alumni() {
  const state = useAsyncData(getEvents);
  const alumniEvents = (state.data ?? []).filter((e) => e.category === "Alumni").slice(0, 3);

  return (
    <>
      <Seo
        title="Alumni"
        description="The Mico University College alumni community — stay connected, get involved and give back."
        path="/alumni"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Alumni", href: "/alumni" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Alumni"
        title="Once a Micoite, always a Micoite"
        description="Generations of Mico graduates are shaping classrooms and communities worldwide. Stay connected, get involved and give back. (Placeholder content.)"
        crumbs={[{ label: "Alumni" }]}
      />

      <section className="bg-white py-16 sm:py-20" aria-labelledby="alumni-ways-heading">
        <div className="container-site">
          <SectionHeading
            id="alumni-ways-heading"
            eyebrow="Get involved"
            title="Three ways to stay connected"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            <li className="border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg">
              <Network aria-hidden="true" className="size-6 text-mico-gold-deep" />
              <h3 className="mt-4 font-display text-lg font-bold text-black">Stay connected</h3>
              <p className="mt-2 text-sm leading-relaxed text-mico-mid">
                Update your details, join alumni chapters and follow Mico online.
                (Placeholder — alumni portal to be added.)
              </p>
            </li>
            <li className="border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg">
              <GraduationCap aria-hidden="true" className="size-6 text-mico-gold-deep" />
              <h3 className="mt-4 font-display text-lg font-bold text-black">Mentor a student</h3>
              <p className="mt-2 text-sm leading-relaxed text-mico-mid">
                Share your experience with final-year students through the Alumni
                Mentorship Programme. (Placeholder.)
              </p>
            </li>
            <li className="border border-black/10 bg-white p-8 transition-all duration-300 hover:border-black hover:shadow-lg">
              <Handshake aria-hidden="true" className="size-6 text-mico-gold-deep" />
              <h3 className="mt-4 font-display text-lg font-bold text-black">Give back</h3>
              <p className="mt-2 text-sm leading-relaxed text-mico-mid">
                Support scholarships, facilities and research that keep Mico
                strong. (Placeholder — giving details to be confirmed.)
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-mico-light py-16 sm:py-20" aria-labelledby="alumni-events-heading">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="alumni-events-heading"
              eyebrow="Alumni events"
              title="Join us again"
            />
            <p className="mt-5 text-sm leading-relaxed text-mico-mid">
              Reunions, lectures and social events for the Mico alumni community.
              (Placeholder events.)
            </p>
            <CTAButton href="/events" variant="black" className="mt-7">
              All events
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
          </div>
          {alumniEvents.length > 0 ? (
            <ul className="space-y-5">
              {alumniEvents.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-black/15 p-10 text-sm text-mico-mid">
              No alumni events scheduled yet — placeholder content.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
