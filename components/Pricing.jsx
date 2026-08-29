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
    features: [
      "1–3 pages, custom design",
      "Mobile-first & fast",
      "Contact form",
      "Google SEO basics",
      "2 revision rounds",
      "Live in 2 weeks",
    ],
    budget: "launch",
    ctaLabel: "Start a Launch project",
  },
  {
    name: "Growth",
    sub: "For businesses ready to grow.",
    from: "One-time",
    price: "$1,500",
    plus: false,
    featured: true,
    tag: "Most booked",
    features: [
      "Everything in Launch",
      "Up to 6 pages + blog",
      "CMS you can edit yourself",
      "Advanced SEO + analytics",
      "Booking or simple payments",
      "4 revisions + 30-day support",
    ],
    budget: "growth",
    ctaLabel: "Start a Growth project",
  },
  {
    name: "Custom",
    sub: "Built around whatever you need.",
    from: "From",
    price: "$3,000",
    plus: true,
    featured: false,
    features: [
      "Everything in Growth",
      "E-commerce, portals, integrations",
      "Databases & workflow automation",
      "Ongoing partnership option",
      "Quoted to scope, always fixed",
    ],
    budget: "custom",
    ctaLabel: "Request a custom quote",
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
    <section className="sec" id="pricing">
      <div className="wrap">
        <header className="sec-head reveal">
          <p className="eyebrow">Pricing</p>
          <h2>Honest pricing, in the open.</h2>
          <p className="lede">
            Every project starts at <strong>$600</strong> and is quoted fixed,
            in writing, before any work begins. The number we say is the number
            you pay.
          </p>
        </header>

        <Reveal>
          <div className="tiers">
            {TIERS.map(t => (
              <article
                className={`tier${t.featured ? " featured" : ""}`}
                key={t.name}
              >
                <div className="tier-name">
                  {t.tag && <span className="tier-tag">{t.tag}</span>}
                  <h3>{t.name}</h3>
                  <p className="tier-sub">{t.sub}</p>
                </div>
                <div className="tier-price">
                  <span className="tier-from">{t.from}</span>
                  <strong>{t.price}</strong>
                  {t.plus && <span className="plus">+</span>}
                </div>
                <ul className="tier-feats">
                  {t.features.map(f => (
                    <li key={f}>
                      <Icon name="check" /> {f}
                    </li>
                  ))}
                </ul>
                <TierButton
                  tier={`${t.name} — ${t.price}`}
                  budget={t.budget}
                  ariaLabel={t.ctaLabel}
                />
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="pricing-notes">
            <div>
              <strong>Payment plans</strong>
              <span>
                50% to start, 50% at launch. Three-part splits on larger
                projects. No hidden fees, ever.
              </span>
            </div>
            <div>
              <strong>Your domain &amp; hosting</strong>
              <span>
                Not included — stays in your name, typically $40–60/year total.
                We set it up, you own it.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="plans-label">Optional monthly plans — cancel anytime</p>
          <div className="plans">
            {MONTHLY_PLANS.map(p => (
              <div className="plan" key={p.name}>
                <h3>{p.name}</h3>
                <p className="plan-price">
                  ${p.price}
                  <span>/mo</span>
                </p>
                <p className="plan-desc">{p.desc}</p>
                <ul>
                  {p.points.map(pt => (
                    <li key={pt}>
                      <Icon name="check" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="plans-note">
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
