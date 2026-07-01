import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Practice', path: '/practice' },
  { label: 'Sign in', path: '/signin' },
  { label: 'Sign up', path: '/signup' },
  { label: 'Dashboard', path: '/dashboard' },
]

export default function TopNav() {
  return (
    <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/40">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          PrepPilot AI
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 transition hover:bg-slate-800 ${isActive ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
