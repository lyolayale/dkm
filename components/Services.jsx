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
    <section id="services" className="sec">
      <div className="wrap">
        <header className="reveal mb-[52px] max-w-[640px]">
          <p className="eyebrow">What we do</p>
          <h2 className="mb-3 mt-3.5 font-serif text-[clamp(30px,4.6vw,44px)] font-medium leading-[1.08] tracking-tight">
            Three things, done well.
          </h2>
          <p className="text-[17.5px] text-ink-2">
            Nothing you don&rsquo;t need. Everything required to look credible
            and get hired.
          </p>
        </header>

        <div className="border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.n}
              className={
                i === 1 ? "delay-[70ms]" : i === 2 ? "delay-[140ms]" : ""
              }
            >
              <article className="group grid items-baseline gap-[30px] border-b border-line py-[38px] transition-[padding] duration-300 hover:pl-2.5 max-lg:grid-cols-[56px_1fr] lg:grid-cols-[84px_1fr_300px]">
                <span className="font-serif text-[26px] text-ink-3 transition-colors duration-300 group-hover:text-accent">
                  {s.n}
                </span>
                <div>
                  <h3 className="mb-2 font-serif text-[26px] font-medium">
                    {s.title}
                  </h3>
                  <p className="max-w-[52ch] text-ink-2">{s.body}</p>
                </div>
                <p className="text-[14.5px] tracking-[0.02em] text-ink-3 max-lg:col-start-2">
                  {s.tags}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
