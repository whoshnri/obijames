import Image from "next/image";
import { certifications } from "@/lib/site-content";

export function CertificationsSection() {
  return (
    <section className="border-t border-[var(--obi-border)] bg-[var(--obi-bg-elevated)] px-6 py-28 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold text-[var(--obi-navy)] sm:text-5xl">
            Internationally accredited expertise
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex min-h-28 items-center justify-center border border-[var(--obi-border)] bg-[var(--obi-bg)] px-4 py-6 md:min-h-32 md:px-6"
              title={cert.detail}
            >
              <Image
                src={cert.image}
                alt={cert.name}
                width={220}
                height={110}
                className="max-h-20 w-auto max-w-full object-contain md:max-h-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
