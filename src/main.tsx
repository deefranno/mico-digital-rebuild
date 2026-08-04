import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router";
import { AppRoutes } from "./app/router";
import "./index.css";

/** Simple loading fallback for route transitions. */
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading…</div>
    </div>
  );
}

/** Silent error boundary — if VlyToolbar crashes it renders nothing instead of
 *  crashing the whole app (e.g. hook errors in WebContainer environment). */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[WebContainer preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * The Convex backend URL is baked in at build time by Vite. It is provided by
 * the host environment (e.g. a `.env.local`, or an env var set on the hosting
 * platform) — never committed to the repo. Creating the client with an empty
 * URL throws at module load, which used to blank the entire page before React
 * could render anything. We build it only when present, and render an
 * actionable message otherwise.
 */
const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const convex: ConvexReactClient | null = convexUrl
  ? new ConvexReactClient(convexUrl)
  : null;

/** "Convex backend not configured" screen — shown instead of a silent blank
 *  page when the build was created without VITE_CONVEX_URL. */
function MissingConvexConfig() {
  const looksLikeLocalDev =
    typeof convexUrl === "string" &&
    /^https?:\/\/(localhost|127\.0\.0\.1)\b/.test(convexUrl);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold">Convex backend not configured</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {convexUrl
            ? "This build is pointing at a local development Convex server, which visitors' browsers cannot reach."
            : "This build was created without the VITE_CONVEX_URL environment variable, so the app has no backend to connect to."}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Set <code className="rounded border border-border/60 px-1 py-0.5">VITE_CONVEX_URL</code> to
          your Convex deployment URL (from the Convex dashboard, e.g.
          https://&lt;slug&gt;.convex.cloud) on your hosting platform — Vercel:
          Project → Settings → Environment Variables — then rebuild and redeploy.
        </p>
        {looksLikeLocalDev && (
          <p className="mt-2 text-xs text-muted-foreground">
            Tip: a URL like http://127.0.0.1:3210 only works on the machine
            running the Convex dev server — use the cloud deployment URL in
            production.
          </p>
        )}
      </div>
    </div>
  );
}

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

/** App shell — requires a Convex client; renders a config screen otherwise. */
function Root() {
  if (!convex) {
    return <MissingConvexConfig />;
  }
  return (
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <RouteSyncer />
        <Suspense fallback={<RouteLoading />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </ConvexAuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      <Root />
    </RootErrorBoundary>
  </StrictMode>,
);
