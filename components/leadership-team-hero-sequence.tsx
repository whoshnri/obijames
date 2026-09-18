"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RoughAnnotate } from "@/components/rough-annotate";
import { useSmoothScroll } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

type Pressure = {
  title: string;
  cost: string;
};

type LeadershipTeamHeroSequenceProps = {
  title: string;
  summary: string;
  question: string;
  problemHeadline: string;
  problemBody: string;
  problemClose: string;
  pressures: readonly Pressure[];
  annotatePhrase?: string;
};

export function LeadershipTeamHeroSequence({
  title,
  summary,
  question,
  problemHeadline,
  problemBody,
  problemClose,
  pressures,
  annotatePhrase = "organisational performance system",
}: LeadershipTeamHeroSequenceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const problemPanelRef = useRef<HTMLDivElement>(null);
  const problemLeadRef = useRef<HTMLParagraphElement>(null);
  const problemTrailRef = useRef<HTMLParagraphElement>(null);
  const problemBodyRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();
  const [activeCard, setActiveCard] = useState(0);

  const titleParts = title.split(" ");
  const titleLead = titleParts.slice(0, -1).join(" ") || title;
  const titleTail = titleParts.length > 1 ? (titleParts.at(-1) ?? "") : "";
  const [lead, trail] = splitHeadline(problemHeadline);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const heroCopy = heroCopyRef.current;
    const problemPanel = problemPanelRef.current;
    const problemLead = problemLeadRef.current;
    const problemTrail = problemTrailRef.current;
    const problemBodyEl = problemBodyRef.current;
    const cards = cardsRef.current;
    if (
      !root ||
      !stage ||
      !frame ||
      !heroCopy ||
      !problemPanel ||
      !problemLead ||
      !problemTrail ||
      !problemBodyEl ||
      !cards
    )
      return;

    const cardEls = gsap.utils.toArray<HTMLElement>(
      cards.querySelectorAll("[data-pressure]"),
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const header = document.querySelector("header");
    const headerHeight = () =>
      Math.ceil(header?.getBoundingClientRect().height ?? 72);

    // Lock mobile height once — dvh/chrome show-hide was reflowing the pin
    const MOBILE_STAGE_PX = 720;
    let mobileHeightLocked = false;

    const applyStageHeight = () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      if (mobile) {
        if (!mobileHeightLocked) {
          stage.style.height = `${MOBILE_STAGE_PX}px`;
          mobileHeightLocked = true;
        }
        return;
      }
      mobileHeightLocked = false;
      stage.style.height = `${Math.max(
        window.innerHeight - headerHeight(),
        420,
      )}px`;
    };
    applyStageHeight();

    if (reduceMotion) {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      if (desktop) {
        gsap.set(frame, {
          top: "10%",
          left: "54%",
          width: "40%",
          height: "80%",
          borderRadius: 14,
        });
      } else {
        gsap.set(frame, {
          top: "3%",
          left: "8%",
          width: "84%",
          height: "28%",
          borderRadius: 10,
        });
      }
      gsap.set(heroCopy, { opacity: 0 });
      gsap.set(problemPanel, { opacity: 1 });
      gsap.set(
        [problemLead, problemTrail, problemBodyEl, ...cardEls],
        { opacity: 1, y: 0, scale: 1 },
      );
      gsap.set(root, { backgroundColor: "var(--obi-navy)" });
      return;
    }

    const onLenisScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onLenisScroll);
    ScrollTrigger.normalizeScroll(false);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(frame, {
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          borderRadius: 0,
        });
        gsap.set(heroCopy, { opacity: 1, x: 0, y: 0 });
        gsap.set(problemPanel, { opacity: 0 });
        gsap.set([problemLead, problemTrail, problemBodyEl], {
          opacity: 0,
          y: 22,
        });
        gsap.set(cardEls, { opacity: 0, y: 28, scale: 0.96 });
        gsap.set(root, { backgroundColor: "var(--obi-bg)" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: () => `top top+=${headerHeight()}`,
            end: () => `+=${Math.round(window.innerHeight * 2.4)}`,
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
            top: "8%",
            left: "54%",
            width: "40%",
            height: "84%",
            borderRadius: 14,
            duration: 1.2,
          },
          0,
        )
          .to(heroCopy, { opacity: 0, x: 28, duration: 0.4 }, 0.2)
          .to(
            root,
            { backgroundColor: "var(--obi-navy)", duration: 0.55 },
            0.35,
          )
          .to(problemPanel, { opacity: 1, duration: 0.35 }, 0.55)
          .to(problemLead, { opacity: 1, y: 0, duration: 0.35 }, 0.65)
          .to(problemTrail, { opacity: 1, y: 0, duration: 0.35 }, 0.78)
          .to(problemBodyEl, { opacity: 1, y: 0, duration: 0.35 }, 0.92)
          .to(
            cardEls,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              stagger: 0.1,
            },
            1.15,
          )
          .to({}, { duration: 0.45 });
      });

      mm.add("(max-width: 767px)", () => {
        // Image starts bottom, inset + rounded
        gsap.set(frame, {
          top: "52%",
          left: "6%",
          width: "88%",
          height: "42%",
          borderRadius: 6,
        });
        gsap.set(heroCopy, { opacity: 1, x: 0, y: 0 });
        gsap.set(problemPanel, { opacity: 0 });
        gsap.set([problemLead, problemTrail, problemBodyEl], {
          opacity: 0,
          y: 16,
        });
        gsap.set(cardEls, { opacity: 0, y: 18, scale: 0.96 });
        gsap.set(root, { backgroundColor: "var(--obi-bg)" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: () => `top top+=${headerHeight()}`,
            end: () => `+=${Math.round(window.innerHeight * 2.2)}`,
            pin: true,
            pinType: "fixed",
            scrub: true,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        // Image morphs smaller and rises to the top
        tl.to(
          frame,
          {
            top: "3%",
            left: "8%",
            width: "84%",
            height: "28%",
            borderRadius: 10,
            duration: 1.05,
          },
          0,
        )
          .to(heroCopy, { opacity: 0, y: -18, duration: 0.35 }, 0.15)
          .to(
            root,
            { backgroundColor: "var(--obi-navy)", duration: 0.45 },
            0.3,
          )
          .to(problemPanel, { opacity: 1, duration: 0.3 }, 0.5)
          .to(problemLead, { opacity: 1, y: 0, duration: 0.3 }, 0.58)
          .to(problemTrail, { opacity: 1, y: 0, duration: 0.3 }, 0.68)
          .to(problemBodyEl, { opacity: 1, y: 0, duration: 0.3 }, 0.8)
          .to(
            cardEls,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              stagger: 0.08,
            },
            1.0,
          )
          .to({}, { duration: 0.4 });
      });
    }, root);

    const onResize = () => {
      // Mobile height stays locked; only desktop tracks the viewport
      if (window.matchMedia("(min-width: 768px)").matches) {
        applyStageHeight();
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
  }, [
    lenis,
    title,
    summary,
    question,
    problemHeadline,
    problemBody,
    problemClose,
    pressures,
  ]);

  return (
    <section ref={rootRef} className="relative bg-[var(--obi-bg)]">
      <div
        ref={stageRef}
        className="relative h-[720px] w-full touch-pan-y overflow-hidden"
      >
        <div
          ref={frameRef}
          className="absolute z-20 overflow-hidden will-change-[top,left,width,height,border-radius]"
        >
          <Image
            src="/leadership-team-hero.jpg"
            alt="Facilitator presenting a leadership team workshop"
            fill
            priority
            className="object-cover object-[50%_20%]"
            sizes="(min-width: 768px) 50vw, 90vw"
          />
        </div>

        {/* Hero copy — top on mobile, right half on desktop */}
        <div
          ref={heroCopyRef}
          className="absolute inset-x-0 top-[3%] z-10 flex items-start px-6 md:inset-y-0 md:top-0 md:right-0 md:left-[50%] md:items-center md:px-10 lg:px-14"
        >
          <div className="w-full max-w-xl md:max-w-none">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--obi-navy)] sm:text-4xl lg:text-5xl lg:leading-[1.05]">
              {titleLead}
              {titleTail ? (
                <span className="mt-1 block">{titleTail}</span>
              ) : null}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--obi-muted)] sm:text-lg sm:leading-8 md:mt-6">
              {summary} The leadership team is not a meeting of senior people —
              it is an{" "}
              <RoughAnnotate
                type="underline"
                color="var(--obi-gold)"
                strokeWidth={1.5}
                iterations={2}
                padding={1}
              >
                {annotatePhrase}
              </RoughAnnotate>
              .
            </p>
            <p className="mt-5 border-l-2 border-[var(--obi-accent)] pl-4 text-base leading-7 font-semibold text-[var(--obi-navy)] sm:text-lg sm:leading-8">
              {question}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
              <Link
                href="#work"
                className="inline-flex bg-[var(--obi-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--obi-navy-light)]"
              >
                See how we work
              </Link>
              <Link
                href="mailto:info@obijames.com"
                className="inline-flex border border-[var(--obi-navy)]/25 px-5 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:border-[var(--obi-navy)]"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>

        {/* Problem panel — below image on mobile, left half on desktop */}
        <div
          ref={problemPanelRef}
          className="pointer-events-none absolute inset-x-0 top-[34%] bottom-0 z-10 flex flex-col justify-start gap-5 overflow-y-auto px-6 pb-6 opacity-0 md:inset-y-0 md:left-0 md:top-0 md:w-[52%] md:justify-center md:gap-8 md:overflow-visible md:px-10 md:pb-0 lg:px-14"
        >
          <div className="pointer-events-auto max-w-lg">
            <p
              ref={problemLeadRef}
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-5xl lg:leading-[1.05]"
            >
              {lead}
            </p>
            <p
              ref={problemTrailRef}
              className="mt-1 text-2xl font-bold tracking-tight text-[var(--obi-gold-soft)] sm:text-3xl lg:mt-3 lg:text-5xl lg:leading-[1.05]"
            >
              {trail}
            </p>
            <p
              ref={problemBodyRef}
              className="mt-5 text-sm leading-6 text-white/65 sm:text-base sm:leading-7 md:mt-8 md:text-lg md:leading-8"
            >
              {problemBody}
            </p>
          </div>

          <div
            ref={cardsRef}
            className="pointer-events-auto flex max-w-xl flex-wrap gap-2.5 md:gap-3"
          >
            {pressures.map((item, index) => {
              const open = activeCard === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  data-pressure
                  aria-expanded={open}
                  onMouseEnter={() => setActiveCard(index)}
                  onFocus={() => setActiveCard(index)}
                  onClick={() => setActiveCard(index)}
                  className={[
                    "flex min-h-[6.5rem] min-w-[calc(50%-0.35rem)] flex-1 flex-col justify-between border p-3 text-left transition-colors duration-500 sm:min-h-[7.5rem] sm:p-4 md:min-w-[9.5rem] lg:p-5",
                    open
                      ? "border-[var(--obi-gold-soft)]/40 bg-[var(--obi-accent)] text-[var(--obi-gold-soft)]"
                      : "border-white/15 bg-white/5 text-white hover:border-white/30",
                  ].join(" ")}
                >
                  <span className="text-xs font-bold tracking-tight sm:text-sm lg:text-base">
                    {item.title}
                  </span>
                  <span
                    className={[
                      "mt-2 text-[0.7rem] leading-4 transition-opacity duration-500 sm:mt-3 sm:text-xs sm:leading-5 lg:text-sm lg:leading-6",
                      open ? "opacity-75" : "opacity-45",
                    ].join(" ")}
                  >
                    {item.cost}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function splitHeadline(headline: string): [string, string] {
  const parts = headline.split(/(?<=\.)\s+/);
  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(" ")];
  }
  return [headline, ""];
}
