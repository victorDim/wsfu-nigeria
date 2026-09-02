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
