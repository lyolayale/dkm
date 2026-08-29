import Reveal from "./Reveal";
import Icon from "./Icon";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="sec" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-side reveal">
          <p className="eyebrow">Contact</p>
          <h2
            style={{
              fontSize: "clamp(30px, 4.4vw, 42px)",
              margin: "14px 0 16px",
            }}
          >
            Tell us about your project.
          </h2>
          <p>
            The fastest way to an exact number: tell us what you need and
            we&rsquo;ll reply within one business day with a fixed quote — free,
            and no pressure. New sites start at $600.
          </p>
          <p className="contact-line">
            <Icon name="mail" />
            <a href="mailto:hello@dkmstudio.co">hello@dkmstudio.co</a>{" "}
            {/* EDIT:EMAIL */}
          </p>
          <p className="contact-sub">
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
