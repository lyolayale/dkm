// Tiny decoupled bridge: any button anywhere (tier cards, estimator) can send
// the user to the contact form with their selection pre-filled — no prop
// drilling, no context provider needed.
export function prefillAndGo({ message, budget }) {
  window.dispatchEvent(
    new CustomEvent("dkm-prefill", { detail: { message, budget } }),
  );
}
