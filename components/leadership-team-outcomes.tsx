"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type Outcome = {
  title: string;
  body: string;
};

type Slot = { top: string; left: string };

type LeadershipTeamOutcomesProps = {
  title: string;
  subtitle: string;
  items: readonly Outcome[];
};

const TONES = [
  "bg-[var(--obi-navy)] text-white",
  "bg-[var(--obi-accent)] text-[var(--obi-gold-soft)]",
  "bg-white text-[var(--obi-navy)]",
  "bg-[var(--obi-navy)] text-[var(--obi-gold-soft)]",
] as const;

const MUTED = [
  "text-white/65",
  "text-[var(--obi-gold-soft)]/70",
  "text-[var(--obi-navy)]/65",
  "text-[var(--obi-gold-soft)]/70",
] as const;

const STACK_NUDGE = 18;

/** Desktop 4-col peel from left: (4) → (1,3) → (1,1,2) → (1,1,1,1) */
const DESKTOP_STEPS: readonly (readonly Slot[])[] = [
  [
    { top: "0%", left: "0%" },
    { top: "0%", left: "0%" },
    { top: "0%", left: "0%" },
    { top: "0%", left: "0%" },
  ],
  [
    { top: "0%", left: "0%" },
    { top: "0%", left: "25%" },
    { top: "0%", left: "25%" },
    { top: "0%", left: "25%" },
  ],
  [
    { top: "0%", left: "0%" },
    { top: "0%", left: "25%" },
    { top: "0%", left: "50%" },
    { top: "0%", left: "50%" },
  ],
  [
    { top: "0%", left: "0%" },
    { top: "0%", left: "25%" },
    { top: "0%", left: "50%" },
    { top: "0%", left: "75%" },
  ],
];

const TL = { top: "0%", left: "0%" };
const TR = { top: "0%", left: "50%" };
const BL = { top: "50%", left: "0%" };
const BR = { top: "50%", left: "50%" };

/** Mobile 2×2 peel from top-left */
const MOBILE_STEPS: readonly (readonly Slot[])[] = [
  [TL, TL, TL, TL],
  [TL, TR, TR, TR],
  [TL, TR, BL, BL],
  [TL, TR, BL, BR],
];

function fixedZ(index: number) {
  return 40 - index;
}

function offsetsForStep(step: readonly Slot[]) {
  return step.map((slot, i) => {
    const peers = step.filter(
      (s) => s.top === slot.top && s.left === slot.left,
    );
    if (peers.length <= 1) return { x: 0, y: 0 };
    return { x: i * STACK_NUDGE, y: i * STACK_NUDGE };
  });
}

export function LeadershipTeamOutcomes({
  title,
  subtitle,
  items,
}: LeadershipTeamOutcomesProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const deck = deckRef.current;
    if (!root || !stage || !deck) return;

    const cards = gsap.utils.toArray<HTMLElement>(
      deck.querySelectorAll("[data-outcome-card]"),
    );
    if (cards.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const header = document.querySelector("header");
    const headerHeight = () =>
      Math.ceil(header?.getBoundingClientRect().height ?? 72);

    const applyStep = (
      step: readonly Slot[],
      size: { width: string; height: string },
    ) => {
      const offsets = offsetsForStep(step);
      cards.forEach((card, i) => {
        const slot = step[i % step.length];
        gsap.set(card, {
          width: size.width,
          height: size.height,
          top: slot.top,
          left: slot.left,
          x: offsets[i].x,
          y: offsets[i].y,
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          scale: 1,
          zIndex: fixedZ(i),
        });
      });
    };

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);
    ScrollTrigger.normalizeScroll(false);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (
        steps: readonly (readonly Slot[])[],
        size: { width: string; height: string },
        stageHeight: string,
        scrollMul: number,
      ) => {
        stage.style.height = stageHeight;
        cards.forEach((card, i) => gsap.set(card, { zIndex: fixedZ(i) }));
        applyStep(steps[0], size);

        if (reduceMotion) {
          applyStep(steps[3], size);
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: () => `top top+=${headerHeight()}`,
            end: () => `+=${Math.round(window.innerHeight * scrollMul)}`,
            pin: true,
            pinType: "fixed",
            scrub: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.4 }, 0);

        steps.slice(1).forEach((step, stepIndex) => {
          const at = 0.45 + stepIndex * 0.55;
          const offsets = offsetsForStep(step);
          cards.forEach((card, i) => {
            const slot = step[i % step.length];
            tl.to(
              card,
              {
                top: slot.top,
                left: slot.left,
                x: offsets[i].x,
                y: offsets[i].y,
                duration: 0.55,
              },
              at,
            );
          });
        });

        tl.to({}, { duration: 0.4 });
      };

      mm.add("(min-width: 768px)", () => {
        build(
          DESKTOP_STEPS,
          { width: "25%", height: "calc(100% - 54px)" },
          "17rem",
          1.9,
        );
      });

      mm.add("(max-width: 767px)", () => {
        build(
          MOBILE_STEPS,
          { width: "50%", height: "50%" },
          "22rem",
          1.85,
        );
      });
    }, root);

    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        ScrollTrigger.refresh();
      }
    };
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      lenis?.off("scroll", onLenisScroll);
      ctx.revert();
    };
  }, [lenis, items]);

  return (
    <section
      ref={rootRef}
      className="border-t border-[var(--obi-border)] bg-[var(--obi-bg-elevated)]"
    >
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-14 md:px-10 md:pt-20 md:pb-16 lg:px-14">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-base leading-7 text-[var(--obi-muted)]">
          {subtitle}
        </p>

        <div
          ref={stageRef}
          className="relative mt-10 w-full touch-pan-y md:mt-12"
          style={{ height: "17rem" }}
        >
          <div ref={deckRef} className="relative h-full w-full overflow-visible">
            {items.map((item, index) => (
              <article
                key={item.title}
                data-outcome-card
                className={[
                  "absolute box-border flex flex-col justify-between border border-[var(--obi-navy)]/20 p-4 shadow-[4px_4px_0_rgba(11,31,58,0.16)] will-change-[left,top,transform] sm:p-5 md:p-6",
                  TONES[index % TONES.length],
                ].join(" ")}
                style={{ zIndex: fixedZ(index) }}
              >
                <h3 className="text-base leading-snug font-bold tracking-tight sm:text-lg md:text-xl">
                  {item.title}
                </h3>
                <p
                  className={[
                    "mt-3 text-xs leading-5 sm:mt-4 sm:text-sm sm:leading-6",
                    MUTED[index % MUTED.length],
                  ].join(" ")}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
