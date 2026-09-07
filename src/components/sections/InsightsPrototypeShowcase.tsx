import { home } from "@/content/home";
import { Link } from "@/components/ui/Link";

function PlaceholderArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative h-full overflow-hidden bg-[#e5e4e1]" aria-hidden="true">
        <span className="absolute top-[15%] left-[22%] h-[60%] w-[56%] rotate-[-3deg] rounded-[1.25rem] border-[5px] border-[#171717] bg-white shadow-[12px_15px_0_#171717]" />
        <span className="absolute top-[29%] left-[32%] h-[27%] w-[36%] rounded-lg bg-[#171717]" />
        <span className="absolute top-[37%] left-[38%] h-3 w-[24%] rounded-full bg-[#ff5a1f]" />
        <span className="absolute top-[45%] left-[38%] h-2 w-[18%] rounded-full bg-white/80" />
        <span className="absolute top-[4%] left-[26%] grid h-16 w-16 place-items-center rounded-lg border-2 border-[#171717] bg-white font-sans text-sm font-bold text-[#171717]">
          UI
        </span>
        <span className="absolute right-[18%] bottom-[8%] grid h-16 w-20 place-items-center rounded-lg border-2 border-[#171717] bg-white font-mono text-sm font-bold text-[#171717]">
          &lt;/&gt;
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#e8e7e4]" aria-hidden="true">
      <span
        className={`absolute left-1/2 aspect-square w-[64%] -translate-x-1/2 rounded-full bg-accent ${index === 1 ? "top-[12%]" : "top-[16%]"}`}
      />
      <span className="absolute bottom-[10%] left-[27%] h-[43%] w-[21%] rotate-[-8deg] rounded-t-[3rem] rounded-b-2xl border-[4px] border-[#171717] bg-white" />
      <span className="absolute right-[27%] bottom-[10%] h-[43%] w-[21%] rotate-[8deg] rounded-t-[3rem] rounded-b-2xl border-[4px] border-[#171717] bg-[#171717]" />
      <span className="absolute bottom-[19%] left-[42%] h-[22%] w-[16%] rotate-[-12deg] rounded-md border-[3px] border-[#171717] bg-white" />
      <span className="absolute top-0 left-1/2 h-[31%] w-px bg-[#171717]/35" />
      <span className="absolute top-[27%] left-1/2 size-7 -translate-x-1/2 rounded-full bg-[#171717]" />
      <span className="absolute top-[33%] left-1/2 h-10 w-5 -translate-x-1/2 rounded-b-full bg-white shadow-[0_0_0_4px_#171717]" />
    </div>
  );
}

export function InsightsPrototypeShowcase() {
  const { heading, cta, articles } = home.insightsPrototype;

  return (
    <section
      className="bg-white text-[#171717]"
      aria-labelledby="insights-prototype-heading"
    >
      <div className="mx-auto w-full max-w-[96rem] px-5 py-20 md:px-8 lg:px-10 lg:py-24">
        <h2
          id="insights-prototype-heading"
          className="m-0 mb-14 text-center font-display text-[clamp(3rem,4.17vw,5rem)] leading-[1.08] font-normal tracking-[-0.06em] text-[#171717] lg:mb-16"
        >
          {heading}
          <span className="text-accent">.</span>
        </h2>

        <ul className="m-0 grid list-none gap-8 p-0 md:grid-cols-2 xl:grid-cols-3 xl:items-start xl:gap-16">
          {articles.map((article, index) => {
            return (
              <li
                className={
                  index === 2
                    ? "md:col-span-2 md:mx-auto md:w-[calc(50%_-_1rem)] xl:col-span-1 xl:mx-0 xl:w-auto"
                    : ""
                }
                key={article.title}
              >
                <Link
                  href={article.href}
                  className="group/prototype block h-full text-[#171717] no-underline hover:text-[#171717]"
                  aria-label={`Read ${article.title}`}
                >
                  <article className="relative isolate flex h-full flex-col xl:min-h-[36rem] xl:pt-10">
                    <span
                      className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-white opacity-0 shadow-[0_20px_60px_rgba(20,20,20,0.065)] transition-[opacity,box-shadow] duration-500 ease-in-out group-hover/prototype:opacity-100 md:-inset-x-2 md:-inset-y-4 xl:-inset-x-4 xl:-inset-y-6"
                      aria-hidden="true"
                    />

                    <div className="relative z-10 aspect-[1.76/1] overflow-hidden rounded-xl bg-[#e5e4e1]">
                      <PlaceholderArtwork index={index} />
                    </div>

                    <div className="relative z-10 mt-6 flex items-center justify-between gap-5 font-sans text-sm font-medium text-[#686b70]">
                      <p>{article.category}</p>
                      <time className="shrink-0" dateTime={article.dateIso}>
                        {article.date}
                      </time>
                    </div>

                    <h3 className="relative z-10 mt-4 font-display text-[clamp(1.5rem,1.6vw,1.9rem)] leading-[1.28] font-semibold tracking-[-0.04em] transition-colors duration-300 group-hover/prototype:text-accent">
                      {article.title}
                    </h3>

                    <div className="relative z-10 mt-auto flex items-center gap-4 pt-8">
                      <span
                        className="grid size-14 shrink-0 place-items-center rounded-full bg-[#171717] font-display text-base font-semibold text-white"
                        aria-hidden="true"
                      >
                        {article.author.charAt(0)}
                      </span>
                      <div className="font-sans">
                        <p className="font-bold text-[#4e5359]">{article.author}</p>
                        <p className="mt-1 text-sm text-[#686b70]">
                          {article.role}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex justify-center lg:mt-20">
          <Link
            href={cta.href}
            className="inline-flex min-h-16 min-w-[17rem] items-center justify-center border border-[#171717] px-8 font-sans text-sm font-bold text-[#171717] no-underline transition-colors duration-300 hover:bg-[#171717] hover:text-white"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
