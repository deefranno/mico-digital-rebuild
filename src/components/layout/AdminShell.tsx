import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const ADMIN_NAV = [
  { to: "/admin/applications", label: "Applications" },
  { to: "/admin/users", label: "Staff access" },
];

/**
 * Layout shell for the Admissions Office admin area. Mirrors the Portal's
 * authenticated header (Logo + sign out) with a gold accent band, a nav row
 * across the admin pages, and an optional back link for detail views.
 */
export function AdminShell({
  eyebrow = "Admissions Office",
  title,
  subtitle,
  backTo,
  backLabel = "Back to applications",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <>
      <header className="border-b border-black/10 bg-white">
        <div className="container-site flex items-center justify-between py-5">
          <Logo />
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-sm border border-black/20 px-4 py-2 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            <LogOut aria-hidden="true" className="size-4" />
            Sign out
          </button>
        </div>
        <div aria-hidden="true" className="h-1 w-full bg-mico-gold" />
        <nav aria-label="Admissions Office" className="border-t border-black/10 bg-white">
          <div className="container-site flex gap-1 overflow-x-auto">
            {ADMIN_NAV.map((item) => {
              const active = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "border-mico-gold-deep text-black"
                      : "border-transparent text-mico-mid hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="container-site py-10 sm:py-14">
        {backTo ? (
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-mico-gold-deep transition-colors hover:text-black"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {backLabel}
          </Link>
        ) : null}

        <div className={backTo ? "mt-6" : undefined}>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-mico-gold-deep">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mico-mid">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-8">{children}</div>
      </main>
    </>
  );
}
