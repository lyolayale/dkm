"use client";

import { useState, useEffect, useRef } from "react";
import Icon from "./Icon";
import { prefillAndGo } from "@/lib/quoteBus";

const BASE = 600;
const fmt = n => "$" + n.toLocaleString("en-US");

const PAGE_OPTIONS = [
  { id: "p1", add: 0, label: "1–3 pages", note: "included" },
  { id: "p2", add: 500, label: "4–6 pages", note: "+$500" },
  { id: "p3", add: 1200, label: "7 or more", note: "+$1,200" },
];

const ADDONS = [
  { id: "blog", add: 400, label: "Blog / CMS" },
  { id: "booking", add: 350, label: "Online booking" },
  { id: "payments", add: 450, label: "Take payments" },
  { id: "supabase", add: 800, label: "Supabase DB & Auth" },
  { id: "store", add: 1500, label: "Online store" },
];

export default function Estimator() {
  const [pages, setPages] = useState(PAGE_OPTIONS[0]);
  const [addons, setAddons] = useState([]);
  const [shown, setShown] = useState(BASE);
  const shownRef = useRef(BASE);

  const total = BASE + pages.add + addons.reduce((sum, a) => sum + a.add, 0);

  const tierLabel =
    total < 1500
      ? "Launch range"
      : total < 3000
        ? "Growth range"
        : "Custom range — quoted to scope";

  useEffect(() => {
    const from = shownRef.current;
    if (from === total) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      shownRef.current = total;
      setShown(total);
      return;
    }

    let raf;
    const t0 = performance.now();

    const tick = t => {
      const p = Math.min((t - t0) / 420, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(from + (total - from) * eased);
      shownRef.current = value;
      setShown(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);
  function toggleAddon(a) {
    setAddons(current =>
      current.some(x => x.id === a.id)
        ? current.filter(x => x.id !== a.id)
        : [...current, a],
    );
  }

  function requestQuote() {
    const budget = total < 1500 ? "launch" : total < 3000 ? "growth" : "custom";

    prefillAndGo({
      message: [
        "Hi! I used the price estimator on your site.",
        "",
        `Pages: ${pages.label}`,
        `Add-ons: ${addons.length ? addons.map(a => a.label).join(", ") : "none"}`,
        `Estimate: about ${fmt(total)}`,
        "",
        "A bit about my business: ",
      ].join("\n"),
      budget,
    });
  }
  return (
    <div
      id="estimator"
      className="reveal mt-[84px] grid overflow-hidden rounded-[18px] border border-line-strong bg-raised transition-colors duration-[350ms] lg:grid-cols-[1.35fr_1fr]"
    >
      {/* --- LEFT COLUMN: SELECTION CONTROLS --- */}
      <div className="border-b border-line p-[30px] lg:border-b-0 lg:border-r lg:p-10">
        {/* Page Step Options */}
        <div className="mb-[30px] last:mb-0">
          <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
            How many pages?
          </h3>
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label="Number of pages"
          >
            {PAGE_OPTIONS.map(p => (
              <button
                key={p.id}
                className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                  pages.id === p.id
                    ? "border-btn bg-btn text-btn-text"
                    : "border-line-strong text-ink-2 hover:border-ink-2"
                }`}
                onClick={() => setPages(p)}
              >
                {p.label}{" "}
                <small className="ml-1.5 text-[12.5px] opacity-75">
                  {p.note}
                </small>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Capability Addon Pills */}
        <div className="mb-[30px] last:mb-0">
          <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
            Add-ons (optional)
          </h3>
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label="Optional add-ons"
          >
            {ADDONS.map(a => (
              <button
                key={a.id}
                className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                  addons.some(x => x.id === a.id)
                    ? "border-btn bg-btn text-btn-text"
                    : "border-line-strong text-ink-2 hover:border-ink-2"
                }`}
                onClick={() => toggleAddon(a)}
              >
                {a.label}{" "}
                <small className="ml-1.5 text-[12.5px] opacity-75">
                  +${a.add.toLocaleString("en-US")}
                </small>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: VISUAL COST READOUT & SUBMIT --- */}
      <div className="flex flex-col justify-center bg-bg p-[30px] lg:p-10">
        <span className="text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
          Your estimate
        </span>

        {/* Animated Counter Display */}
        <div className="my-1 font-serif text-[clamp(52px,6vw,72px)] font-medium leading-[1.05] tracking-tight tabular-nums">
          {fmt(shown)}
        </div>

        <p className="text-[15px] font-semibold text-accent">{tierLabel}</p>
        <p className="mb-5 mt-2.5 text-[13.5px] text-ink-2">
          A starting point, not a trap — you&rsquo;ll get a fixed quote in
          writing before anything is owed.
        </p>

        <button
          className="btn btn-solid hover:bg-amber-500"
          onClick={requestQuote}
        >
          Request this quote <Icon name="arrow" />
        </button>

        {/* Summary Footer Text Details */}
        <p className="mt-4 text-[13px] text-ink-3">
          Base $600 · {pages.label} ·{" "}
          {addons.length ? addons.map(a => a.label).join(", ") : "no add-ons"}
        </p>

        <p className="mt-1.5 text-[13px] text-ink-3">
          Optional monthly: care $50/mo · automations from $39/mo · app care
          $79/mo
        </p>
      </div>
    </div>
  );
}
