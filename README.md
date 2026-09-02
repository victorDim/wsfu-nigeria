# WSFU (Who Swear For Us) 🇳🇬

> **Nigeria-focused citizen accountability, news, and government spending platform.**
> Built on React/Vite + FastAPI + Supabase (PostgreSQL + `pgvector`), featuring automated RSS aggregation, AI-assisted summarization, FAAC government spending tracking across all 36 States and 774 LGAs, Promise Meters, and FOI Request Generators.

---

## 📁 Project Architecture

```text
wsfu/
├── backend/                       # FastAPI Backend & Background Workers
│   ├── app/
│   │   ├── api/v1/endpoints/      # Feed, FAAC spending, Promises, FOI routes
│   │   ├── core/                  # Settings, Logging, Config
│   │   ├── db/                    # Supabase Client Manager
│   │   └── services/              # Trafilatura Extractor, RSS Ingestor, Gemini AI Summarizer
│   ├── requirements.txt
│   ├── Dockerfile
│   └── main.py
├── supabase/                      # Database Schemas & Migrations
│   └── migrations/
│       ├── 001_initial_schema.sql # Core tables & pgvector
│       ├── 002_rls_policies.sql   # Row Level Security
│       ├── 003_seed_sources.sql   # News sources (Punch, Premium Times, etc.)
│       └── 004_seed_nigeria_geo.sql # 36 States + 774 LGAs composite keys
├── web/                           # React 18 + Vite + Tailwind CSS + TypeScript
│   ├── src/
│   │   ├── components/            # Header, NewsCard, FAACExplorer, PromiseTracker, FOIGenerator
│   │   ├── lib/                   # API client & Supabase client
│   │   └── types/                 # TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
├── scripts/                       # Seeder scripts
│   └── seed_nigeria_data.py
├── .env.example
└── docker-compose.yml
```

---

## 🚀 Quick Start Guide

### 1. Database Setup (Supabase)
1. Open your [Supabase Dashboard](https://supabase.com).
2. Go to **SQL Editor** $\rightarrow$ **New Query**.
3. You can run the consolidated script in one click:
   - [`supabase/migrations/ALL_IN_ONE_MIGRATION.sql`](supabase/migrations/ALL_IN_ONE_MIGRATION.sql) *(Includes 001 - 010: Core Schema, 36 States + 774 LGAs, Officials, Relational Promises, Citizen Ratings & Atomic RPCs)*
   
   *Or run individual migrations sequentially:*
   - `001_initial_schema.sql` (Core tables & pgvector)
   - `002_rls_policies.sql` (Row Level Security)
   - `003_seed_sources.sql` (Media sources)
   - `004_seed_nigeria_geo.sql` (All 36 States + 774 LGAs)
   - `005_seed_rich_data.sql` (FAAC spending & demo promises)
   - `006_phase1_hardening.sql` (Kill switches, takedowns, audit logs)
   - `007_promise_tracker_and_ratings.sql` (Official profiles & citations)
   - `008_official_rating_summary_view.sql` (Rating summary view)
   - `009_atomic_promise_rpc.sql` (Atomic transaction RPCs)
   - `010_fix_cascade_delete_trigger.sql` (Cascade delete trigger fix)

### 2. Configure Environment (`.env`)
Copy `.env.example` to `.env` in the root folder:
```bash
cp .env.example .env
```
Fill in your `SUPABASE_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `GEMINI_API_KEY`.

### 3. Run Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*API will be live at `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.*

### 4. Run Frontend (React + Vite)
```bash
cd web
npm install
npm run dev
```
*Frontend will be live at `http://localhost:5173`.*

---

## 🛡️ Built-in Features
* **Full-Text Ingestion:** Bypasses truncated RSS feeds using `trafilatura` to extract clean news body text without ads.
* **Legal Attribution Engine:** AI prompt rules strictly attribute allegations (*"According to Premium Times..."*) to protect the platform from civil defamation liabilities.
* **Composite LGA Keys:** Prevents collision between identical LGA names (e.g. *Ifelodun* in Kwara vs Osun).
* **WhatsApp Viral Distribution:** Built-in share buttons formatted with quick-take summaries for Nigerian WhatsApp groups.
