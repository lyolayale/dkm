export default function Footer({ darkMode }) {
  return (
    <footer
      className={`py-12 border-t text-center text-[10px] tracking-wider uppercase font-medium transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950 border-slate-900 text-slate-500"
          : "bg-white border-slate-100 text-slate-400"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 space-y-2">
        <p>
          © {new Date().getFullYear()} DIGITAL KEYS & MARKETING. All Rights
          Reserved.
        </p>

        <p className="max-w-md mx-auto leading-relaxed normal-case tracking-normal font-normal text-slate-400">
          Built via premium Next.js compilation architectures, Supabase
          database layers, and n8n automated webhook workflows.
        </p>
      </div>
    </footer>
  );
}
