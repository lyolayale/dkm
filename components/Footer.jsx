const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line pb-[34px] pt-16">
      <div className="wrap">
        <div className="mb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-serif text-[28px] font-semibold text-ink">
              DKM<b className="text-accent-bright">.</b>
              <p className="text-[10px]">Digital Keys & Marketing</p>
            </span>
            <p className="mt-2.5 max-w-[30ch] text-[15px] text-ink-2">
              Web design &amp; development for small businesses. Websites from{" "}
              <b className="font-serif text-[17px] font-medium text-accent">
                $600
              </b>
              .
            </p>
          </div>

          <div>
            <h4 className="mb-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-3">
              Menu
            </h4>
            <ul className="grid gap-[9px]">
              <li>
                <a
                  href="#services"
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-3">
              Contact
            </h4>
            <ul className="grid gap-[9px]">
              <li>
                <a
                  href="tel:+15551234567"
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@dkmstudio.co"
                  className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                >
                  hello@dkmstudio.co
                </a>
              </li>
              <li>
                <span className="text-[15px] text-ink-2">
                  2084 Faulkner Rd NE, Suite B, Atlanta, GA 30324
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 border-t border-line pt-6 text-[13.5px] text-ink-3">
          <span>© {YEAR} DKM. All prices USD.</span>
          <span>No hidden fees. Ever.</span>
        </div>
      </div>
    </footer>
  );
}
