"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar({ darkMode, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950/80 border-slate-900"
          : "bg-white/90 border-slate-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="relative sm:w-50 sm:h-50 p-1 transition-all duration-300 overflow-hidden flex items-center justify-center">
              <a href="#home">
                <Image
                  src="/dkm-logo-final-01.jpeg"
                  alt="Digital Keys & Marketing Logo"
                  width={100}
                  height={100}
                  className="object-contain brightness-110 rounded-md"
                  priority
                  loading="eager"
                />
              </a>
            </div>

            <a href="#home">
              <span
                className={`font-bold text-md tracking-widest uppercase hidden sm:inline ${
                  darkMode ? "text-slate-200" : "text-slate-900"
                }`}
              >
                DIGITAL KEYS <span className="text-amber-500">&</span> MARKETING
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-wider uppercase">
            <a
              href="#about"
              className={`transition-colors duration-200 ${
                darkMode
                  ? "text-slate-400 hover:text-amber-400"
                  : "text-slate-500 hover:text-amber-600"
              }`}
            >
              About
            </a>

            <a
              href="#vision"
              className={`transition-colors duration-200 ${
                darkMode
                  ? "text-slate-400 hover:text-amber-400"
                  : "text-slate-500 hover:text-amber-600"
              }`}
            >
              Vision
            </a>

            <a
              href="#projects"
              className={`transition-colors duration-200 ${
                darkMode
                  ? "text-slate-400 hover:text-amber-400"
                  : "text-slate-500 hover:text-amber-600"
              }`}
            >
              Projects
            </a>

            <button
              onClick={toggleTheme}
              type="button"
              className={`px-3 py-2 rounded-xl border font-bold text-[11px] tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:border-slate-700"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 shadow-inner"
              }`}
              aria-label="Toggle Color System Theme"
            >
              {darkMode ? "☀️ LIGHT MODE" : "🌙 DARK MODE"}
            </button>

            <a
              href="#contact"
              className={`px-5 py-2.5 rounded-lg font-bold shadow-md transition-all duration-300 ${
                darkMode
                  ? "border border-slate-800 bg-slate-900/60 text-slate-200 hover:border-amber-400/40 hover:text-amber-400"
                  : "bg-slate-900 text-white hover:bg-amber-600"
              }`}
            >
              Partner With Us
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              type="button"
              className={`p-2 rounded-lg border text-sm transition-all ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-amber-400"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className={`p-2 rounded-lg border ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-2 pb-6 space-y-3 flex flex-col font-semibold text-xs tracking-wider uppercase shadow-inner ${
            darkMode
              ? "bg-slate-950 border-slate-900"
              : "bg-white border-slate-100"
          }`}
        >
          <a
            href="#about"
            onClick={closeMobileMenu}
            className={`px-3 py-2 rounded-md ${
              darkMode
                ? "hover:bg-amber-400 hover:text-black text-slate-300"
                : "hover:bg-slate-50 text-slate-700"
            }`}
          >
            About
          </a>

          <a
            href="#vision"
            onClick={closeMobileMenu}
            className={`px-3 py-2 rounded-md ${
              darkMode
                ? "hover:bg-amber-400 hover:text-black text-slate-300"
                : "hover:bg-slate-50 text-slate-700"
            }`}
          >
            Vision
          </a>

          <a
            href="#projects"
            onClick={closeMobileMenu}
            className={`px-3 py-2 rounded-md ${
              darkMode
                ? "hover:bg-amber-400 hover:text-black text-slate-300"
                : "hover:bg-slate-50 text-slate-700"
            }`}
          >
            Projects
          </a>

          <a
            href="#contact"
            onClick={closeMobileMenu}
            className={`block text-center py-3 rounded-lg font-bold transition-all duration-300 ${
              darkMode
                ? "bg-slate-900 text-slate-200 border border-slate-800 hover:bg-amber-400 hover:text-black"
                : "bg-slate-900 text-white"
            }`}
          >
            Partner With Us
          </a>
        </div>
      )}
    </nav>
  );
}
