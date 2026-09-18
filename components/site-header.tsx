"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/smooth-scroll";

const navLinks = [
  { label: "Executive Development", href: "/executive-development" },
  { label: "Leadership Teams", href: "/leadership-team-development" },
  { label: "Organisational Capability", href: "/organisational-capability" },
  { label: "The Book", href: "/the-book" },
  { label: "Blogs", href: "/blogs" },
  { label: "Videos", href: "/videos" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, lenis]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--obi-navy)]">
        <div className="mx-auto flex max-w-9xl items-center justify-between gap-6 px-6 py-2 md:py-5 md:px-10 lg:px-14">
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-white transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 "
            aria-label="Obi James Consultancy home"
          >
            <Image
              src="/headerlogo.webp"
              alt="Obi James"
              width={120}
              height={120}
              priority
              className="h-14 w-auto md:w-auto p-0 object-cover md:h-28"
            />
          </Link>

          <div className="ml-auto flex items-center gap-4 lg:gap-6">
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold text-white transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/diagnostics"
              className="hidden bg-white px-6 py-3 text-xs font-semibold text-[var(--obi-navy)] transition hover:bg-white/90 sm:inline-flex"
            >
              Start a Diagnostic
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white lg:hidden"
              aria-expanded={open}
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--obi-navy)] lg:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Obi James Consultancy home">
              <Image
                src="/headerlogo.webp"
                alt="Obi James"
                width={120}
                height={120}
                className="h-[4.5rem] w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-8">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-3xl font-bold text-white transition hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4 px-8 pb-10">
            <Link
              href="/diagnostics"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center bg-white px-6 py-4 text-base font-semibold text-[var(--obi-navy)]"
            >
              Start a Diagnostic
            </Link>
            <a
              href="mailto:info@obijames.com"
              className="block text-center text-sm font-semibold text-white/70"
            >
              info@obijames.com
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
