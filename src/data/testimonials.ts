import type { Testimonial } from "@/types";
import { images } from "./images";

/**
 * Mock student stories / testimonials.
 *
 * PLACEHOLDER NOTICE: the people below are illustrative characters, not real
 * students. Names are first-name-and-initial to signal they are placeholders.
 * Replace with real, consented student stories before launch.
 */
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Tanesha B.",
    programme: "B.Ed. Early Childhood Education",
    graduationYear: "Class of 2025",
    quote:
      "Mico gave me more than a degree — it gave me a calling. Every practicum, every lecturer, every child I taught shaped the educator I am today.",
    storyLink: "/news/graduation-class-of-2026",
    image: images.portrait1,
  },
  {
    id: "testimonial-2",
    name: "Jordan R.",
    programme: "B.Sc. Information Technology",
    graduationYear: "Class of 2024",
    quote:
      "The mix of classroom learning and real projects meant I left Mico ready to work. My capstone project is still the best thing on my CV.",
    storyLink: "/news/student-researchers-caribbean-education-conference",
    image: images.portrait2,
  },
  {
    id: "testimonial-3",
    name: "Aaliyah W.",
    programme: "M.Ed. Educational Leadership",
    graduationYear: "Class of 2025",
    quote:
      "Studying while leading a school was demanding, but the cohort model at Mico made it possible. I left with a network of leaders across the island.",
    storyLink: "/news/mico-hosts-national-symposium-teacher-education-reform",
    image: images.portrait3,
  },
];
