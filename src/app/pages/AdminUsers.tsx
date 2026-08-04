import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AdminShell } from "@/components/layout/AdminShell";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "convex/react";
import {
  Loader2,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

/** Shape returned by the admin-only `users.listUsers` query. */
interface StaffUser {
  _id: Id<"users">;
  name: string;
  email: string;
  role: "admin" | "user" | "member" | null;
  isAnonymous: boolean;
  _creationTime: number;
}

type RoleAction = "admin" | "user";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function roleLabel(role: StaffUser["role"]) {
  if (role === "admin") return "Administrator";
  if (role === "member") return "Member";
  return "User";
}

export default function AdminUsers() {
  const { user: me } = useAuth();
  const staff = useQuery(api.users.listUsers);
  const setUserRole = useMutation(api.users.setUserRole);

  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<Id<"users"> | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!staff) return [] as StaffUser[];
    const q = search.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(q));
  }, [staff, search]);

  async function handleSetRole(userId: Id<"users">, role: RoleAction) {
    setBusyId(userId);
    setActionError(null);
    try {
      await setUserRole({ userId, role });
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Could not update that user's role.",
      );
    } finally {
      setBusyId(null);
    }
  }

  /* ----- loading ------------------------------------------------------ */
  if (staff === undefined) {
    return (
      <AdminShell
        title="Staff access"
        subtitle="Grant or revoke admin access for the Admissions Office."
      >
        <div className="flex items-center justify-center border border-black/10 bg-white py-24">
          <Loader2 aria-hidden="true" className="size-6 animate-spin text-mico-gold-deep" />
        </div>
      </AdminShell>
    );
  }

  /* ----- not an admin -------------------------------------------------- */
  if (staff === null) {
    return (
      <AdminShell
        title="Staff access"
        subtitle="Grant or revoke admin access for the Admissions Office."
      >
        <div className="border border-black/10 bg-white px-6 py-16 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-mico-gold">
            <ShieldAlert aria-hidden="true" className="size-6" />
          </span>
          <h2 className="mt-5 font-display text-xl font-extrabold text-black">
            Access restricted
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mico-mid">
            Only administrators can manage staff access. If you need access,
            ask an administrator to grant you the admin role.
          </p>
        </div>
      </AdminShell>
    );
  }

  /* ----- admin view ---------------------------------------------------- */
  const adminCount = staff.filter((u) => u.role === "admin").length;
  const stats = [
    { label: "Total accounts", value: staff.length },
    { label: "Administrators", value: adminCount },
    { label: "Standard users", value: staff.length - adminCount },
  ];

  return (
    <AdminShell
      title="Staff access"
      subtitle="Grant or revoke the admin role so colleagues can review applications. You cannot remove your own admin access."
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

      {/* Search */}
      <div className="mt-6">
        <label className="relative block max-w-md">
          <span className="sr-only">Search staff</span>
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mico-mid"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full rounded-sm border border-black/20 bg-white py-2.5 pl-9 pr-3 text-sm text-black placeholder:text-mico-mid focus:border-black focus:outline-none"
          />
        </label>
      </div>

      {actionError ? (
        <div
          role="alert"
          className="mt-4 border border-red-600 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {actionError}
        </div>
      ) : null}

      {/* Users table */}
      <div className="mt-6">
        {filtered.length === 0 ? (
          <div className="border border-black/10 bg-white px-6 py-16 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-mico-gold">
              <Users aria-hidden="true" className="size-6" />
            </span>
            <h2 className="mt-5 font-display text-xl font-extrabold text-black">
              {staff.length === 0 ? "No accounts yet" : "No matching accounts"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mico-mid">
              {staff.length === 0
                ? "Accounts appear here as people sign in to the site."
                : "Try adjusting your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-black/10 bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-black/10 bg-black text-[0.7rem] uppercase tracking-widest text-white">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">User</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Role</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Joined</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => {
                  const isMe = me?._id === u._id;
                  const isAdmin = u.role === "admin";
                  const busy = busyId === u._id;
                  return (
                    <tr
                      key={u._id}
                      className="border-b border-black/5 transition-colors last:border-b-0 hover:bg-mico-gold-soft"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold uppercase text-mico-gold">
                            {(u.name || u.email || "?").charAt(0)}
                          </span>
                          <div>
                            <span className="font-semibold text-black">
                              {u.name || (u.isAnonymous ? "Anonymous user" : "Unnamed user")}
                              {isMe ? (
                                <span className="ml-2 rounded-sm bg-mico-gold-soft px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-mico-gold-deep">
                                  You
                                </span>
                              ) : null}
                            </span>
                            <span className="block text-xs text-mico-mid">
                              {u.email || "No email on file"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1.5 rounded-sm bg-mico-gold px-2 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-black">
                            <ShieldCheck aria-hidden="true" className="size-3.5" />
                            Admin
                          </span>
                        ) : (
                          <span className="text-mico-mid">{roleLabel(u.role)}</span>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-mico-dark">
                        {formatDate(u._creationTime)}
                      </td>
                      <td className="px-5 py-4">
                        {isAdmin ? (
                          <button
                            type="button"
                            disabled={isMe || busy}
                            onClick={() => handleSetRole(u._id, "user")}
                            title={
                              isMe
                                ? "You cannot remove your own admin access"
                                : "Revoke admin access"
                            }
                            className="inline-flex items-center gap-2 rounded-sm border border-black/20 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {busy ? (
                              <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
                            ) : (
                              <UserMinus aria-hidden="true" className="size-3.5" />
                            )}
                            {isMe ? "You" : "Revoke admin"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => handleSetRole(u._id, "admin")}
                            className="inline-flex items-center gap-2 rounded-sm bg-mico-gold px-3 py-1.5 text-xs font-bold text-black transition-colors hover:bg-mico-gold-deep hover:text-white disabled:opacity-60"
                          >
                            {busy ? (
                              <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
                            ) : (
                              <UserPlus aria-hidden="true" className="size-3.5" />
                            )}
                            Grant admin
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
