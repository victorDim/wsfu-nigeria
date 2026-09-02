-- ==============================================================================
-- WSFU (Who Swear For Us) - Database Schema Migration 001
-- PostgreSQL + Supabase (Includes pgvector & pg_trgm for search and clustering)
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Nigerian States Table
CREATE TABLE IF NOT EXISTS public.states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(5) UNIQUE NOT NULL,       -- e.g. 'LA', 'KN', 'RV', 'FC'
    name VARCHAR(100) UNIQUE NOT NULL,     -- e.g. 'Lagos', 'Kano', 'Rivers', 'FCT'
    geopolitical_zone VARCHAR(50) NOT NULL,-- e.g. 'South West', 'North West', 'South South'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Nigerian LGAs Table (Uses composite unique constraint: state_id + name to prevent collisions)
CREATE TABLE IF NOT EXISTS public.lgas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,            -- e.g. 'Ikeja', 'Ifelodun'
    slug VARCHAR(150) NOT NULL,            -- e.g. 'kwara-ifelodun', 'osun-ifelodun'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_state_lga UNIQUE (state_id, name)
);

-- 4. News & Media Sources
CREATE TABLE IF NOT EXISTS public.sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) UNIQUE NOT NULL,     -- e.g. 'Premium Times', 'The Cable', 'Punch'
    slug VARCHAR(120) UNIQUE NOT NULL,
    base_url TEXT NOT NULL,
    rss_url TEXT NOT NULL,
    reliability_tier VARCHAR(20) DEFAULT 'tier_1', -- 'tier_1', 'tier_2', 'civic_org'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Raw Ingested Articles
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES public.sources(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    author VARCHAR(255),
    full_text TEXT,
    content_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA256 of text to prevent duplicates
    published_at TIMESTAMPTZ,
    ingested_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AI Summaries & Corroboration Clusters
CREATE TABLE IF NOT EXISTS public.article_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID UNIQUE NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    tldr_bullets JSONB NOT NULL,              -- Array of 3 concise strings
    civic_impact TEXT NOT NULL,              -- Why it matters to Nigerian citizens
    actors_entities JSONB DEFAULT '[]'::jsonb, -- Politician names, MDAs, companies
    figures_mentioned JSONB DEFAULT '[]'::jsonb, -- [ { "amount": "4.2B", "currency": "NGN" } ]
    corroboration_sources JSONB DEFAULT '[]'::jsonb, -- Other sources reporting same story
    confidence_score NUMERIC(3, 2) DEFAULT 0.95,
    embedding vector(768),                   -- For semantic clustering / pgvector
    status VARCHAR(20) DEFAULT 'published',   -- 'published', 'flagged_for_review', 'hidden'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FAAC (Federation Account Allocation Committee) Monthly Data
CREATE TABLE IF NOT EXISTS public.faac_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INT NOT NULL,
    month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('federal', 'state', 'lga')),
    state_id UUID REFERENCES public.states(id) ON DELETE SET NULL,
    lga_id UUID REFERENCES public.lgas(id) ON DELETE SET NULL,
    gross_amount NUMERIC(18, 2) NOT NULL,    -- In Naira
    deductions NUMERIC(18, 2) DEFAULT 0.00,  -- Debt deductions / statutory deductions
    net_amount NUMERIC(18, 2) NOT NULL,      -- Net allocation received
    source_document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_faac_record UNIQUE (year, month, tier, state_id, lga_id)
);

-- 8. Political & Governance Promise Tracker
CREATE TABLE IF NOT EXISTS public.promises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    official_name VARCHAR(150) NOT NULL,      -- e.g. 'President Bola Tinubu'
    office_title VARCHAR(150) NOT NULL,       -- e.g. 'President of Nigeria', 'Governor of Lagos'
    state_id UUID REFERENCES public.states(id) ON DELETE SET NULL,
    promise_title TEXT NOT NULL,
    description TEXT,
    category VARCHAR(80) NOT NULL,            -- e.g. 'Economy', 'Security', 'Infrastructure', 'Healthcare'
    status VARCHAR(30) DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'fulfilled', 'broken', 'compromised')),
    source_url TEXT,
    date_made DATE NOT NULL,
    target_completion_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Freedom of Information (FOI) Request Tracker
CREATE TABLE IF NOT EXISTS public.foi_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_code VARCHAR(30) UNIQUE NOT NULL, -- e.g. 'FOI-2026-WKS-004'
    mda_name VARCHAR(200) NOT NULL,           -- Ministry / Department / Agency
    subject TEXT NOT NULL,
    details TEXT NOT NULL,
    date_filed DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE GENERATED ALWAYS AS (date_filed + INTERVAL '7 days') STORED, -- Standard 7 days under FOI Act 2011
    status VARCHAR(30) DEFAULT 'submitted' CHECK (status IN ('submitted', 'acknowledged', 'under_review', 'fulfilled', 'denied', 'overdue')),
    response_summary TEXT,
    document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_source ON public.articles(source_id);
CREATE INDEX IF NOT EXISTS idx_faac_lookup ON public.faac_allocations(year, month, tier, state_id);
CREATE INDEX IF NOT EXISTS idx_promises_status ON public.promises(status);
CREATE INDEX IF NOT EXISTS idx_foi_status ON public.foi_requests(status);
