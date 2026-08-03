/**
 * WordPress headless client (REST API + WPGraphQL).
 *
 * Configure via environment variables (see `.env.example`):
 *
 *   VITE_WORDPRESS_API_URL        — REST base, e.g. https://site.test/wp-json
 *   VITE_WORDPRESS_GRAPHQL_URL    — GraphQL endpoint, e.g. https://site.test/graphql
 *   VITE_WORDPRESS_APPLICATION_PASSWORD — optional bearer token for the REST API
 *
 * When no URL is configured the content service layer stays on local mock
 * data, so the site runs without WordPress.
 */

const REST_BASE =
  (import.meta.env.VITE_WORDPRESS_API_URL as string | undefined)?.replace(
    /\/$/,
    "",
  ) ?? "";

const GRAPHQL_URL =
  (import.meta.env.VITE_WORDPRESS_GRAPHQL_URL as string | undefined)?.replace(
    /\/$/,
    "",
  ) ?? "";

const APPLICATION_PASSWORD =
  (import.meta.env.VITE_WORDPRESS_APPLICATION_PASSWORD as string | undefined) ??
  "";

export function isWordPressConfigured(): boolean {
  return Boolean(REST_BASE || GRAPHQL_URL);
}

export function getRestBase(): string {
  return REST_BASE;
}

export function getGraphQlUrl(): string {
  return GRAPHQL_URL;
}

function authHeaders(): Record<string, string> {
  return APPLICATION_PASSWORD
    ? { Authorization: `Basic ${btoa(`app:${APPLICATION_PASSWORD}`)}` }
    : {};
}

/** Low-level REST fetch. Throws on non-OK responses. */
export async function fetchRest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = `${REST_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(init.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`WordPress REST request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

/** Low-level GraphQL fetch. Throws on errors in the response. */
export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!GRAPHQL_URL) {
    throw new Error("VITE_WORDPRESS_GRAPHQL_URL is not configured.");
  }
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    throw new Error(`WPGraphQL request failed: ${response.status} ${response.statusText}`);
  }
  const body = (await response.json()) as { data?: T; errors?: { message: string }[] };
  if (body.errors?.length) {
    throw new Error(body.errors.map((e) => e.message).join("; "));
  }
  return body.data as T;
}
