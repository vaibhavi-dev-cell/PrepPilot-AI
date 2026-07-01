from fastapi import APIRouter

router = APIRouter()


@router.get('', summary='Check backend health')
def health_check() -> dict:
    return {'status': 'ok', 'message': 'PrepPilot AI backend is healthy'}
