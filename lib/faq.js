// Single source of truth for FAQ text — rendered on the page AND used for the
// FAQPage JSON-LD schema, so Google and visitors always see identical answers.
export const FAQ_ITEMS = [
  {
    q: "What does the $600 actually include?",
    a: "Everything you need to be online: a custom 1–3 page design, mobile-first build, contact form, basic Google SEO, two rounds of revisions, and launch. The only things outside it are your domain and hosting, which typically run $40–60 per year total and stay in your name.",
  },
  {
    q: "Are there any hidden costs?",
    a: "No. You get a fixed quote in writing before we start, and that is the number you pay. One-time builds: Launch $600, Growth $1,500, Custom from $3,000, plus one-time automation builds ($150–$350 each) only if you want them. Optional monthly plans: Care $50, Automation Lite $39, Automation Standard $99 ($129 bundled with Care), App Care $79 ($114 bundled with Care). The Pricing section adds it all up — one-time + monthly + year-one total — before you ever contact us. If you ask for work outside the scope, we quote it separately first. You will never see a surprise invoice.",
  },
  {
    q: "How long does it take?",
    a: "A Launch site is typically live two weeks after our kickoff call. Growth projects take about three weeks, and Custom timelines are agreed in the quote.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes — the standard split is 50% to start and 50% at launch. Larger projects can be split into three payments. Monthly plans are billed monthly and you can cancel anytime.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Small tweaks are free for 30 days on Growth and Custom. After that, join the care plan at $50/month for edits, updates, and backups, or pay hourly at $60 with a one-hour minimum.",
  },
  {
    q: "Can you fix or redesign my existing website?",
    a: "Absolutely. We review what you have, keep what works, and rebuild what doesn't. Redesigns start at $600 just like new sites — we scope it on the call.",
  },
  {
    q: "Do you help with the business side too, not just the website?",
    a: "Yes. Our co-founder leads the marketing & consulting side: company organization and structure, professional business models with the documentation to match (new-hire paperwork, contracts, reusable templates), and face-to-face outreach that builds your contact list. Consulting sessions are $65/hour and full engagements start at $350 — the estimator in the consulting section breaks it down.",
  },
  {
    q: "What is the monthly automation fee?",
    a: "If your site includes automations — form-to-CRM syncing, notifications, scheduled tasks — they run on our monitored n8n infrastructure. Automation Lite is $39/month (up to 3 workflows) and Automation Standard is $99/month (up to 10, or $129/month bundled with the $50 care plan — you save $20). Building new workflows is one-time work: $150 for a simple automation, $350 for an advanced one. The monthly fee covers hosting, 24/7 monitoring, software updates, and fixing anything that breaks when a connected service changes. The Pricing section shows your one-time + monthly + year-one total up front, so there are no surprises.",
  },
  {
    q: "What happens to my automations if I cancel?",
    a: "Workflows stop running at the end of the paid period, but nothing is lost — your data stays yours. On request we will export your workflows in standard n8n format so any developer can re-host them for you (optional one-time $300 handover).",
  },
  {
    q: "Can I start without automations and add them later?",
    a: "Yes — most clients do. We build the site first, and once you see where the manual work piles up (form emails, follow-ups, scheduling), we quote the automations that remove it. New workflows are one-time builds — $150 simple, $350 advanced — then run on Lite $39/month or Standard $99/month. The Growth tier includes 1 automation build credit; Launch and Custom quote builds to scope. No lock-in either way.",
  },
];
