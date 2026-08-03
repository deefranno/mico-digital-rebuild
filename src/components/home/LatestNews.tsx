import { FeaturedNews } from "@/components/cards/FeaturedNews";
import { NewsCard } from "@/components/cards/NewsCard";
import { LoadingState } from "@/components/shared/States";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getNews } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/** Homepage news: featured story + three supporting cards. */
export function LatestNews() {
  const state = useAsyncData(getNews);
  const articles = state.data ?? [];
  const [featured, ...rest] = articles;

  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="news-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="news-heading"
            eyebrow="Latest news"
            title="Stories from Mico"
          />
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-mico-gold-deep"
          >
            All news
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        {state.status === "loading" && (
          <div className="mt-12">
            <LoadingState rows={2} />
          </div>
        )}

        {state.status === "success" && featured && (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
            <FeaturedNews article={featured} />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 3).map((article) => (
                <li key={article.id}>
                  <NewsCard article={article} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
