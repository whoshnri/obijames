"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type Challenge = {
  index: string;
  title: string;
  body: string;
};

type OrganisationalCapabilityFracturesProps = {
  title: string;
  intro: string;
  challenges: readonly Challenge[];
};

export function OrganisationalCapabilityFractures({
  title,
  intro,
  challenges,
}: OrganisationalCapabilityFracturesProps) {
  const pinRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!pin || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const header = document.querySelector("header");
    const headerHeight = () =>
      Math.ceil(header?.getBoundingClientRect().height ?? 72);

    const panels = gsap.utils.toArray<HTMLElement>(
      stage.querySelectorAll("[data-fracture-panel]"),
    );

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);
    ScrollTrigger.normalizeScroll(false);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        panels.forEach((panel, i) => {
          gsap.set(panel, {
            opacity: i === 0 ? 1 : 0,
            y: 0,
            pointerEvents: i === 0 ? "auto" : "none",
          });
        });
        setActive(0);
        return;
      }

      panels.forEach((panel, i) => {
        gsap.set(panel, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 28,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: () => `top top+=${headerHeight()}`,
          end: () =>
            `+=${Math.round(window.innerHeight * (1.1 + challenges.length * 0.55))}`,
          pin: true,
          pinType: "fixed",
          scrub: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              challenges.length - 1,
              Math.floor(self.progress * challenges.length),
            );
            setActive(idx);
          },
        },
      });

      challenges.forEach((_, i) => {
        if (i === 0) {
          tl.to({}, { duration: 0.85 });
          return;
        }

        const prev = panels[i - 1];
        const next = panels[i];
        tl.to(prev, { opacity: 0, y: -20, duration: 0.35 }, ">")
          .set(prev, { pointerEvents: "none" })
          .set(next, { pointerEvents: "auto" })
          .fromTo(
            next,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.4 },
          )
          .to({}, { duration: 0.55 });
      });

      tl.to({}, { duration: 0.35 });
    }, pin);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis?.off("scroll", onLenisScroll);
      ctx.revert();
    };
  }, [lenis, challenges]);

  return (
    <div id="fractures" className="scroll-mt-28">
      <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg-elevated)] px-6 py-14 md:px-10 md:py-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--obi-muted)] md:text-lg md:leading-8">
            {intro}
          </p>
        </div>
      </section>

      <section ref={pinRef} className="bg-[var(--obi-navy)]">
        <div
          ref={stageRef}
          className="relative mx-auto flex h-[min(100svh,720px)] max-w-7xl flex-col px-6 py-12 md:px-10 md:py-16 lg:px-14"
        >
          <div className="flex justify-end">
            <div className="flex w-full max-w-xs gap-1.5 sm:max-w-sm">
              {challenges.map((item, i) => (
                <span
                  key={item.index}
                  className={[
                    "h-0.5 flex-1 transition-colors duration-300",
                    i <= active
                      ? "bg-[var(--obi-gold-soft)]"
                      : "bg-white/15",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[22rem] flex-1 md:min-h-[26rem]">
            {challenges.map((item, i) => (
              <article
                key={item.index}
                data-fracture-panel
                className={[
                  "absolute inset-0 flex flex-col justify-center gap-6 md:grid md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] md:items-center md:gap-14",
                  i === 0 ? "opacity-100" : "opacity-0",
                ].join(" ")}
                aria-hidden={active !== i}
              >
                <p className="text-[clamp(4.5rem,14vw,9rem)] leading-none font-bold tracking-tight text-[var(--obi-gold-soft)]/90">
                  {item.index}
                </p>
                <div className="max-w-xl">
                  <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
