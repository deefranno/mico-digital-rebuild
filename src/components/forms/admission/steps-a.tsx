/**
 * Steps 1–5 of the multi-step admission wizard: Personal Information,
 * Programme Selection, Emergency Contact, Education History and
 * Academic Qualifications. Steps 6–10 live in `steps-b.tsx`.
 */
import { SelectField, TextAreaField, TextField } from "@/components/shared/FormField";
import { faculties } from "@/data/faculties";
import { programmes } from "@/data/programmes";
import {
  emptyCapeSubject,
  emptyCsecSubject,
  emptyPendingExam,
  emptyPostSecondaryStudy,
  emptySecondarySchool,
} from "@/types/application";
import { CheckboxField, ChipGroup, RowsEditor } from "./primitives";
import {
  boolSetter,
  CAPE_BODIES,
  CSEC_BODIES,
  fid,
  HEARD_ABOUT_OPTIONS,
  LEVELS_AWAITING,
  MARITAL_STATUSES,
  RELATIONSHIPS,
  SEXES,
  StepProps,
  textSetter,
  TIME_OF_STUDY,
  TITLES,
  YEAR_OF_ENTRY,
} from "./wizard";

/** Wizard step titles + blurbs — single source for the stepper + review. */
export const STEPS_META: Array<{ title: string; blurb: string }> = [
  {
    title: "Personal Information",
    blurb: "Your details, contact information, next of kin and a few questions about you.",
  },
  {
    title: "Programme Selection",
    blurb: "Tell us your first and second choice of programme.",
  },
  {
    title: "Emergency Contact",
    blurb: "Who should we contact in an emergency?",
  },
  {
    title: "Education History",
    blurb: "Previous study and the secondary schools you attended.",
  },
  {
    title: "Academic Qualifications",
    blurb: "CSEC/CAPE subjects, pending exams, post-secondary study and co-curricular activities.",
  },
  {
    title: "Employment History",
    blurb: "Your employment record, if any (optional).",
  },
  {
    title: "Referees",
    blurb: "Two referees who can comment on your suitability.",
  },
  {
    title: "Funding Information",
    blurb: "How you plan to fund your studies.",
  },
  {
    title: "Supporting Documents",
    blurb: "Upload the documents required with your application.",
  },
  {
    title: "Review & Submit",
    blurb: "Check everything and confirm the declaration.",
  },
];

function BlockHeading({ children }: { children: string }) {
  return (
    <h3 className="font-display text-lg font-extrabold tracking-tight text-black">
      {children}
    </h3>
  );
}

/* ==========================================================================
 * Step 1 — Personal Information (Section A + selected Section D fields)
 * ======================================================================== */

export function StepPersonal({ data, update, errors }: StepProps) {
  const set = textSetter(update);
  const setBool = boolSetter(update);
  return (
    <div className="space-y-10">
      <div>
        <BlockHeading>Personal information</BlockHeading>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <SelectField
            id={fid("title")}
            label="Title"
            required
            options={TITLES}
            placeholder="Select title"
            value={data.title}
            onChange={set("title")}
            error={errors.title}
          />
          <TextField
            id={fid("lastName")}
            label="Last name / surname"
            required
            autoComplete="family-name"
            value={data.lastName}
            onChange={set("lastName")}
            error={errors.lastName}
          />
          <TextField
            id={fid("firstName")}
            label="First name"
            required
            autoComplete="given-name"
            value={data.firstName}
            onChange={set("firstName")}
            error={errors.firstName}
          />
          <TextField
            id={fid("middleNames")}
            label="Middle name(s)"
            value={data.middleNames}
            onChange={set("middleNames")}
          />
          <TextField
            id={fid("maidenName")}
            label="Maiden name (if applicable)"
            value={data.maidenName}
            onChange={set("maidenName")}
          />
          <SelectField
            id={fid("sex")}
            label="Sex"
            required
            options={SEXES}
            placeholder="Select sex"
            value={data.sex}
            onChange={set("sex")}
            error={errors.sex}
          />
          <TextField
            id={fid("dateOfBirth")}
            label="Date of birth"
            type="date"
            required
            value={data.dateOfBirth}
            onChange={set("dateOfBirth")}
            error={errors.dateOfBirth}
          />
          <TextField
            id={fid("trn")}
            label="TRN / National ID"
            value={data.trn}
            onChange={set("trn")}
            hint="Tax Registration Number (Jamaica) or national ID."
          />
          <TextField
            id={fid("religion")}
            label="Religious affiliation"
            value={data.religion}
            onChange={set("religion")}
          />
          <SelectField
            id={fid("maritalStatus")}
            label="Marital status"
            options={MARITAL_STATUSES}
            placeholder="Select status"
            value={data.maritalStatus}
            onChange={set("maritalStatus")}
          />
        </div>
      </div>

      <div>
        <BlockHeading>Contact information</BlockHeading>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextAreaField
              id={fid("permanentAddress")}
              label="Permanent address"
              required
              value={data.permanentAddress}
              onChange={set("permanentAddress")}
              error={errors.permanentAddress}
            />
          </div>
          <TextField
            id={fid("homePhone")}
            label="Home phone number"
            type="tel"
            value={data.homePhone}
            onChange={set("homePhone")}
          />
          <TextField
            id={fid("cellPhone")}
            label="Cellular phone number"
            type="tel"
            value={data.cellPhone}
            onChange={set("cellPhone")}
            error={errors.cellPhone}
            hint="At least one phone number is required."
          />
          <TextField
            id={fid("workPhone")}
            label="Work phone number"
            type="tel"
            value={data.workPhone}
            onChange={set("workPhone")}
          />
          <div className="sm:col-span-2">
            <TextAreaField
              id={fid("mailingAddress")}
              label="Mailing address (if different)"
              value={data.mailingAddress}
              onChange={set("mailingAddress")}
            />
          </div>
          <TextField
            id={fid("email")}
            label="Email address"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={set("email")}
            error={errors.email}
          />
          <TextField
            id={fid("nationality")}
            label="Nationality"
            required
            value={data.nationality}
            onChange={set("nationality")}
            error={errors.nationality}
            hint="e.g. Jamaican"
          />
          <TextField
            id={fid("countryOfBirth")}
            label="Country of birth"
            value={data.countryOfBirth}
            onChange={set("countryOfBirth")}
          />
          <TextField
            id={fid("countryOfCitizenship")}
            label="Country of citizenship"
            value={data.countryOfCitizenship}
            onChange={set("countryOfCitizenship")}
          />
          <TextField
            id={fid("countryOfResidence")}
            label="Country of residence"
            value={data.countryOfResidence}
            onChange={set("countryOfResidence")}
          />
        </div>
      </div>

      <div>
        <BlockHeading>Next of kin</BlockHeading>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <SelectField
            id={fid("nextOfKin.title")}
            label="Title"
            options={TITLES}
            placeholder="Select title"
            value={data.nextOfKin.title}
            onChange={set("nextOfKin.title")}
          />
          <TextField
            id={fid("nextOfKin.lastName")}
            label="Last name"
            required
            value={data.nextOfKin.lastName}
            onChange={set("nextOfKin.lastName")}
            error={errors["nextOfKin.lastName"]}
          />
          <TextField
            id={fid("nextOfKin.firstName")}
            label="First name"
            value={data.nextOfKin.firstName}
            onChange={set("nextOfKin.firstName")}
          />
          <TextField
            id={fid("nextOfKin.middleNames")}
            label="Middle name(s)"
            value={data.nextOfKin.middleNames}
            onChange={set("nextOfKin.middleNames")}
          />
          <SelectField
            id={fid("nextOfKin.relationship")}
            label="Relationship to applicant"
            required
            options={RELATIONSHIPS}
            placeholder="Select relationship"
            value={data.nextOfKin.relationship}
            onChange={set("nextOfKin.relationship")}
            error={errors["nextOfKin.relationship"]}
          />
          <div className="sm:col-span-2">
            <TextAreaField
              id={fid("nextOfKin.address")}
              label="Home / permanent address"
              value={data.nextOfKin.address}
              onChange={set("nextOfKin.address")}
            />
          </div>
          <TextField
            id={fid("nextOfKin.homePhone")}
            label="Home phone number"
            type="tel"
            value={data.nextOfKin.homePhone}
            onChange={set("nextOfKin.homePhone")}
          />
          <TextField
            id={fid("nextOfKin.cellPhone")}
            label="Cellular phone number"
            type="tel"
            value={data.nextOfKin.cellPhone}
            onChange={set("nextOfKin.cellPhone")}
          />
          <TextField
            id={fid("nextOfKin.workPhone")}
            label="Work phone number"
            type="tel"
            value={data.nextOfKin.workPhone}
            onChange={set("nextOfKin.workPhone")}
          />
          <TextField
            id={fid("nextOfKin.fax")}
            label="Fax number"
            value={data.nextOfKin.fax}
            onChange={set("nextOfKin.fax")}
          />
          <div className="sm:col-span-2">
            <TextField
              id={fid("nextOfKin.email")}
              label="Email address"
              type="email"
              value={data.nextOfKin.email}
              onChange={set("nextOfKin.email")}
            />
          </div>
        </div>
      </div>

      <div>
        <BlockHeading>More about you</BlockHeading>
        <div className="mt-5 space-y-6">
          <CheckboxField
            label="Do you have a disability or special needs?"
            checked={data.disability}
            onChange={setBool("disability")}
          />
          {data.disability ? (
            <TextAreaField
              id={fid("disabilityDetails")}
              label="Please specify"
              value={data.disabilityDetails}
              onChange={set("disabilityDetails")}
              hint="This helps us plan reasonable accommodations if you are admitted."
            />
          ) : null}
          <CheckboxField
            label="Do you wish to live in Hall of Residence?"
            checked={data.hallOfResidence}
            onChange={setBool("hallOfResidence")}
          />
          <ChipGroup
            label="How did you hear about The Mico?"
            options={HEARD_ABOUT_OPTIONS}
            value={data.heardAbout}
            onChange={(next) => update((d) => ({ ...d, heardAbout: next }))}
          />
          {data.heardAbout.includes("Other") ? (
            <TextField
              id={fid("heardAboutOther")}
              label="Please specify"
              value={data.heardAboutOther}
              onChange={set("heardAboutOther")}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
 * Step 2 — Programme Selection (Section B)
 * ======================================================================== */

export function StepProgramme({ data, update, errors }: StepProps) {
  const set = textSetter(update);
  const firstProgrammes = programmes.filter(
    (p) => p.faculty === data.firstChoiceFaculty,
  );
  const secondProgrammes = programmes.filter(
    (p) => p.faculty === data.secondChoiceFaculty,
  );
  const facultyNames = faculties.map((f) => f.name);
  return (
    <div className="space-y-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id={fid("firstChoiceFaculty")}
          label="First choice faculty"
          required
          options={facultyNames}
          placeholder="Select faculty"
          value={data.firstChoiceFaculty}
          onChange={set("firstChoiceFaculty")}
          error={errors.firstChoiceFaculty}
        />
        <SelectField
          id={fid("desiredYearOfEntry")}
          label="Desired year of entry"
          required
          options={YEAR_OF_ENTRY}
          placeholder="Select intake"
          value={data.desiredYearOfEntry}
          onChange={set("desiredYearOfEntry")}
          error={errors.desiredYearOfEntry}
        />
        <div className="sm:col-span-2">
          <SelectField
            id={fid("firstChoiceProgramme")}
            label="First choice programme"
            required
            options={firstProgrammes.map((p) => p.title)}
            placeholder={
              data.firstChoiceFaculty
                ? "Select programme"
                : "Select a faculty first"
            }
            value={data.firstChoiceProgramme}
            onChange={set("firstChoiceProgramme")}
            error={errors.firstChoiceProgramme}
            hint={
              data.firstChoiceFaculty && firstProgrammes.length === 0
                ? "No programmes are listed under this faculty yet — choose another faculty or browse the programme directory."
                : undefined
            }
          />
        </div>
        <SelectField
          id={fid("preferredTimeOfStudy")}
          label="Preferred time of study"
          required
          options={TIME_OF_STUDY}
          placeholder="Select a time of study"
          value={data.preferredTimeOfStudy}
          onChange={set("preferredTimeOfStudy")}
          error={errors.preferredTimeOfStudy}
        />
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>Second choice (optional)</BlockHeading>
        <p className="mt-1 text-sm text-mico-mid">
          If your first choice is full, which programme would you consider?
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <SelectField
            id={fid("secondChoiceFaculty")}
            label="Second choice faculty"
            options={facultyNames}
            placeholder="Select faculty"
            value={data.secondChoiceFaculty}
            onChange={set("secondChoiceFaculty")}
          />
          <div className="sm:col-span-2">
            <SelectField
              id={fid("secondChoiceProgramme")}
              label="Second choice programme"
              options={secondProgrammes.map((p) => p.title)}
              placeholder={
                data.secondChoiceFaculty
                  ? "Select programme"
                  : "Select a faculty first"
              }
              value={data.secondChoiceProgramme}
              onChange={set("secondChoiceProgramme")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
 * Step 3 — Emergency Contact (Section C)
 * ======================================================================== */

export function StepEmergency({ data, update, errors }: StepProps) {
  const set = textSetter(update);
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <SelectField
        id={fid("emergencyContact.title")}
        label="Title"
        options={TITLES}
        placeholder="Select title"
        value={data.emergencyContact.title}
        onChange={set("emergencyContact.title")}
      />
      <TextField
        id={fid("emergencyContact.lastName")}
        label="Last name"
        required
        value={data.emergencyContact.lastName}
        onChange={set("emergencyContact.lastName")}
        error={errors["emergencyContact.lastName"]}
      />
      <TextField
        id={fid("emergencyContact.firstName")}
        label="First name"
        required
        value={data.emergencyContact.firstName}
        onChange={set("emergencyContact.firstName")}
        error={errors["emergencyContact.firstName"]}
      />
      <TextField
        id={fid("emergencyContact.middleNames")}
        label="Middle name(s)"
        value={data.emergencyContact.middleNames}
        onChange={set("emergencyContact.middleNames")}
      />
      <SelectField
        id={fid("emergencyContact.relationship")}
        label="Relationship"
        required
        options={RELATIONSHIPS}
        placeholder="Select relationship"
        value={data.emergencyContact.relationship}
        onChange={set("emergencyContact.relationship")}
        error={errors["emergencyContact.relationship"]}
      />
      <div className="sm:col-span-2">
        <TextAreaField
          id={fid("emergencyContact.homeAddress")}
          label="Home address"
          value={data.emergencyContact.homeAddress}
          onChange={set("emergencyContact.homeAddress")}
        />
      </div>
      <div className="sm:col-span-2">
        <TextAreaField
          id={fid("emergencyContact.workplaceAddress")}
          label="Workplace address"
          value={data.emergencyContact.workplaceAddress}
          onChange={set("emergencyContact.workplaceAddress")}
        />
      </div>
      <TextField
        id={fid("emergencyContact.homePhone")}
        label="Home phone"
        type="tel"
        value={data.emergencyContact.homePhone}
        onChange={set("emergencyContact.homePhone")}
      />
      <TextField
        id={fid("emergencyContact.mobilePhone")}
        label="Mobile phone"
        type="tel"
        value={data.emergencyContact.mobilePhone}
        onChange={set("emergencyContact.mobilePhone")}
        error={errors["emergencyContact.mobilePhone"]}
        hint="At least one phone number is required."
      />
      <TextField
        id={fid("emergencyContact.workPhone")}
        label="Work phone"
        type="tel"
        value={data.emergencyContact.workPhone}
        onChange={set("emergencyContact.workPhone")}
      />
      <TextField
        id={fid("emergencyContact.extension")}
        label="Extension"
        value={data.emergencyContact.extension}
        onChange={set("emergencyContact.extension")}
      />
      <TextField
        id={fid("emergencyContact.fax")}
        label="Fax"
        value={data.emergencyContact.fax}
        onChange={set("emergencyContact.fax")}
      />
    </div>
  );
}

/* ==========================================================================
 * Step 4 — Education History (Section D previous study + Section E)
 * ======================================================================== */

export function StepEducation({ data, update, errors }: StepProps) {
  const set = textSetter(update);
  const setBool = boolSetter(update);
  const studiedBefore =
    data.previousStudyAtMico ||
    data.previousStudyAtTeachersCollege ||
    data.previousStudyAtUniversity;
  return (
    <div className="space-y-10">
      <div>
        <BlockHeading>Previous study</BlockHeading>
        <p className="mt-1 text-sm text-mico-mid">
          Have you previously studied at any of the following?
        </p>
        <div className="mt-4 space-y-3">
          <CheckboxField
            label="The Mico"
            checked={data.previousStudyAtMico}
            onChange={setBool("previousStudyAtMico")}
          />
          <CheckboxField
            label="Another Teachers' College"
            checked={data.previousStudyAtTeachersCollege}
            onChange={setBool("previousStudyAtTeachersCollege")}
          />
          <CheckboxField
            label="University"
            checked={data.previousStudyAtUniversity}
            onChange={setBool("previousStudyAtUniversity")}
          />
        </div>
        {studiedBefore ? (
          <div className="mt-5 grid gap-5 rounded-sm border border-black/10 bg-mico-light p-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <TextField
                id={fid("previousInstitutionName")}
                label="Institution name"
                required
                value={data.previousInstitutionName}
                onChange={set("previousInstitutionName")}
                error={errors.previousInstitutionName}
              />
            </div>
            <TextField
              id={fid("previousMicoId")}
              label="Identification number (if former Mico student)"
              value={data.previousMicoId}
              onChange={set("previousMicoId")}
            />
            <TextField
              id={fid("previousFrom")}
              label="Registered from"
              type="month"
              required
              value={data.previousFrom}
              onChange={set("previousFrom")}
              error={errors.previousFrom}
            />
            <TextField
              id={fid("previousTo")}
              label="Registered to"
              type="month"
              required
              value={data.previousTo}
              onChange={set("previousTo")}
              error={errors.previousTo}
            />
            <div className="sm:col-span-2">
              <TextField
                id={fid("previousProgramme")}
                label="Programme"
                required
                value={data.previousProgramme}
                onChange={set("previousProgramme")}
                error={errors.previousProgramme}
              />
            </div>
          </div>
        ) : null}
      </div>

      <div>
        <BlockHeading>Secondary education</BlockHeading>
        <p className="mt-1 text-sm text-mico-mid">
          List each secondary school you attended. Multiple entries are
          allowed.
        </p>
        {errors.secondarySchools ? (
          <p role="alert" className="mt-3 text-sm font-medium text-red-700">
            {errors.secondarySchools}
          </p>
        ) : null}
        <div className="mt-5">
          <RowsEditor
            label="Secondary school"
            description="Include country if outside Jamaica."
            newRow={emptySecondarySchool}
            value={data.secondarySchools}
            onChange={(rows) => update((d) => ({ ...d, secondarySchools: rows }))}
            renderRow={(row, updateRow, _remove, index) => (
              <>
                <div className="sm:col-span-2">
                  <TextField
                    id={fid(`secondarySchools.${index}.schoolName`)}
                    label="School name"
                    required
                    value={row.schoolName}
                    onChange={(e) =>
                      updateRow({ ...row, schoolName: e.target.value })
                    }
                  />
                </div>
                <TextField
                  id={fid(`secondarySchools.${index}.country`)}
                  label="Country (if outside Jamaica)"
                  placeholder="Jamaica"
                  value={row.country}
                  onChange={(e) => updateRow({ ...row, country: e.target.value })}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    id={fid(`secondarySchools.${index}.fromDate`)}
                    label="From"
                    type="month"
                    value={row.fromDate}
                    onChange={(e) =>
                      updateRow({ ...row, fromDate: e.target.value })
                    }
                    error={errors[`secondarySchools.${index}.fromDate`]}
                  />
                  <TextField
                    id={fid(`secondarySchools.${index}.toDate`)}
                    label="To"
                    type="month"
                    value={row.toDate}
                    onChange={(e) =>
                      updateRow({ ...row, toDate: e.target.value })
                    }
                    error={errors[`secondarySchools.${index}.toDate`]}
                  />
                </div>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
 * Step 5 — Academic Qualifications (Section F)
 * ======================================================================== */

export function StepQualifications({ data, update, errors }: StepProps) {
  const set = textSetter(update);
  const setBool = boolSetter(update);
  return (
    <div className="space-y-10">
      <div>
        <BlockHeading>CSEC / GCE Ordinary Level</BlockHeading>
        <div className="mt-5">
          <RowsEditor
            label="Subject"
            description="Examination bodies: CSEC or GCE O-Level."
            newRow={emptyCsecSubject}
            value={data.csecSubjects}
            onChange={(rows) => update((d) => ({ ...d, csecSubjects: rows }))}
            renderRow={(row, updateRow, _remove, index) => (
              <>
                <SelectField
                  id={fid(`csecSubjects.${index}.examinationBody`)}
                  label="Examination body"
                  options={CSEC_BODIES}
                  value={row.examinationBody}
                  onChange={(e) =>
                    updateRow({ ...row, examinationBody: e.target.value })
                  }
                />
                <TextField
                  id={fid(`csecSubjects.${index}.subject`)}
                  label="Subject"
                  required
                  value={row.subject}
                  onChange={(e) => updateRow({ ...row, subject: e.target.value })}
                  error={errors[`csecSubjects.${index}.subject`]}
                />
                <TextField
                  id={fid(`csecSubjects.${index}.grade`)}
                  label="Grade"
                  required
                  value={row.grade}
                  onChange={(e) => updateRow({ ...row, grade: e.target.value })}
                  error={errors[`csecSubjects.${index}.grade`]}
                />
                <TextField
                  id={fid(`csecSubjects.${index}.date`)}
                  label="Date of examination"
                  type="month"
                  value={row.date}
                  onChange={(e) => updateRow({ ...row, date: e.target.value })}
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>CAPE / GCE Advanced Level</BlockHeading>
        <div className="mt-5">
          <RowsEditor
            label="Subject"
            description="Examination bodies: CAPE or GCE A-Level."
            newRow={emptyCapeSubject}
            value={data.capeSubjects}
            onChange={(rows) => update((d) => ({ ...d, capeSubjects: rows }))}
            renderRow={(row, updateRow, _remove, index) => (
              <>
                <SelectField
                  id={fid(`capeSubjects.${index}.examinationBody`)}
                  label="Examination body"
                  options={CAPE_BODIES}
                  value={row.examinationBody}
                  onChange={(e) =>
                    updateRow({ ...row, examinationBody: e.target.value })
                  }
                />
                <TextField
                  id={fid(`capeSubjects.${index}.subject`)}
                  label="Subject"
                  required
                  value={row.subject}
                  onChange={(e) => updateRow({ ...row, subject: e.target.value })}
                  error={errors[`capeSubjects.${index}.subject`]}
                />
                <TextField
                  id={fid(`capeSubjects.${index}.grade`)}
                  label="Grade"
                  required
                  value={row.grade}
                  onChange={(e) => updateRow({ ...row, grade: e.target.value })}
                  error={errors[`capeSubjects.${index}.grade`]}
                />
                <TextField
                  id={fid(`capeSubjects.${index}.date`)}
                  label="Date of examination"
                  type="month"
                  value={row.date}
                  onChange={(e) => updateRow({ ...row, date: e.target.value })}
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>Current examinations awaiting results</BlockHeading>
        <div className="mt-5">
          <RowsEditor
            label="Examination"
            description="Exams you have written and are awaiting results for."
            newRow={emptyPendingExam}
            value={data.pendingExams}
            onChange={(rows) => update((d) => ({ ...d, pendingExams: rows }))}
            renderRow={(row, updateRow, _remove, index) => (
              <>
                <SelectField
                  id={fid(`pendingExams.${index}.examinationBody`)}
                  label="Examination body"
                  options={LEVELS_AWAITING}
                  value={row.examinationBody}
                  onChange={(e) =>
                    updateRow({ ...row, examinationBody: e.target.value })
                  }
                />
                <TextField
                  id={fid(`pendingExams.${index}.level`)}
                  label="Level"
                  value={row.level}
                  onChange={(e) => updateRow({ ...row, level: e.target.value })}
                />
                <TextField
                  id={fid(`pendingExams.${index}.subjectProgramme`)}
                  label="Subject / programme"
                  required
                  value={row.subjectProgramme}
                  onChange={(e) =>
                    updateRow({ ...row, subjectProgramme: e.target.value })
                  }
                  error={errors[`pendingExams.${index}.subjectProgramme`]}
                />
                <TextField
                  id={fid(`pendingExams.${index}.date`)}
                  label="Date of examination"
                  type="month"
                  value={row.date}
                  onChange={(e) => updateRow({ ...row, date: e.target.value })}
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>Post-secondary education</BlockHeading>
        <div className="mt-5">
          <RowsEditor
            label="Institution"
            description="Colleges, universities or other post-secondary study."
            newRow={emptyPostSecondaryStudy}
            value={data.postSecondary}
            onChange={(rows) => update((d) => ({ ...d, postSecondary: rows }))}
            renderRow={(row, updateRow, _remove, index) => (
              <>
                <div className="sm:col-span-2">
                  <TextField
                    id={fid(`postSecondary.${index}.institutionName`)}
                    label="Institution name"
                    required
                    value={row.institutionName}
                    onChange={(e) =>
                      updateRow({ ...row, institutionName: e.target.value })
                    }
                    error={errors[`postSecondary.${index}.institutionName`]}
                  />
                </div>
                <TextField
                  id={fid(`postSecondary.${index}.fromDate`)}
                  label="From"
                  type="month"
                  value={row.fromDate}
                  onChange={(e) =>
                    updateRow({ ...row, fromDate: e.target.value })
                  }
                />
                <TextField
                  id={fid(`postSecondary.${index}.toDate`)}
                  label="To"
                  type="month"
                  value={row.toDate}
                  onChange={(e) =>
                    updateRow({ ...row, toDate: e.target.value })
                  }
                />
                <TextField
                  id={fid(`postSecondary.${index}.subjectArea`)}
                  label="Subject area / major"
                  value={row.subjectArea}
                  onChange={(e) =>
                    updateRow({ ...row, subjectArea: e.target.value })
                  }
                />
                <TextField
                  id={fid(`postSecondary.${index}.typeOfStudies`)}
                  label="Type of studies"
                  value={row.typeOfStudies}
                  onChange={(e) =>
                    updateRow({ ...row, typeOfStudies: e.target.value })
                  }
                />
                <TextField
                  id={fid(`postSecondary.${index}.certification`)}
                  label="Certification"
                  value={row.certification}
                  onChange={(e) =>
                    updateRow({ ...row, certification: e.target.value })
                  }
                />
                <TextField
                  id={fid(`postSecondary.${index}.dateAwarded`)}
                  label="Date awarded"
                  type="month"
                  value={row.dateAwarded}
                  onChange={(e) =>
                    updateRow({ ...row, dateAwarded: e.target.value })
                  }
                />
              </>
            )}
          />
        </div>
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>Co-curricular information</BlockHeading>
        <div className="mt-5 space-y-6">
          <TextAreaField
            id={fid("coCurricular")}
            label="Sporting activities, cultural activities and service clubs"
            value={data.coCurricular}
            onChange={set("coCurricular")}
            hint="One entry covering sport, culture and service — e.g. 'netball (school team), school choir, Interact Club secretary'."
          />
          <CheckboxField
            label="Do you play any musical instruments?"
            checked={data.musicalInstrument}
            onChange={setBool("musicalInstrument")}
          />
          {data.musicalInstrument ? (
            <TextField
              id={fid("musicalInstruments")}
              label="Specify instrument(s)"
              required
              value={data.musicalInstruments}
              onChange={set("musicalInstruments")}
              error={errors.musicalInstruments}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
