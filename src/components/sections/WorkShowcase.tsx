import { home } from "@/content/home";
import { portfolio } from "@/content/portfolio";
import { routes } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";

export function WorkShowcase() {
  const { heading, cta } = home.work;

  return (
    <section
      className="bg-white text-fg"
      aria-labelledby="work-showcase-heading"
    >
      <div className="mx-auto w-full max-w-[120rem] px-5 pt-24 pb-28 md:px-8 lg:px-10 lg:pt-28 lg:pb-32">
        <div className="mb-14 flex flex-col items-start gap-6 lg:mb-[4.25rem] lg:flex-row lg:items-center lg:justify-between">
          <h2
            id="work-showcase-heading"
            className="m-0 text-left font-display text-[clamp(3rem,4.17vw,5rem)] leading-[1.4] font-normal tracking-[-0.06em]"
          >
            {heading.before}
            <span className="text-accent">{heading.accent}</span>
          </h2>

          <Button
            href={cta.href}
            variant="secondary"
            size="lg"
            className="home-heading-cta h-14 shrink-0 px-8 text-base"
          >
            <span className="home-heading-cta__label">{cta.label}</span>
          </Button>
        </div>

        <ul className="m-0 grid list-none gap-x-5 gap-y-12 p-0 md:grid-cols-2">
          {portfolio.map((item) => (
            <li className="min-w-0" key={item.slug}>
              <Link
                href={routes.workItem(item.slug)}
                className="group block text-fg no-underline hover:text-fg"
                aria-label={`View ${item.client} project`}
              >
                <article>
                  <div
                    className="relative aspect-[91/64] overflow-hidden rounded-[clamp(1rem,1.25vw,1.5rem)] bg-[#d1d1d1]"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(255,90,31,0.24),transparent_48%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
                    <span className="absolute inset-[1px] rounded-[inherit] border border-[#2b2b2b]/0 transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.985] group-hover:border-[#2b2b2b]/45" />
                  </div>

                  <h3 className="mt-4 flex items-center gap-3 font-display text-[clamp(1.65rem,1.9vw,2.25rem)] leading-[1.38] font-normal tracking-[-0.06em]">
                    <span>{item.client}</span>
                    <span
                      className="inline-block text-[1.25em] leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </h3>
                </article>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
