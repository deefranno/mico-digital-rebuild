import type { NewsArticle } from "@/types";
import { images } from "./images";

/**
 * Mock news articles. The first article is treated as the homepage's
 * featured story.
 *
 * PLACEHOLDER NOTICE: headlines, dates, quotes and event references are
 * illustrative. Replace with real stories from the institution. Structure
 * mirrors the future WordPress `news` custom post type (see README).
 */
export const newsArticles: NewsArticle[] = [
  {
    id: "news-001",
    slug: "national-symposium-teacher-education-reform",
    title: "Mico hosts national symposium on the future of teacher education",
    category: "Academics",
    date: "2026-07-14",
    author: "Communications Office",
    excerpt:
      "Education leaders, policymakers and classroom teachers gathered at Mico for two days of dialogue on strengthening the teaching profession in Jamaica.",
    content: [
      "More than 300 educators, policymakers and researchers convened at The Mico University College for the inaugural National Symposium on Teacher Education Reform.",
      "Over two days, panel discussions explored recruitment and retention of teachers, the role of technology in classrooms, and how initial teacher education can better prepare graduates for the realities of Jamaican schools.",
      "The symposium concluded with a communiqué calling for renewed investment in teacher preparation and continuing professional development. (Placeholder story.)",
    ].join("\n\n"),
    featuredImage: images.presentation,
  },
  {
    id: "news-002",
    slug: "student-researchers-caribbean-education-conference",
    title: "Student researchers present at Caribbean education conference",
    category: "Research",
    date: "2026-06-28",
    author: "Graduate Studies and Research",
    excerpt:
      "Graduate students represented Mico at a regional conference, presenting work on inclusive classrooms, digital learning and school leadership.",
    content: [
      "A delegation of graduate students from the Faculty of Education presented their research at the annual Caribbean Education Research Conference. (Placeholder story.)",
    ].join("\n\n"),
    featuredImage: images.studyGroup,
  },
  {
    id: "news-003",
    slug: "graduation-class-of-2026",
    title: "Mico celebrates graduation of the Class of 2026",
    category: "Campus Life",
    date: "2026-05-22",
    author: "Communications Office",
    excerpt:
      "Hundreds of graduates crossed the stage as Mico celebrated another cohort of newly qualified educators and professionals.",
    content: [
      "Families, faculty and friends filled the graduation venue as the Class of 2026 received their awards. (Placeholder story.)",
    ].join("\n\n"),
    featuredImage: images.graduation,
  },
  {
    id: "news-004",
    slug: "new-learning-resource-centre",
    title: "New learning resource centre opens on campus",
    category: "Campus Life",
    date: "2026-05-08",
    author: "Campus Facilities",
    excerpt:
      "Students now have access to a refurbished centre with expanded study spaces, a technology hub and quiet zones.",
    content: [
      "The refurbished learning resource centre offers extended opening hours, bookable group study rooms and a dedicated technology help desk. (Placeholder story.)",
    ].join("\n\n"),
    featuredImage: images.library,
  },
  {
    id: "news-005",
    slug: "partnership-early-childhood-practitioners",
    title: "Partnership expands support for early-childhood practitioners",
    category: "Community",
    date: "2026-04-19",
    author: "Professional and Continuing Education",
    excerpt:
      "A new agreement will bring subsidised training and mentoring to early-childhood practitioners across the island.",
    content: [
      "Mico signed a memorandum of understanding to deliver continuing professional development to early-childhood practitioners. (Placeholder story.)",
    ].join("\n\n"),
    featuredImage: images.handshake,
  },
  {
    id: "news-006",
    slug: "mico-athletes-inter-university-championships",
    title: "Mico athletes shine at inter-university championships",
    category: "Student Life",
    date: "2026-03-30",
    author: "Office of Student Affairs",
    excerpt:
      "Track and field athletes returned from the national championships with medals and new personal bests.",
    content: [
      "Mico's athletics team delivered a strong performance at the national inter-university championships. (Placeholder story.)",
    ].join("\n\n"),
    featuredImage: images.sports,
  },
  {
    id: "news-007",
    slug: "alumni-mentorship-programme",
    title: "Alumni mentorship programme pairs graduates with final-year students",
    category: "Alumni",
    date: "2026-03-02",
    author: "Alumni Relations",
    excerpt:
      "A new initiative connects final-year students with Mico alumni working across education and industry.",
    content: [
      "The pilot cohort of the Alumni Mentorship Programme matched fifty final-year students with mentors. (Placeholder story.)",
    ].join("\n\n"),
    featuredImage: images.community,
  },
];

/** Categories used by the news listing filter. */
export const newsCategories = [
  "Academics",
  "Research",
  "Campus Life",
  "Community",
  "Student Life",
  "Alumni",
] as const;
