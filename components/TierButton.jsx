"use client";

import Icon from "./Icon";
import { prefillAndGo } from "@/lib/quoteBus";

export default function TierButton({ tier, budget, ariaLabel, btnClass = "", children }) {
  const isPill = btnClass.includes("!inline-flex");
  return (
    <button
      className={
        isPill
          ? `shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 inline-flex ${btnClass}`
          : `hidden shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 lg:inline-flex h-[50px] w-[50px] ${btnClass}`
      }
      aria-label={ariaLabel}
      onClick={() =>
        prefillAndGo({
          message: `Hi! I'm interested in the ${tier} package. Here's a bit about my business: `,
          budget,
        })
      }
    >
      <Icon name="arrow" />
      {children ? <span>{children}</span> : null}
    </button>
  );
}
