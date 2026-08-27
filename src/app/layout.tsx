import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Parkinsans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const parkinsans = Parkinsans({
  subsets: ["latin"],
  variable: "--font-parkinsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.shortDescription}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.shortDescription}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.shortDescription}`,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { contact } = site;
  const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <html lang="en" className={`${jakarta.variable} ${parkinsans.variable}`}>
      <body>
        {/* Header — rendered entirely from content/site.ts. Unstyled. */}
        <header>
          <nav aria-label="Primary">
            <a href="/">{site.name}</a>
            <ul>
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                  {item.children ? (
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <a href={child.href}>{child.label}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
              <li>
                <a href={site.cta.href}>{site.cta.label}</a>
              </li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        {/* Footer — rendered entirely from content/site.ts. Unstyled. */}
        <footer>
          {site.footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            <a href={whatsappHref}>WhatsApp: {contact.whatsapp}</a>
            <br />
            {contact.location}
            <br />
            {contact.availability}
          </address>
        </footer>
      </body>
    </html>
  );
}
