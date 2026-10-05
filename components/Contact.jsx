import Reveal from "./Reveal";
import Icon from "./Icon";
import ContactForm from "./ContactForm";
import { CONTACT } from "@/lib/site";

// Contact details derive from lib/site.js — the map embed, directions link,
// tel:/mailto: links, display text, and JSON-LD all stay in sync automatically.
const MAP_QUERY = encodeURIComponent(CONTACT.full);

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
                href={`tel:${CONTACT.phoneTel}`}
                className="text-accent underline-offset-[3px] hover:underline"
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[17px] font-semibold">
              <Icon name="mail" className="text-accent-bright" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-accent underline-offset-[3px] hover:underline"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[17px] font-semibold">
              <Icon name="pin" className="text-accent-bright" />
              <address className="not-italic text-ink">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-[3px] hover:underline"
                >
                  {CONTACT.full}
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
