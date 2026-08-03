import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Admission applications submitted through the online form.
    // Public submission — no sign-in required.
    applications: defineTable({
      refNumber: v.string(), // e.g. MICO-2026-1A2B3C
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
    })
      .index("by_email", ["email"])
      .index("by_refNumber", ["refNumber"]),

    // add other tables here

    // tableName: defineTable({
    //   ...
    //   // table fields
    // }).index("by_field", ["field"])
  },
  {
    schemaValidation: false,
  },
);

export default schema;
