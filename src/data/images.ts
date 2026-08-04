/**
 * Centralised imagery.
 *
 * Every image URL used anywhere in the site lives here so a future content
 * editor can swap in authentic Mico campus photography in one place.
 *
 * The crest (`siteConfig.logo`), the homepage hero (`heroCampus`) and the
 * main editorial photos below use the institution-supplied assets in
 * `public/assets/`. Any remaining entries are generic university/education
 * stock imagery from Unsplash and should be replaced with licensed photos of
 * The Mico University College before launch.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Official campus photo supplied by the institution (public/assets/micohero.webp).
  heroCampus: {
    src: "/assets/micohero.webp",
    alt: "The Mico University College campus in Kingston, Jamaica",
  },
  // Institution-supplied campus photography (public/assets/).
  // mico1 — used on the home "About Mico" editorial panel.
  campusLawn: {
    src: "/assets/mico1.webp",
    alt: "Students on the Mico University College campus",
  },
  // mico2 — used on the home "Campus & student experience" band.
  studentsWalking: {
    src: "/assets/Mico2.webp",
    alt: "Mico students walking together across the campus",
  },
  // mico3 — used as the featured research story image.
  studentReading: {
    src: "/assets/mico3.webp",
    alt: "A Mico student studying on campus",
  },
  // mico4 — used on the student life / community sections.
  community: {
    src: "/assets/mico4.webp",
    alt: "Members of the Mico community together on campus",
  },
  graduation: {
    src: u("photo-1523050854058-8df90110c9f1"),
    alt: "Graduates throwing their caps into the air in celebration",
  },
  graduatesGowns: {
    src: u("photo-1571260899304-425eee4c7efc"),
    alt: "Graduates in academic gowns walking on campus",
  },
  lecture: {
    src: u("photo-1524178232363-1fb2b075b655"),
    alt: "Lecturer presenting to students in a lecture hall",
  },
  studyGroup: {
    src: u("photo-1522202176988-66273c2fd55f"),
    alt: "Small group of students studying together with a laptop",
  },
  library: {
    src: u("photo-1507842217343-583bb7270b66"),
    alt: "Reading hall with rows of bookshelves",
  },
  hallColumns: {
    src: u("photo-1562774053-701939374585"),
    alt: "Classical university hall with columns",
  },
  classroom: {
    src: u("photo-1606765962248-7ff407b51667"),
    alt: "Modern classroom with students at desks",
  },
  handshake: {
    src: u("photo-1531482615713-2afd69097998"),
    alt: "Two people shaking hands at a partnership meeting",
  },
  meeting: {
    src: u("photo-1517048676732-d65bc937f952"),
    alt: "Professional meeting around a table",
  },
  planning: {
    src: u("photo-1454165804606-c3d57bc86b40"),
    alt: "Documents and planning notes on a desk",
  },
  coding: {
    src: u("photo-1461749280684-dccba630e2f6"),
    alt: "Computer screen showing source code",
  },
  presentation: {
    src: u("photo-1505373877841-8d25f7d46678"),
    alt: "Speaker presenting to an audience in a conference room",
  },
  teamwork: {
    src: u("photo-1559136555-9303baea8ebd"),
    alt: "Group of colleagues working together at a table",
  },
  sports: {
    src: u("photo-1517649763962-0c623066013b"),
    alt: "People playing sport on a field",
  },
  music: {
    src: u("photo-1511671782779-c97d3d27a1d4"),
    alt: "Student singing into a microphone on stage",
  },
  science: {
    src: u("photo-1532094349884-543bc11b234d"),
    alt: "Laboratory equipment in a science lab",
  },
  portrait1: {
    src: u("photo-1531123897727-8f129e1688ce", 600),
    alt: "Portrait of a young woman smiling",
  },
  portrait2: {
    src: u("photo-1507003211169-0a1dd7228f2d", 600),
    alt: "Portrait of a young man smiling",
  },
  portrait3: {
    src: u("photo-1438761681033-6461ffad8d80", 600),
    alt: "Portrait of a young woman with curly hair",
  },
} as const;

/** Convenience: return a cropped Unsplash URL for a given photo id + size. */
export function unsplash(id: string, w = 1200, h?: number): string {
  const height = h ? `&h=${h}` : "";
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${height}&q=80`;
}
