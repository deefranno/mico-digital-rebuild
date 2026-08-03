import { EventCard } from "@/components/cards/EventCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/States";
import { getEvents } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Events() {
  const state = useAsyncData(getEvents);
  const events = state.data ?? [];
  const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? events : events.filter((e) => e.category === active);

  return (
    <>
      <Seo
        title="Events"
        description="Upcoming events at The Mico University College — open days, public lectures, orientations, research symposia and more."
        path="/events"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Events"
        title="What's happening at Mico"
        description="Open days, lectures, orientations and community events. All events and dates are placeholder content."
        crumbs={[{ label: "Events" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <div role="group" aria-label="Filter events by category" className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={active === category}
                className={cn(
                  "rounded-sm border px-4 py-2 text-sm font-semibold transition-colors",
                  active === category
                    ? "border-black bg-black text-white"
                    : "border-black/20 bg-white text-black hover:border-black",
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {state.status === "loading" && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-32 animate-pulse border border-black/5 bg-mico-light" />
              ))}
            </div>
          )}

          {state.status === "error" && (
            <div className="mt-12">
              <EmptyState title="Unable to load events" description={state.error ?? undefined} />
            </div>
          )}

          {state.status === "success" && filtered.length === 0 && (
            <div className="mt-12">
              <EmptyState title="No events in this category" description="Try another category." />
            </div>
          )}

          {state.status === "success" && filtered.length > 0 && (
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {filtered.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
