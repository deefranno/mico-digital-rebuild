import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Accessible breadcrumb trail (WCAG landmarks + aria-current). Also feeds
 * the breadcrumb JSON-LD rendered by each page's `<Seo>`.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-white/60 transition-colors hover:text-white"
          >
            <Home aria-hidden="true" className="size-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight aria-hidden="true" className="size-3.5 text-white/35" />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-white" : "text-white/60"}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
