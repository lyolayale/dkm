import Reveal from "./Reveal";
import Icon from "./Icon";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="sec">
      <div className="wrap grid items-start gap-11 lg:grid-cols-[1fr_1.15fr]">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h2 className="mb-4 mt-3.5 font-serif text-[clamp(30px,4.4vw,42px)] font-medium leading-[1.08] tracking-tight">
            Tell us about your project.
          </h2>
          <p className="mb-[26px] max-w-[40ch] text-ink-2">
            The fastest way to an exact number: tell us what you need and
            we&rsquo;ll reply within one business day with a fixed quote — free,
            and no pressure. New sites start at $600.
          </p>
          <p className="mb-3.5 flex items-center gap-3 text-[17px] font-semibold">
            <Icon name="mail" className="text-accent-bright" />
            <a
              href="mailto:hello@dkmstudio.co"
              className="text-accent hover:underline underline-offset-[3px]"
            >
              hello@dkmstudio.co
            </a>
          </p>
          <p className="mt-[22px] text-[14.5px] text-ink-3">
            Prefer email? Send a few lines about your business and what you need
            — that&rsquo;s enough to start.
          </p>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
