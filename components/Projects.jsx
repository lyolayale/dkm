const projects = [
  {
    number: "A01",
    category: "WEB / DIGITAL STRATEGY",
    title: "Apex Contracting Group",
    description:
      "A focused digital presence built around local discovery, clear service positioning, and lead generation.",
    tags: ["WEB", "SEO", "STRATEGY"],
  },
  {
    number: "A02",
    category: "AUTOMATION / OPERATIONS",
    title: "Vanguard Retail Hubs",
    description:
      "A connected workflow concept for capturing submissions, storing structured data, and notifying internal teams automatically.",
    tags: ["N8N", "SUPABASE", "WEBHOOKS"],
  },
];

export default function Projects({ darkMode }) {
  return (
    <section
      id="projects"
      className={`py-24 ${darkMode ? "bg-[#080b0f]" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[.3em] text-amber-500">
            03 // SELECTED WORK
          </div>
          <h2
            className={`mt-3 text-4xl font-black tracking-tight sm:text-5xl ${darkMode ? "text-white" : "text-slate-950"}`}
          >
            Built for the real world.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map(project => (
            <article
              key={project.number}
              className={`group overflow-hidden border ${darkMode ? "border-slate-800 bg-[#0b0f14] shadow-[1px_1px_10px_white]" : "border-slate-200 bg-slate-50"}`}
            >
              <div className="relative aspect-[16/8] overflow-hidden border-b border-slate-800 bg-[#07090c] p-7">
                <div className="absolute left-5 top-5 font-mono text-[9px] tracking-[.2em] text-slate-600">
                  {project.number} / PROJECT
                </div>
                <div className="absolute right-5 top-5 h-10 w-10 border-r border-t border-amber-500/40" />
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-[9px] uppercase tracking-[.3em] text-amber-500">
                      {project.category}
                    </div>
                    <div className="mt-3 text-2xl font-black text-white sm:text-3xl">
                      {project.title}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-7">
                <p
                  className={`max-w-xl text-sm leading-7 ${darkMode ? "text-slate-300" : "text-slate-500"}`}
                >
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="border border-slate-800 px-3 py-1.5 font-mono text-[9px] font-bold tracking-widest text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
