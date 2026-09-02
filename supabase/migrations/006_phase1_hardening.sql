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
