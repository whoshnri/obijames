import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Executive Development", href: "/executive-development" },
  { label: "Leadership Teams", href: "/leadership-team-development" },
  { label: "Organisational Capability", href: "/organisational-capability" },
  { label: "Diagnostics", href: "/diagnostics" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[var(--obi-navy)] px-6 py-16 md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Image
            src="/footer_logo.webp"
            alt="Obi James Consultancy"
            width={220}
            height={80}
            className="h-28 w-auto object-contain md:h-32"
          />
          <p className="mt-6 max-w-sm text-base font-medium leading-7 text-white/70">
            Executive advisory for organisations building shared leadership.
          </p>
          <div className="mt-6 space-y-2 text-sm font-semibold text-white">
            <a href="tel:+442032907894" className="block transition hover:text-white/80">
              +44 (0) 20 3290 7894
            </a>
            <a href="mailto:info@obijames.com" className="block transition hover:text-white/80">
              info@obijames.com
            </a>
          </div>
        </div>

        <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-4">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-8 text-sm font-semibold text-white/50 md:text-left">
        © {new Date().getFullYear()} Obi James Consultancy Limited. All rights
        reserved.
      </div>
    </footer>
  );
}
