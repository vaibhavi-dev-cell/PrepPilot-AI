export default function HeroSection() {
  return (
    <section id="start" className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Final year project
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Practice coding interviews with structured AI guidance.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            PrepPilot AI helps you improve your technical skills, learn system design, and build confidence with a modern, resume-worthy interface.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Explore features
            </a>
            <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-950/80 px-5 py-3 text-sm text-slate-300">
              AI-driven feedback for every solution
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950/90 p-6 text-slate-300 shadow-xl shadow-slate-950/40 sm:p-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Career boost</p>
            <h3 className="mt-4 text-xl font-semibold text-white">Mock interviews</h3>
            <p className="mt-2 text-sm text-slate-400">
              Practice questions with structured prompts, instant AI scoring, and clear improvement areas.
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl bg-slate-900/90 p-4">
              <p className="text-sm text-slate-300">Customize your learning path for algorithms, system design, and behavioral prep.</p>
            </div>
            <div className="rounded-2xl bg-slate-900/90 p-4">
              <p className="text-sm text-slate-300">Track your progress with clean analytics and milestone cards.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
