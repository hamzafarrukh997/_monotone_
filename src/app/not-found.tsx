import type { Metadata } from "next";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section aria-label="Page not found">
      <h1>Page not found</h1>
      <p>The link may be broken or the page may have moved.</p>
      <ul>
        <li>
          <a href={routes.home}>Home</a>
        </li>
        <li>
          <a href={routes.work}>Work</a>
        </li>
        <li>
          <a href={routes.services}>Services</a>
        </li>
        <li>
          <a href={routes.contact}>Contact</a>
        </li>
      </ul>
    </section>
  );
}
