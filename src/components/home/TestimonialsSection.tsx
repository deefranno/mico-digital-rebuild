import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getTestimonials } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";

/**
 * Student stories. Rendered as a static, accessible grid (no autoplay
 * carousel) so all content is available to every user — see WCAG 2.2.2.
 */
export function TestimonialsSection() {
  const state = useAsyncData(getTestimonials);
  const testimonials = state.data ?? [];

  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="stories-heading">
      <div className="container-site">
        <SectionHeading
          id="stories-heading"
          eyebrow="Student stories"
          title="In their own words"
          description="Placeholder stories — names and details are illustrative and will be replaced with real, consented student experiences."
          align="center"
        />
        {state.status === "loading" && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse border border-black/5 bg-mico-light" />
            ))}
          </div>
        )}
        {state.status === "success" && (
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
