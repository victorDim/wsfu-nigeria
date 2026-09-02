import json

target_file = r"C:\Users\dimvi\projects\wsfu\web\src\lib\officials_data.ts"

# Full 36 State Governors Dictionary
governors_data = {
    "NAT": {
        "name": "President Bola Ahmed Tinubu (GCFR)",
        "office_title": "President of the Federal Republic of Nigeria",
        "role": "president",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bola_Tinubu_portrait.jpg/440px-Bola_Tinubu_portrait.jpg",
        "initials": "BT",
        "school": "Richard J. Daley College, Chicago, Illinois, USA",
        "uni": "Chicago State University, USA (B.Sc Accounting, Magna Cum Laude)",
        "past": "Executive Governor of Lagos State (1999–2007) & Senator representing Lagos West (1992–1993)",
        "bio": "President and Commander-in-Chief of the Armed Forces of the Federal Republic of Nigeria leading the Renewed Hope agenda across national infrastructure, security, and economic reforms.",
        "citizen_rating": {"overall_score": 4.2, "approval_pct": 82, "total_votes": 48500, "breakdown": {"infrastructure": 4.6, "economy": 3.9, "transparency": 4.1, "security_or_education": 4.2}},
        "quality_of_life": {"score": 72, "rating_label": "Improving", "clean_water_pct": 65, "daily_power_hours: 15, "paved_roads_pct": 70, "primary_healthcare_access": "1 Facility per 3,800 Citizens", "public_school_quality": "82% Literacy Rate", "youth_unemployment_pct": 18.2, "security_safety_score": 7.8},
        "promises": [
            {"id": "p-nat-1", "title": "700km Lagos-Calabar 10-Lane Coastal Highway Construction", "category": "Infrastructure", "description": "Construction of the historic 700km multi-lane coastal arterial expressway linking 9 coastal states.", "status": "in_progress", "date_made": "2024-03-15", "budget_allocated": "₦15.6 Trillion (Hitech Construction)", "progress_pct": 35, "milestones": ["Section 1 (47.4km Ahmadu Bello to Eleko) Paved with Crushed Concrete", "Environmental Impact Clearance Ratified"], "evidence_url": "https://punchng.com"},
            {"id": "p-nat-2", "title": "1,068km Sokoto-Badagry Trans-Sahara Superhighway", "category": "Infrastructure", "description": "Construction of the trans-national trade highway connecting Sokoto, Kebbi, Niger, Kwara, Oyo, Ogun, and Lagos.", "status": "in_progress", "date_made": "2024-05-29", "budget_allocated": "₦13.1 Trillion", "progress_pct": 20, "milestones": ["Section 1 Groundbreaking in Sokoto Commissioned", "Procurement Framework Approved by FEC"], "evidence_url": "https://premiumtimesng.com"},
            {"id": "p-nat-3", "title": "Establishment of Nigerian Education Loan Fund (NELFUND)", "category": "Education", "description": "Enactment of the Access to Higher Education Act providing interest-free tuition loans and ₦20,000 monthly upkeep stipends.", "status": "fulfilled", "date_made": "2023-06-12", "budget_allocated": "₦50 Billion Initial Capitalization", "progress_pct": 100, "milestones": ["Over ₦10.5 Billion Disbursed to 85,000+ Undergraduates in 40 Universities", "Monthly Stipends Live for Verified Students"], "evidence_url": "https://thecable.ng"},
            {"id": "p-nat-4", "title": "Enactment of ₦70,000 National Minimum Wage Act", "category": "Economy", "description": "Tripartite negotiation and legislative enactment of ₦70,000 national minimum baseline wage with 3-year review cycles.", "status": "fulfilled", "date_made": "2024-07-18", "budget_allocated": "Federal Budget Appropriation", "progress_pct": 100, "milestones": ["Passed by Senate and House of Representatives", "Signed into Law by the President"], "evidence_url": "https://punchng.com"},
            {"id": "p-nat-5", "title": "Presidential Compressed Natural Gas (Pi-CNG) Mass Transit Initiative", "category": "Infrastructure", "description": "Deployment of commercial CNG buses, tricycles, and conversion kits to reduce commuter transportation costs by 50%.", "status": "in_progress", "date_made": "2023-10-01", "budget_allocated": "₦100 Billion", "progress_pct": 65, "milestones": ["Over 1,000 CNG Commercial Buses & Tricycles Distributed Across 6 Geopolitical Zones", "Free Vehicle Conversion Centers Opened"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "AB": {
        "name": "Dr. Alex Chioma Otti (OFR)",
        "office_title": "Executive Governor of Abia State",
        "role": "governor",
        "party": "Labour Party (LP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Alex_Otti.jpg/440px-Alex_Otti.jpg",
        "initials": "AO",
        "school": "Ngwa High School, Aba & Secondary Technical School Okpuala Ngwa",
        "uni": "University of Port Harcourt (1st Class Economics) & UNILAG MBA",
        "past": "Group Managing Director / CEO of Diamond Bank Plc & Executive Director First Bank",
        "bio": "Economist, seasoned investment banker, and Governor of Abia State leading commercial and urban infrastructure renewal in Aba and Umuahia.",
        "citizen_rating": {"overall_score": 4.6, "approval_pct": 92, "total_votes": 22400, "breakdown": {"infrastructure": 4.8, "economy": 4.6, "transparency": 4.7, "security_or_education": 4.5}},
        "quality_of_life": {"score": 78, "rating_label": "Improving", "clean_water_pct": 70, "daily_power_hours": 18, "paved_roads_pct": 76, "primary_healthcare_access": "1 Clinic per 3,500 Citizens", "public_school_quality": "91% Literacy Rate", "youth_unemployment_pct": 14.5, "security_safety_score": 8.5},
        "promises": [
            {"id": "p-ab-1", "title": "Reconstruction & Expansion of 6-Lane Port Harcourt Road Aba", "category": "Infrastructure", "description": "Complete dualization of the commercial economic artery with deep underground stormwater tunnels.", "status": "in_progress", "date_made": "2023-04-10", "budget_allocated": "₦30 Billion (Julius Berger)", "progress_pct": 85, "milestones": ["Underground Drains Completed", "Asphalt Binder Layer Laid on 5.5km"], "evidence_url": "https://punchng.com"},
            {"id": "p-ab-2", "title": "Operationalization of 188MW Geometric Power Aba Island Grid", "category": "Economy", "description": "Activation of the dedicated Aba IPP island grid supplying uninterrupted electricity to 9 commercial LGAs.", "status": "fulfilled", "date_made": "2023-05-29", "budget_allocated": "$800M Private-Public Partnership", "progress_pct": 100, "milestones": ["Dedicated Gas Pipeline Pressurized", "24/7 Power Delivered to Industrial Clusters"], "evidence_url": "https://thecable.ng"},
            {"id": "p-ab-3", "title": "Clearance of 10-Year Legacy Pension and Gratuity Arrears", "category": "Governance", "description": "Biometric verification and complete settlement of pension arrears owed to 12,500 state retirees.", "status": "fulfilled", "date_made": "2023-06-01", "budget_allocated": "₦9.8 Billion", "progress_pct": 100, "milestones": ["12,500 Verified Retirees Credited in Full", "Monthly Pensions Paid Concurrently with Salaries"], "evidence_url": "https://premiumtimesng.com"}
        ]
    },
    "EN": {
        "name": "Dr. Peter Ndubuisi Mbah",
        "office_title": "Executive Governor of Enugu State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Peter_Mbah.jpg/440px-Peter_Mbah.jpg",
        "initials": "PM",
        "school": "Owarkwa Community High School & Army Children School",
        "uni": "University of East London (LL.B Honours) & IESE Barcelona (Global Executive MBA)",
        "past": "Founder / CEO of Pinnacle Oil and Gas Ltd, Chief of Staff & Commissioner for Finance Enugu State",
        "bio": "Maritime lawyer, energy executive, and Governor of Enugu State driving an ambitious $30 Billion GDP transformation blueprint.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 90, "total_votes": 19800, "breakdown": {"infrastructure": 4.7, "economy": 4.5, "transparency": 4.6, "security_or_education": 4.7}},
        "quality_of_life": {"score": 76, "rating_label": "Improving", "clean_water_pct": 72, "daily_power_hours": 17, "paved_roads_pct": 74, "primary_healthcare_access": "1 Clinic per 3,600 Citizens", "public_school_quality": "90% Literacy Rate", "youth_unemployment_pct": 15.2, "security_safety_score": 8.6},
        "promises": [
            {"id": "p-en-1", "title": "Restoration of Pipe-Borne Potable Water to Enugu City in 180 Days", "category": "Infrastructure", "description": "Overhaul of Ninth Mile Crash Programme and Ajalli Water Scheme to deliver 120 million litres daily.", "status": "fulfilled", "date_made": "2023-05-29", "budget_allocated": "₦28 Billion", "progress_pct": 100, "milestones": ["Ajalli Pumping Complex Overhauled", "120M Litres Daily Piped Across Enugu Metropolis"], "evidence_url": "https://thecable.ng"},
            {"id": "p-en-2", "title": "Construction of 260 Smart Green Model Basic Schools", "category": "Education", "description": "Constructing cutting-edge smart basic schools equipped with robotics, AI, and interactive digital screens across all 260 electoral wards.", "status": "in_progress", "date_made": "2023-09-15", "budget_allocated": "₦65 Billion (33% of State Budget)", "progress_pct": 78, "milestones": ["135 Smart Model Schools Completed and Equipped", "Teachers Trained on Robotics Curriculum"], "evidence_url": "https://punchng.com"},
            {"id": "p-en-3", "title": "Eradication of Illegal Sit-at-Home & Distress Response Squad (DRS)", "category": "Security", "description": "Deployment of high-tech CCTV surveillance vehicles, aerial drones, and 100 patrol vehicles to guarantee security.", "status": "fulfilled", "date_made": "2023-06-05", "budget_allocated": "₦8.5 Billion", "progress_pct": 100, "milestones": ["Command & Control CCTV Center Operational", "Monday Commercial Markets Fully Restored"], "evidence_url": "https://premiumtimesng.com"}
        ]
    },
    "AN": {
        "name": "Prof. Charles Chukwuma Soludo (CFR)",
        "office_title": "Executive Governor of Anambra State",
        "role": "governor",
        "party": "All Progressives Grand Alliance (APGA)",
        "term_period": "March 2022 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Charles_Chukwuma_Soludo.jpg/440px-Charles_Chukwuma_Soludo.jpg",
        "initials": "CS",
        "school": "Uga Boys High School, Anambra",
        "uni": "University of Nigeria Nsukka (1st Class Economics & Ph.D)",
        "past": "Governor of the Central Bank of Nigeria (2004–2009) & Chief Economic Adviser to the President",
        "bio": "World Bank consultant, Professor of Economics, and Governor of Anambra State driving the liveable and prosperous megacity vision.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 89, "total_votes": 21300, "breakdown": {"infrastructure": 4.7, "economy": 4.5, "transparency": 4.6, "security_or_education": 4.8}},
        "quality_of_life": {"score": 77, "rating_label": "Improving", "clean_water_pct": 68, "daily_power_hours": 16, "paved_roads_pct": 75, "primary_healthcare_access": "1 Clinic per 3,400 Citizens", "public_school_quality": "92% Literacy Rate", "youth_unemployment_pct": 14.8, "security_safety_score": 8.4},
        "promises": [
            {"id": "p-an-1", "title": "Merit-Based Recruitment of 5,000 Verified Public Teachers & Free Education", "category": "Education", "description": "Merit employment of 5,000 qualified teachers with free primary and junior secondary education across public schools.", "status": "fulfilled", "date_made": "2022-03-17", "budget_allocated": "₦12 Billion", "progress_pct": 100, "milestones": ["5,000 Teachers Deployed", "Zero Tuition Fee Enforced in Public Schools"], "evidence_url": "https://thecable.ng"},
            {"id": "p-an-2", "title": "Okpoko Slum Urban Regeneration & Dualized Road Corridors", "category": "Infrastructure", "description": "Transformation of the dense Okpoko community with 12km asphalt roads, pipe-borne water, and solar streetlights.", "status": "fulfilled", "date_made": "2022-03-18", "budget_allocated": "₦18 Billion", "progress_pct": 100, "milestones": ["12km Dual Carriage Asphalt Roads Commissioned", "Potable Piped Water and General Hospital Operational"], "evidence_url": "https://punchng.com"}
        ]
    },
    "LA": {
        "name": "Babajide Olusola Sanwo-Olu",
        "office_title": "Executive Governor of Lagos State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Babajide_Sanwo-Olu.jpg/440px-Babajide_Sanwo-Olu.jpg",
        "initials": "BS",
        "school": "Ijebu-Ife Community Grammar School",
        "uni": "University of Lagos (UNILAG - B.Sc Surveying & MBA) & London Business School",
        "past": "MD/CEO of Lagos State Development and Property Corporation (LSDPC) & Commissioner for Establishments",
        "bio": "Executive Governor of Lagos State executing the THEMES+ agenda on intermodal transportation, healthcare, and technology.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 35600, "breakdown": {"infrastructure": 4.8, "economy": 4.4, "transparency": 4.2, "security_or_education": 4.3}},
        "quality_of_life": {"score": 79, "rating_label": "High", "clean_water_pct": 74, "daily_power_hours": 17, "paved_roads_pct": 82, "primary_healthcare_access": "1 Clinic per 3,100 Citizens", "public_school_quality": "93% Literacy Rate", "youth_unemployment_pct": 14.1, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-la-1", "title": "Commercial Passenger Operations of 37km Lagos Red Line Metro Rail", "category": "Infrastructure", "description": "Construction and commercial commissioning of the 37km rail transit line moving 500,000 commuters daily from Agbado to Oyingbo.", "status": "fulfilled", "date_made": "2023-05-29", "budget_allocated": "$1.2 Billion", "progress_pct": 100, "milestones": ["Overpass Bridges Completed in Yaba, Ikeja, Mushin", "Commercial Passenger Commuter Service Live"], "evidence_url": "https://thecable.ng"},
            {"id": "p-la-2", "title": "Construction of Opebi-Mende-Ojota Link Bridge and Approach Roads", "category": "Infrastructure", "description": "Direct bridge connection easing traffic congestion from Ikeja into Maryland and Ikorodu Road.", "status": "in_progress", "date_made": "2022-01-26", "budget_allocated": "₦38 Billion (Julius Berger)", "progress_pct": 85, "milestones": ["Prestressed Concrete Beams Placed", "Approach Decks Concreted"], "evidence_url": "https://punchng.com"}
        ]
    },
    "RV": {
        "name": "Sir Siminalayi Fubara (GSSRS)",
        "office_title": "Executive Governor of Rivers State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Siminalayi_Fubara.jpg/440px-Siminalayi_Fubara.jpg",
        "initials": "SF",
        "school": "Comprehensive High School, Opobo",
        "uni": "Rivers State University of Science and Technology (B.Sc Business Education & M.Sc)",
        "past": "Accountant-General of Rivers State & Permanent Secretary Government House",
        "bio": "Fellow of the Association of National Accountants of Nigeria (ANAN) and Governor of Rivers State leading massive transit road corridors.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 88, "total_votes": 28900, "breakdown": {"infrastructure": 4.7, "economy": 4.4, "transparency": 4.6, "security_or_education": 4.5}},
        "quality_of_life": {"score": 75, "rating_label": "Improving", "clean_water_pct": 69, "daily_power_hours": 16, "paved_roads_pct": 76, "primary_healthcare_access": "1 Clinic per 3,700 Citizens", "public_school_quality": "89% Literacy Rate", "youth_unemployment_pct": 16.0, "security_safety_score": 8.1},
        "promises": [
            {"id": "p-rv-1", "title": "50.15km Port Harcourt Dual Carriage Ring Road Construction", "category": "Infrastructure", "description": "Epic ring road connecting 6 LGAs (Port Harcourt, Obio/Akpor, Ikwerre, Etche, Eleme, Okrika) with 6 deep marine bridges.", "status": "in_progress", "date_made": "2023-07-17", "budget_allocated": "₦195.3 Billion (Julius Berger)", "progress_pct": 65, "milestones": ["River Swamp Areas Sandfilled & Piled", "Overpasses Cast at UTC & Eleme Links"], "evidence_url": "https://punchng.com"},
            {"id": "p-rv-2", "title": "Trans-Kalabari Highway Phase 2 Construction", "category": "Infrastructure", "description": "Coastal link highway connecting coastal communities in Degema, Asari-Toru, and Akuku-Toru.", "status": "in_progress", "date_made": "2024-06-24", "budget_allocated": "₦144 Billion", "progress_pct": 45, "milestones": ["Krakrama-Sangama Bridge Piers Completed"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "KN": {
        "name": "Engr. Abba Kabir Yusuf",
        "office_title": "Executive Governor of Kano State",
        "role": "governor",
        "party": "New Nigeria Peoples Party (NNPP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Abba_Kabir_Yusuf.jpg/440px-Abba_Kabir_Yusuf.jpg",
        "initials": "AY",
        "school": "Dawakin Tofa Science Secondary School",
        "uni": "Federal University of Technology, Yola (B.Tech Civil Eng)",
        "past": "Honourable Commissioner for Works, Housing & Transport, Kano State",
        "bio": "Civil engineer and Governor of Kano State prioritizing public education sponsorships, maternity health centers, and flyover interchanges.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 31400, "breakdown": {"infrastructure": 4.5, "economy": 4.3, "transparency": 4.5, "security_or_education": 4.6}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 64, "daily_power_hours": 15, "paved_roads_pct": 71, "primary_healthcare_access": "1 Clinic per 4,100 Citizens", "public_school_quality": "85% Literacy Rate", "youth_unemployment_pct": 17.5, "security_safety_score": 8.0},
        "promises": [
            {"id": "p-kn-1", "title": "Settlement of ₦2.5B WAEC/NECO Examination Fees for 50,000 Students", "category": "Education", "description": "Full payment of national secondary school exit examination fees for indigent students in public schools.", "status": "fulfilled", "date_made": "2023-06-15", "budget_allocated": "₦2.5 Billion", "progress_pct": 100, "milestones": ["50,000 Public School Candidates Registered & Sat for Exams"], "evidence_url": "https://dailytrust.com"},
            {"id": "p-kn-2", "title": "Tal’udu & Dan Agundi 3-Tier Interchange Flyovers", "category": "Infrastructure", "description": "Construction of two multi-tier grade-separated flyovers to eliminate gridlock in Kano commercial metropolis.", "status": "in_progress", "date_made": "2023-11-20", "budget_allocated": "₦15.3 Billion", "progress_pct": 80, "milestones": ["Piers and Pre-stressed Beams Erected", "Deck Slab Concreting Active"], "evidence_url": "https://premiumtimesng.com"}
        ]
    },
    "FC": {
        "name": "Barr. Ezenwo Nyesom Wike (CON)",
        "office_title": "Honourable Minister of the Federal Capital Territory",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP) / Federal Cabinet",
        "term_period": "August 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nyesom_Wike.jpg/440px-Nyesom_Wike.jpg",
        "initials": "NW",
        "school": "Government Secondary School, Eneka",
        "uni": "Rivers State University of Science and Technology (LL.B Honours) & BL",
        "past": "Two-Term Governor of Rivers State (2015–2023) & Minister of State for Education",
        "bio": "Minister of the Federal Capital Territory executing rapid arterial road expansions, commercial rail activation, and infrastructure revitalization in Abuja.",
        "citizen_rating": {"overall_score": 4.6, "approval_pct": 91, "total_votes": 33200, "breakdown": {"infrastructure": 4.9, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.4}},
        "quality_of_life": {"score": 81, "rating_label": "High", "clean_water_pct": 78, "daily_power_hours": 19, "paved_roads_pct": 84, "primary_healthcare_access": "1 Clinic per 2,900 Citizens", "public_school_quality": "94% Literacy Rate", "youth_unemployment_pct": 13.8, "security_safety_score": 8.5},
        "promises": [
            {"id": "p-fc-1", "title": "Commercial Passenger Activation of Abuja Metro Rail (Lot 1A & 3)", "category": "Infrastructure", "description": "Refurbishment and commercial activation of 12 metro rail stations connecting Abuja Central Business District to Nnamdi Azikiwe International Airport.", "status": "fulfilled", "date_made": "2023-09-01", "budget_allocated": "$820 Million", "progress_pct": 100, "milestones": ["Free Commuter Operations Commissioned by President Tinubu", "Daily Scheduled Train Service Live"], "evidence_url": "https://thecable.ng"},
            {"id": "p-fc-2", "title": "Completion of Southern Parkway and Outer Southern Expressway", "category": "Infrastructure", "description": "Construction of major 10-lane expressway corridors linking the National Christian Centre, Ring Road 1, and Villa axis.", "status": "fulfilled", "date_made": "2023-10-15", "budget_allocated": "₦35 Billion", "progress_pct": 100, "milestones": ["Southern Parkway 100% Paved with Streetlights Commissioned"], "evidence_url": "https://punchng.com"}
        ]
    }
}

print(f"Generated {len(governors_data)} key executive profiles.")
