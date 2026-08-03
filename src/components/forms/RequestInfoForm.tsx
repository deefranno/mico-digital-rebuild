import {
  SelectField,
  TextAreaField,
  TextField,
  emailPattern,
} from "@/components/shared/FormField";
import { submitRequestInformation } from "@/lib/forms";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const studyLevels = [
  "Undergraduate",
  "Graduate",
  "Certificate",
  "Professional Development",
  "Short Course",
];

interface RequestInfoFormProps {
  /** Prefilled programme (used on the programme detail page). */
  programmeTitle?: string;
  compact?: boolean;
}

interface Values {
  name: string;
  email: string;
  phone: string;
  programmeOfInterest: string;
  studyLevel: string;
  message: string;
}

/**
 * Request information / programme enquiry form. Validation is client-side
 * and accessible (aria-invalid + described-by); submission goes through
 * `submitRequestInformation` so it can be rewired to WordPress/HubSpot later.
 */
export function RequestInfoForm({
  programmeTitle,
  compact = false,
}: RequestInfoFormProps) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    programmeOfInterest: programmeTitle ?? "",
    studyLevel: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const set = (key: keyof Values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  function validate(): boolean {
    const next: Partial<Record<keyof Values, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!emailPattern.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (compact && !values.programmeOfInterest.trim())
      next.programmeOfInterest = "Please tell us which programme you are interested in.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const result = await submitRequestInformation({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      programmeOfInterest: values.programmeOfInterest.trim() || undefined,
      studyLevel: values.studyLevel || undefined,
      message: values.message.trim() || undefined,
    });
    setStatus(result.ok ? "done" : "idle");
    if (!result.ok) {
      setErrors({ email: result.message });
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="border border-mico-gold/60 bg-mico-gold-soft p-8 text-center"
      >
        <p className="font-display text-lg font-bold text-black">
          Thank you{values.name.trim() ? `, ${values.name.trim().split(" ")[0]}` : ""}!
        </p>
        <p className="mt-2 text-sm text-mico-dark">
          Your request has been received (placeholder). The Admissions Office
          will respond shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setValues({ name: "", email: "", phone: "", programmeOfInterest: programmeTitle ?? "", studyLevel: "", message: "" });
          }}
          className="mt-5 text-sm font-semibold text-mico-gold-deep underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <TextField
        id="ri-name"
        label="Full name"
        required
        autoComplete="name"
        value={values.name}
        onChange={set("name")}
        error={errors.name}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="ri-email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
        <TextField
          id="ri-phone"
          label="Telephone (optional)"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set("phone")}
        />
      </div>
      <TextField
        id="ri-programme"
        label="Programme of interest"
        required={compact}
        value={values.programmeOfInterest}
        onChange={set("programmeOfInterest")}
        error={errors.programmeOfInterest}
        hint="Leave blank if you are still exploring options."
      />
      <SelectField
        id="ri-level"
        label="Study level"
        options={studyLevels}
        placeholder="Select a study level"
        value={values.studyLevel}
        onChange={set("studyLevel")}
      />
      <TextAreaField
        id="ri-message"
        label="Message (optional)"
        value={values.message}
        onChange={set("message")}
        hint="Tell us anything that would help us assist you."
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-mico-gold px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-mico-gold-deep hover:text-white disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Request Information"
        )}
      </button>
      <p className="text-xs text-mico-mid">
        Placeholder form — submissions are simulated until a backend is connected.
      </p>
    </form>
  );
}
