import { CmsPageRenderer } from "@/components/shared/CmsPageRenderer";
import { PageHeader } from "@/components/shared/PageHeader";
import { getCmsPageByPath } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { useLocation } from "react-router";
import NotFound from "./NotFound";

/**
 * Catch-all page for WordPress-native CMS pages.
 *
 * Any URL that doesn't match a fixed route (and isn't an admin route) is
 * resolved here: the path is looked up in the content service (WordPress
 * first, mock data as fallback) and rendered as a generic styled page. If no
 * page owns the path, the standard 404 renders instead.
 *
 * Staff create these pages in wp-admin (Appearance → Pages); their content is
 * fetched live, so no route or component code is needed per page.
 */
export default function CmsPage() {
  const { pathname } = useLocation();
  const state = useAsyncData(() => getCmsPageByPath(pathname), [pathname]);

  if (state.status === "loading") {
    return (
      <div className="container-site py-24">
        <div className="h-8 w-2/3 animate-pulse bg-mico-light" />
        <div className="mt-6 h-72 animate-pulse bg-mico-light" />
      </div>
    );
  }

  const page = state.data;
  if (!page) return <NotFound />;

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, parts) => {
      const href = `/${parts.slice(0, index + 1).join("/")}`;
      const label = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return index === parts.length - 1 ? { label } : { label, href };
    });

  return (
    <>
      <Seo
        title={page.seo?.title ?? page.title}
        description={page.seo?.description ?? page.excerpt}
        path={page.path}
        image={page.heroImage?.src}
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            ...crumbs
              .filter((crumb) => crumb.href)
              .map((crumb) => ({ label: crumb.label, href: crumb.href! })),
          ]),
        ]}
      />

      <PageHeader eyebrow="Information" title={page.title} crumbs={crumbs} />

      <main className="bg-white py-16 sm:py-20">
        <CmsPageRenderer blocks={page.blocks} />
      </main>
    </>
  );
}
