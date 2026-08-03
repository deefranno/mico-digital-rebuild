import { api } from "@/convex/_generated/api";
import {
  SelectField,
  TextAreaField,
  TextField,
  emailPattern,
} from "@/components/shared/FormField";
import { programmes } from "@/data/programmes";
import {
  downloadApplicationPdf,
  type AdmissionValues,
} from "@/lib/admission-pdf";
import { useMutation } from "convex/react";
import { CheckCircle2, Download, Loader2, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";

/* --------------------------------------------------------------------------
 * Static option lists
 * ------------------------------------------------------------------------ */

const genders = ["Female", "Male", "Other", "Prefer not to say"];

const parishes = [
  "Kingston",
  "St. Andrew",
  "St. Catherine",
  "Clarendon",
  "Manchester",
  "St. Elizabeth",
  "Westmoreland",
  "Hanover",
  "St. James",
  "Trelawny",
  "St. Ann",
  "St. Mary",
  "Portland",
  "St. Thomas",
];

const intakes = [
  "September 2026 intake",
  "January 2027 intake",
  "Ongoing / rolling admission",
];

const studyModes = ["Full-time", "Part-time", "Online", "Blended"];

const gradesCompleted = [
  "Grade 11 (CSEC / CXC)",
  "Grade 12 (CAPE)",
  "High school diploma",
  "Certificate",
  "Associate degree",
  "Bachelor's degree",
  "Master's degree or higher",
];

const heardAboutOptions = [
  "Website",
  "Social media",
  "Friend or family",
  "School or career fair",
  "Newspaper or radio",
  "Other",
];

/* --------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------ */

const INITIAL_VALUES: AdmissionValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  trn: "",
  address: "",
  cityTown: "",
  parish: "",
  email: "",
  phone: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  studyLevel: "",
  programme: "",
  intake: "",
  studyMode: "",
  secondarySchool: "",
  lastGradeCompleted: "",
  qualifications: "",
  otherInstitution: "",
  heardAbout: "",
  additionalInfo: "",
  declarationConfirmed: false,
};

type FieldKey = keyof AdmissionValues;
type Errors = Partial<Record<FieldKey, string>>;

function fieldId(key: FieldKey) {
  return `ad-${key}`;
}

/** Which fields are required before the form can be submitted. */
const REQUIRED: FieldKey[] = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "gender",
  "nationality",
  "address",
  "cityTown",
  "parish",
  "email",
  "phone",
  "studyLevel",
  "programme",
  "intake",
  "studyMode",
  "secondarySchool",
  "lastGradeCompleted",
  "qualifications",
  "heardAbout",
  "declarationConfirmed",
];

/* --------------------------------------------------------------------------
 * Small presentational pieces
 * ------------------------------------------------------------------------ */

function Section({
  number,
  title,
  blurb,
  children,
}: {
  number: string;
  title: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`section-${number}`}
      className="border-b border-black/10 pb-10 pt-2 first:pt-0"
    >
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center border border-black bg-mico-gold font-display text-lg font-extrabold text-black">
          {number}
        </span>
        <div>
          <h2
            id={`section-${number}`}
            className="font-display text-xl font-extrabold tracking-tight text-black sm:text-2xl"
          >
            {title}
          </h2>
          <p className="mt-1 text-sm text-mico-mid">{blurb}</p>
        </div>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function DeclarationCheckbox({
  checked,
  error,
  onChange,
}: {
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-sm border border-black/25 bg-white transition-colors checked:border-mico-gold checked:bg-mico-gold focus:outline-none focus:ring-2 focus:ring-mico-gold/40"
          style={{ display: "block" }}
        />
        {checked && (
          <span className="pointer-events-none -ml-5 mt-1 text-xs font-bold text-black">
            ✓
          </span>
        )}
        <span className="text-sm leading-relaxed text-mico-dark">
          I confirm that the information I have provided is true and complete
          to the best of my knowledge. I consent to The Mico University College
          processing my personal data for the purposes of assessing this
          application.
          <span className="ml-0.5 text-mico-gold-deep">*</span>
        </span>
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Main form
 * ------------------------------------------------------------------------ */

export function AdmissionForm() {
  const submitApplication = useMutation(api.applications.submitApplication);

  const [values, setValues] = useState<AdmissionValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [refNumber, setRefNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const set = (key: FieldKey) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const setBool = (key: FieldKey) => (checked: boolean) => {
    setValues((v) => ({ ...v, [key]: checked }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const visibleProgrammes =
    values.studyLevel === ""
      ? programmes
      : programmes.filter((p) => p.level === values.studyLevel);

  function validate(): Errors {
    const next: Errors = {};
    for (const key of REQUIRED) {
      const value = values[key];
      if (typeof value === "boolean") {
        if (!value) next[key] = "Please confirm the declaration to continue.";
      } else if (!String(value).trim()) {
        next[key] = "This field is required.";
      }
    }
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!emailPattern.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (values.dateOfBirth.trim()) {
      const dob = new Date(values.dateOfBirth);
      if (Number.isNaN(dob.getTime())) {
        next.dateOfBirth = "Please enter a valid date.";
      } else if (dob.getTime() > Date.now()) {
        next.dateOfBirth = "Date of birth cannot be in the future.";
      }
    }
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    const firstError = REQUIRED.find((k) => next[k]);
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLElement>(`#${fieldId(firstError)}`)
        ?.focus();
      return;
    }
    setStatus("submitting");
    setSubmitError(null);
    try {
      const result = await submitApplication({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        dateOfBirth: values.dateOfBirth.trim(),
        gender: values.gender,
        nationality: values.nationality.trim(),
        trn: values.trn.trim() || undefined,
        address: values.address.trim(),
        cityTown: values.cityTown.trim(),
        parish: values.parish,
        email: values.email.trim(),
        phone: values.phone.trim(),
        emergencyContactName: values.emergencyContactName.trim() || undefined,
        emergencyContactPhone:
          values.emergencyContactPhone.trim() || undefined,
        studyLevel: values.studyLevel,
        programme: values.programme,
        intake: values.intake,
        studyMode: values.studyMode,
        secondarySchool: values.secondarySchool.trim(),
        lastGradeCompleted: values.lastGradeCompleted,
        qualifications: values.qualifications.trim(),
        otherInstitution: values.otherInstitution.trim() || undefined,
        heardAbout: values.heardAbout,
        additionalInfo: values.additionalInfo.trim() || undefined,
        declarationConfirmed: values.declarationConfirmed,
      });
      setRefNumber(result.refNumber);
      setStatus("done");
    } catch {
      setStatus("idle");
      setSubmitError(
        "We could not submit your application just now. Please try again in a moment.",
      );
    }
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus("idle");
    setRefNumber(null);
    setSubmitError(null);
  }

  /* ----- Success state ------------------------------------------------ */
  if (status === "done") {
    return (
      <div
        role="status"
        className="border border-black/10 bg-white p-8 text-center sm:p-10"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mico-gold text-black">
          <CheckCircle2 aria-hidden="true" className="size-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-extrabold text-black">
          Application received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mico-mid">
          Thank you
          {values.firstName.trim() ? `, ${values.firstName.trim()}` : ""}. Your
          application for{" "}
          <span className="font-semibold text-black">{values.programme}</span>{" "}
          has been submitted to the Admissions Office.
        </p>
        <div className="mx-auto mt-6 inline-block border border-mico-gold/60 bg-mico-gold-soft px-6 py-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-mico-mid">
            Your application reference
          </p>
          <p className="mt-1 font-display text-xl font-extrabold tracking-wide text-black">
            {refNumber}
          </p>
        </div>
        <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-mico-mid">
          Keep this reference number — you will need it for any enquiry about
          your application. A confirmation will also be sent to{" "}
          <span className="font-semibold text-black">{values.email}</span>.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              if (refNumber) void downloadApplicationPdf(values, refNumber);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-mico-gold px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-mico-gold-deep hover:text-white sm:w-auto"
          >
            <Download aria-hidden="true" className="size-4" />
            Download my application (PDF)
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-black/20 px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white sm:w-auto"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  /* ----- Form state ---------------------------------------------------- */
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-10"
    >
      <Section
        number="01"
        title="Personal details"
        blurb="Tell us who you are and how to reach you."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id={fieldId("firstName")}
            label="First name"
            required
            autoComplete="given-name"
            value={values.firstName}
            onChange={set("firstName")}
            error={errors.firstName}
          />
          <TextField
            id={fieldId("lastName")}
            label="Last name"
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={set("lastName")}
            error={errors.lastName}
          />
          <TextField
            id={fieldId("dateOfBirth")}
            label="Date of birth"
            type="date"
            required
            value={values.dateOfBirth}
            onChange={set("dateOfBirth")}
            error={errors.dateOfBirth}
          />
          <SelectField
            id={fieldId("gender")}
            label="Gender"
            required
            options={genders}
            placeholder="Select gender"
            value={values.gender}
            onChange={set("gender")}
            error={errors.gender}
          />
          <TextField
            id={fieldId("nationality")}
            label="Nationality"
            required
            value={values.nationality}
            onChange={set("nationality")}
            error={errors.nationality}
          />
          <TextField
            id={fieldId("trn")}
            label="TRN / NIS (if applicable)"
            value={values.trn}
            onChange={set("trn")}
            hint="Optional — Jamaican Tax Registration Number."
          />
          <div className="sm:col-span-2">
            <TextField
              id={fieldId("address")}
              label="Residential address"
              required
              autoComplete="street-address"
              value={values.address}
              onChange={set("address")}
              error={errors.address}
            />
          </div>
          <TextField
            id={fieldId("cityTown")}
            label="City / Town"
            required
            value={values.cityTown}
            onChange={set("cityTown")}
            error={errors.cityTown}
          />
          <SelectField
            id={fieldId("parish")}
            label="Parish"
            required
            options={parishes}
            placeholder="Select parish"
            value={values.parish}
            onChange={set("parish")}
            error={errors.parish}
          />
          <TextField
            id={fieldId("email")}
            label="Email address"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
          />
          <TextField
            id={fieldId("phone")}
            label="Telephone / mobile"
            type="tel"
            required
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            error={errors.phone}
          />
          <TextField
            id={fieldId("emergencyContactName")}
            label="Emergency contact name (optional)"
            value={values.emergencyContactName}
            onChange={set("emergencyContactName")}
          />
          <TextField
            id={fieldId("emergencyContactPhone")}
            label="Emergency contact phone (optional)"
            type="tel"
            value={values.emergencyContactPhone}
            onChange={set("emergencyContactPhone")}
          />
        </div>
      </Section>

      <Section
        number="02"
        title="Programme of interest"
        blurb="Choose what you would like to study and when."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id={fieldId("studyLevel")}
            label="Study level"
            required
            options={["Undergraduate", "Graduate", "Certificate", "Professional Development", "Short Course"]}
            placeholder="Select a study level"
            value={values.studyLevel}
            onChange={set("studyLevel")}
            error={errors.studyLevel}
          />
          <SelectField
            id={fieldId("intake")}
            label="Intake term"
            required
            options={intakes}
            placeholder="Select an intake"
            value={values.intake}
            onChange={set("intake")}
            error={errors.intake}
          />
          <div className="sm:col-span-2">
            <SelectField
              id={fieldId("programme")}
              label="Programme"
              required
              options={visibleProgrammes.map((p) => p.title)}
              placeholder={
                values.studyLevel
                  ? `Programmes at ${values.studyLevel} level`
                  : "Select a programme"
              }
              value={values.programme}
              onChange={set("programme")}
              error={errors.programme}
              hint={
                values.studyLevel && visibleProgrammes.length === 0
                  ? "No programmes are listed at this level yet — pick another level or browse the programme directory."
                  : "Programmes shown match your selected study level."
              }
            />
          </div>
          <SelectField
            id={fieldId("studyMode")}
            label="Study mode"
            required
            options={studyModes}
            placeholder="Select a study mode"
            value={values.studyMode}
            onChange={set("studyMode")}
            error={errors.studyMode}
          />
        </div>
      </Section>

      <Section
        number="03"
        title="Academic background"
        blurb="Tell us about your schooling and qualifications."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              id={fieldId("secondarySchool")}
              label="Secondary school attended"
              required
              value={values.secondarySchool}
              onChange={set("secondarySchool")}
              error={errors.secondarySchool}
            />
          </div>
          <SelectField
            id={fieldId("lastGradeCompleted")}
            label="Highest grade / level completed"
            required
            options={gradesCompleted}
            placeholder="Select highest level"
            value={values.lastGradeCompleted}
            onChange={set("lastGradeCompleted")}
            error={errors.lastGradeCompleted}
          />
          <TextField
            id={fieldId("otherInstitution")}
            label="Other institution (optional)"
            value={values.otherInstitution}
            onChange={set("otherInstitution")}
            hint="Current or previous college / university."
          />
          <div className="sm:col-span-2">
            <TextAreaField
              id={fieldId("qualifications")}
              label="Qualifications and grades"
              required
              value={values.qualifications}
              onChange={set("qualifications")}
              error={errors.qualifications}
              hint="List your CSEC/CXC, CAPE, degree or other qualifications with grades, e.g. 'CSEC English A — I, CSEC Mathematics — II'."
            />
          </div>
        </div>
      </Section>

      <Section
        number="04"
        title="Additional information"
        blurb="Anything else that will help us review your application."
      >
        <div className="grid gap-5">
          <SelectField
            id={fieldId("heardAbout")}
            label="How did you hear about Mico?"
            required
            options={heardAboutOptions}
            placeholder="Select an option"
            value={values.heardAbout}
            onChange={set("heardAbout")}
            error={errors.heardAbout}
          />
          <TextAreaField
            id={fieldId("additionalInfo")}
            label="Additional information (optional)"
            value={values.additionalInfo}
            onChange={set("additionalInfo")}
            hint="Special circumstances, disabilities or access needs, career goals — anything relevant."
          />
        </div>
      </Section>

      <Section
        number="05"
        title="Declaration"
        blurb="Please read and confirm before submitting."
      >
        <DeclarationCheckbox
          checked={values.declarationConfirmed}
          error={errors.declarationConfirmed}
          onChange={setBool("declarationConfirmed")}
        />
      </Section>

      {submitError ? (
        <div
          role="alert"
          className="border border-red-600 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {submitError}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-mico-mid">
          <ShieldCheck aria-hidden="true" className="size-4 text-mico-gold-deep" />
          Your application is stored securely and only used for admissions.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-mico-gold px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-mico-gold-deep hover:text-white disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Submit application"
          )}
        </button>
      </div>
    </form>
  );
}
