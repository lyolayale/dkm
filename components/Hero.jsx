import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section id="top" className="pt-[92px]">
      <div className="wrap">
        <div className="grid items-end gap-8 md:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <p className="eyebrow">Web design &amp; development</p>
            <h1 className="mt-3.5 max-w-[12ch] font-serif text-[clamp(40px,6.4vw,68px)] font-medium leading-[1.08] tracking-tight">
              A website that wins you{" "}
              <em className="italic text-accent">work.</em>
            </h1>
            <p className="my-[22px] max-w-[46ch] text-[18.5px] text-ink-2">
              DKM designs and builds fast, professional websites for small
              businesses — design, build, and launch included, starting at{" "}
              <strong className="font-semibold">$600</strong>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="btn btn-solid hover:bg-amber-500" href="#contact">
                Start yours — $600 <Icon name="arrow" />
              </a>
              <a className="btn btn-ghost" href="#pricing">
                See pricing <Icon name="up" />
              </a>
            </div>
          </Reveal>

          <div
            className="reveal select-none max-lg:mt-2 max-lg:text-left lg:text-right"
            aria-hidden="true"
          >
            <div className="font-serif text-[clamp(72px,20vw,110px)] font-semibold leading-[0.82] text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)] lg:text-[clamp(88px,13vw,152px)]">
              $600
            </div>
            <p className="mt-2.5 text-[13px] tracking-[0.04em] text-ink-3">
              The starting price — real, fixed, in writing.
            </p>
          </div>
        </div>

        <Reveal>
          <ul className="mt-[72px] grid border-t border-line md:grid-cols-3">
            <li className="border-t border-line py-[18px] first:border-t-0 lg:border-l lg:border-t-0 lg:pb-[34px] lg:pl-6 lg:pt-[26px] lg:first:border-l-0 lg:first:pl-0">
              <strong className="block font-serif text-[19px] font-medium">
                From $600.
              </strong>
              <span className="text-[15px] text-ink-2">
                Fixed quote before any work begins.
              </span>
            </li>
            <li className="border-t border-line py-[18px] lg:border-l lg:border-t-0 lg:pb-[34px] lg:pl-6 lg:pt-[26px]">
              <strong className="block font-serif text-[19px] font-medium">
                Two weeks.
              </strong>
              <span className="text-[15px] text-ink-2">
                Typical time from kickoff call to live site.
              </span>
            </li>
            <li className="border-t border-line py-[18px] lg:border-l lg:border-t-0 lg:pb-[34px] lg:pl-6 lg:pt-[26px]">
              <strong className="block font-serif text-[19px] font-medium">
                100% yours.
              </strong>
              <span className="text-[15px] text-ink-2">
                Code, domain, and content — you own it all.
              </span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
