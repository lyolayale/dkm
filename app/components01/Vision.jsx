export default function Vision({ darkMode }) {
  return (
    <section
      id="vision"
      className={`py-28 border-b transition-colors duration-300 relative overflow-hidden ${
        darkMode
          ? "bg-slate-950 border-slate-900"
          : "bg-slate-50 border-slate-100"
      }`}
    >
      <div
        className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none ${
          darkMode
            ? "bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)]"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 block">
                Strategic Mandate
              </span>

              <h2
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sans ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Our Vision & Purpose
              </h2>

              <div className="w-12 h-[2px] bg-amber-500/40 mt-4" />
            </div>

            <div className="border-l-2 border-amber-500/60 pl-6 my-6">
              <p
                className={`text-xl sm:text-2xl font-medium tracking-tight leading-relaxed ${
                  darkMode ? "text-slate-100" : "text-slate-800"
                }`}
              >
                "To secure clear, commanding authority for local companies by
                equipping them with enterprise-grade software applications and
                pristine real-world brand visibility."
              </p>
            </div>

            <div
              className={`grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t ${
                darkMode ? "border-slate-900" : "border-slate-200"
              }`}
            >
              <VisionItem
                title="Software Engineering"
                text="Next.js & React frameworks engineered for optimal local index performance."
                darkMode={darkMode}
              />

              <VisionItem
                title="Field Deployment"
                text="Boots on the ground operations driving local offline market exposure."
                darkMode={darkMode}
              />

              <VisionItem
                title="Data Architecture"
                text="Secure Supabase clusters integrated into automated pipeline logic."
                darkMode={darkMode}
                className="col-span-2 sm:col-span-1"
              />
            </div>
          </div>

          <div
            className={`lg:col-span-5 relative min-h-[400px] lg:min-h-full rounded-2xl border overflow-hidden shadow-2xl flex flex-col justify-between group p-1 transition-all duration-300 ${
              darkMode
                ? "bg-black border-slate-900"
                : "bg-slate-100 border-slate-200"
            }`}
          >
            <div
              className={`w-full border-b px-4 py-3 flex items-center justify-between rounded-t-xl z-20 transition-colors ${
                darkMode
                  ? "bg-slate-950 border-slate-900/60"
                  : "bg-white border-slate-200/60"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={`w-2.5 h-2.5 rounded-full ${
                      darkMode ? "bg-slate-800" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <div
                className={`text-[10px] font-mono tracking-wider px-3 py-1 rounded border transition-all ${
                  darkMode
                    ? "text-slate-500 bg-slate-900 border-slate-800/40"
                    : "text-slate-500 bg-white border-slate-200"
                }`}
              >
                dkm_terminal_core.config
              </div>

              <div
                className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-mono ${
                  darkMode
                    ? "bg-slate-900 text-slate-600"
                    : "bg-white text-slate-400"
                }`}
              >
                🔒
              </div>
            </div>

            <div
              className={`flex-1 p-5 space-y-4 z-10 font-sans relative transition-colors ${
                darkMode ? "bg-slate-950/80" : "bg-white/80"
              }`}
            >
              <div
                className={`p-4 rounded-xl border shadow-inner space-y-2 transition-all ${
                  darkMode
                    ? "bg-slate-900/40 border-slate-800/60"
                    : "bg-slate-50/80 border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Enterprise Inbound Pipeline
                  </span>

                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
                    Active Hook ✓
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-2xl font-bold tracking-tight ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    94.8%
                  </span>

                  <span className="text-xs font-semibold text-amber-600">
                    Local Exposure Spike
                  </span>
                </div>

                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden flex gap-0.5 p-[1px] ${
                    darkMode ? "bg-slate-900" : "bg-slate-200"
                  }`}
                >
                  <div className="w-[65%] h-full bg-amber-500 rounded-full" />
                  <div className="w-[20%] h-full bg-amber-600 rounded-full" />
                  <div
                    className={`w-[15%] h-full rounded-full ${
                      darkMode ? "bg-slate-800" : "bg-slate-300"
                    }`}
                  />
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2.5 font-mono text-[11px] transition-all ${
                  darkMode
                    ? "bg-slate-900/40 border-slate-800/60 text-slate-400"
                    : "bg-slate-50/80 border-slate-100 text-slate-600"
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-1.5 ${
                    darkMode ? "border-slate-900" : "border-slate-200"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    n8n Execution Logs
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                </div>

                <div className="space-y-1 font-medium">
                  <p className={darkMode ? "text-slate-300" : "text-slate-800"}>
                    <span className="text-amber-500">▶</span> Next.js Form Node
                    Mounted.
                  </p>

                  <p className={darkMode ? "text-slate-500" : "text-slate-400"}>
                    <span
                      className={
                        darkMode ? "text-slate-700" : "text-slate-300"
                      }
                    >
                      ▶
                    </span>{" "}
                    Supabase Cluster handshake initiated...
                  </p>

                  <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                    <span className="text-emerald-500">✔</span> Webhook trigger
                    sync 200 OK.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`w-full border-t px-4 py-2.5 rounded-b-xl flex justify-between items-center text-[9px] font-mono tracking-widest transition-colors ${
                darkMode
                  ? "bg-slate-950 border-slate-900 text-slate-600"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              <span>REBRANDING STACK v2.0.4</span>
              <span>SECURE PIPELINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionItem({ title, text, darkMode, className = "" }) {
  return (
    <div className={className}>
      <div
        className={`text-xs font-bold uppercase tracking-wider ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {title}
      </div>

      <p
        className={`text-xs mt-1 font-normal leading-relaxed ${
          darkMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {text}
      </p>
    </div>
  );
}
