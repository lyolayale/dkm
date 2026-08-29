"use client";

import { useState } from "react";
import Icon from "./Icon";
import { FAQ_ITEMS } from "@/lib/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <header className="sec-head reveal">
          <p className="eyebrow">FAQ</p>
          <h2>Straight answers.</h2>
        </header>

        <div className="faq-list reveal">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={item.q}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <Icon name="plus" />
                </button>
                <div className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
