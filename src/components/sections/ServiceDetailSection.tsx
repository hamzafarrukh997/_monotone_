import Image from "next/image";
import type { ServiceDetailSection as ServiceDetailSectionContent } from "@/content/services";
import { Button } from "@/components/ui/Button";

type ServiceDetailSectionProps = {
  section: ServiceDetailSectionContent;
  connectTimelineFromTop?: boolean;
  showCta?: boolean;
};

export function ServiceDetailSection({
  section,
  connectTimelineFromTop = false,
  showCta = false,
}: ServiceDetailSectionProps) {
  const sectionId = `service-detail-${section.slug}`;
  const headingId = `${sectionId}-heading`;
  const isPreviewOnly = section.previewOnly === true;

  return (
    <section
      id={sectionId}
      className={`relative overflow-hidden bg-white text-[#2b2b2b] ${
        isPreviewOnly
          ? "xl:h-[clamp(20rem,20vw,24rem)]"
          : "xl:h-[clamp(34.375rem,42.917vw,51.5rem)]"
      }`}
      aria-labelledby={headingId}
    >
      <div className="relative mx-auto h-full w-full max-w-[120rem]">
        <div
          aria-hidden="true"
          className={`absolute left-[clamp(2rem,2.083vw,2.5rem)] hidden w-px bg-accent xl:block ${
            isPreviewOnly
              ? "top-0 h-[calc(clamp(6rem,9.948vw,11.9375rem)+2.375rem)]"
              : `bottom-0 ${
                  connectTimelineFromTop
                    ? "top-0"
                    : "top-[calc(clamp(6rem,9.948vw,11.9375rem)+2.375rem)]"
                }`
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute top-[calc(clamp(6rem,9.948vw,11.9375rem)+2rem)] left-[calc(clamp(2rem,2.083vw,2.5rem)-0.375rem)] hidden size-3 rounded-full bg-accent xl:block"
        />

        <div className="grid gap-14 px-6 py-20 sm:px-8 xl:h-full xl:grid-cols-[38.37%_25.16%_27.34%] xl:gap-x-[2.72%] xl:gap-y-0 xl:px-[clamp(2rem,2.083vw,2.5rem)] xl:pt-[clamp(6rem,9.948vw,11.9375rem)] xl:pb-[clamp(1.25rem,2.031vw,2.4375rem)]">
          <div className="min-w-0 xl:h-full">
            <h2
              id={headingId}
              className="font-sans text-[clamp(2.75rem,3.125vw,3.75rem)] leading-[1.2] font-normal tracking-[-0.06em] xl:ml-[6.66%]"
            >
              {section.title}
            </h2>

            {!isPreviewOnly ? (
              <ul className="mt-12 border-t border-[#7f7f7f]/75 xl:mt-[clamp(3.5rem,5.729vw,6.875rem)] xl:ml-[6.09%]">
                {section.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex min-h-16 items-center border-b border-[#7f7f7f]/75 font-sans text-[clamp(1.25rem,1.5625vw,1.875rem)] leading-tight font-normal tracking-[-0.06em] xl:min-h-[clamp(2.6rem,3.75vw,4.5rem)]"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {!isPreviewOnly ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#f2eee9] xl:h-full xl:aspect-auto">
              {section.image ? (
                <Image
                  src={section.image}
                  alt={section.mediaLabel}
                  fill
                  sizes="(min-width: 1280px) 25vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span
                  role="img"
                  aria-label={section.mediaLabel}
                  className="absolute inset-0"
                />
              )}
            </div>
          ) : null}

          {!isPreviewOnly ? (
            <div className="flex min-w-0 flex-col xl:h-full xl:pt-[0.6875rem]">
              <div className="space-y-[1.35em] font-sans text-[clamp(1rem,1.097vw,1.316rem)] leading-[1.35] font-normal tracking-[-0.02em]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {showCta ? (
                <Button
                  href={section.cta.href}
                  className="mt-10 h-[3.125rem] w-[9.8125rem] !px-0 text-[1.25rem] font-light tracking-[-0.03em] xl:mt-auto"
                >
                  {section.cta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
