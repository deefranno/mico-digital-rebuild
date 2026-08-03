import { FacultyCard } from "@/components/cards/FacultyCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getFaculties } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

/** Featured academic units (faculties / schools) on the homepage. */
export function FeaturedFaculties() {
  const state = useAsyncData(getFaculties);
  const faculties = state.data ?? [];

  return (
    <section className="bg-mico-light py-16 sm:py-24" aria-labelledby="faculties-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="faculties-heading"
            eyebrow="Academic units"
            title="Faculties and schools"
            description="Our academic units bring together teaching, research and community engagement under one roof."
          />
          <Link
            to="/faculties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-mico-gold-deep"
          >
            All faculties
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        {state.status === "loading" && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse border border-black/5 bg-white" />
            ))}
          </div>
        )}

        {state.status === "success" && (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((faculty) => (
              <li key={faculty.id}>
                <FacultyCard faculty={faculty} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
