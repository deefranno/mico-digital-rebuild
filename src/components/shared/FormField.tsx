import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const controlBase =
  "w-full rounded-sm border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder:text-mico-mid/60 transition-colors focus:border-mico-gold focus:outline-none focus:ring-2 focus:ring-mico-gold/30";

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
      {children}
    </p>
  );
}

function HintText({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-1.5 text-xs text-mico-mid">
      {children}
    </p>
  );
}

interface FieldRender {
  describedBy?: string;
  error?: string;
}

interface FieldShellProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: (render: FieldRender) => ReactNode;
}

function FieldShell({ label, id, required, error, hint, children }: FieldShellProps) {
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-black">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-mico-gold-deep">
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {children({ describedBy, error })}
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : hint ? <HintText id={`${id}-hint`}>{hint}</HintText> : null}
    </div>
  );
}

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  fieldClassName?: string;
}

export function TextField({
  label,
  id,
  error,
  hint,
  required,
  className,
  fieldClassName,
  ...props
}: TextFieldProps) {
  return (
    <FieldShell label={label} id={id} required={required} error={error} hint={hint}>
      {({ describedBy }: FieldRender) => (
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlBase, fieldClassName, error && "border-red-600", className)}
          {...props}
        />
      )}
    </FieldShell>
  );
}

export interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
}

export function TextAreaField({
  label,
  id,
  error,
  hint,
  required,
  className,
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldShell label={label} id={id} required={required} error={error} hint={hint}>
      {({ describedBy }: FieldRender) => (
        <textarea
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlBase, "min-h-32 resize-y", error && "border-red-600", className)}
          {...props}
        />
      )}
    </FieldShell>
  );
}

export interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: string[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

export function SelectField({
  label,
  id,
  options,
  placeholder = "Select an option",
  error,
  hint,
  required,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell label={label} id={id} required={required} error={error} hint={hint}>
      {({ describedBy }: FieldRender) => (
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(controlBase, "appearance-none pr-10", error && "border-red-600", className)}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}
