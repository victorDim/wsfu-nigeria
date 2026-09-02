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
