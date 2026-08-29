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
    <header className="site-head">
      <div className="wrap head-in">
        <a href="#top" className="logo" aria-label="DKM — home">
          DKM<b>.</b>
        </a>

        <nav className="nav" aria-label="Main">
          {LINKS.map(l => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="head-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Switch between dark and light mode"
          >
            <Icon name="moon" className="ic sun-i" />
            <Icon name="sun" className="ic moon-i" />
          </button>

          <a className="btn btn-solid head-cta" href="#pricing">
            From $600 <Icon name="arrow" />
          </a>

          <button
            className="icon-btn menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            className="btn btn-solid"
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
