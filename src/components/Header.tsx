"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/kategoria/pierwsze-kroki", label: "Pierwsze kroki" },
  { href: "/kategoria/rodzaje-wolontariatu", label: "Rodzaje" },
  { href: "/wolontariat", label: "Miasta" },
  { href: "/kategoria/prawo-i-formalnosci", label: "Prawo" },
  { href: "/kategoria/dla-organizacji", label: "Dla organizacji" },
  { href: "/o-nas", label: "O nas" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 md:px-8">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-[-0.02em] text-green-deep"
          onClick={() => setOpen(false)}
        >
          wolontariat.org.pl
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition duration-200 ease-out hover:text-green-deep"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/blog" className="text-sm font-medium text-ink-soft hover:text-green-deep">
            Artykuły
          </Link>
          <Link href="/kategoria/pierwsze-kroki" className="button-primary">
            Znajdź wolontariat
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-green-deep lg:hidden"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
      {open ? (
        <div className="border-t border-line bg-paper-raised px-5 py-5 lg:hidden">
          <nav className="mx-auto grid max-w-[1240px] gap-4 text-base font-medium text-ink">
            {[...links, { href: "/blog", label: "Artykuły" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kategoria/pierwsze-kroki"
              className="button-primary mt-2 w-fit"
              onClick={() => setOpen(false)}
            >
              Znajdź wolontariat
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
