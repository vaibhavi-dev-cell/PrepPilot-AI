from sqlalchemy import Boolean, Column, String, Integer, DateTime, ForeignKey
from datetime import datetime
from app.db.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    disabled = Column(Boolean, default=False)


class PracticeSession(Base):
    __tablename__ = 'practice_sessions'

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey('users.id'), nullable=False, index=True)
    question_id = Column(String, nullable=False, index=True)
    question_title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    feedback = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
