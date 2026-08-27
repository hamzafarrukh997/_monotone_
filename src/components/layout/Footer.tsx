import type { ComponentProps } from "react";
import NextLink from "next/link";
import { site } from "@/content/site";

type NextLinkHref = ComponentProps<typeof NextLink>["href"];

/** Site footer. Renders entirely from content/site.ts (groups + contact block). */
export function Footer() {
  const { contact } = site;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-page px-4 py-section sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand + contact */}
          <div className="md:col-span-1">
            <p className="text-base font-semibold text-fg">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              {site.shortDescription}
            </p>
            <address className="mt-4 space-y-1 text-sm not-italic text-muted">
              <div>
                <a className="hover:text-fg" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
              <div>
                <a
                  className="hover:text-fg"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {contact.whatsapp}
                </a>
              </div>
              <div>{contact.location}</div>
              <div>{contact.availability}</div>
            </address>
          </div>

          {/* Link groups */}
          {site.footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold text-fg">{group.title}</h2>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NextLink
                      href={item.href as unknown as NextLinkHref}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
