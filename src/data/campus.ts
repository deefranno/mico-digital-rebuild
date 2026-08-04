import { images } from "./images";

/**
 * Campus & student experience content.
 * PLACEHOLDER NOTICE: descriptive copy only — no official claims.
 */

export interface CampusFeature {
  id: string;
  icon: string; // key into the icon map in CampusExperience
  title: string;
  description: string;
  href: string;
  image?: (typeof images)[keyof typeof images];
}

export const campusFeatures: CampusFeature[] = [
  {
    id: "organisations",
    icon: "users",
    title: "Student Organisations",
    description:
      "Guild, clubs and societies for debate, service, faith, the arts and more — a place to lead, connect and belong.",
    href: "/student-life#organisations",
    image: images.community,
  },
  {
    id: "sports",
    icon: "trophy",
    title: "Sports & Recreation",
    description:
      "Track and field, netball, football, cricket and fitness — compete or stay active at your own pace.",
    href: "/student-life#sports",
    image: images.sports,
  },
  {
    id: "support",
    icon: "heart-handshake",
    title: "Student Support",
    description:
      "Academic advising, counselling, health services and disability support that help every student thrive.",
    href: "/student-life#support",
    image: images.library,
  },
  {
    id: "culture",
    icon: "music",
    title: "Culture & Community",
    description:
      "Heritage celebrations, the arts, and a community that reflects the warmth and energy of Jamaica.",
    href: "/student-life#campus-life",
    image: images.music,
  },
  {
    id: "accommodation",
    icon: "home",
    title: "Accommodation",
    description:
      "On-campus and nearby housing options with guidance from the Office of Student Affairs.",
    href: "/student-life#accommodation",
    image: images.campusLawn,
  },
  {
    id: "careers",
    icon: "briefcase",
    title: "Career Development",
    description:
      "Internships, placements, workshops and employer connections that take you from campus to career.",
    href: "/student-life#careers",
    image: images.meeting,
  },
];
