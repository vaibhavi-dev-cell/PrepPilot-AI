import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import { buildApiUrl, apiFetch } from '../lib/api'

interface PracticeQuestion {
  id: string
  title: string
  category: string
  difficulty: string
  prompt: string
  focus: string
}

interface PracticeFeedback {
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

export default function Practice() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<PracticeQuestion[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<PracticeQuestion | null>(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<PracticeFeedback | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('prepPilotToken')
    if (!token) {
      navigate('/signin')
      return
    }

    async function loadQuestions() {
      try {
        const response = await apiFetch(buildApiUrl('/practice/questions'))
        if (!response.ok) {
          throw new Error('Unable to load questions')
        }
        const data = await response.json()
        setQuestions(data)
        setSelectedQuestion(data[0])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadQuestions()
  }, [navigate])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedQuestion) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await apiFetch(buildApiUrl('/practice/submit'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_id: selectedQuestion.id,
          answer,
        }),
      })

      if (!response.ok) {
        throw new Error('Could not evaluate answer')
      }

      const data = await response.json()
      setFeedback(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppShell
      title="Practice interview questions"
      subtitle="Work through coding, system design, and behavioral prompts with instant AI-style feedback."
    >
      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold text-white">Question bank</h2>
          <div className="mt-6 space-y-3">
            {isLoading ? (
              <p className="text-slate-400">Loading questions...</p>
            ) : (
              questions.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => {
                    setSelectedQuestion(question)
                    setAnswer('')
                    setFeedback(null)
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition ${selectedQuestion?.id === question.id ? 'border-cyan-500 bg-slate-800' : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'}`}
                >
                  <p className="text-sm font-semibold text-white">{question.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{question.category} • {question.difficulty}</p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          {selectedQuestion ? (
            <>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">{selectedQuestion.category}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{selectedQuestion.title}</h2>
              <p className="mt-3 text-slate-400">{selectedQuestion.prompt}</p>
              <p className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-sm text-cyan-200">
                Focus: {selectedQuestion.focus}
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-slate-300" htmlFor="answer">
                  Your answer
                </label>
                <textarea
                  id="answer"
                  rows={10}
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  placeholder="Write your response here..."
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70"
                >
                  {isSubmitting ? 'Evaluating...' : 'Get feedback'}
                </button>
              </form>

              {feedback ? (
                <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Feedback</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="rounded-full bg-cyan-500/15 px-4 py-2 text-lg font-semibold text-cyan-200">
                      Score {feedback.score}/10
                    </div>
                    <p className="text-slate-300">{feedback.feedback}</p>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Strengths</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
                        {feedback.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">Improvements</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
                        {feedback.improvements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </section>
    </AppShell>
  )
}
