import {
  SelectField,
  TextAreaField,
  TextField,
  emailPattern,
} from "@/components/shared/FormField";
import { submitCampusVisit } from "@/lib/forms";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const partySizes = ["1 person", "2–4 people", "5–10 people", "School or group (10+)"];

interface Values {
  name: string;
  email: string;
  preferredDate: string;
  partySize: string;
  message: string;
}

/** Campus visit request form (contact page). */
export function CampusVisitForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    preferredDate: "",
    partySize: "",
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
    if (!values.preferredDate) next.preferredDate = "Please choose a preferred date.";
    if (!values.partySize) next.partySize = "Please select your group size.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const result = await submitCampusVisit({
      name: values.name.trim(),
      email: values.email.trim(),
      preferredDate: values.preferredDate,
      partySize: values.partySize,
      message: values.message.trim() || undefined,
    });
    setStatus(result.ok ? "done" : "idle");
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-mico-gold/60 bg-mico-gold-soft p-8 text-center">
        <p className="font-display text-lg font-bold text-black">Visit request received</p>
        <p className="mt-2 text-sm text-mico-dark">
          Thank you — the Office of Student Affairs will confirm your campus
          visit (placeholder).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="cv-name"
          label="Full name"
          required
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
        />
        <TextField
          id="cv-email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="cv-date"
          label="Preferred date"
          type="date"
          required
          value={values.preferredDate}
          onChange={set("preferredDate")}
          error={errors.preferredDate}
        />
        <SelectField
          id="cv-size"
          label="Group size"
          required
          options={partySizes}
          value={values.partySize}
          onChange={set("partySize")}
          error={errors.partySize}
        />
      </div>
      <TextAreaField
        id="cv-message"
        label="Anything we should know? (optional)"
        value={values.message}
        onChange={set("message")}
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
          "Request a Visit"
        )}
      </button>
    </form>
  );
}
