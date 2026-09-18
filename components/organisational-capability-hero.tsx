"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { RoughAnnotate } from "@/components/rough-annotate";
import { useSmoothScroll } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type OrganisationalCapabilityHeroProps = {
  title: string;
  summary: string;
  question: string;
};

export function OrganisationalCapabilityHero({
  title,
  summary,
  question,
}: OrganisationalCapabilityHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-reveal]"),
    );
    const media = root.querySelector<HTMLElement>("[data-media]");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(lines, { opacity: 1, y: 0 });
        if (media) gsap.set(media, { opacity: 1, scale: 1 });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 28 });
      if (media) gsap.set(media, { opacity: 0, scale: 1.06 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (media) {
        tl.to(media, { opacity: 1, scale: 1, duration: 1.15 }, 0);
      }
      tl.to(
        lines,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
        0.18,
      );
    }, root);

    return () => {
      lenis?.off("scroll", onLenisScroll);
      ctx.revert();
    };
  }, [lenis]);

  const [titleLead, titleTail] = (() => {
    const parts = title.split(" ");
    if (parts.length < 2) return [title, ""] as const;
    return [parts.slice(0, -1).join(" "), parts.at(-1) ?? ""] as const;
  })();

  return (
    <section ref={rootRef} className="overflow-hidden bg-[var(--obi-bg)]">
      <div className="mx-auto grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-14 md:px-10 md:py-20 lg:order-1 lg:px-14 lg:py-28">
          <h1
            data-reveal
            className="text-4xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-5xl lg:text-6xl lg:leading-[1.02]"
          >
            {titleLead}
            {titleTail ? <span className="block">{titleTail}</span> : null}
          </h1>
          <p
            data-reveal
            className="mt-6 max-w-md text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8"
          >
            {summary}
          </p>
          <p
            data-reveal
            className="mt-7 max-w-md text-base leading-7 font-semibold text-[var(--obi-navy)] md:text-lg md:leading-8"
          >
            <RoughAnnotate
              type="underline"
              color="var(--obi-gold)"
              strokeWidth={1.5}
              iterations={2}
              padding={1}
              multiline
            >
              {question}
            </RoughAnnotate>
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#fractures"
              className="inline-flex bg-[var(--obi-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
            >
              See the fractures
            </Link>
            <Link
              href="#work"
              className="inline-flex border border-[var(--obi-navy)]/25 px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]"
            >
              Where we start
            </Link>
          </div>
        </div>

        <div
          data-media
          className="relative order-1 min-h-[70vw] sm:min-h-[420px] lg:order-2 lg:min-h-[min(88vh,720px)]"
        >
          <Image
            src="/executive-development-hero.jpg"
            alt="Leaders examining organisational structure and capability"
            fill
            priority
            className="object-cover max-lg:object-center object-[50%_18%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
