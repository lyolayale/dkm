"use client";

import { useSyncExternalStore } from "react";
import Icon from "./Icon";
import { prefillAndGo } from "@/lib/quoteBus";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  selectEngagement,
  toggleConsultService,
  ENGAGEMENTS,
  CONSULT_ADDONS,
  consultTotal,
  webTotal,
  combinedTotal,
  webSummaryLines,
  fmt,
  budgetFor,
} from "@/lib/estimateStore";

// Consulting / marketing estimator — reads and writes the SAME store as the
// website estimator in components/Estimator.jsx, so the two stay in sync.
export default function ConsultingEstimator() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const engagement = ENGAGEMENTS.find(e => e.id === state.engagementId);
  const services = CONSULT_ADDONS.filter(a =>
    state.serviceIds.includes(a.id),
  );
  const total = consultTotal(state);
  const shown = useAnimatedNumber(total);

  // Synced view of the website estimator (shown once it has been used)
  const webTouched = state.webTouched;
  const web = webTotal(state);
  const combined = combinedTotal(state);

  const tierLabel =
    total < 600
      ? "Foundations range"
      : total < 1000
        ? "Growth partner range"
        : "Full partnership — quoted to scope";

  function requestQuote() {
    const lines = [
      "Hi! I used the consulting estimator on your site.",
      "",
      `Engagement: ${engagement.label}`,
      `Add-ons: ${services.length ? services.map(a => a.label).join(", ") : "none"}`,
      `Consulting estimate: about ${fmt(total)}`,
    ];

    // The website estimator writes to the same store — include its picks
    if (webTouched) {
      lines.push(
        "",
        ...webSummaryLines(state),
        `Combined estimate: about ${fmt(combined)}`,
      );
    }

    lines.push("", "A bit about my business: ");
    prefillAndGo({
      message: lines.join("\n"),
      // Budget buckets in the contact form map to website tiers, so only set
      // one when the website side is part of this quote.
      budget: webTouched ? budgetFor(combined) : undefined,
    });
  }

  return (
    <div
      id="consulting-estimator"
      className="reveal mt-[84px] grid overflow-hidden rounded-[18px] border border-line-strong bg-raised transition-colors duration-[350ms] lg:grid-cols-[1.35fr_1fr]"
    >
      {/* --- LEFT COLUMN: SELECTION CONTROLS --- */}
      <div className="border-b border-line p-[30px] lg:border-b-0 lg:border-r lg:p-10">
        {/* Engagement Level Options */}
        <div className="mb-[30px] last:mb-0">
          <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
            What do you need?
          </h3>
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label="Consulting engagement"
          >
            {ENGAGEMENTS.map(e => (
              <button
                key={e.id}
                className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                  engagement.id === e.id
                    ? "border-btn bg-btn text-btn-text"
                    : "border-line-strong text-ink-2 hover:border-ink-2"
                }`}
                onClick={() => selectEngagement(e.id)}
              >
                {e.label}{" "}
                <small className="ml-1.5 text-[12.5px] opacity-75">
                  {e.note}
                </small>
              </button>
            ))}
          </div>
        </div>

        {/* Consulting Addon Pills */}
        <div className="mb-[30px] last:mb-0">
          <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
            Add-ons (optional)
          </h3>
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label="Optional consulting add-ons"
          >
            {CONSULT_ADDONS.map(a => (
              <button
                key={a.id}
                className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                  services.some(x => x.id === a.id)
                    ? "border-btn bg-btn text-btn-text"
                    : "border-line-strong text-ink-2 hover:border-ink-2"
                }`}
                onClick={() => toggleConsultService(a.id)}
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
          A starting point — she&rsquo;ll confirm scope and a fixed price in
          writing before anything is owed.
        </p>

        {/* Synced with the website estimator in the Pricing section */}
        {webTouched && (
          <p className="mb-5 rounded-[10px] border border-line-strong bg-raised px-3.5 py-2.5 text-[13.5px] text-ink-2">
            Website selected:{" "}
            <b className="font-semibold text-ink">{fmt(web)}</b> — combined
            estimate{" "}
            <b className="font-semibold text-accent">{fmt(combined)}</b>
          </p>
        )}

        <button
          className="btn btn-solid hover:bg-amber-500"
          onClick={requestQuote}
        >
          Request this quote <Icon name="arrow" />
        </button>

        {/* Summary Footer Text Details */}
        <p className="mt-4 text-[13px] text-ink-3">
          Base $350 · {engagement.label} ·{" "}
          {services.length
            ? services.map(a => a.label).join(", ")
            : "no add-ons"}
        </p>

        <p className="mt-1.5 text-[13px] text-ink-3">
          Ongoing: weekly outreach days from $600/mo · advisory from $250/mo
        </p>
      </div>
    </div>
  );
}