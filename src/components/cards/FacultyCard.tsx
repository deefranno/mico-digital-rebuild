import type { Faculty } from "@/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface FacultyCardProps {
  faculty: Faculty;
}

/** Academic unit card with a grayscale image treatment. */
export function FacultyCard({ faculty }: FacultyCardProps) {
  return (
    <article className="group flex flex-col border border-black/10 bg-white transition-all duration-300 hover:border-black hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden bg-mico-light">
        {faculty.image && (
          <img
            src={faculty.image.src}
            alt={faculty.image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 bg-mico-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-black">
          <Link to={faculty.link} className="focus-visible:outline-mico-gold">
            {faculty.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mico-mid">
          {faculty.description}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-mico-mid">
            {faculty.departments.length} department
            {faculty.departments.length === 1 ? "" : "s"}
          </p>
          <Link
            to={faculty.link}
            aria-label={`Explore ${faculty.name}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors group-hover:text-mico-gold-deep"
          >
            Explore
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
