import type { Metadata } from "next";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website & Digital Marketing Case Studies",
  description:
    "See how Monotone approaches website design, development, and growth through selected client projects and their results.",
  path: "/work",
});

export default function WorkPage() {
  return <WorkIndex />;
}
