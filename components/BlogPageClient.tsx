"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow, Button, SectionLabel } from "@/components/ui";
import type { BlogArticle } from "@/lib/blog-posts";

export type { BlogArticle };

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function articleMatches(article: BlogArticle, query: string) {
  const value = query.trim().toLowerCase();
  if (!value) return true;

  return [article.title, article.category, article.date, article.readTime, article.excerpt]
    .join(" ")
    .toLowerCase()
    .includes(value);
}

function BlogVisual({ article, featured = false }: { article: BlogArticle; featured?: boolean }) {
  return (
    <div className={`blog-card-visual ${featured ? "blog-card-visual-featured" : ""}`}>
      {article.hasImage && article.image ? (
        <Image src={article.image} alt={article.title} width={1000} height={640} className="h-full w-full object-cover" />
      ) : (
        <div className="blog-visual-placeholder">
          <span className="blog-visual-line blog-visual-line-a" />
          <span className="blog-visual-line blog-visual-line-b" />
          <span className="blog-visual-node blog-visual-node-a" />
          <span className="blog-visual-node blog-visual-node-b" />
          <span className="blog-visual-node blog-visual-node-c" />
        </div>
      )}
    </div>
  );
}

function ArticleCard({ article, featured = false }: { article: BlogArticle; featured?: boolean }) {
  return (
    <Link href={article.slug} className={`blog-article-card ${featured ? "blog-article-card-featured" : ""}`}>
      <BlogVisual article={article} featured={featured} />
      <div className={`flex flex-1 flex-col ${featured ? "p-4 sm:p-5" : "p-5"}`}>
        <div className={`flex flex-wrap items-center ${featured ? "gap-3" : "gap-2"}`}>
          <span className={`rounded-full border border-[#d8b45f]/25 bg-[#d8b45f]/10 font-mono uppercase text-[#d8b45f] ${featured ? "px-3 py-1 text-[10px] tracking-[0.13em]" : "px-2 py-0.5 text-[8px] tracking-[0.1em]"}`}>
            {article.category}
          </span>
          <span className={`font-mono uppercase text-white/42 ${featured ? "text-[10px] tracking-[0.13em]" : "text-[8px] tracking-[0.1em]"}`}>{article.date}</span>
          <span className={`font-mono uppercase text-white/42 ${featured ? "text-[10px] tracking-[0.13em]" : "text-[8px] tracking-[0.1em]"}`}>{article.readTime}</span>
        </div>
        <div className={`title-font ${featured ? "mt-5 text-[clamp(24px,2.3vw,31px)]" : "mt-4 text-[22px]"} max-w-xl font-semibold leading-[1.16] text-white`}>
          {article.title}
        </div>
        <div className={`${featured ? "mt-4 text-[14px] leading-6" : "mt-3 line-clamp-2 text-[12px] leading-5"} text-white/54`}>{article.excerpt}</div>
        <span className={`${featured ? "pt-5" : "pt-5"} mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-[#d8b45f]`}>
          Read article <Arrow />
        </span>
      </div>
    </Link>
  );
}

export function BlogPageClient({ articles }: { articles: BlogArticle[] }) {
  const [query, setQuery] = useState("");

  const visibleArticles = useMemo(() => {
    const featuredArticles = articles.filter((article) => article.featured);
    const allArticles = articles.filter((article) => !article.featured).slice(0, 3);

    return {
      featuredArticles: featuredArticles.filter((article) => articleMatches(article, query)),
      allArticles: allArticles.filter((article) => articleMatches(article, query)),
    };
  }, [articles, query]);

  const hasResults = visibleArticles.featuredArticles.length > 0 || visibleArticles.allArticles.length > 0;

  return (
    <main className="blog-page relative -mt-[86px] min-h-screen overflow-hidden bg-[#050507] px-5 pt-[126px] text-white sm:px-8">
      <div className="absolute inset-0 dark-grid opacity-35" />
      <div className="blog-page-glow blog-page-glow-a" />
      <div className="blog-page-glow blog-page-glow-b" />
      <div className="blog-page-noise" />

      <section data-hero className="relative z-10 mx-auto max-w-[1160px] pb-16 text-center lg:pb-20">
        <SectionLabel dark center>INSIGHTS</SectionLabel>
        <h1 className="text-[clamp(56px,7vw,78px)] leading-[0.95] text-white">Blog</h1>
        <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-8 !text-white/58">
          Ideas on AI automation, operations, workflows, and building faster businesses with intelligent systems.
        </p>
        <div className="mx-auto mt-12 flex h-12 w-full max-w-[500px] items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 text-left text-white/46 shadow-[0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <SearchIcon />
          <input
            aria-label="Search articles"
            placeholder="Search articles..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/42"
          />
        </div>
      </section>

      {hasResults ? (
        <>
          <section className="relative z-10 mx-auto max-w-[1160px] pb-20">
            <SectionLabel dark>FEATURED ARTICLES</SectionLabel>
            {visibleArticles.featuredArticles.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {visibleArticles.featuredArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} featured />
                ))}
              </div>
            ) : (
              <p className="text-sm !text-white/48">No featured articles match your search.</p>
            )}
          </section>

          <section className="relative z-10 mx-auto max-w-[1120px] pb-20">
            <SectionLabel dark>ALL ARTICLES</SectionLabel>
            {visibleArticles.allArticles.length > 0 ? (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {visibleArticles.allArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-sm !text-white/48">No articles match your search.</p>
            )}
          </section>
        </>
      ) : (
        <section className="relative z-10 mx-auto max-w-[820px] pb-20 text-center">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-6 py-8">
            <p className="text-sm !text-white/58">No articles found for "{query}".</p>
          </div>
        </section>
      )}

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
