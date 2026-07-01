from fastapi import APIRouter
from .auth import router as auth_router
from .health import router as health_router
from .practice import router as practice_router
from .users import router as users_router

router = APIRouter()
router.include_router(health_router, prefix='/health', tags=['health'])
router.include_router(auth_router, prefix='/auth', tags=['authentication'])
router.include_router(practice_router, prefix='/practice', tags=['practice'])
router.include_router(users_router, prefix='/users', tags=['users'])
