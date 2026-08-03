import { SectionHeading } from "@/components/shared/SectionHeading";
import { campusFeatures } from "@/data/campus";
import { images } from "@/data/images";
import { Icon } from "@/lib/icon-map";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/** Campus & student experience — editorial image band plus six feature cards. */
export function CampusExperience() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="campus-heading">
      <div className="container-site">
        <SectionHeading
          id="campus-heading"
          eyebrow="Campus & student experience"
          title="More than a classroom"
          description="Life at Mico is full and warm — organisations, sport, the arts, support and a community that feels like family."
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative overflow-hidden">
            <img
              src={images.studentsWalking.src}
              alt={images.studentsWalking.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[16/11] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="font-display text-xl font-bold text-white sm:text-2xl">
                Welcome to the Mico community
              </p>
              <p className="mt-2 max-w-md text-sm text-white/75">
                From your first orientation week to graduation day, you will be
                part of something bigger than yourself. (Placeholder copy.)
              </p>
              <Link
                to="/student-life"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-mico-gold transition-colors hover:text-white"
              >
                Discover student life
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>

          <ul className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
            {campusFeatures.map((feature) => (
              <li key={feature.id} className="bg-white">
                <Link
                  to={feature.href}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-mico-gold-soft"
                >
                  <span className="flex size-10 items-center justify-center rounded-sm bg-black text-mico-gold transition-colors group-hover:bg-mico-gold group-hover:text-black">
                    <Icon name={feature.icon} className="size-4.5" />
                  </span>
                  <h3 className="mt-4 font-display text-sm font-bold text-black">
                    {feature.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-mico-mid">
                    {feature.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-mico-gold-deep">
                    Learn more
                    <ArrowRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
