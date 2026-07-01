from fastapi import APIRouter, Depends, HTTPException, status, Header
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uuid
from app.db.database import get_db
from app.db.models import PracticeSession
from app.core.security import get_current_user_email, get_user

router = APIRouter()


class PracticeQuestion(BaseModel):
    id: str
    title: str
    category: str
    difficulty: str
    prompt: str
    focus: str


class PracticeSubmission(BaseModel):
    question_id: str
    answer: str


class PracticeFeedback(BaseModel):
    score: int
    feedback: str
    strengths: list[str]
    improvements: list[str]


class PracticeSessionResponse(BaseModel):
    id: str
    question_title: str
    score: int
    created_at: str


QUESTIONS = [
    PracticeQuestion(
        id='arrays',
        title='Two Sum',
        category='Data Structures',
        difficulty='Easy',
        prompt='Given an array of integers and a target, return the indices of two numbers that add up to the target.',
        focus='Explain your approach and complexity before coding.',
    ),
    PracticeQuestion(
        id='system-design',
        title='Design a URL Shortener',
        category='System Design',
        difficulty='Medium',
        prompt='Describe the core components, APIs, storage strategy, and scaling considerations for a URL shortener service.',
        focus='Discuss trade-offs and reliability decisions.',
    ),
    PracticeQuestion(
        id='behavioral',
        title='Tell me about a challenge you overcame',
        category='Behavioral',
        difficulty='Easy',
        prompt='Share a time when you faced a challenge, how you handled it, and what you learned.',
        focus='Use a structured STAR response.',
    ),
]


@router.get('/questions', response_model=list[PracticeQuestion])
def get_practice_questions() -> list[PracticeQuestion]:
    return QUESTIONS


@router.post('/submit', response_model=PracticeFeedback)
def submit_practice_answer(
    payload: PracticeSubmission,
    authorization: str = Header(None),
    db: Session = Depends(get_db),
) -> PracticeFeedback:
    # Extract token from Authorization header (Bearer <token>) - optional for now
    user_email = None
    if authorization and authorization.startswith('Bearer '):
        try:
            token = authorization.split(' ')[1]
            user_email = get_current_user_email(token)
        except Exception:
            pass  # If token parsing fails, continue without user context
    
    answer_length = len(payload.answer.strip())
    score = min(10, max(4, 4 + answer_length // 25))

    if answer_length < 30:
        feedback = 'Your answer is brief. Add more detail about your approach and reasoning.'
        strengths = ['You attempted a clear response.']
        improvements = ['Include a concrete example.', 'Explain the trade-offs of your solution.']
    else:
        feedback = 'Strong response. You explained your reasoning well and showed good structure.'
        strengths = ['Clear structure.', 'Good use of reasoning.']
        improvements = ['Add a brief conclusion.', 'Mention edge cases if relevant.']

    # Find question title
    question_title = next((q.title for q in QUESTIONS if q.id == payload.question_id), 'Practice Question')
    question_category = next((q.category for q in QUESTIONS if q.id == payload.question_id), 'General')

    # Get user and save session if user is authenticated
    if user_email:
        user = get_user(user_email)
        if user:
            session = PracticeSession(
                id=str(uuid.uuid4()),
                user_id=user.id,
                question_id=payload.question_id,
                question_title=question_title,
                category=question_category,
                answer=payload.answer,
                score=score,
                feedback=feedback,
            )
            db.add(session)
            db.commit()

    return PracticeFeedback(
        score=score,
        feedback=feedback,
        strengths=strengths,
        improvements=improvements,
    )


class HistoryStats(BaseModel):
    total_sessions: int
    average_score: float
    recent_sessions: list[PracticeSessionResponse]


@router.get('/history', response_model=HistoryStats)
def get_practice_history(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
) -> HistoryStats:
    # Try to extract user from token - optional for now
    user = None
    if authorization and authorization.startswith('Bearer '):
        try:
            token = authorization.split(' ')[1]
            user_email = get_current_user_email(token)
            user = get_user(user_email)
        except Exception:
            pass

    if not user:
        # Return empty stats if not authenticated
        return HistoryStats(
            total_sessions=0,
            average_score=0.0,
            recent_sessions=[],
        )

    sessions = db.query(PracticeSession).filter(PracticeSession.user_id == user.id).order_by(PracticeSession.created_at.desc()).limit(10).all()
    
    total = len(sessions)
    avg_score = sum(s.score for s in sessions) / total if total > 0 else 0
    
    recent = [
        PracticeSessionResponse(
            id=s.id,
            question_title=s.question_title,
            score=s.score,
            created_at=s.created_at.isoformat(),
        )
        for s in sessions
    ]
    
    return HistoryStats(
        total_sessions=total,
        average_score=round(avg_score, 2),
        recent_sessions=recent,
    )

