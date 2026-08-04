# The Mico University College — Website

A modern, responsive university website for **The Mico University College**
(Jamaica). Built with React 19, TypeScript, Tailwind CSS v4, React Router v7
and Lucide icons, styled in a **Minimalism** theme: a near-monochrome palette
(black / white / greys) with gold (`#F2A900`) used as the single strategic
accent.

> **Stack note.** The original brief asked for Next.js (App Router). This
> environment runs **Vite + React + React Router**, so the architecture was
> adapted faithfully: routes live in `src/app/router.tsx`, pages in
> `src/app/pages/`, and a `<Seo>` component replaces Next.js `metadata`
> exports. The content-service layer, folder structure and WordPress
> readiness are implemented exactly as requested.

---

## 1. Quick start

```bash
# Install dependencies (node_modules is usually pre-installed)
npm install

# Start the development server (Vite, with HMR)
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint

# Typecheck
npx tsc -b --noEmit
```

- Node.js ≥ 20 and npm are required.
- No WordPress setup is needed — the site runs fully on local mock data.

---

## 2. Architecture

```
src/
  app/
    router.tsx           # Route table (all public + protected routes)
    pages/               # One file per page template (17 pages)
  components/
    cards/               # ProgrammeCard, FacultyCard, NewsCard, EventCard,
                         # FeaturedNews, StatisticCard, TestimonialCard
    forms/               # RequestInfoForm, GeneralEnquiryForm
    home/                # Homepage sections (Hero, StatsSection, …)
    layout/              # UtilityBar, SiteHeader, MegaMenu, MobileNavigation,
                         # SearchOverlay, SiteFooter, SiteLayout, ScrollToTop
    shared/              # CTAButton, SectionHeading, Breadcrumbs, PageHeader,
                         # ImageFeature, CallToAction, NewsletterForm,
                         # FormField, LoadingState/EmptyState/ErrorState, Logo,
                         # CmsPageRenderer
    ui/                  # shadcn/ui primitives (template)
  data/                  # ALL mock content lives here (clearly labelled)
    site.ts              # Navigation, audience links, contact, footer
    programmes.ts        # 12 placeholder programmes
    news.ts              # 7 placeholder articles
    events.ts            # 6 placeholder events
    faculties.ts         # 5 placeholder academic units
    statistics.ts        # Placeholder statistics (marked)
    testimonials.ts      # Placeholder student stories (marked)
    campus.ts            # Campus & student experience content
    research.ts          # Research areas, centres, featured story
    pages.ts             # Sample WordPress-native CMS pages (/careers, /governance)
    images.ts            # Central image registry (swap images here)
  features/
    programmes/
      ProgrammeFinder.tsx # Search + filter discovery component
  lib/
    content/
      content.ts         # CONTENT SERVICE LAYER (mock now, WP later)
      use-async.ts       # loading/error/data hook
    wordpress/
      client.ts          # REST + GraphQL fetch helpers
      queries.ts         # WPGraphQL query strings
      types.ts           # WordPress payload types
      adapters.ts        # WP payloads → app types (with mock fallbacks)
    seo.tsx              # <Seo /> + JSON-LD helpers (SPA metadata)
    forms.ts             # Form submission service (backend-ready)
    format.ts            # Date formatting
    icon-map.tsx         # string keys → Lucide icons
  types/
    index.ts             # All shared content interfaces
  styles/                # Global styles live in src/index.css (Vite convention)
```

**Content service layer.** UI components never import `src/data` directly —
they call async getters from `src/lib/content/content.ts`
(`getProgrammes()`, `getNews()`, `getEvents()`, …). Today those resolve the
mock data; when `VITE_WORDPRESS_API_URL` or `VITE_WORDPRESS_GRAPHQL_URL` is
set, they automatically delegate to the WordPress adapters. No component
changes required. Loading, empty and error states are already rendered by
every listing component.

---

## 3. Pages

| Route | Page |
|---|---|
| `/` | Home (hero, quick links, programme finder, about, faculties, stats, campus, research, news, events, stories, CTA) |
| `/about` | About — history, mission & values, leadership, staff, campuses, quality |
| `/admissions` | Admissions — how to apply, requirements, fees, scholarships, international, parents, key dates + form |
| `/academics` | Academics — study levels, graduate, professional development, calendar |
| `/programmes` | Programme directory (search + filters, honours `?level=`) |
| `/programmes/:slug` | Individual programme (overview, structure, requirements, careers, fees, deadlines, brochure, enquiry form) |
| `/faculties` | Faculties & departments |
| `/research` | Research — areas, centres, publications, partnerships |
| `/student-life` | Student life — campus, organisations, sports, support, accommodation, careers |
| `/news` | News listing (category filter) |
| `/news/:slug` | Individual news article |
| `/events` | Events listing (category filter) |
| `/events/:slug` | Individual event |
| `/alumni` | Alumni |
| `/contact` | Contact — details, Google map, general enquiry form |
| `/search?q=…` | Search results (site-wide) |
| `/policies` | Privacy, accessibility, terms (placeholder) |
| `/portal` | Student Portal (protected — sign in via `/auth`) |
| `/auth` | Sign in (email OTP / guest) |
| `*` | **WordPress-native CMS page** — any URL not owned by a fixed route is looked up in WordPress Pages and rendered generically; 404 if no page owns it |

---

## 4. Placeholder content — must be replaced before launch

Everything below is clearly marked *placeholder* in the UI and/or in the data
files. **None of it is official** and must be confirmed with the institution:

- **Logo** — the official crest is in place at `public/assets/micologo.jpeg`,
  referenced by `siteConfig.logo` in `src/data/site.ts` (header, footer,
  portal, favicon and Open Graph all use it). To swap in an updated version,
  replace that file and keep the filename.
- **Hero photo** — the homepage hero uses the supplied
  `public/assets/micohero.webp`. Replace with final campus photography.
- **Photos** — the main editorial photos (home "About Mico", campus
  experience, featured research, student life, About history) use the
  institution-supplied campus photography in `public/assets/`
  (`mico1.webp`, `Mico2.webp`, `mico3.webp`, `mico4.webp`), all wired
  through `src/data/images.ts`. The remaining image URLs are Unsplash
  stock; replace them with licensed campus photography in that one file.
- **Statistics** — `src/data/statistics.ts` (count-up values, all marked).
- **Programme details** — awards, durations, entry requirements, fees and
  deadlines in `src/data/programmes.ts`.
- **News, events, testimonials** — headlines, dates, names, venues.
- **Contact details** — telephone, email, office hours in
  `src/data/site.ts` (address is the publicly known Marescaux Road address,
  still confirm).
- **Social links** — currently point at platform homepages; replace with the
  institution's profiles in `src/data/site.ts`.
- **All copy** — pages contain italicised "(Placeholder …)" notes.
- **Forms** — submissions are simulated (`src/lib/forms.ts`).
- **CMS sample pages** — `src/data/pages.ts` (`/careers`, `/governance`)
  are illustrative and should be replaced by real WordPress pages.

---

## 5. Brand colours & theming

Brand tokens are defined in `src/index.css` (Tailwind v4 `@theme`):

```css
@theme {
  --color-mico-gold: #f2a900;       /* primary accent */
  --color-mico-gold-deep: #b98400;  /* AA-safe gold on white */
  --color-mico-gold-soft: #fff7e0;
  --color-mico-black: #000000;
  --color-mico-white: #ffffff;
  --color-mico-light: #f4f4f4;
  --color-mico-dark: #222222;
  --color-mico-mid: #666666;
}
```

Use them as Tailwind utilities: `bg-mico-gold`, `text-mico-gold-deep`,
`border-mico-gold`, etc. Gold is used deliberately — buttons, active states,
statistics, focus rings — never as a large background.

**Typography** — Manrope (display) + Inter (body), loaded in `index.html`,
with fluid `clamp()` display sizes (`text-hero`, `text-display`,
`text-section` utilities).

---

## 6. Environment variables

Copy `.env.example` → `.env.local`:

```env
VITE_SITE_URL=https://www.mico.edu.jm
VITE_WORDPRESS_API_URL=               # REST base, e.g. https://site/wp-json
VITE_WORDPRESS_GRAPHQL_URL=           # e.g. https://site/graphql
VITE_WORDPRESS_APPLICATION_PASSWORD=  # optional REST bearer token
```

`VITE_SITE_URL` drives canonical URLs, Open Graph and structured data.

---

## 7. Connecting WordPress (headless)

### Option A — WordPress REST API

1. Set `VITE_WORDPRESS_API_URL` to your site's `wp-json` base.
2. (Recommended) Install the
   [ACF](https://wordpress.org/plugins/advanced-custom-fields/) and
   [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/)
   plugins so the `acf` fields below are returned.
3. Create the custom post types and field groups from §8.
4. If the REST API is protected, create an application password and set
   `VITE_WORDPRESS_APPLICATION_PASSWORD`.

The client in `src/lib/wordpress/client.ts` fetches `/wp/v2/news`,
`/wp/v2/event`, `/wp/v2/programme` and `/wp/v2/faculty`; `adapters.ts` maps
them to app types (and falls back to mock data on error).

### Option B — WPGraphQL

1. Install and activate [WPGraphQL](https://www.wpgraphql.com/).
2. Enable "Show in GraphQL" for each custom post type and expose the ACF
   group (ACF + WPGraphQL with "Show in REST" toggled on for the group).
3. Set `VITE_WORDPRESS_GRAPHQL_URL`.

Queries live in `src/lib/wordpress/queries.ts`; they expect the content model
below. GraphQL is preferred when available (single endpoint, typed, field
selection).

> Either way, the UI needs **zero changes**: components keep calling the same
> getters in `src/lib/content/content.ts`.

### Option C — Native WordPress Pages (the mini-CMS)

Staff can create **brand-new pages with no developer or redeploy**: they write a
page in wp-admin (**Pages → Add New**), and the site's catch-all route
(`*` → `src/app/pages/CmsPage.tsx`) fetches it by path and renders it.

- **How it resolves:** the URL path is looked up via WPGraphQL
  `pageBy(uri:)` (handles nested paths like `/about/history` natively), then
  the REST `/wp/v2/pages` tree (parent chains resolved client-side) as
  fallback. Any path WordPress doesn't own renders the standard 404.
- **What's supported:** headings, paragraphs (with links/emphasis), images
  with captions, bullet/numbered lists, quotes, buttons, tables and
  separators — the common Gutenberg blocks. `parseBlocks` in `adapters.ts`
  converts Gutenberg HTML into the structured `CmsBlock[]` contract rendered
  by `src/components/shared/CmsPageRenderer.tsx`.
- **Unknown/exotic blocks** are flattened or dropped rather than breaking the
  page (e.g. columns flatten to their contents).
- **Menus:** add the page to the nav from wp-admin **Appearance → Menus** —
  the menu wiring already feeds the header/footer.
- **Security:** page HTML is sanitised client-side (scripts, iframes, event
  handlers and inline styles stripped) before rendering.
- **Mock fallback:** sample pages in `src/data/pages.ts` (`/careers`,
  `/governance`) render when WordPress is not configured so the templates can
  be previewed; delete them once real pages exist in wp-admin.
- **Limit:** REST resolution fetches up to 100 published pages — plenty for a
  typical university site; a site with more needs pagination added to
  `REST_PATHS.pages`.

---

## 8. Recommended WordPress content model

### Custom post types (register via CPT UI or code)

| CPT slug | Purpose | Taxonomies |
|---|---|---|
| `news` | News articles | `news_category` (Academics, Research, Campus Life, Community, Student Life, Alumni) |
| `event` | Events | `event_category` (Admissions, Student Life, Research, Alumni) |
| `programme` | Academic programmes | `programme_level`, `subject_area`, `delivery_method` |
| `faculty` | Faculties / schools | — |
| `department` | Departments (child of faculty) | `faculty` (relationship) |
| `staff` | Staff profiles | `staff_department` |
| `testimonial` | Student stories | — |
| `announcement` | Notice-board items | `announcement_type` |

All types: enable **title**, **editor**, **excerpt**, **featured image** and
**"Show in REST" / "Show in GraphQL"**.

### Recommended ACF field groups

- **news**: `category` (taxonomy), `featured` (true/false), `author_name`
  (text), `featured_image` + `featured_image_alt` (image) — or just use the
  featured image and taxonomy.
- **event**: `start_date` (date), `end_date` (date), `time` (text),
  `location` (text), `event_category` (taxonomy), `external_link` (url).
- **programme** (`programmeDetails` group): `award_type`, `faculty`
  (relationship), `duration`, `study_mode` (select multi),
  `campus`, `level` (select), `subject_area` (select),
  `entry_requirements` (repeater), `course_structure` (repeater:
  label, description, modules), `career_opportunities` (repeater),
  `fees_note`, `application_deadlines` (repeater: term, deadline, note),
  `brochure` (file).
- **faculty**: `short_name`, `departments` (repeater: name, description,
  link).
- **testimonial**: `student_name`, `programme`, `graduation_year`, `quote`,
  `story_link` (relationship).
- **contact us**: `telephone`, `email`, `office_hours`, `map_embed`.

The adapters in `src/lib/wordpress/adapters.ts` already read these exact
field keys.

---

## 9. Deployment

The frontend is a static SPA — build and serve the `dist/` folder anywhere:

- **Vercel / Netlify / Cloudflare Pages**: framework preset "Vite",
  build command `npm run build`, output `dist`.
- **Any static host**: upload `dist/`; make sure unknown routes fall back to
  `index.html` (SPA rewrites).
- **Convex**: auth/backend stays on the project's built-in Convex setup;
  no extra config needed for the public site.

Set the production env vars (`VITE_SITE_URL`, WordPress URLs) on the hosting
platform before deploying, then swap the placeholder domain in
`public/sitemap.xml` and `public/robots.txt`.

---

## 10. Accessibility & performance notes

- WCAG 2.2 AA where practical: skip link, landmarks, visible gold focus
  states, keyboard mega-menu + mobile drawer, native `<details>` accordions,
  labelled forms with `aria-invalid`/`aria-describedby`, `aria-current`
  breadcrumbs, reduced-motion support (global CSS + count-up hook),
  meaningful alt text.
- Performance: lazy-loaded routes, lazy images, `clamp()` fluid type, no
  animation libraries beyond lightweight CSS transitions, content read via
  async service layer (loading/empty/error states built in).
- SEO: per-route `<Seo>` (title, description, canonical, Open Graph, Twitter
  cards), JSON-LD for `EducationalOrganization`, `Article`, `Event`,
  `Course` and `BreadcrumbList`, plus static `robots.txt` and `sitemap.xml`.

---

## 11. What's next

1. Supply official logo, photography, statistics and copy.
2. Stand up WordPress with the content model in §8 and flip on the env vars.
3. Wire forms to a real backend (WordPress/HubSpot/Gravity) in
   `src/lib/forms.ts`.
4. Add a real Student Portal behind `/portal` when student systems exist.
