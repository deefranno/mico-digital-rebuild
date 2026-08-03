import { images } from "./images";

/**
 * Research & impact content.
 * PLACEHOLDER NOTICE: all centre names and claims are illustrative.
 */

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string; // key into the icon map in ResearchImpact
}

export const researchAreas: ResearchArea[] = [
  {
    id: "educational-research",
    title: "Educational Research",
    description:
      "Inquiry into teaching, learning and the Jamaican classroom — from literacy interventions to assessment reform.",
    icon: "book-open",
  },
  {
    id: "innovation",
    title: "Innovation & Technology",
    description:
      "Exploring how digital tools and new pedagogies can widen access to quality education.",
    icon: "lightbulb",
  },
  {
    id: "community-development",
    title: "Community Development",
    description:
      "Applied research and service that supports schools, families and communities across Jamaica.",
    icon: "heart-handshake",
  },
  {
    id: "teacher-training",
    title: "Teacher Training & Development",
    description:
      "Studies on teacher preparation, professional development and the teaching workforce.",
    icon: "graduation-cap",
  },
  {
    id: "partnerships",
    title: "National & Regional Partnerships",
    description:
      "Collaboration with ministries, universities and regional bodies to shape education policy.",
    icon: "globe",
  },
  {
    id: "publications",
    title: "Publications & Outputs",
    description:
      "Journals, working papers and conference contributions from Mico researchers.",
    icon: "file-text",
  },
];

export interface ResearchCentre {
  id: string;
  name: string;
  description: string;
}

export const researchCentres: ResearchCentre[] = [
  {
    id: "centre-teacher-education",
    name: "Centre for Teacher Education Research",
    description:
      "Investigates how teachers are prepared, supported and retained in Jamaican schools. (Placeholder.)",
  },
  {
    id: "centre-special-education",
    name: "Centre for Special Education & Inclusive Practices",
    description:
      "Advances inclusive classrooms and support for learners with disabilities. (Placeholder.)",
  },
  {
    id: "centre-edtech",
    name: "Centre for Educational Technology",
    description:
      "Explores digital learning, online teaching and educational media. (Placeholder.)",
  },
];

export interface ResearchStory {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: (typeof images)[keyof typeof images];
  href: string;
}

export const featuredResearch: ResearchStory = {
  slug: "literacy-initiative-early-grades",
  title: "How a school-based literacy initiative is lifting early-grade readers",
  excerpt:
    "A Mico research team is working with primary schools to measure and improve early-grade reading — one classroom at a time. (Placeholder story.)",
  category: "Research",
  date: "2026-06-10",
  image: images.studentReading,
  href: "/news/literacy-initiative-early-grades",
};
