import Reveal from "./Reveal";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-grid">
        <Reveal>
          <p className="eyebrow">Web design &amp; development</p>
          <h1>
            A website that wins you <em>work.</em>
          </h1>
          <p className="sub">
            DKM designs and builds fast, professional websites for small
            businesses — design, build, and launch included, starting at{" "}
            <strong>$600</strong>.
          </p>
          <div className="hero-cta">
            <a className="btn btn-solid" href="#contact">
              Start yours — $600 <Icon name="arrow" />
            </a>
            <a className="btn btn-ghost" href="#pricing">
              See pricing <Icon name="up" />
            </a>
          </div>
        </Reveal>

        <div className="price-ghost reveal" aria-hidden="true">
          <div className="ghost-num">$600</div>
          <p className="ghost-cap">
            The starting price — real, fixed, in writing.
          </p>
        </div>
      </div>

      <Reveal>
        <ul className="facts">
          <li>
            <strong>From $600.</strong>
            <span>Fixed quote before any work begins.</span>
          </li>
          <li>
            <strong>Two weeks.</strong>
            <span>Typical time from kickoff call to live site.</span>
          </li>
          <li>
            <strong>100% yours.</strong>
            <span>Code, domain, and content — you own it all.</span>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
