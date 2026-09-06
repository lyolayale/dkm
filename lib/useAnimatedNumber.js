"use client";

import { useEffect, useRef, useState } from "react";

// Animated count-up for the estimator readouts. Extracted from the original
// Estimator.jsx so the website and consulting estimators behave identically.
// Respects prefers-reduced-motion (jumps straight to the value).
export function useAnimatedNumber(target, duration = 420) {
  const [shown, setShown] = useState(target);
  const shownRef = useRef(target);

  useEffect(() => {
    const from = shownRef.current;
    if (from === target) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf;
    const t0 = performance.now();

    const tick = t => {
      // Reduced motion skips the animation entirely — one tick, straight to value
      const p = reduced ? 1 : Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(from + (target - from) * eased);
      shownRef.current = value;
      setShown(value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return shown;
}