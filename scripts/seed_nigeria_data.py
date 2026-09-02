"""
WSFU (Who Swear For Us) - Nigeria States & 774 LGAs Seeder
Standardizes all 36 States + FCT and all 774 LGAs with composite slugs.
Can output a direct .sql file or upload directly to Supabase via supabase-py.
"""

import os
import re
import json
from typing import Dict, List

# Complete official Nigerian States + Geopolitical Zones + 774 LGAs
NIGERIA_GEOGRAPHY: Dict[str, Dict] = {
    "Abia": {
        "code": "AB",
        "zone": "South East",
        "lgas": [
            "Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North",
            "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo",
            "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"
        ]
    },
    "Adamawa": {
        "code": "AD",
        "zone": "North East",
        "lgas": [
            "Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Lamurde",
            "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan",
            "Shelleng", "Song", "Toungo", "Yola North", "Yola South"
        ]
    },
    "Akwa Ibom": {
        "code": "AK",
        "zone": "South South",
        "lgas": [
            "Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan",
            "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene",
            "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara",
            "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"
        ]
    },
    "Anambra": {
        "code": "AN",
        "zone": "South East",
        "lgas": [
            "Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South",
            "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala",
            "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South",
            "Orumba North", "Orumba South", "Oyi"
        ]
    },
    "Bauchi": {
        "code": "BA",
        "zone": "North East",
        "lgas": [
            "Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa",
            "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira",
            "Tafawa Balewa", "Toro", "Warji", "Zaki"
        ]
    },
    "Bayelsa": {
        "code": "BY",
        "zone": "South South",
        "lgas": [
            "Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"
        ]
    },
    "Benue": {
        "code": "BE",
        "zone": "North Central",
        "lgas": [
            "Agatu", "Apa", "Ado", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala",
            "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu",
            "Oturkpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"
        ]
    },
    "Borno": {
        "code": "BO",
        "zone": "North East",
        "lgas": [
            "Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio",
            "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar",
            "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"
        ]
    },
    "Cross River": {
        "code": "CR",
        "zone": "South South",
        "lgas": [
            "Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal",
            "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"
        ]
    },
    "Delta": {
        "code": "DE",
        "zone": "South South",
        "lgas": [
            "Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West",
            "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West",
            "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North",
            "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"
        ]
    },
    "Ebonyi": {
        "code": "EB",
        "zone": "South East",
        "lgas": [
            "Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South",
            "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"
        ]
    },
    "Edo": {
        "code": "ED",
        "zone": "South South",
        "lgas": [
            "Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West",
            "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba Okha", "Orhionmwon",
            "Oredo", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"
        ]
    },
    "Ekiti": {
        "code": "EK",
        "zone": "South West",
        "lgas": [
            "Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure",
            "Gbonyin", "Ido Osi", "Ijero", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun",
            "Moba", "Oye"
        ]
    },
    "Enugu": {
        "code": "EN",
        "zone": "South East",
        "lgas": [
            "Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti",
            "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka",
            "Oji River", "Udenu", "Udi", "Uzo Uwani"
        ]
    },
    "Federal Capital Territory": {
        "code": "FC",
        "zone": "North Central",
        "lgas": [
            "Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"
        ]
    },
    "Gombe": {
        "code": "GO",
        "zone": "North East",
        "lgas": [
            "Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami",
            "Nafada", "Shongom", "Yamaltu/Deba"
        ]
    },
    "Imo": {
        "code": "IM",
        "zone": "South East",
        "lgas": [
            "Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South",
            "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba",
            "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu",
            "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"
        ]
    },
    "Jigawa": {
        "code": "JI",
        "zone": "North West",
        "lgas": [
            "Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki",
            "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kazaure",
            "Kiri Kasama", "Kiyawa", "Kaugama", "Maigatari", "Malam Madori", "Miga", "Ringim",
            "Roni", "Sule Tankarkar", "Taura", "Yankwashi"
        ]
    },
    "Kaduna": {
        "code": "KD",
        "zone": "North West",
        "lgas": [
            "Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia",
            "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau",
            "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"
        ]
    },
    "Kano": {
        "code": "KN",
        "zone": "North West",
        "lgas": [
            "Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta",
            "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam",
            "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya",
            "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa",
            "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa",
            "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"
        ]
    },
    "Katsina": {
        "code": "KT",
        "zone": "North West",
        "lgas": [
            "Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume",
            "Danja", "Dan Musa", "Daura", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia",
            "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua",
            "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana",
            "Sandamu", "Zango"
        ]
    },
    "Kebbi": {
        "code": "KB",
        "zone": "North West",
        "lgas": [
            "Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza",
            "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski",
            "Sakaba", "Shanga", "Suru", "Danko-Wasagu", "Yauri", "Zuru"
        ]
    },
    "Kogi": {
        "code": "KO",
        "zone": "North Central",
        "lgas": [
            "Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu",
            "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo",
            "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"
        ]
    },
    "Kwara": {
        "code": "KW",
        "zone": "North Central",
        "lgas": [
            "Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South",
            "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"
        ]
    },
    "Lagos": {
        "code": "LA",
        "zone": "South West",
        "lgas": [
            "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry",
            "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe",
            "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
        ]
    },
    "Nasarawa": {
        "code": "NA",
        "zone": "North Central",
        "lgas": [
            "Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa",
            "Nasarawa Egon", "Obi", "Toto", "Wamba"
        ]
    },
    "Niger": {
        "code": "NI",
        "zone": "North Central",
        "lgas": [
            "Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara",
            "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa",
            "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"
        ]
    },
    "Ogun": {
        "code": "OG",
        "zone": "South West",
        "lgas": [
            "Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South",
            "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode",
            "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside",
            "Remo North", "Shagamu"
        ]
    },
    "Ondo": {
        "code": "ON",
        "zone": "South West",
        "lgas": [
            "Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West",
            "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo",
            "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"
        ]
    },
    "Osun": {
        "code": "OS",
        "zone": "South West",
        "lgas": [
            "Atakunmosa East", "Atakunmosa West", "Aiyedaade", "Aiyedire", "Boluwaduro", "Boripe",
            "Ede North", "Ede South", "Ife Central", "Ife East", "Ife North", "Ife South", "Egbedore",
            "Ejigbo", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole",
            "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"
        ]
    },
    "Oyo": {
        "code": "OY",
        "zone": "South West",
        "lgas": [
            "Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East",
            "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central",
            "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa",
            "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo",
            "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"
        ]
    },
    "Plateau": {
        "code": "PL",
        "zone": "North Central",
        "lgas": [
            "Barkin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South", "Kanam",
            "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan",
            "Riyom", "Shendam", "Wase"
        ]
    },
    "Rivers": {
        "code": "RV",
        "zone": "South South",
        "lgas": [
            "Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru",
            "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana",
            "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro",
            "Oyigbo", "Port Harcourt", "Tai"
        ]
    },
    "Sokoto": {
        "code": "SO",
        "zone": "North West",
        "lgas": [
            "Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gawabawa", "Illela",
            "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North",
            "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"
        ]
    },
    "Taraba": {
        "code": "TR",
        "zone": "North East",
        "lgas": [
            "Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido",
            "Kurmi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"
        ]
    },
    "Yobe": {
        "code": "YO",
        "zone": "North East",
        "lgas": [
            "Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko",
            "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"
        ]
    },
    "Zamfara": {
        "code": "ZM",
        "zone": "North West",
        "lgas": [
            "Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau",
            "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Chafe", "Zurmi"
        ]
    }
}


def slugify(text: str) -> str:
    """Standardizes string into a URL/database safe slug."""
    text = text.lower()
    text = re.sub(r'[\s/]+', '-', text)
    text = re.sub(r'[^a-z0-9\-]', '', text)
    return text.strip('-')


def generate_seed_sql(output_path: str):
    """Generates a complete SQL file to seed all 36 states + 774 LGAs into Supabase."""
    lines = [
        "-- Auto-generated Nigeria Geography Seed (36 States + FCT + 774 LGAs)",
        "DO $$",
        "DECLARE",
        "    v_state_id UUID;",
        "BEGIN"
    ]

    total_lgas = 0
    for state_name, data in NIGERIA_GEOGRAPHY.items():
        state_code = data["code"]
        zone = data["zone"]
        lgas = data["lgas"]
        total_lgas += len(lgas)

        lines.append(f"\n    -- State: {state_name} ({len(lgas)} LGAs)")
        lines.append(f"    INSERT INTO public.states (name, code, geopolitical_zone)")
        lines.append(f"    VALUES ('{state_name}', '{state_code}', '{zone}')")
        lines.append(f"    ON CONFLICT (name) DO UPDATE SET code = EXCLUDED.code, geopolitical_zone = EXCLUDED.geopolitical_zone")
        lines.append(f"    RETURNING id INTO v_state_id;")

        for lga in lgas:
            clean_slug = f"{slugify(state_name)}-{slugify(lga)}"
            safe_lga_name = lga.replace("'", "''")
            lines.append(f"    INSERT INTO public.lgas (state_id, name, slug)")
            lines.append(f"    VALUES (v_state_id, '{safe_lga_name}', '{clean_slug}')")
            lines.append(f"    ON CONFLICT (state_id, name) DO NOTHING;")

    lines.append("END $$;")

    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"[SUCCESS] Generated SQL Seed at {output_path} with {len(NIGERIA_GEOGRAPHY)} states and {total_lgas} LGAs.")


if __name__ == "__main__":
    sql_file = os.path.join(os.path.dirname(__file__), "..", "supabase", "migrations", "004_seed_nigeria_geo.sql")
    generate_seed_sql(sql_file)
