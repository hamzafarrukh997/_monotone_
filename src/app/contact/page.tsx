import type { Metadata } from "next";
import { site } from "@/content/site";
import { ContactProjectTrigger } from "@/components/sections/ContactProjectTrigger";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Monotone what you are building, what is not working, or where your business needs to go next.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = site;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <section
      className="mx-auto w-full max-w-[120rem] bg-white px-5 pt-6 pb-24 text-[#2b2b2b] md:px-8 md:pt-8 md:pb-32 lg:px-10 lg:pt-10 lg:pb-40"
      aria-labelledby="contact-heading"
    >
      <div className="relative isolate min-h-[clamp(44rem,75svh,58rem)] overflow-hidden rounded-[clamp(1.25rem,1.8vw,2.25rem)] bg-[#f2eee9]">
        <div
          aria-hidden="true"
          className="absolute -right-[12%] -bottom-[26%] size-[clamp(18rem,42vw,50rem)] rounded-full border border-[#2b2b2b]/12"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[2%] -bottom-[19%] size-[clamp(12rem,28vw,33rem)] rounded-full border border-accent/55"
        />
        <div
          aria-hidden="true"
          className="absolute right-[4%] bottom-[2%] size-[clamp(6rem,13vw,15rem)] rounded-full bg-accent"
        />
        <div
          aria-hidden="true"
          className="absolute top-[49%] -left-[8%] h-px w-[116%] -rotate-[7deg] bg-[#2b2b2b]/22"
        />

        <div className="relative z-10 flex min-h-[inherit] flex-col px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-14 xl:px-16">
          <div className="flex items-center justify-between gap-6 font-sans text-[0.65rem] font-semibold tracking-[0.14em] uppercase md:text-xs">
            <p className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              Monotone / Contact
            </p>
            <p className="text-right text-[#2b2b2b]/55">No polished brief required</p>
          </div>

          <div className="my-auto grid gap-12 py-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:items-end lg:gap-20 lg:py-24">
            <div>
              <h1
                id="contact-heading"
                className="m-0 max-w-[11ch] font-display text-[clamp(3.75rem,6.7vw,8rem)] leading-[0.9] font-normal tracking-[-0.075em]"
              >
                Let&apos;s make something worth choosing
                <span className="text-accent">.</span>
              </h1>
            </div>

            <div className="max-w-[35rem] lg:pb-2">
              <p className="font-sans text-base leading-[1.6] font-normal text-[#2b2b2b]/72 md:text-lg">
                Bring us the rough idea, the website that has stopped pulling
                its weight, or the business you are ready to grow. We will help
                you find the clearest next step.
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <ContactProjectTrigger />
                <a
                  href={`mailto:${contact.email}`}
                  className="hero-cta hero-cta--secondary inline-flex min-h-14 items-center justify-center rounded-full border border-[#2b2b2b] px-7 font-sans text-sm font-normal text-[#2b2b2b] no-underline"
                >
                  <span className="hero-cta__label">Email us directly</span>
                </a>
              </div>
            </div>
          </div>

          <dl className="relative z-10 grid border-t border-[#2b2b2b]/25 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-[#2b2b2b]/20 py-5 sm:pr-6 lg:border-r lg:border-b-0 lg:py-6">
              <dt className="font-sans text-[0.65rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/50 uppercase">
                Email
              </dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-display text-[clamp(1.15rem,1.45vw,1.55rem)] font-normal tracking-[-0.045em] underline decoration-[#2b2b2b]/25 underline-offset-4 transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </dd>
            </div>

            <div className="border-b border-[#2b2b2b]/20 py-5 sm:border-l sm:pl-6 lg:border-r lg:border-b-0 lg:py-6 lg:pr-6">
              <dt className="font-sans text-[0.65rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/50 uppercase">
                WhatsApp
              </dt>
              <dd className="mt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[clamp(1.15rem,1.45vw,1.55rem)] font-normal tracking-[-0.045em] underline decoration-[#2b2b2b]/25 underline-offset-4 transition-colors hover:text-accent"
                >
                  {contact.whatsapp}
                </a>
              </dd>
            </div>

            <div className="border-b border-[#2b2b2b]/20 py-5 sm:pr-6 lg:border-r lg:border-b-0 lg:py-6 lg:pl-6">
              <dt className="font-sans text-[0.65rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/50 uppercase">
                Based
              </dt>
              <dd className="mt-2 font-display text-[clamp(1.15rem,1.45vw,1.55rem)] font-normal tracking-[-0.045em]">
                {contact.location}
              </dd>
            </div>

            <div className="py-5 sm:border-l sm:pl-6 lg:border-l-0 lg:py-6">
              <dt className="font-sans text-[0.65rem] font-semibold tracking-[0.13em] text-[#2b2b2b]/50 uppercase">
                Availability
              </dt>
              <dd className="mt-2 font-display text-[clamp(1.15rem,1.45vw,1.55rem)] font-normal tracking-[-0.045em]">
                {contact.availability}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
