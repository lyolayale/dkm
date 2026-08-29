import Reveal from "./Reveal";
import Icon from "./Icon";
import TierButton from "./TierButton";
import Estimator from "./Estimator";

const TIERS = [
  {
    name: "Launch",
    sub: "Your first real website.",
    from: "One-time",
    price: "$600",
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
  },
  {
    name: "Growth",
    sub: "For businesses ready to grow.",
    from: "One-time",
    price: "$1,500",
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
  },
  {
    name: "Custom",
    sub: "Built around whatever you need.",
    from: "From",
    price: "$3,000",
    plus: true,
    featured: false,
    budget: "custom",
    ctaLabel: "Request a custom quote",
    features: [
      "Everything in Growth",
      "E-commerce, portals, integrations",
      "Databases & workflow automation",
      "Ongoing partnership option",
      "Quoted to scope, always fixed",
    ],
  },
];

const MONTHLY_PLANS = [
  {
    name: "Care plan",
    price: 50,
    desc: "Your website, kept healthy.",
    points: [
      "Edits & content updates",
      "Updates & backups",
      "Priority support",
    ],
  },
  {
    name: "Automation Lite",
    price: 39,
    desc: "Form handling & notifications.",
    points: [
      "Up to 3 workflows",
      "n8n hosting, monitoring, updates",
      "Fixes within 2 business days",
    ],
  },
  {
    name: "Automation Standard",
    price: 99,
    desc: "CRM sync, scheduling, alerts.",
    points: [
      "Up to 10 workflows",
      "Fixes within 1 business day",
      "30 min of tweaks monthly",
    ],
  },
];

export default function Pricing() {
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
            <strong className="font-semibold">$600</strong> and is quoted fixed,
            in writing, before any work begins. The number we say is the number
            you pay.
          </p>
        </header>

        <Reveal>
          <div className="overflow-hidden rounded-[18px] border border-line-strong bg-raised transition-colors duration-[350ms]">
            {TIERS.map(t => {
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
                    go: "border-line-strong text-ink hover:border-btn hover:bg-btn hover:text-btn-text",
                  };
              return (
                <article
                  key={t.name}
                  className={`grid gap-5 border-b p-[30px] last:border-b-0 lg:grid-cols-[1.15fr_210px_1.7fr_56px] lg:items-center lg:gap-[30px] lg:p-[36px] ${tone.row}`}
                >
                  <div>
                    {t.tag && (
                      <span className="mb-2.5 inline-block rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900">
                        {t.tag}
                      </span>
                    )}
                    <h3
                      className={`mb-[3px] font-serif text-[25px] font-medium ${tone.name}`}
                    >
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
                  <ul className="flex flex-wrap gap-x-[22px] gap-y-2">
                    {t.features.map(f => (
                      <li
                        key={f}
                        className={`flex items-center gap-[7px] text-[14.5px] ${tone.feat}`}
                      >
                        <Icon name="check" className={tone.check} /> {f}
                      </li>
                    ))}
                  </ul>
                  <TierButton
                    tier={`${t.name} — ${t.price}`}
                    budget={t.budget}
                    ariaLabel={t.ctaLabel}
                    btnClass={tone.go}
                  />
                </article>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-[26px] grid gap-6 sm:grid-cols-2">
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
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-12 text-[13px] font-semibold uppercase tracking-[0.13em] text-ink-3">
            Optional monthly plans — cancel anytime
          </p>
          <div className="mt-[18px] grid md:grid-cols-3">
            {MONTHLY_PLANS.map(p => (
              <div
                key={p.name}
                className="border-t border-line py-[18px] lg:border-l lg:border-t-0 lg:py-1 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <h3 className="mb-2.5 font-serif text-[19px] font-medium">
                  {p.name}
                </h3>
                <p className="font-serif text-[36px] font-medium leading-none tracking-tight">
                  ${p.price}
                  <span className="font-sans text-[14px] tracking-normal text-ink-3">
                    /mo
                  </span>
                </p>
                <p className="mb-3.5 mt-2 text-[14px] text-ink-3">{p.desc}</p>
                <ul className="grid gap-2">
                  {p.points.map(pt => (
                    <li
                      key={pt}
                      className="flex items-start gap-2 text-[14px] text-ink-2"
                    >
                      <Icon name="check" className="mt-1 text-accent-bright" />{" "}
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-[22px] max-w-[72ch] text-[13.5px] text-ink-3">
            Monthly plans cover running and maintaining your automations —
            hosting, monitoring, updates, and fixes when a connected service
            changes. Building new workflows is one-time work, typically
            $150–350, always quoted fixed. Best value: care plan + Automation
            Standard together for $129/mo. Fair use: 10,000 runs/month.
          </p>
        </Reveal>

        <Estimator />
      </div>
    </section>
  );
}
