import { AlertTriangle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

/** Skeleton placeholders used while async content loads. */
export function LoadingState({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={cn("space-y-4", className)}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-sm border border-black/5 bg-mico-light"
        />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Friendly empty state for filtered lists and search. */
export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search terms.",
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-black/15 px-6 py-16 text-center",
        className,
      )}
    >
      <Inbox aria-hidden="true" className="size-8 text-mico-mid/50" />
      <h3 className="mt-4 font-display text-lg font-bold text-black">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-mico-mid">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Error state with retry. */
export function ErrorState({
  message = "Something went wrong while loading this content.",
  onRetry,
  className,
}: {
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center border border-black/15 bg-mico-light px-6 py-16 text-center",
        className,
      )}
    >
      <AlertTriangle aria-hidden="true" className="size-8 text-mico-gold-deep" />
      <h3 className="mt-4 font-display text-lg font-bold text-black">
        Unable to load content
      </h3>
      <p className="mt-1 max-w-md text-sm text-mico-mid">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-sm border border-black/25 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}
