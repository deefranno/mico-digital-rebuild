import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, QueryCtx } from "./_generated/server";
import { ROLES } from "./schema";

/**
 * Get the current signed in user. Returns null if the user is not signed in.
 * Usage: const signedInUser = await ctx.runQuery(api.authHelpers.currentUser);
 * THIS FUNCTION IS READ-ONLY. DO NOT MODIFY.
 */
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    return await ctx.db.get(userId);
  },
});

async function adminExists(ctx: QueryCtx): Promise<boolean> {
  const admin = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("role"), ROLES.ADMIN))
    .first();
  return admin !== null;
}

/**
 * Whether the current user can access the admissions dashboard, and whether
 * an admin account exists yet (so the UI can offer the first-admin bootstrap).
 */
export const adminStatus = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return { signedIn: false, isAdmin: false, adminExists: false };
    }
    const user = await ctx.db.get(userId);
    return {
      signedIn: true,
      isAdmin: user?.role === ROLES.ADMIN,
      adminExists: await adminExists(ctx),
    };
  },
});

/**
 * Bootstrap helper for the admissions dashboard: lets the FIRST signed-in user
 * claim the admin role. Deliberately narrow — it only works while no admin
 * account exists yet, so a regular user can never escalate once the office is
 * set up. Role management beyond this should use a proper admin flow.
 */
export const becomeAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return { ok: false, reason: "not-signed-in" };
    const user = await ctx.db.get(userId);
    if (!user) return { ok: false, reason: "not-found" };
    if (await adminExists(ctx)) return { ok: false, reason: "admin-exists" };
    await ctx.db.patch(userId, { role: ROLES.ADMIN });
    return { ok: true };
  },
});
