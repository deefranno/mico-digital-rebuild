/**
 * Admission application PDF generator (jsPDF).
 *
 * Produces a clean, printable A4 application form that mirrors the sections
 * and fields of the online form:
 *
 *   - `downloadBlankApplicationPdf()`   — blank form for offline completion
 *   - `downloadApplicationPdf(values)`  — pre-filled copy of a submission
 *
 * The field metadata below (sections + keys) intentionally matches the
 * `AdmissionForm` component so the web form and the PDF stay in sync.
 */
import { jsPDF } from "jspdf";

/* --------------------------------------------------------------------------
 * Shared shape
 * ------------------------------------------------------------------------ */

export interface AdmissionValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  trn: string;
  address: string;
  cityTown: string;
  parish: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  studyLevel: string;
  programme: string;
  intake: string;
  studyMode: string;
  secondarySchool: string;
  lastGradeCompleted: string;
  qualifications: string;
  otherInstitution: string;
  heardAbout: string;
  additionalInfo: string;
  declarationConfirmed: boolean;
}

export const EMPTY_ADMISSION_VALUES: AdmissionValues = {
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

/** Section + field descriptors — single source of truth for the PDF layout. */
type FieldKind = "line" | "box";
interface PdfField {
  key: keyof AdmissionValues;
  label: string;
  kind?: FieldKind;
  /** half = side-by-side in a two-column grid, full = whole row */
  span?: "half" | "full";
}
interface PdfSection {
  code: string;
  title: string;
  fields: PdfField[];
}

const PDF_SECTIONS: PdfSection[] = [
  {
    code: "A",
    title: "Personal details",
    fields: [
      { key: "firstName", label: "First name", span: "half" },
      { key: "lastName", label: "Last name", span: "half" },
      { key: "dateOfBirth", label: "Date of birth", span: "half" },
      { key: "gender", label: "Gender", span: "half" },
      { key: "nationality", label: "Nationality", span: "half" },
      { key: "trn", label: "TRN / NIS (if applicable)", span: "half" },
      { key: "address", label: "Residential address" },
      { key: "cityTown", label: "City / Town", span: "half" },
      { key: "parish", label: "Parish", span: "half" },
      { key: "email", label: "Email address" },
      { key: "phone", label: "Telephone / mobile", span: "half" },
      { key: "emergencyContactName", label: "Emergency contact name", span: "half" },
      { key: "emergencyContactPhone", label: "Emergency contact phone", span: "full" },
    ],
  },
  {
    code: "B",
    title: "Programme of interest",
    fields: [
      { key: "studyLevel", label: "Study level", span: "half" },
      { key: "intake", label: "Intake term", span: "half" },
      { key: "programme", label: "Programme" },
      { key: "studyMode", label: "Study mode" },
    ],
  },
  {
    code: "C",
    title: "Academic background",
    fields: [
      { key: "secondarySchool", label: "Secondary school attended" },
      { key: "lastGradeCompleted", label: "Highest grade / level completed", span: "half" },
      { key: "otherInstitution", label: "Other institution (current / previous)", span: "half" },
      { key: "qualifications", label: "Qualifications and grades", kind: "box" },
    ],
  },
  {
    code: "D",
    title: "Additional information",
    fields: [
      { key: "heardAbout", label: "How did you hear about Mico?" },
      { key: "additionalInfo", label: "Additional information (optional)", kind: "box" },
    ],
  },
];

/* --------------------------------------------------------------------------
 * Rendering helpers
 * ------------------------------------------------------------------------ */

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;
const COL_GAP = 6;
const COL_W = (CONTENT_W - COL_GAP) / 2;

const GOLD: [number, number, number] = [242, 169, 0];
const INK: [number, number, number] = [0, 0, 0];
const GRAY: [number, number, number] = [102, 102, 102];
const FAINT: [number, number, number] = [200, 200, 200];

class FormDoc {
  doc: jsPDF;
  y: number;

  constructor() {
    this.doc = new jsPDF({ unit: "mm", format: "a4" });
    this.y = 0;
  }

  private ensure(height: number) {
    if (this.y + height > PAGE_H - MARGIN) {
      this.doc.addPage();
      this.y = MARGIN;
    }
  }

  sectionHeader(code: string, title: string) {
    this.ensure(16);
    this.y += 7;
    this.doc.setFillColor(...GOLD);
    this.doc.rect(MARGIN, this.y - 5, 2.2, 8, "F");
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(11.5);
    this.doc.setTextColor(...INK);
    this.doc.text(`${code}.  ${title.toUpperCase()}`, MARGIN + 5, this.y);
    this.doc.setDrawColor(...INK);
    this.doc.setLineWidth(0.4);
    this.doc.line(MARGIN, this.y + 2, PAGE_W - MARGIN, this.y + 2);
    this.y += 9;
  }

  /** A labelled field — either a blank line, or a filled value on a line. */
  field(field: PdfField, value?: string, x?: number, width?: number) {
    const left = x ?? MARGIN;
    const w = width ?? (field.span === "half" ? COL_W : CONTENT_W);
    const text = (value ?? "").trim();

    this.ensure(14);

    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(7.6);
    this.doc.setTextColor(...GRAY);
    this.doc.text(field.label.toUpperCase(), left, this.y);

    const lineY = this.y + 4.6;
    this.doc.setDrawColor(...(text ? INK : FAINT));
    this.doc.setLineWidth(0.3);
    this.doc.line(left, lineY, left + w, lineY);

    if (text) {
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(9.5);
      this.doc.setTextColor(...INK);
      const clipped = text.length > 58 ? `${text.slice(0, 57)}...` : text;
      this.doc.text(clipped, left, lineY - 1.1);
    }

    this.y = lineY + 6.4;
  }

  /** A labelled box area (for long text). */
  box(field: PdfField, value?: string, height = 26) {
    const text = (value ?? "").trim();
    this.ensure(height + 10);

    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(7.6);
    this.doc.setTextColor(...GRAY);
    this.doc.text(field.label.toUpperCase(), MARGIN, this.y);

    const top = this.y + 2.4;
    this.doc.setDrawColor(...(text ? INK : FAINT));
    this.doc.setLineWidth(0.3);
    this.doc.rect(MARGIN, top, CONTENT_W, height);

    if (text) {
      this.doc.setFont("helvetica", "normal");
      this.doc.setFontSize(9.5);
      this.doc.setTextColor(...INK);
      const lines = this.doc.splitTextToSize(text, CONTENT_W - 8) as string[];
      const maxLines = Math.max(1, Math.floor((height - 6) / 4.6));
      lines.slice(0, maxLines).forEach((line, i) => {
        this.doc.text(line, MARGIN + 4, top + 6 + i * 4.6);
      });
    }

    this.y = top + height + 6;
  }

  /** Wraps the full section field layout, honouring two-column spans. */
  renderFields(fields: PdfField[], values: AdmissionValues) {
    let i = 0;
    while (i < fields.length) {
      const field = fields[i];
      if (field.kind === "box") {
        this.box(field, values[field.key] as string);
        i += 1;
        continue;
      }
      if (field.span === "half") {
        const next = fields[i + 1];
        if (next && next.span === "half" && next.kind !== "box") {
          this.field(field, values[field.key] as string, MARGIN, COL_W);
          this.field(next, values[next.key] as string, MARGIN + COL_W + COL_GAP, COL_W);
          i += 2;
          continue;
        }
        this.field(field, values[field.key] as string);
        i += 1;
        continue;
      }
      this.field(field, values[field.key] as string);
      i += 1;
    }
  }
}

/* --------------------------------------------------------------------------
 * Public API
 * ------------------------------------------------------------------------ */

async function loadCrest(): Promise<string | null> {
  try {
    const res = await fetch("/assets/micologo.jpeg");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function header(doc: jsPDF, crest: string | null, refNumber?: string) {
  const pageW = PAGE_W;
  // black band
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, pageW, 30, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 30, pageW, 1.2, "F");

  if (crest) {
    try {
      doc.addImage(crest, "JPEG", MARGIN, 4.5, 21, 21);
    } catch {
      /* crest is decorative — skip on failure */
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text("THE MICO UNIVERSITY COLLEGE", crest ? MARGIN + 26 : MARGIN, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(242, 169, 0);
  doc.text("APPLICATION FOR ADMISSION", crest ? MARGIN + 26 : MARGIN, 19.5);

  if (refNumber) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(`REF: ${refNumber}`, pageW - MARGIN, 13, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(210, 210, 210);
    doc.text("COPY OF ONLINE SUBMISSION", pageW - MARGIN, 19.5, { align: "right" });
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY);
  doc.text(
    "Marescaux Road, Kingston 5, Jamaica  |  admissions@mico.edu.jm  |  +1 (876) 929-5226",
    MARGIN,
    36.5,
  );
}

export async function downloadBlankApplicationPdf() {
  const crest = await loadCrest();
  const f = new FormDoc();
  header(f.doc, crest);
  f.y = 42;

  f.doc.setFont("helvetica", "bold");
  f.doc.setFontSize(10);
  f.doc.setTextColor(...INK);
  f.doc.text(
    "Complete every section in block letters. Attach certified copies of transcripts and certificates.",
    MARGIN,
    f.y,
  );
  f.y += 8;

  for (const section of PDF_SECTIONS) {
    f.sectionHeader(section.code, section.title);
    f.renderFields(section.fields, EMPTY_ADMISSION_VALUES);
  }

  // Declaration
  f.sectionHeader("E", "Declaration");
  f.ensure(40);
  f.doc.setFont("helvetica", "normal");
  f.doc.setFontSize(9);
  f.doc.setTextColor(...INK);
  const decl = f.doc.splitTextToSize(
    "I declare that the information provided in this application is true and complete to the best of my knowledge. I understand that the submission of false information may result in the withdrawal of any offer of admission. I consent to The Mico University College processing my personal data for the purposes of assessing this application and, if admitted, for the administration of my studies.",
    CONTENT_W - 6,
  ) as string[];
  decl.forEach((line, i) => {
    f.doc.text(line, MARGIN + 3, f.y + i * 4.4);
  });
  f.y += decl.length * 4.4 + 10;

  f.doc.setDrawColor(...FAINT);
  f.doc.setLineWidth(0.3);
  f.doc.line(MARGIN, f.y, MARGIN + 70, f.y);
  f.doc.line(MARGIN + CONTENT_W - 55, f.y, MARGIN + CONTENT_W, f.y);
  f.doc.setFontSize(8);
  f.doc.setTextColor(...GRAY);
  f.doc.text("SIGNATURE", MARGIN, f.y + 4);
  f.doc.text("DATE", MARGIN + CONTENT_W - 55, f.y + 4);

  f.y += 12;
  f.doc.setFont("helvetica", "normal");
  f.doc.setFontSize(7.6);
  f.doc.setTextColor(...GRAY);
  f.doc.text(
    "Submit this completed form (with supporting documents) to the Admissions Office, or by email to admissions@mico.edu.jm. Applications are reviewed after the published deadlines.",
    MARGIN,
    f.y,
  );

  f.doc.save("mico-application-form.pdf");
}

export async function downloadApplicationPdf(values: AdmissionValues, refNumber?: string) {
  const crest = await loadCrest();
  const f = new FormDoc();
  header(f.doc, crest, refNumber);
  f.y = 42;

  f.doc.setFont("helvetica", "bold");
  f.doc.setFontSize(10);
  f.doc.setTextColor(...INK);
  f.doc.text(
    `Application for: ${values.programme || "Programme not specified"}`,
    MARGIN,
    f.y,
  );
  f.y += 4;

  for (const section of PDF_SECTIONS) {
    f.sectionHeader(section.code, section.title);
    f.renderFields(section.fields, values);
  }

  // Declaration
  f.sectionHeader("E", "Declaration");
  f.ensure(30);
  f.doc.setFont("helvetica", "normal");
  f.doc.setFontSize(9);
  f.doc.setTextColor(...INK);
  const decl = f.doc.splitTextToSize(
    values.declarationConfirmed
      ? "Declaration confirmed electronically. I declare that the information provided in this application is true and complete to the best of my knowledge."
      : "Declaration not yet confirmed.",
    CONTENT_W - 6,
  ) as string[];
  decl.forEach((line, i) => {
    f.doc.text(line, MARGIN, f.y + i * 4.4);
  });
  f.y += decl.length * 4.4 + 8;

  f.doc.setFont("helvetica", "normal");
  f.doc.setFontSize(8);
  f.doc.setTextColor(...GRAY);
  f.doc.text(`Submitted: ${new Date().toLocaleDateString("en-JM")}  (online)`, MARGIN, f.y);

  f.doc.save("mico-application-copy.pdf");
}
