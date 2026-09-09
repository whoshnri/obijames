"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { Timeline } from "@/components/ui/timeline";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type ExecutiveDevelopmentHeroSequenceProps = {
  question: string;
  behaviours: readonly string[];
};

export function ExecutiveDevelopmentHeroSequence({
  question,
  behaviours,
}: ExecutiveDevelopmentHeroSequenceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayQuestionRef = useRef<HTMLParagraphElement>(null);
  const sideTitleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const mobileTitleRef = useRef<HTMLHeadingElement>(null);
  const { lenis } = useSmoothScroll();

  const desktopProgress = useMotionValue(0);
  const mobileProgress = useMotionValue(0);

  const timelineData = useMemo(
    () =>
      behaviours.map((item) => ({
        title: item,
        content: null,
      })),
    [behaviours],
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const overlayQuestion = overlayQuestionRef.current;
    const sideTitle = sideTitleRef.current;
    const content = contentRef.current;
    const mobileContent = mobileContentRef.current;
    const mobileTitle = mobileTitleRef.current;
    if (
      !root ||
      !stage ||
      !frame ||
      !overlayQuestion ||
      !sideTitle ||
      !content ||
      !mobileContent ||
      !mobileTitle
    )
      return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const header = document.querySelector("header");
    const headerHeight = () =>
      Math.ceil(header?.getBoundingClientRect().height ?? 72);

    const applyStageHeight = () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      stage.style.height = `${Math.max(
        window.innerHeight - headerHeight(),
        mobile ? 360 : 420,
      )}px`;
    };

    applyStageHeight();

    const count = behaviours.length;

    if (reduceMotion) {
      gsap.set(frame, {
        top: "4%",
        left: "52%",
        width: "46%",
        height: "92%",
        borderRadius: 6,
      });
      gsap.set(overlayQuestion, { opacity: 0 });
      gsap.set(content, { opacity: 1, x: 0 });
      gsap.set(sideTitle, { opacity: 1, y: 0 });
      gsap.set(mobileContent, { opacity: 1 });
      gsap.set(mobileTitle, { opacity: 1, y: 0 });
      desktopProgress.set(1);
      mobileProgress.set(1);
      return;
    }

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);
    // normalizeScroll causes mobile flicker/jank with pinned overlays
    ScrollTrigger.normalizeScroll(false);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: image → right half; timeline fills with scroll
      mm.add("(min-width: 768px)", () => {
        desktopProgress.set(0);
        mobileProgress.set(0);

        gsap.set(frame, {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
          clearProps: "clipPath",
        });
        gsap.set(overlayQuestion, { opacity: 1 });
        gsap.set(content, { opacity: 0, x: -36 });
        gsap.set(sideTitle, { opacity: 0, y: 16 });
        gsap.set(mobileContent, { opacity: 0 });

        const intro = 1.4;
        const perStep = 0.7;
        const proxy = { value: 0 };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: () => `top top+=${headerHeight()}`,
            end: () =>
              `+=${Math.round(window.innerHeight * (1.6 + count * 0.55))}`,
            pin: true,
            pinType: "fixed",
            scrub: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          frame,
          {
            top: "4%",
            left: "52%",
            width: "46%",
            height: "92%",
            borderRadius: 6,
            duration: 1.1,
          },
          0,
        )
          .to(overlayQuestion, { opacity: 0, duration: 0.3 }, 0.45)
          .to(content, { opacity: 1, x: 0, duration: 0.4 }, 0.75)
          .to(sideTitle, { opacity: 1, y: 0, duration: 0.35 }, 0.85)
          .to(
            proxy,
            {
              value: 1,
              duration: count * perStep,
              ease: "none",
              onUpdate: () => desktopProgress.set(proxy.value),
            },
            intro,
          )
          .to({}, { duration: 0.4 });
      });

      // Mobile: expand image, center timeline, fill sequentially with scroll
      mm.add("(max-width: 767px)", () => {
        desktopProgress.set(0);
        mobileProgress.set(0);

        gsap.set(frame, {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
          clearProps: "clipPath",
        });
        gsap.set(overlayQuestion, { opacity: 1 });
        gsap.set(content, { opacity: 0 });
        gsap.set(mobileContent, { opacity: 0 });
        gsap.set(mobileTitle, { opacity: 0 });

        const startClip = "inset(8% round 6px)";
        const endClip = "inset(0% round 6px)";
        gsap.set(frame, { clipPath: startClip });

        const intro = 1.35;
        const perStep = 0.65;

        const proxy = { value: 0 };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: () => `top top+=${headerHeight()}`,
            end: () =>
              `+=${Math.round(window.innerHeight * (1.7 + count * 0.55))}`,
            pin: true,
            pinType: "fixed",
            scrub: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        tl.to(frame, { clipPath: endClip, duration: 1.05 }, 0)
          .to(overlayQuestion, { opacity: 0, duration: 0.3 }, 0.7)
          .to(mobileContent, { opacity: 1, duration: 0.35 }, 0.95)
          .to(mobileTitle, { opacity: 1, duration: 0.35 }, 1.05)
          .to(
            proxy,
            {
              value: 1,
              duration: count * perStep,
              ease: "none",
              onUpdate: () => mobileProgress.set(proxy.value),
            },
            intro,
          )
          .to({}, { duration: 0.4 });
      });
    }, root);

    const onResize = () => {
      applyStageHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      lenis?.off("scroll", onLenisScroll);
      ctx.revert();
      desktopProgress.set(0);
      mobileProgress.set(0);
    };
  }, [lenis, behaviours, question, desktopProgress, mobileProgress]);

  return (
    <section ref={rootRef} className="relative bg-[var(--obi-bg)]">
      <div
        ref={stageRef}
        className="relative w-full touch-pan-y overflow-hidden bg-[var(--obi-bg)]"
        style={{ height: "calc(100dvh - 5rem)" }}
      >
        <div
          ref={frameRef}
          className="absolute overflow-hidden will-change-[top,left,width,height,border-radius,clip-path]"
        >
          <Image
            src="/executive-development-hero.jpg"
            alt="Executive development session — a facilitator presenting to leaders in a workshop"
            fill
            priority
            className="object-cover object-center sm:object-[50%_35%]"
            sizes="(min-width: 768px) 50vw, 100vw"
          />

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-8 md:px-10">
            <p
              ref={overlayQuestionRef}
              className="max-w-3xl text-center text-2xl leading-tight font-semibold text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-3xl sm:leading-snug md:text-4xl lg:max-w-4xl lg:text-5xl lg:leading-snug"
            >
              {question}
            </p>
          </div>

          {/* Mobile: centered timeline over the expanded image */}
          <div
            ref={mobileContentRef}
            className="pointer-events-none absolute inset-0 z-20 opacity-0 md:hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/60 to-black/75" />
            <div className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-6 py-8 sm:px-8">
              <p className="text-center text-xs font-semibold tracking-[0.18em] text-[var(--obi-gold-soft)] uppercase">
                Leaders who
              </p>
              <h2
                ref={mobileTitleRef}
                className="mt-3 text-center text-[1.35rem] leading-[1.25] font-bold tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]"
              >
                {question}
              </h2>
              <div className="mt-8">
                <Timeline
                  compact
                  tone="onMedia"
                  progress={mobileProgress}
                  data={timelineData}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: left content + sequential timeline */}
        <div
          ref={contentRef}
          className="pointer-events-none absolute top-0 left-0 hidden h-full w-1/2 items-center justify-center px-8 opacity-0 md:flex lg:px-12 xl:px-16"
        >
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--obi-gold)] uppercase">
              Leaders who
            </p>
            <h2
              ref={sideTitleRef}
              className="mt-4 text-[1.65rem] leading-[1.2] font-bold tracking-tight text-[var(--obi-navy)] lg:text-3xl lg:leading-[1.15]"
            >
              {question}
            </h2>

            <div className="mt-10">
              <Timeline
                compact
                progress={desktopProgress}
                data={timelineData}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
