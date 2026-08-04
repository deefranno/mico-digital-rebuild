import type { Faculty } from "@/types";
import { images } from "./images";

/**
 * Mock academic units (faculties / schools).
 *
 * PLACEHOLDER NOTICE: names of departments and unit structures are
 * illustrative and must be verified against the institution's official
 * academic structure. Mirrors the future WordPress `faculty` post type.
 */
export const faculties: Faculty[] = [
  {
    id: "fac-education",
    slug: "faculty-of-education",
    name: "Faculty of Education",
    shortName: "Education",
    description:
      "The largest and oldest academic unit at Mico, preparing teachers and education leaders for classrooms across Jamaica and the Caribbean since the college's earliest days.",
    image: images.classroom,
    departments: [
      { name: "Early Childhood Education", description: "Birth-to-eight pedagogy and practice" },
      { name: "Primary Education", description: "Foundational literacy, numeracy and child development" },
      { name: "Secondary Education", description: "Subject specialisation for high-school teaching" },
      { name: "Special Education & Inclusive Practices", description: "Inclusive classrooms and learner support" },
      { name: "Curriculum & Instruction", description: "Curriculum design and instructional leadership" },
    ],
    link: "/faculties#faculty-of-education",
  },
  {
    id: "fac-humanities",
    slug: "faculty-of-humanities-and-liberal-arts",
    name: "Faculty of Humanities and Liberal Arts",
    shortName: "Humanities",
    description:
      "Language, literature, history, the creative arts and social sciences taught through a distinctly Caribbean lens — building thinkers, writers and communicators.",
    image: images.library,
    departments: [
      { name: "Language & Literature", description: "English and Caribbean literature" },
      { name: "Social Studies & History", description: "Society, culture and the Jamaican experience" },
      { name: "Creative & Performing Arts", description: "Music, drama and visual arts" },
      { name: "Modern Languages", description: "Spanish and French for communication" },
    ],
    link: "/faculties#faculty-of-humanities-and-liberal-arts",
  },
  {
    id: "fac-science",
    slug: "faculty-of-science-and-technology",
    name: "Faculty of Science and Technology",
    shortName: "Science & Tech",
    description:
      "Mathematics, computing and the sciences with a practical, applied focus — preparing graduates for teaching, industry and research in a digital Jamaica.",
    image: images.science,
    departments: [
      { name: "Mathematics", description: "Pure and applied mathematics, statistics" },
      { name: "Information Technology", description: "Computing, networks and software development" },
      { name: "Science Education", description: "Biology, chemistry and physics teaching" },
    ],
    link: "/faculties#faculty-of-science-and-technology",
  },
  {
    id: "fac-graduate",
    slug: "graduate-studies-and-research",
    name: "Graduate Studies and Research",
    shortName: "Graduate Studies",
    description:
      "Home of master's, M.Phil. and doctoral study — and the research centres and publications that extend Mico's contribution to knowledge.",
    image: images.studyGroup,
    departments: [
      { name: "Master's Programmes", description: "M.Ed. and professional master's degrees" },
      { name: "Doctoral Studies", description: "M.Phil. and Ph.D. supervision" },
      { name: "Research Centres", description: "Focused centres of inquiry (see Research)" },
    ],
    link: "/faculties#graduate-studies-and-research",
  },
  {
    id: "fac-professional",
    slug: "professional-and-continuing-education",
    name: "Professional and Continuing Education",
    shortName: "Professional & Continuing",
    description:
      "Short courses, certificates and professional development that keep practising educators and professionals current — taught in the evenings, weekends and online.",
    image: images.meeting,
    departments: [
      { name: "Certificate Courses", description: "Recognised professional certificates" },
      { name: "Short Courses", description: "Focused, practical upskilling" },
      { name: "Community Programmes", description: "Open programmes for the wider community" },
    ],
    link: "/faculties#professional-and-continuing-education",
  },
];
