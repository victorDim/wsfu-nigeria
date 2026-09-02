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
