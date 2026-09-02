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
