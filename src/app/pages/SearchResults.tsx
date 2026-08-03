import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState, ErrorState } from "@/components/shared/States";
import { searchAll } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router";

const badgeClass =
  "shrink-0 rounded-sm border border-mico-gold/60 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-mico-gold-deep";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const state = useAsyncData(() => searchAll(q), [q]);

  return (
    <>
      <Seo
        title={q ? `Search: ${q}` : "Search"}
        description="Search The Mico University College website — programmes, news, events, faculties and pages."
        path="/search"
        noindex
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Search", href: "/search" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search the site"}
        description={
          state.status === "success" && state.data
            ? `${state.data.length} result${state.data.length === 1 ? "" : "s"} found`
            : "Type a query to search programmes, news, events, faculties and pages."
        }
        crumbs={[{ label: "Search" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site max-w-4xl">
          {state.status === "loading" && (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse border border-black/5 bg-mico-light" />
              ))}
            </div>
          )}

          {state.status === "error" && <ErrorState message={state.error ?? undefined} />}

          {state.status === "success" && (!q || q.trim().length < 2) && (
            <EmptyState
              title="Enter a search term"
              description="Use the search box in the header to find programmes, news, events and more."
            />
          )}

          {state.status === "success" && q.trim().length >= 2 && state.data && state.data.length === 0 && (
            <EmptyState
              title="No results found"
              description={`Nothing matched “${q}”. Try a different term or browse the programme directory.`}
              action={
                <Link
                  to="/programmes"
                  className="inline-flex items-center gap-2 rounded-sm bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mico-dark"
                >
                  Browse programmes
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          )}

          {state.status === "success" && state.data && state.data.length > 0 && (
            <ul className="divide-y divide-black/10 border border-black/10">
              {state.data.map((result) => (
                <li key={`${result.type}-${result.href}`}>
                  <Link
                    to={result.href}
                    className="group flex items-start gap-4 p-5 transition-colors hover:bg-mico-light"
                  >
                    <span className={badgeClass}>{result.type}</span>
                    <span className="min-w-0">
                      <span className="block font-display text-base font-bold text-black transition-colors group-hover:text-mico-gold-deep">
                        {result.title}
                      </span>
                      {result.category && (
                        <span className="mt-0.5 block text-xs font-medium uppercase tracking-wider text-mico-mid">
                          {result.category}
                        </span>
                      )}
                      <span className="mt-1.5 line-clamp-2 block text-sm text-mico-mid">
                        {result.excerpt}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-auto mt-1 size-4 shrink-0 text-mico-mid transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
