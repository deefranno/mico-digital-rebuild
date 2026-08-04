import type { Testimonial } from "@/types";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/** Student story — quotation, portrait, programme and story link. */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col border border-black/10 bg-white p-7 transition-all duration-300 hover:border-black hover:shadow-lg">
      <Quote aria-hidden="true" className="size-7 text-mico-gold" />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-mico-dark">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-black/10 pt-5">
        {testimonial.image ? (
          <img
            src={testimonial.image.src}
            alt={testimonial.image.alt}
            loading="lazy"
            decoding="async"
            className="size-12 rounded-full object-cover grayscale"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-full bg-black font-display text-sm font-extrabold text-mico-gold"
          >
            {testimonial.name.charAt(0)}
          </span>
        )}
        <div>
          <p className="text-sm font-bold text-black">{testimonial.name}</p>
          <p className="text-xs text-mico-mid">
            {testimonial.programme} · {testimonial.graduationYear}
          </p>
        </div>
      </figcaption>
      {testimonial.storyLink && (
        <Link
          to={testimonial.storyLink}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors hover:text-mico-gold-deep"
        >
          Read their story
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </figure>
  );
}
