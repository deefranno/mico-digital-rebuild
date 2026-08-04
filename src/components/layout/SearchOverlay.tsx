import { searchAll, type SearchResult } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const typeBadge: Record<SearchResult["type"], string> = {
  Programme: "Programme",
  News: "News",
  Event: "Event",
  Faculty: "Faculty",
  Page: "Page",
};

/**
 * Full-screen search dialog. `q` is shared with `/search?q=...` results.
 * Keyboard: Escape closes; Enter runs the full search.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const state = useAsyncData(() => searchAll(query));

  // Reset on open, focus the field
  useEffect(() => {
    if (open) {
      setQuery("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const results = state.data ?? [];
  const preview = results.slice(0, 6);

  function runSearch() {
    if (query.trim().length >= 2) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the Mico website"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mx-auto mt-24 w-full max-w-3xl px-5">
        <div className="bg-white shadow-2xl">
          <form
            className="flex items-center gap-3 border-b border-black/10 px-5 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              runSearch();
            }}
          >
            <Search aria-hidden="true" className="size-5 shrink-0 text-mico-mid" />
            <label htmlFor="search-overlay-input" className="sr-only">
              Search programmes, news, events and more
            </label>
            <input
              ref={inputRef}
              id="search-overlay-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programmes, news, events…"
              autoComplete="off"
              className="w-full bg-transparent py-2 font-display text-lg text-black placeholder:text-mico-mid/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="rounded-sm p-2 text-mico-mid transition-colors hover:bg-mico-light hover:text-black"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </form>

          <div className="max-h-[50vh] overflow-y-auto p-2">
            {query.trim().length < 2 ? (
              <p className="px-4 py-8 text-center text-sm text-mico-mid">
                Type at least two characters to search the site.
              </p>
            ) : state.status === "loading" ? (
              <p className="px-4 py-8 text-center text-sm text-mico-mid">Searching…</p>
            ) : results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-mico-mid">
                No results for “{query}”.
              </p>
            ) : (
              <ul className="divide-y divide-black/5">
                {preview.map((result) => (
                  <li key={`${result.type}-${result.href}`}>
                    <Link
                      to={result.href}
                      onClick={onClose}
                      className="flex items-start gap-3 rounded-sm px-4 py-3 transition-colors hover:bg-mico-light"
                    >
                      <span className="mt-0.5 shrink-0 rounded-sm border border-mico-gold/60 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-mico-gold-deep">
                        {typeBadge[result.type]}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-black">
                          {result.title}
                        </span>
                        {result.category && (
                          <span className="mt-0.5 block text-xs text-mico-mid">
                            {result.category}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-black/10 bg-mico-light px-5 py-3 text-xs text-mico-mid">
            <span>
              {results.length > 0
                ? `${results.length} result${results.length === 1 ? "" : "s"} found`
                : "Enter to see all results"}
            </span>
            <button
              type="button"
              onClick={runSearch}
              className="inline-flex items-center gap-1 font-semibold text-black transition-colors hover:text-mico-gold-deep"
            >
              View all results
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
