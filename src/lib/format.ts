/** Small formatting helpers. */

const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** "14 July 2026" */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return longDate.format(d);
}

/** "14 Jul 2026" */
export function formatDateShort(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return shortDate.format(d);
}

/** { day: "14", month: "JUL", monthLong: "July", year: "2026" } for event date blocks */
export function eventDateParts(iso: string): {
  day: string;
  month: string;
  monthLong: string;
  year: string;
} {
  const d = new Date(`${iso}T00:00:00`);
  const day = new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat("en-GB", { month: "short" })
    .format(d)
    .toUpperCase();
  const monthLong = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(d);
  const year = new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(d);
  return { day, month, monthLong, year };
}
