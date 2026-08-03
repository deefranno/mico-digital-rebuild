import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/**
 * Standard inner-page header: a black band with breadcrumbs, gold eyebrow,
 * a large display title and optional description/actions. Consistent across
 * every inner template.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
}: PageHeaderProps) {
  return (
    <header className="bg-black text-white">
      <div className="container-site pb-14 pt-8 sm:pb-20 sm:pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 max-w-4xl sm:mt-14">
          {eyebrow && (
            <p className="mb-4 flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-mico-gold">
              <span aria-hidden="true" className="h-px w-8 bg-mico-gold" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-display text-white">{title}</h1>
          {description && (
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </header>
  );
}
