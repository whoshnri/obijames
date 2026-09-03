"use client";

import Image from "next/image";
import { useState } from "react";
import { testimonials } from "@/lib/testimonials";
import { RoughAnnotate } from "./rough-annotate";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
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

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = testimonials[active];
  const total = testimonials.length;

  const goTo = (index: number) => {
    setActive((index + total) % total);
  };

  return (
    <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold text-[var(--obi-navy)] sm:text-5xl">
            Stories of transformation
          </h2>
          <p className="mt-6 text-lg text-[var(--obi-muted)]">
            Real stories from leaders and organisations{" "}
            <RoughAnnotate
              type="circle"
              color="var(--obi-gold)"
              strokeWidth={1.5}
              iterations={2}
              padding={4}
              className="whitespace-nowrap"
            >
              building capability
            </RoughAnnotate>{" "}
            that lasts beyond any one individual.
          </p>
        </div>

        <div className="mt-4 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <div className="relative max-w-md">
              <div className="relative aspect-square w-full overflow-hidden">
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
                  className={`h-2 transition-all ${
                    index === active
                      ? "w-8 bg-[var(--obi-navy)]"
                      : "w-2 bg-[var(--obi-navy)]/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative flex flex-col ">
            <span
              aria-hidden="true"
              className="font-display text-7xl text-[var(--obi-navy)]/10 md:text-8xl"
            >
              &ldquo;
            </span>

            <blockquote className="mt-2 max-w-xl font-display text-2xl text-[var(--obi-navy)]/85 sm:text-4xl">
              {current.quote}
            </blockquote>

            <div className="flex items-center justify-between">
              <footer className="mt-7">
                <p className="text-base font-bold text-[var(--obi-navy)]">
                  {current.name}
                </p>
                <p className="mt-1 text-xs text-[var(--obi-muted)]">
                  {current.role}, {current.company}
                </p>
              </footer>

              <div className="mt-auto flex gap-3 pt-10">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 items-center justify-center border border-[var(--obi-border)] text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]/30 hover:bg-[var(--obi-navy)]/5"
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center border border-[var(--obi-border)] text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]/30 hover:bg-[var(--obi-navy)]/5"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
