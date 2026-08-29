import Image from "next/image";

const capabilities = [
  {
    number: "01 / Activation",
    title: "Physical Exposure",
    text: "High-touch physical re-branding layouts executed directly in target environments.",
    accent: true,
  },
  {
    number: "02 / Engineering",
    title: "Next.js Frameworks",
    text: "Lightweight static generation patterns geared for rapid regional discovery performance.",
    accent: false,
  },
  {
    number: "03 / Website",
    title: "Custom Architecture",
    text: "Professional, mobile-first website tailored to your business goals.",
    accent: true,
    price: "Starting at $600",
    note: "Excludes setup and automated workflow integration fees.",
  },
];

export default function About({ darkMode }) {
  return (
    <section
      id="about"
      className={`py-24 border-y transition-colors duration-300 ${
        darkMode ? "bg-slate-950 border-slate-900" : "bg-white border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-[2px_2px_30px_gray] dark:border-slate-800 group mb-30">
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent z-10 pointer-events-none" />
            <Image
              src="/workspace.avif"
              alt="Digital Keys & Marketing Executive Strategy & Rebranding Workspace"
              fill
              sizes="(max-w-7xl) 100vw, 600px"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="text-md uppercase tracking-widest text-amber-600 font-bold mb-3">
              Corporate Profile
            </h2>

            <h3
              className={`text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Fusing Execution with Digital Architecture
            </h3>

            <p
              className={`text-lg leading-relaxed mb-6 font-light ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Traditional marketing groups isolate their scope strictly to
              online ads. Our firm provides a complete, unified solution. We
              deploy active physical rebranding frameworks alongside advanced
              custom web builds.
            </p>

            <p
              className={`text-lg leading-relaxed font-light ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              By maintaining speed, native search optimization hooks, and
              beautiful interfaces, we establish automated client pipelines that
              continuously build asset value for your brand.
            </p>
          </div>

          <div className="flex flex-col gap-10 justify-center items-center mx-auto md:w-200">
            {capabilities.map(item => (
              <div
                key={item.number}
                className={`p-6 rounded-xl border shadow-sm ${
                  darkMode
                    ? "bg-slate-900/40 border-slate-800/60"
                    : "bg-slate-50 border-slate-200"
                } md:w-full`}
              >
                <div
                  className={`text-lg font-bold mb-2 ${
                    item.accent ? "text-amber-600" : "text-slate-500"
                  }`}
                >
                  {item.number}
                </div>

                <h4
                  className={`font-bold text-md mb-1 ${
                    darkMode ? "text-slate-200" : "text-slate-900"
                  }`}
                >
                  {item.title}
                </h4>

                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {item.text}
                </p>

                {item.price && (
                  <p className="mt-1">
                    <span className="font-bold">{item.price}</span>
                  </p>
                )}

                {item.note && (
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
