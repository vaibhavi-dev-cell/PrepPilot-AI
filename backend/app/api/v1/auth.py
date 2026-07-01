from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.security import authenticate_user, create_access_token

router = APIRouter()


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'


@router.post('/signin', response_model=TokenResponse)
def sign_in(form_data: OAuth2PasswordRequestForm = Depends()) -> TokenResponse:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid credentials',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'sub': user.email}, expires_delta=access_token_expires
    )

    return TokenResponse(access_token=access_token)
