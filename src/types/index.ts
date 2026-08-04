/**
 * Core content interfaces for The Mico University College website.
 *
 * These types are the single source of truth shared by:
 *  - the local mock content in `src/data/`
 *  - the WordPress adapters in `src/lib/wordpress/adapters.ts`
 *
 * If you change one of these shapes, update the adapters so the UI keeps
 * receiving the same contract regardless of the content source.
 */

/* --------------------------------------------------------------------------
 * Primitives
 * ------------------------------------------------------------------------ */

export interface MediaImage {
  /** URL of the image (local `/images/...` or remote CDN). */
  src: string;
  /** Meaningful alternative text (WCAG 1.1.1). */
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkItem {
  label: string;
  href: string;
  /** Short descriptor used in mega-menu layouts. */
  description?: string;
}

export interface CTABlock {
  id: string;
  heading: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Optional tertiary links (e.g. "Visit the Campus"). */
  links?: LinkItem[];
}

/* --------------------------------------------------------------------------
 * Pages & posts
 * ------------------------------------------------------------------------ */

export interface Page {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  heroImage?: MediaImage;
  seo?: { title?: string; description?: string };
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string; // ISO 8601
  modified?: string;
  author?: string;
  featuredImage?: MediaImage;
  categories?: string[];
  tags?: string[];
}

export interface NewsArticle extends Post {
  category: string;
}

/* --------------------------------------------------------------------------
 * Events
 * ------------------------------------------------------------------------ */

export interface CalendarEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** ISO date e.g. "2026-09-14". */
  startDate: string;
  endDate?: string;
  /** Human-friendly time range e.g. "9:00 am – 12:00 pm". */
  time: string;
  location: string;
  category: string;
  image?: MediaImage;
  /** External link when the event lives on another system. */
  link?: string;
  status?: "upcoming" | "past";
}

/* --------------------------------------------------------------------------
 * Academic programmes
 * ------------------------------------------------------------------------ */

export type StudyLevel =
  | "Undergraduate"
  | "Graduate"
  | "Certificate"
  | "Professional Development"
  | "Short Course";

export type DeliveryMethod = "Full-time" | "Part-time" | "Online" | "Blended";

export interface CourseStructureItem {
  label: string; // e.g. "Year One"
  description: string;
  modules: string[];
}

export interface DeadlineItem {
  term: string; // e.g. "September 2026 intake"
  deadline: string; // e.g. "31 July 2026"
  note?: string;
}

export interface AcademicProgramme {
  id: string;
  slug: string;
  title: string;
  /** e.g. "Bachelor of Education (Primary)". */
  awardType: string;
  faculty: string;
  facultySlug?: string;
  duration: string;
  studyMode: DeliveryMethod[];
  campus: string;
  level: StudyLevel;
  subjectArea: string;
  overview: string;
  highlights?: string[];
  entryRequirements: string[];
  courseStructure: CourseStructureItem[];
  careerOpportunities: string[];
  /** Tuition & fees — always placeholder until official figures are supplied. */
  fees: { note: string; details?: string[] };
  applicationDeadlines: DeadlineItem[];
  brochureUrl?: string;
  relatedSlugs?: string[];
  image?: MediaImage;
}

/* --------------------------------------------------------------------------
 * Faculties, departments & staff
 * ------------------------------------------------------------------------ */

export interface Department {
  name: string;
  description?: string;
  href?: string;
}

export interface Faculty {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  image?: MediaImage;
  departments: Department[];
  link: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  email?: string;
  phone?: string;
  image?: MediaImage;
  bio?: string;
}

/* --------------------------------------------------------------------------
 * Places, proof & numbers
 * ------------------------------------------------------------------------ */

export interface CampusLocation {
  id: string;
  name: string;
  address: string;
  city?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  programme: string;
  graduationYear: string;
  quote: string;
  storyLink?: string;
  image?: MediaImage;
}

export interface Statistic {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note?: string;
  /** True until official figures are supplied by the institution. */
  placeholder?: boolean;
}

/* --------------------------------------------------------------------------
 * Navigation
 * ------------------------------------------------------------------------ */

export interface NavigationItem extends LinkItem {
  children?: LinkItem[];
}

export interface UtilityLink {
  label: string;
  href: string;
}

/** One link column in the site footer. */
export interface FooterColumn {
  heading: string;
  links: LinkItem[];
}

export interface SocialLink {
  label: string;
  href: string;
}
