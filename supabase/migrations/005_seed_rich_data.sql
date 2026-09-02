
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
