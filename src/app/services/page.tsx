import type { Metadata } from "next";
import { services, routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design, web development, growth marketing, and maintenance & support.",
};

export default function ServicesPage() {
  return (
    <>
      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.slug}>
            <a href={routes.service(service.slug)}>{service.title}</a> —{" "}
            {service.excerpt}
          </li>
        ))}
      </ul>

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Book a call</a>
      </section>
    </>
  );
}
