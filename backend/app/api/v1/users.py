from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from app.core.security import get_user, pwd_context, store_user

router = APIRouter()


class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class SignupResponse(BaseModel):
    message: str
    email: str


@router.post('/signup', response_model=SignupResponse)
def signup(payload: SignupRequest) -> SignupResponse:
    if get_user(str(payload.email)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='A user with this email already exists',
        )

    store_user(
        email=str(payload.email),
        full_name=payload.full_name,
        password=payload.password,
    )

    return SignupResponse(message='User created successfully', email=str(payload.email))
