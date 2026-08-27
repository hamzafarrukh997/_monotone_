import type { Metadata } from "next";
import { portfolio, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies from Monotone.",
};

export default function WorkPage() {
  return (
    <>
      <h1>Work</h1>
      <ul>
        {portfolio.map((item) => (
          <li key={item.slug}>
            <a href={routes.workItem(item.slug)}>{item.title}</a> — {item.summary}
          </li>
        ))}
      </ul>

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Book a call</a>
      </section>
    </>
  );
}
