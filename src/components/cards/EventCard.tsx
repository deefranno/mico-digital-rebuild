import type { CalendarEvent } from "@/types";
import { eventDateParts } from "@/lib/format";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";

interface EventCardProps {
  event: CalendarEvent;
}

/**
 * Event card — a strong date block on the left (day + month), details on the
 * right. Ready for the future WordPress events custom post type.
 */
export function EventCard({ event }: EventCardProps) {
  const { day, month, monthLong, year } = eventDateParts(event.startDate);
  return (
    <article className="group flex gap-5 border border-black/10 bg-white p-5 transition-all duration-300 hover:border-black hover:shadow-lg">
      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center border border-black bg-black text-white">
        <span className="font-display text-2xl font-extrabold leading-none text-mico-gold">
          {day}
        </span>
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
          {month}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-mico-gold-deep">
          {event.category}
        </p>
        <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-black sm:text-lg">
          <Link
            to={`/events/${event.slug}`}
            className="transition-colors hover:text-mico-gold-deep focus-visible:outline-mico-gold"
          >
            {event.title}
          </Link>
        </h3>
        <p className="sr-only">
          {day} {monthLong} {year}
        </p>
        <ul className="mt-3 space-y-1 text-xs text-mico-mid">
          <li className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-3.5 shrink-0 text-mico-gold-deep" />
            {event.time}
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-mico-gold-deep" />
            {event.location}
          </li>
        </ul>
        <Link
          to={`/events/${event.slug}`}
          aria-label={`View event: ${event.title}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors group-hover:text-mico-gold-deep"
        >
          View event
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
