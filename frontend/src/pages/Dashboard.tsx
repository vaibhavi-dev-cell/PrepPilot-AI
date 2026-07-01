import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import { buildApiUrl, apiFetch } from '../lib/api'

interface PracticeSession {
  id: string
  question_title: string
  score: number
  created_at: string
}

interface HistoryStats {
  total_sessions: number
  average_score: number
  recent_sessions: PracticeSession[]
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [stats, setStats] = useState<HistoryStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('prepPilotToken')
    if (!storedToken) {
      navigate('/signin')
      return
    }
    setToken(storedToken)

    // Fetch practice history
    async function fetchStats() {
      try {
        const response = await apiFetch(buildApiUrl('/practice/history'))
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchStats()
  }, [navigate])

  function handleSignOut() {
    localStorage.removeItem('prepPilotToken')
    navigate('/signin')
  }

  return (
    <AppShell
      title="Your dashboard"
      subtitle="This is where you will see your recent practice sessions, score trends, and upcoming goals."
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Signed in</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Welcome back</h2>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-cyan-300"
            >
              Sign out
            </button>
          </div>
          <p className="mt-4 text-slate-400">
            {token ? 'Your session is active and ready for practice.' : 'Checking your session...'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Practice Stats</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Total Sessions</h3>
            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {loading ? '—' : stats?.total_sessions || 0}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Performance</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Average Score</h3>
            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {loading ? '—' : stats?.average_score.toFixed(1) || '0.0'}/10
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold text-white">Recent sessions</h2>
          {loading ? (
            <p className="mt-4 text-slate-400">Loading your sessions...</p>
          ) : stats && stats.recent_sessions.length > 0 ? (
            <div className="mt-4 space-y-3">
              {stats.recent_sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{session.question_title}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(session.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-300">
                    {session.score}/10
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-slate-400">
              No sessions yet. Start practicing to see your progress here!
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold text-white">Practice goals</h2>
          <p className="mt-3 text-slate-400">
            Track your progress toward interview readiness with custom goals and AI recommendations.
          </p>
        </div>
      </section>
    </AppShell>
  )
}

