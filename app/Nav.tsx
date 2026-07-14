"use client";

import { useState } from "react";

const LINKS = [
  { href: "/", label: "Homepage" },
  { href: "/brain", label: "Zoomed In Brain" },
  { href: "/about", label: "About Us" },
  { href: "/sources", label: "Sources" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#ce55a5] min-h-[70px] sticky top-0 px-4 sm:px-8 flex items-center justify-between z-[1000] shadow-md select-none">
      {/* Desktop links */}
      <nav className="hidden md:flex gap-8 items-center">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white no-underline font-serif font-bold text-[1.1rem] tracking-[0.05em] hover:underline transition-all whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
        aria-label="Toggle menu"
      >
        <span className={`block h-[3px] w-7 bg-white rounded transition-all ${open ? "translate-y-[8px] rotate-45" : ""}`} />
        <span className={`block h-[3px] w-7 bg-white rounded transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block h-[3px] w-7 bg-white rounded transition-all ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
      </button>

      {/* Title */}
      <span className="text-white font-serif font-bold text-[1.1rem] tracking-[0.05em] hidden sm:inline">
        Nicotine Effects: The Brain
      </span>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#ce55a5] shadow-lg flex flex-col md:hidden border-t border-white/20">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white no-underline font-serif font-bold text-[1.1rem] tracking-[0.05em] px-6 py-4 border-b border-white/10 hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
