# PrepPilot AI - Final Year Project

A **production-ready full-stack interview prep platform** built with React, FastAPI, and SQLAlchemy. Perfect for final-year computer science projects with clean architecture, polished UI, and working API backend.

**Live Demo:** `http://127.0.0.1:5173` (local development)

---

## 📋 Features

✅ **Authentication** — JWT-based sign up/sign in with secure password hashing  
✅ **Practice Questions** — Coding, system design, and behavioral interview prep  
✅ **AI-Powered Feedback** — Instant scoring (1–10) with improvement suggestions  
✅ **Practice History** — Track all past sessions with scores and timestamps    
✅ **Dashboard** — Real-time stats (total sessions, average score)  
✅ **Responsive UI** — Mobile-first design with Tailwind CSS  
✅ **Type-Safe** — Full TypeScript on frontend, Python type hints on backend  
✅ **SQLite + PostgreSQL Ready** — Local SQLite for dev, PostgreSQL for production  

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** 18+ with npm
- **Python** 3.10+
- **Git**

### 1. Clone & Setup

```bash
cd PrepPilot-AI

# Frontend setup
cd frontend
npm install
npm run dev  # Starts on port 5173

# Backend setup (in new terminal)
cd backend
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# OR
.\.venv\Scripts\activate  # Windows

pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

### 2. Access the App
- **Frontend:** http://127.0.0.1:5173
- **Backend API:** http://127.0.0.1:8001
- **API Docs:** http://127.0.0.1:8001/docs

### 3. Test the Flow
1. Sign up with email and password
2. Sign in to get redirected to dashboard
3. Go to Practice page and answer a question
4. Submit to get AI feedback
5. Check dashboard for practice history

---

## 📁 Project Structure

```
PrepPilot-AI/
├── frontend/                  # React + Vite + TypeScript
│   ├── src/
│   │   ├── pages/            # Home, SignIn, SignUp, Dashboard, Practice
│   │   ├── components/       # Reusable UI (TopNav, AppShell, etc.)
│   │   ├── lib/              # API helper (buildApiUrl, apiFetch)
│   │   └── App.tsx           # Router setup
│   ├── package.json          # npm dependencies
│   └── vite.config.ts        # Vite config with /api proxy to backend
│
├── backend/                   # FastAPI + SQLAlchemy + SQLite/PostgreSQL
│   ├── app/
│   │   ├── main.py           # FastAPI app entry
│   │   ├── api/v1/           # API routes (auth, users, practice)
│   │   ├── core/             # Config, security, JWT
│   │   └── db/               # SQLAlchemy models, database init
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment template
│   └── .env                   # Local development config
│
├── docs/                      # Project documentation
└── README.md                  # This file
```

---

## 🔧 Environment Variables

### Backend (`.env` file)
```bash
# Database (default: SQLite for local dev)
DATABASE_URL=sqlite:///./preppilot.db

# For production with PostgreSQL:
# DATABASE_URL=postgresql://user:password@host:5432/preppilot_db

# JWT Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Server
BACKEND_HOST=127.0.0.1
BACKEND_PORT=8001
FRONTEND_URL=http://localhost:5173
```

---

## 🗄️ Database Schema

### `users` table
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `full_name` (String)
- `hashed_password` (String, bcrypt)
- `disabled` (Boolean, default: False)

### `practice_sessions` table
- `id` (UUID, Primary Key)
- `user_id` (Foreign Key → users.id)
- `question_id` (String)
- `question_title` (String)
- `category` (String)
- `answer` (String, Long Text)
- `score` (Integer, 1–10)
- `feedback` (String)
- `created_at` (DateTime, indexed)

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/v1/auth/signin` | `username`, `password` (form-encoded) | `{ access_token, token_type }` |
| POST | `/api/v1/users/signup` | `email`, `password`, `full_name` (JSON) | `{ message, email }` |

### Practice
| Method | Endpoint | Headers | Body | Response |
|--------|----------|---------|------|----------|
| GET | `/api/v1/practice/questions` | — | — | `[{ id, title, category, difficulty, prompt, focus }]` |
| POST | `/api/v1/practice/submit` | `Authorization: Bearer <token>` | `{ question_id, answer }` | `{ score, feedback, strengths[], improvements[] }` |
| GET | `/api/v1/practice/history` | `Authorization: Bearer <token>` | — | `{ total_sessions, average_score, recent_sessions[] }` |

### Health
| Method | Endpoint | Response |
|--------|----------|----------|
| GET | `/api/v1/health` | `{ status: "ok", message: "..." }` |

---

## 🚢 Deployment

### Option 1: **Render + Vercel** (Recommended for Final-Year Projects)

#### Backend (Render)
1. Push code to GitHub
2. Create account at [render.com](https://render.com)
3. Create new **Web Service**
   - Repository: Your GitHub repo
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment variables: Set `DATABASE_URL`, `SECRET_KEY`, etc.
4. Deploy and get backend URL (e.g., `https://preppilot-backend.onrender.com`)

#### Frontend (Vercel)
1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set environment variable:
   - `VITE_API_BASE_URL=https://preppilot-backend.onrender.com/api/v1`
4. Deploy automatically on `git push`

#### Database (Neon PostgreSQL)
1. Create free PostgreSQL database at [neon.tech](https://neon.tech)
2. Copy connection string (e.g., `postgresql://user:password@host:5432/db`)
3. Set as `DATABASE_URL` in Render backend environment

### Option 2: **Docker + Heroku**

#### Dockerfile (Backend)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Heroku Deploy
```bash
heroku create preppilot-backend
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set SECRET_KEY=your-secret-key
git push heroku main
```

---

## 🧪 Testing

### Test Sign Up & Sign In (CLI)
```bash
# Create new user
curl -X POST http://127.0.0.1:8001/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","full_name":"Test User","password":"TestPass123"}'

# Sign in
curl -X POST http://127.0.0.1:8001/api/v1/auth/signin \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=TestPass123"

# Copy the access_token and use it:
curl -X GET http://127.0.0.1:8001/api/v1/practice/history \
  -H "Authorization: Bearer <your-access-token>"
```

### Test in Browser
1. Open http://127.0.0.1:5173
2. Sign up (auto-redirects to sign in)
3. Sign in (redirects to dashboard with stats)
4. Visit Practice, answer a question, get feedback
5. Back to Dashboard — see history and average score

---

## 🛠️ Development Tips

### Frontend
- **Tailwind styling:** All components use Tailwind CSS (dark theme)
- **Routing:** React Router with protected routes (redirects to sign in if no token)
- **API calls:** Use `apiFetch()` helper in [src/lib/api.ts](frontend/src/lib/api.ts) — automatically includes JWT token

### Backend
- **Hot reload:** Run with `--reload` flag in development
- **API docs:** Interactive Swagger UI at `/docs`
- **Database migrations:** Run `init_db()` on app startup to create tables
- **Security:** Uses PBKDF2 password hashing (passlib) and HS256 JWT tokens

---

## 📦 Dependencies

### Frontend
- **React** 19
- **TypeScript** 6
- **Vite** 8 (dev server + build)
- **Tailwind CSS** 3 (styling)
- **PostCSS** (CSS processing)
- **react-router-dom** (routing)

### Backend
- **FastAPI** 0.111.1 (web framework)
- **Uvicorn** 0.23.2 (ASGI server)
- **SQLAlchemy** 2.0.36 (ORM)
- **python-jose** (JWT tokens)
- **passlib** (password hashing)
- **python-dotenv** (environment variables)

---

## 🎓 Project Showcase Tips

✅ **Code quality:** Type hints, modular structure, clean separation of concerns  
✅ **Full stack:** React frontend + FastAPI backend + SQLAlchemy ORM  
✅ **Authentication:** JWT tokens with secure password hashing  
✅ **Database:** Schema design with relationships (users → practice_sessions)  
✅ **API design:** RESTful endpoints with proper HTTP status codes  
✅ **UI/UX:** Polished dark theme, responsive layout, error handling  
✅ **DevOps ready:** Docker, environment config, production deployment paths  

---

## 🐛 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (3.10+)
- Reinstall dependencies: `pip install --upgrade -r requirements.txt`
- Clear database: `rm backend/preppilot.db` (will recreate on next run)

### Frontend says "API not found" (CORS error)
- Make sure backend is running on port 8001
- Check that Vite proxy is configured: `vite.config.ts` should have `/api` → `http://127.0.0.1:8001`

### Database locked error (SQLite)
- Close any other terminal sessions using the database
- SQLite has poor concurrency — switch to PostgreSQL for production

### Token expired
- Default token lifetime: 30 minutes
- Change `ACCESS_TOKEN_EXPIRE_MINUTES` in `.env` or go to `backend/app/core/config.py`

---

## 📄 License

MIT — Free to use for your final-year project and beyond.

---

## 📞 Support

For issues or questions, check the [GitHub repo](https://github.com) or consult the API documentation at `/docs` (when backend is running).

---

**Ready to demo to your professor?** ✨  
Start backend + frontend, navigate to `http://127.0.0.1:5173`, sign up, and show off your full-stack skills!
