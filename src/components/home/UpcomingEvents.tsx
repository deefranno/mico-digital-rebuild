import { EventCard } from "@/components/cards/EventCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getEvents } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/** Upcoming events — the next four events with a link to the full listing. */
export function UpcomingEvents() {
  const state = useAsyncData(getEvents);
  const events = (state.data ?? []).filter((e) => e.status !== "past").slice(0, 4);

  return (
    <section className="bg-mico-light py-16 sm:py-24" aria-labelledby="events-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="events-heading"
            eyebrow="Upcoming events"
            title="Join us on campus"
            description="Open days, lectures, orientations and more — there is always something happening at Mico."
          />
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-sm border border-black/25 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            View All Events
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        {state.status === "loading" && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-36 animate-pulse border border-black/5 bg-white" />
            ))}
          </div>
        )}

        {state.status === "success" && events.length > 0 && (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
