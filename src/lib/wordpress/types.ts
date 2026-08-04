/**
 * WordPress response types (REST API + WPGraphQL).
 *
 * These describe the raw payloads returned by WordPress so the adapters in
 * `adapters.ts` can map them onto the application types in `src/types`.
 * They mirror the recommended content model in the README (custom post types
 * `news`, `event`, `programme`, `faculty`, plus ACF field groups).
 */

/* --------------------------------------------------------------------------
 * Shared / media
 * ------------------------------------------------------------------------ */

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  link?: string;
}

/* --------------------------------------------------------------------------
 * REST API (wp/v2)
 * ------------------------------------------------------------------------ */

export interface WPRestPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  author: number;
  featured_media: number;
  categories?: number[];
  tags?: number[];
  meta?: Record<string, unknown>;
  // ACF fields (registered via ACF REST / acf field group)
  acf?: Record<string, unknown>;
}

/** REST: GET /wp/v2/pages (native WordPress Pages). */
export interface WPRestPage extends WPRestPost {
  /** id of the parent page; 0 for top-level pages. Used to resolve nested paths. */
  parent?: number;
}

export interface WPRestMedia extends WPMedia {}

/** Custom post type: news article (see README content model). */
export interface WPRestNews extends WPRestPost {}

/** Custom post type: event (see README content model). */
export interface WPRestEvent extends WPRestPost {
  acf?: {
    start_date?: string;
    end_date?: string;
    time?: string;
    location?: string;
    event_category?: string;
  };
}

/** Custom post type: programme (see README content model). */
export interface WPRestProgramme extends WPRestPost {
  acf?: {
    award_type?: string;
    faculty?: number | string;
    duration?: string;
    study_mode?: string[];
    campus?: string;
    level?: string;
    subject_area?: string;
    entry_requirements?: string[];
    course_structure?: { label: string; description: string; modules: string[] }[];
    career_opportunities?: string[];
    fees_note?: string;
    application_deadlines?: { term: string; deadline: string; note?: string }[];
    brochure?: string;
  };
}

/* --------------------------------------------------------------------------
 * WPGraphQL
 * ------------------------------------------------------------------------ */

export interface WPMediaNode {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    sizes?: { nodes?: { sourceUrl: string; width: number; height: number }[] };
  };
}

export interface WPGraphQLNews {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  newsCategory?: { nodes: { name: string }[] };
  featuredImage?: { node: WPMediaNode };
  author?: { node: { name: string } };
}

export interface WPGraphQLEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  eventDetails?: {
    startDate?: string;
    endDate?: string;
    time?: string;
    location?: string;
    category?: string;
  };
  featuredImage?: { node: WPMediaNode };
}

export interface WPGraphQLProgramme {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  programmeDetails?: {
    awardType?: string;
    faculty?: string;
    duration?: string;
    studyMode?: string[];
    campus?: string;
    level?: string;
    subjectArea?: string;
  };
  featuredImage?: { node: WPMediaNode };
}

/** WPGraphQL: pageBy(uri:) — native WordPress Page. */
export interface WPGraphQLPage {
  id: string;
  slug: string;
  /** Full URI, e.g. "/careers/" or "/about/history/". */
  uri: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: { node: WPMediaNode };
}

/* --------------------------------------------------------------------------
 * Menus (wp-admin Appearance > Menus)
 * ------------------------------------------------------------------------ */

/** REST: GET /wp/v2/menus */
export interface WPRestMenu {
  id: number;
  name: string;
  slug: string;
  locations: string[];
}

/** REST: GET /wp/v2/menu-items?menus=<id> */
export interface WPRestMenuItem {
  id: number;
  title: { rendered: string };
  url: string;
  /** id of the parent item; 0 for top-level items. */
  parent: number;
  menu_order: number;
  description?: string;
  attr_title?: string;
  target?: string;
}

/** WPGraphQL: menus { nodes { ... } } */
export interface WPGraphQLMenu {
  id: string;
  name: string;
  slug: string;
  locations?: string[] | null;
  menuItems?: { nodes: WPGraphQLMenuItem[] } | null;
}

export interface WPGraphQLMenuItem {
  id: string;
  databaseId: number;
  label: string;
  url: string;
  /** databaseId of the parent item; null for top-level items. */
  parentId: number | null;
  order?: number | null;
  description?: string | null;
}
