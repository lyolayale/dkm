// Single source of truth for BOTH pricing estimators — the website estimator
// in components/Estimator.jsx (Pricing section) and the consulting estimator
// in components/ConsultingEstimator.jsx (Consulting section).
//
// Same decoupled philosophy as lib/quoteBus.js: no prop drilling, no context
// provider. Both estimators subscribe to this tiny module-level store, so a
// selection made in one section instantly shows up in the other (combined
// estimate + itemized quote in the contact form).

export const WEB_BASE = 600;
export const CONSULT_BASE = 350;

export const fmt = n => "$" + n.toLocaleString("en-US");

// Contact-form budget buckets (see components/ContactForm.jsx)
export const budgetFor = n =>
  n < 1500 ? "launch" : n < 3000 ? "growth" : "custom";

/* ---------------- Website options (components/Estimator.jsx) ---------------- */
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
];

/* ----------- Consulting options (components/ConsultingEstimator.jsx) -------- */
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

/* ----------------------------- The shared store ----------------------------- */
const DEFAULT_STATE = {
  pagesId: PAGE_OPTIONS[0].id,
  addonIds: [],
  engagementId: ENGAGEMENTS[0].id,
  serviceIds: [],
  // "Touched" flags: each estimator only surfaces the other side's picks once
  // that estimator has actually been used by the visitor.
  webTouched: false,
  conTouched: false,
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

// Server render + first hydration always start from the default state
export function getServerSnapshot() {
  return DEFAULT_STATE;
}

export function selectPages(id) {
  commit({ ...state, pagesId: id, webTouched: true });
}

export function toggleWebAddon(id) {
  commit({
    ...state,
    addonIds: state.addonIds.includes(id)
      ? state.addonIds.filter(x => x !== id)
      : [...state.addonIds, id],
    webTouched: true,
  });
}

export function selectEngagement(id) {
  commit({ ...state, engagementId: id, conTouched: true });
}

export function toggleConsultService(id) {
  commit({
    ...state,
    serviceIds: state.serviceIds.includes(id)
      ? state.serviceIds.filter(x => x !== id)
      : [...state.serviceIds, id],
    conTouched: true,
  });
}

/* -------------------------- Selectors (pure helpers) ------------------------ */
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

// Itemized lines used by BOTH estimators when prefilling the contact form,
// so the wording can never drift between the two sections.
export function webSummaryLines(s) {
  const pages = PAGE_OPTIONS.find(p => p.id === s.pagesId);
  const addons = WEB_ADDONS.filter(a => s.addonIds.includes(a.id));
  return [
    `Website: ${pages.label}${addons.length ? " + " + addons.map(a => a.label).join(", ") : ""}`,
    `Website estimate: about ${fmt(webTotal(s))}`,
  ];
}

export function consultSummaryLines(s) {
  const engagement = ENGAGEMENTS.find(e => e.id === s.engagementId);
  const services = CONSULT_ADDONS.filter(a => s.serviceIds.includes(a.id));
  return [
    `Consulting: ${engagement.label}${services.length ? " + " + services.map(a => a.label).join(", ") : ""}`,
    `Consulting estimate: about ${fmt(consultTotal(s))}`,
  ];
}