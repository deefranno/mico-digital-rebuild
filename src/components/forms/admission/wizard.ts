/**
 * Shared plumbing for the multi-step admission application wizard:
 * immutable dot-path state helpers, static option lists, per-step
 * validators, and the mapping from wizard state onto the Convex
 * `submitApplication` arguments (keeps the admin list + emails working).
 */
import { emailPattern } from "@/components/shared/FormField";
import { programmes } from "@/data/programmes";
import type { AdmissionApplicationData } from "@/types/application";
import type { ChangeEvent } from "react";

/* --------------------------------------------------------------------------
 * Immutable dot-path helpers
 * ------------------------------------------------------------------------ */

export function getValue(source: object, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

export function setAt<T extends object>(source: T, path: string, value: unknown): T {
  const parts = path.split(".");
  const clone = { ...source } as Record<string, unknown>;
  let cur = clone;
  for (let i = 0; i < parts.length - 1; i++) {
    const prev = cur[parts[i]];
    const next = {
      ...(typeof prev === "object" && prev !== null
        ? (prev as Record<string, unknown>)
        : {}),
    };
    cur[parts[i]] = next;
    cur = next;
  }
  cur[parts[parts.length - 1]] = value;
  return clone as T;
}

/** Stable input id for a dot-path so validation can focus the first error. */
export const fid = (path: string) => `f-${path.replace(/\./g, "-")}`;

export interface StepProps {
  data: AdmissionApplicationData;
  update: (fn: (d: AdmissionApplicationData) => AdmissionApplicationData) => void;
  errors: Record<string, string>;
}

export const textSetter =
  (update: StepProps["update"], path: string) =>
  (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) =>
    update((d) => setAt(d, path, e.target.value));

export const boolSetter =
  (update: StepProps["update"], path: string) => (checked: boolean) =>
    update((d) => setAt(d, path, checked));

/* --------------------------------------------------------------------------
 * Static option lists
 * ------------------------------------------------------------------------ */

export const TITLES = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Rev", "Other"];
export const SEXES = ["Male", "Female", "Other"];
export const MARITAL_STATUSES = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
  "Other",
];
export const RELATIONSHIPS = [
  "Mother",
  "Father",
  "Spouse",
  "Sibling",
  "Grandparent",
  "Guardian",
  "Aunt",
  "Uncle",
  "Other",
];
export const YEAR_OF_ENTRY = [
  "September 2026 intake",
  "January 2027 intake",
  "Ongoing / rolling admission",
];
export const TIME_OF_STUDY = [
  "Full-time (day)",
  "Part-time (evening)",
  "Part-time (weekend)",
  "Online / blended",
];
export const HEARD_ABOUT_OPTIONS = [
  "School/College Fair",
  "School Visit",
  "Internet",
  "Media",
  "Other",
];
export const FUNDING_SOURCES = [
  "Government",
  "S.L.B Loan",
  "Self",
  "JAMVAT",
  "Parent(s)",
  "Award",
  "N.Y.S.",
  "Other",
];
export const CSEC_BODIES = ["CSEC", "GCE O-Level"];
export const CAPE_BODIES = ["CAPE", "GCE A-Level"];
export const LEVELS_AWAITING = ["CSEC", "CAPE", "GCE A-Level", "Other"];

export const DOCUMENT_TYPES = [
  { label: "Birth Certificate", required: true },
  { label: "Marriage Certificate / Deed Poll (if applicable)", required: false },
  { label: "Government or School ID", required: false },
  { label: "Passport-sized Photograph", required: false },
  { label: "Taxpayer Number Document", required: false },
  { label: "Examination Certificates (CSEC/CAPE etc.)", required: true },
  { label: "Diploma / Degree / Certificate", required: false },
  { label: "Transcripts", required: false },
  { label: "Recommendation Letter #1", required: false },
  { label: "Recommendation Letter #2", required: false },
] as const;

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/* --------------------------------------------------------------------------
 * Per-step validators
 * ------------------------------------------------------------------------ */

type Errors = Record<string, string>;

function req(e: Errors, data: object, path: string, label: string) {
  const v = getValue(data, path);
  const empty =
    typeof v === "string"
      ? !v.trim()
      : v === undefined || v === null || v === false;
  if (empty) e[path] = `${label} is required.`;
}

function validatePersonal(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  req(e, data, "title", "Title");
  req(e, data, "lastName", "Last name");
  req(e, data, "firstName", "First name");
  req(e, data, "sex", "Sex");
  req(e, data, "dateOfBirth", "Date of birth");
  const dob = new Date(data.dateOfBirth);
  if (data.dateOfBirth.trim()) {
    if (Number.isNaN(dob.getTime())) {
      e.dateOfBirth = "Enter a valid date.";
    } else if (dob.getTime() > Date.now()) {
      e.dateOfBirth = "Date of birth cannot be in the future.";
    }
  }
  req(e, data, "nationality", "Nationality");
  req(e, data, "permanentAddress", "Permanent address");
  req(e, data, "email", "Email address");
  if (data.email.trim() && !emailPattern.test(data.email.trim())) {
    e.email = "Enter a valid email address.";
  }
  if (![data.homePhone, data.cellPhone, data.workPhone].some((p) => p.trim())) {
    e.cellPhone = "Provide at least one phone number.";
  }
  req(e, data, "nextOfKin.lastName", "Next of kin last name");
  req(e, data, "nextOfKin.relationship", "Relationship to applicant");
  return e;
}

function validateProgramme(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  req(e, data, "firstChoiceFaculty", "First choice faculty");
  req(e, data, "firstChoiceProgramme", "First choice programme");
  req(e, data, "desiredYearOfEntry", "Desired year of entry");
  req(e, data, "preferredTimeOfStudy", "Preferred time of study");
  return e;
}

function validateEmergency(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  req(e, data, "emergencyContact.lastName", "Last name");
  req(e, data, "emergencyContact.firstName", "First name");
  req(e, data, "emergencyContact.relationship", "Relationship");
  const ec = data.emergencyContact;
  if (![ec.homePhone, ec.mobilePhone, ec.workPhone].some((p) => p.trim())) {
    e["emergencyContact.mobilePhone"] = "Provide at least one phone number.";
  }
  return e;
}

function validateEducation(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  const studiedBefore =
    data.previousStudyAtMico ||
    data.previousStudyAtTeachersCollege ||
    data.previousStudyAtUniversity;
  if (studiedBefore) {
    req(e, data, "previousInstitutionName", "Institution name");
    req(e, data, "previousFrom", "Registered from");
    req(e, data, "previousTo", "Registered to");
    req(e, data, "previousProgramme", "Programme");
  }
  if (data.secondarySchools.filter((s) => s.schoolName.trim()).length === 0) {
    e.secondarySchools = "Add at least one secondary school.";
  }
  data.secondarySchools.forEach((s, i) => {
    if (!s.schoolName.trim()) return;
    if (!s.fromDate.trim()) e[`secondarySchools.${i}.fromDate`] = "Required.";
    if (!s.toDate.trim()) e[`secondarySchools.${i}.toDate`] = "Required.";
  });
  return e;
}

function validateQualifications(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  data.csecSubjects.forEach((r, i) => {
    if (!r.subject.trim()) e[`csecSubjects.${i}.subject`] = "Subject is required.";
    if (!r.grade.trim()) e[`csecSubjects.${i}.grade`] = "Grade is required.";
  });
  data.capeSubjects.forEach((r, i) => {
    if (!r.subject.trim()) e[`capeSubjects.${i}.subject`] = "Subject is required.";
    if (!r.grade.trim()) e[`capeSubjects.${i}.grade`] = "Grade is required.";
  });
  data.pendingExams.forEach((r, i) => {
    if (!r.subjectProgramme.trim()) {
      e[`pendingExams.${i}.subjectProgramme`] = "Subject / programme is required.";
    }
  });
  data.postSecondary.forEach((r, i) => {
    if (!r.institutionName.trim()) {
      e[`postSecondary.${i}.institutionName`] = "Institution name is required.";
    }
  });
  if (data.musicalInstrument && !data.musicalInstruments.trim()) {
    e.musicalInstruments = "List your instrument(s).";
  }
  return e;
}

function validateEmployment(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  data.employment.forEach((r, i) => {
    if (!r.employerName.trim()) {
      e[`employment.${i}.employerName`] = "Employer name is required.";
    }
  });
  return e;
}

function validateReferees(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  const complete = data.referees.filter(
    (r) => r.name.trim() && r.organization.trim(),
  );
  if (complete.length < 2) {
    e.referees =
      "Please add at least two referees, each with a name and organisation.";
  }
  data.referees.forEach((r, i) => {
    if (!r.name.trim()) e[`referees.${i}.name`] = "Required.";
    if (!r.organization.trim()) e[`referees.${i}.organization`] = "Required.";
  });
  return e;
}

function validateFunding(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  if (data.fundingSources.length === 0) {
    e.fundingSources = "Select at least one funding source.";
  }
  if (data.micoStaff) {
    req(e, data, "staffIdNumber", "Staff ID number");
    req(e, data, "department", "Department");
  }
  if (data.staffDependent) {
    req(e, data, "staffMemberName", "Staff member name");
  }
  return e;
}

function validateDocuments(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  if (data.documents.length === 0) {
    e.documents = "Upload at least one supporting document.";
  }
  return e;
}

function validateDeclaration(data: AdmissionApplicationData): Errors {
  const e: Errors = {};
  if (!data.declarationConfirmed) {
    e.declarationConfirmed = "You must confirm the declaration to submit.";
  }
  const name = (
    data.applicantFullName ||
    `${data.firstName} ${data.lastName}`.trim()
  ).trim();
  if (!name) e.applicantFullName = "Applicant full name is required.";
  if (!data.applicantSignature.trim()) {
    e.applicantSignature = "Enter your electronic signature.";
  }
  if (!(data.applicantDate || todayISO())) {
    e.applicantDate = "Enter the date.";
  }
  return e;
}

export const STEP_VALIDATORS: Array<(d: AdmissionApplicationData) => Errors> = [
  validatePersonal, // 0
  validateProgramme, // 1
  validateEmergency, // 2
  validateEducation, // 3
  validateQualifications, // 4
  validateEmployment, // 5
  validateReferees, // 6
  validateFunding, // 7
  validateDocuments, // 8
  validateDeclaration, // 9
];

export function validateStep(
  step: number,
  data: AdmissionApplicationData,
): Errors {
  return STEP_VALIDATORS[step]?.(data) ?? {};
}

/** True per-step issue flags used by the Review checklist. */
export function stepIssues(data: AdmissionApplicationData): boolean[] {
  return STEP_VALIDATORS.map((v) => Object.keys(v(data)).length > 0);
}

/* --------------------------------------------------------------------------
 * Mapping onto the legacy Convex application row
 * ------------------------------------------------------------------------ */

export function toLegacyApplicationArgs(d: AdmissionApplicationData) {
  const schools = d.secondarySchools.filter((s) => s.schoolName.trim());
  const quals = [
    ...d.csecSubjects.map((s) => `CSEC ${s.subject} — ${s.grade}`),
    ...d.capeSubjects.map((s) => `CAPE ${s.subject} — ${s.grade}`),
    ...d.pendingExams.map((s) => `${s.level || "Exam"} ${s.subjectProgramme}`),
    ...d.postSecondary.map((s) => s.institutionName),
  ]
    .filter(Boolean)
    .join("; ");
  const programme = programmes.find((p) => p.title === d.firstChoiceProgramme);
  const studiedBefore =
    d.previousStudyAtMico ||
    d.previousStudyAtTeachersCollege ||
    d.previousStudyAtUniversity;
  return {
    firstName: d.firstName,
    lastName: d.lastName,
    dateOfBirth: d.dateOfBirth,
    gender: d.sex,
    nationality: d.nationality,
    trn: d.trn.trim() || undefined,
    address: d.permanentAddress,
    cityTown: "",
    parish: "",
    email: d.email,
    phone: d.cellPhone || d.homePhone || d.workPhone,
    emergencyContactName:
      `${d.nextOfKin.firstName} ${d.nextOfKin.lastName}`.trim() || undefined,
    emergencyContactPhone:
      d.nextOfKin.cellPhone || d.nextOfKin.homePhone || undefined,
    studyLevel: programme?.level ?? "",
    programme: d.firstChoiceProgramme,
    intake: d.desiredYearOfEntry,
    studyMode: d.preferredTimeOfStudy,
    secondarySchool: schools[0]?.schoolName ?? "",
    lastGradeCompleted: d.capeSubjects.length
      ? "Grade 12 (CAPE)"
      : d.csecSubjects.length
        ? "Grade 11 (CSEC / CXC)"
        : "",
    qualifications: quals,
    otherInstitution:
      (d.previousInstitutionName ||
        (d.previousStudyAtMico ? "The Mico University College" : "")) ||
      undefined,
    heardAbout: d.heardAbout.join(", ") || "Not specified",
    additionalInfo:
      [d.disabilityDetails, d.coCurricular].filter(Boolean).join(" — ") ||
      undefined,
    declarationConfirmed: d.declarationConfirmed,
    data: d,
  };
}
