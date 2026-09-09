"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

type TimelineProps = {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
  tone?: "default" | "onMedia";
  /** Controlled 0→1 fill (e.g. GSAP pin). Omit to use page scroll. */
  progress?: MotionValue<number>;
};

function TimelineRow({
  item,
  index,
  count,
  progress,
  compact,
  onMedia,
}: {
  item: TimelineEntry;
  index: number;
  count: number;
  progress: MotionValue<number>;
  compact: boolean;
  onMedia: boolean;
}) {
  const threshold = (index + 0.35) / count;
  const opacity = useTransform(progress, (v) => (v >= threshold ? 1 : 0.38));
  const dotBackground = useTransform(progress, (v) => {
    if (v < threshold) {
      return onMedia ? "rgba(255,255,255,0.25)" : "rgba(15, 40, 70, 0.25)";
    }
    return onMedia ? "var(--obi-gold)" : "var(--obi-navy)";
  });

  return (
    <motion.div
      data-timeline-item
      style={{ opacity }}
      className={cn(
        "flex justify-start",
        compact ? "gap-4 pt-5 first:pt-0 md:gap-5" : "pt-10 md:gap-10 md:pt-40",
      )}
    >
      <div
        className={cn(
          "relative z-40 flex flex-col items-center self-start",
          compact ? "" : "max-w-xs md:w-full md:flex-row lg:max-w-sm",
        )}
      >
        <div
          className={cn(
            "absolute flex items-center justify-center rounded-full",
            compact
              ? cn("left-0 h-8 w-8", onMedia ? "bg-black/50" : "bg-[var(--obi-bg)]")
              : "left-3 h-10 w-10 bg-white md:left-3 dark:bg-black",
          )}
        >
          <motion.div
            style={{ backgroundColor: dotBackground }}
            className={cn(
              "rounded-full border",
              compact
                ? onMedia
                  ? "h-2.5 w-2.5 border-white/50"
                  : "h-2.5 w-2.5 border-[var(--obi-navy)]/30"
                : "h-4 w-4 border-neutral-300 p-2 dark:border-neutral-700",
            )}
          />
        </div>
        {item.title && !compact ? (
          <h3 className="hidden text-xl font-bold text-neutral-500 md:block md:pl-20 md:text-5xl dark:text-neutral-500">
            {item.title}
          </h3>
        ) : null}
      </div>

      <div
        className={cn(
          "relative w-full",
          compact ? "pl-12 pr-0" : "pr-4 pl-20 md:pl-4",
        )}
      >
        {item.title ? (
          <h3
            className={cn(
              "text-left font-bold",
              compact
                ? cn(
                    "text-base leading-7 font-medium",
                    onMedia
                      ? "text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
                      : "text-[var(--obi-navy)]",
                  )
                : "mb-4 block text-2xl text-neutral-500 md:hidden dark:text-neutral-500",
            )}
          >
            {item.title}
          </h3>
        ) : null}
        {item.content}
      </div>
    </motion.div>
  );
}

export const Timeline = ({
  data,
  title,
  description,
  className,
  compact = false,
  tone = "default",
  progress,
}: TimelineProps) => {
  const onMedia = tone === "onMedia";
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const fallbackProgress = useMotionValue(0);
  const source = progress ?? fallbackProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const next = el.getBoundingClientRect().height;
      setHeight((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const lineHeight = useTransform(source, (v) => Math.max(0, v) * height);
  const lineOpacity = useTransform(source, [0, 0.03, 0.08], [0, 0.7, 1]);

  useEffect(() => {
    if (progress) return;
    return scrollYProgress.on("change", (v) => fallbackProgress.set(v));
  }, [progress, scrollYProgress, fallbackProgress]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full font-sans",
        !compact && "bg-white md:px-10 dark:bg-neutral-950",
        className,
      )}
    >
      {(title || description) && (
        <div
          className={cn(
            "mx-auto max-w-7xl",
            compact ? "mb-6 px-0" : "px-4 py-20 md:px-8 lg:px-10",
          )}
        >
          {title ? (
            <h2
              className={cn(
                "mb-4 max-w-4xl text-black dark:text-white",
                compact ? "text-lg font-semibold" : "text-lg md:text-4xl",
              )}
            >
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-sm text-sm text-neutral-700 md:text-base dark:text-neutral-300">
              {description}
            </p>
          ) : null}
        </div>
      )}

      <div
        ref={ref}
        className={cn("relative mx-auto", compact ? "pb-2" : "max-w-7xl pb-20")}
      >
        {data.map((item, index) => (
          <TimelineRow
            key={index}
            item={item}
            index={index}
            count={data.length}
            progress={source}
            compact={compact}
            onMedia={onMedia}
          />
        ))}

        <div
          style={{ height: height + "px" }}
          className={cn(
            "absolute top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]",
            onMedia ? "via-white/35" : "via-neutral-200 dark:via-neutral-700",
            compact ? "left-4" : "left-8 md:left-8",
          )}
        >
          <motion.div
            style={{ height: lineHeight, opacity: lineOpacity }}
            className={cn(
              "absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[0%] via-[10%] to-transparent",
              onMedia
                ? "from-[var(--obi-gold)] via-white"
                : "from-[var(--obi-gold)] via-[var(--obi-navy)]",
            )}
          />
        </div>
      </div>
    </div>
  );
};
