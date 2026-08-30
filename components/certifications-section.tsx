import Image from "next/image";
import { certifications } from "@/lib/site-content";

export function CertificationsSection() {
  return (
    <section className="border-t border-white/10 px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--obi-gold)]">
            Credentials
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.1] text-white sm:text-5xl">
            Accredited coaching expertise, recognised internationally
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/65">
            Our work is grounded in rigorous coach training and team coaching
            accreditation — from individual executive coaching through to
            organisation-wide systems change.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <figure key={cert.name} className="flex flex-col">
              <div className="flex min-h-32 items-center justify-center bg-white px-6 py-8">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={240}
                  height={120}
                  className="max-h-24 w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="mt-5 border-t border-white/10 pt-5">
                <p className="text-base font-semibold text-white">{cert.name}</p>
                <p className="mt-1 text-sm leading-6 text-white/50">{cert.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
