"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogCard } from "@/components/blog-card";
import { recentBlogs, type BlogPost } from "@/lib/blogs";
import { RoughAnnotate } from "./rough-annotate";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d={
          direction === "left"
            ? "M11.5 4.5L6.5 9L11.5 13.5"
            : "M6.5 4.5L11.5 9L6.5 13.5"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogsSection({ posts }: { posts?: BlogPost[] }) {
  const items = posts && posts.length > 0 ? posts : [...recentBlogs];
  const [active, setActive] = useState(0);
  const total = items.length;

  const goTo = (index: number) => {
    setActive((index + total) % total);
  };

  return (
    <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl text-left">
            <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-5xl">
              Read out insights
            </h2>
            <p className="mt-6 text-lg text-[var(--obi-muted)]">
              Thought pieces on leadership, teams, and{" "}
              <RoughAnnotate
                type="underline"
                color="var(--obi-gold)"
                strokeWidth={1.5}
                iterations={2}
                padding={1}
                className="whitespace-nowrap"
              >
                building capability that lasts
              </RoughAnnotate>
              .
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex border border-[var(--obi-navy)]/25 px-5 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]"
          >
            View all blogs
          </Link>
        </div>

        <div className="mt-16 hidden gap-8 lg:grid lg:grid-cols-4">
          {items.slice(0, 4).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-16 lg:hidden">
          <BlogCard post={items[active]} />

          <div className="mt-10 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous blog post"
              className="flex h-12 w-12 items-center justify-center border border-[var(--obi-border)] text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]/30 hover:bg-[var(--obi-navy)]/5"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next blog post"
              className="flex h-12 w-12 items-center justify-center border border-[var(--obi-border)] text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]/30 hover:bg-[var(--obi-navy)]/5"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
