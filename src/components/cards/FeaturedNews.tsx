import type { NewsArticle } from "@/types";
import { formatDate } from "@/lib/format";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface FeaturedNewsProps {
  article: NewsArticle;
}

/**
 * The homepage's featured story — a large image panel with a black gradient
 * overlay and white text, linking through to the article.
 */
export function FeaturedNews({ article }: FeaturedNewsProps) {
  return (
    <article className="group relative overflow-hidden bg-black">
      <Link to={`/news/${article.slug}`} className="block" aria-label={article.title}>
        {article.featuredImage && (
          <img
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            className="aspect-[16/9] h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-60 sm:aspect-[16/8]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="rounded-sm bg-mico-gold px-2 py-1 font-semibold uppercase tracking-wider text-black">
              {article.category}
            </span>
            <time dateTime={article.date} className="text-white/70">
              {formatDate(article.date)}
            </time>
          </div>
          <h3 className="mt-4 max-w-2xl font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
            {article.title}
          </h3>
          <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-white/75 sm:line-clamp-2 sm:block">
            {article.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mico-gold transition-colors group-hover:text-white">
            Read the story
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
