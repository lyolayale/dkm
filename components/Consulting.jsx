import Reveal from "./Reveal";
import Icon from "./Icon";
import ConsultingEstimator from "./ConsultingEstimator";

// The co-founder's half of DKM: marketing & consulting services + prices.
// Prices shown here mirror the estimator data in lib/estimateStore.js —
// if you change a price, update it in both places.
//
// EDIT: add her name below if you want it public — the role copy stands either way.

const SERVICES = [
  {
    n: "01",
    title: "Business Foundations",
    price: "from $350",
    body: "Company organization and structure, done properly: a professional business model built around how you actually operate, plus the documents you\u2019re missing \u2014 contracts, invoices, and new-hire paperwork you\u2019ll reuse for years.",
    tags: "Business model · Structure · Docs & templates",
  },
  {
    n: "02",
    title: "Face-to-Face Outreach",
    price: "from $175 / day",
    body: "Real conversations, in person. She meets potential clients where they are, gathers contacts into a clean follow-up list, and hands you warm leads \u2014 name, business, need, and the best time to call.",
    tags: "On-site visits · Contact gathering · Warm intros",
  },
  {
    n: "03",
    title: "Consulting Sessions",
    price: "$65 / hour",
    body: "One-on-one working sessions on structure, pricing, and process. You leave every session with decisions made and a short action list \u2014 not homework.",
    tags: "1-on-1 · Strategy · Action plan",
  },
];

const SHE_HANDLES = [
  "Company organization & structure",
  "Professional business models & documentation",
  "New-hire paperwork & reusable templates",
  "Face-to-face client outreach",
  "Contact gathering & follow-up systems",
];

export default function Consulting() {
  return (
    <section id="consulting" className="sec">
      <div className="wrap">
        <header className="reveal mb-[52px] max-w-[640px]">
          <p className="eyebrow">Marketing &amp; Consulting</p>
          <h2 className="mb-3 mt-3.5 font-serif text-[clamp(30px,4.6vw,44px)] font-medium leading-[1.08] tracking-tight">
            The business side, handled.
          </h2>
          <p className="text-[17.5px] text-ink-2">
            A website brings clients in &mdash; structure keeps them. Our
            co-founder runs the marketing &amp; consulting side: organization,
            documentation, and face-to-face outreach that fills your contact
            list.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] font-medium text-ink-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
            Founding-client rates &mdash; we just opened the doors
          </p>
        </header>

        {/* --- SERVICE + PRICE ROWS --- */}
        <div className="border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.n}
              className={
                i === 1 ? "delay-[70ms]" : i === 2 ? "delay-[140ms]" : ""
              }
            >
              <article className="group grid items-baseline gap-[30px] border-b border-line py-[38px] transition-[padding] duration-300 hover:pl-2.5 max-lg:grid-cols-[56px_1fr] lg:grid-cols-[84px_1fr_260px]">
                <span className="font-serif text-[26px] text-ink-3 transition-colors duration-300 group-hover:text-accent">
                  {s.n}
                </span>
                <div>
                  <h3 className="mb-2 font-serif text-[26px] font-medium">
                    {s.title}
                  </h3>
                  <p className="max-w-[52ch] text-ink-2">{s.body}</p>
                </div>
                <div className="max-lg:col-start-2">
                  <p className="font-serif text-[22px] font-medium tracking-tight text-ink">
                    {s.price}
                  </p>
                  <p className="mt-1 text-[14.5px] tracking-[0.02em] text-ink-3">
                    {s.tags}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* --- CO-FOUNDER PANEL (featured tokens — inverts cleanly in dark mode) --- */}
        <Reveal>
          <div className="mt-[64px] grid gap-[30px] rounded-[18px] bg-feat p-[30px] text-feat-text transition-colors duration-[350ms] md:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-feat-accent">
                Co-founder · Head of Marketing &amp; Consulting
              </p>
              <h3 className="mb-3 mt-3.5 font-serif text-[clamp(24px,3vw,32px)] font-medium leading-[1.1] tracking-tight">
                Two founders. One table.
              </h3>
              <p className="max-w-[52ch] text-[15.5px] text-feat-2">
                DKM is a husband-and-wife business. Websites, databases, and
                automation come from one side of the table; marketing,
                consulting, and everything organizational come from the other.
                Hire DKM and you get both &mdash; one point of contact, one
                fixed quote.
              </p>
            </div>
            <ul className="grid content-start gap-[10px] self-center">
              {SHE_HANDLES.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] text-feat-2"
                >
                  <Icon
                    name="check"
                    className="mt-0.5 shrink-0 text-feat-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* --- CONSULTING SCOPE ESTIMATOR (synced with the Pricing estimator) --- */}
        <Reveal>
          <ConsultingEstimator />
        </Reveal>
      </div>
    </section>
  );
}