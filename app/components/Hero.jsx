import Image from "next/image";

export default function Hero({ darkMode }) {
  return (
    <header
      className={`relative pt-36 pb-20 md:pt-48 md:pb-28 flex flex-col items-center justify-center text-center px-4 overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-slate-950" : "bg-slate-50/50"
      }`}
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center w-full">
        <div className="w-full max-w-137.5 mb-10 px-4">
          <div
            className={`relative w-full aspect-video rounded-2xl border overflow-hidden p-2 ${
              darkMode
                ? "md:shadow-[1px_1px_100px_lightyellow] shadow-[1px_1px_30px_lightyellow]"
                : "shadow-2xl"
            } bg-slate-900 border-slate-900/40`}
          >
            <Image
              src="/dkm-logo-final-00.jpeg"
              alt="Digital Keys & Marketing Cosmic Logo Display"
              fill
              sizes="(max-w-7xl) 100vw, 550px"
              className="object-contain p-4 brightness-190"
              priority
              loading="eager"
            />
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-xs font-semibold uppercase tracking-widest ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-slate-400"
              : "bg-slate-100 border-slate-200 text-slate-600"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          On-Site Activation × Next.js Engineering
        </div>

        <h1
          className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight max-w-3xl ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Unlocking Exceptional <br />
          <span
            className={`text-transparent bg-clip-text bg-linear-to-r ${
              darkMode
                ? "from-slate-100 via-slate-300 to-amber-200"
                : "from-slate-900 via-amber-600 to-slate-800"
            }`}
          >
            Enterprise Exposure
          </span>
        </h1>

        <p
          className={`sm:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed font-light ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          We build high-performance web structures paired with real-world
          visibility strategies. While we design custom web applications to
          secure your market capture, our partners deploy field tactics to
          elevate your local footprint.
        </p>

        <div className="w-full sm:w-auto">
          <a
            href="#contact"
            className={`block px-8 py-4 rounded-xl font-bold text-xs tracking-widest uppercase shadow-lg transition-all duration-300 ${
              darkMode
                ? "bg-slate-100 text-slate-950 hover:bg-amber-400"
                : "bg-slate-900 text-white hover:bg-amber-600"
            }`}
          >
            Initiate Consultation
          </a>
        </div>
      </div>
    </header>
  );
}
