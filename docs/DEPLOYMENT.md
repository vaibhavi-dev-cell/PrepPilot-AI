# PrepPilot AI - Deployment Guide

This guide explains how to deploy PrepPilot AI to various production hosting platforms.

---

## 🚀 Quick Deployment Options

| Platform | Backend | Frontend | Database | Cost | Difficulty |
|----------|---------|----------|----------|------|------------|
| **Render + Vercel** | ✅ | ✅ | Neon | Free tier | ⭐⭐ |
| **Railway** | ✅ | ✅ | PostgreSQL | Free tier | ⭐ |
| **Heroku + Netlify** | ✅ | ✅ | Heroku Postgres | Paid | ⭐⭐ |
| **DigitalOcean** | ✅ | ✅ | Managed DB | $5/mo | ⭐⭐⭐ |

---

## 🎯 Recommended: Render + Vercel + Neon

### Step 1: Database (Neon PostgreSQL)

1. Go to [neon.tech](https://neon.tech) and sign up (free PostgreSQL)
2. Create a new project
3. Copy your connection string (looks like `postgresql://user:password@host:5432/db`)
4. Save it securely — you'll use this for both Render and local testing

### Step 2: Backend (Render)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name:** `preppilot-backend`
   - **Environment:** Python 3.11
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Region:** Choose closest to your users
6. Click **"Advanced"** and add Environment Variables:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/db  (from Neon)
   SECRET_KEY=generate-random-long-string
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   FRONTEND_URL=https://preppilot-ai.vercel.app
   ```
7. Click **"Create Web Service"** and wait for deploy
8. Copy your backend URL (e.g., `https://preppilot-backend.onrender.com`)

### Step 3: Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New +"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variables:
   ```
   VITE_API_BASE_URL=https://preppilot-backend.onrender.com/api/v1
   ```
6. Click **"Deploy"** and wait
7. Your app is live at `https://preppilot-ai.vercel.app`

### Step 4: Test Production

```bash
# Sign up
curl -X POST https://preppilot-backend.onrender.com/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"prod@example.com","full_name":"Test","password":"Pass123"}'

# Sign in and grab token
curl -X POST https://preppilot-backend.onrender.com/api/v1/auth/signin \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=prod@example.com&password=Pass123"
```

---

## 🚂 Alternative: Railway (Simplest)

Railway handles everything in one place with automatic deploys.

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Railway auto-detects your stack and deploys both services
5. Add environment variables in Railway dashboard
6. Your app is live instantly

---

## 🐳 Docker Deployment

### Build Docker Images

```bash
# Backend
docker build -t preppilot-backend:latest ./backend

# Frontend
docker build -t preppilot-frontend:latest ./frontend
```

### Run with Docker Compose

```bash
docker-compose up -d
```

Access at `http://localhost:5173` (frontend) and `http://localhost:8001` (backend).

### Push to Docker Hub

```bash
docker login
docker tag preppilot-backend:latest yourusername/preppilot-backend:latest
docker push yourusername/preppilot-backend:latest

docker tag preppilot-frontend:latest yourusername/preppilot-frontend:latest
docker push yourusername/preppilot-frontend:latest
```

---

## 🔑 Environment Configuration

### Production Secrets
Never commit `.env` files to Git. Instead:

1. Generate secure secret key:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

2. Set in production platform dashboard, not in files

3. For GitHub Actions secrets:
   ```
   Settings > Secrets and variables > Actions > New repository secret
   ```

---

## 📊 Monitoring & Logging

### Render
- Logs visible in Render dashboard
- Set up alerts for deployment failures

### Vercel
- Logs in deployment history
- Real-time error tracking with Sentry integration:
  ```python
  # In backend app/main.py
  import sentry_sdk
  sentry_sdk.init(dsn=os.getenv('SENTRY_DSN'))
  ```

### Database Health
- Monitor Neon PostgreSQL usage in Neon dashboard
- Set alerts for connection limits

---

## 🔄 Continuous Deployment

GitHub Actions automatically deploys when you push to `main`:

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

The CI/CD pipeline runs tests, builds images, and deploys to Render/Vercel.

---

## 🆘 Troubleshooting Deployment

### CORS Errors
Make sure `FRONTEND_URL` in backend matches your actual frontend domain.

### Database Connection Refused
- Check `DATABASE_URL` format: `postgresql://user:password@host:port/db`
- Verify PostgreSQL is accepting connections from your server IP
- Test locally with: `psql <connection-string>`

### Frontend Can't Reach Backend
- Check `VITE_API_BASE_URL` environment variable
- Make sure backend is accessible from internet (not localhost)
- Check CORS configuration in `backend/app/main.py`

### Out of Memory
- SQLite limitation: Switch to PostgreSQL (already done for production)
- Python memory leak: Profile with `pip install memory-profiler`

---

## 💰 Cost Estimate

| Service | Free Tier | Paid |
|---------|---|---|
| **Neon PostgreSQL** | 0.5 GB storage | $0.30/GB/month |
| **Render** | 750 free hours/month | $7/month (Standard) |
| **Vercel** | Free | $20/month (Pro) |
| **Total** | ~Free | ~$25-30/month |

---

## 📝 Production Checklist

Before deploying to production:

- [ ] Change `SECRET_KEY` to a random secure string
- [ ] Set `DEBUG=False` in backend
- [ ] Use PostgreSQL (not SQLite)
- [ ] Enable HTTPS/SSL (automatic with Render/Vercel)
- [ ] Set up logging and monitoring (Sentry recommended)
- [ ] Test authentication flow end-to-end
- [ ] Verify user data privacy (no logging sensitive data)
- [ ] Set up automated backups for database
- [ ] Add rate limiting to API endpoints
- [ ] Test with real users from different regions

---

## 🎓 For Your Final-Year Project

When presenting to your professor:

1. Show local development setup with `npm run dev` + `uvicorn`
2. Explain your stack choices (React, FastAPI, SQLAlchemy)
3. Walk through the code architecture
4. Demo the production deployment (show the live URL)
5. Discuss performance optimizations for scale
6. Mention security practices (password hashing, JWT)

---

**Questions?** Refer to the main [README.md](./README.md) or check framework docs:
- [React Deployment](https://react.dev/learn/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
