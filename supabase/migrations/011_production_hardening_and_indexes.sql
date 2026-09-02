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
