-- Auto-generated Nigeria Geography Seed (36 States + FCT + 774 LGAs)
DO $$
DECLARE
    v_state_id UUID;
BEGIN

    -- State: Abia (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Abia', 'AB', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aba North', 'abia-aba-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aba South', 'abia-aba-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Arochukwu', 'abia-arochukwu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bende', 'abia-bende')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikwuano', 'abia-ikwuano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isiala Ngwa North', 'abia-isiala-ngwa-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isiala Ngwa South', 'abia-isiala-ngwa-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isuikwuato', 'abia-isuikwuato')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obi Ngwa', 'abia-obi-ngwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohafia', 'abia-ohafia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Osisioma', 'abia-osisioma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ugwunagbo', 'abia-ugwunagbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukwa East', 'abia-ukwa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukwa West', 'abia-ukwa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Umuahia North', 'abia-umuahia-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Umuahia South', 'abia-umuahia-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Umu Nneochi', 'abia-umu-nneochi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Adamawa (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Adamawa', 'AD', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Demsa', 'adamawa-demsa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fufure', 'adamawa-fufure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ganye', 'adamawa-ganye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gayuk', 'adamawa-gayuk')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gombi', 'adamawa-gombi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Grie', 'adamawa-grie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Hong', 'adamawa-hong')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jada', 'adamawa-jada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lamurde', 'adamawa-lamurde')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Madagali', 'adamawa-madagali')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maiha', 'adamawa-maiha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mayo Belwa', 'adamawa-mayo-belwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Michika', 'adamawa-michika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mubi North', 'adamawa-mubi-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mubi South', 'adamawa-mubi-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Numan', 'adamawa-numan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shelleng', 'adamawa-shelleng')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Song', 'adamawa-song')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Toungo', 'adamawa-toungo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yola North', 'adamawa-yola-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yola South', 'adamawa-yola-south')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Akwa Ibom (31 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Akwa Ibom', 'AK', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abak', 'akwa-ibom-abak')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eastern Obolo', 'akwa-ibom-eastern-obolo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eket', 'akwa-ibom-eket')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esit Eket', 'akwa-ibom-esit-eket')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Essien Udim', 'akwa-ibom-essien-udim')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etim Ekpo', 'akwa-ibom-etim-ekpo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etinan', 'akwa-ibom-etinan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibeno', 'akwa-ibom-ibeno')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibesikpo Asutan', 'akwa-ibom-ibesikpo-asutan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibiono-Ibom', 'akwa-ibom-ibiono-ibom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ika', 'akwa-ibom-ika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikono', 'akwa-ibom-ikono')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikot Abasi', 'akwa-ibom-ikot-abasi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikot Ekpene', 'akwa-ibom-ikot-ekpene')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ini', 'akwa-ibom-ini')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Itu', 'akwa-ibom-itu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mbo', 'akwa-ibom-mbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mkpat-Enin', 'akwa-ibom-mkpat-enin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsit-Atai', 'akwa-ibom-nsit-atai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsit-Ibom', 'akwa-ibom-nsit-ibom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsit-Ubium', 'akwa-ibom-nsit-ubium')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obot Akara', 'akwa-ibom-obot-akara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okobo', 'akwa-ibom-okobo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onna', 'akwa-ibom-onna')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oron', 'akwa-ibom-oron')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oruk Anam', 'akwa-ibom-oruk-anam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udung-Uko', 'akwa-ibom-udung-uko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukanafun', 'akwa-ibom-ukanafun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uruan', 'akwa-ibom-uruan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Urue-Offong/Oruko', 'akwa-ibom-urue-offong-oruko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uyo', 'akwa-ibom-uyo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Anambra (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Anambra', 'AN', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aguata', 'anambra-aguata')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anambra East', 'anambra-anambra-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anambra West', 'anambra-anambra-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anaocha', 'anambra-anaocha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awka North', 'anambra-awka-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awka South', 'anambra-awka-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ayamelum', 'anambra-ayamelum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dunukofia', 'anambra-dunukofia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekwusigo', 'anambra-ekwusigo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idemili North', 'anambra-idemili-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idemili South', 'anambra-idemili-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ihiala', 'anambra-ihiala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Njikoka', 'anambra-njikoka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nnewi North', 'anambra-nnewi-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nnewi South', 'anambra-nnewi-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbaru', 'anambra-ogbaru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onitsha North', 'anambra-onitsha-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onitsha South', 'anambra-onitsha-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orumba North', 'anambra-orumba-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orumba South', 'anambra-orumba-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyi', 'anambra-oyi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Bauchi (20 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Bauchi', 'BA', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Alkaleri', 'bauchi-alkaleri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bauchi', 'bauchi-bauchi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bogoro', 'bauchi-bogoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Damban', 'bauchi-damban')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Darazo', 'bauchi-darazo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dass', 'bauchi-dass')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gamawa', 'bauchi-gamawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ganjuwa', 'bauchi-ganjuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Giade', 'bauchi-giade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Itas/Gadau', 'bauchi-itas-gadau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jama''are', 'bauchi-jamaare')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katagum', 'bauchi-katagum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kirfi', 'bauchi-kirfi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Misau', 'bauchi-misau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ningi', 'bauchi-ningi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shira', 'bauchi-shira')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tafawa Balewa', 'bauchi-tafawa-balewa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Toro', 'bauchi-toro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warji', 'bauchi-warji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zaki', 'bauchi-zaki')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Bayelsa (8 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Bayelsa', 'BY', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Brass', 'bayelsa-brass')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekeremor', 'bayelsa-ekeremor')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kolokuma/Opokuma', 'bayelsa-kolokuma-opokuma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nembe', 'bayelsa-nembe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbia', 'bayelsa-ogbia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sagbama', 'bayelsa-sagbama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Southern Ijaw', 'bayelsa-southern-ijaw')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yenagoa', 'bayelsa-yenagoa')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Benue (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Benue', 'BE', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agatu', 'benue-agatu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Apa', 'benue-apa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ado', 'benue-ado')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Buruku', 'benue-buruku')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gboko', 'benue-gboko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Guma', 'benue-guma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwer East', 'benue-gwer-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwer West', 'benue-gwer-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katsina-Ala', 'benue-katsina-ala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Konshisha', 'benue-konshisha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwande', 'benue-kwande')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Logo', 'benue-logo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Makurdi', 'benue-makurdi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obi', 'benue-obi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbadibo', 'benue-ogbadibo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohimini', 'benue-ohimini')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oju', 'benue-oju')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okpokwu', 'benue-okpokwu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oturkpo', 'benue-oturkpo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tarka', 'benue-tarka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukum', 'benue-ukum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ushongo', 'benue-ushongo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Vandeikya', 'benue-vandeikya')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Borno (27 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Borno', 'BO', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abadam', 'borno-abadam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Askira/Uba', 'borno-askira-uba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bama', 'borno-bama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bayo', 'borno-bayo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Biu', 'borno-biu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chibok', 'borno-chibok')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Damboa', 'borno-damboa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dikwa', 'borno-dikwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gubio', 'borno-gubio')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Guzamala', 'borno-guzamala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwoza', 'borno-gwoza')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Hawul', 'borno-hawul')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jere', 'borno-jere')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaga', 'borno-kaga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kala/Balge', 'borno-kala-balge')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Konduga', 'borno-konduga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kukawa', 'borno-kukawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwaya Kusar', 'borno-kwaya-kusar')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mafa', 'borno-mafa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Magumeri', 'borno-magumeri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maiduguri', 'borno-maiduguri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Marte', 'borno-marte')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mobbar', 'borno-mobbar')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Monguno', 'borno-monguno')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ngala', 'borno-ngala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nganzai', 'borno-nganzai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shani', 'borno-shani')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Cross River (18 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Cross River', 'CR', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abi', 'cross-river-abi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akamkpa', 'cross-river-akamkpa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akpabuyo', 'cross-river-akpabuyo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bakassi', 'cross-river-bakassi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bekwarra', 'cross-river-bekwarra')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Biase', 'cross-river-biase')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Boki', 'cross-river-boki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Calabar Municipal', 'cross-river-calabar-municipal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Calabar South', 'cross-river-calabar-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etung', 'cross-river-etung')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikom', 'cross-river-ikom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obanliku', 'cross-river-obanliku')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obubra', 'cross-river-obubra')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obudu', 'cross-river-obudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odukpani', 'cross-river-odukpani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogoja', 'cross-river-ogoja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yakuur', 'cross-river-yakuur')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yala', 'cross-river-yala')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Delta (25 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Delta', 'DE', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aniocha North', 'delta-aniocha-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aniocha South', 'delta-aniocha-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bomadi', 'delta-bomadi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Burutu', 'delta-burutu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ethiope East', 'delta-ethiope-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ethiope West', 'delta-ethiope-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ika North East', 'delta-ika-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ika South', 'delta-ika-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isoko North', 'delta-isoko-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isoko South', 'delta-isoko-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ndokwa East', 'delta-ndokwa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ndokwa West', 'delta-ndokwa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okpe', 'delta-okpe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oshimili North', 'delta-oshimili-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oshimili South', 'delta-oshimili-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Patani', 'delta-patani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sapele', 'delta-sapele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udu', 'delta-udu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ughelli North', 'delta-ughelli-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ughelli South', 'delta-ughelli-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ukwuani', 'delta-ukwuani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uvwie', 'delta-uvwie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warri North', 'delta-warri-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warri South', 'delta-warri-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warri South West', 'delta-warri-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ebonyi (13 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ebonyi', 'EB', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abakaliki', 'ebonyi-abakaliki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Afikpo North', 'ebonyi-afikpo-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Afikpo South', 'ebonyi-afikpo-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ebonyi', 'ebonyi-ebonyi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezza North', 'ebonyi-ezza-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezza South', 'ebonyi-ezza-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikwo', 'ebonyi-ikwo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ishielu', 'ebonyi-ishielu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ivo', 'ebonyi-ivo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Izzi', 'ebonyi-izzi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohaozara', 'ebonyi-ohaozara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohaukwu', 'ebonyi-ohaukwu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Onicha', 'ebonyi-onicha')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Edo (18 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Edo', 'ED', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko-Edo', 'edo-akoko-edo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egor', 'edo-egor')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan Central', 'edo-esan-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan North-East', 'edo-esan-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan South-East', 'edo-esan-south-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Esan West', 'edo-esan-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etsako Central', 'edo-etsako-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etsako East', 'edo-etsako-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etsako West', 'edo-etsako-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igueben', 'edo-igueben')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikpoba Okha', 'edo-ikpoba-okha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orhionmwon', 'edo-orhionmwon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oredo', 'edo-oredo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ovia North-East', 'edo-ovia-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ovia South-West', 'edo-ovia-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owan East', 'edo-owan-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owan West', 'edo-owan-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uhunmwonde', 'edo-uhunmwonde')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ekiti (15 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ekiti', 'EK', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ado Ekiti', 'ekiti-ado-ekiti')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Efon', 'ekiti-efon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti East', 'ekiti-ekiti-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti South-West', 'ekiti-ekiti-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti West', 'ekiti-ekiti-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Emure', 'ekiti-emure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gbonyin', 'ekiti-gbonyin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ido Osi', 'ekiti-ido-osi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijero', 'ekiti-ijero')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikole', 'ekiti-ikole')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilejemeje', 'ekiti-ilejemeje')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepodun/Ifelodun', 'ekiti-irepodun-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ise/Orun', 'ekiti-ise-orun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Moba', 'ekiti-moba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oye', 'ekiti-oye')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Enugu (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Enugu', 'EN', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aninri', 'enugu-aninri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awgu', 'enugu-awgu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Enugu East', 'enugu-enugu-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Enugu North', 'enugu-enugu-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Enugu South', 'enugu-enugu-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezeagu', 'enugu-ezeagu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igbo Etiti', 'enugu-igbo-etiti')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igbo Eze North', 'enugu-igbo-eze-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igbo Eze South', 'enugu-igbo-eze-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isi Uzo', 'enugu-isi-uzo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nkanu East', 'enugu-nkanu-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nkanu West', 'enugu-nkanu-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nsukka', 'enugu-nsukka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oji River', 'enugu-oji-river')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udenu', 'enugu-udenu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Udi', 'enugu-udi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Uzo Uwani', 'enugu-uzo-uwani')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Federal Capital Territory (6 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Federal Capital Territory', 'FC', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abaji', 'federal-capital-territory-abaji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bwari', 'federal-capital-territory-bwari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwagwalada', 'federal-capital-territory-gwagwalada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kuje', 'federal-capital-territory-kuje')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwali', 'federal-capital-territory-kwali')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Municipal Area Council', 'federal-capital-territory-municipal-area-council')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Gombe (11 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Gombe', 'GO', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akko', 'gombe-akko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Balanga', 'gombe-balanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Billiri', 'gombe-billiri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dukku', 'gombe-dukku')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Funakaye', 'gombe-funakaye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gombe', 'gombe-gombe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaltungo', 'gombe-kaltungo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kwami', 'gombe-kwami')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nafada', 'gombe-nafada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shongom', 'gombe-shongom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yamaltu/Deba', 'gombe-yamaltu-deba')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Imo (27 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Imo', 'IM', 'South East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aboh Mbaise', 'imo-aboh-mbaise')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ahiazu Mbaise', 'imo-ahiazu-mbaise')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ehime Mbano', 'imo-ehime-mbano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ezinihitte', 'imo-ezinihitte')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ideato North', 'imo-ideato-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ideato South', 'imo-ideato-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ihitte/Uboma', 'imo-ihitte-uboma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikeduru', 'imo-ikeduru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isiala Mbano', 'imo-isiala-mbano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isu', 'imo-isu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mbaitoli', 'imo-mbaitoli')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ngor Okpala', 'imo-ngor-okpala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Njaba', 'imo-njaba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nkwerre', 'imo-nkwerre')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nwangele', 'imo-nwangele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obowo', 'imo-obowo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oguta', 'imo-oguta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ohaji/Egbema', 'imo-ohaji-egbema')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okigwe', 'imo-okigwe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orlu', 'imo-orlu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orsu', 'imo-orsu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oru East', 'imo-oru-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oru West', 'imo-oru-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owerri Municipal', 'imo-owerri-municipal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owerri North', 'imo-owerri-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owerri West', 'imo-owerri-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Unuimo', 'imo-unuimo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Jigawa (27 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Jigawa', 'JI', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Auyo', 'jigawa-auyo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Babura', 'jigawa-babura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Biriniwa', 'jigawa-biriniwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Kudu', 'jigawa-birnin-kudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Buji', 'jigawa-buji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dutse', 'jigawa-dutse')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gagarawa', 'jigawa-gagarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Garki', 'jigawa-garki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gumel', 'jigawa-gumel')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Guri', 'jigawa-guri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwaram', 'jigawa-gwaram')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwiwa', 'jigawa-gwiwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Hadejia', 'jigawa-hadejia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jahun', 'jigawa-jahun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kafin Hausa', 'jigawa-kafin-hausa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kazaure', 'jigawa-kazaure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kiri Kasama', 'jigawa-kiri-kasama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kiyawa', 'jigawa-kiyawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaugama', 'jigawa-kaugama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maigatari', 'jigawa-maigatari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Malam Madori', 'jigawa-malam-madori')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Miga', 'jigawa-miga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ringim', 'jigawa-ringim')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Roni', 'jigawa-roni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sule Tankarkar', 'jigawa-sule-tankarkar')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Taura', 'jigawa-taura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yankwashi', 'jigawa-yankwashi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kaduna (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kaduna', 'KD', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Gwari', 'kaduna-birnin-gwari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chikun', 'kaduna-chikun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Giwa', 'kaduna-giwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igabi', 'kaduna-igabi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikara', 'kaduna-ikara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jaba', 'kaduna-jaba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jema''a', 'kaduna-jemaa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kachia', 'kaduna-kachia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaduna North', 'kaduna-kaduna-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaduna South', 'kaduna-kaduna-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kagarko', 'kaduna-kagarko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kajuru', 'kaduna-kajuru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaura', 'kaduna-kaura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kauru', 'kaduna-kauru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kubau', 'kaduna-kubau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kudan', 'kaduna-kudan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lere', 'kaduna-lere')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Makarfi', 'kaduna-makarfi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sabon Gari', 'kaduna-sabon-gari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sanga', 'kaduna-sanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Soba', 'kaduna-soba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zangon Kataf', 'kaduna-zangon-kataf')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zaria', 'kaduna-zaria')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kano (44 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kano', 'KN', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ajingi', 'kano-ajingi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Albasu', 'kano-albasu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bagwai', 'kano-bagwai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bebeji', 'kano-bebeji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bichi', 'kano-bichi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bunkure', 'kano-bunkure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dala', 'kano-dala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dambatta', 'kano-dambatta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dawakin Kudu', 'kano-dawakin-kudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dawakin Tofa', 'kano-dawakin-tofa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Doguwa', 'kano-doguwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fagge', 'kano-fagge')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gabasawa', 'kano-gabasawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Garko', 'kano-garko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Garun Mallam', 'kano-garun-mallam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gaya', 'kano-gaya')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gezawa', 'kano-gezawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwale', 'kano-gwale')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwarzo', 'kano-gwarzo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kabo', 'kano-kabo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kano Municipal', 'kano-kano-municipal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karaye', 'kano-karaye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kibiya', 'kano-kibiya')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kiru', 'kano-kiru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kumbotso', 'kano-kumbotso')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kunchi', 'kano-kunchi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kura', 'kano-kura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Madobi', 'kano-madobi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Makoda', 'kano-makoda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Minjibir', 'kano-minjibir')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nasarawa', 'kano-nasarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rano', 'kano-rano')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rimin Gado', 'kano-rimin-gado')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rogo', 'kano-rogo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shanono', 'kano-shanono')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sumaila', 'kano-sumaila')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Takai', 'kano-takai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tarauni', 'kano-tarauni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tofa', 'kano-tofa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tsanyawa', 'kano-tsanyawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tudun Wada', 'kano-tudun-wada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ungogo', 'kano-ungogo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Warawa', 'kano-warawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wudil', 'kano-wudil')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Katsina (33 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Katsina', 'KT', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bakori', 'katsina-bakori')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Batagarawa', 'katsina-batagarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Batsari', 'katsina-batsari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Baure', 'katsina-baure')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bindawa', 'katsina-bindawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Charanchi', 'katsina-charanchi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dandume', 'katsina-dandume')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Danja', 'katsina-danja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dan Musa', 'katsina-dan-musa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Daura', 'katsina-daura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dutsin Ma', 'katsina-dutsin-ma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Faskari', 'katsina-faskari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Funtua', 'katsina-funtua')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ingawa', 'katsina-ingawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jibia', 'katsina-jibia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kafur', 'katsina-kafur')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaita', 'katsina-kaita')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kankara', 'katsina-kankara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kankia', 'katsina-kankia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katsina', 'katsina-katsina')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kurfi', 'katsina-kurfi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kusada', 'katsina-kusada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mai''Adua', 'katsina-maiadua')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Malumfashi', 'katsina-malumfashi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mani', 'katsina-mani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mashi', 'katsina-mashi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Matazu', 'katsina-matazu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Musawa', 'katsina-musawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rimi', 'katsina-rimi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sabuwa', 'katsina-sabuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Safana', 'katsina-safana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sandamu', 'katsina-sandamu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zango', 'katsina-zango')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kebbi (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kebbi', 'KB', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aleiro', 'kebbi-aleiro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Arewa Dandi', 'kebbi-arewa-dandi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Argungu', 'kebbi-argungu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Augie', 'kebbi-augie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bagudo', 'kebbi-bagudo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Kebbi', 'kebbi-birnin-kebbi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bunza', 'kebbi-bunza')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dandi', 'kebbi-dandi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fakai', 'kebbi-fakai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gwandu', 'kebbi-gwandu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jega', 'kebbi-jega')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kalgo', 'kebbi-kalgo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Koko/Besse', 'kebbi-koko-besse')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maiyama', 'kebbi-maiyama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ngaski', 'kebbi-ngaski')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sakaba', 'kebbi-sakaba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shanga', 'kebbi-shanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Suru', 'kebbi-suru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Danko-Wasagu', 'kebbi-danko-wasagu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yauri', 'kebbi-yauri')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zuru', 'kebbi-zuru')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kogi (21 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kogi', 'KO', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Adavi', 'kogi-adavi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ajaokuta', 'kogi-ajaokuta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ankpa', 'kogi-ankpa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bassa', 'kogi-bassa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dekina', 'kogi-dekina')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibaji', 'kogi-ibaji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idah', 'kogi-idah')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Igalamela Odolu', 'kogi-igalamela-odolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijumu', 'kogi-ijumu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kabba/Bunu', 'kogi-kabba-bunu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kogi', 'kogi-kogi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lokoja', 'kogi-lokoja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mopa Muro', 'kogi-mopa-muro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ofu', 'kogi-ofu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogori/Magongo', 'kogi-ogori-magongo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okehi', 'kogi-okehi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okene', 'kogi-okene')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Olamaboro', 'kogi-olamaboro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Omala', 'kogi-omala')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yagba East', 'kogi-yagba-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yagba West', 'kogi-yagba-west')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Kwara (16 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Kwara', 'KW', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Asa', 'kwara-asa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Baruten', 'kwara-baruten')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Edu', 'kwara-edu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ekiti', 'kwara-ekiti')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifelodun', 'kwara-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilorin East', 'kwara-ilorin-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilorin South', 'kwara-ilorin-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilorin West', 'kwara-ilorin-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepodun', 'kwara-irepodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isin', 'kwara-isin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaiama', 'kwara-kaiama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Moro', 'kwara-moro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Offa', 'kwara-offa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oke Ero', 'kwara-oke-ero')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyun', 'kwara-oyun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Pategi', 'kwara-pategi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Lagos (20 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Lagos', 'LA', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agege', 'lagos-agege')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ajeromi-Ifelodun', 'lagos-ajeromi-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Alimosho', 'lagos-alimosho')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Amuwo-Odofin', 'lagos-amuwo-odofin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Apapa', 'lagos-apapa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Badagry', 'lagos-badagry')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Epe', 'lagos-epe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eti Osa', 'lagos-eti-osa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibeju-Lekki', 'lagos-ibeju-lekki')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifako-Ijaiye', 'lagos-ifako-ijaiye')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikeja', 'lagos-ikeja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikorodu', 'lagos-ikorodu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kosofe', 'lagos-kosofe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lagos Island', 'lagos-lagos-island')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lagos Mainland', 'lagos-lagos-mainland')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mushin', 'lagos-mushin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ojo', 'lagos-ojo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oshodi-Isolo', 'lagos-oshodi-isolo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shomolu', 'lagos-shomolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Surulere', 'lagos-surulere')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Nasarawa (13 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Nasarawa', 'NA', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akwanga', 'nasarawa-akwanga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Awe', 'nasarawa-awe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Doma', 'nasarawa-doma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karu', 'nasarawa-karu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Keana', 'nasarawa-keana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Keffi', 'nasarawa-keffi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kokona', 'nasarawa-kokona')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lafia', 'nasarawa-lafia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nasarawa', 'nasarawa-nasarawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nasarawa Egon', 'nasarawa-nasarawa-egon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obi', 'nasarawa-obi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Toto', 'nasarawa-toto')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wamba', 'nasarawa-wamba')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Niger (25 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Niger', 'NI', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agaie', 'niger-agaie')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Agwara', 'niger-agwara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bida', 'niger-bida')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Borgu', 'niger-borgu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bosso', 'niger-bosso')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chanchaga', 'niger-chanchaga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Edati', 'niger-edati')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gbako', 'niger-gbako')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gurara', 'niger-gurara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Katcha', 'niger-katcha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kontagora', 'niger-kontagora')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lapai', 'niger-lapai')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lavun', 'niger-lavun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Magama', 'niger-magama')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mariga', 'niger-mariga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mashegu', 'niger-mashegu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mokwa', 'niger-mokwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Moya', 'niger-moya')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Paikoro', 'niger-paikoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rafi', 'niger-rafi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rijau', 'niger-rijau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shiroro', 'niger-shiroro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Suleja', 'niger-suleja')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tafa', 'niger-tafa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wushishi', 'niger-wushishi')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ogun (20 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ogun', 'OG', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abeokuta North', 'ogun-abeokuta-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abeokuta South', 'ogun-abeokuta-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ado-Odo/Ota', 'ogun-ado-odo-ota')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbado North', 'ogun-egbado-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbado South', 'ogun-egbado-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ewekoro', 'ogun-ewekoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifo', 'ogun-ifo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu East', 'ogun-ijebu-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu North', 'ogun-ijebu-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu North East', 'ogun-ijebu-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ijebu Ode', 'ogun-ijebu-ode')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikenne', 'ogun-ikenne')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Imeko Afon', 'ogun-imeko-afon')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ipokia', 'ogun-ipokia')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obafemi Owode', 'ogun-obafemi-owode')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odeda', 'ogun-odeda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odogbolu', 'ogun-odogbolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogun Waterside', 'ogun-ogun-waterside')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Remo North', 'ogun-remo-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shagamu', 'ogun-shagamu')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Ondo (18 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Ondo', 'ON', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko North-East', 'ondo-akoko-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko North-West', 'ondo-akoko-north-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko South-East', 'ondo-akoko-south-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akoko South-West', 'ondo-akoko-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akure North', 'ondo-akure-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akure South', 'ondo-akure-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ese Odo', 'ondo-ese-odo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Idanre', 'ondo-idanre')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifedore', 'ondo-ifedore')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilaje', 'ondo-ilaje')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ile Oluji/Okeigbo', 'ondo-ile-oluji-okeigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irele', 'ondo-irele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odigbo', 'ondo-odigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okitipupa', 'ondo-okitipupa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ondo East', 'ondo-ondo-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ondo West', 'ondo-ondo-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ose', 'ondo-ose')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Owo', 'ondo-owo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Osun (30 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Osun', 'OS', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atakunmosa East', 'osun-atakunmosa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atakunmosa West', 'osun-atakunmosa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aiyedaade', 'osun-aiyedaade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Aiyedire', 'osun-aiyedire')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Boluwaduro', 'osun-boluwaduro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Boripe', 'osun-boripe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ede North', 'osun-ede-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ede South', 'osun-ede-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife Central', 'osun-ife-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife East', 'osun-ife-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife North', 'osun-ife-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ife South', 'osun-ife-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbedore', 'osun-egbedore')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ejigbo', 'osun-ejigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifedayo', 'osun-ifedayo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ifelodun', 'osun-ifelodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ila', 'osun-ila')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilesa East', 'osun-ilesa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ilesa West', 'osun-ilesa-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepodun', 'osun-irepodun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irewole', 'osun-irewole')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isokan', 'osun-isokan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Iwo', 'osun-iwo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obokun', 'osun-obokun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Odo Otin', 'osun-odo-otin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ola Oluwa', 'osun-ola-oluwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Olorunda', 'osun-olorunda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oriade', 'osun-oriade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orolu', 'osun-orolu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Osogbo', 'osun-osogbo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Oyo (33 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Oyo', 'OY', 'South West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Afijio', 'oyo-afijio')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akinyele', 'oyo-akinyele')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atiba', 'oyo-atiba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Atisbo', 'oyo-atisbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Egbeda', 'oyo-egbeda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan North', 'oyo-ibadan-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan North-East', 'oyo-ibadan-north-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan North-West', 'oyo-ibadan-north-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan South-East', 'oyo-ibadan-south-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibadan South-West', 'oyo-ibadan-south-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibarapa Central', 'oyo-ibarapa-central')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibarapa East', 'oyo-ibarapa-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibarapa North', 'oyo-ibarapa-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ido', 'oyo-ido')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Irepo', 'oyo-irepo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Iseyin', 'oyo-iseyin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Itesiwaju', 'oyo-itesiwaju')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Iwajowa', 'oyo-iwajowa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kajola', 'oyo-kajola')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lagelu', 'oyo-lagelu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbomosho North', 'oyo-ogbomosho-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogbomosho South', 'oyo-ogbomosho-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogo Oluwa', 'oyo-ogo-oluwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Olorunsogo', 'oyo-olorunsogo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oluyole', 'oyo-oluyole')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ona Ara', 'oyo-ona-ara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Orelope', 'oyo-orelope')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ori Ire', 'oyo-ori-ire')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyo East', 'oyo-oyo-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyo West', 'oyo-oyo-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Saki East', 'oyo-saki-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Saki West', 'oyo-saki-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Surulere', 'oyo-surulere')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Plateau (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Plateau', 'PL', 'North Central')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Barkin Ladi', 'plateau-barkin-ladi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bassa', 'plateau-bassa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bokkos', 'plateau-bokkos')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jos East', 'plateau-jos-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jos North', 'plateau-jos-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jos South', 'plateau-jos-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kanam', 'plateau-kanam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kanke', 'plateau-kanke')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Langtang North', 'plateau-langtang-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Langtang South', 'plateau-langtang-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mangu', 'plateau-mangu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Mikang', 'plateau-mikang')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Pankshin', 'plateau-pankshin')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Qua''an Pan', 'plateau-quaan-pan')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Riyom', 'plateau-riyom')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shendam', 'plateau-shendam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wase', 'plateau-wase')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Rivers (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Rivers', 'RV', 'South South')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Abua/Odual', 'rivers-abua-odual')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ahoada East', 'rivers-ahoada-east')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ahoada West', 'rivers-ahoada-west')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Akuku-Toru', 'rivers-akuku-toru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Andoni', 'rivers-andoni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Asari-Toru', 'rivers-asari-toru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bonny', 'rivers-bonny')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Degema', 'rivers-degema')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Eleme', 'rivers-eleme')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Emuoha', 'rivers-emuoha')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Etche', 'rivers-etche')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gokana', 'rivers-gokana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ikwerre', 'rivers-ikwerre')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Khana', 'rivers-khana')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Obio/Akpor', 'rivers-obio-akpor')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogba/Egbema/Ndoni', 'rivers-ogba-egbema-ndoni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ogu/Bolo', 'rivers-ogu-bolo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Okrika', 'rivers-okrika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Omuma', 'rivers-omuma')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Opobo/Nkoro', 'rivers-opobo-nkoro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Oyigbo', 'rivers-oyigbo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Port Harcourt', 'rivers-port-harcourt')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tai', 'rivers-tai')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Sokoto (23 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Sokoto', 'SO', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Binji', 'sokoto-binji')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bodinga', 'sokoto-bodinga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Dange Shuni', 'sokoto-dange-shuni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gada', 'sokoto-gada')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Goronyo', 'sokoto-goronyo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gudu', 'sokoto-gudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gawabawa', 'sokoto-gawabawa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Illela', 'sokoto-illela')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Isa', 'sokoto-isa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kebbe', 'sokoto-kebbe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kware', 'sokoto-kware')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Rabah', 'sokoto-rabah')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sabon Birni', 'sokoto-sabon-birni')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shagari', 'sokoto-shagari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Silame', 'sokoto-silame')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sokoto North', 'sokoto-sokoto-north')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sokoto South', 'sokoto-sokoto-south')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tambuwal', 'sokoto-tambuwal')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tangaza', 'sokoto-tangaza')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tureta', 'sokoto-tureta')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wamako', 'sokoto-wamako')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wurno', 'sokoto-wurno')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yabo', 'sokoto-yabo')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Taraba (16 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Taraba', 'TR', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ardo Kola', 'taraba-ardo-kola')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bali', 'taraba-bali')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Donga', 'taraba-donga')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gashaka', 'taraba-gashaka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gassol', 'taraba-gassol')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ibi', 'taraba-ibi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jalingo', 'taraba-jalingo')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karim Lamido', 'taraba-karim-lamido')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kurmi', 'taraba-kurmi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Lau', 'taraba-lau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Sardauna', 'taraba-sardauna')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Takum', 'taraba-takum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Ussa', 'taraba-ussa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Wukari', 'taraba-wukari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yorro', 'taraba-yorro')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zing', 'taraba-zing')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Yobe (17 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Yobe', 'YO', 'North East')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bade', 'yobe-bade')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bursari', 'yobe-bursari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Damaturu', 'yobe-damaturu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fika', 'yobe-fika')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Fune', 'yobe-fune')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Geidam', 'yobe-geidam')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gujba', 'yobe-gujba')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gulani', 'yobe-gulani')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Jakusko', 'yobe-jakusko')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Karasuwa', 'yobe-karasuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Machina', 'yobe-machina')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nangere', 'yobe-nangere')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Nguru', 'yobe-nguru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Potiskum', 'yobe-potiskum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Tarmuwa', 'yobe-tarmuwa')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yunusari', 'yobe-yunusari')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Yusufari', 'yobe-yusufari')
    ON CONFLICT (state_id, name) DO NOTHING;

    -- State: Zamfara (14 LGAs)
    INSERT INTO public.states (name, code, geopolitical_zone)
    VALUES ('Zamfara', 'ZM', 'North West')
    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone
    RETURNING id INTO v_state_id;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Anka', 'zamfara-anka')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bakura', 'zamfara-bakura')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Birnin Magaji/Kiyaw', 'zamfara-birnin-magaji-kiyaw')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bukkuyum', 'zamfara-bukkuyum')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Bungudu', 'zamfara-bungudu')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gummi', 'zamfara-gummi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Gusau', 'zamfara-gusau')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Kaura Namoda', 'zamfara-kaura-namoda')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maradun', 'zamfara-maradun')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Maru', 'zamfara-maru')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Shinkafi', 'zamfara-shinkafi')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Talata Mafara', 'zamfara-talata-mafara')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Chafe', 'zamfara-chafe')
    ON CONFLICT (state_id, name) DO NOTHING;
    INSERT INTO public.lgas (state_id, name, slug)
    VALUES (v_state_id, 'Zurmi', 'zamfara-zurmi')
    ON CONFLICT (state_id, name) DO NOTHING;
END $$;