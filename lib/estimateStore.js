// Single source of truth for the unified pricing estimator (components/PricingEstimator.jsx)
// and the pricing packages / monthly plans (components/Pricing.jsx).
//
// Same decoupled philosophy as lib/quoteBus.js: no prop drilling, no context
// provider. The estimator, the tier cards + monthly plan cards, and the contact
// form (components/ContactForm.jsx) all subscribe to this store, so everything
// stays in one dynamic loop: clicking a package re-configures the estimator,
// estimator changes move the highlighted package, and the contact form fills
// itself live. lib/pricing.js is imported one-way (no cycle) so tier and
// monthly math come from the same numbers everywhere.
import { TIERS, MONTHLY_PLANS, calcMonthly } from "@/lib/pricing";

export const WEB_BASE = 600;
export const CONSULT_BASE = 350;

export const fmt = n => "$" + n.toLocaleString("en-US");

// Contact-form budget buckets (see components/ContactForm.jsx)
export const budgetFor = n =>
  n < 1500 ? "launch" : n < 3000 ? "growth" : "custom";

/* ---------------- Website options ---------------- */
export const PAGE_OPTIONS = [
  { id: "p1", add: 0, label: "1–3 pages", note: "included" },
  { id: "p2", add: 500, label: "4–6 pages", note: "+$500" },
  { id: "p3", add: 1200, label: "7 or more", note: "+$1,200" },
];

export const WEB_ADDONS = [
  { id: "blog", add: 400, label: "Blog / CMS" },
  { id: "booking", add: 350, label: "Online booking" },
  { id: "payments", add: 450, label: "Take payments" },
  { id: "supabase", add: 800, label: "Supabase DB & Auth" },
  { id: "store", add: 1500, label: "Online store" },
  // One-time automation builds (mirror lib/pricing.js AUTOMATION_BUILDS)
  { id: "auto-simple", add: 150, label: "Simple automation (+$39/mo Lite)" },
  { id: "auto-advanced", add: 350, label: "Advanced automation (+$39–99/mo)" },
];

/* ---------------- Consulting options ---------------- */
export const ENGAGEMENTS = [
  { id: "e1", add: 0, label: "Foundations only", note: "included" },
  { id: "e2", add: 250, label: "Foundations + outreach", note: "+$250" },
  { id: "e3", add: 500, label: "Growth partner", note: "+$500" },
];

export const CONSULT_ADDONS = [
  { id: "hire-kit", add: 150, label: "New-hire paperwork kit" },
  { id: "templates", add: 200, label: "Template & SOP library" },
  { id: "outreach-day", add: 175, label: "On-site outreach day" },
  { id: "contact-list", add: 120, label: "Contact list & follow-up system" },
];

/* ---------------- Modes ---------------- */
export const MODES = [
  { id: "web", label: "Website", note: "Build me a site" },
  { id: "consult", label: "Consulting", note: "Business help" },
  { id: "both", label: "Combined", note: "Website + consulting" },
];

/* ---------------- The store ---------------- */
const DEFAULT_STATE = {
  mode: "web",
  pagesId: PAGE_OPTIONS[0].id,
  addonIds: [],
  engagementId: ENGAGEMENTS[0].id,
  serviceIds: [],
  // Monthly plans selected in the Pricing section (Care on by default, as the
  // section has always presented it)
  monthlyIds: ["care"],
  // Whether the user has interacted with the estimator at all
  touched: false,
};

let state = DEFAULT_STATE;
const listeners = new Set();

function commit(next) {
  state = next;
  listeners.forEach(l => l());
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return state;
}

export function getServerSnapshot() {
  return DEFAULT_STATE;
}

// Mark the store as used without changing any selection — used by the
// estimator's "Request this quote" button so the current (default) selections
// sync into the contact form even if nothing was clicked yet.
export function touchEstimate() {
  if (!state.touched) commit({ ...state, touched: true });
}

export function setMode(id) {
  commit({ ...state, mode: id, touched: true });
}

export function selectPages(id) {
  commit({ ...state, pagesId: id, touched: true });
}

export function toggleWebAddon(id) {
  commit({
    ...state,
    addonIds: state.addonIds.includes(id)
      ? state.addonIds.filter(x => x !== id)
      : [...state.addonIds, id],
    touched: true,
  });
}

export function selectEngagement(id) {
  commit({ ...state, engagementId: id, touched: true });
}

export function toggleConsultService(id) {
  commit({
    ...state,
    serviceIds: state.serviceIds.includes(id)
      ? state.serviceIds.filter(x => x !== id)
      : [...state.serviceIds, id],
    touched: true,
  });
}

/* -------- Pricing section (components/Pricing.jsx) -------- */

// Fixed package presets: selecting a tier card re-configures the estimator so
// its total matches the card's price exactly.
const TIER_PRESETS = {
  Launch: { pagesId: "p1", addonIds: [] }, // 600 + 0 + 0 = $600
  Growth: { pagesId: "p2", addonIds: ["blog"] }, // 600 + 500 + 400 = $1,500
  Custom: { pagesId: "p3", addonIds: ["store"] }, // 600 + 1,200 + 1,500 = $3,300
};

export function selectTier(name) {
  const preset = TIER_PRESETS[name] || TIER_PRESETS.Launch;
  const onWeb = state.mode === "web" || state.mode === "both";
  // If the estimate already falls in this package's range, treat the click as
  // "confirm my current scope" — don't wipe custom selections.
  if (onWeb && name === matchedTier(state).name) {
    commit({ ...state, touched: true });
    return;
  }
  commit({ ...state, mode: "web", ...preset, touched: true });
}

function nextMonthlyIds(prev, id) {
  // Lite and Standard are mutually exclusive — one automation plan at a time
  if (id === "lite" && !prev.includes("lite")) {
    return [...prev.filter(x => x !== "standard"), "lite"];
  }
  if (id === "standard" && !prev.includes("standard")) {
    return [...prev.filter(x => x !== "lite"), "standard"];
  }
  return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
}

export function toggleMonthlyPlan(id) {
  commit({
    ...state,
    monthlyIds: nextMonthlyIds(state.monthlyIds, id),
    touched: true,
  });
}

/* ---------------- Selectors ---------------- */
export function webTotal(s) {
  const pages = PAGE_OPTIONS.find(p => p.id === s.pagesId);
  return (
    WEB_BASE +
    pages.add +
    WEB_ADDONS.filter(a => s.addonIds.includes(a.id)).reduce(
      (sum, a) => sum + a.add,
      0,
    )
  );
}

export function consultTotal(s) {
  const engagement = ENGAGEMENTS.find(e => e.id === s.engagementId);
  return (
    CONSULT_BASE +
    engagement.add +
    CONSULT_ADDONS.filter(a => s.serviceIds.includes(a.id)).reduce(
      (sum, a) => sum + a.add,
      0,
    )
  );
}

export function combinedTotal(s) {
  return webTotal(s) + consultTotal(s);
}

// Total shown in the estimator readout — depends on active mode
export function activeTotal(s) {
  if (s.mode === "web") return webTotal(s);
  if (s.mode === "consult") return consultTotal(s);
  return combinedTotal(s);
}

// Which fixed package (TIERS in lib/pricing.js) the current estimate falls
// into — drives the selected ring on the tier cards so Pricing reacts live
// to estimator changes.
export function matchedTier(s) {
  const budget = budgetFor(activeTotal(s));
  return TIERS.find(t => t.budget === budget) || TIERS[0];
}

// Monthly-plan math for the shared selections (wraps lib/pricing.js calcMonthly)
export function monthlyFor(s) {
  return calcMonthly(s.monthlyIds);
}

// Itemized summary lines for the contact form — only includes a line when that
// side has selections (web always has a base; consult always has a base).
export function summaryLines(s) {
  const lines = [];
  const pages = PAGE_OPTIONS.find(p => p.id === s.pagesId);
  const webAddons = WEB_ADDONS.filter(a => s.addonIds.includes(a.id));
  const webLabel = `Website: ${pages.label}${
    webAddons.length ? " + " + webAddons.map(a => a.label).join(", ") : ""
  }`;

  const engagement = ENGAGEMENTS.find(e => e.id === s.engagementId);
  const services = CONSULT_ADDONS.filter(a => s.serviceIds.includes(a.id));
  const conLabel = `Consulting: ${engagement.label}${
    services.length ? " + " + services.map(a => a.label).join(", ") : ""
  }`;

  if (s.mode === "web" || s.mode === "both") {
    lines.push(`Package: ${matchedTier(s).name}`);
    lines.push(`${webLabel} — ${fmt(webTotal(s))}`);
  }
  if (s.mode === "consult" || s.mode === "both") {
    lines.push(`${conLabel} — ${fmt(consultTotal(s))}`);
  }
  if (s.mode === "both") {
    lines.push(`Combined estimate: ${fmt(combinedTotal(s))}`);
  }

  if (s.monthlyIds.length) {
    const { total: monthly, discount } = monthlyFor(s);
    const names = s.monthlyIds
      .map(id => (MONTHLY_PLANS.find(p => p.id === id) || {}).name)
      .filter(Boolean);
    const bundleNote =
      discount > 0 ? ` (bundled, saves ${fmt(discount)}/mo)` : "";
    lines.push(
      `Monthly plans: ${names.join(" + ")} — ${fmt(monthly)}/mo${bundleNote}`,
    );
  }

  return lines;
}

// Convenience: full message body for the contact form prefilled textarea
export function prefillMessage(s) {
  const intro =
    s.mode === "consult"
      ? "Hi! I used the consulting estimator on your site."
      : "Hi! I used the price estimator on your site.";
  return [intro, "", ...summaryLines(s), "", "A bit about my business: "].join(
    "\n",
  );
}

// Structured estimate for the n8n webhook payload. Ids stay stable for
// programmatic branching; labels are for humans. One webhook + a Switch node
// on `mode` (or `budget`) fans out to the individual workflows.
export function estimatePayload(s) {
  const pages = PAGE_OPTIONS.find(p => p.id === s.pagesId);
  const webAddons = WEB_ADDONS.filter(a => s.addonIds.includes(a.id));
  const engagement = ENGAGEMENTS.find(e => e.id === s.engagementId);
  const services = CONSULT_ADDONS.filter(a => s.serviceIds.includes(a.id));
  const mode = MODES.find(m => m.id === s.mode);
  const tier = matchedTier(s);
  const monthly = monthlyFor(s);
  const total = activeTotal(s);
  return {
    mode: s.mode,
    modeLabel: mode.label,
    budget: budgetFor(total),
    total,
    package: {
      name: tier.name,
      price: tier.price,
      priceNum: tier.priceNum,
      budget: tier.budget,
    },
    web: {
      selected: s.mode === "web" || s.mode === "both",
      pagesId: s.pagesId,
      pages: pages.label,
      addonIds: webAddons.map(a => a.id),
      addons: webAddons.map(a => a.label),
      total: webTotal(s),
    },
    consulting: {
      selected: s.mode === "consult" || s.mode === "both",
      engagementId: s.engagementId,
      engagement: engagement.label,
      addonIds: services.map(a => a.id),
      addons: services.map(a => a.label),
      total: consultTotal(s),
    },
    monthly: {
      planIds: s.monthlyIds,
      plans: s.monthlyIds
        .map(id => (MONTHLY_PLANS.find(p => p.id === id) || {}).name)
        .filter(Boolean),
      subtotal: monthly.subtotal,
      discount: monthly.discount,
      total: monthly.total,
      yearOne: tier.priceNum + monthly.total * 12,
    },
    summary: summaryLines(s),
  };
}