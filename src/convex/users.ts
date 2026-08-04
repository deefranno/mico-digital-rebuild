import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { ROLES, roleValidator } from "./schema";

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

/** True when the signed-in user has the admin role. Shared by admin-gated functions. */
export async function isAdmin(ctx: QueryCtx): Promise<boolean> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) return false;
  const user = await ctx.db.get(userId);
  return user?.role === ROLES.ADMIN;
}

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
 * set up. Role management beyond this uses `setUserRole`.
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

/** All users with role info, newest first — ADMIN ONLY. Returns null for non-admins. */
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    if (!(await isAdmin(ctx))) return null;
    const users = await ctx.db.query("users").collect();
    return users
      .map((u) => ({
        _id: u._id,
        name: u.name ?? "",
        email: u.email ?? "",
        role: u.role ?? null,
        isAnonymous: u.isAnonymous ?? false,
        _creationTime: u._creationTime,
      }))
      .sort((a, b) => b._creationTime - a._creationTime);
  },
});

/**
 * Grant or revoke the admin role — ADMIN ONLY.
 *
 * Guard: an admin can never remove their own admin role, so at least one
 * admin always remains (no accidental lockout / re-open bootstrap).
 */
export const setUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: roleValidator,
  },
  handler: async (ctx, { userId, role }) => {
    if (!(await isAdmin(ctx))) {
      throw new ConvexError("Only administrators can manage roles");
    }
    const target = await ctx.db.get(userId);
    if (!target) throw new ConvexError("User not found");

    const actingUserId = await getAuthUserId(ctx);
    if (
      target._id === actingUserId &&
      target.role === ROLES.ADMIN &&
      role !== ROLES.ADMIN
    ) {
      throw new ConvexError("You cannot remove your own admin access");
    }

    await ctx.db.patch(userId, { role });
    return { ok: true };
  },
});
