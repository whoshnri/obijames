"use client";

import { useEffect, useRef } from "react";
import { annotate } from "rough-notation";

type AnnotationType =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off"
  | "bracket";

type BracketSide = "left" | "right" | "top" | "bottom";

type RoughAnnotateProps = {
  children: React.ReactNode;
  type?: AnnotationType;
  color?: string;
  strokeWidth?: number;
  padding?: number | [number, number] | [number, number, number, number];
  animationDuration?: number;
  multiline?: boolean;
  iterations?: number;
  brackets?: BracketSide | BracketSide[];
  className?: string;
  delay?: number;
  loop?: boolean;
  loopDelay?: number;
};

export function RoughAnnotate({
  children,
  type = "underline",
  color = "var(--obi-gold)",
  strokeWidth = 2,
  padding = 2,
  animationDuration = 800,
  multiline = false,
  iterations = 2,
  brackets = "right",
  className,
  delay = 200,
  loop = false,
  loopDelay = 2400,
}: RoughAnnotateProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const annotation = annotate(el, {
      type,
      color,
      strokeWidth,
      padding,
      animationDuration,
      multiline,
      iterations,
      brackets,
    });

    const timers = new Set<number>();
    let cancelled = false;
    let started = false;

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    const play = () => {
      annotation.hide();
      annotation.show();

      if (loop) {
        schedule(() => {
          annotation.hide();
          schedule(play, 120);
        }, animationDuration + loopDelay);
      }
    };

    const start = () => {
      if (started) return;
      started = true;
      schedule(play, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          if (!loop) observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
      annotation.remove();
    };
  }, [
    type,
    color,
    strokeWidth,
    padding,
    animationDuration,
    multiline,
    iterations,
    brackets,
    delay,
    loop,
    loopDelay,
  ]);

  // rough-notation places an absolute SVG as a sibling; a relative wrapper
  // makes that SVG share the text's box so scroll can't desync them.
  return (
    <span className={["relative inline-block", className].filter(Boolean).join(" ")}>
      <span ref={ref}>{children}</span>
    </span>
  );
}
