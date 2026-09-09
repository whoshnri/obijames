import Image from "next/image";
import Link from "next/link";

type PillarCtaProps = {
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** `navy` = dark band (ED). `light` = flipped light band (LTD). */
  tone?: "navy" | "light";
};

export function PillarCta({
  title,
  body,
  primaryHref,
  primaryLabel = "Start a diagnostic",
  secondaryHref = "mailto:info@obijames.com",
  secondaryLabel = "Talk to us",
  imageSrc = "/executive-development-cta.png",
  imageAlt = "Coach inviting a conversation",
  tone = "navy",
}: PillarCtaProps) {
  const light = tone === "light";

  return (
    <section
      className={[
        "relative overflow-x-clip",
        light ? "bg-[var(--obi-bg)]" : "bg-[var(--obi-navy)]",
      ].join(" ")}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-6 px-6 pt-10 md:grid-cols-2 md:gap-8 md:px-10 md:pt-0 lg:px-12">
        <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
          <div className="relative max-w-md">
            <h2
              className={[
                "text-2xl font-bold tracking-tight sm:text-3xl lg:text-[2rem] lg:leading-[1.2]",
                light ? "text-[var(--obi-navy)]" : "text-white",
              ].join(" ")}
            >
              {title}
            </h2>
            <p
              className={[
                "mt-4 text-base leading-7",
                light ? "text-[var(--obi-muted)]" : "text-white/65",
              ].join(" ")}
            >
              {body}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                href={primaryHref}
                className={[
                  "inline-flex px-6 py-3 text-sm font-semibold transition",
                  light
                    ? "bg-[var(--obi-navy)] text-white hover:bg-[var(--obi-navy-light)]"
                    : "bg-white text-[var(--obi-navy)] hover:bg-white/90",
                ].join(" ")}
              >
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className={[
                  "inline-flex px-6 py-3 text-sm font-semibold transition",
                  light
                    ? "border-2 border-[var(--obi-navy)] text-[var(--obi-navy)] hover:bg-[var(--obi-navy)] hover:text-white"
                    : "border border-white/40 text-white hover:border-white hover:bg-white/10",
                ].join(" ")}
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={420}
            height={630}
            className="h-auto w-[18rem] object-contain object-bottom sm:w-[20rem] md:w-[24rem]"
            sizes="320px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
