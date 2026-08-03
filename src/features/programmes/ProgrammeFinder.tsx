import { ProgrammeCard } from "@/components/cards/ProgrammeCard";
import { EmptyState } from "@/components/shared/States";
import { getProgrammes } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

interface ProgrammeFinderProps {
  /** Limit the number of cards shown (homepage preview mode). */
  preview?: boolean;
  /** Preselect a study level, e.g. from an Academics page link (?level=Undergraduate). */
  initialLevel?: string;
}

const filterClass =
  "w-full rounded-sm border border-black/20 bg-white px-3.5 py-2.5 text-sm text-black focus:border-mico-gold focus:outline-none";

/**
 * Programme discovery — search + study level / subject / delivery filters.
 * Interactive (client component) but reads data through the content layer,
 * so it works unchanged against WordPress later.
 */
export function ProgrammeFinder({
  preview = false,
  initialLevel,
}: ProgrammeFinderProps) {
  const state = useAsyncData(getProgrammes);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState(initialLevel ?? "all");
  const [subject, setSubject] = useState("all");
  const [delivery, setDelivery] = useState("all");

  const levels = useMemo(
    () => Array.from(new Set((state.data ?? []).map((p) => p.level))),
    [state.data],
  );
  const subjects = useMemo(
    () => Array.from(new Set((state.data ?? []).map((p) => p.subjectArea))),
    [state.data],
  );
  const deliveries = useMemo(
    () => Array.from(new Set((state.data ?? []).flatMap((p) => p.studyMode))),
    [state.data],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (state.data ?? []).filter((p) => {
      if (q && !`${p.title} ${p.faculty} ${p.subjectArea} ${p.awardType}`.toLowerCase().includes(q))
        return false;
      if (level !== "all" && p.level !== level) return false;
      if (subject !== "all" && p.subjectArea !== subject) return false;
      if (delivery !== "all" && !p.studyMode.includes(delivery as never)) return false;
      return true;
    });
  }, [state.data, query, level, subject, delivery]);

  const visible = preview ? filtered.slice(0, 6) : filtered;

  return (
    <div>
      {/* Controls */}
      <div className="border border-black/10 bg-mico-light p-5 sm:p-6">
        <form
          role="search"
          className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <label htmlFor="pf-query" className="sr-only">
              Search programmes
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mico-mid"
            />
            <input
              id="pf-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, faculty or subject…"
              className={`${filterClass} pl-10`}
            />
          </div>
          <div>
            <label htmlFor="pf-level" className="sr-only">
              Study level
            </label>
            <select
              id="pf-level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={filterClass}
            >
              <option value="all">All study levels</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-subject" className="sr-only">
              Subject area
            </label>
            <select
              id="pf-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={filterClass}
            >
              <option value="all">All subject areas</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-delivery" className="sr-only">
              Delivery method
            </label>
            <select
              id="pf-delivery"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className={filterClass}
            >
              <option value="all">All delivery methods</option>
              {deliveries.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </form>
        <p className="mt-4 flex items-center gap-2 text-xs text-mico-mid">
          <SlidersHorizontal aria-hidden="true" className="size-3.5" />
          Showing {visible.length} of {state.data?.length ?? 0} programmes
          {preview && " (preview)"}
        </p>
      </div>

      {/* Results */}
      {state.status === "loading" && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse border border-black/5 bg-mico-light" />
          ))}
        </div>
      )}
      {state.status === "error" && (
        <div className="mt-8">
          <EmptyState title="Unable to load programmes" description={state.error ?? undefined} />
        </div>
      )}
      {state.status === "success" && filtered.length === 0 && (
        <div className="mt-8">
          <EmptyState
            title="No programmes match your filters"
            description="Try clearing a filter or using a different search term."
          />
        </div>
      )}
      {state.status === "success" && filtered.length > 0 && (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((programme) => (
            <li key={programme.id}>
              <ProgrammeCard programme={programme} />
            </li>
          ))}
        </ul>
      )}

      {preview && (
        <div className="mt-10 text-center">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 rounded-sm border border-black/25 px-6 py-3 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            View All Programmes
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
