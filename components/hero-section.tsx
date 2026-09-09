import Image from "next/image";
import Link from "next/link";
import { RoughAnnotate } from "./rough-annotate";
import { StatsBar } from "./stats-bar";

export function HeroSection() {
  return (
    <section className="bg-hero relative flex min-h-screen flex-col overflow-x-clip">
      <div className="flex flex-1 flex-col justify-center px-6 pb-0 pt-4 md:px-10 lg:px-14">
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Leadership{" "}
              <RoughAnnotate
                type="underline"
                color="var(--obi-gold)"
                strokeWidth={1.5}
                iterations={2}
                padding={1}
                className="whitespace-nowrap"
              >
                shouldn&apos;t depend
              </RoughAnnotate>{" "}
              on a handful of people
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/65 sm:text-lg">
              We help organisations build leaders, leadership teams, and
              systems so performance holds when anyone steps away.
            </p>
            <div className="mt-10 max-sm:w-fit mx-auto">
              <Link
                href="/organisational-capability"
                className="inline-flex bg-white px-6 py-3 text-sm font-semibold text-[var(--obi-navy)] transition hover:bg-white/90"
              >
                Start with a Diagnostic
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/obi-james-high-res.png"
                alt="Obi James, Founder of Obi James Consultancy"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </div>

      <StatsBar />
    </section>
  );
}
