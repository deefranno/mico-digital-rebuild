import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ImageFeatureProps {
  src: string;
  alt: string;
  aspect?: "video" | "square" | "auto";
  caption?: ReactNode;
  className?: string;
  /** Use grayscale treatment (minimalism accent) */
  grayscale?: boolean;
}

/**
 * Editorial image wrapper: consistent aspect ratio, lazy loading, subtle
 * grayscale hover and an optional caption bar.
 */
export function ImageFeature({
  src,
  alt,
  aspect = "video",
  caption,
  className,
  grayscale = false,
}: ImageFeatureProps) {
  const aspectClass =
    aspect === "video"
      ? "aspect-[16/10]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-auto";
  return (
    <figure className={cn("group overflow-hidden", className)}>
      <div className={cn("w-full overflow-hidden bg-mico-light", aspectClass)}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn(
            "h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]",
            grayscale && "grayscale group-hover:grayscale-0",
          )}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 border-l-2 border-mico-gold pl-3 text-sm text-mico-mid">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
