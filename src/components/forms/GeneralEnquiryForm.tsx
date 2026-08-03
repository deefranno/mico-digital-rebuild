import {
  SelectField,
  TextAreaField,
  TextField,
  emailPattern,
} from "@/components/shared/FormField";
import { submitGeneralEnquiry } from "@/lib/forms";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const subjects = [
  "Admissions and applications",
  "Programmes and courses",
  "Fees and scholarships",
  "Student services",
  "Campus visit",
  "Media and partnerships",
  "Other",
];

interface Values {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** General enquiry form (contact page). */
export function GeneralEnquiryForm() {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    subject: "",
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
    if (!values.subject) next.subject = "Please choose a subject.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    else if (values.message.trim().length < 10)
      next.message = "Please enter at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const result = await submitGeneralEnquiry({
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject,
      message: values.message.trim(),
    });
    setStatus(result.ok ? "done" : "idle");
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-mico-gold/60 bg-mico-gold-soft p-8 text-center">
        <p className="font-display text-lg font-bold text-black">Message received</p>
        <p className="mt-2 text-sm text-mico-dark">
          Thank you for contacting Mico (placeholder). We will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="ge-name"
          label="Full name"
          required
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
        />
        <TextField
          id="ge-email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>
      <SelectField
        id="ge-subject"
        label="Subject"
        required
        options={subjects}
        value={values.subject}
        onChange={set("subject")}
        error={errors.subject}
      />
      <TextAreaField
        id="ge-message"
        label="Message"
        required
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        hint="Please include as much detail as you can."
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
          "Send Message"
        )}
      </button>
    </form>
  );
}
