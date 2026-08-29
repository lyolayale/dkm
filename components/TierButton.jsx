"use client";

import Icon from "./Icon";
import { prefillAndGo } from "@/lib/quoteBus";

export default function TierButton({ tier, budget, ariaLabel, btnClass = "" }) {
  return (
    <button
      className={`hidden shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 lg:inline-flex h-[50px] w-[50px] ${btnClass}`}
      aria-label={ariaLabel}
      onClick={() =>
        prefillAndGo({
          message: `Hi! I'm interested in the ${tier} package. Here's a bit about my business: `,
          budget,
        })
      }
    >
      <Icon name="arrow" />
    </button>
  );
}
