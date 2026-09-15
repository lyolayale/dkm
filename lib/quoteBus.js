// Tiny decoupled bridge: any button anywhere (tier cards, estimator) can send
// the user to the contact form with their selection pre-filled — no prop
// drilling, no context provider needed.
//
// The estimator's selections reach the form directly (and live) through the
// shared store in lib/estimateStore.js — events here are only for explicit
// "take me there with this" actions.
export function prefillAndGo({ message, budget } = {}) {
  window.dispatchEvent(
    new CustomEvent("dkm-prefill", { detail: { message, budget } }),
  );
}

// Jump to the contact form without changing any fields — used by the
// estimator's "Request this quote" button, whose selections already
// live-sync into the form via the shared estimate store.
export function goToForm() {
  window.dispatchEvent(new CustomEvent("dkm-prefill", { detail: {} }));
}
