import { NewsCard } from "@/components/cards/NewsCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { CTAButton } from "@/components/shared/CTAButton";
import { getNews, getNewsBySlug } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { articleJsonLd, breadcrumbJsonLd, Seo } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";

export default function NewsArticle() {
  const { slug = "" } = useParams();
  const state = useAsyncData(() => getNewsBySlug(slug), [slug]);
  const allState = useAsyncData(getNews);
  const article = state.data;
  const all = allState.data ?? [];

  if (state.status === "error" || (state.status === "success" && !article)) {
    return (
      <div className="container-site py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-black">Article not found</h1>
        <p className="mt-3 text-mico-mid">This story may have been removed or renamed.</p>
        <div className="mt-8">
          <CTAButton href="/news" variant="black">
            Back to News
            <ArrowRight aria-hidden="true" className="size-4" />
          </CTAButton>
        </div>
      </div>
    );
  }

  if (state.status === "loading" || !article) {
    return (
      <div className="container-site py-24">
        <div className="h-8 w-2/3 animate-pulse bg-mico-light" />
        <div className="mt-6 h-72 animate-pulse bg-mico-light" />
      </div>
    );
  }

  const related = all.filter((a) => a.id !== article.id).slice(0, 3);
  const paragraphs = article.content.split(/\n\n+/).filter(Boolean);

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/news/${article.slug}`}
        type="article"
        image={article.featuredImage?.src}
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "News", href: "/news" },
            { label: article.title, href: `/news/${article.slug}` },
          ]),
          articleJsonLd({
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            dateModified: article.modified ?? article.date,
            image: article.featuredImage?.src,
            author: article.author,
          }),
        ]}
      />

      <PageHeader
        eyebrow={article.category}
        title={article.title}
        description={
          <>
            <time dateTime={article.date} className="text-white/60">
              {formatDate(article.date)}
            </time>
            {article.author && (
              <span className="text-white/60"> · By {article.author}</span>
            )}
          </>
        }
        crumbs={[
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />

      <article className="bg-white py-16 sm:py-20">
        <div className="container-site max-w-4xl">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-mico-gold-deep"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All news
          </Link>

          {article.featuredImage && (
            <img
              src={article.featuredImage.src}
              alt={article.featuredImage.alt}
              className="mt-8 aspect-[16/9] w-full object-cover"
            />
          )}

          <div className="mt-10 space-y-6 text-base leading-relaxed text-mico-dark sm:text-lg">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-10 border-t border-black/10 pt-6 text-xs text-mico-mid">
            Placeholder article — replace with real institutional content.
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-mico-light py-16 sm:py-20" aria-labelledby="related-news-heading">
          <div className="container-site">
            <h2 id="related-news-heading" className="text-section text-black">
              More from Mico
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.id}>
                  <NewsCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
