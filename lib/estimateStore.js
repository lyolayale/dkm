// Single source of truth for the unified pricing estimator (components/PricingEstimator.jsx).
//
// Same decoupled philosophy as lib/quoteBus.js: no prop drilling, no context
// provider. The estimator and the contact form (components/ContactForm.jsx)
// both subscribe to this store, so the form can show a live, itemized estimate
// that updates in real time as the user changes options.

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
    lines.push(`${webLabel} — ${fmt(webTotal(s))}`);
  }
  if (s.mode === "consult" || s.mode === "both") {
    lines.push(`${conLabel} — ${fmt(consultTotal(s))}`);
  }
  if (s.mode === "both") {
    lines.push(`Combined estimate: ${fmt(combinedTotal(s))}`);
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