import { CTAButton } from "@/components/shared/CTAButton";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { images } from "@/data/images";
import { siteConfig } from "@/data/site";
import { ArrowRight, Check } from "lucide-react";

const missionPoints = [
  "Excellence in teacher education and professional formation",
  "Research and innovation that serve Jamaica and the Caribbean",
  "Access, equity and inclusion for every learner",
  "Partnership with schools, communities and the nation",
];

/** Two-column editorial About section. */
export function AboutMico() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="about-heading">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <img
            src={images.campusLawn.src}
            alt={images.campusLawn.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-4 hidden border border-black bg-white px-6 py-5 sm:block lg:-right-8">
            <p className="font-display text-3xl font-extrabold text-black">
              Est. {siteConfig.founded}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-mico-gold-deep">
              A legacy of leadership
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            id="about-heading"
            eyebrow="About Mico"
            title="A proud Jamaican institution shaping the nation's teachers"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-mico-dark">
            <p>
              The Mico University College is one of Jamaica's oldest and most
              respected teacher-education institutions. Since {siteConfig.founded},
              Mico has prepared generations of educators who went on to shape
              classrooms, schools and communities across the island and the wider
              Caribbean. (Placeholder copy.)
            </p>
            <p>
              Today Mico is a modern, forward-looking university college —
              rooted in its Jamaican heritage and committed to leadership in
              education, research and national development.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {missionPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-mico-dark">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mico-gold text-black">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <CTAButton href="/about" variant="black">
              Learn About Mico
              <ArrowRight aria-hidden="true" className="size-4" />
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
