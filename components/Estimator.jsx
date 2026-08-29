"use client";

import { useEffect, useRef, useState } from "react";
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

  // Animated count-up whenever the total changes
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
    <div className="estimator reveal" id="estimator">
      <div className="est-opts">
        <div className="est-group">
          <h3>How many pages?</h3>
          <div className="chips" role="group" aria-label="Number of pages">
            {PAGE_OPTIONS.map(p => (
              <button
                key={p.id}
                className={`chip${pages.id === p.id ? " active" : ""}`}
                onClick={() => setPages(p)}
              >
                {p.label} <small>{p.note}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="est-group">
          <h3>Add-ons (optional)</h3>
          <div className="chips" role="group" aria-label="Optional add-ons">
            {ADDONS.map(a => (
              <button
                key={a.id}
                className={`chip${addons.some(x => x.id === a.id) ? " active" : ""}`}
                onClick={() => toggleAddon(a)}
              >
                {a.label} <small>+${a.add.toLocaleString("en-US")}</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="est-total">
        <span className="lab">Your estimate</span>
        <div className="est-num">{fmt(shown)}</div>
        <p className="est-tier">{tierLabel}</p>
        <p className="est-note">
          A starting point, not a trap — you&rsquo;ll get a fixed quote in
          writing before anything is owed.
        </p>
        <button className="btn btn-solid" onClick={requestQuote}>
          Request this quote <Icon name="arrow" />
        </button>
        <p className="est-break">
          Base $600 · {pages.label} ·{" "}
          {addons.length ? addons.map(a => a.label).join(", ") : "no add-ons"}
        </p>
      </div>
    </div>
  );
}
