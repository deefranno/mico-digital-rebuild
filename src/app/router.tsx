import { RequireAuth } from "@/components/RequireAuth";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { lazy } from "react";
import { Route, Routes } from "react-router";

/**
 * Route table for the public website. Each page is lazy-loaded for code
 * splitting; the public shell (header/footer) wraps all content routes.
 */
const Home = lazy(() => import("@/app/pages/Home"));
const About = lazy(() => import("@/app/pages/About"));
const Admissions = lazy(() => import("@/app/pages/Admissions"));
const Academics = lazy(() => import("@/app/pages/Academics"));
const Programmes = lazy(() => import("@/app/pages/Programmes"));
const ProgrammeDetail = lazy(() => import("@/app/pages/ProgrammeDetail"));
const Faculties = lazy(() => import("@/app/pages/Faculties"));
const Research = lazy(() => import("@/app/pages/Research"));
const StudentLife = lazy(() => import("@/app/pages/StudentLife"));
const News = lazy(() => import("@/app/pages/News"));
const NewsArticle = lazy(() => import("@/app/pages/NewsArticle"));
const Events = lazy(() => import("@/app/pages/Events"));
const EventDetail = lazy(() => import("@/app/pages/EventDetail"));
const Alumni = lazy(() => import("@/app/pages/Alumni"));
const Contact = lazy(() => import("@/app/pages/Contact"));
const SearchResults = lazy(() => import("@/app/pages/SearchResults"));
const Policies = lazy(() => import("@/app/pages/Policies"));
const Portal = lazy(() => import("@/app/pages/Portal"));
const AuthPage = lazy(() => import("@/app/pages/Auth"));
const NotFound = lazy(() => import("@/app/pages/NotFound"));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/programmes/:slug" element={<ProgrammeDetail />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/research" element={<Research />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/policies" element={<Policies />} />
        <Route
          path="/portal"
          element={
            <RequireAuth>
              <Portal />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Standalone auth flow (no public chrome) */}
      <Route path="/auth" element={<AuthPage redirectAfterAuth="/portal" />} />
    </Routes>
  );
}
