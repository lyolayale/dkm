const BASE =
  "h-[1.1em] w-[1.1em] shrink-0 fill-none stroke-current stroke-[1.9] [stroke-linecap:round] [stroke-linejoin:round]";

// Pass className to override sizing entirely; omit it for the default
export default function Icon({ name, className = "" }) {
  return (
    <svg className={`icon ${className}`} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
// Unchanged — sprite rendered once in layout.js
export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </symbol>
        <symbol id="i-up" viewBox="0 0 24 24">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </symbol>
        <symbol id="i-moon" viewBox="0 0 24 24">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="M4.5 12.5l5 5L19.5 7" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </symbol>
        <symbol id="i-x" viewBox="0 0 24 24">
          <path d="M6 6l12 12M18 6L6 18" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3.5 7.5L12 13l8.5-5.5" />
        </symbol>
      </defs>
    </svg>
  );
}
