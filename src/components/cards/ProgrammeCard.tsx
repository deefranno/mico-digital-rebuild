import type { AcademicProgramme } from "@/types";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";

interface ProgrammeCardProps {
  programme: AcademicProgramme;
}

/**
 * Programme directory card — minimal, with a gold top-border hover accent
 * and clear meta information.
 */
export function ProgrammeCard({ programme }: ProgrammeCardProps) {
  return (
    <article className="group relative flex flex-col border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-lg">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-mico-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-sm border border-mico-gold/50 bg-mico-gold-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-mico-gold-deep">
          {programme.level}
        </span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-mico-mid">
          {programme.awardType}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-black">
        <Link
          to={`/programmes/${programme.slug}`}
          className="focus-visible:outline-mico-gold"
        >
          {programme.title}
        </Link>
      </h3>

      <p className="mt-2 text-sm font-medium text-mico-gold-deep">
        {programme.faculty}
      </p>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-mico-mid">
        {programme.overview}
      </p>

      <dl className="mt-5 space-y-1.5 border-t border-black/10 pt-4 text-xs text-mico-mid">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Duration</dt>
          <Clock aria-hidden="true" className="size-3.5 shrink-0 text-mico-gold-deep" />
          <dd>{programme.duration}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Campus</dt>
          <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-mico-gold-deep" />
          <dd>{programme.campus}</dd>
        </div>
      </dl>

      <Link
        to={`/programmes/${programme.slug}`}
        aria-label={`View details for ${programme.title}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors group-hover:text-mico-gold-deep"
      >
        View programme
        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </article>
  );
}
