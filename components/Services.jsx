import Reveal from "./Reveal";

const SERVICES = [
  {
    n: "01",
    title: "Design",
    body: "A clear, good-looking site that tells people what you do, why you\u2019re good at it, and exactly how to hire you.",
    tags: "Strategy · Copy polish · Custom design",
  },
  {
    n: "02",
    title: "Build",
    body: "Modern, fast, and flawless on every phone. Forms, booking, and payments — wired up, tested, and launched.",
    tags: "Next.js · Forms & payments · SEO-ready",
  },
  {
    n: "03",
    title: "Care",
    body: "After launch we stay on call: edits, updates, and backups — only when you want them.",
    tags: "Edits · Updates · Care plan from $50/mo",
  },
];

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <header className="sec-head reveal">
          <p className="eyebrow">What we do</p>
          <h2>Three things, done well.</h2>
          <p className="lede">
            Nothing you don&rsquo;t need. Everything required to look credible
            and get hired.
          </p>
        </header>

        <div className="svc-list">
          {SERVICES.map(s => (
            <Reveal className="svc" key={s.n}>
              <span className="svc-n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
              <p className="svc-tags">{s.tags}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
