/**
 * Reusable presentational primitives for the admission wizard:
 * single checkboxes, multi-select chip groups, repeatable rows,
 * and file-upload rows. Kept deliberately small — field layout and
 * wiring live in the step components.
 */
import { cn } from "@/lib/utils";
import { Loader2, Plus, Upload, X } from "lucide-react";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
 * Single boolean checkbox (with custom gold checkmark)
 * ------------------------------------------------------------------------ */

export function CheckboxField({
  label,
  description,
  checked,
  onChange,
  error,
  required,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 inline-flex size-5 shrink-0">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={error ? true : undefined}
            className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
          />
          <span
            aria-hidden="true"
            className={cn(
              "flex size-5 items-center justify-center rounded-sm border text-xs font-bold transition-colors",
              checked
                ? "border-mico-gold bg-mico-gold text-black"
                : "border-black/25 bg-white",
            )}
          >
            {checked ? "✓" : ""}
          </span>
        </span>
        <span className="text-sm leading-relaxed text-mico-dark">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-mico-gold-deep">
              *
            </span>
          )}
          {description ? (
            <span className="block text-xs text-mico-mid">{description}</span>
          ) : null}
        </span>
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Multi-select chip group (checkboxes as toggleable chips)
 * ------------------------------------------------------------------------ */

export function ChipGroup({
  label,
  options,
  value,
  onChange,
  error,
  required,
  hint,
}: {
  label: string;
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  error?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-semibold text-black">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-mico-gold-deep">
            *
          </span>
        )}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() =>
                onChange(
                  active
                    ? value.filter((v) => v !== option)
                    : [...value, option],
                )
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-mico-gold bg-mico-gold text-black"
                  : "border-black/20 bg-white text-mico-dark hover:border-black",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border text-[0.6rem] font-bold",
                  active
                    ? "border-black/30 bg-black/10 text-black"
                    : "border-black/20 text-transparent",
                )}
              >
                ✓
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-mico-mid">{hint}</p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Repeatable rows (add / remove)
 * ------------------------------------------------------------------------ */

export function RowsEditor<T>({
  label,
  description,
  newRow,
  value,
  onChange,
  renderRow,
}: {
  label: string;
  description?: string;
  newRow: () => T;
  value: T[];
  onChange: (rows: T[]) => void;
  renderRow: (
    row: T,
    updateRow: (next: T) => void,
    removeRow: () => void,
    index: number,
  ) => ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-bold text-black">{label}</h4>
        {description ? (
          <p className="mt-0.5 text-xs text-mico-mid">{description}</p>
        ) : null}
      </div>

      {value.length === 0 ? (
        <p className="rounded-sm border border-dashed border-black/15 bg-mico-light px-4 py-3 text-sm text-mico-mid">
          No entries yet.
        </p>
      ) : (
        value.map((row, index) => (
          <div
            key={index}
            className="relative rounded-sm border border-black/10 bg-mico-light p-4 pt-9"
          >
            <span className="absolute left-4 top-3 text-[0.7rem] font-semibold uppercase tracking-widest text-mico-mid">
              {label} {index + 1}
            </span>
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== index))}
              aria-label={`Remove ${label} ${index + 1}`}
              className="absolute right-3 top-2.5 inline-flex size-7 items-center justify-center rounded-sm border border-black/10 bg-white text-mico-mid transition-colors hover:border-red-600 hover:text-red-700"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
            <div className="grid gap-4 sm:grid-cols-2">
              {renderRow(
                row,
                (next) =>
                  onChange(value.map((r, j) => (j === index ? next : r))),
                () => onChange(value.filter((_, j) => j !== index)),
                index,
              )}
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={() => onChange([...value, newRow()])}
        className="inline-flex items-center gap-2 rounded-sm border border-dashed border-mico-gold-deep/60 bg-mico-gold-soft/50 px-4 py-2.5 text-sm font-semibold text-mico-gold-deep transition-colors hover:border-mico-gold-deep hover:bg-mico-gold-soft"
      >
        <Plus aria-hidden="true" className="size-4" />
        Add {label.toLowerCase()}
      </button>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * File upload row (drop-style label + hidden input)
 * ------------------------------------------------------------------------ */

export function FileInput({
  id,
  label,
  description,
  accept,
  multiple,
  uploading,
  onFiles,
  error,
  required,
}: {
  id: string;
  label: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  uploading?: boolean;
  onFiles: (files: FileList | null) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer flex-col items-start gap-1 border border-dashed px-4 py-4 transition-colors",
          uploading
            ? "border-mico-gold bg-mico-gold-soft/40"
            : "border-black/25 bg-white hover:border-black",
        )}
      >
        <span className="text-sm font-semibold text-black">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-mico-gold-deep">
              *
            </span>
          )}
        </span>
        {description ? (
          <span className="text-xs text-mico-mid">{description}</span>
        ) : null}
        <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-mico-gold-deep">
          {uploading ? (
            <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
          ) : (
            <Upload aria-hidden="true" className="size-3.5" />
          )}
          {uploading ? "Uploading…" : multiple ? "Choose files" : "Choose file"}
        </span>
        <input
          id={id}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={uploading}
          className="sr-only"
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
