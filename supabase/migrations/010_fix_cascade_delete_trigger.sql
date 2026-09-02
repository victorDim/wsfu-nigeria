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
