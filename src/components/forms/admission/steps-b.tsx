/**
 * Steps 6–10 of the multi-step admission wizard: Employment History,
 * Referees, Funding Information, Supporting Documents and Review & Submit.
 */
import { api } from "@/convex/_generated/api";
import { SelectField, TextAreaField, TextField } from "@/components/shared/FormField";
import {
  emptyEmploymentRecord,
  emptyReferee,
  type ApplicationDocument,
} from "@/types/application";
import { useMutation } from "convex/react";
import {
  CheckCircle2,
  FileText,
  TriangleAlert,
  X,
} from "lucide-react";
import { useState } from "react";
import { CheckboxField, ChipGroup, FileInput, RowsEditor } from "./primitives";
import { STEPS_META } from "./steps-a";
import {
  boolSetter,
  DOCUMENT_TYPES,
  fid,
  FUNDING_SOURCES,
  RELATIONSHIPS,
  StepProps,
  textSetter,
  todayISO,
} from "./wizard";

/* ==========================================================================
 * Step 6 — Employment History (Section H)
 * ======================================================================== */

export function StepEmployment({ data, update, errors }: StepProps) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-mico-mid">
        List your employment record, including any current job. You can add
        multiple employers. Leave this section empty if you have not been
        employed.
      </p>
      <div className="mt-6">
        <RowsEditor
          label="Employer"
          description="Include start and end dates for each position."
          newRow={emptyEmploymentRecord}
          value={data.employment}
          onChange={(rows) => update((d) => ({ ...d, employment: rows }))}
          renderRow={(row, updateRow, _remove, index) => (
            <>
              <TextField
                id={fid(`employment.${index}.employerName`)}
                label="Employer name"
                required
                value={row.employerName}
                onChange={(e) =>
                  updateRow({ ...row, employerName: e.target.value })
                }
                error={errors[`employment.${index}.employerName`]}
              />
              <TextField
                id={fid(`employment.${index}.jobClassification`)}
                label="Job classification"
                value={row.jobClassification}
                onChange={(e) =>
                  updateRow({ ...row, jobClassification: e.target.value })
                }
              />
              <div className="sm:col-span-2">
                <TextField
                  id={fid(`employment.${index}.address`)}
                  label="Address"
                  value={row.address}
                  onChange={(e) =>
                    updateRow({ ...row, address: e.target.value })
                  }
                />
              </div>
              <TextField
                id={fid(`employment.${index}.townCity`)}
                label="Town / village / city"
                value={row.townCity}
                onChange={(e) => updateRow({ ...row, townCity: e.target.value })}
              />
              <TextField
                id={fid(`employment.${index}.telephone`)}
                label="Telephone"
                type="tel"
                value={row.telephone}
                onChange={(e) =>
                  updateRow({ ...row, telephone: e.target.value })
                }
              />
              <TextField
                id={fid(`employment.${index}.fax`)}
                label="Fax"
                value={row.fax}
                onChange={(e) => updateRow({ ...row, fax: e.target.value })}
              />
              <TextField
                id={fid(`employment.${index}.parish`)}
                label="Parish"
                value={row.parish}
                onChange={(e) => updateRow({ ...row, parish: e.target.value })}
              />
              <TextField
                id={fid(`employment.${index}.country`)}
                label="Country"
                value={row.country}
                onChange={(e) => updateRow({ ...row, country: e.target.value })}
              />
              <TextField
                id={fid(`employment.${index}.fromDate`)}
                label="From"
                type="month"
                value={row.fromDate}
                onChange={(e) =>
                  updateRow({ ...row, fromDate: e.target.value })
                }
              />
              <TextField
                id={fid(`employment.${index}.toDate`)}
                label="To"
                type="month"
                value={row.toDate}
                onChange={(e) => updateRow({ ...row, toDate: e.target.value })}
              />
            </>
          )}
        />
      </div>
    </div>
  );
}

/* ==========================================================================
 * Step 7 — Referees (Section I)
 * ======================================================================== */

export function StepReferees({ data, update, errors }: StepProps) {
  return (
    <div>
      <p className="text-sm leading-relaxed text-mico-mid">
        Please provide <span className="font-semibold text-black">two referees</span>{" "}
        who can comment on your character and suitability — for example a
        principal, teacher, pastor or employer.
      </p>
      {errors.referees ? (
        <p role="alert" className="mt-3 text-sm font-medium text-red-700">
          {errors.referees}
        </p>
      ) : null}
      <div className="mt-6">
        <RowsEditor
          label="Referee"
          newRow={emptyReferee}
          value={data.referees}
          onChange={(rows) => update((d) => ({ ...d, referees: rows }))}
          renderRow={(row, updateRow, _remove, index) => (
            <>
              <div className="sm:col-span-2">
                <TextField
                  id={fid(`referees.${index}.name`)}
                  label="Name"
                  required
                  value={row.name}
                  onChange={(e) => updateRow({ ...row, name: e.target.value })}
                  error={errors[`referees.${index}.name`]}
                />
              </div>
              <TextField
                id={fid(`referees.${index}.organization`)}
                label="Organization"
                required
                value={row.organization}
                onChange={(e) =>
                  updateRow({ ...row, organization: e.target.value })
                }
                error={errors[`referees.${index}.organization`]}
              />
              <TextField
                id={fid(`referees.${index}.positionHeld`)}
                label="Position held"
                value={row.positionHeld}
                onChange={(e) =>
                  updateRow({ ...row, positionHeld: e.target.value })
                }
              />
              <div className="sm:col-span-2">
                <TextField
                  id={fid(`referees.${index}.address`)}
                  label="Address"
                  value={row.address}
                  onChange={(e) =>
                    updateRow({ ...row, address: e.target.value })
                  }
                />
              </div>
              <TextField
                id={fid(`referees.${index}.telephone`)}
                label="Telephone number"
                type="tel"
                value={row.telephone}
                onChange={(e) =>
                  updateRow({ ...row, telephone: e.target.value })
                }
              />
              <TextField
                id={fid(`referees.${index}.cityTownPostOffice`)}
                label="City / town / post office"
                value={row.cityTownPostOffice}
                onChange={(e) =>
                  updateRow({ ...row, cityTownPostOffice: e.target.value })
                }
              />
              <div className="sm:col-span-2">
                <TextField
                  id={fid(`referees.${index}.parishCountry`)}
                  label="Parish / country"
                  value={row.parishCountry}
                  onChange={(e) =>
                    updateRow({ ...row, parishCountry: e.target.value })
                  }
                />
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}

/* ==========================================================================
 * Step 8 — Funding Information (Section G)
 * ======================================================================== */

export function StepFunding({ data, update, errors }: StepProps) {
  const set = textSetter(update);
  const setBool = boolSetter(update);
  return (
    <div className="space-y-10">
      <div>
        <BlockHeading>Expected sources of funding</BlockHeading>
        <div className="mt-5">
          <ChipGroup
            label="How do you plan to fund your studies?"
            options={FUNDING_SOURCES}
            required
            value={data.fundingSources}
            onChange={(next) => update((d) => ({ ...d, fundingSources: next }))}
            error={errors.fundingSources}
          />
        </div>
        {data.fundingSources.includes("Other") ? (
          <div className="mt-5">
            <TextField
              id={fid("fundingOther")}
              label="Please specify"
              value={data.fundingOther}
              onChange={set("fundingOther")}
            />
          </div>
        ) : null}
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>Mico staff</BlockHeading>
        <div className="mt-4 space-y-6">
          <CheckboxField
            label="Are you a Mico Staff Member?"
            checked={data.micoStaff}
            onChange={setBool("micoStaff")}
          />
          {data.micoStaff ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                id={fid("staffIdNumber")}
                label="Staff ID number"
                required
                value={data.staffIdNumber}
                onChange={set("staffIdNumber")}
                error={errors.staffIdNumber}
              />
              <TextField
                id={fid("department")}
                label="Department"
                required
                value={data.department}
                onChange={set("department")}
                error={errors.department}
              />
            </div>
          ) : null}
          <CheckboxField
            label="Are you a dependent of a Mico Staff Member?"
            checked={data.staffDependent}
            onChange={setBool("staffDependent")}
          />
          {data.staffDependent ? (
            <div className="grid gap-5 rounded-sm border border-black/10 bg-mico-light p-5 sm:grid-cols-2">
              <TextField
                id={fid("staffMemberName")}
                label="Staff member name"
                required
                value={data.staffMemberName}
                onChange={set("staffMemberName")}
                error={errors.staffMemberName}
              />
              <TextField
                id={fid("staffDependentDepartment")}
                label="Department"
                value={data.staffDependentDepartment}
                onChange={set("staffDependentDepartment")}
              />
              <SelectField
                id={fid("staffDependentRelationship")}
                label="Relationship"
                options={RELATIONSHIPS}
                placeholder="Select relationship"
                value={data.staffDependentRelationship}
                onChange={set("staffDependentRelationship")}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
 * Step 9 — Supporting Documents (uploads)
 * ======================================================================== */

function formatSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function StepDocuments({ data, update, errors }: StepProps) {
  const generateUploadUrl = useMutation(api.applications.generateUploadUrl);
  const [uploadingLabel, setUploadingLabel] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFiles(label: string, files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadingLabel(label);
    setUploadError(null);
    try {
      for (const file of Array.from(files)) {
        const uploadUrl = await generateUploadUrl();
        const res = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
          body: file,
        });
        if (!res.ok) throw new Error(`Upload failed (${res.status})`);
        const { storageId } = (await res.json()) as { storageId: string };
        update((d) => ({
          ...d,
          documents: [
            ...d.documents,
            { label, storageId, name: file.name, size: file.size },
          ],
        }));
      }
    } catch {
      setUploadError(
        "One or more files could not be uploaded. Please try again.",
      );
    } finally {
      setUploadingLabel(null);
    }
  }

  function removeDocument(storageId: string) {
    update((d) => ({
      ...d,
      documents: d.documents.filter((x) => x.storageId !== storageId),
    }));
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm leading-relaxed text-mico-mid">
          Upload clear copies of your supporting documents. Multiple files are
          allowed per document type, and files upload immediately as you
          select them — they are attached securely to your application.
        </p>
        <p className="mt-2 text-xs text-mico-mid">
          Maximum 5 MB per file. PDF, JPG and PNG accepted.
        </p>
      </div>

      {errors.documents ? (
        <div
          role="alert"
          className="border border-red-600 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {errors.documents}
        </div>
      ) : null}
      {uploadError ? (
        <div
          role="alert"
          className="border border-red-600 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {uploadError}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        {DOCUMENT_TYPES.map((doc) => {
          const uploaded = data.documents.filter((d) => d.label === doc.label);
          const idBase = `doc-${doc.label.replace(/[^a-z0-9]+/gi, "-")}`;
          return (
            <div key={doc.label} className="border border-black/10 bg-mico-light p-4">
              <FileInput
                id={idBase}
                label={doc.label}
                required={doc.required}
                description={doc.required ? "Required document" : "Optional"}
                accept=".pdf,image/*"
                multiple
                uploading={uploadingLabel === doc.label}
                onFiles={(files) => void handleFiles(doc.label, files)}
              />
              {uploaded.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {uploaded.map((f: ApplicationDocument) => (
                    <li
                      key={f.storageId}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="flex min-w-0 items-center gap-2 text-mico-dark">
                        <FileText
                          aria-hidden="true"
                          className="size-4 shrink-0 text-mico-gold-deep"
                        />
                        <span className="truncate">{f.name}</span>
                        <span className="shrink-0 text-xs text-mico-mid">
                          {formatSize(f.size)}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeDocument(f.storageId)}
                        aria-label={`Remove ${f.name}`}
                        className="shrink-0 text-mico-mid transition-colors hover:text-red-700"
                      >
                        <X aria-hidden="true" className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
 * Step 10 — Review & Submit (Section J declaration)
 * ======================================================================== */

export function StepReview({
  data,
  update,
  errors,
  stepIssues,
  onJump,
}: StepProps & {
  stepIssues: boolean[];
  onJump: (step: number) => void;
}) {
  const set = textSetter(update);
  const setBool = boolSetter(update);
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const effApplicantName = data.applicantFullName || fullName;
  const effDate = data.applicantDate || todayISO();

  const summary = [
    { label: "Programme", value: data.firstChoiceProgramme || "—" },
    { label: "Faculty", value: data.firstChoiceFaculty || "—" },
    { label: "Year of entry", value: data.desiredYearOfEntry || "—" },
    { label: "Time of study", value: data.preferredTimeOfStudy || "—" },
    {
      label: "Secondary schools",
      value: `${data.secondarySchools.length} listed`,
    },
    {
      label: "Qualifications",
      value: String(data.csecSubjects.length + data.capeSubjects.length),
    },
    { label: "Referees", value: `${data.referees.length} provided` },
    { label: "Documents", value: `${data.documents.length} uploaded` },
  ];

  return (
    <div className="space-y-10">
      <div>
        <BlockHeading>Application summary</BlockHeading>
        <dl className="mt-5 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map((item) => (
            <div key={item.label} className="bg-white px-5 py-4">
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mico-mid">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-black">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <BlockHeading>Before you submit</BlockHeading>
        <p className="mt-1 text-sm text-mico-mid">
          Every section marked below must be complete. Jump to any section to
          review or correct it.
        </p>
        <ol className="mt-5 grid gap-2 sm:grid-cols-2">
          {STEPS_META.map((s, i) => {
            const ok = !stepIssues[i];
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  className="flex w-full items-center gap-2.5 border px-4 py-3 text-left text-sm transition-colors hover:border-black"
                >
                  {ok ? (
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4 shrink-0 text-emerald-600"
                    />
                  ) : (
                    <TriangleAlert
                      aria-hidden="true"
                      className="size-4 shrink-0 text-mico-gold-deep"
                    />
                  )}
                  <span className="text-mico-dark">
                    <span className="font-semibold text-black">
                      {i + 1}. {s.title}
                    </span>
                  </span>
                  {!ok ? (
                    <span className="ml-auto shrink-0 text-xs font-semibold text-mico-gold-deep">
                      Needs attention
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>Applicant declaration</BlockHeading>
        <p className="mt-1 text-sm text-mico-mid">
          Please read the declaration carefully before submitting.
        </p>
        <div className="mt-5 border border-black/10 bg-mico-light p-6">
          <p className="text-sm leading-relaxed text-mico-dark">
            I certify that the information provided in this application is true
            and complete to the best of my knowledge. I understand that the
            submission of false information may result in the withdrawal of any
            offer of admission. I consent to The Mico University College
            processing my personal data for the purposes of assessing this
            application and, if admitted, for the administration of my studies.
          </p>
        </div>
        <div className="mt-6">
          <CheckboxField
            label="I confirm the declaration above"
            required
            checked={data.declarationConfirmed}
            onChange={setBool("declarationConfirmed")}
            error={errors.declarationConfirmed}
          />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <TextField
            id={fid("applicantFullName")}
            label="Applicant full name"
            required
            value={effApplicantName}
            onChange={set("applicantFullName")}
            error={errors.applicantFullName}
          />
          <TextField
            id={fid("applicantSignature")}
            label="Electronic signature"
            required
            value={data.applicantSignature}
            onChange={set("applicantSignature")}
            error={errors.applicantSignature}
            hint="Type your full name as your electronic signature."
          />
          <TextField
            id={fid("applicantDate")}
            label="Date"
            type="date"
            required
            value={effDate}
            onChange={set("applicantDate")}
            error={errors.applicantDate}
          />
        </div>
      </div>

      <div className="border-t border-black/10 pt-8">
        <BlockHeading>Parent / guardian (optional)</BlockHeading>
        <p className="mt-1 text-sm text-mico-mid">
          Required only if you are under 18, or a parent / guardian /
          financial benefactor is signing on your behalf.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <TextField
            id={fid("parentFullName")}
            label="Full name"
            value={data.parentFullName}
            onChange={set("parentFullName")}
          />
          <TextField
            id={fid("parentSignature")}
            label="Electronic signature"
            value={data.parentSignature}
            onChange={set("parentSignature")}
          />
          <TextField
            id={fid("parentDate")}
            label="Date"
            type="date"
            value={data.parentDate}
            onChange={set("parentDate")}
          />
        </div>
      </div>
    </div>
  );
}

function BlockHeading({ children }: { children: string }) {
  return (
    <h3 className="font-display text-lg font-extrabold tracking-tight text-black">
      {children}
    </h3>
  );
}
