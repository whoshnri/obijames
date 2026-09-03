"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bookMeta, bookReviews } from "@/lib/book";

export function BookFeatureSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const review = bookReviews[active];

  useEffect(() => {
    let fadeTimer = 0;

    const interval = window.setInterval(() => {
      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        setActive((current) => (current + 1) % bookReviews.length);
        setVisible(true);
      }, 300);
    }, 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg-elevated)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative w-full">
          <Image
            src={bookMeta.featureImage}
            alt={bookMeta.featureAlt}
            width={900}
            height={1200}
            className="h-auto w-full object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[var(--obi-navy)] sm:text-4xl">
            {bookMeta.title}
          </h2>

          <figure
            className={`mt-6 min-h-[11rem] transition-opacity duration-300 ease-out md:min-h-[12rem] ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <blockquote className="font-display text-base leading-7 text-[var(--obi-navy)]/80 md:text-lg md:leading-8 line-clamp-6">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold text-[var(--obi-muted)]">
              - {review.attribution}
            </figcaption>
          </figure>

          <div className="mt-10">
            <Link
              href="/the-book"
              className="inline-flex border border-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-[var(--obi-navy)] hover:text-white"
            >
              Explore the book
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
