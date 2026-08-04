/**
 * Multi-step admission application wizard.
 *
 * Splits the full A–J application into ten guided steps with a progress
 * stepper, per-step validation, repeatable rows and immediate document
 * uploads. The whole payload (see `src/types/application.ts`) is submitted
 * to Convex via `applications.submitApplication` — no account required.
 */
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  emptyAdmissionApplicationData,
  type AdmissionApplicationData,
} from "@/types/application";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  StepDocuments,
  StepEmergency,
  StepEmployment,
  StepFunding,
  StepProgramme,
  StepQualifications,
  StepReferees,
  StepReview,
} from "./admission/steps-b";
import {
  StepEducation,
  StepPersonal,
  STEPS_META,
} from "./admission/steps-a";
import { fid, stepIssues, toLegacyApplicationArgs, validateStep } from "./admission/wizard";

/** Components in the same order as STEPS_META. */
const STEP_COMPONENTS = [
  StepPersonal, // 0
  StepProgramme, // 1
  StepEmergency, // 2
  StepEducation, // 3
  StepQualifications, // 4
  StepEmployment, // 5
  StepReferees, // 6
  StepFunding, // 7
  StepDocuments, // 8
  StepReview, // 9
] as const;

export function AdmissionForm() {
  const submitApplication = useMutation(api.applications.submitApplication);

  const [data, setData] = useState<AdmissionApplicationData>(
    emptyAdmissionApplicationData,
  );
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [refNumber, setRefNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /** Live per-step issue flags — drives the Review checklist. */
  const issues = useMemo(() => stepIssues(data), [data]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Immutable patch + clear current-step errors (they re-appear on retry). */
  const update = (
    fn: (d: AdmissionApplicationData) => AdmissionApplicationData,
  ) => {
    setData(fn);
    setErrors({});
  };

  /** Backwards navigation only — forward movement is gated by validation. */
  function goToStep(next: number) {
    if (next < 0 || next >= STEPS_META.length) return;
    if (next > step) return;
    setStep(next);
    setErrors({});
    scrollToTop();
  }

  function handleContinue() {
    const nextErrors = validateStep(step, data);
    setErrors(nextErrors);
    const firstKey = Object.keys(nextErrors)[0];
    if (firstKey) {
      document.getElementById(fid(firstKey))?.focus();
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS_META.length - 1));
    scrollToTop();
  }

  async function handleSubmit() {
    if (issues.some(Boolean)) {
      setSubmitError(
        "Please complete the section(s) marked in the checklist above before submitting.",
      );
      return;
    }
    setStatus("submitting");
    setSubmitError(null);
    try {
      const result = await submitApplication(toLegacyApplicationArgs(data));
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
    setData(emptyAdmissionApplicationData());
    setErrors({});
    setStatus("idle");
    setRefNumber(null);
    setSubmitError(null);
    setStep(0);
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
          Thank you{data.firstName.trim() ? `, ${data.firstName.trim()}` : ""}.
          Your application for{" "}
          <span className="font-semibold text-black">
            {data.firstChoiceProgramme || "your chosen programme"}
          </span>{" "}
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
          <span className="font-semibold text-black">{data.email}</span>.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-sm border border-black/20 px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white"
        >
          Submit another application
        </button>
      </div>
    );
  }

  /* ----- Wizard state -------------------------------------------------- */
  const ActiveStep = STEP_COMPONENTS[step];
  const isLastStep = step === STEPS_META.length - 1;

  return (
    <div className="border border-black/10 bg-white">
      {/* Stepper header */}
      <div className="border-b border-black/10 px-6 pb-6 pt-7 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mico-mid">
              Step {step + 1} of {STEPS_META.length}
            </p>
            <h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-black sm:text-2xl">
              {STEPS_META[step].title}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-mico-mid">
              {STEPS_META[step].blurb}
            </p>
          </div>
          <span className="hidden shrink-0 items-center gap-2 rounded-sm border border-black/10 bg-mico-light px-3 py-1.5 text-xs font-semibold text-mico-mid sm:inline-flex">
            <span className="size-1.5 rounded-full bg-mico-gold" />
            No account needed
          </span>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden bg-black/10">
          <div
            className="h-full bg-mico-gold transition-all duration-500"
            style={{
              width: `${((step + 1) / STEPS_META.length) * 100}%`,
            }}
          />
        </div>

        <ol className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {STEPS_META.map((s, i) => {
            const isDone = i < step;
            const isCurrent = i === step;
            return (
              <li key={s.title} className="shrink-0">
                <button
                  type="button"
                  onClick={() => i <= step && goToStep(i)}
                  disabled={i > step}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    isCurrent
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-white text-mico-mid",
                    !isDone && !isCurrent && "cursor-not-allowed opacity-50",
                    isDone &&
                      "hover:border-black hover:text-black",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full text-[0.65rem] font-bold",
                      isCurrent
                        ? "bg-mico-gold text-black"
                        : isDone
                          ? "bg-mico-gold/80 text-black"
                          : "bg-black/10 text-mico-mid",
                    )}
                  >
                    {isDone ? <Check className="size-3" /> : i + 1}
                  </span>
                  <span className="hidden md:inline">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Active step */}
      <div className="px-6 py-8 sm:px-8">
        {step === STEPS_META.length - 1 ? (
          <StepReview
            data={data}
            update={update}
            errors={errors}
            stepIssues={issues}
            onJump={goToStep}
          />
        ) : (
          <ActiveStep data={data} update={update} errors={errors} />
        )}
      </div>

      {submitError ? (
        <div className="px-6 sm:px-8">
          <div
            role="alert"
            className="border border-red-600 bg-red-50 p-4 text-sm font-medium text-red-700"
          >
            {submitError}
          </div>
        </div>
      ) : null}

      {/* Nav buttons */}
      <div className="flex flex-col-reverse gap-4 border-t border-black/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-black/20 px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-black hover:text-white disabled:opacity-60"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back
          </button>
        ) : (
          <span />
        )}

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <p className="flex items-center justify-center gap-2 text-xs text-mico-mid sm:justify-start">
            <ShieldCheck
              aria-hidden="true"
              className="size-4 text-mico-gold-deep"
            />
            Stored securely & used only for admissions.
          </p>
          {isLastStep ? (
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-mico-gold px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-mico-gold-deep hover:text-white disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit application
                  <ArrowRight aria-hidden="true" className="size-4" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleContinue}
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-mico-gold px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-mico-gold-deep hover:text-white disabled:opacity-60"
            >
              Continue
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
