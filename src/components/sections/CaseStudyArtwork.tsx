import Image from "next/image";
import type { CaseStudy, CaseStudyImage } from "@/content/portfolio";

type CaseStudyArtworkProps = {
  study: CaseStudy;
  number: string;
  label?: string;
  /**
   * Explicit media for this slot.
   * - omitted: use the case study hero image (work cards)
   * - CaseStudyImage: render that image
   * - null: force the designed placeholder
   */
  image?: CaseStudyImage | null;
};

function getHeroImage(study: CaseStudy) {
  return study.images.find((entry) => entry.role === "hero" && entry.src);
}

/** Case-study media for work cards and detail pages. Falls back to designed placeholder art. */
export function CaseStudyArtwork({
  study,
  number,
  label = "MONOTONE / WORK",
  image,
}: CaseStudyArtworkProps) {
  const media = image === null ? undefined : (image ?? getHeroImage(study));

  if (media?.src) {
    return (
      <div className="absolute inset-0">
        <Image
          src={media.src}
          alt={media.alt || `${study.client} project`}
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/work-card:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      className="work-placeholder-art"
      data-visual={study.visual}
      role="img"
      aria-label={`${study.client} project image placeholder`}
    >
      <div className="work-placeholder-art__meta" aria-hidden="true">
        <span>{label}</span>
        <span>{number}</span>
      </div>
      <span className="work-placeholder-art__word" aria-hidden="true">
        PROJECT
        <br />
        {number}
      </span>
      <span className="work-placeholder-art__shape work-placeholder-art__shape--one" aria-hidden="true" />
      <span className="work-placeholder-art__shape work-placeholder-art__shape--two" aria-hidden="true" />
      <span className="work-placeholder-art__shape work-placeholder-art__shape--three" aria-hidden="true" />
    </div>
  );
}
