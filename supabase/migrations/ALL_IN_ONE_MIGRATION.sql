-- ==============================================================================
-- WSFU (Who Swear For Us) - Complete All-In-One Database Migration (001 - 010)
-- PostgreSQL + Supabase (Includes pgvector, geo, FAAC, officials & promises RPC)
-- ==============================================================================

-- >>> START OF 001_initial_schema.sql >>>
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

-- <<< END OF 001_initial_schema.sql <<<


-- >>> START OF 002_rls_policies.sql >>>
-- ==============================================================================
-- WSFU (Who Swear For Us) - Database Security & RLS Policies 002
-- ==============================================================================

-- Enable Row Level Security on all tables
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lgas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faac_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foi_requests ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies (Allow anonymous/public users to query published data)
CREATE POLICY "Public Read States" ON public.states FOR SELECT USING (true);
CREATE POLICY "Public Read LGAs" ON public.lgas FOR SELECT USING (true);
CREATE POLICY "Public Read Sources" ON public.sources FOR SELECT USING (true);
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public Read Published Summaries" ON public.article_summaries 
    FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read FAAC Allocations" ON public.faac_allocations FOR SELECT USING (true);
CREATE POLICY "Public Read Promises" ON public.promises FOR SELECT USING (true);
CREATE POLICY "Public Read FOI Requests" ON public.foi_requests FOR SELECT USING (true);

-- 2. Service Role / Admin Write Policies (Backend scraper & ingestion workers only)
-- In Supabase, the service_role key automatically bypasses RLS, but explicit write policies ensure safety
CREATE POLICY "Service Role Full Access States" ON public.states 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access LGAs" ON public.lgas 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access Sources" ON public.sources 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access Articles" ON public.articles 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access Summaries" ON public.article_summaries 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access FAAC" ON public.faac_allocations 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access Promises" ON public.promises 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access FOI" ON public.foi_requests 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- <<< END OF 002_rls_policies.sql <<<


-- >>> START OF 003_seed_sources.sql >>>
-- ==============================================================================
-- WSFU (Who Swear For Us) - Seed Top Nigerian News Outlets 003
-- ==============================================================================

INSERT INTO public.sources (name, slug, base_url, rss_url, reliability_tier, is_active)
VALUES
    ('Premium Times', 'premium-times', 'https://www.premiumtimesng.com', 'https://www.premiumtimesng.com/feed', 'tier_1', true),
    ('The Cable', 'the-cable', 'https://www.thecable.ng', 'https://www.thecable.ng/feed', 'tier_1', true),
    ('Punch Newspapers', 'punch-newspapers', 'https://punchng.com', 'https://punchng.com/feed', 'tier_1', true),
    ('Daily Trust', 'daily-trust', 'https://dailytrust.com', 'https://dailytrust.com/feed', 'tier_1', true),
    ('Sahara Reporters', 'sahara-reporters', 'https://saharareporters.com', 'https://saharareporters.com/feeds/latest/feed', 'tier_2', true),
    ('BusinessDay', 'businessday', 'https://businessday.ng', 'https://businessday.ng/feed', 'tier_1', true)
ON CONFLICT (name) DO NOTHING;

-- <<< END OF 003_seed_sources.sql <<<


-- >>> START OF 004_seed_nigeria_geo.sql >>>
-- Auto-generated Nigeria Geography Seed (36 States + FCT + 774 LGAs)
DO $$
DECLARE
    v_state_id UUID;
BEGIN

    -- State: Abia (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Abia', 'AB', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aba North', 'abia-aba-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aba South', 'abia-aba-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Arochukwu', 'abia-arochukwu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bende', 'abia-bende')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikwuano', 'abia-ikwuano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isiala Ngwa North', 'abia-isiala-ngwa-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isiala Ngwa South', 'abia-isiala-ngwa-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isuikwuato', 'abia-isuikwuato')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obi Ngwa', 'abia-obi-ngwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohafia', 'abia-ohafia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Osisioma', 'abia-osisioma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ugwunagbo', 'abia-ugwunagbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukwa East', 'abia-ukwa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukwa West', 'abia-ukwa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Umuahia North', 'abia-umuahia-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Umuahia South', 'abia-umuahia-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Umu Nneochi', 'abia-umu-nneochi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Adamawa (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Adamawa', 'AD', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Demsa', 'adamawa-demsa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fufure', 'adamawa-fufure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ganye', 'adamawa-ganye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gayuk', 'adamawa-gayuk')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gombi', 'adamawa-gombi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Grie', 'adamawa-grie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Hong', 'adamawa-hong')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jada', 'adamawa-jada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lamurde', 'adamawa-lamurde')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Madagali', 'adamawa-madagali')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maiha', 'adamawa-maiha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mayo Belwa', 'adamawa-mayo-belwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Michika', 'adamawa-michika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mubi North', 'adamawa-mubi-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mubi South', 'adamawa-mubi-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Numan', 'adamawa-numan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shelleng', 'adamawa-shelleng')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Song', 'adamawa-song')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Toungo', 'adamawa-toungo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yola North', 'adamawa-yola-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yola South', 'adamawa-yola-south')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Akwa Ibom (31 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Akwa Ibom', 'AK', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abak', 'akwa-ibom-abak')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eastern Obolo', 'akwa-ibom-eastern-obolo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eket', 'akwa-ibom-eket')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esit Eket', 'akwa-ibom-esit-eket')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Essien Udim', 'akwa-ibom-essien-udim')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etim Ekpo', 'akwa-ibom-etim-ekpo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etinan', 'akwa-ibom-etinan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibeno', 'akwa-ibom-ibeno')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibesikpo Asutan', 'akwa-ibom-ibesikpo-asutan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibiono-Ibom', 'akwa-ibom-ibiono-ibom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ika', 'akwa-ibom-ika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikono', 'akwa-ibom-ikono')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikot Abasi', 'akwa-ibom-ikot-abasi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikot Ekpene', 'akwa-ibom-ikot-ekpene')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ini', 'akwa-ibom-ini')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Itu', 'akwa-ibom-itu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mbo', 'akwa-ibom-mbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mkpat-Enin', 'akwa-ibom-mkpat-enin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsit-Atai', 'akwa-ibom-nsit-atai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsit-Ibom', 'akwa-ibom-nsit-ibom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsit-Ubium', 'akwa-ibom-nsit-ubium')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obot Akara', 'akwa-ibom-obot-akara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okobo', 'akwa-ibom-okobo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onna', 'akwa-ibom-onna')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oron', 'akwa-ibom-oron')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oruk Anam', 'akwa-ibom-oruk-anam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udung-Uko', 'akwa-ibom-udung-uko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukanafun', 'akwa-ibom-ukanafun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uruan', 'akwa-ibom-uruan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Urue-Offong/Oruko', 'akwa-ibom-urue-offong-oruko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uyo', 'akwa-ibom-uyo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Anambra (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Anambra', 'AN', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aguata', 'anambra-aguata')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anambra East', 'anambra-anambra-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anambra West', 'anambra-anambra-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anaocha', 'anambra-anaocha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awka North', 'anambra-awka-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awka South', 'anambra-awka-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ayamelum', 'anambra-ayamelum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dunukofia', 'anambra-dunukofia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekwusigo', 'anambra-ekwusigo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idemili North', 'anambra-idemili-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idemili South', 'anambra-idemili-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ihiala', 'anambra-ihiala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Njikoka', 'anambra-njikoka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nnewi North', 'anambra-nnewi-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nnewi South', 'anambra-nnewi-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbaru', 'anambra-ogbaru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onitsha North', 'anambra-onitsha-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onitsha South', 'anambra-onitsha-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orumba North', 'anambra-orumba-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orumba South', 'anambra-orumba-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyi', 'anambra-oyi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Bauchi (20 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Bauchi', 'BA', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Alkaleri', 'bauchi-alkaleri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bauchi', 'bauchi-bauchi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bogoro', 'bauchi-bogoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Damban', 'bauchi-damban')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Darazo', 'bauchi-darazo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dass', 'bauchi-dass')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gamawa', 'bauchi-gamawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ganjuwa', 'bauchi-ganjuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Giade', 'bauchi-giade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Itas/Gadau', 'bauchi-itas-gadau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jama''are', 'bauchi-jamaare')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katagum', 'bauchi-katagum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kirfi', 'bauchi-kirfi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Misau', 'bauchi-misau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ningi', 'bauchi-ningi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shira', 'bauchi-shira')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tafawa Balewa', 'bauchi-tafawa-balewa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Toro', 'bauchi-toro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warji', 'bauchi-warji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zaki', 'bauchi-zaki')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Bayelsa (8 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Bayelsa', 'BY', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Brass', 'bayelsa-brass')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekeremor', 'bayelsa-ekeremor')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kolokuma/Opokuma', 'bayelsa-kolokuma-opokuma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nembe', 'bayelsa-nembe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbia', 'bayelsa-ogbia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sagbama', 'bayelsa-sagbama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Southern Ijaw', 'bayelsa-southern-ijaw')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yenagoa', 'bayelsa-yenagoa')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Benue (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Benue', 'BE', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agatu', 'benue-agatu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Apa', 'benue-apa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ado', 'benue-ado')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Buruku', 'benue-buruku')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gboko', 'benue-gboko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Guma', 'benue-guma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwer East', 'benue-gwer-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwer West', 'benue-gwer-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katsina-Ala', 'benue-katsina-ala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Konshisha', 'benue-konshisha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwande', 'benue-kwande')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Logo', 'benue-logo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Makurdi', 'benue-makurdi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obi', 'benue-obi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbadibo', 'benue-ogbadibo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohimini', 'benue-ohimini')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oju', 'benue-oju')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okpokwu', 'benue-okpokwu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oturkpo', 'benue-oturkpo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tarka', 'benue-tarka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukum', 'benue-ukum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ushongo', 'benue-ushongo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Vandeikya', 'benue-vandeikya')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Borno (27 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Borno', 'BO', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abadam', 'borno-abadam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Askira/Uba', 'borno-askira-uba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bama', 'borno-bama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bayo', 'borno-bayo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Biu', 'borno-biu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chibok', 'borno-chibok')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Damboa', 'borno-damboa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dikwa', 'borno-dikwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gubio', 'borno-gubio')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Guzamala', 'borno-guzamala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwoza', 'borno-gwoza')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Hawul', 'borno-hawul')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jere', 'borno-jere')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaga', 'borno-kaga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kala/Balge', 'borno-kala-balge')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Konduga', 'borno-konduga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kukawa', 'borno-kukawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwaya Kusar', 'borno-kwaya-kusar')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mafa', 'borno-mafa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Magumeri', 'borno-magumeri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maiduguri', 'borno-maiduguri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Marte', 'borno-marte')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mobbar', 'borno-mobbar')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Monguno', 'borno-monguno')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ngala', 'borno-ngala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nganzai', 'borno-nganzai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shani', 'borno-shani')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Cross River (18 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Cross River', 'CR', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abi', 'cross-river-abi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akamkpa', 'cross-river-akamkpa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akpabuyo', 'cross-river-akpabuyo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bakassi', 'cross-river-bakassi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bekwarra', 'cross-river-bekwarra')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Biase', 'cross-river-biase')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Boki', 'cross-river-boki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Calabar Municipal', 'cross-river-calabar-municipal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Calabar South', 'cross-river-calabar-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etung', 'cross-river-etung')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikom', 'cross-river-ikom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obanliku', 'cross-river-obanliku')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obubra', 'cross-river-obubra')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obudu', 'cross-river-obudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odukpani', 'cross-river-odukpani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogoja', 'cross-river-ogoja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yakuur', 'cross-river-yakuur')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yala', 'cross-river-yala')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Delta (25 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Delta', 'DE', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aniocha North', 'delta-aniocha-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aniocha South', 'delta-aniocha-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bomadi', 'delta-bomadi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Burutu', 'delta-burutu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ethiope East', 'delta-ethiope-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ethiope West', 'delta-ethiope-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ika North East', 'delta-ika-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ika South', 'delta-ika-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isoko North', 'delta-isoko-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isoko South', 'delta-isoko-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ndokwa East', 'delta-ndokwa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ndokwa West', 'delta-ndokwa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okpe', 'delta-okpe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oshimili North', 'delta-oshimili-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oshimili South', 'delta-oshimili-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Patani', 'delta-patani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sapele', 'delta-sapele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udu', 'delta-udu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ughelli North', 'delta-ughelli-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ughelli South', 'delta-ughelli-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukwuani', 'delta-ukwuani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uvwie', 'delta-uvwie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warri North', 'delta-warri-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warri South', 'delta-warri-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warri South West', 'delta-warri-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ebonyi (13 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ebonyi', 'EB', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abakaliki', 'ebonyi-abakaliki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Afikpo North', 'ebonyi-afikpo-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Afikpo South', 'ebonyi-afikpo-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ebonyi', 'ebonyi-ebonyi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezza North', 'ebonyi-ezza-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezza South', 'ebonyi-ezza-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikwo', 'ebonyi-ikwo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ishielu', 'ebonyi-ishielu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ivo', 'ebonyi-ivo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Izzi', 'ebonyi-izzi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohaozara', 'ebonyi-ohaozara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohaukwu', 'ebonyi-ohaukwu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onicha', 'ebonyi-onicha')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Edo (18 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Edo', 'ED', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko-Edo', 'edo-akoko-edo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egor', 'edo-egor')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan Central', 'edo-esan-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan North-East', 'edo-esan-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan South-East', 'edo-esan-south-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan West', 'edo-esan-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etsako Central', 'edo-etsako-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etsako East', 'edo-etsako-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etsako West', 'edo-etsako-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igueben', 'edo-igueben')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikpoba Okha', 'edo-ikpoba-okha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orhionmwon', 'edo-orhionmwon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oredo', 'edo-oredo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ovia North-East', 'edo-ovia-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ovia South-West', 'edo-ovia-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owan East', 'edo-owan-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owan West', 'edo-owan-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uhunmwonde', 'edo-uhunmwonde')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ekiti (15 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ekiti', 'EK', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ado Ekiti', 'ekiti-ado-ekiti')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Efon', 'ekiti-efon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti East', 'ekiti-ekiti-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti South-West', 'ekiti-ekiti-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti West', 'ekiti-ekiti-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Emure', 'ekiti-emure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gbonyin', 'ekiti-gbonyin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ido Osi', 'ekiti-ido-osi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijero', 'ekiti-ijero')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikole', 'ekiti-ikole')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilejemeje', 'ekiti-ilejemeje')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepodun/Ifelodun', 'ekiti-irepodun-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ise/Orun', 'ekiti-ise-orun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Moba', 'ekiti-moba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oye', 'ekiti-oye')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Enugu (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Enugu', 'EN', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aninri', 'enugu-aninri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awgu', 'enugu-awgu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Enugu East', 'enugu-enugu-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Enugu North', 'enugu-enugu-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Enugu South', 'enugu-enugu-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezeagu', 'enugu-ezeagu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igbo Etiti', 'enugu-igbo-etiti')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igbo Eze North', 'enugu-igbo-eze-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igbo Eze South', 'enugu-igbo-eze-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isi Uzo', 'enugu-isi-uzo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nkanu East', 'enugu-nkanu-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nkanu West', 'enugu-nkanu-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsukka', 'enugu-nsukka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oji River', 'enugu-oji-river')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udenu', 'enugu-udenu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udi', 'enugu-udi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uzo Uwani', 'enugu-uzo-uwani')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Federal Capital Territory (6 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Federal Capital Territory', 'FC', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abaji', 'federal-capital-territory-abaji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bwari', 'federal-capital-territory-bwari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwagwalada', 'federal-capital-territory-gwagwalada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kuje', 'federal-capital-territory-kuje')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwali', 'federal-capital-territory-kwali')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Municipal Area Council', 'federal-capital-territory-municipal-area-council')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Gombe (11 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Gombe', 'GO', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akko', 'gombe-akko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Balanga', 'gombe-balanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Billiri', 'gombe-billiri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dukku', 'gombe-dukku')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Funakaye', 'gombe-funakaye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gombe', 'gombe-gombe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaltungo', 'gombe-kaltungo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwami', 'gombe-kwami')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nafada', 'gombe-nafada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shongom', 'gombe-shongom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yamaltu/Deba', 'gombe-yamaltu-deba')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Imo (27 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Imo', 'IM', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aboh Mbaise', 'imo-aboh-mbaise')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ahiazu Mbaise', 'imo-ahiazu-mbaise')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ehime Mbano', 'imo-ehime-mbano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezinihitte', 'imo-ezinihitte')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ideato North', 'imo-ideato-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ideato South', 'imo-ideato-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ihitte/Uboma', 'imo-ihitte-uboma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikeduru', 'imo-ikeduru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isiala Mbano', 'imo-isiala-mbano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isu', 'imo-isu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mbaitoli', 'imo-mbaitoli')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ngor Okpala', 'imo-ngor-okpala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Njaba', 'imo-njaba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nkwerre', 'imo-nkwerre')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nwangele', 'imo-nwangele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obowo', 'imo-obowo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oguta', 'imo-oguta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohaji/Egbema', 'imo-ohaji-egbema')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okigwe', 'imo-okigwe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orlu', 'imo-orlu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orsu', 'imo-orsu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oru East', 'imo-oru-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oru West', 'imo-oru-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owerri Municipal', 'imo-owerri-municipal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owerri North', 'imo-owerri-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owerri West', 'imo-owerri-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Unuimo', 'imo-unuimo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Jigawa (27 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Jigawa', 'JI', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Auyo', 'jigawa-auyo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Babura', 'jigawa-babura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Biriniwa', 'jigawa-biriniwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Kudu', 'jigawa-birnin-kudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Buji', 'jigawa-buji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dutse', 'jigawa-dutse')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gagarawa', 'jigawa-gagarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Garki', 'jigawa-garki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gumel', 'jigawa-gumel')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Guri', 'jigawa-guri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwaram', 'jigawa-gwaram')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwiwa', 'jigawa-gwiwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Hadejia', 'jigawa-hadejia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jahun', 'jigawa-jahun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kafin Hausa', 'jigawa-kafin-hausa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kazaure', 'jigawa-kazaure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kiri Kasama', 'jigawa-kiri-kasama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kiyawa', 'jigawa-kiyawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaugama', 'jigawa-kaugama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maigatari', 'jigawa-maigatari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Malam Madori', 'jigawa-malam-madori')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Miga', 'jigawa-miga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ringim', 'jigawa-ringim')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Roni', 'jigawa-roni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sule Tankarkar', 'jigawa-sule-tankarkar')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Taura', 'jigawa-taura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yankwashi', 'jigawa-yankwashi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kaduna (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kaduna', 'KD', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Gwari', 'kaduna-birnin-gwari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chikun', 'kaduna-chikun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Giwa', 'kaduna-giwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igabi', 'kaduna-igabi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikara', 'kaduna-ikara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jaba', 'kaduna-jaba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jema''a', 'kaduna-jemaa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kachia', 'kaduna-kachia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaduna North', 'kaduna-kaduna-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaduna South', 'kaduna-kaduna-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kagarko', 'kaduna-kagarko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kajuru', 'kaduna-kajuru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaura', 'kaduna-kaura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kauru', 'kaduna-kauru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kubau', 'kaduna-kubau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kudan', 'kaduna-kudan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lere', 'kaduna-lere')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Makarfi', 'kaduna-makarfi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sabon Gari', 'kaduna-sabon-gari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sanga', 'kaduna-sanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Soba', 'kaduna-soba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zangon Kataf', 'kaduna-zangon-kataf')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zaria', 'kaduna-zaria')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kano (44 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kano', 'KN', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ajingi', 'kano-ajingi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Albasu', 'kano-albasu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bagwai', 'kano-bagwai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bebeji', 'kano-bebeji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bichi', 'kano-bichi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bunkure', 'kano-bunkure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dala', 'kano-dala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dambatta', 'kano-dambatta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dawakin Kudu', 'kano-dawakin-kudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dawakin Tofa', 'kano-dawakin-tofa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Doguwa', 'kano-doguwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fagge', 'kano-fagge')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gabasawa', 'kano-gabasawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Garko', 'kano-garko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Garun Mallam', 'kano-garun-mallam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gaya', 'kano-gaya')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gezawa', 'kano-gezawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwale', 'kano-gwale')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwarzo', 'kano-gwarzo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kabo', 'kano-kabo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kano Municipal', 'kano-kano-municipal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karaye', 'kano-karaye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kibiya', 'kano-kibiya')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kiru', 'kano-kiru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kumbotso', 'kano-kumbotso')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kunchi', 'kano-kunchi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kura', 'kano-kura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Madobi', 'kano-madobi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Makoda', 'kano-makoda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Minjibir', 'kano-minjibir')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nasarawa', 'kano-nasarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rano', 'kano-rano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rimin Gado', 'kano-rimin-gado')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rogo', 'kano-rogo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shanono', 'kano-shanono')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sumaila', 'kano-sumaila')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Takai', 'kano-takai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tarauni', 'kano-tarauni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tofa', 'kano-tofa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tsanyawa', 'kano-tsanyawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tudun Wada', 'kano-tudun-wada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ungogo', 'kano-ungogo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warawa', 'kano-warawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wudil', 'kano-wudil')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Katsina (33 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Katsina', 'KT', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bakori', 'katsina-bakori')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Batagarawa', 'katsina-batagarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Batsari', 'katsina-batsari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Baure', 'katsina-baure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bindawa', 'katsina-bindawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Charanchi', 'katsina-charanchi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dandume', 'katsina-dandume')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Danja', 'katsina-danja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dan Musa', 'katsina-dan-musa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Daura', 'katsina-daura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dutsin Ma', 'katsina-dutsin-ma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Faskari', 'katsina-faskari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Funtua', 'katsina-funtua')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ingawa', 'katsina-ingawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jibia', 'katsina-jibia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kafur', 'katsina-kafur')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaita', 'katsina-kaita')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kankara', 'katsina-kankara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kankia', 'katsina-kankia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katsina', 'katsina-katsina')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kurfi', 'katsina-kurfi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kusada', 'katsina-kusada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mai''Adua', 'katsina-maiadua')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Malumfashi', 'katsina-malumfashi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mani', 'katsina-mani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mashi', 'katsina-mashi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Matazu', 'katsina-matazu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Musawa', 'katsina-musawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rimi', 'katsina-rimi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sabuwa', 'katsina-sabuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Safana', 'katsina-safana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sandamu', 'katsina-sandamu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zango', 'katsina-zango')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kebbi (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kebbi', 'KB', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aleiro', 'kebbi-aleiro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Arewa Dandi', 'kebbi-arewa-dandi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Argungu', 'kebbi-argungu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Augie', 'kebbi-augie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bagudo', 'kebbi-bagudo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Kebbi', 'kebbi-birnin-kebbi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bunza', 'kebbi-bunza')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dandi', 'kebbi-dandi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fakai', 'kebbi-fakai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwandu', 'kebbi-gwandu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jega', 'kebbi-jega')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kalgo', 'kebbi-kalgo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Koko/Besse', 'kebbi-koko-besse')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maiyama', 'kebbi-maiyama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ngaski', 'kebbi-ngaski')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sakaba', 'kebbi-sakaba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shanga', 'kebbi-shanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Suru', 'kebbi-suru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Danko-Wasagu', 'kebbi-danko-wasagu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yauri', 'kebbi-yauri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zuru', 'kebbi-zuru')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kogi (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kogi', 'KO', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Adavi', 'kogi-adavi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ajaokuta', 'kogi-ajaokuta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ankpa', 'kogi-ankpa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bassa', 'kogi-bassa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dekina', 'kogi-dekina')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibaji', 'kogi-ibaji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idah', 'kogi-idah')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igalamela Odolu', 'kogi-igalamela-odolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijumu', 'kogi-ijumu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kabba/Bunu', 'kogi-kabba-bunu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kogi', 'kogi-kogi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lokoja', 'kogi-lokoja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mopa Muro', 'kogi-mopa-muro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ofu', 'kogi-ofu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogori/Magongo', 'kogi-ogori-magongo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okehi', 'kogi-okehi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okene', 'kogi-okene')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Olamaboro', 'kogi-olamaboro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Omala', 'kogi-omala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yagba East', 'kogi-yagba-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yagba West', 'kogi-yagba-west')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kwara (16 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kwara', 'KW', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Asa', 'kwara-asa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Baruten', 'kwara-baruten')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Edu', 'kwara-edu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti', 'kwara-ekiti')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifelodun', 'kwara-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilorin East', 'kwara-ilorin-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilorin South', 'kwara-ilorin-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilorin West', 'kwara-ilorin-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepodun', 'kwara-irepodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isin', 'kwara-isin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaiama', 'kwara-kaiama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Moro', 'kwara-moro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Offa', 'kwara-offa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oke Ero', 'kwara-oke-ero')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyun', 'kwara-oyun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Pategi', 'kwara-pategi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Lagos (20 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Lagos', 'LA', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agege', 'lagos-agege')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ajeromi-Ifelodun', 'lagos-ajeromi-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Alimosho', 'lagos-alimosho')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Amuwo-Odofin', 'lagos-amuwo-odofin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Apapa', 'lagos-apapa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Badagry', 'lagos-badagry')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Epe', 'lagos-epe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eti Osa', 'lagos-eti-osa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibeju-Lekki', 'lagos-ibeju-lekki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifako-Ijaiye', 'lagos-ifako-ijaiye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikeja', 'lagos-ikeja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikorodu', 'lagos-ikorodu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kosofe', 'lagos-kosofe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lagos Island', 'lagos-lagos-island')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lagos Mainland', 'lagos-lagos-mainland')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mushin', 'lagos-mushin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ojo', 'lagos-ojo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oshodi-Isolo', 'lagos-oshodi-isolo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shomolu', 'lagos-shomolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Surulere', 'lagos-surulere')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Nasarawa (13 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Nasarawa', 'NA', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akwanga', 'nasarawa-akwanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awe', 'nasarawa-awe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Doma', 'nasarawa-doma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karu', 'nasarawa-karu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Keana', 'nasarawa-keana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Keffi', 'nasarawa-keffi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kokona', 'nasarawa-kokona')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lafia', 'nasarawa-lafia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nasarawa', 'nasarawa-nasarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nasarawa Egon', 'nasarawa-nasarawa-egon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obi', 'nasarawa-obi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Toto', 'nasarawa-toto')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wamba', 'nasarawa-wamba')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Niger (25 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Niger', 'NI', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agaie', 'niger-agaie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agwara', 'niger-agwara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bida', 'niger-bida')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Borgu', 'niger-borgu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bosso', 'niger-bosso')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chanchaga', 'niger-chanchaga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Edati', 'niger-edati')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gbako', 'niger-gbako')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gurara', 'niger-gurara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katcha', 'niger-katcha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kontagora', 'niger-kontagora')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lapai', 'niger-lapai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lavun', 'niger-lavun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Magama', 'niger-magama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mariga', 'niger-mariga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mashegu', 'niger-mashegu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mokwa', 'niger-mokwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Moya', 'niger-moya')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Paikoro', 'niger-paikoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rafi', 'niger-rafi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rijau', 'niger-rijau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shiroro', 'niger-shiroro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Suleja', 'niger-suleja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tafa', 'niger-tafa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wushishi', 'niger-wushishi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ogun (20 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ogun', 'OG', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abeokuta North', 'ogun-abeokuta-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abeokuta South', 'ogun-abeokuta-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ado-Odo/Ota', 'ogun-ado-odo-ota')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbado North', 'ogun-egbado-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbado South', 'ogun-egbado-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ewekoro', 'ogun-ewekoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifo', 'ogun-ifo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu East', 'ogun-ijebu-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu North', 'ogun-ijebu-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu North East', 'ogun-ijebu-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu Ode', 'ogun-ijebu-ode')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikenne', 'ogun-ikenne')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Imeko Afon', 'ogun-imeko-afon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ipokia', 'ogun-ipokia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obafemi Owode', 'ogun-obafemi-owode')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odeda', 'ogun-odeda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odogbolu', 'ogun-odogbolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogun Waterside', 'ogun-ogun-waterside')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Remo North', 'ogun-remo-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shagamu', 'ogun-shagamu')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ondo (18 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ondo', 'ON', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko North-East', 'ondo-akoko-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko North-West', 'ondo-akoko-north-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko South-East', 'ondo-akoko-south-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko South-West', 'ondo-akoko-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akure North', 'ondo-akure-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akure South', 'ondo-akure-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ese Odo', 'ondo-ese-odo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idanre', 'ondo-idanre')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifedore', 'ondo-ifedore')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilaje', 'ondo-ilaje')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ile Oluji/Okeigbo', 'ondo-ile-oluji-okeigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irele', 'ondo-irele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odigbo', 'ondo-odigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okitipupa', 'ondo-okitipupa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ondo East', 'ondo-ondo-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ondo West', 'ondo-ondo-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ose', 'ondo-ose')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owo', 'ondo-owo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Osun (30 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Osun', 'OS', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atakunmosa East', 'osun-atakunmosa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atakunmosa West', 'osun-atakunmosa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aiyedaade', 'osun-aiyedaade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aiyedire', 'osun-aiyedire')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Boluwaduro', 'osun-boluwaduro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Boripe', 'osun-boripe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ede North', 'osun-ede-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ede South', 'osun-ede-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife Central', 'osun-ife-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife East', 'osun-ife-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife North', 'osun-ife-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife South', 'osun-ife-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbedore', 'osun-egbedore')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ejigbo', 'osun-ejigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifedayo', 'osun-ifedayo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifelodun', 'osun-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ila', 'osun-ila')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilesa East', 'osun-ilesa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilesa West', 'osun-ilesa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepodun', 'osun-irepodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irewole', 'osun-irewole')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isokan', 'osun-isokan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Iwo', 'osun-iwo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obokun', 'osun-obokun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odo Otin', 'osun-odo-otin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ola Oluwa', 'osun-ola-oluwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Olorunda', 'osun-olorunda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oriade', 'osun-oriade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orolu', 'osun-orolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Osogbo', 'osun-osogbo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Oyo (33 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Oyo', 'OY', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Afijio', 'oyo-afijio')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akinyele', 'oyo-akinyele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atiba', 'oyo-atiba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atisbo', 'oyo-atisbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbeda', 'oyo-egbeda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan North', 'oyo-ibadan-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan North-East', 'oyo-ibadan-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan North-West', 'oyo-ibadan-north-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan South-East', 'oyo-ibadan-south-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan South-West', 'oyo-ibadan-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibarapa Central', 'oyo-ibarapa-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibarapa East', 'oyo-ibarapa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibarapa North', 'oyo-ibarapa-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ido', 'oyo-ido')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepo', 'oyo-irepo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Iseyin', 'oyo-iseyin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Itesiwaju', 'oyo-itesiwaju')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Iwajowa', 'oyo-iwajowa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kajola', 'oyo-kajola')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lagelu', 'oyo-lagelu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbomosho North', 'oyo-ogbomosho-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbomosho South', 'oyo-ogbomosho-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogo Oluwa', 'oyo-ogo-oluwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Olorunsogo', 'oyo-olorunsogo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oluyole', 'oyo-oluyole')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ona Ara', 'oyo-ona-ara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orelope', 'oyo-orelope')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ori Ire', 'oyo-ori-ire')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyo East', 'oyo-oyo-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyo West', 'oyo-oyo-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Saki East', 'oyo-saki-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Saki West', 'oyo-saki-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Surulere', 'oyo-surulere')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Plateau (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Plateau', 'PL', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Barkin Ladi', 'plateau-barkin-ladi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bassa', 'plateau-bassa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bokkos', 'plateau-bokkos')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jos East', 'plateau-jos-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jos North', 'plateau-jos-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jos South', 'plateau-jos-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kanam', 'plateau-kanam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kanke', 'plateau-kanke')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Langtang North', 'plateau-langtang-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Langtang South', 'plateau-langtang-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mangu', 'plateau-mangu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mikang', 'plateau-mikang')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Pankshin', 'plateau-pankshin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Qua''an Pan', 'plateau-quaan-pan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Riyom', 'plateau-riyom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shendam', 'plateau-shendam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wase', 'plateau-wase')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Rivers (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Rivers', 'RV', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abua/Odual', 'rivers-abua-odual')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ahoada East', 'rivers-ahoada-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ahoada West', 'rivers-ahoada-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akuku-Toru', 'rivers-akuku-toru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Andoni', 'rivers-andoni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Asari-Toru', 'rivers-asari-toru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bonny', 'rivers-bonny')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Degema', 'rivers-degema')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eleme', 'rivers-eleme')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Emuoha', 'rivers-emuoha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etche', 'rivers-etche')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gokana', 'rivers-gokana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikwerre', 'rivers-ikwerre')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Khana', 'rivers-khana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obio/Akpor', 'rivers-obio-akpor')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogba/Egbema/Ndoni', 'rivers-ogba-egbema-ndoni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogu/Bolo', 'rivers-ogu-bolo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okrika', 'rivers-okrika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Omuma', 'rivers-omuma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Opobo/Nkoro', 'rivers-opobo-nkoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyigbo', 'rivers-oyigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Port Harcourt', 'rivers-port-harcourt')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tai', 'rivers-tai')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Sokoto (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Sokoto', 'SO', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Binji', 'sokoto-binji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bodinga', 'sokoto-bodinga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dange Shuni', 'sokoto-dange-shuni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gada', 'sokoto-gada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Goronyo', 'sokoto-goronyo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gudu', 'sokoto-gudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gawabawa', 'sokoto-gawabawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Illela', 'sokoto-illela')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isa', 'sokoto-isa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kebbe', 'sokoto-kebbe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kware', 'sokoto-kware')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rabah', 'sokoto-rabah')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sabon Birni', 'sokoto-sabon-birni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shagari', 'sokoto-shagari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Silame', 'sokoto-silame')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sokoto North', 'sokoto-sokoto-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sokoto South', 'sokoto-sokoto-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tambuwal', 'sokoto-tambuwal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tangaza', 'sokoto-tangaza')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tureta', 'sokoto-tureta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wamako', 'sokoto-wamako')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wurno', 'sokoto-wurno')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yabo', 'sokoto-yabo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Taraba (16 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Taraba', 'TR', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ardo Kola', 'taraba-ardo-kola')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bali', 'taraba-bali')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Donga', 'taraba-donga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gashaka', 'taraba-gashaka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gassol', 'taraba-gassol')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibi', 'taraba-ibi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jalingo', 'taraba-jalingo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karim Lamido', 'taraba-karim-lamido')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kurmi', 'taraba-kurmi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lau', 'taraba-lau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sardauna', 'taraba-sardauna')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Takum', 'taraba-takum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ussa', 'taraba-ussa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wukari', 'taraba-wukari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yorro', 'taraba-yorro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zing', 'taraba-zing')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Yobe (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Yobe', 'YO', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bade', 'yobe-bade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bursari', 'yobe-bursari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Damaturu', 'yobe-damaturu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fika', 'yobe-fika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fune', 'yobe-fune')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Geidam', 'yobe-geidam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gujba', 'yobe-gujba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gulani', 'yobe-gulani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jakusko', 'yobe-jakusko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karasuwa', 'yobe-karasuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Machina', 'yobe-machina')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nangere', 'yobe-nangere')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nguru', 'yobe-nguru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Potiskum', 'yobe-potiskum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tarmuwa', 'yobe-tarmuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yunusari', 'yobe-yunusari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yusufari', 'yobe-yusufari')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Zamfara (14 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Zamfara', 'ZM', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anka', 'zamfara-anka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bakura', 'zamfara-bakura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Magaji/Kiyaw', 'zamfara-birnin-magaji-kiyaw')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bukkuyum', 'zamfara-bukkuyum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bungudu', 'zamfara-bungudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gummi', 'zamfara-gummi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gusau', 'zamfara-gusau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaura Namoda', 'zamfara-kaura-namoda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maradun', 'zamfara-maradun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maru', 'zamfara-maru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shinkafi', 'zamfara-shinkafi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Talata Mafara', 'zamfara-talata-mafara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chafe', 'zamfara-chafe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zurmi', 'zamfara-zurmi')
    ON CONFLICT (state_id, name) DO NOTHING;
END $$;
-- <<< END OF 004_seed_nigeria_geo.sql <<<


-- >>> START OF 005_seed_rich_data.sql >>>

-- ==============================================================================
-- WSFU - Seed 005: Rich FAAC Spending Data, Breaking News & Promises
-- ==============================================================================

-- 1. Insert High-Profile Political Promises
INSERT INTO public.promises (official_name, office_title, promise_title, description, category, status, date_made)
VALUES
('President Bola Tinubu', 'President of Nigeria', 'Full Student Loan Scheme Implementation & Disbursement', 'Provide interest-free higher education loans to indigent Nigerian students through NELFUND across all accredited tertiary institutions.', 'Education', 'fulfilled', '2023-06-12'),
('President Bola Tinubu', 'President of Nigeria', 'National Minimum Wage Increment to N70,000', 'Sign into law and implement a new national minimum wage structure across federal and state public services.', 'Economy', 'fulfilled', '2024-07-29'),
('Federal Ministry of Petroleum', 'NNPC / Ministry of Petroleum', 'Port Harcourt Refinery Complete Revamp & 60,000 BPD Output', 'Refurbish the old Port Harcourt refinery to commence commercial domestic refining of petrol and diesel.', 'Economy', 'in_progress', '2023-12-20'),
('Ministry of Power', 'Federal Ministry of Power', 'Siemens Presidential Power Initiative (PPI) Substation Expansion', 'Deliver 7,000MW to 11,000MW grid wheeling capacity through upgraded transformers in Ikeja, Abuja, and Kano.', 'Infrastructure', 'in_progress', '2024-02-15'),
('Federal Ministry of Works', 'Minister David Umahi', 'Lagos-Calabar 700km Coastal Superhighway Construction', 'Construct a 10-lane coastal highway connecting Lagos, Ogun, Ondo, Edo, Delta, Bayelsa, Rivers, Akwa Ibom, and Cross River.', 'Infrastructure', 'in_progress', '2024-03-01'),
('Ministry of Interior', 'Minister Olubunmi Tunji-Ojo', 'Automated E-Passport Processing & Home Delivery', 'Eliminate passport queues and introduce fully automated contactless international passport application and biometric home dispatch.', 'Security', 'fulfilled', '2024-01-08'),
('Central Bank of Nigeria', 'Governor Olayemi Cardoso', 'Foreign Exchange Backlog Clearance ($7 Billion)', 'Settle all verified outstanding FX forward obligations to foreign airlines and commercial banks.', 'Economy', 'fulfilled', '2024-03-20'),
('Defence Headquarters', 'Chief of Defence Staff', 'Total Decimation of Mining Bandits in Zamfara & Niger', 'Deploy joint task force air and ground surveillance to secure solid mineral mining belts across the North West.', 'Security', 'in_progress', '2024-05-10')
ON CONFLICT DO NOTHING;

-- 2. Insert Sample FAAC Allocations for Key States (2024 Months 1 to 12)
DO $$
DECLARE
    r_state RECORD;
    m INT;
    v_gross NUMERIC;
    v_ded NUMERIC;
    v_net NUMERIC;
    v_base NUMERIC;
BEGIN
    FOR r_state IN SELECT id, name FROM public.states LOOP
        -- Set realistic base allocations depending on oil derivation vs inland states
        IF r_state.name IN ('Rivers', 'Delta', 'Akwa Ibom', 'Bayelsa') THEN
            v_base := 28000000000; -- 28 Billion base
        ELSIF r_state.name IN ('Lagos', 'Kano', 'Oyo', 'Kaduna') THEN
            v_base := 18000000000; -- 18 Billion base
        ELSE
            v_base := 9000000000;  -- 9 Billion base
        END IF;

        FOR m IN 1..12 LOOP
            v_gross := v_base + (m * 850000000);
            v_ded := v_gross * 0.12; -- 12% debt & statutory deductions
            v_net := v_gross - v_ded;

            INSERT INTO public.faac_allocations (year, month, tier, state_id, gross_amount, deductions, net_amount)
            VALUES (2024, m, 'state', r_state.id, v_gross, v_ded, v_net)
            ON CONFLICT (year, month, tier, state_id, lga_id) DO UPDATE 
            SET gross_amount = EXCLUDED.gross_amount, deductions = EXCLUDED.deductions, net_amount = EXCLUDED.net_amount;
        END LOOP;
    END LOOP;
END $$;

-- <<< END OF 005_seed_rich_data.sql <<<


-- >>> START OF 006_phase1_hardening.sql >>>
-- ==============================================================================
-- WSFU Phase 1 Hardening Migration 006
-- Source Kill Switch, Ingestion Health, Verification & Corrections, Audit Logs, Takedown Requests
-- ==============================================================================

-- 1. Hardening 'sources' Table with Kill Switch & Ingestion Health
ALTER TABLE public.sources 
ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'National',
ADD COLUMN IF NOT EXISTS last_fetched_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS fetch_status VARCHAR(30) DEFAULT 'healthy' CHECK (fetch_status IN ('healthy', 'degraded', 'failing', 'disabled')),
ADD COLUMN IF NOT EXISTS consecutive_errors INT DEFAULT 0;

-- 2. Hardening 'articles' Table with Image URL, Verification Status & Corrections
ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'National',
ADD COLUMN IF NOT EXISTS verification_status VARCHAR(30) DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'corroborated', 'verified')),
ADD COLUMN IF NOT EXISTS is_corrected BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS correction_note TEXT,
ADD COLUMN IF NOT EXISTS corrected_at TIMESTAMPTZ;

-- 3. Immutable Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID NOT NULL,
    action VARCHAR(80) NOT NULL, -- e.g. 'TOGGLE_SOURCE_KILL_SWITCH', 'UPDATE_VERIFICATION', 'ISSUE_CORRECTION'
    target_entity VARCHAR(50) NOT NULL, -- 'sources', 'articles', 'summaries'
    target_id UUID NOT NULL,
    previous_state JSONB,
    new_state JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Publisher/Outlet Takedown Requests Table (Legal & NDPR Compliance)
CREATE TABLE IF NOT EXISTS public.takedown_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_name VARCHAR(150) NOT NULL,
    requester_email VARCHAR(255) NOT NULL,
    organization VARCHAR(200),
    article_url TEXT NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved_removed', 'rejected')),
    resolution_notes TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_sources_is_enabled ON public.sources(is_enabled);
CREATE INDEX IF NOT EXISTS idx_articles_verification ON public.articles(verification_status);
CREATE INDEX IF NOT EXISTS idx_articles_is_corrected ON public.articles(is_corrected);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_takedown_status ON public.takedown_requests(status);

-- 6. Row Level Security Updates
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.takedown_requests ENABLE ROW LEVEL SECURITY;

-- Public can ONLY see enabled sources (Kill switch takes effect instantly at the DB layer)
DROP POLICY IF EXISTS "Public Read Sources" ON public.sources;
CREATE POLICY "Public Read Sources" ON public.sources 
    FOR SELECT USING (is_enabled = TRUE);

-- Public can submit takedown requests, but CANNOT read others' requests
CREATE POLICY "Public Submit Takedowns" ON public.takedown_requests 
    FOR INSERT WITH CHECK (true);

-- Service Role / Admin full access for audit logs and takedown management
CREATE POLICY "Service Role Full Access Audit" ON public.admin_audit_logs 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service Role Full Access Takedowns" ON public.takedown_requests 
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- <<< END OF 006_phase1_hardening.sql <<<


-- >>> START OF 007_promise_tracker_and_ratings.sql >>>
-- ==============================================================================
-- Migration 007: Official Profiles, Relational Tracked Promises,
-- Multi-Source Citations, Public Status Changelog & Citizen Ratings
-- ==============================================================================
-- Builds on top of existing tables (states, lgas, sources, articles,
-- article_summaries, faac_allocations, foi_requests, admin_audit_logs,
-- takedown_requests) -- none of those are touched by this migration.
--
-- This deliberately differs in places from the earlier draft schema --
-- every deviation is called out inline below with a comment explaining why.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- Shared trigger: auto-maintain updated_at on any table that has the column.
-- Skip creating this if you already have an equivalent shared trigger function.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ==============================================================================
-- 1. official_profiles
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.official_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    state_id UUID REFERENCES public.states(id) ON DELETE RESTRICT,
        -- RESTRICT, not CASCADE: deleting a state should never silently wipe
        -- out every official tied to it. Matches the RESTRICT pattern your
        -- own articles.source_id already uses.
        -- NULL for role = 'president' (not tied to a single state).
    name VARCHAR(200) NOT NULL,
    office_title VARCHAR(200) NOT NULL,
        -- The real title shown to readers -- e.g. 'FCT Minister'. The
        -- frontend must render THIS field for the section label, never
        -- infer a title from `role`.
    role VARCHAR(30) NOT NULL CHECK (role IN ('president', 'governor', 'fct_minister', 'senator', 'house_of_rep')),
        -- 'fct_minister' is its own value (not reusing 'governor') so
        -- nothing downstream can key off role and mislabel Abuja.
    district_constituency VARCHAR(200), -- e.g. 'Abia North Senatorial District'
    party VARCHAR(100) NOT NULL,
    term_period VARCHAR(50) NOT NULL, -- e.g. 'May 2023 - Present'
    photo_url TEXT,
    photo_attribution TEXT, -- required Commons credit line whenever photo_url is set
    photo_source_url TEXT,  -- link back to the Commons file page
    initials VARCHAR(10) NOT NULL, -- used for the placeholder avatar when no photo
    bio_summary TEXT,
    education JSONB NOT NULL DEFAULT '[]'::jsonb,
    past_offices JSONB NOT NULL DEFAULT '[]'::jsonb,
    quality_of_life JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_photo_requires_attribution
        CHECK (photo_url IS NULL OR photo_attribution IS NOT NULL)
        -- Enforces the Commons license requirement at the data layer: you
        -- cannot save a photo without its credit line.
);

CREATE TRIGGER trg_official_profiles_updated_at
    BEFORE UPDATE ON public.official_profiles
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_official_role_state ON public.official_profiles(role, state_id);

ALTER TABLE public.official_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read official profiles"
    ON public.official_profiles FOR SELECT USING (true);
-- No INSERT/UPDATE/DELETE policy for anon/authenticated on purpose: profile
-- creation/edits go through the backend using the service-role key, gated
-- by the AAL2 MFA admin check -- not through client-side RLS. Flag me if
-- that's not actually how admin writes are meant to work.


-- ==============================================================================
-- 2. tracked_promises
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.tracked_promises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    official_id UUID NOT NULL REFERENCES public.official_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category VARCHAR(80) NOT NULL CHECK (category IN ('Economy', 'Infrastructure', 'Education', 'Healthcare', 'Security', 'Governance')),
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'not_started'
        CHECK (status IN ('not_started', 'in_progress', 'fulfilled', 'broken')),
        -- Default is 'not_started' (a freshly entered promise shouldn't
        -- default to "already being worked on"). 'broken' = actively
        -- abandoned/failed, distinct from 'not_started' (never begun).
    date_made DATE NOT NULL,
    budget_allocated VARCHAR(100),
        -- Free text, not NUMERIC like faac_allocations.gross_amount. Fine
        -- for display; revisit as NUMERIC(18,2) + unit if you'll ever
        -- sort/sum/filter by amount.
    progress_pct INT NOT NULL DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
    milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- evidence_url intentionally removed -- replaced by promise_sources
    -- below, per the "robust multi-source" decision.
);

CREATE INDEX IF NOT EXISTS idx_tracked_promises_official ON public.tracked_promises(official_id);
CREATE INDEX IF NOT EXISTS idx_tracked_promises_status ON public.tracked_promises(status);

ALTER TABLE public.tracked_promises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read tracked promises"
    ON public.tracked_promises FOR SELECT USING (true);
-- Same as official_profiles: writes go through the backend/service role only.


-- ==============================================================================
-- 3. promise_sources -- mandatory citation(s) per promise
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promise_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    promise_id UUID NOT NULL REFERENCES public.tracked_promises(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL CHECK (url ~* '^https?://'),
        -- Same http(s)-only validation pattern already used for image_url
        -- elsewhere in this project.
    published_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_promise_sources_promise ON public.promise_sources(promise_id);

ALTER TABLE public.promise_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read promise sources"
    ON public.promise_sources FOR SELECT USING (true);
-- Writes: backend/service role only.

-- --- Data-layer enforcement: every promise must have >= 1 source ---------------
-- A promise row is created first, then its source(s) -- a same-table CHECK
-- can't express "at least one row exists in another table." Solved with a
-- deferred constraint trigger: it runs at COMMIT, not at the INSERT itself,
-- so the promise + its first source can be inserted in the same transaction
-- and it still passes. Commit with zero sources for that promise, the whole
-- transaction is rejected.

CREATE OR REPLACE FUNCTION public.enforce_promise_has_source()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.promise_sources WHERE promise_id = NEW.id
    ) THEN
        RAISE EXCEPTION 'tracked_promises % has no promise_sources row -- at least one cited source is required', NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER trg_promise_requires_source
    AFTER INSERT ON public.tracked_promises
    DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW EXECUTE FUNCTION public.enforce_promise_has_source();

-- Mirror guard: block deleting the *last* remaining source for a promise,
-- so the invariant can't be violated after the fact either.
CREATE OR REPLACE FUNCTION public.enforce_promise_retains_source()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.promise_sources WHERE promise_id = OLD.promise_id
    ) THEN
        RAISE EXCEPTION 'Cannot delete the last cited source for promise % -- every promise must retain at least one source', OLD.promise_id;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_promise_source_retain_min
    AFTER DELETE ON public.promise_sources
    FOR EACH ROW EXECUTE FUNCTION public.enforce_promise_retains_source();


-- ==============================================================================
-- 4. promise_status_history -- public-facing changelog (distinct from
--    admin_audit_logs, which is internal and carries ip_address /
--    admin_user_id that shouldn't be shown to readers)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.promise_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    promise_id UUID NOT NULL REFERENCES public.tracked_promises(id) ON DELETE CASCADE,
    previous_status VARCHAR(30), -- NULL on the promise's very first status
    new_status VARCHAR(30) NOT NULL CHECK (new_status IN ('not_started', 'in_progress', 'fulfilled', 'broken')),
    reason TEXT NOT NULL, -- the visible, human-readable explanation readers see
    changed_by_admin_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_promise_status_history_promise ON public.promise_status_history(promise_id);

ALTER TABLE public.promise_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read promise status history"
    ON public.promise_status_history FOR SELECT USING (true);
-- Writes: backend/service role only. Deliberately NOT auto-populated by a
-- trigger on tracked_promises.status -- that would need Postgres session
-- variables to pass the 'reason' text through, which is fragile and hard
-- to unit test. Step 2 (FastAPI) wraps the status UPDATE and this INSERT
-- in a single transaction instead -- explicit, testable, easy to debug.


-- ==============================================================================
-- 5. citizen_ratings -- logged-in only, one active rating per user per official
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.citizen_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    official_id UUID NOT NULL REFERENCES public.official_profiles(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        -- NOT NULL: this endpoint is logged-in only, overriding the general
        -- anonymous-allowed Action Endpoint pattern, per explicit decision.
        -- No ip_hash column -- identity is the de-dup key, not IP.
    rating_pct INT NOT NULL CHECK (rating_pct BETWEEN 0 AND 100),
        -- Approval-percentage slider, not a 1-5 star scale.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_official_voter UNIQUE (official_id, user_id)
        -- One active rating per user per official. The API should UPSERT
        -- (INSERT ... ON CONFLICT (official_id, user_id) DO UPDATE ...) so
        -- a repeat rating updates in place instead of stacking.
);

CREATE TRIGGER trg_citizen_ratings_updated_at
    BEFORE UPDATE ON public.citizen_ratings
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_citizen_ratings_official ON public.citizen_ratings(official_id);

ALTER TABLE public.citizen_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read citizen ratings"
    ON public.citizen_ratings FOR SELECT USING (true);

CREATE POLICY "Users can submit their own rating"
    ON public.citizen_ratings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rating"
    ON public.citizen_ratings FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- <<< END OF 007_promise_tracker_and_ratings.sql <<<


-- >>> START OF 008_official_rating_summary_view.sql >>>
-- ==============================================================================
-- Migration 008: official_rating_summary view
-- ==============================================================================
-- Aggregates citizen_ratings into per-official averages for the public read
-- endpoints.  Created as a plain view (not materialized) because:
--   1. citizen_ratings is small enough that the aggregation is fast.
--   2. A materialized view would need a REFRESH strategy (trigger or cron)
--      that adds operational complexity we don't need yet.
--   3. The officials list endpoint already degrades gracefully if this view
--      doesn't exist or returns no rows -- but having it means the
--      avg_rating_pct / rating_count fields actually populate.
-- ==============================================================================

CREATE OR REPLACE VIEW public.official_rating_summary AS
SELECT
    official_id,
    ROUND(AVG(rating_pct))::INT AS avg_rating_pct,
    COUNT(*)::INT AS rating_count
FROM public.citizen_ratings
GROUP BY official_id;

-- PostgREST needs the view exposed through RLS.  Views inherit the
-- security policies of their underlying tables, but we still need to
-- grant SELECT so the anon/authenticated roles can read it via the
-- REST API.
GRANT SELECT ON public.official_rating_summary TO anon, authenticated;

-- <<< END OF 008_official_rating_summary_view.sql <<<


-- >>> START OF 009_atomic_promise_rpc.sql >>>
-- ==============================================================================
-- Migration 009: RPC functions for atomic promise & status operations
-- ==============================================================================
-- PostgREST auto-commits each individual request, but the deferred
-- constraint trigger trg_promise_requires_source (from migration 007)
-- fires at COMMIT time. That means a bare INSERT into tracked_promises
-- via PostgREST will always fail -- by the time it commits, there are
-- no promise_sources rows yet.
--
-- These server-side functions wrap both inserts in a single transaction
-- so the deferred trigger sees the source row(s) at COMMIT and passes.
-- ==============================================================================

-- ---------------------------------------------------------------------------
-- 1. Atomic promise + source(s) creation
-- ---------------------------------------------------------------------------
-- Accepts a JSONB array of sources so the caller can attach 1..N citations
-- in a single RPC call. Returns the new promise row as JSON.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_promise_with_sources(
    p_official_id UUID,
    p_title TEXT,
    p_category VARCHAR(80),
    p_description TEXT DEFAULT NULL,
    p_date_made DATE DEFAULT CURRENT_DATE,
    p_budget_allocated VARCHAR(100) DEFAULT NULL,
    p_sources JSONB DEFAULT '[]'::JSONB
)
RETURNS JSONB AS $$
DECLARE
    v_promise_id UUID;
    v_source JSONB;
    v_result JSONB;
BEGIN
    -- Validate at least one source is provided (fail fast, don't wait for trigger)
    IF jsonb_array_length(p_sources) = 0 THEN
        RAISE EXCEPTION 'At least one source is required when creating a promise';
    END IF;

    INSERT INTO public.tracked_promises
        (official_id, title, category, description, date_made, budget_allocated)
    VALUES
        (p_official_id, p_title, p_category, p_description, p_date_made, p_budget_allocated)
    RETURNING id INTO v_promise_id;

    FOR v_source IN SELECT * FROM jsonb_array_elements(p_sources) LOOP
        INSERT INTO public.promise_sources (promise_id, title, url, published_date)
        VALUES (
            v_promise_id,
            v_source->>'title',
            v_source->>'url',
            (v_source->>'published_date')::DATE
        );
    END LOOP;

    -- Return the full promise row as JSONB
    SELECT to_jsonb(tp.*) INTO v_result
    FROM public.tracked_promises tp
    WHERE tp.id = v_promise_id;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution to service_role (backend admin client)
REVOKE ALL ON FUNCTION public.create_promise_with_sources FROM PUBLIC;
REVOKE ALL ON FUNCTION public.create_promise_with_sources FROM anon;
REVOKE ALL ON FUNCTION public.create_promise_with_sources FROM authenticated;
GRANT EXECUTE ON FUNCTION public.create_promise_with_sources TO service_role;


-- ---------------------------------------------------------------------------
-- 2. Atomic status update + history log
-- ---------------------------------------------------------------------------
-- Updates tracked_promises.status and inserts a promise_status_history row
-- in a single transaction. Returns the history entry as JSON.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_promise_status(
    p_promise_id UUID,
    p_new_status VARCHAR(30),
    p_reason TEXT,
    p_admin_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_old_status VARCHAR(30);
    v_history_id UUID;
    v_result JSONB;
BEGIN
    -- Lock the row to prevent concurrent status changes
    SELECT status INTO v_old_status
    FROM public.tracked_promises
    WHERE id = p_promise_id
    FOR UPDATE;

    IF v_old_status IS NULL THEN
        RAISE EXCEPTION 'Promise not found: %', p_promise_id;
    END IF;

    IF v_old_status = p_new_status THEN
        RAISE EXCEPTION 'Promise is already in status: %', p_new_status;
    END IF;

    UPDATE public.tracked_promises
    SET status = p_new_status
    WHERE id = p_promise_id;

    INSERT INTO public.promise_status_history
        (promise_id, previous_status, new_status, reason, changed_by_admin_id)
    VALUES
        (p_promise_id, v_old_status, p_new_status, p_reason, p_admin_id)
    RETURNING id INTO v_history_id;

    SELECT to_jsonb(psh.*) INTO v_result
    FROM public.promise_status_history psh
    WHERE psh.id = v_history_id;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution to service_role (backend admin client)
REVOKE ALL ON FUNCTION public.update_promise_status FROM PUBLIC;
REVOKE ALL ON FUNCTION public.update_promise_status FROM anon;
REVOKE ALL ON FUNCTION public.update_promise_status FROM authenticated;
GRANT EXECUTE ON FUNCTION public.update_promise_status TO service_role;

-- Reload schema cache
NOTIFY pgrst, 'reload schema';

-- <<< END OF 009_atomic_promise_rpc.sql <<<


-- >>> START OF 010_fix_cascade_delete_trigger.sql >>>
-- ==============================================================================
-- Migration 010: Fix Promise Source Retain Trigger for Cascade Deletion
-- ==============================================================================
-- The previous enforce_promise_retains_source() trigger blocked deleting
-- the last cited source even when the parent tracked_promises row was being
-- deleted via ON DELETE CASCADE.
--
-- This fix ensures the guard only fires if the parent promise row still exists.
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.enforce_promise_retains_source()
RETURNS TRIGGER AS $$
BEGIN
    -- Only enforce source retention if the parent promise still exists
    IF EXISTS (SELECT 1 FROM public.tracked_promises WHERE id = OLD.promise_id) THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.promise_sources WHERE promise_id = OLD.promise_id
        ) THEN
            RAISE EXCEPTION 'Cannot delete the last cited source for promise % -- every promise must retain at least one source', OLD.promise_id;
        END IF;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

NOTIFY pgrst, 'reload schema';

-- <<< END OF 010_fix_cascade_delete_trigger.sql <<<

-- >>> START OF 011_production_hardening_and_indexes.sql >>>
-- ==============================================================================
-- Migration 011: Production Hardening, Trigram Search Indexes,
-- Atomic Editorial Moderation & Takedown Resolution RPCs
-- ==============================================================================

-- 1. Enable pg_trgm for fast ILIKE and fuzzy text search if not enabled
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. GIN Trigram Indexes for Sub-Millisecond Search
CREATE INDEX IF NOT EXISTS idx_articles_title_trgm ON public.articles USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_official_name_trgm ON public.official_profiles USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_summaries_status_created ON public.article_summaries(status, created_at DESC);

-- 3. Atomic RPC: Publish AI Summary with Editorial Verification
CREATE OR REPLACE FUNCTION public.publish_article_summary(
    p_summary_id UUID,
    p_admin_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_article_id UUID;
    v_result JSONB;
BEGIN
    -- Update summary status to published
    UPDATE public.article_summaries
    SET status = 'published'
    WHERE id = p_summary_id
    RETURNING article_id INTO v_article_id;

    IF v_article_id IS NULL THEN
        RAISE EXCEPTION 'Summary not found: %', p_summary_id;
    END IF;

    -- Mark parent article as verified
    UPDATE public.articles
    SET verification_status = 'verified'
    WHERE id = v_article_id;

    -- Record in admin audit logs
    INSERT INTO public.admin_audit_logs (
        admin_user_id,
        action,
        target_entity,
        target_id,
        new_state
    ) VALUES (
        p_admin_id,
        'PUBLISH_SUMMARY',
        'article_summaries',
        p_summary_id,
        jsonb_build_object('status', 'published', 'article_id', v_article_id)
    );

    SELECT to_jsonb(s.*) INTO v_result
    FROM public.article_summaries s
    WHERE s.id = p_summary_id;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution to service_role
REVOKE ALL ON FUNCTION public.publish_article_summary FROM PUBLIC;
REVOKE ALL ON FUNCTION public.publish_article_summary FROM anon;
REVOKE ALL ON FUNCTION public.publish_article_summary FROM authenticated;
GRANT EXECUTE ON FUNCTION public.publish_article_summary TO service_role;


-- 4. Atomic RPC: Resolve Publisher Takedown Request
CREATE OR REPLACE FUNCTION public.resolve_takedown_request(
    p_takedown_id UUID,
    p_action VARCHAR(30), -- 'approved_removed' or 'rejected'
    p_notes TEXT,
    p_admin_id UUID
)
RETURNS JSONB AS $$
DECLARE
    v_url TEXT;
    v_result JSONB;
BEGIN
    IF p_action NOT IN ('approved_removed', 'rejected') THEN
        RAISE EXCEPTION 'Invalid resolution action: %', p_action;
    END IF;

    UPDATE public.takedown_requests
    SET status = p_action,
        resolution_notes = p_notes,
        resolved_at = NOW()
    WHERE id = p_takedown_id
    RETURNING article_url INTO v_url;

    IF v_url IS NULL THEN
        RAISE EXCEPTION 'Takedown request not found: %', p_takedown_id;
    END IF;

    -- If approved for removal, hide matching article summaries and mark article
    IF p_action = 'approved_removed' THEN
        UPDATE public.article_summaries
        SET status = 'hidden'
        WHERE article_id IN (SELECT id FROM public.articles WHERE url = v_url);
    END IF;

    -- Audit log
    INSERT INTO public.admin_audit_logs (
        admin_user_id,
        action,
        target_entity,
        target_id,
        new_state
    ) VALUES (
        p_admin_id,
        'RESOLVE_TAKEDOWN',
        'takedown_requests',
        p_takedown_id,
        jsonb_build_object('action', p_action, 'resolution_notes', p_notes, 'article_url', v_url)
    );

    SELECT to_jsonb(t.*) INTO v_result
    FROM public.takedown_requests t
    WHERE t.id = p_takedown_id;

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution to service_role
REVOKE ALL ON FUNCTION public.resolve_takedown_request FROM PUBLIC;
REVOKE ALL ON FUNCTION public.resolve_takedown_request FROM anon;
REVOKE ALL ON FUNCTION public.resolve_takedown_request FROM authenticated;
GRANT EXECUTE ON FUNCTION public.resolve_takedown_request TO service_role;

NOTIFY pgrst, 'reload schema';

-- <<< END OF 011_production_hardening_and_indexes.sql <<<

-- >>> START OF 012_corrections_and_retractions.sql >>>

ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS is_retracted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS correction_note TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS corrected_at TIMESTAMPTZ DEFAULT NULL;

-- Create atomic RPC function to apply correction or retraction with audit log
CREATE OR REPLACE FUNCTION public.submit_article_correction(
    p_article_id UUID,
    p_correction_note TEXT,
    p_is_retracted BOOLEAN,
    p_admin_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_article RECORD;
    v_result JSONB;
BEGIN
    -- 1. Check article exists
    SELECT * INTO v_article FROM public.articles WHERE id = p_article_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Article not found: %', p_article_id;
    END IF;

    -- 2. Update article
    UPDATE public.articles
    SET 
        correction_note = p_correction_note,
        is_retracted = p_is_retracted,
        corrected_at = NOW(),
        updated_at = NOW()
    WHERE id = p_article_id;

    -- 3. Log into audit logs
    INSERT INTO public.admin_audit_logs (
        admin_id,
        action,
        target_type,
        target_id,
        details
    ) VALUES (
        p_admin_id,
        CASE WHEN p_is_retracted THEN 'RETRACT_ARTICLE' ELSE 'CORRECT_ARTICLE' END,
        'articles',
        p_article_id,
        jsonb_build_object(
            'correction_note', p_correction_note,
            'is_retracted', p_is_retracted,
            'previous_title', v_article.title
        )
    );

    SELECT to_jsonb(a.*) INTO v_result
    FROM public.articles a
    WHERE a.id = p_article_id;

    RETURN v_result;
END;
$$;

-- Grant execution to service_role
REVOKE ALL ON FUNCTION public.submit_article_correction FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_article_correction FROM anon;
REVOKE ALL ON FUNCTION public.submit_article_correction FROM authenticated;
GRANT EXECUTE ON FUNCTION public.submit_article_correction TO service_role;

NOTIFY pgrst, 'reload schema';

-- <<< END OF 012_corrections_and_retractions.sql <<<



