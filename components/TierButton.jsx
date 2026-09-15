"use client";

import Icon from "./Icon";
import { goToForm } from "@/lib/quoteBus";
import { selectTier } from "@/lib/estimateStore";

export default function TierButton({
  tierName,
  ariaLabel,
  btnClass = "",
  children,
}) {
  const isPill = btnClass.includes("!inline-flex");
  return (
    <button
      className={
        isPill
          ? `shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 inline-flex ${btnClass}`
          : `hidden shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 lg:inline-flex h-[50px] w-[50px] ${btnClass}`
      }
      aria-label={ariaLabel}
      onClick={() => {
        // Configure the shared estimator to this package — the estimator
        // readout, tier highlight and contact form all update live — then
        // jump to the form.
        selectTier(tierName);
        goToForm();
      }}
    >
      <Icon name="arrow" />
      {children ? <span>{children}</span> : null}
    </button>
  );
}
