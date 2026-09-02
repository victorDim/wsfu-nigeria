-- Migration 012: Corrections and Retractions Data Layer
-- Enforces visible accountability for article corrections and retractions with immutable audit logging

ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS is_retracted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS correction_note TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS corrected_at TIMESTAMPTZ DEFAULT NULL;

-- Create atomic RPC function to apply correction or retraction with audit log
CREATE OR REPLACE FUNCTION submit_article_correction(
    p_article_id UUID,
    p_correction_note TEXT,
    p_is_retracted BOOLEAN,
    p_admin_email TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_article RECORD;
BEGIN
    -- 1. Check article exists
    SELECT * INTO v_article FROM articles WHERE id = p_article_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Article not found: %', p_article_id;
    END IF;

    -- 2. Update article
    UPDATE articles
    SET 
        correction_note = p_correction_note,
        is_retracted = p_is_retracted,
        corrected_at = NOW(),
        updated_at = NOW()
    WHERE id = p_article_id;

    -- 3. Log into audit logs
    INSERT INTO audit_logs (
        action,
        target_entity,
        target_id,
        performed_by,
        details
    ) VALUES (
        CASE WHEN p_is_retracted THEN 'article_retracted' ELSE 'article_corrected' END,
        'articles',
        p_article_id,
        p_admin_email,
        jsonb_build_object(
            'correction_note', p_correction_note,
            'is_retracted', p_is_retracted,
            'previous_title', v_article.title
        )
    );

    RETURN jsonb_build_object(
        'success', true,
        'article_id', p_article_id,
        'is_retracted', p_is_retracted,
        'correction_note', p_correction_note,
        'corrected_at', NOW()
    );
END;
$$;
