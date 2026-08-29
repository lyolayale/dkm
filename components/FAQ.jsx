"use client";

import { useState } from "react";
import Icon from "./Icon";
import { FAQ_ITEMS } from "@/lib/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="sec">
      <div className="wrap">
        <header className="reveal mb-[52px] max-w-[640px]">
          <p className="eyebrow">FAQ</p>
          <h2 className="mb-3 mt-3.5 font-serif text-[clamp(30px,4.6vw,44px)] font-medium leading-[1.08] tracking-tight">
            Straight answers.
          </h2>
        </header>

        <div className="reveal max-w-[780px] border-t border-line">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className="border-b border-line" key={item.q}>
                <button
                  className="flex w-full cursor-pointer items-center justify-between gap-5 py-[22px] text-left font-serif text-[19.5px] font-medium text-ink"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <Icon
                    name="plus"
                    className={`transition-transform duration-300 ${isOpen ? "rotate-45 text-accent" : "text-ink-3"}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[64ch] px-1 pb-6 text-ink-2">
                      {item.a}
                    </p>
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
