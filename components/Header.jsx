"use client";

import { useState } from "react";
import Icon from "./Icon";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

function toggleTheme() {
  const next =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("dkm-theme", next);
  } catch (e) {}
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg-alpha backdrop-blur-md transition-colors duration-[350ms]">
      <div className="wrap flex h-[66px] items-center gap-7">
        <a
          href="#top"
          aria-label="DKM — home"
          className="font-serif text-[23px] font-semibold tracking-tight text-ink"
        >
          DKM<b className="text-accent-bright">.</b>
        </a>

        <nav className="ml-auto hidden gap-[26px] lg:flex" aria-label="Main">
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Switch between dark and light mode"
          >
            <span className="dark:hidden">
              <Icon name="moon" />
            </span>
            <span className="hidden dark:block">
              <Icon name="sun" />
            </span>
          </button>

          <a
            className="btn btn-solid hidden lg:inline-flex hover:bg-amber-500"
            href="#pricing"
          >
            From $600 <Icon name="arrow" />
          </a>

          <button
            className="icon-btn lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-line bg-bg px-6 pb-[22px] pt-2.5 lg:hidden"
          aria-label="Mobile"
        >
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-line py-3 font-medium text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            className="btn btn-solid mt-4 justify-center"
            href="#pricing"
            onClick={() => setMenuOpen(false)}
          >
            See pricing — from $600
          </a>
        </nav>
      )}
    </header>
  );
}
