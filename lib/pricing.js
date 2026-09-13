// Single source of truth for all pricing — one-time tiers + monthly plans + automation.
// Pricing.jsx, PricingEstimator (via estimateStore), FAQ, and Contact all read from these numbers
// so the client always sees the same math everywhere. No hidden fees.

export const TIERS = [
  {
    name: "Launch",
    sub: "Your first real website.",
    from: "One-time",
    price: "$600",
    priceNum: 600,
    plus: false,
    featured: false,
    budget: "launch",
    ctaLabel: "Start a Launch project",
    features: [
      "1–3 pages, custom design",
      "Mobile-first & fast",
      "Contact form",
      "Google SEO basics",
      "2 revision rounds",
      "Live in 2 weeks",
    ],
    // Correlated automation transparency — shown under the tier
    automationNote: "No automation required. Add form-to-email + notifications later for $150 one-time + $39/mo Lite.",
    typicalMonthly: "Most Launch clients add: Care $50/mo. Automations optional.",
  },
  {
    name: "Growth",
    sub: "For businesses ready to grow.",
    from: "One-time",
    price: "$1,500",
    priceNum: 1500,
    plus: false,
    featured: true,
    tag: "Most booked",
    budget: "growth",
    ctaLabel: "Start a Growth project",
    features: [
      "Everything in Launch",
      "Up to 6 pages + blog",
      "CMS you can edit yourself",
      "Advanced SEO + analytics",
      "Booking or simple payments",
      "4 revisions + 30-day support",
    ],
    automationNote: "Includes 1 automation build credit (form handling + notifications, $150–$350 value). Runs on Automation Lite $39/mo.",
    typicalMonthly: "Most Growth clients pay: $50 Care + $39 Lite = $89/mo.",
  },
  {
    name: "Custom",
    sub: "Built around whatever you need.",
    from: "From",
    price: "$3,000",
    priceNum: 3000,
    plus: true,
    featured: false,
    budget: "custom",
    ctaLabel: "Request a custom quote",
    features: [
      "Everything in Growth",
      "E-commerce & web portals",
      "Supabase database apps",
      "Custom workflow automation",
      "Ongoing partnership option",
      "Quoted to scope, always fixed",
    ],
    automationNote: "Workflows quoted to scope: $150–$350 each one-time. Hosting: Lite $39/mo (up to 3) or Standard $99/mo (up to 10).",
    typicalMonthly: "Most Custom clients pay: $50 Care + $99 Standard = $129/mo (bundle). + App Care $79 if database.",
  },
];

export const MONTHLY_PLANS = [
  {
    id: "care",
    name: "Care plan",
    price: 50,
    desc: "Your website, kept healthy.",
    points: ["Edits & content updates", "Updates & backups", "Priority support"],
    footnote: "Required for edits-after-launch. Cancel anytime.",
  },
  {
    id: "lite",
    name: "Automation Lite",
    price: 39,
    desc: "Form handling & notifications.",
    points: [
      "Up to 3 workflows",
      "n8n hosting & monitoring",
      "Fixes within 2 business days",
    ],
    footnote: "New workflows are one-time builds: $150–$350 each.",
  },
  {
    id: "standard",
    name: "Automation Standard",
    price: 99,
    desc: "For sites that run on automation.",
    points: [
      "Up to 10 workflows",
      "n8n hosting & 24/7 monitoring",
      "Priority fixes + updates",
    ],
    footnote: "Best for booking, CRM sync, follow-ups. Builds $150–$350 each.",
  },
  {
    id: "app",
    name: "App Care",
    price: 79,
    desc: "Database & backend security.",
    points: [
      "Database schema versioning",
      "Supabase RLS & auth audits",
      "1 hr of data tweaks monthly",
    ],
    footnote: "Only needed if your site has a Supabase DB (Custom tier).",
  },
];

// One-time automation builds (also mirrored in estimateStore WEB_ADDONS)
export const AUTOMATION_BUILDS = [
  { id: "auto-simple", label: "Simple automation", price: 150, desc: "1 form → email/notify workflow" },
  { id: "auto-advanced", label: "Advanced automation", price: 350, desc: "CRM sync, scheduling, multi-step" },
];

export const HANDOVER_FEE = 300;

// Bundle discounts — stack logic in one place
export const BUNDLES = [
  {
    id: "care-standard",
    ids: ["care", "standard"],
    save: 20,
    label: "Care + Standard bundle (-$20/mo)",
    math: "$50 + $99 = $149 → $129/mo",
  },
  {
    id: "care-app",
    ids: ["care", "app"],
    save: 15,
    label: "App bundle (-$15/mo)",
    math: "$50 + $79 = $129 → $114/mo",
  },
];

export function calcMonthly(selectedIds) {
  let subtotal = selectedIds.reduce((sum, id) => {
    const plan = MONTHLY_PLANS.find(p => p.id === id);
    return sum + (plan ? plan.price : 0);
  }, 0);
  let discount = 0;
  const activeBundles = [];
  for (const b of BUNDLES) {
    if (b.ids.every(id => selectedIds.includes(id))) {
      discount += b.save;
      activeBundles.push(b);
    }
  }
  return { subtotal, discount, total: subtotal - discount, activeBundles };
}

export const fmt = n => "$" + n.toLocaleString("en-US");
