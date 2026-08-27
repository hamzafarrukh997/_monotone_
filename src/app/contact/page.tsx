import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Monotone by email or WhatsApp.",
};

export default function ContactPage() {
  const { contact } = site;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <>
      <h1>Contact</h1>
      <dl>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </dd>
        <dt>WhatsApp</dt>
        <dd>
          <a href={whatsappHref}>{contact.whatsapp}</a>
        </dd>
        <dt>Location</dt>
        <dd>{contact.location}</dd>
        <dt>Availability</dt>
        <dd>{contact.availability}</dd>
      </dl>
    </>
  );
}
