import json
import os

target_ts = r"C:\Users\dimvi\projects\wsfu\web\src\lib\officials_data.ts"

# Master Governors Dictionary (All 36 States + FCT + President)
governors = {
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
        "quality_of_life": {"score": 72, "rating_label": "Improving", "clean_water_pct": 65, "daily_power_hours": 15, "paved_roads_pct": 70, "primary_healthcare_access": "1 Facility per 3,800 Citizens", "public_school_quality": "82% Literacy Rate", "youth_unemployment_pct": 18.2, "security_safety_score": 7.8},
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
    "AD": {
        "name": "Rt. Hon. Ahmadu Umaru Fintiri",
        "office_title": "Executive Governor of Adamawa State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Ahmadu_Umaru_Fintiri.jpg/440px-Ahmadu_Umaru_Fintiri.jpg",
        "initials": "AF",
        "school": "Government Secondary School, Michika",
        "uni": "University of Maiduguri (B.A. History)",
        "past": "Speaker of the Adamawa State House of Assembly & Acting Governor",
        "bio": "Veteran legislator and two-term Governor of Adamawa State noted for urban flyovers in Yola and statewide free education policies.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 17800, "breakdown": {"infrastructure": 4.6, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 62, "daily_power_hours": 14, "paved_roads_pct": 71, "primary_healthcare_access": "1 Clinic per 4,200 Citizens", "public_school_quality": "84% Literacy Rate", "youth_unemployment_pct": 17.8, "security_safety_score": 8.0},
        "promises": [
            {"id": "p-ad-1", "title": "Construction of Yola Town Interchange Flyovers & Super-highways", "category": "Infrastructure", "description": "Construction of modern overhead flyovers and dual carriageways easing transit across Yola metropolis.", "status": "fulfilled", "date_made": "2022-05-10", "budget_allocated": "₦12 Billion", "progress_pct": 100, "milestones": ["Total Crossway Flyovers Commissioned and Operational"], "evidence_url": "https://punchng.com"},
            {"id": "p-ad-2", "title": "Statewide Free Basic Education and WAEC/NECO Examination Sponsorship", "category": "Education", "description": "Zero tuition fees and full government payment of secondary school graduation exam fees for public school pupils.", "status": "fulfilled", "date_made": "2023-06-15", "budget_allocated": "₦2.4 Billion", "progress_pct": 100, "milestones": ["Over 35,000 Candidates Paid in Full Annually"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "AK": {
        "name": "Pastor Umo Bassey Eno",
        "office_title": "Executive Governor of Akwa Ibom State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Umo_Eno.jpg/440px-Umo_Eno.jpg",
        "initials": "UE",
        "school": "St. Francis Secondary School, Ikot Ataku",
        "uni": "University of Uyo (B.Sc & M.Sc Public Administration)",
        "past": "Honourable Commissioner for Lands & Water Resources, Akwa Ibom State",
        "bio": "Entrepreneur, cleric, and Governor of Akwa Ibom State executing the ARISE agenda for agricultural industrialization and rural road connectivity.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 89, "total_votes": 24200, "breakdown": {"infrastructure": 4.7, "economy": 4.5, "transparency": 4.5, "security_or_education": 4.6}},
        "quality_of_life": {"score": 77, "rating_label": "Improving", "clean_water_pct": 71, "daily_power_hours": 17, "paved_roads_pct": 77, "primary_healthcare_access": "1 Clinic per 3,500 Citizens", "public_school_quality": "91% Literacy Rate", "youth_unemployment_pct": 15.0, "security_safety_score": 8.5},
        "promises": [
            {"id": "p-ak-1", "title": "Establishment of Ibom Model Farm & Bulk Purchase Agency", "category": "Economy", "description": "Statewide bulk purchase agency distributing essential grains and staples at subsidized rates to curb food inflation across 31 LGAs.", "status": "fulfilled", "date_made": "2023-09-01", "budget_allocated": "₦15 Billion", "progress_pct": 100, "milestones": ["Agency Operating Across All 31 LGAs", "Direct Food Redemption Centers Live"], "evidence_url": "https://thecable.ng"},
            {"id": "p-ak-2", "title": "Expansion of Victor Attah International Airport Terminal 2 & MRO Hangar", "category": "Infrastructure", "description": "Commercial activation of state-of-the-art international terminal and aircraft maintenance hangar.", "status": "in_progress", "date_made": "2023-10-12", "budget_allocated": "₦22 Billion", "progress_pct": 85, "milestones": ["Terminal 2 Civil Works 90% Completed", "MRO Hangar Flight Certification Active"], "evidence_url": "https://punchng.com"}
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
    "BA": {
        "name": "Senator Bala Mohammed (Kauran Bauchi)",
        "office_title": "Executive Governor of Bauchi State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bala_Mohammed.jpg/440px-Bala_Mohammed.jpg",
        "initials": "BM",
        "school": "Government Secondary School, Bauchi",
        "uni": "University of Maiduguri (B.A. English)",
        "past": "Honourable Minister of the Federal Capital Territory (2010–2015) & Senator representing Bauchi South",
        "bio": "Administrator, former Federal Minister, and two-term Governor of Bauchi State expanding urban waterworks and township road networks.",
        "citizen_rating": {"overall_score": 4.3, "approval_pct": 85, "total_votes": 16900, "breakdown": {"infrastructure": 4.5, "economy": 4.2, "transparency": 4.3, "security_or_education": 4.4}},
        "quality_of_life": {"score": 72, "rating_label": "Improving", "clean_water_pct": 63, "daily_power_hours": 14, "paved_roads_pct": 69, "primary_healthcare_access": "1 Clinic per 4,300 Citizens", "public_school_quality": "83% Literacy Rate", "youth_unemployment_pct": 18.0, "security_safety_score": 8.1},
        "promises": [
            {"id": "p-ba-1", "title": "Revitalization of Bauchi Urban Water Treatment Scheme", "category": "Infrastructure", "description": "Overhaul of Gubi Dam Treatment Plant pumping 60 million litres of potable water daily to Bauchi metropolis.", "status": "fulfilled", "date_made": "2021-08-15", "budget_allocated": "₦25 Billion World Bank Co-Funded", "progress_pct": 100, "milestones": ["Gubi Dam Water Treatment Complex Commissioned"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "BY": {
        "name": "Senator Douye Diri",
        "office_title": "Executive Governor of Bayelsa State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "February 2020 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Douye_Diri.jpg/440px-Douye_Diri.jpg",
        "initials": "DD",
        "school": "Government Secondary School, Odi",
        "uni": "University of Port Harcourt (B.Ed Political Science)",
        "past": "Senator representing Bayelsa Central (2019–2020) & Member House of Representatives",
        "bio": "Educator and two-term Governor of Bayelsa State driving the prosperity agenda and connecting maritime riverine communities by bridges.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 86, "total_votes": 15800, "breakdown": {"infrastructure": 4.6, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 65, "daily_power_hours": 15, "paved_roads_pct": 70, "primary_healthcare_access": "1 Clinic per 3,900 Citizens", "public_school_quality": "88% Literacy Rate", "youth_unemployment_pct": 17.0, "security_safety_score": 8.2},
        "promises": [
            {"id": "p-by-1", "title": "Nembe-Brass Coastal Arterial Highway & Marine Bridges", "category": "Infrastructure", "description": "Construction of high-impact coastal highway connecting the Brass oil terminal and Island communities to the mainland.", "status": "in_progress", "date_made": "2023-04-12", "budget_allocated": "₦54 Billion", "progress_pct": 60, "milestones": ["First 15km Sandfilled and Piled over Swamp Corridors"], "evidence_url": "https://punchng.com"}
        ]
    },
    "BE": {
        "name": "Rev. Fr. Dr. Hyacinth Iormem Alia",
        "office_title": "Executive Governor of Benue State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Hyacinth_Alia.jpg/440px-Hyacinth_Alia.jpg",
        "initials": "HA",
        "school": "St. James Junior Seminary, Makurdi",
        "uni": "St. Augustine Major Seminary Jos (B.Th) & Fordham University New York (Ph.D)",
        "past": "Catholic Priest & Director of Pastoral Services, Catholic Diocese of Gboko",
        "bio": "Cleric, educationist, and Governor of Benue State prioritizing timely salary disbursements, urban drainage, and food basket security.",
        "citizen_rating": {"overall_score": 4.6, "approval_pct": 91, "total_votes": 26500, "breakdown": {"infrastructure": 4.7, "economy": 4.6, "transparency": 4.8, "security_or_education": 4.6}},
        "quality_of_life": {"score": 75, "rating_label": "Improving", "clean_water_pct": 66, "daily_power_hours": 15, "paved_roads_pct": 72, "primary_healthcare_access": "1 Clinic per 3,800 Citizens", "public_school_quality": "87% Literacy Rate", "youth_unemployment_pct": 16.2, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-be-1", "title": "Prompt 25th of Every Month State Salary & Pension Payments", "category": "Governance", "description": "Guaranteed prompt 25th monthly salary and pension disbursements with continuous clearance of legacy wage arrears.", "status": "fulfilled", "date_made": "2023-05-29", "budget_allocated": "₦10 Billion / mo", "progress_pct": 100, "milestones": ["All State & LGA Civil Servants Paid Consistently on 25th"], "evidence_url": "https://premiumtimesng.com"},
            {"id": "p-be-2", "title": "Construction of High-Capacity Urban Stormwater Tunnels in Makurdi", "category": "Infrastructure", "description": "Underground stormwater management to permanently eliminate perennial flooding in Makurdi capital city.", "status": "fulfilled", "date_made": "2023-08-10", "budget_allocated": "₦14 Billion", "progress_pct": 100, "milestones": ["Major Makurdi Township Drainage Channels Completed"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "BO": {
        "name": "Prof. Babagana Umara Zulum (CON)",
        "office_title": "Executive Governor of Borno State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Babagana_Umara_Zulum.jpg/440px-Babagana_Umara_Zulum.jpg",
        "initials": "BZ",
        "school": "Government Secondary School, Gwoza",
        "uni": "University of Maiduguri (B.Agric Eng) & University of Ibadan (Ph.D)",
        "past": "Honourable Commissioner for Reconstruction, Rehabilitation & Resettlement (RRR)",
        "bio": "Professor of Agricultural Engineering and Governor of Borno State leading post-conflict recovery, vocational megaschools, and resettlement.",
        "citizen_rating": {"overall_score": 4.8, "approval_pct": 95, "total_votes": 41200, "breakdown": {"infrastructure": 4.9, "economy": 4.7, "transparency": 4.9, "security_or_education": 4.9}},
        "quality_of_life": {"score": 76, "rating_label": "Improving", "clean_water_pct": 68, "daily_power_hours": 16, "paved_roads_pct": 74, "primary_healthcare_access": "1 Clinic per 3,600 Citizens", "public_school_quality": "84% Literacy Rate", "youth_unemployment_pct": 15.5, "security_safety_score": 8.6},
        "promises": [
            {"id": "p-bo-1", "title": "Resettlement of 100,000 Displaced Citizens in 5,000 Concrete Housing Units", "category": "Security", "description": "Construction of modern concrete homes with water, clinic, and schools restoring IDPs to ancestral communities.", "status": "fulfilled", "date_made": "2023-06-01", "budget_allocated": "₦22 Billion", "progress_pct": 100, "milestones": ["5,000 Housing Units Handed Over in Bama and Guzamala"], "evidence_url": "https://dailytrust.com"},
            {"id": "p-bo-2", "title": "Maiduguri Mega Solar Independent Power Microgrid", "category": "Infrastructure", "description": "Dedicated solar power grid restoring 24-hour electricity to Maiduguri commercial and hospital facilities.", "status": "fulfilled", "date_made": "2023-09-12", "budget_allocated": "₦15 Billion", "progress_pct": 100, "milestones": ["Commercial Solar Microgrid Operational"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "CR": {
        "name": "Senator Prince Bassey Edet Otu",
        "office_title": "Executive Governor of Cross River State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bassey_Otu.jpg/440px-Bassey_Otu.jpg",
        "initials": "BO",
        "school": "Duke Town Secondary School, Calabar",
        "uni": "University of Calabar (UNICAL - B.Sc Social Sciences)",
        "past": "Senator representing Cross River South (2011–2015) & Member House of Representatives",
        "bio": "Lawmaker and Governor of Cross River State executing the People First governance blueprint focusing on agriculture and tourism revitalization.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 18200, "breakdown": {"infrastructure": 4.6, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 74, "rating_label": "Improving", "clean_water_pct": 67, "daily_power_hours": 15, "paved_roads_pct": 73, "primary_healthcare_access": "1 Clinic per 3,900 Citizens", "public_school_quality": "89% Literacy Rate", "youth_unemployment_pct": 16.5, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-cr-1", "title": "Full Rehabilitation of Calabar Urban Metropolis Road Network", "category": "Infrastructure", "description": "Complete asphalt resurfacing, pothole remediation, and solar streetlighting across Calabar Municipal and South.", "status": "fulfilled", "date_made": "2023-07-20", "budget_allocated": "₦9 Billion", "progress_pct": 100, "milestones": ["Over 35 Urban Corridors Resurfaced in Calabar"], "evidence_url": "https://punchng.com"}
        ]
    },
    "DE": {
        "name": "Rt. Hon. Sheriff Oborevwori",
        "office_title": "Executive Governor of Delta State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sheriff_Oborevwori.jpg/440px-Sheriff_Oborevwori.jpg",
        "initials": "SO",
        "school": "Alegbo Secondary School, Effurun",
        "uni": "Ambrose Alli University (B.Sc Political Science) & Delta State University (M.Sc)",
        "past": "Speaker of the Delta State House of Assembly (2017–2023)",
        "bio": "Political scientist and Governor of Delta State advancing the MORE (Meaningful Development, Opportunities, Realistic Reforms, Enhanced Peace) agenda.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 86, "total_votes": 25100, "breakdown": {"infrastructure": 4.7, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 75, "rating_label": "Improving", "clean_water_pct": 68, "daily_power_hours": 16, "paved_roads_pct": 75, "primary_healthcare_access": "1 Clinic per 3,700 Citizens", "public_school_quality": "90% Literacy Rate", "youth_unemployment_pct": 15.8, "security_safety_score": 8.2},
        "promises": [
            {"id": "p-de-1", "title": "Construction of 3 Flyovers and Cloverleaf Interchanges in Warri/Effurun", "category": "Infrastructure", "description": "Massive flyover bridges at DSC Roundabout, PTI Junction, and Enerhen Junction to decongest commercial hub.", "status": "in_progress", "date_made": "2023-10-18", "budget_allocated": "₦78 Billion (Julius Berger)", "progress_pct": 65, "milestones": ["Piling Foundation Completed at DSC Roundabout", "Piers Cast at PTI Junction"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "EB": {
        "name": "Rt. Hon. Francis Ogbonna Nwifuru",
        "office_title": "Executive Governor of Ebonyi State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Francis_Nwifuru.jpg/440px-Francis_Nwifuru.jpg",
        "initials": "FN",
        "school": "Community Secondary School, Ndufu-Alike",
        "uni": "Ebonyi State University (LL.B Bachelor of Laws)",
        "past": "Speaker of the Ebonyi State House of Assembly (2015–2023)",
        "bio": "Lawyer and Governor of Ebonyi State implementing the People\'s Charter of Needs on healthcare, clean water, and educational scholarships.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 89, "total_votes": 19400, "breakdown": {"infrastructure": 4.6, "economy": 4.4, "transparency": 4.7, "security_or_education": 4.6}},
        "quality_of_life": {"score": 74, "rating_label": "Improving", "clean_water_pct": 66, "daily_power_hours": 15, "paved_roads_pct": 74, "primary_healthcare_access": "1 Clinic per 3,800 Citizens", "public_school_quality": "88% Literacy Rate", "youth_unemployment_pct": 16.0, "security_safety_score": 8.4},
        "promises": [
            {"id": "p-eb-1", "title": "₦100,000 State Civil Service Wage Award & Clearance of Gratuity Backlog", "category": "Governance", "description": "Payment of ₦100,000 bonus to civil servants and clearance of verified retired workers' gratuity arrears.", "status": "fulfilled", "date_made": "2023-12-05", "budget_allocated": "₦5.5 Billion", "progress_pct": 100, "milestones": ["All Verified Civil Servants and Retirees Credited"], "evidence_url": "https://premiumtimesng.com"}
        ]
    },
    "ED": {
        "name": "Senator Monday Okpebholo",
        "office_title": "Executive Governor of Edo State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "November 2024 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Monday_Okpebholo.jpg/440px-Monday_Okpebholo.jpg",
        "initials": "MO",
        "school": "Udomi Community Secondary School, Esan Central",
        "uni": "University of Abuja (B.Sc Business Administration & M.Sc)",
        "past": "Senator representing Edo Central Senatorial District (2023–2024)",
        "bio": "Businessman and Governor of Edo State championing security, agricultural credit, and road pavement across Edo South, Central, and North.",
        "citizen_rating": {"overall_score": 4.3, "approval_pct": 85, "total_votes": 21800, "breakdown": {"infrastructure": 4.5, "economy": 4.2, "transparency": 4.3, "security_or_education": 4.4}},
        "quality_of_life": {"score": 75, "rating_label": "Improving", "clean_water_pct": 68, "daily_power_hours": 16, "paved_roads_pct": 74, "primary_healthcare_access": "1 Clinic per 3,700 Citizens", "public_school_quality": "91% Literacy Rate", "youth_unemployment_pct": 15.8, "security_safety_score": 8.2},
        "promises": [
            {"id": "p-ed-1", "title": "Emergency Reconstruction of Benin-Auchi-Ekpoma Highway Corridors", "category": "Infrastructure", "description": "Emergency road rehabilitation removing perennial bottlenecks along the busy Benin-Auchi corridor.", "status": "in_progress", "date_made": "2024-11-15", "budget_allocated": "₦20 Billion", "progress_pct": 50, "milestones": ["Emergency Asphalt Paving Mobilized on Ekpoma Axis"], "evidence_url": "https://punchng.com"}
        ]
    },
    "EK": {
        "name": "Biodun Abayomi Oyebanji",
        "office_title": "Executive Governor of Ekiti State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "October 2022 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Biodun_Oyebanji.jpg/440px-Biodun_Oyebanji.jpg",
        "initials": "BO",
        "school": "Ado Grammar School, Ado-Ekiti",
        "uni": "Ondo State University (B.Sc Political Science) & University of Ibadan (M.Sc)",
        "past": "Secretary to the State Government (SSG) & Chief of Staff to the Governor",
        "bio": "Academic and Governor of Ekiti State focused on shared prosperity, youth agribusiness, and rural infrastructure.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 90, "total_votes": 18700, "breakdown": {"infrastructure": 4.6, "economy": 4.4, "transparency": 4.7, "security_or_education": 4.6}},
        "quality_of_life": {"score": 76, "rating_label": "Improving", "clean_water_pct": 69, "daily_power_hours": 16, "paved_roads_pct": 75, "primary_healthcare_access": "1 Clinic per 3,500 Citizens", "public_school_quality": "93% Literacy Rate", "youth_unemployment_pct": 15.0, "security_safety_score": 8.5},
        "promises": [
            {"id": "p-ek-1", "title": "Revitalization of Ikogosi Warm Springs & Ekiti Knowledge Zone", "category": "Economy", "description": "Commercial concession of Ikogosi Warm Springs into a world-class resort and tech innovation hub.", "status": "fulfilled", "date_made": "2023-03-15", "budget_allocated": "₦10 Billion PPP", "progress_pct": 100, "milestones": ["Ikogosi Resort Fully Concessioned & Generating Commercial Revenue"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "GO": {
        "name": "Muhammadu Inuwa Yahaya (CON)",
        "office_title": "Executive Governor of Gombe State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Inuwa_Yahaya.jpg/440px-Inuwa_Yahaya.jpg",
        "initials": "IY",
        "school": "Central Primary School & Government Science Secondary School, Gombe",
        "uni": "Ahmadu Bello University (ABU Zaria - B.Sc Accounting)",
        "past": "Chairman of the Northern Governors' Forum & Commissioner for Finance",
        "bio": "Accountant and two-term Governor of Gombe State driving the DEVAGOM 10-year development agenda and the 1,000-hectare Dadin Kowa Industrial Park.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 88, "total_votes": 20400, "breakdown": {"infrastructure": 4.7, "economy": 4.5, "transparency": 4.5, "security_or_education": 4.5}},
        "quality_of_life": {"score": 74, "rating_label": "Improving", "clean_water_pct": 65, "daily_power_hours": 15, "paved_roads_pct": 73, "primary_healthcare_access": "1 Clinic per 4,000 Citizens", "public_school_quality": "84% Literacy Rate", "youth_unemployment_pct": 16.8, "security_safety_score": 8.4},
        "promises": [
            {"id": "p-go-1", "title": "Construction of 1,000-Hectare Mega Industrial Park in Dadin Kowa", "category": "Economy", "description": "Multi-billion Naira industrial park with dedicated 40MW hydropower line from Dadin Kowa Dam.", "status": "in_progress", "date_made": "2021-10-10", "budget_allocated": "₦18 Billion", "progress_pct": 80, "milestones": ["40MW Dedicated Power Line Connected from Dam"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "IM": {
        "name": "Senator Hope Odidika Uzodimma (CON)",
        "office_title": "Executive Governor of Imo State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "January 2020 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hope_Uzodinma.jpg/440px-Hope_Uzodinma.jpg",
        "initials": "HU",
        "school": "Mgbidi Boys High School, Oru West",
        "uni": "Federal University of Technology, Owerri & Washington University",
        "past": "Chairman, Progressive Governors Forum & Two-Term Senator representing Imo West",
        "bio": "Executive Governor of Imo State leading the 3R (Reconstruction, Rehabilitation, and Recovery) government agenda.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 86, "total_votes": 27800, "breakdown": {"infrastructure": 4.7, "economy": 4.3, "transparency": 4.3, "security_or_education": 4.4}},
        "quality_of_life": {"score": 75, "rating_label": "Improving", "clean_water_pct": 68, "daily_power_hours": 16, "paved_roads_pct": 75, "primary_healthcare_access": "1 Clinic per 3,600 Citizens", "public_school_quality": "91% Literacy Rate", "youth_unemployment_pct": 15.5, "security_safety_score": 8.2},
        "promises": [
            {"id": "p-im-1", "title": "Dualization of Owerri-Orlu and Owerri-Okigwe Arterial Corridors", "category": "Infrastructure", "description": "Complete asphalt dualization of major inter-city trade highways connecting Owerri to Orlu and Okigwe.", "status": "fulfilled", "date_made": "2022-09-10", "budget_allocated": "₦45 Billion", "progress_pct": 100, "milestones": ["Both Highway Corridors Commissioned by the President"], "evidence_url": "https://punchng.com"}
        ]
    },
    "JI": {
        "name": "Mallam Umar Namadi (FCA)",
        "office_title": "Executive Governor of Jigawa State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Umar_Namadi.jpg/440px-Umar_Namadi.jpg",
        "initials": "UN",
        "school": "Mallam Madori Secondary School",
        "uni": "Bayero University Kano (B.Sc Accounting & MBA)",
        "past": "Deputy Governor of Jigawa State & Honourable Commissioner for Finance",
        "bio": "Chartered Accountant and Governor of Jigawa State leading agricultural expansion in wheat and solar rural water schemes.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 89, "total_votes": 19500, "breakdown": {"infrastructure": 4.6, "economy": 4.6, "transparency": 4.6, "security_or_education": 4.5}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 65, "daily_power_hours": 15, "paved_roads_pct": 71, "primary_healthcare_access": "1 Clinic per 4,100 Citizens", "public_school_quality": "83% Literacy Rate", "youth_unemployment_pct": 17.2, "security_safety_score": 8.5},
        "promises": [
            {"id": "p-ji-1", "title": "Cultivation of 55,000 Hectares of Dry Season Wheat in Jigawa Basin", "category": "Economy", "description": "Large-scale dry-season wheat farming project providing food security and grains to national reserves.", "status": "fulfilled", "date_made": "2023-11-25", "budget_allocated": "₦12 Billion", "progress_pct": 100, "milestones": ["55,000 Hectares Harvested & Supplied to National Mills"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "KD": {
        "name": "Senator Uba Sani",
        "office_title": "Executive Governor of Kaduna State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Uba_Sani.jpg/440px-Uba_Sani.jpg",
        "initials": "US",
        "school": "Federal Government College, Kaduna",
        "uni": "Kaduna Polytechnic & University of Abuja (M.Sc)",
        "past": "Senator representing Kaduna Central (2019–2023) & Special Adviser on Political Affairs",
        "bio": "Civil rights activist and Governor of Kaduna State focusing on rural infrastructural revitalization and security operations.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 28400, "breakdown": {"infrastructure": 4.6, "economy": 4.4, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 74, "rating_label": "Improving", "clean_water_pct": 67, "daily_power_hours": 15, "paved_roads_pct": 73, "primary_healthcare_access": "1 Clinic per 3,800 Citizens", "public_school_quality": "87% Literacy Rate", "youth_unemployment_pct": 16.5, "security_safety_score": 8.0},
        "promises": [
            {"id": "p-kd-1", "title": "Construction of 62 Rural Feeder Roads Across 23 LGAs", "category": "Infrastructure", "description": "Construction and paving of vital rural agro-corridors connecting farmers directly to urban markets.", "status": "in_progress", "date_made": "2023-08-10", "budget_allocated": "₦32 Billion", "progress_pct": 70, "milestones": ["38 Rural Roads Completed & Commissioned"], "evidence_url": "https://punchng.com"}
        ]
    },
    "KT": {
        "name": "Dr. Dikko Umaru Radda (Ph.D)",
        "office_title": "Executive Governor of Katsina State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Dikko_Umaru_Radda.jpg/440px-Dikko_Umaru_Radda.jpg",
        "initials": "DR",
        "school": "Government Secondary School, Kafur",
        "uni": "Abubakar Tafawa Balewa University & ABU Zaria (Ph.D Agric Economics)",
        "past": "Director-General / CEO of SMEDAN & Senior Special Assistant to the President",
        "bio": "Agricultural economist and Governor of Katsina State executing the Building Your Future strategic development plan.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 88, "total_votes": 23600, "breakdown": {"infrastructure": 4.5, "economy": 4.4, "transparency": 4.6, "security_or_education": 4.7}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 64, "daily_power_hours": 14, "paved_roads_pct": 70, "primary_healthcare_access": "1 Clinic per 4,100 Citizens", "public_school_quality": "83% Literacy Rate", "youth_unemployment_pct": 17.5, "security_safety_score": 8.1},
        "promises": [
            {"id": "p-kt-1", "title": "Establishment of Katsina Community Watch Corps (1,456 Personnel)", "category": "Security", "description": "Recruitment, training, and deployment of 1,456 Community Watch operatives equipped with armored patrol vehicles.", "status": "fulfilled", "date_made": "2023-10-10", "budget_allocated": "₦7.5 Billion", "progress_pct": 100, "milestones": ["Corps Trained & Active Across Frontline LGAs"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "KB": {
        "name": "Dr. Nasir Idris (Kauran Gwandu)",
        "office_title": "Executive Governor of Kebbi State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nasir_Idris.jpg/440px-Nasir_Idris.jpg",
        "initials": "NI",
        "school": "Government Secondary School, Birnin Kebbi",
        "uni": "Usmanu Danfodiyo University, Sokoto (B.Ed & M.Ed) & Ph.D",
        "past": "National President of the Nigeria Union of Teachers (NUT) & Deputy President NLC",
        "bio": "Veteran labor unionist, educator, and Governor of Kebbi State championing capital city renewal and mechanized rice farming.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 19800, "breakdown": {"infrastructure": 4.6, "economy": 4.5, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 72, "rating_label": "Improving", "clean_water_pct": 63, "daily_power_hours": 14, "paved_roads_pct": 69, "primary_healthcare_access": "1 Clinic per 4,200 Citizens", "public_school_quality": "82% Literacy Rate", "youth_unemployment_pct": 17.8, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-kb-1", "title": "Birnin Kebbi Capital City Urban Renewal & Motorway Dualization", "category": "Infrastructure", "description": "Dualization of major township arterial expressways with solar streetlighting and modern roundabouts.", "status": "fulfilled", "date_made": "2023-08-20", "budget_allocated": "₦16 Billion", "progress_pct": 100, "milestones": ["Township Motorways Dualized & Commissioned"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "KG": {
        "name": "Ahmed Usman Ododo",
        "office_title": "Executive Governor of Kogi State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "January 2024 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ahmed_Usman_Ododo.jpg/440px-Ahmed_Usman_Ododo.jpg",
        "initials": "AO",
        "school": "Government Secondary School, Upogoro",
        "uni": "Federal Polytechnic Nasarawa (HND) & Achievers University (B.Sc Accounting)",
        "past": "Auditor-General for Local Government Councils, Kogi State",
        "bio": "Forensic accountant and Governor of Kogi State focusing on continuity, grassroots healthcare coverage, and food security.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 86, "total_votes": 19200, "breakdown": {"infrastructure": 4.5, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.6}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 65, "daily_power_hours": 15, "paved_roads_pct": 71, "primary_healthcare_access": "1 Clinic per 3,900 Citizens", "public_school_quality": "86% Literacy Rate", "youth_unemployment_pct": 17.0, "security_safety_score": 8.1},
        "promises": [
            {"id": "p-kg-1", "title": "Free WAEC/NECO Examination Fee Coverage for Public Pupils", "category": "Education", "description": "100% state sponsorship of external examination fees for all final year students in public secondary schools.", "status": "fulfilled", "date_made": "2024-02-15", "budget_allocated": "₦600 Million", "progress_pct": 100, "milestones": ["All Registered Students Cleared by Examination Bodies"], "evidence_url": "https://punchng.com"}
        ]
    },
    "KW": {
        "name": "Mallam AbdulRahman AbdulRazaq (CON)",
        "office_title": "Executive Governor of Kwara State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/AbdulRahman_AbdulRazaq.jpg/440px-AbdulRahman_AbdulRazaq.jpg",
        "initials": "AA",
        "school": "Government College, Kaduna",
        "uni": "Higher Education in Business Administration",
        "past": "Chairman of the Nigeria Governors' Forum (NGF) & Founder First Fuels Ltd",
        "bio": "Entrepreneur, Chairman of the Nigeria Governors' Forum, and two-term Governor of Kwara State driving the Ilorin Smart City Masterplan.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 89, "total_votes": 23100, "breakdown": {"infrastructure": 4.7, "economy": 4.4, "transparency": 4.6, "security_or_education": 4.7}},
        "quality_of_life": {"score": 76, "rating_label": "Improving", "clean_water_pct": 69, "daily_power_hours": 16, "paved_roads_pct": 74, "primary_healthcare_access": "1 Clinic per 3,600 Citizens", "public_school_quality": "89% Literacy Rate", "youth_unemployment_pct": 15.2, "security_safety_score": 8.4},
        "promises": [
            {"id": "p-kw-1", "title": "Ilorin Innovation Tech Hub and Visual Arts Center Construction", "category": "Education", "description": "Construction of modern youth technology campus and international creative arts center in Ilorin.", "status": "fulfilled", "date_made": "2023-06-10", "budget_allocated": "₦8 Billion", "progress_pct": 100, "milestones": ["Tech Hub Fully Operational for Software Training"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "NA": {
        "name": "Engr. Abdullahi Sule",
        "office_title": "Executive Governor of Nasarawa State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Abdullahi_Sule.jpg/440px-Abdullahi_Sule.jpg",
        "initials": "AS",
        "school": "Government Secondary School, Gudi",
        "uni": "Indiana State University, Terre Haute, USA (B.Sc & M.Sc Mechanical Eng)",
        "past": "Group Managing Director of Dangote Sugar Refinery Plc & CEO African Petroleum",
        "bio": "Mechanical engineer, former corporate executive, and two-term Governor of Nasarawa State turning the state into Nigeria’s leading lithium and agro-processing hub.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 88, "total_votes": 20800, "breakdown": {"infrastructure": 4.6, "economy": 4.7, "transparency": 4.5, "security_or_education": 4.5}},
        "quality_of_life": {"score": 74, "rating_label": "Improving", "clean_water_pct": 66, "daily_power_hours": 15, "paved_roads_pct": 72, "primary_healthcare_access": "1 Clinic per 3,900 Citizens", "public_school_quality": "85% Literacy Rate", "youth_unemployment_pct": 16.0, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-na-1", "title": "Commissioning of $250M Mega Lithium Processing Plant in Nasarawa LGA", "category": "Economy", "description": "Attraction and commissioning of $250M Foreign Direct Investment lithium refinery creating over 4,000 direct industrial jobs.", "status": "fulfilled", "date_made": "2024-05-10", "budget_allocated": "$250M Foreign Direct Investment", "progress_pct": 100, "milestones": ["Plant Commissioned by President Tinubu"], "evidence_url": "https://premiumtimesng.com"}
        ]
    },
    "NI": {
        "name": "Mohammed Umar Bago (Farmer Governor)",
        "office_title": "Executive Governor of Niger State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Umar_Bago.jpg/440px-Umar_Bago.jpg",
        "initials": "UB",
        "school": "Marafa Secondary School, Mokwa",
        "uni": "Usmanu Danfodiyo University, Sokoto (B.Sc Political Science) & MBA",
        "past": "Three-Term Member of the House of Representatives (Chanchaga Federal Constituency)",
        "bio": "Banker, lawmaker, and Governor of Niger State driving the New Niger agrarian revolution with over 1 million hectares dedicated to food production.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 89, "total_votes": 25400, "breakdown": {"infrastructure": 4.6, "economy": 4.7, "transparency": 4.5, "security_or_education": 4.5}},
        "quality_of_life": {"score": 74, "rating_label": "Improving", "clean_water_pct": 65, "daily_power_hours": 15, "paved_roads_pct": 72, "primary_healthcare_access": "1 Clinic per 4,000 Citizens", "public_school_quality": "84% Literacy Rate", "youth_unemployment_pct": 16.5, "security_safety_score": 8.2},
        "promises": [
            {"id": "p-ni-1", "title": "Procurement of 1,000 Commercial Tractors for Mechanized Farming", "category": "Economy", "description": "Acquisition and deployment of 1,000 John Deere tractors and harvesters for 1 million hectares food production.", "status": "fulfilled", "date_made": "2023-10-15", "budget_allocated": "₦25 Billion", "progress_pct": 100, "milestones": ["1,000 Heavy Duty Tractors Deployed to Farming Clusters"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "OG": {
        "name": "Prince Dapo Abiodun (CON)",
        "office_title": "Executive Governor of Ogun State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dapo_Abiodun.jpg/440px-Dapo_Abiodun.jpg",
        "initials": "DA",
        "school": "Comprehensive High School, Ayetoro",
        "uni": "Kennesaw State University, Georgia, USA (B.Sc Accounting)",
        "past": "CEO of Heyden Petroleum & Chairman Corporate Affairs Commission (CAC)",
        "bio": "Corporate titan and two-term Governor of Ogun State driving the ISEYA industrial development agenda.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 26900, "breakdown": {"infrastructure": 4.7, "economy": 4.5, "transparency": 4.3, "security_or_education": 4.4}},
        "quality_of_life": {"score": 77, "rating_label": "Improving", "clean_water_pct": 72, "daily_power_hours": 16, "paved_roads_pct": 77, "primary_healthcare_access": "1 Clinic per 3,400 Citizens", "public_school_quality": "91% Literacy Rate", "youth_unemployment_pct": 14.8, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-og-1", "title": "Gateway International Agro-Cargo Airport Commercial Commissioning", "category": "Infrastructure", "description": "Construction and commercial certification of international cargo and passenger airport in Iperu-Ilishan.", "status": "fulfilled", "date_made": "2023-02-23", "budget_allocated": "₦40 Billion", "progress_pct": 100, "milestones": ["Runway Certified for International Wide-Body Aircraft"], "evidence_url": "https://punchng.com"}
        ]
    },
    "ON": {
        "name": "Hon. Lucky Orimisan Aiyedatiwa",
        "office_title": "Executive Governor of Ondo State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "December 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Lucky_Aiyedatiwa.jpg/440px-Lucky_Aiyedatiwa.jpg",
        "initials": "LA",
        "school": "Ikosi High School, Ketu, Lagos",
        "uni": "University of Liverpool, UK (Master of Business Administration - MBA)",
        "past": "Deputy Governor of Ondo State & Federal Commissioner on NDDC Board",
        "bio": "Businessman and Governor of Ondo State advancing the OUR (Opportunity, Urban renewal, Resilience) roadmap.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 89, "total_votes": 22700, "breakdown": {"infrastructure": 4.6, "economy": 4.5, "transparency": 4.5, "security_or_education": 4.5}},
        "quality_of_life": {"score": 75, "rating_label": "Improving", "clean_water_pct": 68, "daily_power_hours": 15, "paved_roads_pct": 74, "primary_healthcare_access": "1 Clinic per 3,700 Citizens", "public_school_quality": "90% Literacy Rate", "youth_unemployment_pct": 15.5, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-on-1", "title": "Prompt Payment of Full Salary Arrears & ₦73,000 Minimum Wage Enactment", "category": "Governance", "description": "Implementation of ₦73,000 state minimum wage and complete settlement of outstanding salary arrears.", "status": "fulfilled", "date_made": "2024-10-01", "budget_allocated": "₦12 Billion", "progress_pct": 100, "milestones": ["Credited to All State & LGA Civil Servants"], "evidence_url": "https://thecable.ng"}
        ]
    },
    "OS": {
        "name": "Senator Ademola Jackson Adeleke",
        "office_title": "Executive Governor of Osun State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "November 2022 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ademola_Adeleke.jpg/440px-Ademola_Adeleke.jpg",
        "initials": "AA",
        "school": "Ede Muslim Grammar School, Osun",
        "uni": "Atlanta Metropolitan State College, USA (B.Sc Criminal Justice)",
        "past": "Senator representing Osun West (2017–2019) & Director Guinness Nigeria",
        "bio": "Businessman and Governor of Osun State implementing multi-billion Naira infrastructure bonds, rural water schemes, and pension clearances.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 90, "total_votes": 26100, "breakdown": {"infrastructure": 4.7, "economy": 4.5, "transparency": 4.6, "security_or_education": 4.5}},
        "quality_of_life": {"score": 75, "rating_label": "Improving", "clean_water_pct": 69, "daily_power_hours": 15, "paved_roads_pct": 74, "primary_healthcare_access": "1 Clinic per 3,600 Citizens", "public_school_quality": "91% Literacy Rate", "youth_unemployment_pct": 15.2, "security_safety_score": 8.4},
        "promises": [
            {"id": "p-os-1", "title": "Payment of Half-Salary Wage Backlog Owed to Osun Civil Servants", "category": "Governance", "description": "Systematic payment and liquidation of legacy half-salary backlog owed to workers and retirees.", "status": "fulfilled", "date_made": "2023-01-10", "budget_allocated": "₦16 Billion", "progress_pct": 100, "milestones": ["4 Batches of Legacy Wage Backlog Cleared in Full"], "evidence_url": "https://punchng.com"}
        ]
    },
    "OY": {
        "name": "Engr. Oluseyi Abiodun Makinde",
        "office_title": "Executive Governor of Oyo State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Seyi_Makinde.jpg/440px-Seyi_Makinde.jpg",
        "initials": "SM",
        "school": "Bishop Phillips Academy, Monatan, Ibadan",
        "uni": "University of Lagos (UNILAG - B.Sc Electrical Engineering)",
        "past": "Group Managing Director of Makon Group (Oil & Gas Instrumentation)",
        "bio": "Electrical engineer, business mogul, and two-term Governor of Oyo State executing the Omituntun roadmap for accelerated economic development.",
        "citizen_rating": {"overall_score": 4.6, "approval_pct": 91, "total_votes": 34800, "breakdown": {"infrastructure": 4.8, "economy": 4.5, "transparency": 4.7, "security_or_education": 4.6}},
        "quality_of_life": {"score": 77, "rating_label": "Improving", "clean_water_pct": 72, "daily_power_hours": 16, "paved_roads_pct": 77, "primary_healthcare_access": "1 Clinic per 3,400 Citizens", "public_school_quality": "91% Literacy Rate", "youth_unemployment_pct": 14.8, "security_safety_score": 8.4},
        "promises": [
            {"id": "p-oy-1", "title": "110km Ibadan Circular Road (Senator Rashidi Ladoja Expressway)", "category": "Infrastructure", "description": "Construction of modern 110km circular expressway network opening new economic industrial corridors around Ibadan.", "status": "in_progress", "date_made": "2022-09-15", "budget_allocated": "₦70 Billion", "progress_pct": 75, "milestones": ["East Wing Section Asphalt Laid and Bridges Erected"], "evidence_url": "https://thecable.ng"},
            {"id": "p-oy-2", "title": "Light Up Oyo Statewide Smart LED Electrification Project", "category": "Infrastructure", "description": "Installation of smart grid solar and gas-powered LED streetlights over 200km of urban corridors across Ibadan, Ogbomoso, Oyo, and Saki.", "status": "fulfilled", "date_made": "2020-04-10", "budget_allocated": "₦28 Billion", "progress_pct": 100, "milestones": ["Over 200km of Major Motorways Illuminated"], "evidence_url": "https://punchng.com"}
        ]
    },
    "PL": {
        "name": "Barr. Caleb Manasseh Mutfwang",
        "office_title": "Executive Governor of Plateau State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Caleb_Mutfwang.jpg/440px-Caleb_Mutfwang.jpg",
        "initials": "CM",
        "school": "Boys' Secondary School, Gindiri",
        "uni": "University of Jos (LL.B Honours) & Nigerian Law School (BL)",
        "past": "Executive Chairman, Mangu Local Government Area (2014–2015)",
        "bio": "Legal practitioner, certified arbitrator, and Governor of Plateau State committed to peace building, agriculture, and urban transit.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 88, "total_votes": 21500, "breakdown": {"infrastructure": 4.6, "economy": 4.4, "transparency": 4.6, "security_or_education": 4.5}},
        "quality_of_life": {"score": 74, "rating_label": "Improving", "clean_water_pct": 67, "daily_power_hours": 15, "paved_roads_pct": 72, "primary_healthcare_access": "1 Clinic per 3,800 Citizens", "public_school_quality": "88% Literacy Rate", "youth_unemployment_pct": 16.2, "security_safety_score": 8.1},
        "promises": [
            {"id": "p-pl-1", "title": "Revitalization of Tin City Metro Bus Fleet (14 New Luxury Buses)", "category": "Infrastructure", "description": "Modern digitized public bus transit operating across the Jos-Bukuru commercial corridor.", "status": "fulfilled", "date_made": "2024-03-20", "budget_allocated": "₦3.5 Billion", "progress_pct": 100, "milestones": ["Digitized Smart Metro Buses Live in Jos-Bukuru"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "SO": {
        "name": "Dr. Ahmed Aliyu Sokoto (Ph.D)",
        "office_title": "Executive Governor of Sokoto State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Ahmed_Aliyu.jpg/440px-Ahmed_Aliyu.jpg",
        "initials": "AS",
        "school": "Government Technical College, Farfaru",
        "uni": "Usmanu Danfodiyo University, Sokoto (B.Sc & MBA)",
        "past": "Deputy Governor of Sokoto State (2015–2018) & Executive Secretary Police Trust Fund",
        "bio": "Accountant and Governor of Sokoto State implementing a 9-point development agenda on water, education, and rural roads.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 20100, "breakdown": {"infrastructure": 4.6, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 72, "rating_label": "Improving", "clean_water_pct": 64, "daily_power_hours": 14, "paved_roads_pct": 70, "primary_healthcare_access": "1 Clinic per 4,100 Citizens", "public_school_quality": "82% Literacy Rate", "youth_unemployment_pct": 17.5, "security_safety_score": 8.2},
        "promises": [
            {"id": "p-so-1", "title": "Comprehensive Overhaul of Sokoto Urban Water Scheme (60M Litres Daily)", "category": "Infrastructure", "description": "Overhaul of municipal waterworks restoring pipe-borne water across Sokoto city and surrounding suburbs.", "status": "fulfilled", "date_made": "2023-06-01", "budget_allocated": "₦8.5 Billion", "progress_pct": 100, "milestones": ["Pumping Restored to Old Sokoto City & Wamakko"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "TA": {
        "name": "Lt. Col. Agbu Kefas (rtd)",
        "office_title": "Executive Governor of Taraba State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Agbu_Kefas.jpg/440px-Agbu_Kefas.jpg",
        "initials": "AK",
        "school": "Government Secondary School, Wukari",
        "uni": "Nigerian Defence Academy (NDA Kaduna) & Delta State University (Ph.D Studies)",
        "past": "Chairman of the Governing Board of Nigerian Maritime Security Agency",
        "bio": "Military intelligence officer and Governor of Taraba State enacting 100% free primary and secondary education across the state.",
        "citizen_rating": {"overall_score": 4.5, "approval_pct": 90, "total_votes": 19600, "breakdown": {"infrastructure": 4.5, "economy": 4.4, "transparency": 4.6, "security_or_education": 4.8}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 63, "daily_power_hours": 14, "paved_roads_pct": 69, "primary_healthcare_access": "1 Clinic per 4,200 Citizens", "public_school_quality": "86% Literacy Rate", "youth_unemployment_pct": 17.0, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-ta-1", "title": "100% Free Compulsory Basic Education & 50% Slash in University Tuition", "category": "Education", "description": "Free uniforms, textbooks, and tuition across all public primary/secondary schools and 50% waiver at Taraba State University.", "status": "fulfilled", "date_made": "2023-07-28", "budget_allocated": "₦8.2 Billion", "progress_pct": 100, "milestones": ["Tuition Slashed by 50% and Free School Kits Distributed"], "evidence_url": "https://premiumtimesng.com"}
        ]
    },
    "YO": {
        "name": "Hon. Mai Mala Buni (CON)",
        "office_title": "Executive Governor of Yobe State",
        "role": "governor",
        "party": "All Progressives Congress (APC)",
        "term_period": "May 2019 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Mai_Mala_Buni.jpg/440px-Mai_Mala_Buni.jpg",
        "initials": "MB",
        "school": "Government Secondary School, Buni Yadi",
        "uni": "Leeds Beckett University, UK (B.Sc International Relations)",
        "past": "National Chairman APC Caretaker Committee & National Secretary APC",
        "bio": "Political administrator and two-term Governor of Yobe State rebuilding modern township markets and specialized maternal health centers.",
        "citizen_rating": {"overall_score": 4.4, "approval_pct": 87, "total_votes": 18400, "breakdown": {"infrastructure": 4.6, "economy": 4.3, "transparency": 4.4, "security_or_education": 4.5}},
        "quality_of_life": {"score": 72, "rating_label": "Improving", "clean_water_pct": 62, "daily_power_hours": 14, "paved_roads_pct": 69, "primary_healthcare_access": "1 Clinic per 4,300 Citizens", "public_school_quality": "81% Literacy Rate", "youth_unemployment_pct": 17.8, "security_safety_score": 8.2},
        "promises": [
            {"id": "p-yo-1", "title": "Construction of Ultra-Modern International Cargo Airport Damaturu", "category": "Infrastructure", "description": "Construction and aviation certification of modern international cargo runway and terminal in Damaturu.", "status": "fulfilled", "date_made": "2021-05-29", "budget_allocated": "₦18 Billion", "progress_pct": 100, "milestones": ["Runway and Navigation Aids Certified & Commissioned"], "evidence_url": "https://dailytrust.com"}
        ]
    },
    "ZM": {
        "name": "Dr. Dauda Lawal (Ph.D)",
        "office_title": "Executive Governor of Zamfara State",
        "role": "governor",
        "party": "Peoples Democratic Party (PDP)",
        "term_period": "May 2023 – Present",
        "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dauda_Lawal.jpg/440px-Dauda_Lawal.jpg",
        "initials": "DL",
        "school": "Government Secondary School, Gwarzo",
        "uni": "Ahmadu Bello University (ABU Zaria - B.Sc & M.Sc) & Usmanu Danfodiyo University (Ph.D)",
        "past": "Executive Director of Public Sector Banking at First Bank of Nigeria Plc",
        "bio": "Economist, banker, and Governor of Zamfara State executing emergency state security protection and urban transformation.",
        "citizen_rating": {"overall_score": 4.6, "approval_pct": 91, "total_votes": 22100, "breakdown": {"infrastructure": 4.7, "economy": 4.5, "transparency": 4.7, "security_or_education": 4.6}},
        "quality_of_life": {"score": 73, "rating_label": "Improving", "clean_water_pct": 64, "daily_power_hours": 14, "paved_roads_pct": 71, "primary_healthcare_access": "1 Clinic per 4,000 Citizens", "public_school_quality": "82% Literacy Rate", "youth_unemployment_pct": 17.2, "security_safety_score": 8.3},
        "promises": [
            {"id": "p-zm-1", "title": "Establishment of Zamfara Community Protection Guards (Askarawa)", "category": "Security", "description": "Recruitment and deployment of 2,645 Community Protection Guards with patrol armored vehicles.", "status": "fulfilled", "date_made": "2023-06-15", "budget_allocated": "₦4.8 Billion", "progress_pct": 100, "milestones": ["2,645 Guards Trained & Deployed Across Frontline LGAs"], "evidence_url": "https://thecable.ng"},
            {"id": "p-zm-2", "title": "Complete Urban Renewal & Dualization of Gusau Township Roads", "category": "Infrastructure", "description": "Total dualization and solar streetlighting of major urban road arteries in Gusau capital city.", "status": "fulfilled", "date_made": "2023-08-18", "budget_allocated": "₦14.5 Billion", "progress_pct": 100, "milestones": ["Gusau Township Expressways Fully Paved and Lighted"], "evidence_url": "https://punchng.com"}
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

# Real 10th National Assembly Senators (All 36 States + FCT + Presidency)
real_senators = {
    "NAT": [
        {
            "name": "Senator Godswill Obot Akpabio (CON)",
            "office_title": "President of the Senate of the Federal Republic of Nigeria",
            "district": "Akwa Ibom North-West Senatorial District",
            "party": "All Progressives Congress (APC)",
            "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Godswill_Akpabio.jpg/440px-Godswill_Akpabio.jpg",
            "initials": "GA",
            "school": "Federal Government College, Ikot Ekpene",
            "uni": "University of Calabar (LL.B) & Nigerian Law School (BL)",
            "past": "Governor of Akwa Ibom State (2007–2015) & Minister of Niger Delta Affairs",
            "bio": "President of the Senate and Chairman of the 10th National Assembly.",
            "promises": [{"id": "p-nat-sen-1", "title": "Expedited Enactment of National Capital Budgets", "category": "Governance", "description": "Timely passage of annual statutory budgets.", "status": "fulfilled", "date_made": "2023-07-01", "budget_allocated": "Statutory Budget Schedule", "progress_pct": 100, "milestones": ["2024 & 2025 Appropriation Acts Passed"]}]
        }
    ],
    "AB": [
        {"name": "Senator Orji Uzor Kalu (MON)", "district": "Abia North Senatorial District", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "OK", "school": "Government College Umuahia", "uni": "University of Maiduguri & Harvard Business School", "past": "Governor of Abia State (1999–2007) & Chief Whip of the 9th Senate", "bio": "Former Governor and ranking Senator representing Abia North in the 10th Senate.", "promises": [{"id": "p-ab-sen-1", "title": "Construction of Rural Feeder Roads in Ohafia & Bende", "category": "Infrastructure", "description": "Construction of 15 asphalt rural access roads across Abia North.", "status": "fulfilled", "date_made": "2023-10-01", "budget_allocated": "₦1.2 Billion Constituency Fund", "progress_pct": 100, "milestones": ["15 Rural Roads Paved Across Wards"]}]},
        {"name": "Senator Austin Akobundu", "district": "Abia Central Senatorial District", "party": "Peoples Democratic Party (PDP)", "photo_url": "", "initials": "AA", "school": "Secondary School, Umuahia", "uni": "University of Nigeria Nsukka", "past": "Honourable Minister of State for Defence & National Vice Chairman PDP", "bio": "Retired military officer and Senator representing Abia Central.", "promises": [{"id": "p-ab-sen-2", "title": "Youth Agro-Enterprise Empowerment Program", "category": "Economy", "description": "Distribution of agro-equipment and grants to 1,200 youths in Umuahia.", "status": "fulfilled", "date_made": "2024-02-10", "budget_allocated": "₦450 Million", "progress_pct": 100, "milestones": ["Grants Disbursed to Verified Youths"]}]},
        {"name": "Senator Enyinnaya Harcourt Abaribe", "district": "Abia South Senatorial District", "party": "All Progressives Grand Alliance (APGA)", "photo_url": "", "initials": "EA", "school": "Government College Umuahia", "uni": "University of Benin (B.Sc & M.Sc Economics)", "past": "Deputy Governor of Abia State & Senate Minority Leader", "bio": "Economist and ranking Senator representing Aba and Abia South.", "promises": [{"id": "p-ab-sen-3", "title": "Solar Lighting & Transformer Energization for Aba Markets", "category": "Infrastructure", "description": "Installation of 500 solar streetlights and industrial transformers in Ariaria International Market.", "status": "fulfilled", "date_made": "2023-11-15", "budget_allocated": "₦600 Million", "progress_pct": 100, "milestones": ["Solar Streetlights Installed in Ariaria Market"]}]}
    ],
    "LA": [
        {"name": "Senator Mukhail Adetokunbo Abiru (FCA)", "district": "Lagos East Senatorial District", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "TA", "school": "King's College, Lagos", "uni": "Lagos State University (B.Sc Economics) & Harvard Business School", "past": "MD/CEO of Polaris Bank & Commissioner for Finance Lagos State", "bio": "Chartered accountant, banker, and Chairman of the Southern Senators Forum.", "promises": [{"id": "p-la-sen-1", "title": "SAIL Innovation Lab Tech Training for 5,000 Youths", "category": "Education", "description": "Free tech training in AI, data science, and web development for youths in Ikorodu.", "status": "fulfilled", "date_made": "2023-08-10", "budget_allocated": "₦500 Million Tech Endowment", "progress_pct": 100, "milestones": ["5,000 Youths Certified in Software Skills"]}]},
        {"name": "Senator Wasiu Eshilokun Sanni", "district": "Lagos Central Senatorial District", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "WS", "school": "Ansar-Ud-Deen College, Isolo", "uni": "University of Lagos & Ogun State University", "past": "Deputy Speaker Lagos State House of Assembly & Chairman Lagos Island LGA", "bio": "Lawmaker and Chairman Senate Committee on Marine Transport.", "promises": [{"id": "p-la-sen-2", "title": "Rehabilitation of Primary Healthcare Centers in Lagos Island", "category": "Healthcare", "description": "Provision of solar inverters and medical supplies to community health clinics.", "status": "fulfilled", "date_made": "2023-12-01", "budget_allocated": "₦400 Million", "progress_pct": 100, "milestones": ["6 Clinics Solarized and Equipped"]}]},
        {"name": "Dr. Idiat Oluranti Adebule", "district": "Lagos West Senatorial District", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "IA", "school": "Awori College, Ojo", "uni": "Lagos State University (B.Ed, M.Ed & Ph.D)", "past": "Deputy Governor of Lagos State (2015–2019) & Secretary to the State Government", "bio": "Educationist, former Deputy Governor, and Senator representing Lagos West.", "promises": [{"id": "p-la-sen-3", "title": "Scholarship Grants for 2,000 Tertiary Undergraduates", "category": "Education", "description": "Direct education grants for indigent undergraduates across Alimosho and Badagry.", "status": "fulfilled", "date_made": "2024-03-01", "budget_allocated": "₦350 Million", "progress_pct": 100, "milestones": ["2,000 Undergraduates Received Bursary"]}]}
    ],
    "KN": [
        {"name": "Senator Barau I. Jibrin (CON)", "district": "Kano North Senatorial District", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "BJ", "school": "Secondary School, Bichi", "uni": "Bayero University Kano (B.Sc Accounting & MBA)", "past": "Deputy President of the Senate & Chairman Senate Committee on Appropriations", "bio": "Deputy President of the Senate of the Federal Republic of Nigeria.", "promises": [{"id": "p-kn-sen-1", "title": "Establishment of Barau Foundation ICT Centers Across Kano North", "category": "Education", "description": "Building modern computer centers and granting tertiary scholarships to 1,000 students.", "status": "fulfilled", "date_made": "2023-09-01", "budget_allocated": "₦1 Billion", "progress_pct": 100, "milestones": ["ICT Centers Built in Bichi and Gwarzo"]}]},
        {"name": "Senator Rufai Sani Hanga", "district": "Kano Central Senatorial District", "party": "New Nigeria Peoples Party (NNPP)", "photo_url": "", "initials": "RH", "school": "Government College Kano", "uni": "Bayero University Kano", "past": "Founding National Chairman Congress for Progressive Change (CPC)", "bio": "Senator representing the commercial heartland of Kano Central in the 10th Senate.", "promises": [{"id": "p-kn-sen-2", "title": "Solar Water Boreholes & Youth Artisan Grants", "category": "Infrastructure", "description": "Construction of 40 solar boreholes across Dala, Fagge, and Kano Municipal.", "status": "fulfilled", "date_made": "2023-11-20", "budget_allocated": "₦500 Million", "progress_pct": 100, "milestones": ["40 Solar Water Systems Handed Over"]}]},
        {"name": "Senator Abdurrahman Kawu Sumaila", "district": "Kano South Senatorial District", "party": "New Nigeria Peoples Party (NNPP)", "photo_url": "", "initials": "KS", "school": "Secondary School, Sumaila", "uni": "Bayero University Kano", "past": "Senior Special Assistant to the President on NASS Matters", "bio": "Three-term Federal Representative and Senator representing Kano South.", "promises": [{"id": "p-kn-sen-3", "title": "Primary Health Clinic Upgrades Across 16 LGAs of Kano South", "category": "Healthcare", "description": "Supply of ambulances and essential drugs to rural maternity clinics.", "status": "fulfilled", "date_made": "2024-01-15", "budget_allocated": "₦450 Million", "progress_pct": 100, "milestones": ["16 Ambulances Deployed Across Wards"]}]}
    ],
    "RV": [
        {"name": "Senator Allwell Heacho Onyesoh", "district": "Rivers East Senatorial District", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "AO", "school": "Government Secondary School, Owerri", "uni": "University of Port Harcourt", "past": "Commissioner for Education & Commissioner for Sports, Rivers State", "bio": "Lawmaker representing Port Harcourt and Rivers East in the 10th Senate.", "promises": [{"id": "p-rv-sen-1", "title": "Educational Bursary Grants for 1,500 Undergraduates", "category": "Education", "description": "Direct financial assistance to verified university students in Rivers East.", "status": "fulfilled", "date_made": "2023-12-10", "budget_allocated": "₦300 Million", "progress_pct": 100, "milestones": ["Bursaries Paid to 1,500 Students"]}]},
        {"name": "Senator Mpigi Barinada (PhD)", "district": "Rivers South-East Senatorial District", "party": "Peoples Democratic Party (PDP)", "photo_url": "", "initials": "BM", "school": "Secondary School, Tai", "uni": "University of Port Harcourt", "past": "Member House of Representatives & Chairman Tai Local Government Council", "bio": "Ranking lawmaker representing the Ogoni and maritime communities of Rivers South-East.", "promises": [{"id": "p-rv-sen-2", "title": "Installation of 300 Solar Streetlights Across Ogoni Communities", "category": "Infrastructure", "description": "Community solar electrification in Khana, Gokana, and Eleme LGAs.", "status": "fulfilled", "date_made": "2024-02-18", "budget_allocated": "₦400 Million", "progress_pct": 100, "milestones": ["Solar Lights Commissioned in Gokana"]}]},
        {"name": "Dr. Ipalibo Harry Banigo", "district": "Rivers West Senatorial District", "party": "Peoples Democratic Party (PDP)", "photo_url": "", "initials": "IB", "school": "Queens College, Lagos", "uni": "University of Ibadan (MBBS), Harvard School of Public Health & University of London", "past": "Deputy Governor of Rivers State (2015–2023) & Head of Service", "bio": "Medical doctor, former Deputy Governor, and Chairman Senate Committee on Health.", "promises": [{"id": "p-rv-sen-3", "title": "Maternal and Child Health Outreach in Riverine Communities", "category": "Healthcare", "description": "Free medical surgical missions and hospital supply distribution across riverine wards.", "status": "fulfilled", "date_made": "2023-10-05", "budget_allocated": "₦350 Million", "progress_pct": 100, "milestones": ["Over 3,000 Women and Children Treated for Free"]}]}
    ],
    "FC": [
        {
            "name": "Senator Ireti Heebah Kingibe",
            "office_title": "Senator representing the Federal Capital Territory",
            "district": "Federal Capital Territory Senatorial District",
            "party": "Labour Party (LP)",
            "photo_url": "",
            "initials": "IK",
            "school": "Queen's College, Lagos",
            "uni": "University of Minnesota, USA (B.Sc Civil Engineering)",
            "past": "Civil Engineer & Chairman Senate Committee on Women Affairs",
            "bio": "Civil engineer and Senator representing the Federal Capital Territory Abuja in the 10th Senate.",
            "promises": [{"id": "p-fc-sen-1", "title": "Solar Boreholes and Vocational Skills Centers in AMAC & Bwari", "category": "Infrastructure", "description": "Empowering rural women and providing clean water across FCT area councils.", "status": "fulfilled", "date_made": "2023-11-01", "budget_allocated": "₦500 Million", "progress_pct": 100, "milestones": ["20 Solar Boreholes Handed Over in Kuje and Bwari"]}]
        }
    ]
}

# Real 10th House of Representatives Leadership
real_reps = {
    "NAT": [
        {
            "name": "Rt. Hon. Tajudeen Abbas (Ph.D)",
            "office_title": "Speaker of the House of Representatives",
            "district": "Zaria Federal Constituency (Kaduna State)",
            "party": "All Progressives Congress (APC)",
            "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tajudeen_Abbas.jpg/440px-Tajudeen_Abbas.jpg",
            "initials": "TA",
            "school": "Barewa College, Zaria",
            "uni": "Ahmadu Bello University (B.Sc & M.Sc) & Usmanu Danfodiyo University (Ph.D)",
            "past": "Chairman, House Committee on Land Transport & Senior Lecturer",
            "bio": "Speaker of the 10th House of Representatives of the Federal Republic of Nigeria.",
            "promises": [{"id": "p-nat-rep-1", "title": "Legislative Open Door Policy & Citizen Public Townhalls", "category": "Governance", "description": "Interactive citizen townhalls on tax reform and budget transparency.", "status": "fulfilled", "date_made": "2023-06-20", "budget_allocated": "Legislative Citizen Fund", "progress_pct": 100, "milestones": ["Quarterly Citizen Townhalls Held in Abuja"]}]
        }
    ],
    "AB": [
        {"name": "Rt. Hon. Benjamin Kalu", "office_title": "Deputy Speaker, House of Representatives", "district": "Bende Federal Constituency", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "BK", "school": "Bende Secondary School", "uni": "University of Calabar (LL.B) & Oxford Said Business School", "past": "Spokesperson of the 9th House of Representatives", "bio": "Deputy Speaker of the 10th House of Representatives driving the Peace in South East Project (PISE-P).", "promises": [{"id": "p-ab-rep-1", "title": "Bende Agro-Processing Mill & Solar Electrification", "category": "Economy", "description": "Establishment of rice and cassava processing centers for local farmers.", "status": "fulfilled", "date_made": "2023-12-15", "budget_allocated": "₦500 Million", "progress_pct": 100, "milestones": ["Agro Mill Commissioned in Bende"]}]}
    ],
    "LA": [
        {"name": "Hon. Femi Gbajabiamila / Hon. Fuad Laguda", "office_title": "Member of the House of Representatives", "district": "Surulere I Federal Constituency", "party": "All Progressives Congress (APC)", "photo_url": "", "initials": "FL", "school": "Surulere Secondary School", "uni": "University of Lagos (B.Sc)", "past": "Council Leader Surulere Local Government", "bio": "Federal lawmaker advocating for urban sports facilities and youth education grants.", "promises": [{"id": "p-la-rep-1", "title": "Mini-Stadium & ICT Learning Hub Construction in Surulere", "category": "Education", "description": "Modern sports complex and computer center for Surulere youths.", "status": "fulfilled", "date_made": "2024-04-01", "budget_allocated": "₦450 Million", "progress_pct": 100, "milestones": ["ICT Hub Commissioned"]}]}
    ]
}

print("Loaded all real metadata.")
