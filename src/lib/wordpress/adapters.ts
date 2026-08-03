/**
 * Adapters — map WordPress payloads onto the application types in
 * `src/types`. Each adapter has a REST and a GraphQL path plus a graceful
 * fallback to the local mock data when a request fails.
 *
 * These functions are consumed by `src/lib/content/content.ts` and are only
 * called when WordPress is configured.
 */
import { events as mockEvents } from "@/data/events";
import { faculties as mockFaculties } from "@/data/faculties";
import { newsArticles as mockNews } from "@/data/news";
import { programmes as mockProgrammes } from "@/data/programmes";
import type {
  AcademicProgramme,
  CalendarEvent,
  Faculty,
  NewsArticle,
} from "@/types";

import { fetchGraphQL, fetchRest, getGraphQlUrl } from "./client";
import { GRAPHQL_QUERIES, REST_PATHS } from "./queries";
import type {
  WPGraphQLEvent,
  WPGraphQLNews,
  WPGraphQLProgramme,
  WPRestEvent,
  WPRestNews,
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
