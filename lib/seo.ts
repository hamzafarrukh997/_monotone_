import type { Metadata } from "next";
import { site } from "@/content/site";

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Keep search and social metadata aligned with each page's canonical URL. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: socialTitle,
      description,
      url,
      images: image ? [{ url: absoluteUrl(image) }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
}

export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
