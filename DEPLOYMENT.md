# 🚀 WSFU (Who Swear For Us) — Cloud Deployment Guide

This guide provides step-by-step instructions to deploy the WSFU full-stack accountability platform to **Vercel** (Frontend PWA) and **Render** (FastAPI Backend) backed by **Supabase** (PostgreSQL Database & Auth).

---

## 🏗️ 1. Architecture Overview

```
                          ┌─────────────────────────────┐
                          │   Vercel (React Vite PWA)   │
                          │   https://wsfu.vercel.app   │
                          └──────────────┬──────────────┘
                                         │ API Requests / Webhooks
                                         ▼
                          ┌─────────────────────────────┐
                          │   Render (FastAPI Python)   │
                          │ https://wsfu-api.onrender.com│
                          └──────────────┬──────────────┘
                                         │ Database & Auth
                                         ▼
                          ┌─────────────────────────────┐
                          │     Supabase (PostgreSQL)   │
                          │  Auth + Vectors + Realtime  │
                          └─────────────────────────────┘
```

---

## 🌐 2. Frontend Deployment (Vercel)

### Option A: 1-Click Import from GitHub
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import repository: **`victorDim/wsfu-nigeria`**.
3. Configure Project Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `web` (or leave default if using root `vercel.json`)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variables:
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-supabase-anon-key`
   - `VITE_API_BASE_URL`: `https://wsfu-api.onrender.com`
5. Click **Deploy**.

---

## 🐍 3. Backend Deployment (Render)

### Option A: Using `render.yaml` Blueprint (Recommended)
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New** → **Blueprint**.
3. Connect repository: **`victorDim/wsfu-nigeria`**.
4. Render will automatically detect [`render.yaml`](file:///c:/Users/dimvi/projects/wsfu/render.yaml) and configure the Python web service.
5. Provide the secret environment variables when prompted:
   - `SUPABASE_URL`: `https://your-project.supabase.co`
   - `SUPABASE_KEY`: `your-supabase-anon-key`
   - `SUPABASE_SERVICE_ROLE_KEY`: `your-supabase-service-role-key`
   - `GEMINI_API_KEY`: `your-google-gemini-api-key`
   - `GEMINI_MODEL`: `gemini-2.5-flash`
6. Click **Apply**.

### Option B: Manual Web Service on Render
- **Environment:** Python 3.12
- **Build Command:** `pip install --upgrade pip && pip install -r backend/requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT --app-dir backend`
- **Health Check Path:** `/api/v1/health`

---

## 🗄️ 4. Supabase Database & Migrations

1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql).
2. Run the database migration script located in [`supabase/migrations/20260901_initial_schema.sql`](file:///c:/Users/dimvi/projects/wsfu/supabase/migrations/20260901_initial_schema.sql) (or seed SQL).
3. Confirm that the `articles`, `officials`, `promises`, `foi_requests`, and `source_publishers` tables are created with Row Level Security (RLS) enabled.

---

## 📲 5. WhatsApp Bot Webhook Setup (Twilio or Meta)

1. Set your WhatsApp Webhook URL to:
   ```
   https://wsfu-api.onrender.com/api/v1/whatsapp/webhook
   ```
2. Verify with test query:
   - Text `"FAAC Lagos"` or `"PROMISE Tinubu"` to the registered WhatsApp number.

---

## ✅ 6. Production Verification Checklist

- [ ] Web application loads at `https://wsfu.vercel.app`
- [ ] Backend health check responds `200 OK` at `https://wsfu-api.onrender.com/api/v1/health`
- [ ] PWA Service Worker installs and offline cache banner is active
- [ ] FAAC Explorer, Promise Meter, FOI Hub, and WhatsApp Simulator function with live data
- [ ] Admin Portal accessible with MFA protection
