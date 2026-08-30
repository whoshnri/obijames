"use client";

import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/lib/testimonials";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M11.5 4.5L6.5 9L11.5 13.5" : "M6.5 4.5L11.5 9L6.5 13.5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];
  const total = testimonials.length;

  const goTo = (index: number) => {
    setActive((index + total) % total);
  };

  return (
    <section className="border-t border-white/10 bg-[var(--obi-bg-elevated)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--obi-gold)]">
            Testimonials
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            Stories of transformation
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">
            Real stories from leaders and organisations building capability
            that lasts beyond any one individual.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <div className="relative max-w-md">
              <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[var(--obi-gold)]/10 blur-3xl" />
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
                <Image
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    index === active ? "w-8 bg-white" : "w-2 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[24rem] flex-col">
            <span
              aria-hidden="true"
              className="font-display text-7xl leading-none text-white/15 md:text-8xl"
            >
              &ldquo;
            </span>

            <blockquote className="mt-2 max-w-xl text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
              {current.quote}
            </blockquote>

            <footer className="mt-10">
              <p className="text-xl font-semibold text-white">{current.name}</p>
              <p className="mt-1 text-sm text-white/50">
                {current.role}, {current.company}
              </p>
            </footer>

            <div className="mt-auto flex gap-3 pt-10">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Next testimonial"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
