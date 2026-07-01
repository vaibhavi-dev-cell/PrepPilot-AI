import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import { buildApiUrl } from '../lib/api'

export default function SignUp() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch(buildApiUrl('/users/signup'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed')
      }

      setMessage(`Account created for ${data.email}. You can now sign in.`)
      setFullName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppShell
      title="Create your PrepPilot account"
      subtitle="Sign up to save your progress, practice more confidently, and track your interview readiness."
    >
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <form className="max-w-xl space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              required
            />
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-400">{message}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </section>
    </AppShell>
  )
}
