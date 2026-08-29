const projects = [
  {
    category: "Architecture / Identity",
    title: "The Apex Contracting Group",
    text: "Deployed localized positioning materials alongside custom technical layout architectures. Increased organic regional business communication lines by 140% within 45 operating days.",
    accent: true,
  },
  {
    category: "Automation / Operations",
    title: "Vanguard Retail Hubs",
    text: "Configured secure webhook arrays using Supabase clusters linked to automated validation sequences. Saved internal management teams 20 structural hours per week.",
    accent: false,
  },
];

export default function Projects({ darkMode }) {
  return (
    <section
      id="projects"
      className={`py-24 transition-colors duration-300 ${
        darkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-3">
            Case Studies
          </h2>

          <h3
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Systems Engineered for Strategic Scale
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group rounded-xl border p-6 shadow-sm transition-all duration-300 ${
                darkMode
                  ? "bg-slate-900/20 border-slate-800/60 hover:border-amber-400/30"
                  : "bg-slate-50 border-slate-200 hover:border-amber-500/40"
              }`}
            >
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${
                  project.accent ? "text-amber-600" : "text-slate-400"
                }`}
              >
                {project.category}
              </span>

              <h4
                className={`text-lg font-bold mt-1 mb-2 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {project.title}
              </h4>

              <p className="text-sm text-slate-500 leading-relaxed font-light">
                {project.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
