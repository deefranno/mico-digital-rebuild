// Admissions applications dashboard — restricted to staff with the admin role.
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { AdminShell } from "@/components/layout/AdminShell";
import { downloadBlankApplicationPdf } from "@/lib/admission-pdf";
import { useMutation, useQuery } from "convex/react";
import {
  FileDown,
  Inbox,
  Loader2,
  Search,
  ShieldAlert,
  UserCog,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

type Application = Doc<"applications">;

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Centered panel used for loading / access-denied / empty states. */
function Panel({
  icon: Icon,
  title,
  text,
  children,
}: {
  icon: typeof Inbox;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border border-black/10 bg-white px-6 py-16 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-mico-gold">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h2 className="mt-5 font-display text-xl font-extrabold text-black">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mico-mid">
        {text}
      </p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}

export default function AdminApplications() {
  const status = useQuery(api.users.adminStatus);
  const applications = useQuery(api.applications.listApplications);
  const becomeAdmin = useMutation(api.users.becomeAdmin);

  const [search, setSearch] = useState("");
  const [intake, setIntake] = useState("all");
  const [level, setLevel] = useState("all");
  const [claiming, setClaiming] = useState(false);

  const intakes = useMemo(() => {
    if (!applications) return [] as string[];
    return Array.from(new Set(applications.map((a) => a.intake))).sort();
  }, [applications]);

  const levels = useMemo(() => {
    if (!applications) return [] as string[];
    return Array.from(new Set(applications.map((a) => a.studyLevel))).sort();
  }, [applications]);

  const filtered = useMemo(() => {
    if (!applications) return [] as Application[];
    const q = search.trim().toLowerCase();
    return applications.filter((a) => {
      if (intake !== "all" && a.intake !== intake) return false;
      if (level !== "all" && a.studyLevel !== level) return false;
      if (!q) return true;
      const haystack =
        `${a.firstName} ${a.lastName} ${a.email} ${a.refNumber} ${a.programme}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [applications, search, intake, level]);

  async function handleClaimAdmin() {
    setClaiming(true);
    try {
      await becomeAdmin();
    } finally {
      setClaiming(false);
    }
  }

  /* ----- loading ------------------------------------------------------ */
  if (status === undefined || applications === undefined) {
    return (
      <AdminShell
        title="Applications"
        subtitle="Applications submitted through the online admission form."
      >
        <div className="flex items-center justify-center border border-black/10 bg-white py-24">
          <Loader2 aria-hidden="true" className="size-6 animate-spin text-mico-gold-deep" />
        </div>
      </AdminShell>
    );
  }

  /* ----- not an admin -------------------------------------------------- */
  if (!status.isAdmin) {
    if (!status.adminExists) {
      return (
        <AdminShell
          title="Applications"
          subtitle="Applications submitted through the online admission form."
        >
          <Panel
            icon={UserCog}
            title="No admin account yet"
            text="This area is restricted to Admissions Office staff. As the first signed-in user you can claim the admin role to start reviewing applications."
          >
            <button
              type="button"
              onClick={handleClaimAdmin}
              disabled={claiming}
              className="inline-flex items-center gap-2 rounded-sm bg-mico-gold px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-mico-gold-deep hover:text-white disabled:opacity-60"
            >
              {claiming ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <UserCog aria-hidden="true" className="size-4" />
              )}
              {claiming ? "Claiming…" : "Claim admin access"}
            </button>
          </Panel>
        </AdminShell>
      );
    }
    return (
      <AdminShell
        title="Applications"
        subtitle="Applications submitted through the online admission form."
      >
        <Panel
          icon={ShieldAlert}
          title="Access restricted"
          text="Only Admissions Office staff can review applications. If you need access, ask an administrator to grant you the admin role."
        />
      </AdminShell>
    );
  }

  /* ----- admin view ---------------------------------------------------- */
  const apps = applications ?? [];
  const total = apps.length;
  const programmeCount = new Set(apps.map((a) => a.programme)).size;
  const stats = [
    { label: "Total applications", value: total },
    { label: "Programmes applied to", value: programmeCount },
    { label: "Study levels", value: levels.length },
  ];

  return (
    <AdminShell
      title="Applications"
      subtitle="Review applications submitted through the online admission form. Data updates live as new submissions arrive."
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border border-black/10 bg-white px-5 py-4">
            <p className="font-display text-3xl font-extrabold text-black">{s.value}</p>
            <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-mico-mid">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search applications</span>
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mico-mid"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, reference or programme…"
            className="w-full rounded-sm border border-black/20 bg-white py-2.5 pl-9 pr-3 text-sm text-black placeholder:text-mico-mid focus:border-black focus:outline-none"
          />
        </label>
        <label className="lg:w-56">
          <span className="sr-only">Filter by intake</span>
          <select
            value={intake}
            onChange={(e) => setIntake(e.target.value)}
            className="w-full rounded-sm border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-black focus:outline-none"
          >
            <option value="all">All intakes</option>
            {intakes.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <label className="lg:w-56">
          <span className="sr-only">Filter by study level</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-sm border border-black/20 bg-white px-3 py-2.5 text-sm text-black focus:border-black focus:outline-none"
          >
            <option value="all">All study levels</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => void downloadBlankApplicationPdf()}
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-black/20 bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white lg:w-auto"
        >
          <FileDown aria-hidden="true" className="size-4" />
          Blank form (PDF)
        </button>
      </div>

      {/* Results */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <Panel
            icon={Inbox}
            title={total === 0 ? "No applications yet" : "No matching applications"}
            text={
              total === 0
                ? "Applications submitted through the online form will appear here as they arrive."
                : "Try adjusting your search or clearing a filter."
            }
          />
        ) : (
          <div className="overflow-x-auto border border-black/10 bg-white">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-black/10 bg-black text-[0.7rem] uppercase tracking-widest text-white">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Reference</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Applicant</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Programme</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Intake</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a._id}
                    className="border-b border-black/5 transition-colors last:border-b-0 hover:bg-mico-gold-soft"
                  >
                    <td className="px-5 py-4">
                      <Link
                        to={`/admin/applications/${a._id}`}
                        className="font-semibold text-mico-gold-deep hover:underline"
                      >
                        {a.refNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-black">
                        {a.firstName} {a.lastName}
                      </span>
                      <span className="block text-xs text-mico-mid">{a.email}</span>
                    </td>
                    <td className="px-5 py-4 text-mico-dark">{a.programme}</td>
                    <td className="px-5 py-4 text-mico-dark">{a.intake}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-mico-dark">
                      {formatDate(a._creationTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
