from fastapi import FastAPI
from app.api.v1.routes import router as api_router
from app.db.init_db import init_db

app = FastAPI(title='PrepPilot AI Backend', version='0.1.0')

init_db()
app.include_router(api_router, prefix='/api/v1')


@app.get('/', tags=['root'])
def root() -> dict:
    return {'message': 'PrepPilot AI backend is running'}


if __name__ == '__main__':
    import uvicorn

    uvicorn.run('app.main:app', host='127.0.0.1', port=8001, log_level='info')
