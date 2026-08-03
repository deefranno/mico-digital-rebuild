/**
 * SEO management for the SPA.
 *
 * Drop `<Seo ... />` at the top of any page. It manages:
 *  - document.title
 *  - meta description / robots
 *  - canonical link
 *  - Open Graph + Twitter card tags
 *  - JSON-LD structured data (schema.org)
 *
 * This is the Vite + React Router equivalent of Next.js `metadata` exports.
 * It runs client-side (standard for SPAs) and cleans up on unmount.
 */
import { siteConfig } from "@/data/site";
import { useEffect } from "react";

export interface SeoProps {
  title: string;
  description?: string;
  /** Route path, e.g. "/about". Defaults to the current pathname. */
  path?: string;
  image?: string;
  type?: "website" | "article" | "event" | "course";
  noindex?: boolean;
  /** JSON-LD objects (schema.org). Each gets its own <script> tag. */
  jsonLd?: object[];
}

export function siteUrl(path = "/"): string {
  const base =
    (import.meta.env.VITE_SITE_URL as string | undefined) ||
    siteConfig.url ||
    (typeof window !== "undefined" ? window.location.origin : "");
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  noindex,
  jsonLd,
}: SeoProps) {
  const effectiveTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;
  const effectiveDescription =
    description ?? siteConfig.description;
  const effectiveImage = image ?? siteUrl("/assets/micologo.jpeg");
  const effectivePath = path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const canonical = siteUrl(effectivePath);

  useEffect(() => {
    document.title = effectiveTitle;
    upsertMeta("name", "description", effectiveDescription);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:site_name", siteConfig.name);
    upsertMeta("property", "og:title", effectiveTitle);
    upsertMeta("property", "og:description", effectiveDescription);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", effectiveImage);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", effectiveTitle);
    upsertMeta("name", "twitter:description", effectiveDescription);
    upsertMeta("name", "twitter:image", effectiveImage);

    // JSON-LD structured data
    const created: HTMLScriptElement[] = [];
    jsonLd?.forEach((data, index) => {
      const id = `jsonld-${index}`;
      document.getElementById(id)?.remove();
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      created.push(script);
    });

    return () => {
      created.forEach((script) => script.remove());
    };
  }, [
    effectiveTitle,
    effectiveDescription,
    canonical,
    effectiveImage,
    type,
    noindex,
    jsonLd,
  ]);

  return null;
}

/* --------------------------------------------------------------------------
 * Structured-data helpers
 * ------------------------------------------------------------------------ */

export function educationalOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    url: siteUrl("/"),
    logo: siteUrl("/assets/micologo.jpeg"),
    description: siteConfig.description,
    foundingDate: String(siteConfig.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.campus.address,
      addressLocality: siteConfig.campus.city,
      addressCountry: "JM",
    },
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: siteUrl(item.href),
    })),
  };
}

export function articleJsonLd(opts: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    image: opts.image ? siteUrl(opts.image) : undefined,
    author: opts.author ? { "@type": "Person", name: opts.author } : undefined,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function eventJsonLd(opts: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    description: opts.description,
    startDate: opts.startDate,
    endDate: opts.endDate,
    location: {
      "@type": "Place",
      name: opts.location,
      address: {
        "@type": "PostalAddress",
        streetAddress: opts.location,
        addressCountry: "JM",
      },
    },
    organizer: { "@type": "Organization", name: siteConfig.name },
  };
}

export function courseJsonLd(opts: {
  name: string;
  description: string;
  provider: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    provider: { "@type": "Organization", name: opts.provider, sameAs: siteUrl("/") },
  };
}
