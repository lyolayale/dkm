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
    <section className="sec" id="process">
      <div className="wrap">
        <header className="sec-head reveal">
          <p className="eyebrow">How it works</p>
          <h2>No mystery, no jargon.</h2>
        </header>

        <Reveal>
          <ol className="steps">
            {STEPS.map(s => (
              <li key={s.n}>
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
