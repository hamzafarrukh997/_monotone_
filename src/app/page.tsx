import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { site } from "@/content/site";
import { services, offers, portfolio, routes } from "@/lib/links";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  description: site.description,
};

const faqs = [
  {
    q: "How do we get started?",
    a: "Book a call and we'll scope the work, agree a plan, and get moving.",
  },
  {
    q: "Do you work with our existing team?",
    a: "Yes. We slot in alongside in-house teams or run the whole engagement.",
  },
  {
    q: "What does it cost?",
    a: "Most work is fixed-scope or a monthly retainer. Reach out for a number.",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero (Phase 2 — designed). Other sections below are still placeholders. */}
      <Hero />

      {/* Services */}
      <section aria-label="Services">
        <h2>What we do</h2>
        <ul>
          {services.map((service) => (
            <li key={service.slug}>
              <a href={routes.service(service.slug)}>{service.title}</a>
            </li>
          ))}
        </ul>
        <a href={routes.services}>All services</a>
      </section>

      {/* Offers */}
      <section aria-label="Offers">
        <h2>Ways to work with us</h2>
        <ul>
          {offers.map((offer) => (
            <li key={offer.slug}>
              <a href={routes.offer(offer.slug)}>{offer.title}</a>
            </li>
          ))}
        </ul>
        <a href={routes.offers}>All offers</a>
      </section>

      {/* Portfolio */}
      <section aria-label="Selected work">
        <h2>Selected work</h2>
        <ul>
          {portfolio.map((item) => (
            <li key={item.slug}>
              <a href={routes.workItem(item.slug)}>{item.title}</a>
            </li>
          ))}
        </ul>
        <a href={routes.work}>All work</a>
      </section>

      {/* Process */}
      <section aria-label="Process">
        <h2>A simple, repeatable process</h2>
        <p>Discover, design, build, grow.</p>
        <a href={routes.process}>See how we work</a>
      </section>

      {/* Insights */}
      <section aria-label="Insights">
        <h2>Insights</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={routes.post(post.slug)}>{post.title}</a>
            </li>
          ))}
        </ul>
        <a href={routes.blog}>All insights</a>
      </section>

      {/* FAQ (section only — links to Contact) */}
      <section aria-label="Frequently asked questions">
        <h2>Frequently asked</h2>
        <dl>
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt>{faq.q}</dt>
              <dd>{faq.a}</dd>
            </div>
          ))}
        </dl>
        <p>
          Still have a question? <a href={routes.contact}>Get in touch</a>.
        </p>
      </section>

      {/* Final CTA */}
      <section aria-label="Contact call to action">
        <h2>Have a project in mind?</h2>
        <a href={routes.contact}>{site.cta.label}</a>
      </section>
    </>
  );
}
