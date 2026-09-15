"use client";

import { useSyncExternalStore } from "react";
import Icon from "./Icon";
import { goToForm } from "@/lib/quoteBus";
import { useAnimatedNumber } from "@/lib/useAnimatedNumber";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  setMode,
  selectPages,
  toggleWebAddon,
  selectEngagement,
  toggleConsultService,
  MODES,
  PAGE_OPTIONS,
  WEB_ADDONS,
  ENGAGEMENTS,
  CONSULT_ADDONS,
  activeTotal,
  webTotal,
  consultTotal,
  combinedTotal,
  summaryLines,
  touchEstimate,
  monthlyFor,
  fmt,
} from "@/lib/estimateStore";

export default function PricingEstimator() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const mode = MODES.find(m => m.id === state.mode);
  const total = activeTotal(state);
  const shown = useAnimatedNumber(total);
  const monthly = monthlyFor(state);

  const showWeb = state.mode === "web" || state.mode === "both";
  const showConsult = state.mode === "consult" || state.mode === "both";

  const tierLabel =
    state.mode === "consult"
      ? total < 600
        ? "Foundations range"
        : total < 1000
          ? "Growth partner range"
          : "Full partnership — quoted to scope"
      : total < 1500
        ? "Launch range"
        : total < 3000
          ? "Growth range"
          : "Custom range — quoted to scope";

  function requestQuote() {
    // Selections already live-sync into the contact form — just make sure the
    // current (possibly default) state is marked used, then take them there.
    touchEstimate();
    goToForm();
  }

  return (
    <div
      id="estimator"
      className="reveal mt-[84px] grid overflow-hidden rounded-[18px] border border-line-strong bg-raised transition-colors duration-[350ms] lg:grid-cols-[1.35fr_1fr]"
    >
      <div className="border-b border-line p-[30px] lg:border-b-0 lg:border-r lg:p-10">
        <div className="mb-[30px]">
          <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
            What do you need?
          </h3>
          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Service mode">
            {MODES.map(m => (
              <button
                key={m.id}
                className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                  mode.id === m.id
                    ? "border-btn bg-btn text-btn-text"
                    : "border-line-strong text-ink-2 hover:border-ink-2"
                }`}
                onClick={() => setMode(m.id)}
              >
                {m.label}{" "}
                <small className="ml-1.5 text-[12.5px] opacity-75">{m.note}</small>
              </button>
            ))}
          </div>
        </div>

        {showWeb && (
          <div className="mb-[30px] last:mb-0">
            <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
              How many pages?
            </h3>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Number of pages">
              {PAGE_OPTIONS.map(p => (
                <button
                  key={p.id}
                  className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                    state.pagesId === p.id
                      ? "border-btn bg-btn text-btn-text"
                      : "border-line-strong text-ink-2 hover:border-ink-2"
                  }`}
                  onClick={() => selectPages(p.id)}
                >
                  {p.label}{" "}
                  <small className="ml-1.5 text-[12.5px] opacity-75">{p.note}</small>
                </button>
              ))}
            </div>

            <h3 className="mb-3.5 mt-[22px] text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
              Add-ons (optional)
            </h3>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Optional add-ons">
              {WEB_ADDONS.map(a => (
                <button
                  key={a.id}
                  className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                    state.addonIds.includes(a.id)
                      ? "border-btn bg-btn text-btn-text"
                      : "border-line-strong text-ink-2 hover:border-ink-2"
                  }`}
                  onClick={() => toggleWebAddon(a.id)}
                >
                  {a.label}{" "}
                  <small className="ml-1.5 text-[12.5px] opacity-75">+${a.add.toLocaleString("en-US")}</small>
                </button>
              ))}
            </div>
          </div>
        )}

        {showConsult && (
          <div className="mb-[30px] last:mb-0">
            <h3 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
              Engagement level
            </h3>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Consulting engagement">
              {ENGAGEMENTS.map(e => (
                <button
                  key={e.id}
                  className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                    state.engagementId === e.id
                      ? "border-btn bg-btn text-btn-text"
                      : "border-line-strong text-ink-2 hover:border-ink-2"
                  }`}
                  onClick={() => selectEngagement(e.id)}
                >
                  {e.label}{" "}
                  <small className="ml-1.5 text-[12.5px] opacity-75">{e.note}</small>
                </button>
              ))}
            </div>

            <h3 className="mb-3.5 mt-[22px] text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
              Add-ons (optional)
            </h3>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Optional consulting add-ons">
              {CONSULT_ADDONS.map(a => (
                <button
                  key={a.id}
                  className={`cursor-pointer rounded-full border px-[17px] py-[11px] text-[14.5px] font-medium leading-none transition-colors duration-200 ${
                    state.serviceIds.includes(a.id)
                      ? "border-btn bg-btn text-btn-text"
                      : "border-line-strong text-ink-2 hover:border-ink-2"
                  }`}
                  onClick={() => toggleConsultService(a.id)}
                >
                  {a.label}{" "}
                  <small className="ml-1.5 text-[12.5px] opacity-75">+${a.add.toLocaleString("en-US")}</small>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center bg-bg p-[30px] lg:p-10">
        <span className="text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
          {state.mode === "both" ? "Your combined estimate" : "Your estimate"}
        </span>

        <div className="my-1 font-serif text-[clamp(52px,6vw,72px)] font-medium leading-[1.05] tracking-tight tabular-nums">
          {fmt(shown)}
        </div>

        <p className="text-[15px] font-semibold text-accent">{tierLabel}</p>

        {state.mode === "both" && (
          <div className="mt-3 mb-2 space-y-1">
            <p className="text-[13.5px] text-ink-2">
              Website: <b className="font-semibold text-ink">{fmt(webTotal(state))}</b>
            </p>
            <p className="text-[13.5px] text-ink-2">
              Consulting: <b className="font-semibold text-ink">{fmt(consultTotal(state))}</b>
            </p>
          </div>
        )}

        {monthly.total > 0 && (
          <p className="mt-3 mb-2 text-[13.5px] text-ink-2">
            Monthly plans:{" "}
            <b className="font-semibold text-ink">{fmt(monthly.total)}/mo</b>
            {monthly.discount > 0 && (
              <span className="ml-1.5 text-[12.5px] font-medium text-emerald-600">
                bundle −{fmt(monthly.discount)}/mo
              </span>
            )}
          </p>
        )}

        <p className="mb-5 mt-2.5 text-[13.5px] text-ink-2">
          A starting point, not a trap — you&rsquo;ll get a fixed quote in
          writing before anything is owed.
        </p>

        <button className="btn btn-solid hover:bg-amber-500" onClick={requestQuote}>
          Request this quote <Icon name="arrow" />
        </button>

        <p className="mt-4 text-[13px] text-ink-3">
          {showWeb && (
            <>
              Web base $600 · {PAGE_OPTIONS.find(p => p.id === state.pagesId).label}
              {state.addonIds.length
                ? " · " + WEB_ADDONS.filter(a => state.addonIds.includes(a.id)).map(a => a.label).join(", ")
                : ""}
            </>
          )}
          {showWeb && showConsult && showWeb && " | "}
          {showConsult && (
            <>
              Consulting base $350 · {ENGAGEMENTS.find(e => e.id === state.engagementId).label}
              {state.serviceIds.length
                ? " · " + CONSULT_ADDONS.filter(a => state.serviceIds.includes(a.id)).map(a => a.label).join(", ")
                : ""}
            </>
          )}
        </p>

        <p className="mt-1.5 text-[13px] text-ink-3">
          One-time automation builds: $150–$350 each. Optional monthly: Care
          $50/mo · Lite $39/mo (≤3 flows) · Standard $99/mo (≤10 flows, $129
          bundled with Care) · App Care $79/mo (DB sites).
        </p>
      </div>
    </div>
  );
}
