import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { AdminShell } from "@/components/layout/AdminShell";
import {
  downloadApplicationPdf,
  type AdmissionValues,
} from "@/lib/admission-pdf";
import { useQuery } from "convex/react";
import { BadgeCheck, Download, Loader2, ShieldAlert } from "lucide-react";
import { useParams } from "react-router";

type Application = Doc<"applications">;

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

  const values = toValues(application);
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
            {application.declarationConfirmed ? (
              <>
                <BadgeCheck aria-hidden="true" className="size-5 text-mico-gold-deep" />
                Declaration confirmed electronically
              </>
            ) : (
              <span>Declaration not confirmed</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => void downloadApplicationPdf(values, application.refNumber)}
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-mico-gold px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-mico-gold-deep hover:text-white"
          >
            <Download aria-hidden="true" className="size-4" />
            Download application (PDF)
          </button>
        </div>

        {/* Fields */}
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
                    {values[key] ? values[key] : "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
