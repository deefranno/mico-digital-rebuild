import type { NewsArticle } from "@/types";
import { formatDate } from "@/lib/format";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface NewsCardProps {
  article: NewsArticle;
  /** Larger variant for featured/sidebar use. */
  large?: boolean;
}

/** Standard news card — image, category chip, date, headline, excerpt. */
export function NewsCard({ article, large = false }: NewsCardProps) {
  return (
    <article
      className={`group flex flex-col ${large ? "gap-0" : "gap-4 border border-black/10 bg-white p-0 transition-all duration-300 hover:border-black hover:shadow-lg"}`}
    >
      <Link
        to={`/news/${article.slug}`}
        aria-label={`Read: ${article.title}`}
        className={`block overflow-hidden bg-mico-light ${large ? "" : "aspect-[16/10]"}`}
      >
        {article.featuredImage && (
          <img
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-semibold uppercase tracking-wider text-mico-gold-deep">
            {article.category}
          </span>
          <span aria-hidden="true" className="text-black/25">
            •
          </span>
          <time dateTime={article.date} className="text-mico-mid">
            {formatDate(article.date)}
          </time>
        </div>

        <h3
          className={`mt-3 font-display font-bold leading-snug text-black ${
            large ? "text-2xl" : "text-lg"
          }`}
        >
          <Link
            to={`/news/${article.slug}`}
            className="transition-colors hover:text-mico-gold-deep focus-visible:outline-mico-gold"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-mico-mid">
          {article.excerpt}
        </p>

        <Link
          to={`/news/${article.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors group-hover:text-mico-gold-deep"
        >
          Read article
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
