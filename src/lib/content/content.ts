/**
 * Content service layer.
 *
 * Every UI component reads content through these async functions instead of
 * importing mock data directly. Today they resolve the local mock data in
 * `src/data/`; when a WordPress endpoint is configured they delegate to the
 * adapters in `src/lib/wordpress/` — no component changes required.
 *
 * The functions are intentionally async so loading / empty / error states
 * exist in the UI today and work unchanged against a remote source later.
 */
import { events as mockEvents } from "@/data/events";
import {
  footerColumns as mockFooterColumns,
  mainNavigation as mockMainNavigation,
  utilityLinks as mockUtilityLinks,
} from "@/data/site";
import { faculties as mockFaculties } from "@/data/faculties";
import { newsArticles as mockNews } from "@/data/news";
import { cmsPages as mockCmsPages } from "@/data/pages";
import { programmes as mockProgrammes } from "@/data/programmes";
import { statistics as mockStatistics } from "@/data/statistics";
import { testimonials as mockTestimonials } from "@/data/testimonials";
import type {
  AcademicProgramme,
  CalendarEvent,
  CmsPage,
  Faculty,
  FooterColumn,
  NavigationItem,
  NewsArticle,
  Statistic,
  Testimonial,
  UtilityLink,
} from "@/types";

import { isWordPressConfigured } from "../wordpress/client";
import {
  getCmsPageFromWordPress,
  getEventsFromWordPress,
  getFacultiesFromWordPress,
  getFooterColumnsFromWordPress,
  getMainNavigationFromWordPress,
  getNewsFromWordPress,
  getProgrammesFromWordPress,
  getUtilityLinksFromWordPress,
  normalizePagePath,
} from "../wordpress/adapters";

const wordpress = isWordPressConfigured();

/* --------------------------------------------------------------------------
 * Academic programmes
 * ------------------------------------------------------------------------ */
export function getProgrammes(): Promise<AcademicProgramme[]> {
  if (wordpress) return getProgrammesFromWordPress();
  return Promise.resolve(mockProgrammes);
}

export async function getProgrammeBySlug(
  slug: string,
): Promise<AcademicProgramme | null> {
  const list = await getProgrammes();
  return list.find((p) => p.slug === slug) ?? null;
}

/* --------------------------------------------------------------------------
 * News
 * ------------------------------------------------------------------------ */
export function getNews(): Promise<NewsArticle[]> {
  if (wordpress) return getNewsFromWordPress();
  return Promise.resolve(mockNews);
}

export async function getNewsBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  const list = await getNews();
  return list.find((n) => n.slug === slug) ?? null;
}

export async function getFeaturedNews(): Promise<NewsArticle | null> {
  const list = await getNews();
  return list[0] ?? null;
}

/* --------------------------------------------------------------------------
 * Events
 * ------------------------------------------------------------------------ */
export function getEvents(): Promise<CalendarEvent[]> {
  if (wordpress) return getEventsFromWordPress();
  return Promise.resolve(mockEvents);
}

export async function getEventBySlug(
  slug: string,
): Promise<CalendarEvent | null> {
  const list = await getEvents();
  return list.find((e) => e.slug === slug) ?? null;
}

/* --------------------------------------------------------------------------
 * Faculties, statistics, testimonials
 * ------------------------------------------------------------------------ */
export function getFaculties(): Promise<Faculty[]> {
  if (wordpress) return getFacultiesFromWordPress();
  return Promise.resolve(mockFaculties);
}

export function getStatistics(): Promise<Statistic[]> {
  return Promise.resolve(mockStatistics);
}

export function getTestimonials(): Promise<Testimonial[]> {
  return Promise.resolve(mockTestimonials);
}

/* --------------------------------------------------------------------------
 * CMS pages (native WordPress Pages via the catch-all route)
 *
 * Pages are matched by their full route path ("/careers", "/about/history").
 * When WordPress is configured the adapter resolves the path there (parent
 * chains included); any path WordPress doesn't own falls back to the mock
 * sample pages so the template stays previewable.
 * ------------------------------------------------------------------------ */
export async function getCmsPageByPath(path: string): Promise<CmsPage | null> {
  const normalized = normalizePagePath(path);
  if (wordpress) {
    const page = await getCmsPageFromWordPress(normalized);
    if (page) return page;
  }
  return mockCmsPages.find((p) => p.path === normalized) ?? null;
}

/* --------------------------------------------------------------------------
 * Menus & navigation
 * ------------------------------------------------------------------------ */
export function getMainNavigation(): Promise<NavigationItem[]> {
  if (wordpress) return getMainNavigationFromWordPress();
  return Promise.resolve(mockMainNavigation);
}

export function getUtilityLinks(): Promise<UtilityLink[]> {
  if (wordpress) return getUtilityLinksFromWordPress();
  return Promise.resolve(mockUtilityLinks);
}

export function getFooterColumns(): Promise<FooterColumn[]> {
  if (wordpress) return getFooterColumnsFromWordPress();
  return Promise.resolve(mockFooterColumns);
}

/* --------------------------------------------------------------------------
 * Site-wide search (programmes, news, events, faculties, pages)
 * ------------------------------------------------------------------------ */
export interface SearchResult {
  type: "Programme" | "News" | "Event" | "Faculty" | "Page";
  title: string;
  href: string;
  excerpt: string;
  category?: string;
}

export async function searchAll(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const [programmes, news, events, faculties] = await Promise.all([
    getProgrammes(),
    getNews(),
    getEvents(),
    getFaculties(),
  ]);

  const matches = (text: string) => text.toLowerCase().includes(q);
  const results: SearchResult[] = [];

  programmes.forEach((p) => {
    if (matches(p.title) || matches(p.subjectArea) || matches(p.faculty)) {
      results.push({
        type: "Programme",
        title: p.title,
        href: `/programmes/${p.slug}`,
        excerpt: p.overview,
        category: p.level,
      });
    }
  });

  news.forEach((n) => {
    if (matches(n.title) || matches(n.excerpt)) {
      results.push({
        type: "News",
        title: n.title,
        href: `/news/${n.slug}`,
        excerpt: n.excerpt,
        category: n.category,
      });
    }
  });

  events.forEach((e) => {
    if (matches(e.title) || matches(e.description) || matches(e.category)) {
      results.push({
        type: "Event",
        title: e.title,
        href: `/events/${e.slug}`,
        excerpt: e.description,
        category: e.category,
      });
    }
  });

  faculties.forEach((f) => {
    if (matches(f.name) || matches(f.description)) {
      results.push({
        type: "Faculty",
        title: f.name,
        href: f.link,
        excerpt: f.description,
      });
    }
  });

  // Static pages
  const pages: { title: string; href: string; keywords: string }[] = [
    { title: "About Mico", href: "/about", keywords: "about history mission leadership" },
    { title: "Admissions", href: "/admissions", keywords: "admissions apply requirements fees" },
    { title: "Academics", href: "/academics", keywords: "academics faculties graduate calendar" },
    { title: "Research", href: "/research", keywords: "research centres publications" },
    { title: "Student Life", href: "/student-life", keywords: "student life campus organisations sports" },
    { title: "News & Events", href: "/news", keywords: "news events announcements" },
    { title: "Alumni", href: "/alumni", keywords: "alumni give back network" },
    { title: "Contact", href: "/contact", keywords: "contact visit campus directions" },
    ...mockCmsPages.map((p) => ({
      title: p.title,
      href: p.path,
      keywords: `${p.title} ${p.excerpt ?? ""} ${p.slug}`,
    })),
  ];
  pages.forEach((p) => {
    if (matches(p.title) || matches(p.keywords)) {
      results.push({ type: "Page", title: p.title, href: p.href, excerpt: p.keywords });
    }
  });

  return results;
}
