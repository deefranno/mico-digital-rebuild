import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getFaculties } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";
import { breadcrumbJsonLd, Seo } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Faculties() {
  const state = useAsyncData(getFaculties);
  const faculties = state.data ?? [];

  return (
    <>
      <Seo
        title="Faculties & Departments"
        description="Explore the academic units of The Mico University College — faculties, schools and their departments."
        path="/faculties"
        jsonLd={[
          breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Academics", href: "/academics" },
            { label: "Faculties", href: "/faculties" },
          ]),
        ]}
      />

      <PageHeader
        eyebrow="Faculties & departments"
        title="The academic units of Mico"
        description="Five faculties and schools deliver our programmes — each with its own departments, staff and community. (Placeholder structure to be confirmed.)"
        crumbs={[
          { label: "Academics", href: "/academics" },
          { label: "Faculties" },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site space-y-14">
          {state.status === "loading" &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse border border-black/5 bg-mico-light" />
            ))}

          {state.status === "success" &&
            faculties.map((faculty, index) => (
              <article
                key={faculty.id}
                id={faculty.slug}
                className="grid gap-8 border border-black/10 bg-white p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]"
                aria-labelledby={`${faculty.slug}-heading`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-3xl font-extrabold text-mico-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-black/15" />
                  </div>
                  <h2
                    id={`${faculty.slug}-heading`}
                    className="mt-4 font-display text-2xl font-extrabold text-black"
                  >
                    {faculty.name}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-mico-mid">
                    {faculty.description}
                  </p>
                  {faculty.image && (
                    <img
                      src={faculty.image.src}
                      alt={faculty.image.alt}
                      loading="lazy"
                      decoding="async"
                      className="mt-6 aspect-[16/9] w-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-mico-gold-deep">
                    Departments
                  </h3>
                  <ul className="mt-5 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
                    {faculty.departments.map((department) => (
                      <li key={department.name} className="bg-mico-light p-5">
                        <p className="text-sm font-bold text-black">{department.name}</p>
                        {department.description && (
                          <p className="mt-1 text-xs leading-relaxed text-mico-mid">
                            {department.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/programmes"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-mico-gold-deep"
                  >
                    Programmes in this faculty
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
        </div>
      </section>
    </>
  );
}
