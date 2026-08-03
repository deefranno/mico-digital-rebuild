import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "./_generated/api";
import { mutation, query, QueryCtx } from "./_generated/server";
import { ROLES } from "./schema";
import { v } from "convex/values";

/** Shared shape of an admission application. Kept in sync with the form. */
export const applicationFields = {
  firstName: v.string(),
  lastName: v.string(),
  dateOfBirth: v.string(),
  gender: v.string(),
  nationality: v.string(),
  trn: v.optional(v.string()),
  address: v.string(),
  cityTown: v.string(),
  parish: v.string(),
  email: v.string(),
  phone: v.string(),
  emergencyContactName: v.optional(v.string()),
  emergencyContactPhone: v.optional(v.string()),
  studyLevel: v.string(),
  programme: v.string(),
  intake: v.string(),
  studyMode: v.string(),
  secondarySchool: v.string(),
  lastGradeCompleted: v.string(),
  qualifications: v.string(),
  otherInstitution: v.optional(v.string()),
  heardAbout: v.string(),
  additionalInfo: v.optional(v.string()),
  declarationConfirmed: v.boolean(),
};

async function isAdmin(ctx: QueryCtx): Promise<boolean> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) return false;
  const user = await ctx.db.get(userId);
  return user?.role === ROLES.ADMIN;
}

/**
 * Store a submitted admission application and return a reference number the
 * applicant can keep. Public mutation — applicants do not need an account.
 *
 * After the row is stored, two emails are scheduled (both fire-and-forget):
 *  - `emails.sendAdmissionConfirmation`      → the applicant
 *  - `emails.sendAdmissionsOfficeNotification` → the Admissions Office
 */
export const submitApplication = mutation({
  args: applicationFields,
  handler: async (ctx, args) => {
    const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
    const refNumber = `MICO-${new Date().getFullYear()}-${suffix}`;

    await ctx.db.insert("applications", {
      ...args,
      refNumber,
    });

    await ctx.scheduler.runAfter(0, api.emails.sendAdmissionConfirmation, {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      refNumber,
      programme: args.programme,
      intake: args.intake,
    });

    await ctx.scheduler.runAfter(
      0,
      api.emails.sendAdmissionsOfficeNotification,
      {
        refNumber,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        dateOfBirth: args.dateOfBirth,
        programme: args.programme,
        intake: args.intake,
        studyMode: args.studyMode,
        secondarySchool: args.secondarySchool,
        lastGradeCompleted: args.lastGradeCompleted,
        qualifications: args.qualifications,
        heardAbout: args.heardAbout,
        additionalInfo: args.additionalInfo,
      },
    );

    return { refNumber };
  },
});

/**
 * All submitted applications, newest first. ADMIN ONLY — returns null for
 * non-admins so applicant data is never exposed to other users.
 */
export const listApplications = query({
  args: {},
  handler: async (ctx) => {
    if (!(await isAdmin(ctx))) return null;
    const applications = await ctx.db.query("applications").collect();
    return applications.sort((a, b) => b._creationTime - a._creationTime);
  },
});

/** A single application by id. ADMIN ONLY — returns null for non-admins. */
export const getApplication = query({
  args: { id: v.id("applications") },
  handler: async (ctx, { id }) => {
    if (!(await isAdmin(ctx))) return null;
    return await ctx.db.get(id);
  },
});
