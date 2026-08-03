import type {
  CTABlock,
  LinkItem,
  NavigationItem,
  SocialLink,
  UtilityLink,
} from "@/types";
import { images } from "./images";

/**
 * Site-wide configuration.
 *
 * PLACEHOLDER NOTICE: contact details, social URLs and statistics in this
 * file are placeholders — confirm every value with the institution before
 * launch. See README "Placeholder content that must be replaced".
 */
export const siteConfig = {
  name: "The Mico University College",
  shortName: "Mico",
  legalName: "The Mico University College",
  tagline: "Shaping Educators. Transforming Jamaica.",
  description:
    "A university community dedicated to excellence in education, leadership, research and national development.",
  founded: 1836,
  // Official crest supplied by the institution (public/assets/micologo.jpeg).
  logo: "/assets/micologo.jpeg",
  campus: {
    name: "Mico College Campus",
    address: "1a Marescaux Road",
    city: "Kingston 5",
    country: "Jamaica",
  },
  // PLACEHOLDER — confirm with the institution.
  contact: {
    telephone: "+1 (876) 929-XXXX",
    telephoneNote: "Placeholder number — confirm with the institution",
    email: "info@mico.edu.jm",
    emailNote: "Placeholder address — confirm with the institution",
    admissionsEmail: "admissions@mico.edu.jm",
    admissionsEmailNote: "Placeholder address",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "X (Twitter)", href: "https://x.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
  ] as SocialLink[],
  // Used by structured data (EducationalOrganization). PLACEHOLDER domain.
  url: "https://www.mico.edu.jm",
} as const;

/* --------------------------------------------------------------------------
 * Utility bar (black strip above the main header)
 * ------------------------------------------------------------------------ */
export const utilityLinks: UtilityLink[] = [
  { label: "Current Students", href: "/student-life" },
  { label: "Staff", href: "/about#staff" },
  { label: "Alumni", href: "/alumni" },
  { label: "Library", href: "/student-life#support" },
  { label: "Student Portal", href: "/portal" },
  { label: "Contact", href: "/contact" },
];

/* --------------------------------------------------------------------------
 * Main navigation (desktop mega menu + mobile accordion)
 * ------------------------------------------------------------------------ */
export const mainNavigation: NavigationItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our History", href: "/about#history", description: "A legacy of leadership since 1836" },
      { label: "Mission & Values", href: "/about#mission", description: "What drives the Mico community" },
      { label: "Leadership", href: "/about#leadership", description: "Meet the executive team (placeholder)" },
      { label: "Campuses", href: "/about#campuses", description: "Our locations across Jamaica" },
      { label: "Quality & Accreditation", href: "/about#accreditation", description: "Standards and quality assurance" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "How to Apply", href: "/admissions#how-to-apply", description: "Step-by-step application guide" },
      { label: "Entry Requirements", href: "/admissions#requirements", description: "What you need to qualify" },
      { label: "Tuition & Fees", href: "/admissions#fees", description: "Fees, payment and refunds" },
      { label: "Scholarships", href: "/admissions#scholarships", description: "Financial support opportunities" },
      { label: "International Students", href: "/admissions#international", description: "Studying at Mico from abroad" },
      { label: "Key Dates", href: "/admissions#dates", description: "Deadlines and important dates" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Programmes", href: "/programmes", description: "Browse all study options" },
      { label: "Faculties", href: "/faculties", description: "Our academic units and departments" },
      { label: "Graduate Studies", href: "/academics#graduate", description: "Master's, M.Phil. and Ph.D." },
      { label: "Professional Development", href: "/academics#professional", description: "Courses for working professionals" },
      { label: "Short Courses", href: "/academics#short-courses", description: "Focused, practical learning" },
      { label: "Academic Calendar", href: "/academics#calendar", description: "Semesters and key dates" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Research Centres", href: "/research#centres", description: "Focused centres of inquiry" },
      { label: "Publications", href: "/research#publications", description: "Journals and outputs" },
      { label: "Partnerships", href: "/research#partnerships", description: "National and regional collaboration" },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    children: [
      { label: "Campus Life", href: "/student-life#campus-life", description: "Life on the Mico campus" },
      { label: "Student Organisations", href: "/student-life#organisations", description: "Clubs and societies" },
      { label: "Sports & Recreation", href: "/student-life#sports", description: "Teams, fitness and play" },
      { label: "Support Services", href: "/student-life#support", description: "Wellbeing and learning support" },
      { label: "Accommodation", href: "/student-life#accommodation", description: "Housing options" },
      { label: "Career Development", href: "/student-life#careers", description: "From campus to career" },
    ],
  },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "News", href: "/news", description: "Stories from across Mico" },
      { label: "Events", href: "/events", description: "Open days, lectures and more" },
    ],
  },
  { label: "Alumni", href: "/alumni" },
  { label: "Contact", href: "/contact" },
];

/* --------------------------------------------------------------------------
 * Homepage — audience quick links
 * ------------------------------------------------------------------------ */
export interface AudienceLink {
  id: string;
  icon: string; // key into the icon map in AudienceQuickLinks
  title: string;
  description: string;
  href: string;
}

export const audienceLinks: AudienceLink[] = [
  {
    id: "prospective",
    icon: "graduation-cap",
    title: "Prospective Students",
    description: "Start your journey at Mico — find a programme and apply.",
    href: "/admissions",
  },
  {
    id: "current",
    icon: "book-open",
    title: "Current Students",
    description: "Timetables, support services and everything student life.",
    href: "/student-life",
  },
  {
    id: "international",
    icon: "globe",
    title: "International Students",
    description: "Studying in Jamaica from overseas — visas, fees and support.",
    href: "/admissions#international",
  },
  {
    id: "graduate",
    icon: "library",
    title: "Graduate Students",
    description: "Master's, M.Phil. and doctoral study at Mico.",
    href: "/academics#graduate",
  },
  {
    id: "parents",
    icon: "users",
    title: "Parents & Families",
    description: "Everything families need to support a student at Mico.",
    href: "/admissions#parents",
  },
  {
    id: "staff",
    icon: "briefcase",
    title: "Faculty & Staff",
    description: "Resources and information for the Mico team.",
    href: "/about#staff",
  },
];

/* --------------------------------------------------------------------------
 * Homepage — final call to action
 * ------------------------------------------------------------------------ */
export const homeCta: CTABlock = {
  id: "home-final-cta",
  heading: "Your Future Starts at Mico.",
  description:
    "Join a community with more than 180 years of leadership in education — and help shape the next generation of Jamaica.",
  primaryLabel: "Apply Now",
  primaryHref: "/admissions",
  secondaryLabel: "Request Information",
  secondaryHref: "/contact#enquiry",
  links: [
    { label: "Explore Programmes", href: "/programmes" },
    { label: "Visit the Campus", href: "/contact#visit" },
  ],
};

/* --------------------------------------------------------------------------
 * Footer
 * ------------------------------------------------------------------------ */
export const footerColumns: { heading: string; links: LinkItem[] }[] = [
  {
    heading: "Admissions",
    links: [
      { label: "How to Apply", href: "/admissions#how-to-apply" },
      { label: "Entry Requirements", href: "/admissions#requirements" },
      { label: "Tuition & Fees", href: "/admissions#fees" },
      { label: "Scholarships", href: "/admissions#scholarships" },
      { label: "Key Dates", href: "/admissions#dates" },
    ],
  },
  {
    heading: "Academics",
    links: [
      { label: "Programmes", href: "/programmes" },
      { label: "Faculties", href: "/faculties" },
      { label: "Graduate Studies", href: "/academics#graduate" },
      { label: "Professional Development", href: "/academics#professional" },
      { label: "Academic Calendar", href: "/academics#calendar" },
    ],
  },
  {
    heading: "Students",
    links: [
      { label: "Student Life", href: "/student-life" },
      { label: "Student Portal", href: "/portal" },
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    heading: "University",
    links: [
      { label: "About Mico", href: "/about" },
      { label: "Research", href: "/research" },
      { label: "Alumni", href: "/alumni" },
      { label: "Contact", href: "/contact" },
      { label: "Policies", href: "/policies#privacy" },
      { label: "Accessibility Statement", href: "/policies#accessibility" },
    ],
  },
];

export const campusLocations = [
  {
    id: "main-campus",
    name: "Mico College Campus",
    address: "1a Marescaux Road, Kingston 5, Jamaica",
    phone: siteConfig.contact.telephone,
    email: siteConfig.contact.email,
    description: "Main campus and administrative centre (placeholder details).",
  },
] as const;
