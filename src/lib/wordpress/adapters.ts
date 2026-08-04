/**
 * Adapters — map WordPress payloads onto the application types in
 * `src/types`. Each adapter has a REST and a GraphQL path plus a graceful
 * fallback to the local mock data when a request fails.
 *
 * These functions are consumed by `src/lib/content/content.ts` and are only
 * called when WordPress is configured.
 */
import { events as mockEvents } from "@/data/events";
import {
  footerColumns as mockFooterColumns,
  mainNavigation as mockMainNavigation,
  utilityLinks as mockUtilityLinks,
} from "@/data/site";
import { faculties as mockFaculties } from "@/data/faculties";
import { newsArticles as mockNews } from "@/data/news";
import { programmes as mockProgrammes } from "@/data/programmes";
import type {
  AcademicProgramme,
  CalendarEvent,
  CmsBlock,
  CmsButtonLink,
  CmsPage,
  Faculty,
  FooterColumn,
  LinkItem,
  NavigationItem,
  NewsArticle,
  UtilityLink,
} from "@/types";

import { fetchGraphQL, fetchRest, getGraphQlUrl, getRestBase } from "./client";
import { GRAPHQL_QUERIES, REST_PATHS } from "./queries";
import type {
  WPGraphQLEvent,
  WPGraphQLMenu,
  WPGraphQLMenuItem,
  WPGraphQLNews,
  WPGraphQLPage,
  WPGraphQLProgramme,
  WPRestEvent,
  WPRestMenu,
  WPRestMenuItem,
  WPRestNews,
  WPRestPage,
  WPRestProgramme,
} from "./types";

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* --------------------------------------------------------------------------
 * News
 * ------------------------------------------------------------------------ */

function fromRestNews(raw: WPRestNews): NewsArticle {
  return {
    id: String(raw.id),
    slug: raw.slug,
    title: raw.title.rendered,
    excerpt: stripHtml(raw.excerpt.rendered),
    content: raw.content.rendered,
    date: raw.date,
    author: raw.meta?.author_name as string | undefined,
    category: (raw.meta?.category as string) ?? "News",
    featuredImage: raw.meta?.featured_image
      ? {
          src: raw.meta.featured_image as string,
          alt: (raw.meta?.featured_image_alt as string) ?? raw.title.rendered,
        }
      : undefined,
  };
}

function fromGraphQlNews(raw: WPGraphQLNews): NewsArticle {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: stripHtml(raw.excerpt),
    content: raw.content,
    date: raw.date,
    author: raw.author?.node?.name,
    category: raw.newsCategory?.nodes?.[0]?.name ?? "News",
    featuredImage: raw.featuredImage?.node
      ? {
          src: raw.featuredImage.node.sourceUrl,
          alt: raw.featuredImage.node.altText || raw.title,
        }
      : undefined,
  };
}

export async function getNewsFromWordPress(): Promise<NewsArticle[]> {
  try {
    if (getGraphQlUrl()) {
      const data = await fetchGraphQL<{ news: { nodes: WPGraphQLNews[] } }>(
        GRAPHQL_QUERIES.NEWS,
        { first: 50 },
      );
      if (data?.news?.nodes?.length) return data.news.nodes.map(fromGraphQlNews);
    }
    const list = await fetchRest<WPRestNews[]>(REST_PATHS.news, {
      cache: "force-cache",
    });
    if (list.length) return list.map(fromRestNews);
  } catch (err) {
    console.warn("[content] WordPress news unavailable, using mock data:", err);
  }
  return mockNews;
}

/* --------------------------------------------------------------------------
 * Events
 * ------------------------------------------------------------------------ */

function fromRestEvent(raw: WPRestEvent): CalendarEvent {
  const acf = raw.acf ?? {};
  return {
    id: String(raw.id),
    slug: raw.slug,
    title: raw.title.rendered,
    description: stripHtml(raw.excerpt.rendered || raw.content.rendered),
    startDate: (acf.start_date as string) ?? raw.date.slice(0, 10),
    endDate: acf.end_date as string | undefined,
    time: (acf.time as string) ?? "",
    location: (acf.location as string) ?? "Mico College Campus, Kingston",
    category: (acf.event_category as string) ?? "Events",
    status: "upcoming",
  };
}

function fromGraphQlEvent(raw: WPGraphQLEvent): CalendarEvent {
  const details = raw.eventDetails ?? {};
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: stripHtml(raw.excerpt || raw.content),
    startDate: details.startDate ?? raw.date.slice(0, 10),
    endDate: details.endDate,
    time: details.time ?? "",
    location: details.location ?? "Mico College Campus, Kingston",
    category: details.category ?? "Events",
    image: raw.featuredImage?.node
      ? { src: raw.featuredImage.node.sourceUrl, alt: raw.featuredImage.node.altText }
      : undefined,
    status: "upcoming",
  };
}

export async function getEventsFromWordPress(): Promise<CalendarEvent[]> {
  try {
    if (getGraphQlUrl()) {
      const data = await fetchGraphQL<{ events: { nodes: WPGraphQLEvent[] } }>(
        GRAPHQL_QUERIES.EVENTS,
        { first: 50 },
      );
      if (data?.events?.nodes?.length) return data.events.nodes.map(fromGraphQlEvent);
    }
    const list = await fetchRest<WPRestEvent[]>(REST_PATHS.events, {
      cache: "force-cache",
    });
    if (list.length) return list.map(fromRestEvent);
  } catch (err) {
    console.warn("[content] WordPress events unavailable, using mock data:", err);
  }
  return mockEvents;
}

/* --------------------------------------------------------------------------
 * Programmes
 * ------------------------------------------------------------------------ */

function fromRestProgramme(raw: WPRestProgramme): AcademicProgramme {
  const acf = raw.acf ?? {};
  return {
    id: String(raw.id),
    slug: raw.slug,
    title: raw.title.rendered,
    awardType: (acf.award_type as string) ?? "Award",
    faculty: (acf.faculty as string) ?? "Faculty",
    duration: (acf.duration as string) ?? "To be confirmed",
    studyMode: ((acf.study_mode as string[]) ?? ["Full-time"]) as AcademicProgramme["studyMode"],
    campus: (acf.campus as string) ?? "Mico College Campus, Kingston",
    level: (acf.level as AcademicProgramme["level"]) ?? "Undergraduate",
    subjectArea: (acf.subject_area as string) ?? "Education & Teaching",
    overview: stripHtml(raw.excerpt.rendered || raw.content.rendered),
    entryRequirements: (acf.entry_requirements as string[]) ?? [],
    courseStructure: (acf.course_structure as AcademicProgramme["courseStructure"]) ?? [],
    careerOpportunities: (acf.career_opportunities as string[]) ?? [],
    fees: {
      note: (acf.fees_note as string) ?? "Fees to be confirmed.",
    },
    applicationDeadlines:
      (acf.application_deadlines as AcademicProgramme["applicationDeadlines"]) ?? [],
  };
}

function fromGraphQlProgramme(raw: WPGraphQLProgramme): AcademicProgramme {
  const details = raw.programmeDetails ?? {};
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    awardType: details.awardType ?? "Award",
    faculty: details.faculty ?? "Faculty",
    duration: details.duration ?? "To be confirmed",
    studyMode: (details.studyMode ?? ["Full-time"]) as AcademicProgramme["studyMode"],
    campus: details.campus ?? "Mico College Campus, Kingston",
    level: (details.level ?? "Undergraduate") as AcademicProgramme["level"],
    subjectArea: details.subjectArea ?? "Education & Teaching",
    overview: stripHtml(raw.excerpt || raw.content),
    entryRequirements: [],
    courseStructure: [],
    careerOpportunities: [],
    fees: { note: "Fees to be confirmed." },
    applicationDeadlines: [],
    image: raw.featuredImage?.node
      ? { src: raw.featuredImage.node.sourceUrl, alt: raw.featuredImage.node.altText }
      : undefined,
  };
}

export async function getProgrammesFromWordPress(): Promise<AcademicProgramme[]> {
  try {
    if (getGraphQlUrl()) {
      const data = await fetchGraphQL<{
        programmes: { nodes: WPGraphQLProgramme[] };
      }>(GRAPHQL_QUERIES.PROGRAMMES, { first: 50 });
      if (data?.programmes?.nodes?.length) {
        return data.programmes.nodes.map(fromGraphQlProgramme);
      }
    }
    const list = await fetchRest<WPRestProgramme[]>(REST_PATHS.programmes, {
      cache: "force-cache",
    });
    if (list.length) return list.map(fromRestProgramme);
  } catch (err) {
    console.warn("[content] WordPress programmes unavailable, using mock data:", err);
  }
  return mockProgrammes;
}

/* --------------------------------------------------------------------------
 * Faculties
 * ------------------------------------------------------------------------ */

export async function getFacultiesFromWordPress(): Promise<Faculty[]> {
  // Faculties map naturally to the mock data until a WordPress source is ready.
  try {
    const list = await fetchRest<WPRestPostLike[]>(REST_PATHS.faculties, {
      cache: "force-cache",
    });
    if (list.length) {
      return list.map((raw) => ({
        id: String(raw.id),
        slug: raw.slug,
        name: raw.title.rendered,
        description: stripHtml(raw.excerpt.rendered || raw.content.rendered),
        departments: [],
        link: `/faculties#${raw.slug}`,
      }));
    }
  } catch (err) {
    console.warn("[content] WordPress faculties unavailable, using mock data:", err);
  }
  return mockFaculties;
}

type WPRestPostLike = { id: number; slug: string; title: { rendered: string }; excerpt: { rendered: string }; content: { rendered: string } };

/* --------------------------------------------------------------------------
 * Menus & navigation (wp-admin Appearance > Menus)
 * ------------------------------------------------------------------------ */

/** Names we look for when choosing which wp-admin menu feeds which region. */
const MENU_CANDIDATES = {
  main: ["Main Navigation", "Main", "Primary", "Header"],
  utility: ["Utility Links", "Utility", "Top Bar", "Secondary"],
  footer: ["Footer", "Footer Navigation", "Footer Links", "Footer Menu"],
} as const;

type MenuKind = keyof typeof MENU_CANDIDATES;

/**
 * Convert a WordPress menu-item URL into an app href. Links that resolve to
 * this site (same origin as the app or the configured WordPress host) become
 * relative SPA paths; genuinely external links stay absolute so the UI can
 * render them as <a target="_blank">.
 */
function normalizeHref(url: string): string {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) {
    try {
      const parsed = new URL(url);
      const knownOrigins = [getRestBase(), getGraphQlUrl()]
        .filter(Boolean)
        .map((u) => {
          try {
            return new URL(u).origin;
          } catch {
            return null;
          }
        })
        .filter((o): o is string => Boolean(o));
      const isSiteLink =
        parsed.origin === window.location.origin ||
        knownOrigins.includes(parsed.origin);
      if (isSiteLink) return `${parsed.pathname}${parsed.hash}`;
      return url; // external link
    } catch {
      return url;
    }
  }
  return url.startsWith("/") ? url : `/${url}`;
}

/** Pick the best menu by name for a region, falling back to the first. */
function pickMenu<T extends { name: string; slug?: string }>(
  menus: T[],
  candidates: readonly string[],
): T | undefined {
  if (!menus.length) return undefined;
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const wanted = candidates.map(norm);
  return (
    menus.find((m) => wanted.includes(norm(m.name))) ??
    menus.find((m) => m.slug && wanted.includes(norm(m.slug))) ??
    menus[0]
  );
}

/** Build a nested NavigationItem tree from flat REST menu items. */
function menuTreeFromRest(items: WPRestMenuItem[]): NavigationItem[] {
  const sorted = [...items].sort((a, b) => a.menu_order - b.menu_order);
  const nodes = new Map<number, NavigationItem>();
  for (const item of sorted) {
    nodes.set(item.id, {
      label: stripHtml(item.title?.rendered || item.attr_title || "Link"),
      href: normalizeHref(item.url),
      description: item.description || undefined,
    });
  }
  const roots: NavigationItem[] = [];
  for (const item of sorted) {
    const node = nodes.get(item.id)!;
    if (item.parent && nodes.has(item.parent)) {
      const parent = nodes.get(item.parent)!;
      parent.children = parent.children ?? [];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

/** Build a nested NavigationItem tree from flat WPGraphQL menu items. */
function menuTreeFromGraphQl(items: WPGraphQLMenuItem[]): NavigationItem[] {
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const nodes = new Map<number, NavigationItem>();
  for (const item of sorted) {
    nodes.set(item.databaseId, {
      label: stripHtml(item.label),
      href: normalizeHref(item.url),
      description: item.description || undefined,
    });
  }
  const roots: NavigationItem[] = [];
  for (const item of sorted) {
    const node = nodes.get(item.databaseId)!;
    if (item.parentId && nodes.has(item.parentId)) {
      const parent = nodes.get(item.parentId)!;
      parent.children = parent.children ?? [];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

/**
 * Fetch the nested tree for one menu region (main / utility / footer) from
 * WordPress, returning null so the caller falls back to mock data.
 */
async function getMenuTreeFromWordPress(kind: MenuKind): Promise<NavigationItem[] | null> {
  try {
    if (getGraphQlUrl()) {
      const data = await fetchGraphQL<{ menus: { nodes: WPGraphQLMenu[] } }>(
        GRAPHQL_QUERIES.MENUS,
        { first: 50 },
      );
      const menus = data?.menus?.nodes ?? [];
      const menu = pickMenu(menus, MENU_CANDIDATES[kind]);
      const items = menu?.menuItems?.nodes ?? [];
      if (items.length) return menuTreeFromGraphQl(items);
    }
    const menus = await fetchRest<WPRestMenu[]>(REST_PATHS.menus, {
      cache: "force-cache",
    });
    const menu = pickMenu(menus, MENU_CANDIDATES[kind]);
    if (!menu) return null;
    const items = await fetchRest<WPRestMenuItem[]>(
      REST_PATHS.menuItemsForMenu(menu.id),
      { cache: "force-cache" },
    );
    if (!items.length) return null;
    return menuTreeFromRest(items);
  } catch (err) {
    console.warn(`[content] WordPress ${kind} menu unavailable, using mock data:`, err);
    return null;
  }
}

/** Main navigation (mega menu + mobile drawer). */
export async function getMainNavigationFromWordPress(): Promise<NavigationItem[]> {
  return (await getMenuTreeFromWordPress("main")) ?? mockMainNavigation;
}

/** Utility-bar links (black strip above the header). */
export async function getUtilityLinksFromWordPress(): Promise<UtilityLink[]> {
  const tree = await getMenuTreeFromWordPress("utility");
  if (!tree) return mockUtilityLinks;
  return tree.map(({ label, href }) => ({ label, href }));
}

/** Footer link columns (top-level items become column headings). */
export async function getFooterColumnsFromWordPress(): Promise<FooterColumn[]> {
  const tree = await getMenuTreeFromWordPress("footer");
  if (!tree) return mockFooterColumns;
  const columns: FooterColumn[] = [];
  for (const item of tree) {
    if (item.children?.length) {
      columns.push({
        heading: item.label,
        links: item.children.map(({ label, href }): LinkItem => ({ label, href })),
      });
    }
  }
  return columns.length ? columns : mockFooterColumns;
}

/* --------------------------------------------------------------------------
 * CMS pages (native WordPress Pages rendered by the catch-all route)
 *
 * WordPress page content arrives as rendered Gutenberg HTML. `parseBlocks`
 * converts that HTML into the structured `CmsBlock[]` the renderer knows how
 * to style; inline text keeps its (sanitised) HTML so links and emphasis made
 * in the editor survive. Unknown or exotic blocks are flattened or dropped
 * rather than breaking the page.
 * ------------------------------------------------------------------------ */

/** Normalise a route path for comparison ("/careers/", "careers" → "/careers"). */
export function normalizePagePath(path: string): string {
  let p = path.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "");
  try {
    p = decodeURIComponent(p);
  } catch {
    // keep raw path on malformed encoding
  }
  return p;
}

/**
 * Strip dangerous markup from inline WordPress content while preserving the
 * inline formatting editors produce (links, emphasis, code). External links
 * are forced to open in a new tab.
 */
function sanitizeInlineHtml(html: string): string {
  if (!html || typeof document === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const root = doc.body;
  root
    .querySelectorAll(
      "script,style,iframe,object,embed,form,input,textarea,select,noscript,link,meta,svg,video,audio,source",
    )
    .forEach((el) => el.remove());

  const allowedAttrs = new Set(["href", "src", "alt", "title", "target", "rel"]);
  root.querySelectorAll("*").forEach((el) => {
    if (el.tagName === "A") {
      const href = el.getAttribute("href") ?? "";
      if (/^https?:\/\//i.test(href)) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.toLowerCase().startsWith("on") || !allowedAttrs.has(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });
  });
  return root.innerHTML;
}

function parseTable(table: HTMLTableElement): CmsBlock {
  let headers: string[] = [];
  let rows: string[][] = [];

  const head = table.querySelector("thead");
  const headRow = head?.querySelector("tr");
  if (headRow) {
    headers = Array.from(headRow.children).map((c) => c.textContent?.trim() ?? "");
  }

  const body = table.querySelector("tbody");
  if (body) {
    const trs = Array.from(body.querySelectorAll("tr"));
    const parsed = trs.map((tr) =>
      Array.from(tr.children).map((c) => c.textContent?.trim() ?? ""),
    );
    if (!headers.length && parsed.length) {
      headers = parsed[0];
      rows = parsed.slice(1);
    } else {
      rows = parsed;
    }
  }

  return { type: "table", headers, rows };
}

/** Convert one DOM node (and its children) into CmsBlocks, appended to `blocks`. */
function collectBlocks(node: Node, blocks: CmsBlock[]): void {
  if (node.nodeType !== 1) return; // ignore text nodes / comments at this level
  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const cls = typeof el.className === "string" ? el.className : "";

  // Gutenberg buttons wrapper
  if (cls.includes("wp-block-buttons")) {
    const buttons: CmsButtonLink[] = [];
    el.querySelectorAll(".wp-block-button").forEach((btn) => {
      const a = btn.querySelector("a");
      if (!a) return;
      const label = stripHtml(a.innerHTML) || "Learn more";
      const href = normalizeHref(a.getAttribute("href") ?? "#");
      buttons.push({ label, href });
    });
    if (buttons.length) blocks.push({ type: "buttons", buttons });
    return;
  }

  // Images (bare or wrapped in figure / wp-block-image)
  if (tag === "figure" || cls.includes("wp-block-image")) {
    const img = el.querySelector("img");
    if (img) {
      blocks.push({
        type: "image",
        src: img.getAttribute("src") ?? "",
        alt: img.getAttribute("alt") ?? "",
        caption: el.querySelector("figcaption")?.textContent?.trim() || undefined,
      });
      return;
    }
    if (tag === "figure") {
      const table = el.querySelector("table");
      if (table) {
        blocks.push(parseTable(table));
        return;
      }
    }
  }

  // Tables
  if (tag === "table" || cls.includes("wp-block-table")) {
    const table = tag === "table" ? (el as HTMLTableElement) : el.querySelector("table");
    if (table) blocks.push(parseTable(table));
    return;
  }

  // Quotes
  if (tag === "blockquote") {
    const quoteText = sanitizeInlineHtml(
      el.querySelector("p")?.innerHTML ?? el.innerHTML,
    );
    const citation =
      el.querySelector("cite")?.textContent?.trim() ??
      el.querySelector("footer")?.textContent?.trim() ??
      undefined;
    blocks.push({ type: "quote", text: quoteText, citation });
    return;
  }

  // Lists
  if (tag === "ul" || tag === "ol") {
    const items = Array.from(el.querySelectorAll(":scope > li")).map((li) =>
      sanitizeInlineHtml(li.innerHTML),
    );
    if (items.length) blocks.push({ type: "list", ordered: tag === "ol", items });
    return;
  }

  // Headings
  if (/^h[1-6]$/.test(tag)) {
    const text = sanitizeInlineHtml(el.innerHTML);
    const level = tag === "h1" || tag === "h2" ? 2 : tag === "h3" ? 3 : 4;
    if (text.trim()) blocks.push({ type: "heading", level, text });
    return;
  }

  // Paragraphs
  if (tag === "p") {
    const text = sanitizeInlineHtml(el.innerHTML).trim();
    if (text) blocks.push({ type: "paragraph", text });
    return;
  }

  // Separators
  if (tag === "hr") {
    blocks.push({ type: "separator" });
    return;
  }

  // Bare images
  if (tag === "img") {
    blocks.push({
      type: "image",
      src: el.getAttribute("src") ?? "",
      alt: el.getAttribute("alt") ?? "",
    });
    return;
  }

  // Generic wrappers (div, section, wp-block-group, columns, …): flatten children
  Array.from(el.childNodes).forEach((child) => collectBlocks(child, blocks));
}

/** Parse rendered Gutenberg HTML into the structured CmsBlock[] contract. */
function parseBlocks(html: string): CmsBlock[] {
  if (!html || typeof document === "undefined") return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const blocks: CmsBlock[] = [];
  Array.from(doc.body?.childNodes ?? []).forEach((child) => collectBlocks(child, blocks));
  return blocks;
}

function fromGraphQlPage(raw: WPGraphQLPage, path: string): CmsPage {
  return {
    slug: raw.slug,
    path,
    title: raw.title,
    excerpt: stripHtml(raw.excerpt),
    heroImage: raw.featuredImage?.node
      ? {
          src: raw.featuredImage.node.sourceUrl,
          alt: raw.featuredImage.node.altText || raw.title,
        }
      : undefined,
    blocks: parseBlocks(raw.content),
  };
}

function fromRestPage(raw: WPRestPage, path: string): CmsPage {
  return {
    slug: raw.slug,
    path,
    title: raw.title.rendered,
    excerpt: stripHtml(raw.excerpt.rendered ?? ""),
    heroImage: raw.meta?.featured_image
      ? {
          src: raw.meta.featured_image as string,
          alt: (raw.meta?.featured_image_alt as string) ?? raw.title.rendered,
        }
      : undefined,
    blocks: parseBlocks(raw.content.rendered),
  };
}

/**
 * Fetch a native WordPress Page by its full route path (e.g. "/careers" or
 * "/about/history"). Tries WPGraphQL's `pageBy(uri:)` first — it resolves
 * nested paths natively — then the REST pages tree, resolving the parent
 * chain ourselves. Returns null when WordPress has no such page so the caller
 * falls back to mock data / NotFound.
 */
export async function getCmsPageFromWordPress(path: string): Promise<CmsPage | null> {
  const normalized = normalizePagePath(path);

  try {
    if (getGraphQlUrl()) {
      const data = await fetchGraphQL<{ pageBy: WPGraphQLPage | null }>(
        GRAPHQL_QUERIES.PAGE_BY_URI,
        { uri: normalized },
      );
      if (data?.pageBy) return fromGraphQlPage(data.pageBy, normalized);
      return null;
    }
  } catch (err) {
    console.warn("[content] WPGraphQL page lookup failed, trying REST:", err);
  }

  try {
    const pages = await fetchRest<WPRestPage[]>(REST_PATHS.pages, {
      cache: "force-cache",
    });
    const byId = new Map<number, WPRestPage>();
    for (const p of pages) byId.set(p.id, p);
    const resolvePath = (p: WPRestPage): string => {
      const segments = [p.slug];
      let parent = p.parent;
      while (parent) {
        const ancestor = byId.get(parent);
        if (!ancestor) break;
        segments.unshift(ancestor.slug);
        parent = ancestor.parent;
      }
      return `/${segments.join("/")}`;
    };
    const match = pages.find((p) => normalizePagePath(resolvePath(p)) === normalized);
    if (match) return fromRestPage(match, normalized);
    return null;
  } catch (err) {
    console.warn("[content] WordPress page lookup failed:", err);
    return null;
  }
}
