import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { isAdmin } from "./users";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

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
  /**
   * Full Section A–J payload from the multi-step wizard (see
   * `src/types/application.ts`). Stored verbatim so the admin detail page can
   * render every field and the supporting-document storage ids.
   */
  data: v.any(),
};

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
 * Get a fresh upload URL for a supporting document. Public — applicants do
 * not need an account to attach files to their application.
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Resolve storage ids → public download URLs for an application's supporting
 * documents. ADMIN ONLY — returns null for non-admins.
 */
export const getApplicationDocumentUrls = query({
  args: { storageIds: v.array(v.string()) },
  handler: async (ctx, { storageIds }) => {
    if (!(await isAdmin(ctx))) return null;
    const entries = await Promise.all(
      storageIds.map(async (storageId) => {
        const url = await ctx.storage.getUrl(storageId as Id<"_storage">);
        return [storageId, url] as const;
      }),
    );
    return Object.fromEntries(entries) as Record<string, string | null>;
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
