/**
 * WPGraphQL queries.
 *
 * These queries target the content model recommended in the README
 * (custom post types `news`, `event`, `programme`; ACF group `programmeDetails`
 * exposed through WPGraphQL). Field names must match the ACF field group keys
 * registered in WordPress.
 */

export const GRAPHQL_QUERIES = {
  /** All news articles, newest first. */
  NEWS: /* GraphQL */ `
    query GetNews($first: Int!, $after: String) {
      news(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          date
          excerpt
          content
          newsCategory { nodes { name } }
          author { node { name } }
          featuredImage { node { sourceUrl altText } }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,

  /** A single news article by slug. */
  NEWS_BY_SLUG: /* GraphQL */ `
    query GetNewsBySlug($slug: ID!) {
      news(id: $slug, idType: SLUG) {
        id
        slug
        title
        date
        excerpt
        content
        newsCategory { nodes { name } }
        author { node { name } }
        featuredImage { node { sourceUrl altText } }
      }
    }
  `,

  /** Upcoming events (future start dates). */
  EVENTS: /* GraphQL */ `
    query GetEvents($first: Int!) {
      events(first: $first, where: { dateQuery: { after: { year: 2026 } } }) {
        nodes {
          id
          slug
          title
          date
          excerpt
          content
          eventDetails { startDate endDate time location category }
          featuredImage { node { sourceUrl altText } }
        }
      }
    }
  `,

  /** A single event by slug. */
  EVENT_BY_SLUG: /* GraphQL */ `
    query GetEventBySlug($slug: ID!) {
      event(id: $slug, idType: SLUG) {
        id
        slug
        title
        date
        excerpt
        content
        eventDetails { startDate endDate time location category }
        featuredImage { node { sourceUrl altText } }
      }
    }
  `,

  /** All programmes. */
  PROGRAMMES: /* GraphQL */ `
    query GetProgrammes($first: Int!) {
      programmes(first: $first) {
        nodes {
          id
          slug
          title
          excerpt
          content
          programmeDetails {
            awardType
            faculty
            duration
            studyMode
            campus
            level
            subjectArea
          }
          featuredImage { node { sourceUrl altText } }
        }
      }
    }
  `,

  /** A single programme by slug. */
  PROGRAMME_BY_SLUG: /* GraphQL */ `
    query GetProgrammeBySlug($slug: ID!) {
      programme(id: $slug, idType: SLUG) {
        id
        slug
        title
        excerpt
        content
        programmeDetails {
          awardType
          faculty
          duration
          studyMode
          campus
          level
          subjectArea
        }
        featuredImage { node { sourceUrl altText } }
      }
    }
  `,
} as const;

/** REST API paths (wp/v2). */
export const REST_PATHS = {
  news: "/wp/v2/news",
  newsBySlug: (slug: string) => `/wp/v2/news?slug=${encodeURIComponent(slug)}`,
  events: "/wp/v2/event",
  programmes: "/wp/v2/programme",
  faculties: "/wp/v2/faculty",
  media: (id: number) => `/wp/v2/media/${id}`,
} as const;
