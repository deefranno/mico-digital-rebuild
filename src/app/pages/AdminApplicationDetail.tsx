import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { AdminShell } from "@/components/layout/AdminShell";
import {
  downloadApplicationPdf,
  type AdmissionValues,
} from "@/lib/admission-pdf";
import { useQuery } from "convex/react";
import {
  BadgeCheck,
  Download,
  FileText,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { useParams } from "react-router";
import {
  APPLICATION_DATA_SECTIONS,
  getDataByPath,
  type AdmissionApplicationData,
} from "@/types/application";

type Application = Doc<"applications">;

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* --------------------------------------------------------------------------
 * Legacy rendering (pre-wizard submissions)
 * ------------------------------------------------------------------------ */

/** Maps a stored application row onto the shared form contract used by the PDF generator. */
function toValues(a: Application): AdmissionValues {
  return {
    firstName: a.firstName,
    lastName: a.lastName,
    dateOfBirth: a.dateOfBirth,
    gender: a.gender,
    nationality: a.nationality,
    trn: a.trn ?? "",
    address: a.address,
    cityTown: a.cityTown,
    parish: a.parish,
    email: a.email,
    phone: a.phone,
    emergencyContactName: a.emergencyContactName ?? "",
    emergencyContactPhone: a.emergencyContactPhone ?? "",
    studyLevel: a.studyLevel,
    programme: a.programme,
    intake: a.intake,
    studyMode: a.studyMode,
    secondarySchool: a.secondarySchool,
    lastGradeCompleted: a.lastGradeCompleted,
    qualifications: a.qualifications,
    otherInstitution: a.otherInstitution ?? "",
    heardAbout: a.heardAbout,
    additionalInfo: a.additionalInfo ?? "",
    declarationConfirmed: a.declarationConfirmed,
  };
}

const FIELD_GROUPS: Array<{
  title: string;
  fields: Array<[string, keyof AdmissionValues]>;
}> = [
  {
    title: "Personal details",
    fields: [
      ["Date of birth", "dateOfBirth"],
      ["Gender", "gender"],
      ["Nationality", "nationality"],
      ["TRN / NIS", "trn"],
      ["Residential address", "address"],
      ["City / Town", "cityTown"],
      ["Parish", "parish"],
      ["Email address", "email"],
      ["Telephone / mobile", "phone"],
      ["Emergency contact", "emergencyContactName"],
      ["Emergency contact phone", "emergencyContactPhone"],
    ],
  },
  {
    title: "Programme of interest",
    fields: [
      ["Study level", "studyLevel"],
      ["Programme", "programme"],
      ["Intake", "intake"],
      ["Study mode", "studyMode"],
    ],
  },
  {
    title: "Academic background",
    fields: [
      ["Secondary school attended", "secondarySchool"],
      ["Highest grade completed", "lastGradeCompleted"],
      ["Other institution", "otherInstitution"],
      ["Qualifications and grades", "qualifications"],
    ],
  },
  {
    title: "Additional information",
    fields: [
      ["How they heard about Mico", "heardAbout"],
      ["Additional notes", "additionalInfo"],
    ],
  },
];

/* --------------------------------------------------------------------------
 * Wizard rendering helpers
 * ------------------------------------------------------------------------ */

function renderValue(value: unknown, type?: string): string {
  if (value === undefined || value === null || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }
  return String(value);
}

function formatBytes(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function WizardDetail({
  application,
}: {
  application: Application & { data: AdmissionApplicationData };
}) {
  const data = application.data;
  const documents = data.documents ?? [];
  const storageIds = documents.map((d) => d.storageId);
  const urls = useQuery(
    api.applications.getApplicationDocumentUrls,
    storageIds.length ? { storageIds } : "skip",
  );

  return (
    <div className="space-y-8">
      {APPLICATION_DATA_SECTIONS.map((section) => {
        const visibleFields = section.fields.filter((f) => {
          const v = getDataByPath(data, f.path);
          if (Array.isArray(v)) return v.length > 0;
          return v !== undefined && v !== null && v !== "" && v !== false;
        });
        const repeatables = (section.repeatables ?? []).filter((r) => {
          const rows = getDataByPath(data, r.path);
          return Array.isArray(rows) && rows.length > 0;
        });
        if (visibleFields.length === 0 && repeatables.length === 0) {
          return null;
        }
        return (
          <section key={section.title} className="border border-black/10 bg-white">
            <h2 className="border-b border-black/10 bg-black px-5 py-3 font-display text-sm font-bold uppercase tracking-widest text-white">
              {section.title}
            </h2>
            {visibleFields.length > 0 ? (
              <dl className="grid gap-x-8 gap-y-5 px-5 py-6 sm:grid-cols-2">
                {visibleFields.map((field) => (
                  <div key={field.path}>
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mico-mid">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-relaxed text-black">
                      {renderValue(getDataByPath(data, field.path), field.type)}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {repeatables.map((rep) => {
              const rows = getDataByPath(data, rep.path) as unknown[];
              return (
                <div key={rep.path} className="overflow-x-auto border-t border-black/10">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="border-b border-black/10 bg-mico-light text-[0.7rem] uppercase tracking-widest text-mico-mid">
                      <tr>
                        {rep.columns.map((col) => (
                          <th key={col.path} scope="col" className="px-4 py-2.5 font-semibold">
                            {col.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className="border-b border-black/5 last:border-b-0">
                          {rep.columns.map((col) => (
                            <td key={col.path} className="px-4 py-3 text-mico-dark">
                              {renderValue(getDataByPath(row, col.path))}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </section>
        );
      })}

      {/* Supporting documents */}
      <section className="border border-black/10 bg-white">
        <h2 className="border-b border-black/10 bg-black px-5 py-3 font-display text-sm font-bold uppercase tracking-widest text-white">
          Supporting documents ({documents.length})
        </h2>
        {documents.length === 0 ? (
          <p className="px-5 py-6 text-sm text-mico-mid">
            No supporting documents were uploaded with this application.
          </p>
        ) : (
          <ul className="divide-y divide-black/5">
            {documents.map((doc) => {
              const href = urls?.[doc.storageId] ?? null;
              return (
                <li
                  key={doc.storageId}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-black">
                      {doc.name}
                    </p>
                    <p className="text-xs text-mico-mid">
                      {doc.label}
                      {doc.size ? ` · ${formatBytes(doc.size)}` : ""}
                    </p>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-black/20 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
                    >
                      <Download aria-hidden="true" className="size-3.5" />
                      Download
                    </a>
                  ) : (
                    <span className="shrink-0 text-xs text-mico-mid">
                      {urls === undefined ? "Loading…" : "Unavailable"}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------ */

export default function AdminApplicationDetail() {
  const { id } = useParams();
  const application = useQuery(
    api.applications.getApplication,
    id ? { id: id as Id<"applications"> } : "skip",
  );

  if (application === undefined) {
    return (
      <AdminShell title="Application" backTo="/admin/applications">
        <div className="flex items-center justify-center border border-black/10 bg-white py-24">
          <Loader2 aria-hidden="true" className="size-6 animate-spin text-mico-gold-deep" />
        </div>
      </AdminShell>
    );
  }

  if (application === null) {
    return (
      <AdminShell title="Application" backTo="/admin/applications">
        <div className="border border-black/10 bg-white px-6 py-16 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-black text-mico-gold">
            <ShieldAlert aria-hidden="true" className="size-6" />
          </span>
          <h2 className="mt-5 font-display text-xl font-extrabold text-black">
            Application not found
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mico-mid">
            This application may have been removed, or you may not have access
            to it. Return to the list to continue reviewing.
          </p>
        </div>
      </AdminShell>
    );
  }

  const hasWizardData =
    application.data &&
    typeof application.data === "object" &&
    "firstChoiceProgramme" in application.data;
  const fullName = `${application.firstName} ${application.lastName}`;

  return (
    <AdminShell
      title={fullName}
      subtitle={`Submitted ${formatDate(application._creationTime)} · ${application.refNumber}`}
      backTo="/admin/applications"
    >
      <div className="space-y-8">
        {/* Quick actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-mico-mid">
            <BadgeCheck aria-hidden="true" className="size-5 text-mico-gold-deep" />
            {application.declarationConfirmed
              ? "Declaration confirmed electronically"
              : "Declaration not confirmed"}
          </div>
          {!hasWizardData ? (
            <button
              type="button"
              onClick={() =>
                void downloadApplicationPdf(toValues(application), application.refNumber)
              }
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-mico-gold px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-mico-gold-deep hover:text-white"
            >
              <Download aria-hidden="true" className="size-4" />
              Download application (PDF)
            </button>
          ) : null}
        </div>

        {hasWizardData ? (
          <WizardDetail application={application as Application & { data: AdmissionApplicationData }} />
        ) : (
          <div className="space-y-8">
            {FIELD_GROUPS.map((group) => (
              <section key={group.title} className="border border-black/10 bg-white">
                <h2 className="border-b border-black/10 bg-black px-5 py-3 font-display text-sm font-bold uppercase tracking-widest text-white">
                  {group.title}
                </h2>
                <dl className="grid gap-x-8 gap-y-5 px-5 py-6 sm:grid-cols-2">
                  {group.fields.map(([label, key]) => (
                    <div key={key}>
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-mico-mid">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium leading-relaxed text-black">
                        {toValues(application)[key] ? toValues(application)[key] : "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
