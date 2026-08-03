import type { CalendarEvent } from "@/types";
import { images } from "./images";

/**
 * Mock events.
 *
 * PLACEHOLDER NOTICE: dates, venues and descriptions are illustrative.
 * Structure mirrors the future WordPress `event` custom post type
 * (see README "Recommended WordPress custom post types").
 */
export const events: CalendarEvent[] = [
  {
    id: "event-001",
    slug: "orientation-week-2026",
    title: "Undergraduate Orientation Week",
    description:
      "Welcome activities, campus tours and registration support for new undergraduate students beginning the 2026/27 academic year.",
    startDate: "2026-09-01",
    endDate: "2026-09-05",
    time: "8:30 am – 4:00 pm daily",
    location: "Mico College Campus, Kingston",
    category: "Student Life",
    image: images.studentsWalking,
    status: "upcoming",
  },
  {
    id: "event-002",
    slug: "open-day-2026",
    title: "Mico Open Day",
    description:
      "Explore programmes, meet faculty and current students, tour the campus and get your application questions answered.",
    startDate: "2026-09-26",
    time: "9:00 am – 3:00 pm",
    location: "Mico College Campus, Kingston",
    category: "Admissions",
    image: images.campusLawn,
    status: "upcoming",
  },
  {
    id: "event-003",
    slug: "public-lecture-future-teacher-education",
    title: "Public Lecture: The Future of Teacher Education in the Caribbean",
    description:
      "A public lecture exploring how teacher education can respond to the changing needs of Caribbean classrooms. (Placeholder details.)",
    startDate: "2026-10-08",
    time: "5:30 pm – 7:30 pm",
    location: "Mico College Campus, Kingston",
    category: "Research",
    image: images.lecture,
    status: "upcoming",
  },
  {
    id: "event-004",
    slug: "research-symposium-2026",
    title: "Annual Research Symposium",
    description:
      "Faculty and graduate students share their research across education, technology and the humanities. (Placeholder details.)",
    startDate: "2026-10-22",
    endDate: "2026-10-23",
    time: "9:00 am – 5:00 pm",
    location: "Mico College Campus, Kingston",
    category: "Research",
    image: images.presentation,
    status: "upcoming",
  },
  {
    id: "event-005",
    slug: "careers-fair-2026",
    title: "Careers Fair 2026",
    description:
      "Meet employers from education, business and the public sector and explore internships and graduate opportunities. (Placeholder details.)",
    startDate: "2026-11-06",
    time: "10:00 am – 3:00 pm",
    location: "Mico College Campus, Kingston",
    category: "Student Life",
    image: images.meeting,
    status: "upcoming",
  },
  {
    id: "event-006",
    slug: "alumni-reunion-weekend-2026",
    title: "Alumni Reunion Weekend",
    description:
      "A weekend of connection, campus tours and celebration for Mico alumni across the decades. (Placeholder details.)",
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    time: "From 10:00 am",
    location: "Mico College Campus, Kingston",
    category: "Alumni",
    image: images.community,
    status: "upcoming",
  },
];

export const eventCategories = [
  "Admissions",
  "Student Life",
  "Research",
  "Alumni",
] as const;
