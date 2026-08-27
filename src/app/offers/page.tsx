import type { Metadata } from "next";
import { offers, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Offers",
  description: "Productised ways to work with Monotone.",
};

export default function OffersPage() {
  return (
    <>
      <h1>Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.slug}>
            <a href={routes.offer(offer.slug)}>{offer.title}</a> — {offer.summary}
          </li>
        ))}
      </ul>

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Book a call</a>
      </section>
    </>
  );
}
