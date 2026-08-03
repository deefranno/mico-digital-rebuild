import { useEffect, useRef, useState } from "react";

export type AsyncStatus = "loading" | "success" | "error";

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
}

const initial = { status: "loading", data: null, error: null } as const;

/**
 * Runs an async content getter (see `src/lib/content/content.ts`) and
 * exposes loading / success / error states so components render the same
 * skeletons and error panels whether the data comes from local mock files or
 * a future WordPress endpoint.
 *
 * Pass `deps` to re-run when inputs change (e.g. a search query). Because the
 * fetcher is captured in a ref, an inline arrow function is safe to pass.
 */
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>(initial);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let active = true;
    setState(initial);
    fetcherRef
      .current()
      .then((data) => {
        if (active) setState({ status: "success", data, error: null });
      })
      .catch((err: unknown) => {
        if (active) {
          setState({
            status: "error",
            data: null,
            error:
              err instanceof Error
                ? err.message
                : "Content could not be loaded. Please try again.",
          });
        }
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
