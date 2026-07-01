const features = [
  {
    title: 'AI Interview Coach',
    description: 'Get instant feedback on answers, code solutions, and design decisions so you can improve faster.',
  },
  {
    title: 'Custom Practice Paths',
    description: 'Choose topics like algorithms, databases, or system design and study with guided exercises.',
  },
  {
    title: 'Resume-Ready UI',
    description: 'A polished frontend that demonstrates strong application design and modern UX for your project showcase.',
  },
  {
    title: 'Fast setup for teams',
    description: 'Built with React, TypeScript, Vite, and Tailwind for maintainable frontend development.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="mt-10 space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Why PrepPilot AI</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A clean frontend built for your final year project.</h2>
          </div>
          <p className="max-w-xl text-slate-400">
            Use this polished layout to demonstrate strong frontend architecture, responsive design, and modern tooling.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/30 transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900"
          >
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-slate-400">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
