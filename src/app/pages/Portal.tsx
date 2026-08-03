import { CTAButton } from "@/components/shared/CTAButton";
import { Logo } from "@/components/shared/Logo";
import { Seo } from "@/lib/seo";
import { useAuth } from "@/hooks/use-auth";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  Library,
  LogOut,
  Mail,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const portalLinks = [
  { icon: BookOpen, title: "My Programme", text: "Programme information and course listings (placeholder).", href: "/programmes" },
  { icon: CalendarDays, title: "Timetable", text: "Classes and exam schedules (placeholder).", href: "/events" },
  { icon: FileText, title: "Results & Transcripts", text: "Academic records (placeholder).", href: "/academics" },
  { icon: Library, title: "Library", text: "Catalogue, databases and study spaces.", href: "/student-life#support" },
  { icon: Mail, title: "Student Email", text: "Webmail access (placeholder).", href: "/contact" },
  { icon: GraduationCap, title: "Graduation", text: "Ceremony and award information (placeholder).", href: "/news/graduation-class-of-2026" },
];

/**
 * Student Portal — the authenticated experience. A placeholder until real
 * student systems (SIS, Moodle, email) are connected; the route is protected
 * by `RequireAuth`. Users with the admin role also see the Admissions review
 * entry point for the applications dashboard.
 */
export default function Portal() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/");
  }

  return (
    <>
      <Seo title="Student Portal" description="Your place at Mico — portal placeholder." noindex />

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
      </header>

      <main className="container-site py-12 sm:py-16">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-black text-mico-gold">
            <UserRound aria-hidden="true" className="size-6" />
          </span>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-mico-gold-deep">
              Student Portal
            </p>
            <h1 className="mt-1 font-display text-2xl font-extrabold text-black sm:text-3xl">
              Welcome{user?.name ? `, ${user.name}` : " to Mico"}
            </h1>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mico-mid">
          This portal is a placeholder. Student systems — records, timetables,
          email and e-learning — will be connected here. The sign-in flow uses
          the project's built-in authentication.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portalLinks.map((link) => (
            <li key={link.title} className="border border-black/10 bg-white p-6 transition-all duration-300 hover:border-black hover:shadow-lg">
              <a href={link.href} className="group block">
                <span className="flex size-11 items-center justify-center rounded-sm bg-black text-mico-gold transition-colors group-hover:bg-mico-gold group-hover:text-black">
                  <link.icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-base font-bold text-black">{link.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-mico-mid">{link.text}</p>
              </a>
            </li>
          ))}

          {user?.role === "admin" ? (
            <li className="border border-mico-gold/60 bg-mico-gold-soft p-6 transition-all duration-300 hover:border-mico-gold-deep hover:shadow-lg">
              <Link to="/admin/applications" className="group block">
                <span className="flex size-11 items-center justify-center rounded-sm bg-mico-gold text-black transition-colors group-hover:bg-black group-hover:text-mico-gold">
                  <ClipboardList aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-base font-bold text-black">Admissions review</h2>
                <p className="mt-2 text-sm leading-relaxed text-mico-mid">
                  View, search and download submitted applications.
                </p>
              </Link>
            </li>
          ) : null}
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <CTAButton href="/contact" variant="black">
            Get help with the portal
          </CTAButton>
        </div>
      </main>
    </>
  );
}
