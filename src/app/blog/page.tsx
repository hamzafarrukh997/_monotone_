import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { routes } from "@/lib/links";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes on design, web development, and growth.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <h1>Insights</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={routes.post(post.slug)}>{post.title}</a>
            <br />
            <small>{post.date}</small> — {post.excerpt}
          </li>
        ))}
      </ul>

      <section aria-label="Contact call to action">
        <a href={routes.contact}>Book a call</a>
      </section>
    </>
  );
}
