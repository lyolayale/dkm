"use client";

import Icon from "./Icon";
import { prefillAndGo } from "@/lib/quoteBus";

// Sends the visitor to the contact form with this tier pre-selected
export default function TierButton({ tier, budget, ariaLabel }) {
  return (
    <button
      className="tier-go"
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
