"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Icon from "./Icon";
import TierButton from "./TierButton";
import PricingEstimator from "./PricingEstimator";
import { TIERS, MONTHLY_PLANS, calcMonthly, fmt } from "@/lib/pricing";

export default function Pricing() {
  // Track selected upfront tier name and active monthly items
  const [selectedTier, setSelectedTier] = useState("Launch");
  const [selectedMonthly, setSelectedMonthly] = useState(["care"]); // care active by default

  const handleToggleMonthly = id => {
    setSelectedMonthly(prev => {
      // Lite and Standard are mutually exclusive — one automation plan at a time
      if (id === "lite" && !prev.includes("lite")) {
        return [...prev.filter(x => x !== "standard"), "lite"];
      }
      if (id === "standard" && !prev.includes("standard")) {
        return [...prev.filter(x => x !== "lite"), "standard"];
      }
      return prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
    });
  };

  // Get pricing value numbers cleanly (single source: lib/pricing.js)
  const activeTierObj = TIERS.find(t => t.name === selectedTier);
  const basePriceNum = activeTierObj.priceNum;

  // Monthly math + bundles from single source of truth
  const {
    subtotal: monthlySubtotal,
    discount: monthlyDiscount,
    total: totalMonthly,
    activeBundles,
  } = calcMonthly(selectedMonthly);
  const hasBundleDiscount = activeBundles.length > 0;
  const yearOne = basePriceNum + totalMonthly * 12;

  return (
    <section id="pricing" className="sec">
      <div className="wrap">
        <header className="reveal mb-[52px] max-w-[640px]">
          <p className="eyebrow">Pricing</p>
          <h2 className="mb-3 mt-3.5 font-serif text-[clamp(30px,4.6vw,44px)] font-medium leading-[1.08] tracking-tight">
            Honest pricing, in the open.
          </h2>
          <p className="text-[17.5px] text-ink-2">
            Every project starts at{" "}
            <strong className="font-semibold">$600</strong> and is quoted in
            writing, before any work begins. The number we say is the number you
            pay — one-time build + optional monthly, all shown together below.
          </p>
        </header>

        {/* --- UPFRONT TIERS LIST (each tier shows its correlated automation cost) --- */}
        <Reveal>
          <div className="overflow-hidden rounded-[18px] border border-line-strong bg-raised transition-colors duration-350">
            {TIERS.map(t => {
              const isSelected = selectedTier === t.name;
              const tone = t.featured
                ? {
                    row: "bg-feat border-feat-line",
                    name: "text-feat-text",
                    sub: "text-feat-2",
                    from: "text-feat-2",
                    price: "text-feat-text",
                    plus: "text-feat-accent",
                    feat: "text-feat-2",
                    check: "text-feat-accent",
                    note: "text-feat-2",
                    go: "border-feat-line text-feat-text hover:border-feat-text hover:bg-feat-text hover:text-feat",
                  }
                : {
                    row: "border-line",
                    name: "text-ink",
                    sub: "text-ink-3",
                    from: "text-ink-3",
                    price: "text-ink",
                    plus: "text-accent",
                    feat: "text-ink-2",
                    check: "text-accent-bright",
                    note: "text-ink-3",
                    go: "border-line-strong text-ink hover:border-btn hover:bg-btn hover:text-btn-text",
                  };

              return (
                <article
                  key={t.name}
                  onClick={() => setSelectedTier(t.name)}
                  className={`grid gap-5 border-b p-[30px] last:border-b-0 lg:grid-cols-[1.15fr_210px_1.7fr_56px] lg:items-center lg:gap-[30px] lg:p-[36px] cursor-pointer transition-all ${
                    tone.row
                  } ${isSelected ? "ring-2 ring-accent-bright ring-offset-2 ring-offset-raised" : ""}`}
                >
                  <div>
                    {t.tag && (
                      <span className="mb-2.5 inline-block rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900">
                        {t.tag}
                      </span>
                    )}
                    <h3
                      className={`mb-[3px] font-serif text-[25px] font-medium flex items-center gap-2 ${tone.name}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-accent-bright" : "border-line-strong"}`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-accent-bright" />
                        )}
                      </div>
                      {t.name}
                    </h3>
                    <p className={`text-[14.5px] ${tone.sub}`}>{t.sub}</p>
                  </div>
                  <div>
                    <span
                      className={`mb-0.5 block text-[12px] font-semibold uppercase tracking-[0.12em] ${tone.from}`}
                    >
                      {t.from}
                    </span>
                    <strong
                      className={`font-serif text-[46px] font-medium leading-none tracking-tight ${tone.price}`}
                    >
                      {t.price}
                    </strong>
                    {t.plus && (
                      <span className={`text-[46px] ${tone.plus}`}>+</span>
                    )}
                  </div>
                  <div>
                    <ul className="flex flex-wrap gap-x-[22px] gap-y-2">
                      {t.features.map(f => (
                        <li
                          key={f}
                          className={`flex items-center gap-[7px] text-[14.5px] ${tone.feat}`}
                        >
                          <Icon
                            name="check"
                            className={
                              t.featured && isSelected
                                ? "text-amber-400"
                                : tone.check
                            }
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {t.automationNote && (
                      <p className={`mt-3 text-[13px] leading-snug ${tone.note}`}>
                        <span className="font-semibold">
                          ⚙ Automation:{" "}
                        </span>
                        {t.automationNote}
                      </p>
                    )}
                    {t.typicalMonthly && (
                      <p className={`mt-1 text-[13px] font-medium ${tone.note}`}>
                        {t.typicalMonthly}
                      </p>
                    )}
                  </div>
                  <div onClick={e => e.stopPropagation()}>
                    <TierButton
                      tier={`${t.name} — ${t.price}`}
                      budget={t.budget}
                      ariaLabel={t.ctaLabel}
                      btnClass={tone.go}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        {/* --- GENERAL BUSINESS TERMS --- */}
        <Reveal>
          <div className="mt-[26px] grid gap-6 sm:grid-cols-3">
            <div className="border-l-2 border-accent-bright pl-4">
              <strong className="block text-[15px]">Payment plans</strong>
              <span className="text-[14.5px] text-ink-2">
                50% to start, 50% at launch. Three-part splits on larger
                projects. No hidden fees, ever.
              </span>
            </div>
            <div className="border-l-2 border-accent-bright pl-4">
              <strong className="block text-[15px]">
                Your domain &amp; hosting
              </strong>
              <span className="text-[14.5px] text-ink-2">
                Not included — stays in your name, typically $40–60/year total.
                We set it up, you own it.
              </span>
            </div>
            <div className="border-l-2 border-accent-bright pl-4">
              <strong className="block text-[15px]">Automation builds</strong>
              <span className="text-[14.5px] text-ink-2">
                New workflows are one-time builds ($150–$350 each), then run on
                Lite $39/mo or Standard $99/mo. Quoted in writing first.
              </span>
            </div>
          </div>
        </Reveal>

        {/* --- STACKABLE MONTHLY MATRICES --- */}
        <Reveal>
          <div className="mt-12 flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
              Optional monthly plans — Choose all that apply (They Stack)
            </p>
            <div className="flex flex-wrap gap-2">
              {activeBundles.map(b => (
                <span
                  key={b.id}
                  className="text-[12px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded animate-pulse"
                >
                  🎉 {b.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-[18px] grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {MONTHLY_PLANS.map(p => {
              const isChecked = selectedMonthly.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => handleToggleMonthly(p.id)}
                  className={`border rounded-xl p-5 cursor-pointer transition-all duration-200 select-none ${
                    isChecked
                      ? "border-accent-bright bg-accent-bright/[0.03] shadow-sm"
                      : "border-line bg-transparent hover:border-line-strong"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-[19px] font-medium text-ink">
                      {p.name}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-accent-bright border-accent-bright"
                          : "border-line-strong"
                      }`}
                    >
                      {isChecked && (
                        <Icon name="check" className="text-white text-[12px]" />
                      )}
                    </div>
                  </div>
                  <p className="font-serif text-[36px] font-medium leading-none tracking-tight text-ink">
                    ${p.price}
                    <span className="font-sans text-[14px] tracking-normal text-ink-3">
                      {" "}
                      /mo{" "}
                    </span>
                  </p>
                  <p className="mb-3.5 mt-2 text-[14px] text-ink-3">{p.desc}</p>
                  <ul className="grid gap-2">
                    {p.points.map(pt => (
                      <li
                        key={pt}
                        className="flex items-start gap-2 text-[14px] text-ink-2"
                      >
                        <Icon
                          name="check"
                          className="mt-1 text-accent-bright flex-shrink-0"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {p.footnote && (
                    <p className="mt-3 border-t border-line pt-2.5 text-[12.5px] leading-snug text-ink-3">
                      {p.footnote}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-[22px] max-w-[72ch] text-[13.5px] text-ink-3">
            Monthly plans stack to match your site. <strong>Care $50</strong> +
            <strong> Lite $39</strong> = $89/mo. <strong>Care $50</strong> +
            <strong> Standard $99</strong> = $149 →{" "}
            <strong>$129/mo bundled</strong> (save $20).{" "}
            <strong>Care $50</strong> + <strong>App Care $79</strong> = $129 →{" "}
            <strong>$114/mo bundled</strong> (save $15). Lite and Standard are
            mutually exclusive — you only ever pay for one automation plan.
            New workflows are one-time builds ($150–$350 each), quoted first.
          </p>

          {/* --- LIVE TOTAL TRACKER: everything up front --- */}
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-accent-bright/40 bg-accent-bright/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.13em] text-ink-3">
                Your total — {activeTierObj.name} selected
              </p>
              <p className="mt-1 font-serif text-[24px] font-medium leading-tight text-ink">
                {fmt(basePriceNum)} one-time
                <span className="text-ink-3"> + </span>
                {fmt(totalMonthly)}
                <span className="font-sans text-[15px] text-ink-3">/mo</span>
                {monthlyDiscount > 0 && (
                  <span className="ml-2 align-middle rounded bg-emerald-500/15 px-2 py-0.5 font-sans text-[12px] font-bold text-emerald-600">
                    saves {fmt(monthlyDiscount)}/mo
                  </span>
                )}
              </p>
              <p className="mt-1 text-[13px] text-ink-3">
                {monthlySubtotal !== totalMonthly
                  ? `Monthly ${fmt(monthlySubtotal)} − bundle ${fmt(monthlyDiscount)} = ${fmt(totalMonthly)}/mo · `
                  : ""}
                Year-one all-in:{" "}
                <strong className="text-ink">{fmt(yearOne)}</strong> (
                {fmt(basePriceNum)} + {fmt(totalMonthly)} × 12). Cancel monthly
                anytime.
              </p>
            </div>
            <div onClick={e => e.stopPropagation()}>
              <TierButton
                tier={`${activeTierObj.name} — ${activeTierObj.price} + ${fmt(totalMonthly)}/mo`}
                budget={activeTierObj.budget}
                ariaLabel={`Request ${activeTierObj.name} at ${fmt(basePriceNum)} plus ${fmt(totalMonthly)} monthly`}
                btnClass="border-btn bg-btn text-btn-text hover:bg-amber-500 !inline-flex !w-auto !h-auto px-6 py-3 rounded-full text-[15px] font-semibold gap-2"
              >
                Get this total
              </TierButton>
            </div>
          </div>
        </Reveal>
        {/* --- PROJECT SCOPE ESTIMATOR MODULE --- */}
        <Reveal>
          <PricingEstimator />
        </Reveal>
      </div>
    </section>
  );
}
