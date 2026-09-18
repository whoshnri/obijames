"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type OrganisationalCapabilityLensesProps = {
  title: string;
  intro: string;
  items: readonly string[];
};

export function OrganisationalCapabilityLenses({
  title,
  intro,
  items,
}: OrganisationalCapabilityLensesProps) {
  const rootRef = useRef<HTMLElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cells = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-lens]"),
    );
    const count = root.querySelector<HTMLElement>("[data-count]");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(cells, { opacity: 1, y: 0 });
        if (count) gsap.set(count, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(cells, { opacity: 0, y: 16 });
      if (count) gsap.set(count, { opacity: 0, scale: 0.92 });

      ScrollTrigger.create({
        trigger: root,
        start: "top 65%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
          if (count) {
            tl.to(count, { opacity: 1, scale: 1, duration: 0.7 });
          }
          tl.to(
            cells,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.04,
            },
            "-=0.35",
          );
        },
      });
    }, root);

    return () => {
      lenis?.off("scroll", onLenisScroll);
      ctx.revert();
    };
  }, [lenis, items]);

  return (
    <section
      id="diagnostic"
      ref={rootRef}
      className="scroll-mt-28 border-t border-[var(--obi-border)] bg-[var(--obi-bg)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
            {intro}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p
            data-count
            className="text-[clamp(4rem,12vw,7.5rem)] leading-none font-bold tracking-tight text-[var(--obi-navy)]"
          >
            12
            <span className="mt-2 block text-sm font-semibold tracking-[0.16em] text-[var(--obi-muted)] uppercase">
              interconnected lenses
            </span>
          </p>
          <Link
            href="mailto:info@obijames.com?subject=Organisational%20Capability%20Diagnostic"
            className="inline-flex w-fit bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
          >
            Start a diagnostic
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px bg-[var(--obi-border)] sm:grid-cols-3 lg:mt-16 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item}
              data-lens
              className="bg-[var(--obi-bg)] px-4 py-5 md:px-5 md:py-6"
            >
              <span className="text-sm font-semibold text-[var(--obi-navy)] md:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
