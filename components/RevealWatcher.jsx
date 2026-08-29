"use client";

import { useEffect } from "react";

// Mounted once in layout.js. Observes EVERY .reveal element on the page —
// including ones inside server components — and fades them in on scroll.
export default function RevealWatcher() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
