import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Button, SectionLabel } from "@/components/ui";
import siteCopy from "@/lib/site-copy.json";
import {
  blogPosts,
  getPostBySlug,
  type ContentBlock,
} from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function publicImageExists(src?: string) {
  if (!src) return false;
  return existsSync(join(process.cwd(), "public", src.replace(/^\//, "")));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found - Matiq Labs" };
  }

  const url = `/blog/${post.slug}`;
  const images = publicImageExists(post.image) ? [post.image as string] : undefined;

  return {
    title: `${post.title} - Matiq Labs`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.dateISO,
      authors: [siteCopy.meta.siteName],
      section: post.category,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="mt-14 text-[clamp(26px,3vw,34px)] font-semibold leading-tight text-white"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-10 border-l-2 border-[#d8b45f]/60 pl-6 text-[clamp(19px,2.2vw,24px)] font-medium italic leading-[1.5] text-white/80"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={index} className="mt-6 flex flex-col gap-3">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 text-[17px] leading-8 text-white/62">
                    <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8b45f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "p":
          default:
            return (
              <p key={index} className="mt-6 text-[17px] leading-8 text-white/62">
                {block.text}
              </p>
            );
        }
      })}
    </>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = siteCopy.meta.baseUrl.replace(/\/$/, "");
  const url = `${baseUrl}/blog/${post.slug}`;
  const hasImage = publicImageExists(post.image);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    articleSection: post.category,
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: siteCopy.meta.siteName, url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: siteCopy.meta.siteName,
      logo: { "@type": "ImageObject", url: `${baseUrl}/light-mode-logo.png` },
    },
    ...(hasImage ? { image: `${baseUrl}${post.image}` } : {}),
  };

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="blog-page relative -mt-[86px] min-h-screen overflow-hidden bg-[#050507] px-5 pt-[126px] text-white sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 dark-grid opacity-35" />
      <div className="blog-page-glow blog-page-glow-a" />
      <div className="blog-page-glow blog-page-glow-b" />
      <div className="blog-page-noise" />

      <article className="relative z-10 mx-auto max-w-[760px] pb-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-[#d8b45f]"
        >
          <span aria-hidden="true">{"<-"}</span> Back to blog
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#d8b45f]/25 bg-[#d8b45f]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-[#d8b45f]">
            {post.category}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-white/42">{post.date}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-white/42">{post.readTime}</span>
        </div>

        <h1 className="mt-6 text-[clamp(34px,5vw,52px)] font-semibold leading-[1.08] text-white">
          {post.title}
        </h1>
        <p className="mt-6 text-[clamp(18px,2.4vw,21px)] leading-8 text-white/58">{post.excerpt}</p>

        {hasImage && post.image ? (
          <div className="mt-10 overflow-hidden rounded-[22px] border border-white/10">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={720}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="mt-10">
          <ContentRenderer blocks={post.content} />
        </div>
      </article>

      {related.length > 0 ? (
        <section className="relative z-10 mx-auto max-w-[1120px] pb-20">
          <SectionLabel dark>KEEP READING</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex flex-col rounded-[22px] border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-[#d8b45f]/35"
              >
                <span className="rounded-full border border-[#d8b45f]/25 bg-[#d8b45f]/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-[#d8b45f] self-start">
                  {item.category}
                </span>
                <span className="title-font mt-4 text-[20px] font-semibold leading-[1.18] text-white">
                  {item.title}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-semibold text-[#d8b45f]">
                  Read article <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="relative z-10 mx-auto max-w-[820px] pb-20 lg:pb-24">
        <div className="blog-cta mx-auto text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] !text-[#d8b45f]">WORK WITH US</p>
          <h2 className="mt-4 text-[clamp(30px,4vw,46px)] text-white">Ready to put AI to work in your business?</h2>
          <p className="mx-auto mt-4 max-w-2xl !text-white/60">
            Tell us what is still manual. We will help you identify where AI can reduce effort, speed up execution, and lower operational cost.
          </p>
          <div className="mt-8">
            <Button href="/#contact" variant="white">Book a discovery call</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
