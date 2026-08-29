import Reveal from "./Reveal";
import Icon from "./Icon";
import ContactForm from "./ContactForm";

// ============================================================
// EDIT:PHONE — display text, and tel: link (digits + country code only)
// EDIT:ADDRESS — your street address; the map, directions link, and
// display text all derive from this one line
// ============================================================
const PHONE_DISPLAY = "(555) 123-4567";
const PHONE_TEL = "+15551234567";
const ADDRESS = "2084 Faulkner Rd NE, Suite B, Atlanta, GA 30324";
const MAP_QUERY = encodeURIComponent(ADDRESS);

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

          <ul className="mb-7 grid gap-3.5">
            <li className="flex items-center gap-3 text-[17px] font-semibold">
              <Icon name="phone" className="text-accent-bright" />
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-accent underline-offset-[3px] hover:underline"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[17px] font-semibold">
              <Icon name="mail" className="text-accent-bright" />
              <a
                href="mailto:hello@dkmstudio.co"
                className="text-accent underline-offset-[3px] hover:underline"
              >
                hello@dkmstudio.co
              </a>
            </li>
            <li className="flex items-center gap-3 text-[17px] font-semibold">
              <Icon name="pin" className="text-accent-bright" />
              <address className="not-italic text-ink">
                <a
                  href={`https://maps.app.goo.gl/XY66QYaBKBMvob7CA`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-[3px] hover:underline"
                >
                  {ADDRESS}
                </a>
              </address>
            </li>
          </ul>

          <div className="overflow-hidden rounded-2xl border border-line-strong">
            <iframe
              title="DKM on the map"
              src={`https://maps.google.com/maps?q=${MAP_QUERY}&z=15&output=embed`}
              className="h-[280px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[14.5px] font-semibold text-accent underline-offset-[3px] hover:underline"
          >
            Get directions <Icon name="arrow" />
          </a>

          <p className="mt-[22px] text-[14.5px] text-ink-3">
            Prefer to talk it through? Call, email, or drop by — a few lines
            about your business is enough to start.
          </p>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
