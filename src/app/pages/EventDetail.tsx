import { EventCard } from "@/components/cards/EventCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTAButton } from "@/components/shared/CTAButton";
import { getEventBySlug, getEvents } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, eventJsonLd, Seo } from "@/lib/seo";
import { eventDateParts } from "@/lib/format";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Link, useParams } from "react-router";

export default function EventDetail() {
  const { slug = "" } = useParams();
  const state = useAsyncData(() => getEventBySlug(slug), [slug]);
  const allState = useAsyncData(getEvents);
  const event = state.data;
  const all = allState.data ?? [];

  if (state.status === "error" || (state.status === "success" && !event)) {
    return (
      <div className="container-site py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-black">Event not found</h1>
        <p className="mt-3 text-mico-mid">This event may have ended or been removed.</p>
        <div className="mt-8">
          <CTAButton href="/events" variant="black">
            All Events
            <ArrowRight aria-hidden="true" className="size-4" />
          </CTAButton>
        </div>
      </div>
    );
  }

  if (state.status === "loading" || !event) {
    return (
      <div className="container-site py-24">
        <div className="h-8 w-2/3 animate-pulse bg-mico-light" />
        <div className="mt-6 h-64 animate-pulse bg-mico-light" />
      </div>
    );
  }

  const { day, month, monthLong, year } = eventDateParts(event.startDate);
  const related = all.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <>
      <Seo
        title={event.title}
        description={event.description}
        path={`/events/${event.slug}`}
        type="event"
        image={event.image?.src}
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: event.title, href: `/events/${event.slug}` },
          ]),
          eventJsonLd({
            name: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            location: event.location,
          }),
        ]}
      />

      <PageHeader
        eyebrow={event.category}
        title={event.title}
        description={event.description}
        crumbs={[
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          {/* Date block + meta */}
          <aside>
            <div className="border border-black bg-black p-8 text-center text-white">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-mico-gold">
                {monthLong} {year}
              </p>
              <p className="mt-2 font-display text-6xl font-extrabold leading-none text-white">
                {day}
              </p>
              <p className="mt-1 text-sm text-white/60">{month}</p>
            </div>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Date</dt>
                  <dd className="text-mico-mid">
                    {day} {monthLong} {year}
                    {event.endDate && (
                      <span> – {eventDateParts(event.endDate).day} {eventDateParts(event.endDate).monthLong} {eventDateParts(event.endDate).year}</span>
                    )}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Time</dt>
                  <dd className="text-mico-mid">{event.time}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mico-gold-deep" />
                <div>
                  <dt className="font-semibold text-black">Location</dt>
                  <dd className="text-mico-mid">{event.location}</dd>
                </div>
              </div>
            </dl>
            <CTAButton href="/contact#visit" variant="black" className="mt-8 w-full">
              Ask about this event
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
          </aside>

          {/* Description */}
          <div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-mico-gold-deep"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All events
            </Link>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-mico-dark sm:text-lg">
              <p>{event.description}</p>
              <p className="text-sm text-mico-mid">
                Placeholder event — details, date and venue must be confirmed by
                the institution.
              </p>
            </div>
            {event.image && (
              <img
                src={event.image.src}
                alt={event.image.alt}
                className="mt-8 aspect-[16/9] w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-mico-light py-16 sm:py-20" aria-labelledby="related-events-heading">
          <div className="container-site">
            <h2 id="related-events-heading" className="text-section text-black">
              More events
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((e) => (
                <li key={e.id}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
