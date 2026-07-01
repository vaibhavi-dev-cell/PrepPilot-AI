# PrepPilot AI Backend

This backend is built with FastAPI and serves the PrepPilot AI application.

## Setup

1. Create a Python virtual environment:

```powershell
python -m venv .venv
```

2. Activate the environment:

```powershell
.\.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```powershell
python -m pip install -r requirements.txt
```
```

## Run the backend

```powershell
python app/main.py
```

The service will start on `http://127.0.0.1:8001`.

## API routes

- `GET /` — root status
- `GET /api/v1/health` — health check
- `POST /api/v1/auth/signin` — sign in with basic credentials

## Demo credentials

- Email: `student@example.com`
- Password: `studyhard123`
