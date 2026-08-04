import { submitNewsletter } from "@/lib/forms";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup — visual placeholder wired to `submitNewsletter`.
 * The form is fully accessible (labels, aria-invalid, live status region).
 */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!emailPattern.test(value)) {
      setError("Please enter a valid email address, e.g. name@example.com");
      return;
    }
    setError(null);
    setStatus("submitting");
    const result = await submitNewsletter({ email: value });
    if (result.ok) {
      setStatus("done");
      setEmail("");
    } else {
      setError(result.message);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <p
        role="status"
        className="rounded-sm border border-mico-gold/50 bg-mico-gold-soft px-4 py-3 text-sm text-mico-dark"
      >
        Thank you for subscribing — you will hear from Mico soon (placeholder).
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={cn("flex flex-col gap-2 sm:flex-row", compact && "sm:flex-col")}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="w-full flex-1 rounded-sm border border-white/25 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-mico-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-mico-gold px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-mico-gold-deep hover:text-white disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Subscribing…
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      {error && (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-mico-gold">
          {error}
        </p>
      )}
    </form>
  );
}
