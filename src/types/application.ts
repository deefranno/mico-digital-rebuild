/**
 * Admission application data model (Sections A–J).
 *
 * This is the full structured payload collected by the multi-step application
 * wizard (`src/components/forms/AdmissionForm.tsx`), stored on the Convex
 * `applications` row under the `data` column, and rendered back to admissions
 * staff on `AdminApplicationDetail`.
 *
 * `APPLICATION_DATA_SECTIONS` is display metadata used by the admin detail
 * page to walk the payload generically.
 */

/* --------------------------------------------------------------------------
 * Nested shapes
 * ------------------------------------------------------------------------ */

export interface NextOfKin {
  title: string;
  lastName: string;
  firstName: string;
  middleNames: string;
  relationship: string;
  address: string;
  homePhone: string;
  cellPhone: string;
  workPhone: string;
  fax: string;
  email: string;
}

export interface EmergencyContact {
  title: string;
  lastName: string;
  firstName: string;
  middleNames: string;
  relationship: string;
  homeAddress: string;
  workplaceAddress: string;
  homePhone: string;
  mobilePhone: string;
  workPhone: string;
  extension: string;
  fax: string;
}

export interface SecondarySchool {
  schoolName: string;
  country: string;
  fromDate: string;
  toDate: string;
}

export interface CsecSubject {
  examinationBody: string;
  subject: string;
  grade: string;
  date: string;
}

export interface CapeSubject {
  examinationBody: string;
  subject: string;
  grade: string;
  date: string;
}

export interface PendingExam {
  examinationBody: string;
  level: string;
  subjectProgramme: string;
  date: string;
}

export interface PostSecondaryStudy {
  institutionName: string;
  fromDate: string;
  toDate: string;
  subjectArea: string;
  typeOfStudies: string;
  certification: string;
  dateAwarded: string;
}

export interface EmploymentRecord {
  employerName: string;
  jobClassification: string;
  address: string;
  townCity: string;
  telephone: string;
  fax: string;
  parish: string;
  country: string;
  fromDate: string;
  toDate: string;
}

export interface Referee {
  name: string;
  organization: string;
  positionHeld: string;
  address: string;
  telephone: string;
  parishCountry: string;
  cityTownPostOffice: string;
}

export interface ApplicationDocument {
  label: string;
  /** Convex storage id returned by the upload. */
  storageId: string;
  name: string;
  size?: number;
}

/* --------------------------------------------------------------------------
 * Full application payload
 * ------------------------------------------------------------------------ */

export interface AdmissionApplicationData {
  /* --- Section A — Personal data -------------------------------------- */
  title: string;
  lastName: string;
  firstName: string;
  middleNames: string;
  maidenName: string;
  sex: string;
  dateOfBirth: string;
  trn: string;
  religion: string;
  maritalStatus: string;
  permanentAddress: string;
  homePhone: string;
  cellPhone: string;
  workPhone: string;
  mailingAddress: string;
  email: string;
  nationality: string;
  countryOfBirth: string;
  countryOfCitizenship: string;
  countryOfResidence: string;
  nextOfKin: NextOfKin;

  /* --- Section B — Programme details ---------------------------------- */
  firstChoiceFaculty: string;
  firstChoiceProgramme: string;
  desiredYearOfEntry: string;
  secondChoiceFaculty: string;
  secondChoiceProgramme: string;
  preferredTimeOfStudy: string;

  /* --- Section C — Emergency contact ----------------------------------- */
  emergencyContact: EmergencyContact;

  /* --- Section D — General information --------------------------------- */
  previousStudyAtMico: boolean;
  previousStudyAtTeachersCollege: boolean;
  previousStudyAtUniversity: boolean;
  previousInstitutionName: string;
  previousMicoId: string;
  previousFrom: string;
  previousTo: string;
  previousProgramme: string;
  disability: boolean;
  disabilityDetails: string;
  hallOfResidence: boolean;
  heardAbout: string[];
  heardAboutOther: string;

  /* --- Section E — Secondary education (repeatable) --------------------- */
  secondarySchools: SecondarySchool[];

  /* --- Section F — Academic achievement (repeatable rows) --------------- */
  csecSubjects: CsecSubject[];
  capeSubjects: CapeSubject[];
  pendingExams: PendingExam[];
  postSecondary: PostSecondaryStudy[];
  coCurricular: string;
  musicalInstrument: boolean;
  musicalInstruments: string;

  /* --- Section G — Financial resources --------------------------------- */
  fundingSources: string[];
  fundingOther: string;
  micoStaff: boolean;
  staffIdNumber: string;
  department: string;
  staffDependent: boolean;
  staffMemberName: string;
  staffDependentDepartment: string;
  staffDependentRelationship: string;

  /* --- Section H — Employment record (repeatable) ----------------------- */
  employment: EmploymentRecord[];

  /* --- Section I — Referees --------------------------------------------- */
  referees: Referee[];

  /* --- Section J — Declaration ------------------------------------------ */
  declarationConfirmed: boolean;
  applicantFullName: string;
  applicantSignature: string;
  applicantDate: string;
  parentFullName: string;
  parentSignature: string;
  parentDate: string;

  /* --- Supporting documents --------------------------------------------- */
  documents: ApplicationDocument[];
}

/* --------------------------------------------------------------------------
 * Empty factories
 * ------------------------------------------------------------------------ */

export function emptyNextOfKin(): NextOfKin {
  return {
    title: "", lastName: "", firstName: "", middleNames: "", relationship: "",
    address: "", homePhone: "", cellPhone: "", workPhone: "", fax: "", email: "",
  };
}

export function emptyEmergencyContact(): EmergencyContact {
  return {
    title: "", lastName: "", firstName: "", middleNames: "", relationship: "",
    homeAddress: "", workplaceAddress: "", homePhone: "", mobilePhone: "",
    workPhone: "", extension: "", fax: "",
  };
}

export function emptySecondarySchool(): SecondarySchool {
  return { schoolName: "", country: "Jamaica", fromDate: "", toDate: "" };
}

export function emptyCsecSubject(): CsecSubject {
  return { examinationBody: "CSEC", subject: "", grade: "", date: "" };
}

export function emptyCapeSubject(): CapeSubject {
  return { examinationBody: "CAPE", subject: "", grade: "", date: "" };
}

export function emptyPendingExam(): PendingExam {
  return { examinationBody: "", level: "", subjectProgramme: "", date: "" };
}

export function emptyPostSecondaryStudy(): PostSecondaryStudy {
  return {
    institutionName: "", fromDate: "", toDate: "", subjectArea: "",
    typeOfStudies: "", certification: "", dateAwarded: "",
  };
}

export function emptyEmploymentRecord(): EmploymentRecord {
  return {
    employerName: "", jobClassification: "", address: "", townCity: "",
    telephone: "", fax: "", parish: "", country: "Jamaica", fromDate: "", toDate: "",
  };
}

export function emptyReferee(): Referee {
  return {
    name: "", organization: "", positionHeld: "", address: "",
    telephone: "", parishCountry: "", cityTownPostOffice: "",
  };
}

export function emptyAdmissionApplicationData(): AdmissionApplicationData {
  return {
    title: "", lastName: "", firstName: "", middleNames: "", maidenName: "",
    sex: "", dateOfBirth: "", trn: "", religion: "", maritalStatus: "",
    permanentAddress: "", homePhone: "", cellPhone: "", workPhone: "",
    mailingAddress: "", email: "", nationality: "", countryOfBirth: "",
    countryOfCitizenship: "", countryOfResidence: "",
    nextOfKin: emptyNextOfKin(),

    firstChoiceFaculty: "", firstChoiceProgramme: "", desiredYearOfEntry: "",
    secondChoiceFaculty: "", secondChoiceProgramme: "", preferredTimeOfStudy: "",

    emergencyContact: emptyEmergencyContact(),

    previousStudyAtMico: false, previousStudyAtTeachersCollege: false,
    previousStudyAtUniversity: false, previousInstitutionName: "",
    previousMicoId: "", previousFrom: "", previousTo: "", previousProgramme: "",
    disability: false, disabilityDetails: "",
    hallOfResidence: false,
    heardAbout: [], heardAboutOther: "",

    secondarySchools: [],

    csecSubjects: [], capeSubjects: [], pendingExams: [], postSecondary: [],
    coCurricular: "", musicalInstrument: false, musicalInstruments: "",

    fundingSources: [], fundingOther: "",
    micoStaff: false, staffIdNumber: "", department: "",
    staffDependent: false, staffMemberName: "", staffDependentDepartment: "",
    staffDependentRelationship: "",

    employment: [],

    referees: [],

    declarationConfirmed: false,
    applicantFullName: "", applicantSignature: "", applicantDate: "",
    parentFullName: "", parentSignature: "", parentDate: "",

    documents: [],
  };
}

/* --------------------------------------------------------------------------
 * Admin display metadata — lets the admin detail page walk the payload
 * generically without hard-coding every field again.
 * ------------------------------------------------------------------------ */

export interface ApplicationDataField {
  label: string;
  /** Dot path into AdmissionApplicationData, e.g. "nextOfKin.lastName". */
  path: string;
  type?: "text" | "boolean" | "checkboxes" | "textarea";
}

export interface ApplicationDataRepeatable {
  label: string;
  /** Dot path to the array of row objects. */
  path: string;
  columns: { label: string; path: string }[];
}

export interface ApplicationDataSection {
  title: string;
  fields: ApplicationDataField[];
  repeatables?: ApplicationDataRepeatable[];
}

export const APPLICATION_DATA_SECTIONS: ApplicationDataSection[] = [
  {
    title: "Section A — Personal data",
    fields: [
      { label: "Title", path: "title" },
      { label: "Last name", path: "lastName" },
      { label: "First name", path: "firstName" },
      { label: "Middle name(s)", path: "middleNames" },
      { label: "Maiden name", path: "maidenName" },
      { label: "Sex", path: "sex" },
      { label: "Date of birth", path: "dateOfBirth" },
      { label: "TRN / National ID", path: "trn" },
      { label: "Religious affiliation", path: "religion" },
      { label: "Marital status", path: "maritalStatus" },
      { label: "Permanent address", path: "permanentAddress", type: "textarea" },
      { label: "Home phone", path: "homePhone" },
      { label: "Cellular phone", path: "cellPhone" },
      { label: "Work phone", path: "workPhone" },
      { label: "Mailing address", path: "mailingAddress", type: "textarea" },
      { label: "Email address", path: "email" },
      { label: "Nationality", path: "nationality" },
      { label: "Country of birth", path: "countryOfBirth" },
      { label: "Country of citizenship", path: "countryOfCitizenship" },
      { label: "Country of residence", path: "countryOfResidence" },
      { label: "Next of kin — title", path: "nextOfKin.title" },
      { label: "Next of kin — last name", path: "nextOfKin.lastName" },
      { label: "Next of kin — first name", path: "nextOfKin.firstName" },
      { label: "Next of kin — middle names", path: "nextOfKin.middleNames" },
      { label: "Next of kin — relationship", path: "nextOfKin.relationship" },
      { label: "Next of kin — address", path: "nextOfKin.address", type: "textarea" },
      { label: "Next of kin — home phone", path: "nextOfKin.homePhone" },
      { label: "Next of kin — cell phone", path: "nextOfKin.cellPhone" },
      { label: "Next of kin — work phone", path: "nextOfKin.workPhone" },
      { label: "Next of kin — fax", path: "nextOfKin.fax" },
      { label: "Next of kin — email", path: "nextOfKin.email" },
    ],
  },
  {
    title: "Section B — Programme details",
    fields: [
      { label: "First choice faculty", path: "firstChoiceFaculty" },
      { label: "First choice programme", path: "firstChoiceProgramme" },
      { label: "Desired year of entry", path: "desiredYearOfEntry" },
      { label: "Second choice faculty", path: "secondChoiceFaculty" },
      { label: "Second choice programme", path: "secondChoiceProgramme" },
      { label: "Preferred time of study", path: "preferredTimeOfStudy" },
    ],
  },
  {
    title: "Section C — Emergency contact",
    fields: [
      { label: "Title", path: "emergencyContact.title" },
      { label: "Last name", path: "emergencyContact.lastName" },
      { label: "First name", path: "emergencyContact.firstName" },
      { label: "Middle names", path: "emergencyContact.middleNames" },
      { label: "Relationship", path: "emergencyContact.relationship" },
      { label: "Home address", path: "emergencyContact.homeAddress", type: "textarea" },
      { label: "Workplace address", path: "emergencyContact.workplaceAddress", type: "textarea" },
      { label: "Home phone", path: "emergencyContact.homePhone" },
      { label: "Mobile phone", path: "emergencyContact.mobilePhone" },
      { label: "Work phone", path: "emergencyContact.workPhone" },
      { label: "Extension", path: "emergencyContact.extension" },
      { label: "Fax", path: "emergencyContact.fax" },
    ],
  },
  {
    title: "Section D — General information",
    fields: [
      { label: "Previously studied at The Mico", path: "previousStudyAtMico", type: "boolean" },
      { label: "Previously studied at another Teachers' College", path: "previousStudyAtTeachersCollege", type: "boolean" },
      { label: "Previously studied at a University", path: "previousStudyAtUniversity", type: "boolean" },
      { label: "Previous institution name", path: "previousInstitutionName" },
      { label: "Previous Mico ID (if former student)", path: "previousMicoId" },
      { label: "Registered from", path: "previousFrom" },
      { label: "Registered to", path: "previousTo" },
      { label: "Previous programme", path: "previousProgramme" },
      { label: "Disability or special needs", path: "disability", type: "boolean" },
      { label: "Disability details", path: "disabilityDetails", type: "textarea" },
      { label: "Wishes to live in Hall of Residence", path: "hallOfResidence", type: "boolean" },
      { label: "How they heard about Mico", path: "heardAbout", type: "checkboxes" },
      { label: "How they heard — other", path: "heardAboutOther" },
    ],
  },
  {
    title: "Section E — Secondary education",
    fields: [],
    repeatables: [
      {
        label: "Secondary schools",
        path: "secondarySchools",
        columns: [
          { label: "School name", path: "schoolName" },
          { label: "Country", path: "country" },
          { label: "From", path: "fromDate" },
          { label: "To", path: "toDate" },
        ],
      },
    ],
  },
  {
    title: "Section F — Academic achievement",
    fields: [
      { label: "Co-curricular activities (sport / culture / service clubs)", path: "coCurricular", type: "textarea" },
      { label: "Plays a musical instrument", path: "musicalInstrument", type: "boolean" },
      { label: "Instrument(s)", path: "musicalInstruments" },
    ],
    repeatables: [
      {
        label: "CSEC / GCE Ordinary Level",
        path: "csecSubjects",
        columns: [
          { label: "Examination body", path: "examinationBody" },
          { label: "Subject", path: "subject" },
          { label: "Grade", path: "grade" },
          { label: "Date", path: "date" },
        ],
      },
      {
        label: "CAPE / GCE Advanced Level",
        path: "capeSubjects",
        columns: [
          { label: "Examination body", path: "examinationBody" },
          { label: "Subject", path: "subject" },
          { label: "Grade", path: "grade" },
          { label: "Date", path: "date" },
        ],
      },
      {
        label: "Examinations awaiting results",
        path: "pendingExams",
        columns: [
          { label: "Examination body", path: "examinationBody" },
          { label: "Level", path: "level" },
          { label: "Subject / Programme", path: "subjectProgramme" },
          { label: "Date", path: "date" },
        ],
      },
      {
        label: "Post-secondary education",
        path: "postSecondary",
        columns: [
          { label: "Institution", path: "institutionName" },
          { label: "From", path: "fromDate" },
          { label: "To", path: "toDate" },
          { label: "Subject area / Major", path: "subjectArea" },
          { label: "Type of studies", path: "typeOfStudies" },
          { label: "Certification", path: "certification" },
          { label: "Date awarded", path: "dateAwarded" },
        ],
      },
    ],
  },
  {
    title: "Section G — Financial resources",
    fields: [
      { label: "Expected sources of funding", path: "fundingSources", type: "checkboxes" },
      { label: "Funding — other", path: "fundingOther" },
      { label: "Mico staff member", path: "micoStaff", type: "boolean" },
      { label: "Staff ID number", path: "staffIdNumber" },
      { label: "Department", path: "department" },
      { label: "Dependent of Mico staff member", path: "staffDependent", type: "boolean" },
      { label: "Staff member name", path: "staffMemberName" },
      { label: "Dependent — department", path: "staffDependentDepartment" },
      { label: "Dependent — relationship", path: "staffDependentRelationship" },
    ],
  },
  {
    title: "Section H — Employment record",
    fields: [],
    repeatables: [
      {
        label: "Employers",
        path: "employment",
        columns: [
          { label: "Employer name", path: "employerName" },
          { label: "Job classification", path: "jobClassification" },
          { label: "Address", path: "address" },
          { label: "Town / Village / City", path: "townCity" },
          { label: "Telephone", path: "telephone" },
          { label: "Fax", path: "fax" },
          { label: "Parish", path: "parish" },
          { label: "Country", path: "country" },
          { label: "From", path: "fromDate" },
          { label: "To", path: "toDate" },
        ],
      },
    ],
  },
  {
    title: "Section I — Referees",
    fields: [],
    repeatables: [
      {
        label: "Referees",
        path: "referees",
        columns: [
          { label: "Name", path: "name" },
          { label: "Organization", path: "organization" },
          { label: "Position held", path: "positionHeld" },
          { label: "Address", path: "address" },
          { label: "Telephone", path: "telephone" },
          { label: "Parish / Country", path: "parishCountry" },
          { label: "City / Town / Post Office", path: "cityTownPostOffice" },
        ],
      },
    ],
  },
  {
    title: "Section J — Declaration",
    fields: [
      { label: "Declaration confirmed", path: "declarationConfirmed", type: "boolean" },
      { label: "Applicant full name", path: "applicantFullName" },
      { label: "Applicant signature", path: "applicantSignature" },
      { label: "Applicant date", path: "applicantDate" },
      { label: "Parent / Guardian full name", path: "parentFullName" },
      { label: "Parent / Guardian signature", path: "parentSignature" },
      { label: "Parent / Guardian date", path: "parentDate" },
    ],
  },
];

/** Read a dot-path value out of the payload (used by the admin renderer). */
export function getDataByPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}
