import { AboutMico } from "@/components/home/AboutMico";
import { AudienceQuickLinks } from "@/components/home/AudienceQuickLinks";
import { CampusExperience } from "@/components/home/CampusExperience";
import { FeaturedFaculties } from "@/components/home/FeaturedFaculties";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { LatestNews } from "@/components/home/LatestNews";
import { ResearchImpact } from "@/components/home/ResearchImpact";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ProgrammeFinder } from "@/features/programmes/ProgrammeFinder";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { educationalOrganizationJsonLd, Seo } from "@/lib/seo";

/**
 * Homepage — assembles the sections in editorial order. Each section is its
 * own component; the homepage itself stays thin.
 */
export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="The Mico University College — shaping educators and transforming Jamaica through excellence in education, leadership, research and national development."
        jsonLd={[educationalOrganizationJsonLd()]}
      />

      <Hero />

      <AudienceQuickLinks />

      {/* Programme finder */}
      <section className="bg-white py-16 sm:py-24" aria-labelledby="programmes-heading">
        <div className="container-site">
          <SectionHeading
            id="programmes-heading"
            eyebrow="Programmes"
            title="Find your programme"
            description="Search and filter undergraduate, graduate, certificate and professional development offerings."
          />
          <div className="mt-10">
            <ProgrammeFinder preview />
          </div>
        </div>
      </section>

      <AboutMico />
      <FeaturedFaculties />
      <StatsSection />
      <CampusExperience />
      <ResearchImpact />
      <LatestNews />
      <UpcomingEvents />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
