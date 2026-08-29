import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "A 20-minute call",
    body: "Tell us about the business and where you want it to go.",
  },
  {
    n: "02",
    title: "A fixed quote in 48h",
    body: "Scope and price in writing. Take it or leave it — no pressure.",
  },
  {
    n: "03",
    title: "We build, you approve",
    body: "Check-ins along the way. You always know where things stand.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Live in as little as two weeks, with a full walkthrough.",
  },
];

export default function Process() {
  return (
    <section id="process" className="sec">
      <div className="wrap">
        <header className="reveal mb-[52px] max-w-[640px]">
          <p className="eyebrow">How it works</p>
          <h2 className="mb-3 mt-3.5 font-serif text-[clamp(30px,4.6vw,44px)] font-medium leading-[1.08] tracking-tight">
            No mystery, no jargon.
          </h2>
        </header>

        <Reveal>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(s => (
              <li
                key={s.n}
                className="border-t border-line pb-2 pt-5 first:border-t-0 first:pt-0 lg:border-l lg:border-t-0 lg:pb-1 lg:pl-6 lg:pt-1 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="mb-2.5 block font-serif text-[17px] italic text-accent">
                  {s.n}
                </span>
                <h3 className="mb-1.5 font-serif text-[19px] font-medium">
                  {s.title}
                </h3>
                <p className="text-[15px] text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
