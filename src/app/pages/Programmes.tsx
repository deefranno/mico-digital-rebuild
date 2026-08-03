import { ProgrammeFinder } from "@/features/programmes/ProgrammeFinder";
import { PageHeader } from "@/components/shared/PageHeader";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { useSearchParams } from "react-router";

export default function Programmes() {
  const [searchParams] = useSearchParams();
  const levelParam = searchParams.get("level") ?? undefined;

  return (
    <>
      <Seo
        title="Programmes"
        description="Browse all programmes at The Mico University College — undergraduate, graduate, certificate, professional development and short courses."
        path="/programmes"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Academics", href: "/academics" },
            { label: "Programmes", href: "/programmes" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Programmes"
        title="Find the right programme"
        description="Search by title, filter by study level, subject area or delivery method. All programme details are placeholder until confirmed by the institution."
        crumbs={[
          { label: "Academics", href: "/academics" },
          { label: "Programmes" },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site">
          <ProgrammeFinder initialLevel={levelParam} />
        </div>
      </section>
    </>
  );
}
