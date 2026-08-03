import { mutation } from "./_generated/server";
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
};

/**
 * Store a submitted admission application and return a reference number the
 * applicant can keep. Public mutation — applicants do not need an account.
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

    return { refNumber };
  },
});
