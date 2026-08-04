import type { CmsPage } from "@/types";
import { images } from "./images";

/**
 * Mock CMS pages rendered by the site's catch-all route.
 *
 * These demonstrate the WordPress-native page system: staff create pages in
 * wp-admin and the site renders them; when WordPress is not configured these
 * sample pages stand in so the templates can be previewed. The `blocks` shape
 * is exactly what the WordPress adapter produces from Gutenberg content.
 *
 * PLACEHOLDER NOTICE: copy is illustrative. Delete these pages once real
 * pages exist in WordPress (Appearance → Pages) — the catch-all will render
 * those instead.
 */
export const cmsPages: CmsPage[] = [
  {
    slug: "careers",
    path: "/careers",
    title: "Careers at Mico",
    excerpt:
      "Join a community of educators and professionals shaping the future of Jamaica.",
    heroImage: images.meeting,
    blocks: [
      {
        type: "heading",
        level: 2,
        text: "Work with purpose at Jamaica's oldest teacher-training institution",
      },
      {
        type: "paragraph",
        text: "The Mico University College brings together academics, administrators and support staff who are passionate about education and national development. We offer a supportive working environment, opportunities for professional growth, and the chance to make a lasting difference.",
      },
      {
        type: "image",
        src: images.studyGroup.src,
        alt: "Staff collaborating in a workshop at Mico",
        caption: "Continuing professional development is central to life at Mico.",
      },
      {
        type: "heading",
        level: 3,
        text: "Why work at Mico",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "A heritage of leadership in education since 1836",
          "Competitive salaries and a comprehensive benefits package",
          "Tuition support for continuing study and research",
          "A vibrant, multicultural campus community in Kingston",
        ],
      },
      {
        type: "quote",
        text: "Working at Mico means more than a job — it means helping shape the educators who will shape Jamaica.",
        citation: "Human Resources Office",
      },
      {
        type: "heading",
        level: 3,
        text: "Current openings",
      },
      {
        type: "paragraph",
        text: "Open positions are advertised as they arise. We also welcome expressions of interest from qualified lecturers and researchers in education, the humanities and the sciences.",
      },
      {
        type: "buttons",
        buttons: [
          { label: "Email Human Resources", href: "mailto:hr@mico.edu.jm", variant: "gold" },
          { label: "Visit the Contact page", href: "/contact", variant: "outline" },
        ],
      },
      {
        type: "separator",
      },
      {
        type: "paragraph",
        text: "Mico is an equal-opportunity employer. (Placeholder content — replace with the institution's real careers page.)",
      },
    ],
  },
  {
    slug: "governance",
    path: "/governance",
    title: "Governance & Leadership",
    excerpt:
      "How Mico is governed and led, from the University Council to the executive team.",
    heroImage: images.hallColumns,
    blocks: [
      {
        type: "heading",
        level: 2,
        text: "A governance structure rooted in accountability",
      },
      {
        type: "paragraph",
        text: "The Mico University College is governed by a University Council supported by standing committees. The Council sets strategic direction, approves policy, and safeguards the institution's mission and resources.",
      },
      {
        type: "heading",
        level: 3,
        text: "Council committees",
      },
      {
        type: "table",
        headers: ["Committee", "Role"],
        rows: [
          ["Academic Board", "Oversees academic standards, curricula and awards"],
          ["Finance Committee", "Reviews budgets, investments and financial controls"],
          ["Audit Committee", "Assures internal control and risk management"],
          ["Human Resources Committee", "Governs staffing policy and senior appointments"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Our commitments",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Transparent decision-making and public reporting",
          "Academic freedom with institutional accountability",
          "Equity, inclusion and safeguarding across the community",
        ],
      },
      {
        type: "buttons",
        buttons: [
          { label: "About Mico", href: "/about", variant: "black" },
          { label: "Contact the Registry", href: "/contact", variant: "outline" },
        ],
      },
      {
        type: "separator",
      },
      {
        type: "paragraph",
        text: "Placeholder content — replace with the institution's official governance information.",
      },
    ],
  },
];
