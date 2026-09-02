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
