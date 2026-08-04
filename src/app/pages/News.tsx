import { NewsCard } from "@/components/cards/NewsCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/States";
import { getNews } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function News() {
  const state = useAsyncData(getNews);
  const articles = state.data ?? [];
  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      <Seo
        title="News"
        description="News and announcements from The Mico University College — academic, research, campus life, community and alumni stories."
        path="/news"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "News", href: "/news" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="News"
        title="Stories from Mico"
        description="The latest news, announcements and achievements from across the Mico community. All articles are placeholder content."
        crumbs={[{ label: "News" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          {/* Category filter */}
          <div role="group" aria-label="Filter news by category" className="flex flex-wrap gap-2">
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
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse border border-black/5 bg-mico-light" />
              ))}
            </div>
          )}

          {state.status === "error" && (
            <div className="mt-12">
              <EmptyState title="Unable to load news" description={state.error ?? undefined} />
            </div>
          )}

          {state.status === "success" && filtered.length === 0 && (
            <div className="mt-12">
              <EmptyState
                title="No articles in this category"
                description="Try another category."
              />
            </div>
          )}

          {state.status === "success" && filtered.length > 0 && (
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <li key={article.id}>
                  <NewsCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
