import type { PropsWithChildren } from 'react'
import TopNav from '../navigation/TopNav'

interface AppShellProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaHref?: string
}

export default function AppShell({
  children,
  title,
  subtitle,
  ctaText,
  ctaHref,
}: PropsWithChildren<AppShellProps>) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <TopNav />

      <header className="mb-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            PrepPilot AI
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-slate-300 sm:text-lg">{subtitle}</p>
          {ctaText && ctaHref ? (
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              {ctaText}
            </a>
          ) : null}
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
