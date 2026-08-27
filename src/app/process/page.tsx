import type { Metadata } from "next";
import { portfolio, offers, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Process",
  description: "How Monotone works: discover, design, build, grow.",
};

const steps = [
  { title: "Discover", body: "We dig into your goals, users, and constraints." },
  { title: "Design", body: "We shape the experience and brand, validating direction." },
  { title: "Build", body: "We develop in fast, reviewable increments." },
  { title: "Grow", body: "We measure, iterate, and compound results." },
];

export default function ProcessPage() {
  return (
    <>
      <h1>Process</h1>

      <section aria-label="The stages">
        <h2>The stages</h2>
        <ol>
          {steps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong> — {step.body}
            </li>
          ))}
        </ol>
      </section>

      {/* Cross-links: Offers */}
      <section aria-label="Offers">
        <h2>Ready-made ways to start</h2>
        <ul>
          {offers.map((offer) => (
            <li key={offer.slug}>
              <a href={routes.offer(offer.slug)}>{offer.title}</a>
            </li>
          ))}
        </ul>
        <a href={routes.offers}>All offers</a>
      </section>

      {/* Cross-links: Portfolio */}
      <section aria-label="Work">
        <h2>The process in action</h2>
        <ul>
          {portfolio.map((item) => (
            <li key={item.slug}>
              <a href={routes.workItem(item.slug)}>{item.title}</a>
            </li>
          ))}
        </ul>
        <a href={routes.work}>All work</a>
      </section>

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Book a call</a>
      </section>
    </>
  );
}
