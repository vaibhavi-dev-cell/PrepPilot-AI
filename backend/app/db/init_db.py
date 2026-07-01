from app.db.database import Base, engine
from app.db.models import User


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
