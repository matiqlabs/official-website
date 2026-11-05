import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { BlogPageClient } from "@/components/BlogPageClient";
import { blogPosts, toBlogArticle } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog - Matiq Labs",
  description:
    "Ideas on AI automation, operations, workflows, and building faster businesses with intelligent systems.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog - Matiq Labs",
    description:
      "Ideas on AI automation, operations, workflows, and building faster businesses with intelligent systems.",
    url: "/blog",
  },
};

function publicImageExists(src?: string) {
  if (!src) return false;
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}

export default function Page() {
  const preparedArticles = blogPosts.map((post) => {
    const article = toBlogArticle(post);
    return { ...article, hasImage: publicImageExists(article.image) };
  });

  return <BlogPageClient articles={preparedArticles} />;
}
