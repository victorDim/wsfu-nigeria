import { OfficialProfile, StateData } from '../types';

export const ALL_NIGERIAN_STATES: StateData[] = [
  {
    "id": "nat",
    "name": "Federal Republic of Nigeria (Presidency & National Assembly)",
    "code": "NAT",
    "geopolitical_zone": "Federal Government"
  },
  {
    "id": "ab",
    "name": "Abia State",
    "code": "AB",
    "geopolitical_zone": "South East"
  },
  {
    "id": "ad",
    "name": "Adamawa State",
    "code": "AD",
    "geopolitical_zone": "North East"
  },
  {
    "id": "ak",
    "name": "Akwa Ibom State",
    "code": "AK",
    "geopolitical_zone": "South South"
  },
  {
    "id": "an",
    "name": "Anambra State",
    "code": "AN",
    "geopolitical_zone": "South East"
  },
  {
    "id": "ba",
    "name": "Bauchi State",
    "code": "BA",
    "geopolitical_zone": "North East"
  },
  {
    "id": "by",
    "name": "Bayelsa State",
    "code": "BY",
    "geopolitical_zone": "South South"
  },
  {
    "id": "be",
    "name": "Benue State",
    "code": "BE",
    "geopolitical_zone": "North Central"
  },
  {
    "id": "bo",
    "name": "Borno State",
    "code": "BO",
    "geopolitical_zone": "North East"
  },
  {
    "id": "cr",
    "name": "Cross River State",
    "code": "CR",
    "geopolitical_zone": "South South"
  },
  {
    "id": "de",
    "name": "Delta State",
    "code": "DE",
    "geopolitical_zone": "South South"
  },
  {
    "id": "eb",
    "name": "Ebonyi State",
    "code": "EB",
    "geopolitical_zone": "South East"
  },
  {
    "id": "ed",
    "name": "Edo State",
    "code": "ED",
    "geopolitical_zone": "South South"
  },
  {
    "id": "ek",
    "name": "Ekiti State",
    "code": "EK",
    "geopolitical_zone": "South West"
  },
  {
    "id": "en",
    "name": "Enugu State",
    "code": "EN",
    "geopolitical_zone": "South East"
  },
  {
    "id": "fc",
    "name": "Federal Capital Territory (Abuja)",
    "code": "FC",
    "geopolitical_zone": "North Central"
  },
  {
    "id": "go",
    "name": "Gombe State",
    "code": "GO",
    "geopolitical_zone": "North East"
  },
  {
    "id": "im",
    "name": "Imo State",
    "code": "IM",
    "geopolitical_zone": "South East"
  },
  {
    "id": "ji",
    "name": "Jigawa State",
    "code": "JI",
    "geopolitical_zone": "North West"
  },
  {
    "id": "kd",
    "name": "Kaduna State",
    "code": "KD",
    "geopolitical_zone": "North West"
  },
  {
    "id": "kn",
    "name": "Kano State",
    "code": "KN",
    "geopolitical_zone": "North West"
  },
  {
    "id": "kt",
    "name": "Katsina State",
    "code": "KT",
    "geopolitical_zone": "North West"
  },
  {
    "id": "kb",
    "name": "Kebbi State",
    "code": "KB",
    "geopolitical_zone": "North West"
  },
  {
    "id": "kg",
    "name": "Kogi State",
    "code": "KG",
    "geopolitical_zone": "North Central"
  },
  {
    "id": "kw",
    "name": "Kwara State",
    "code": "KW",
    "geopolitical_zone": "North Central"
  },
  {
    "id": "la",
    "name": "Lagos State",
    "code": "LA",
    "geopolitical_zone": "South West"
  },
  {
    "id": "na",
    "name": "Nasarawa State",
    "code": "NA",
    "geopolitical_zone": "North Central"
  },
  {
    "id": "ni",
    "name": "Niger State",
    "code": "NI",
    "geopolitical_zone": "North Central"
  },
  {
    "id": "og",
    "name": "Ogun State",
    "code": "OG",
    "geopolitical_zone": "South West"
  },
  {
    "id": "on",
    "name": "Ondo State",
    "code": "ON",
    "geopolitical_zone": "South West"
  },
  {
    "id": "os",
    "name": "Osun State",
    "code": "OS",
    "geopolitical_zone": "South West"
  },
  {
    "id": "oy",
    "name": "Oyo State",
    "code": "OY",
    "geopolitical_zone": "South West"
  },
  {
    "id": "pl",
    "name": "Plateau State",
    "code": "PL",
    "geopolitical_zone": "North Central"
  },
  {
    "id": "rv",
    "name": "Rivers State",
    "code": "RV",
    "geopolitical_zone": "South South"
  },
  {
    "id": "so",
    "name": "Sokoto State",
    "code": "SO",
    "geopolitical_zone": "North West"
  },
  {
    "id": "ta",
    "name": "Taraba State",
    "code": "TA",
    "geopolitical_zone": "North East"
  },
  {
    "id": "yo",
    "name": "Yobe State",
    "code": "YO",
    "geopolitical_zone": "North East"
  },
  {
    "id": "zm",
    "name": "Zamfara State",
    "code": "ZM",
    "geopolitical_zone": "North West"
  }
];

export const NIGERIA_STATE_LGAS: Record<string, string[]> = {
  "AB": [
    "Aba North",
    "Aba South",
    "Arochukwu",
    "Bende",
    "Ikwuano",
    "Isiala Ngwa North",
    "Isiala Ngwa South",
    "Isuikwuato",
    "Obingwa",
    "Ohafia",
    "Osisioma",
    "Ugwunagbo",
    "Ukwa East",
    "Ukwa West",
    "Umuahia North",
    "Umuahia South",
    "Umu Nneochi"
  ],
  "AD": [
    "Demsa",
    "Fufore",
    "Ganye",
    "Girei",
    "Gombi",
    "Guyuk",
    "Hong",
    "Jada",
    "Lamurde",
    "Madagali",
    "Maiha",
    "Mayo Belwa",
    "Michika",
    "Mubi North",
    "Mubi South",
    "Numan",
    "Shelleng",
    "Song",
    "Toungo",
    "Yola North",
    "Yola South"
  ],
  "AK": [
    "Uyo",
    "Eket",
    "Ikot Ekpene",
    "Oron",
    "Abak",
    "Etinan",
    "Ikot Abasi",
    "Ibeno",
    "Ibiono-Ibom",
    "Ibesikpo Asutan",
    "Essien Udim",
    "Etim Ekpo",
    "Ini",
    "Itu",
    "Mbo",
    "Mkpat-Enin",
    "Nsit-Atai",
    "Nsit-Ibom",
    "Nsit-Ubium",
    "Onna",
    "Oruk Anam",
    "Ukanafun",
    "Uruan"
  ],
  "AN": [
    "Awka North",
    "Awka South",
    "Onitsha North",
    "Onitsha South",
    "Nnewi North",
    "Nnewi South",
    "Aguata",
    "Idemili North",
    "Idemili South",
    "Ihiala",
    "Ogbaru",
    "Orumba North",
    "Orumba South",
    "Oyi",
    "Dunukofia",
    "Anaocha",
    "Njikoka",
    "Ayamelum",
    "Anambra East",
    "Anambra West",
    "Ekwusigo"
  ],
  "BA": [
    "Alkaleri",
    "Bauchi",
    "Bogoro",
    "Damban",
    "Darazo",
    "Dass",
    "Gamawa",
    "Ganjuwa",
    "Giade",
    "Itas/Gadau",
    "Jama'are",
    "Katagum",
    "Kirfi",
    "Misau",
    "Ningi",
    "Shira",
    "Tafawa Balewa",
    "Toro",
    "Warji",
    "Zaki"
  ],
  "BY": [
    "Brass",
    "Ekeremor",
    "Kolokuma/Opokuma",
    "Nembe",
    "Ogbia",
    "Sagbama",
    "Southern Ijaw",
    "Yenagoa"
  ],
  "BE": [
    "Ado",
    "Agatu",
    "Apa",
    "Buruku",
    "Gboko",
    "Guma",
    "Gwer East",
    "Gwer West",
    "Katsina-Ala",
    "Konshisha",
    "Kwande",
    "Logo",
    "Makurdi",
    "Obi",
    "Ogbadibo",
    "Ohimini",
    "Oju",
    "Okpokwu",
    "Otukpo",
    "Tarka",
    "Ukum",
    "Ushongo",
    "Vandeikya"
  ],
  "BO": [
    "Maiduguri",
    "Jere",
    "Bama",
    "Gwoza",
    "Biu",
    "Hawul",
    "Askira/Uba",
    "Chibok",
    "Damboa",
    "Gubio",
    "Kaga",
    "Konduga",
    "Kukawa",
    "Mafa",
    "Magumeri",
    "Marte",
    "Mobbar",
    "Monguno",
    "Ngala",
    "Nganzai",
    "Shani"
  ],
  "CR": [
    "Abi",
    "Akamkpa",
    "Akpabuyo",
    "Bakassi",
    "Bekwarra",
    "Biase",
    "Boki",
    "Calabar Municipal",
    "Calabar South",
    "Etung",
    "Ikom",
    "Obanliku",
    "Obubra",
    "Obudu",
    "Odukpani",
    "Ogoja",
    "Yakuur",
    "Yala"
  ],
  "DE": [
    "Warri South",
    "Warri North",
    "Warri South West",
    "Sapele",
    "Ughelli North",
    "Ughelli South",
    "Uvwie",
    "Oshimili South",
    "Oshimili North",
    "Aniocha North",
    "Aniocha South",
    "Ethiope East",
    "Ethiope West",
    "Ika North East",
    "Ika South",
    "Isoko North",
    "Isoko South",
    "Ndokwa East",
    "Ndokwa West",
    "Okpe",
    "Patani",
    "Ukwuani"
  ],
  "EB": [
    "Abakaliki",
    "Afikpo North",
    "Afikpo South",
    "Ebonyi",
    "Ezza North",
    "Ezza South",
    "Ikwo",
    "Ishielu",
    "Ivo",
    "Izzi",
    "Ohaozara",
    "Ohaukwu",
    "Onicha"
  ],
  "ED": [
    "Akoko-Edo",
    "Egor",
    "Esan Central",
    "Esan North-East",
    "Esan South-East",
    "Esan West",
    "Etsako Central",
    "Etsako East",
    "Etsako West",
    "Igueben",
    "Ikpoba-Okha",
    "Oredo",
    "Orhionmwon",
    "Ovia North-East",
    "Ovia South-West",
    "Owan East",
    "Owan West",
    "Uhunmwonde"
  ],
  "EK": [
    "Ado-Ekiti",
    "Efon",
    "Ekiti East",
    "Ekiti South-West",
    "Ekiti West",
    "Emure",
    "Gbonyin",
    "Ido-Osi",
    "Ijero",
    "Ikole",
    "Ilejemeje",
    "Irepodun/Ifelodun",
    "Ise/Orun",
    "Moba",
    "Oye"
  ],
  "EN": [
    "Enugu North",
    "Enugu South",
    "Enugu East",
    "Nsukka",
    "Udi",
    "Ezeagu",
    "Awgu",
    "Aninri",
    "Oji River",
    "Igbo-Eze North",
    "Igbo-Eze South",
    "Nkanu East",
    "Nkanu West",
    "Uzo-Uwani",
    "Isi-Uzo",
    "Igbo-Etiti",
    "Udenu"
  ],
  "FC": [
    "Abaji",
    "Bwari",
    "Gwagwalada",
    "Kuje",
    "Kwali",
    "Municipal Area Council (AMAC)"
  ],
  "GO": [
    "Akko",
    "Balanga",
    "Billiri",
    "Dukku",
    "Funakaye",
    "Gombe",
    "Kaltungo",
    "Kwami",
    "Nafada",
    "Shongom",
    "Yamaltu/Deba"
  ],
  "IM": [
    "Aboh Mbaise",
    "Ahiazu Mbaise",
    "Ehime Mbano",
    "Ezinihitte",
    "Ideato North",
    "Ideato South",
    "Ihitte/Uboma",
    "Ikeduru",
    "Isiala Mbano",
    "Isu",
    "Mbaitoli",
    "Ngor Okpala",
    "Njaba",
    "Nkwerre",
    "Nwangele",
    "Obowo",
    "Oguta",
    "Ohaji/Egbema",
    "Okigwe",
    "Onuimo",
    "Orlu",
    "Orsu",
    "Oru East",
    "Oru West",
    "Owerri Municipal",
    "Owerri North",
    "Owerri West"
  ],
  "JI": [
    "Auyo",
    "Babura",
    "Biriniwa",
    "Birnin Kudu",
    "Buji",
    "Dutse",
    "Gagarawa",
    "Garki",
    "Gumel",
    "Guri",
    "Gwaram",
    "Gwiwa",
    "Hadejia",
    "Jahun",
    "Kafin Hausa",
    "Kazaure",
    "Kiri Kasama",
    "Kiyawa",
    "Maigatari",
    "Malam Madori",
    "Miga",
    "Ringim",
    "Roni",
    "Sule Tankarkar",
    "Taura",
    "Yankwashi"
  ],
  "KD": [
    "Birnin Gwari",
    "Chikun",
    "Giwa",
    "Igabi",
    "Ikara",
    "Jaba",
    "Jema'a",
    "Kachia",
    "Kaduna North",
    "Kaduna South",
    "Kagarko",
    "Kajuru",
    "Kaura",
    "Kauru",
    "Kubau",
    "Kudan",
    "Lere",
    "Makarfi",
    "Sabon Gari",
    "Sanga",
    "Soba",
    "Zangon Kataf",
    "Zaria"
  ],
  "KN": [
    "Ajingi",
    "Albasu",
    "Bagwai",
    "Bebeji",
    "Bichi",
    "Bunkure",
    "Dala",
    "Dambatta",
    "Dawakin Kudu",
    "Dawakin Tofa",
    "Doguwa",
    "Fagge",
    "Gabasawa",
    "Garko",
    "Garun Mallam",
    "Gaya",
    "Gezawa",
    "Gwale",
    "Gwarzo",
    "Kabo",
    "Kano Municipal",
    "Karaye",
    "Kibiya",
    "Kiru",
    "Kumbotso",
    "Kunchi",
    "Kura",
    "Madobi",
    "Makoda",
    "Minjibir",
    "Nasarawa",
    "Rano",
    "Rimin Gado",
    "Rogo",
    "Shanono",
    "Sumaila",
    "Takai",
    "Tarauni",
    "Tofa",
    "Tsanyawa",
    "Tudun Wada",
    "Ungogo",
    "Warawa",
    "Wudil"
  ],
  "KT": [
    "Bakori",
    "Batagarawa",
    "Batsari",
    "Baure",
    "Bindawa",
    "Charanchi",
    "Dan Musa",
    "Dandume",
    "Danja",
    "Daura",
    "Dutsin Ma",
    "Faskari",
    "Funtua",
    "Ingawa",
    "Jibia",
    "Kafur",
    "Kaita",
    "Kankara",
    "Kankia",
    "Katsina",
    "Kurfi",
    "Kusada",
    "Mai'Adua",
    "Malumfashi",
    "Mani",
    "Mashi",
    "Matazu",
    "Musawa",
    "Rimi",
    "Sabuwa",
    "Safana",
    "Sandamu",
    "Zango"
  ],
  "KB": [
    "Aleiro",
    "Arewa Dandi",
    "Argungu",
    "Augie",
    "Bagudo",
    "Birnin Kebbi",
    "Bunza",
    "Dandi",
    "Fakai",
    "Gwandu",
    "Jega",
    "Kalgo",
    "Koko/Besse",
    "Maiyama",
    "Ngaski",
    "Sakaba",
    "Shanga",
    "Suru",
    "Danko/Wasagu",
    "Yauri",
    "Zuru"
  ],
  "KG": [
    "Adavi",
    "Ajaokuta",
    "Ankpa",
    "Bassa",
    "Dekina",
    "Ibaji",
    "Idah",
    "Igalamela-Odolu",
    "Ijumu",
    "Kabba/Bunu",
    "Kogi",
    "Lokoja",
    "Mopa-Muro",
    "Ofu",
    "Ogori/Magongo",
    "Okehi",
    "Okene",
    "Olamaboro",
    "Omala",
    "Yagba East",
    "Yagba West"
  ],
  "KW": [
    "Asa",
    "Baruten",
    "Edu",
    "Ekiti",
    "Ifelodun",
    "Ilorin East",
    "Ilorin South",
    "Ilorin West",
    "Irepodun",
    "Isin",
    "Kaiama",
    "Moro",
    "Offa",
    "Oke Ero",
    "Oyun",
    "Pategi"
  ],
  "LA": [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti-Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere"
  ],
  "NA": [
    "Akwanga",
    "Awe",
    "Doma",
    "Karu",
    "Keana",
    "Keffi",
    "Kokona",
    "Lafia",
    "Nasarawa",
    "Nasarawa Egon",
    "Obi",
    "Toto",
    "Wamba"
  ],
  "NI": [
    "Agaie",
    "Agwara",
    "Bida",
    "Borgu",
    "Bosso",
    "Chanchaga",
    "Edati",
    "Gbako",
    "Gurara",
    "Katcha",
    "Kontagora",
    "Lapai",
    "Lavun",
    "Magama",
    "Mariga",
    "Mashegu",
    "Mokwa",
    "Moya",
    "Paikoro",
    "Rafi",
    "Rijau",
    "Shiroro",
    "Suleja",
    "Tafa",
    "Wushishi"
  ],
  "OG": [
    "Abeokuta North",
    "Abeokuta South",
    "Ado-Odo/Ota",
    "Ewekoro",
    "Ifo",
    "Ijebu East",
    "Ijebu North",
    "Ijebu North East",
    "Ijebu Ode",
    "Ikenne",
    "Imeko Afon",
    "Ipokia",
    "Obafemi Owode",
    "Odeda",
    "Odogbolu",
    "Ogun Waterside",
    "Remo North",
    "Shagamu",
    "Yewa North",
    "Yewa South"
  ],
  "ON": [
    "Akoko North-East",
    "Akoko North-West",
    "Akoko South-East",
    "Akoko South-West",
    "Akure North",
    "Akure South",
    "Ese Odo",
    "Idanre",
    "Ifedore",
    "Ilaje",
    "Ile Oluji/Okeigbo",
    "Irele",
    "Odigbo",
    "Okitipupa",
    "Ondo East",
    "Ondo West",
    "Ose",
    "Owo"
  ],
  "OS": [
    "Atakunmosa East",
    "Atakunmosa West",
    "Aiyedaade",
    "Aiyedire",
    "Boluwaduro",
    "Boripe",
    "Ede North",
    "Ede South",
    "Ife Central",
    "Ife East",
    "Ife North",
    "Ife South",
    "Egbedore",
    "Ejigbo",
    "Ifedayo",
    "Ifelodun",
    "Ila",
    "Ilesa East",
    "Ilesa West",
    "Irepodun",
    "Irewole",
    "Isokan",
    "Iwo",
    "Obokun",
    "Odo Otin",
    "Ola Oluwa",
    "Olorunda",
    "Oriade",
    "Orolu",
    "Osogbo"
  ],
  "OY": [
    "Afijio",
    "Akinyele",
    "Atiba",
    "Atisbo",
    "Egbeda",
    "Ibadan North",
    "Ibadan North-East",
    "Ibadan North-West",
    "Ibadan South-East",
    "Ibadan South-West",
    "Ibarapa Central",
    "Ibarapa East",
    "Ibarapa North",
    "Ido",
    "Irepo",
    "Iseyin",
    "Itesiwaju",
    "Iwajowa",
    "Ogbomosho North",
    "Ogbomosho South",
    "Ogo Oluwa",
    "Olorunsogo",
    "Oluyole",
    "Ona Ara",
    "Orelope",
    "Ori Ire",
    "Oyo East",
    "Oyo West",
    "Saki East",
    "Saki West",
    "Surulere"
  ],
  "PL": [
    "Barkin Ladi",
    "Bassa",
    "Bokkos",
    "Jos East",
    "Jos North",
    "Jos South",
    "Kanam",
    "Kanke",
    "Langtang North",
    "Langtang South",
    "Mangu",
    "Mikang",
    "Pankshin",
    "Qua'an Pan",
    "Riyom",
    "Shendam",
    "Wase"
  ],
  "RV": [
    "Abua/Odual",
    "Ahoada East",
    "Ahoada West",
    "Akuku-Toru",
    "Andoni",
    "Asari-Toru",
    "Bonny",
    "Degema",
    "Eleme",
    "Emuoha",
    "Etche",
    "Gokana",
    "Ikwerre",
    "Khana",
    "Obio/Akpor",
    "Ogba/Egbema/Ndoni",
    "Ogu/Bolo",
    "Okrika",
    "Omuma",
    "Opobo/Nkoro",
    "Oyigbo",
    "Port Harcourt",
    "Tai"
  ],
  "SO": [
    "Binji",
    "Bodinga",
    "Dange Shuni",
    "Gada",
    "Goronyo",
    "Gudu",
    "Gwadabawa",
    "Illela",
    "Isa",
    "Kebbe",
    "Kware",
    "Rabah",
    "Sabon Birni",
    "Shagari",
    "Silame",
    "Sokoto North",
    "Sokoto South",
    "Tambuwal",
    "Tangaza",
    "Tureta",
    "Wamako",
    "Wurno",
    "Yabo"
  ],
  "TA": [
    "Ardo Kola",
    "Bali",
    "Donga",
    "Gashaka",
    "Gassol",
    "Ibi",
    "Jalingo",
    "Karim Lamido",
    "Kumi",
    "Lau",
    "Sardauna",
    "Takum",
    "Ussa",
    "Wukari",
    "Yorro",
    "Zing"
  ],
  "YO": [
    "Bade",
    "Bursari",
    "Damaturu",
    "Fika",
    "Fune",
    "Geidam",
    "Gujba",
    "Gulani",
    "Jakusko",
    "Karasuwa",
    "Machina",
    "Nangere",
    "Nguru",
    "Potiskum",
    "Tarmuwa",
    "Yunusari",
    "Yusufari"
  ],
  "ZM": [
    "Anka",
    "Bakura",
    "Birnin Magaji/Kiyaw",
    "Bukkuyum",
    "Bungudu",
    "Gummi",
    "Gusau",
    "Kaura Namoda",
    "Maradun",
    "Maru",
    "Shinkafi",
    "Talata Mafara",
    "Tsafe",
    "Zurmi"
  ]
};

export const NIGERIA_DISCO_ALLOCATIONS = [
  {
    "disco": "Abuja DisCo (AEDC)",
    "coverage_states": [
      "FC",
      "NI",
      "NA",
      "KG"
    ],
    "load_mw": 591,
    "share_pct": 17.3,
    "region": "Federal Capital Territory, Niger, Nasarawa, Kogi"
  },
  {
    "disco": "Ikeja Electric (IE)",
    "coverage_states": [
      "LA"
    ],
    "load_mw": 584,
    "share_pct": 17.1,
    "region": "Lagos (Northern & Coastal areas, Ikeja, Ikorodu, Epe)"
  },
  {
    "disco": "Eko DisCo (EKEDC)",
    "coverage_states": [
      "LA"
    ],
    "load_mw": 499,
    "share_pct": 14.6,
    "region": "Lagos (Southern parts, Island, Lekki, Apapa industrial hubs) & parts of Ogun"
  },
  {
    "disco": "Ibadan DisCo (IBEDC)",
    "coverage_states": [
      "OY",
      "OG",
      "OS",
      "KW",
      "EK"
    ],
    "load_mw": 369,
    "share_pct": 10.8,
    "region": "Oyo, Ogun, Osun, Kwara, Ekiti"
  },
  {
    "disco": "Benin DisCo (BEDC)",
    "coverage_states": [
      "ED",
      "DE",
      "ON",
      "EK"
    ],
    "load_mw": 249,
    "share_pct": 7.3,
    "region": "Edo, Delta, Ondo, parts of Ekiti"
  },
  {
    "disco": "Enugu DisCo (EEDC)",
    "coverage_states": [
      "EN",
      "AB",
      "IM",
      "AN",
      "EB"
    ],
    "load_mw": 239,
    "share_pct": 7.0,
    "region": "Enugu, Abia, Imo, Anambra, Ebonyi (plus Geometric Power Aba 188MW IPP)"
  },
  {
    "disco": "Port Harcourt DisCo (PHED)",
    "coverage_states": [
      "RV",
      "BY",
      "CR",
      "AK"
    ],
    "load_mw": 215,
    "share_pct": 6.3,
    "region": "Rivers, Bayelsa, Cross River, Akwa Ibom"
  },
  {
    "disco": "Kano DisCo (KEDCO)",
    "coverage_states": [
      "KN",
      "KT",
      "JI"
    ],
    "load_mw": 208,
    "share_pct": 6.1,
    "region": "Kano, Katsina, Jigawa"
  },
  {
    "disco": "Kaduna DisCo (KAEDCO)",
    "coverage_states": [
      "KD",
      "SO",
      "KB",
      "ZM"
    ],
    "load_mw": 195,
    "share_pct": 5.7,
    "region": "Kaduna, Sokoto, Kebbi, Zamfara"
  },
  {
    "disco": "Jos DisCo (JEDC)",
    "coverage_states": [
      "PL",
      "BE",
      "BA",
      "GO"
    ],
    "load_mw": 174,
    "share_pct": 5.1,
    "region": "Plateau, Benue, Bauchi, Gombe"
  },
  {
    "disco": "Yola DisCo (YEDC)",
    "coverage_states": [
      "AD",
      "TA",
      "BO",
      "YO"
    ],
    "load_mw": 92,
    "share_pct": 2.7,
    "region": "Adamawa, Taraba, Borno, Yobe"
  }
];

export const NIGERIA_GOVERNORS_MASTER: Record<string, any> = {
  "NAT": {
    "name": "President Bola Ahmed Tinubu (GCFR)",
    "office_title": "President of the Federal Republic of Nigeria",
    "role": "president",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bola_Tinubu_portrait.jpg/440px-Bola_Tinubu_portrait.jpg",
    "initials": "BT",
    "school": "Richard J. Daley College, Chicago, Illinois, USA",
    "uni": "Chicago State University, USA (B.Sc Accounting, Magna Cum Laude)",
    "past": "Executive Governor of Lagos State (1999\u20132007) & Senator representing Lagos West (1992\u20131993)",
    "bio": "President and Commander-in-Chief of the Armed Forces of the Federal Republic of Nigeria leading the Renewed Hope agenda across national infrastructure, security, and economic reforms.",
    "citizen_rating": {
      "overall_score": 1.8,
      "approval_pct": 36,
      "total_votes": 48500,
      "breakdown": {
        "infrastructure": 2.6,
        "economy": 1.4,
        "transparency": 1.8,
        "security_or_education": 1.7
      }
    },
    "quality_of_life": {
      "score": 72,
      "rating_label": "Improving",
      "clean_water_pct": 72,
      "daily_power_hours": 15,
      "paved_roads_pct": 70,
      "primary_healthcare_access": "1 Facility per 3,800 Citizens",
      "public_school_quality": "82% Literacy Rate",
      "youth_unemployment_pct": 18.2,
      "security_safety_score": 7.8
    },
    "promises": [
      {
        "id": "p-nat-1",
        "title": "700km Lagos-Calabar 10-Lane Coastal Highway Construction",
        "category": "Infrastructure",
        "description": "Construction of the historic 700km multi-lane coastal arterial expressway linking 9 coastal states.",
        "status": "in_progress",
        "date_made": "2024-03-15",
        "budget_allocated": "\u20a615.6 Trillion (Hitech Construction)",
        "progress_pct": 35,
        "milestones": [
          "Section 1 (47.4km Ahmadu Bello to Eleko) Paved with Crushed Concrete",
          "Environmental Impact Clearance Ratified"
        ],
        "evidence_url": "https://punchng.com"
      },
      {
        "id": "p-nat-2",
        "title": "1,068km Sokoto-Badagry Trans-Sahara Superhighway",
        "category": "Infrastructure",
        "description": "Construction of the trans-national trade highway connecting Sokoto, Kebbi, Niger, Kwara, Oyo, Ogun, and Lagos.",
        "status": "in_progress",
        "date_made": "2024-05-29",
        "budget_allocated": "\u20a613.1 Trillion",
        "progress_pct": 20,
        "milestones": [
          "Section 1 Groundbreaking in Sokoto Commissioned",
          "Procurement Framework Approved by FEC"
        ],
        "evidence_url": "https://premiumtimesng.com"
      },
      {
        "id": "p-nat-3",
        "title": "Establishment of Nigerian Education Loan Fund (NELFUND)",
        "category": "Education",
        "description": "Enactment of the Access to Higher Education Act providing interest-free tuition loans and \u20a620,000 monthly upkeep stipends.",
        "status": "fulfilled",
        "date_made": "2023-06-12",
        "budget_allocated": "\u20a650 Billion Initial Capitalization",
        "progress_pct": 100,
        "milestones": [
          "Over \u20a610.5 Billion Disbursed to 85,000+ Undergraduates in 40 Universities",
          "Monthly Stipends Live for Verified Students"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-nat-4",
        "title": "Enactment of \u20a670,000 National Minimum Wage Act",
        "category": "Economy",
        "description": "Tripartite negotiation and legislative enactment of \u20a670,000 national minimum baseline wage with 3-year review cycles.",
        "status": "fulfilled",
        "date_made": "2024-07-18",
        "budget_allocated": "Federal Budget Appropriation",
        "progress_pct": 100,
        "milestones": [
          "Passed by Senate and House of Representatives",
          "Signed into Law by the President"
        ],
        "evidence_url": "https://punchng.com"
      },
      {
        "id": "p-nat-5",
        "title": "Presidential Compressed Natural Gas (Pi-CNG) Mass Transit Initiative",
        "category": "Infrastructure",
        "description": "Deployment of commercial CNG buses, tricycles, and conversion kits to reduce commuter transportation costs by 50%.",
        "status": "in_progress",
        "date_made": "2023-10-01",
        "budget_allocated": "\u20a6100 Billion",
        "progress_pct": 65,
        "milestones": [
          "Over 1,000 CNG Commercial Buses & Tricycles Distributed Across 6 Geopolitical Zones",
          "Free Vehicle Conversion Centers Opened"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "AB": {
    "name": "Dr. Alex Chioma Otti (OFR)",
    "office_title": "Executive Governor of Abia State",
    "role": "governor",
    "party": "Labour Party (LP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Alex_Otti.jpg/440px-Alex_Otti.jpg",
    "initials": "AO",
    "school": "Ngwa High School, Aba & Secondary Technical School Okpuala Ngwa",
    "uni": "University of Port Harcourt (1st Class Economics) & UNILAG MBA",
    "past": "Group Managing Director / CEO of Diamond Bank Plc & Executive Director First Bank",
    "bio": "Economist, seasoned investment banker, and Governor of Abia State leading commercial and urban infrastructure renewal in Aba and Umuahia.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 92,
      "total_votes": 22400,
      "breakdown": {
        "infrastructure": 4.8,
        "economy": 4.6,
        "transparency": 4.7,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 78,
      "rating_label": "Improving",
      "clean_water_pct": 85,
      "daily_power_hours": 17,
      "paved_roads_pct": 76,
      "primary_healthcare_access": "1 Clinic per 3,500 Citizens",
      "public_school_quality": "91% Literacy Rate",
      "youth_unemployment_pct": 14.5,
      "security_safety_score": 8.5
    },
    "promises": [
      {
        "id": "p-ab-1",
        "title": "Reconstruction & Expansion of 6-Lane Port Harcourt Road Aba",
        "category": "Infrastructure",
        "description": "Complete dualization of the commercial economic artery with deep underground stormwater tunnels.",
        "status": "in_progress",
        "date_made": "2023-04-10",
        "budget_allocated": "\u20a630 Billion (Julius Berger)",
        "progress_pct": 85,
        "milestones": [
          "Underground Drains Completed",
          "Asphalt Binder Layer Laid on 5.5km"
        ],
        "evidence_url": "https://punchng.com"
      },
      {
        "id": "p-ab-2",
        "title": "Operationalization of 188MW Geometric Power Aba Island Grid",
        "category": "Economy",
        "description": "Activation of the dedicated Aba IPP island grid supplying uninterrupted electricity to 9 commercial LGAs.",
        "status": "fulfilled",
        "date_made": "2023-05-29",
        "budget_allocated": "$800M Private-Public Partnership",
        "progress_pct": 100,
        "milestones": [
          "Dedicated Gas Pipeline Pressurized",
          "24/7 Power Delivered to Industrial Clusters"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-ab-3",
        "title": "Clearance of 10-Year Legacy Pension and Gratuity Arrears",
        "category": "Governance",
        "description": "Biometric verification and complete settlement of pension arrears owed to 12,500 state retirees.",
        "status": "fulfilled",
        "date_made": "2023-06-01",
        "budget_allocated": "\u20a69.8 Billion",
        "progress_pct": 100,
        "milestones": [
          "12,500 Verified Retirees Credited in Full",
          "Monthly Pensions Paid Concurrently with Salaries"
        ],
        "evidence_url": "https://premiumtimesng.com"
      }
    ]
  },
  "AD": {
    "name": "Rt. Hon. Ahmadu Umaru Fintiri",
    "office_title": "Executive Governor of Adamawa State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Ahmadu_Umaru_Fintiri.jpg/440px-Ahmadu_Umaru_Fintiri.jpg",
    "initials": "AF",
    "school": "Government Secondary School, Michika",
    "uni": "University of Maiduguri (B.A. History)",
    "past": "Speaker of the Adamawa State House of Assembly & Acting Governor",
    "bio": "Veteran legislator and two-term Governor of Adamawa State noted for urban flyovers in Yola and statewide free education policies.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 87,
      "total_votes": 17800,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 73,
      "rating_label": "Improving",
      "clean_water_pct": 49,
      "daily_power_hours": 11,
      "paved_roads_pct": 71,
      "primary_healthcare_access": "1 Clinic per 4,200 Citizens",
      "public_school_quality": "84% Literacy Rate",
      "youth_unemployment_pct": 17.8,
      "security_safety_score": 8.0
    },
    "promises": [
      {
        "id": "p-ad-1",
        "title": "Construction of Yola Town Interchange Flyovers & Super-highways",
        "category": "Infrastructure",
        "description": "Construction of modern overhead flyovers and dual carriageways easing transit across Yola metropolis.",
        "status": "fulfilled",
        "date_made": "2022-05-10",
        "budget_allocated": "\u20a612 Billion",
        "progress_pct": 100,
        "milestones": [
          "Total Crossway Flyovers Commissioned and Operational"
        ],
        "evidence_url": "https://punchng.com"
      },
      {
        "id": "p-ad-2",
        "title": "Statewide Free Basic Education and WAEC/NECO Examination Sponsorship",
        "category": "Education",
        "description": "Zero tuition fees and full government payment of secondary school graduation exam fees for public school pupils.",
        "status": "fulfilled",
        "date_made": "2023-06-15",
        "budget_allocated": "\u20a62.4 Billion",
        "progress_pct": 100,
        "milestones": [
          "Over 35,000 Candidates Paid in Full Annually"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "AK": {
    "name": "Pastor Umo Bassey Eno",
    "office_title": "Executive Governor of Akwa Ibom State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Umo_Eno.jpg/440px-Umo_Eno.jpg",
    "initials": "UE",
    "school": "St. Francis Secondary School, Ikot Ataku",
    "uni": "University of Uyo (B.Sc & M.Sc Public Administration)",
    "past": "Honourable Commissioner for Lands & Water Resources, Akwa Ibom State",
    "bio": "Entrepreneur, cleric, and Governor of Akwa Ibom State executing the ARISE agenda for agricultural industrialization and rural road connectivity.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 89,
      "total_votes": 24200,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.5,
        "transparency": 4.5,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 77,
      "rating_label": "Improving",
      "clean_water_pct": 84,
      "daily_power_hours": 16,
      "paved_roads_pct": 77,
      "primary_healthcare_access": "1 Clinic per 3,500 Citizens",
      "public_school_quality": "91% Literacy Rate",
      "youth_unemployment_pct": 15.0,
      "security_safety_score": 8.5
    },
    "promises": [
      {
        "id": "p-ak-1",
        "title": "Establishment of Ibom Model Farm & Bulk Purchase Agency",
        "category": "Economy",
        "description": "Statewide bulk purchase agency distributing essential grains and staples at subsidized rates to curb food inflation across 31 LGAs.",
        "status": "fulfilled",
        "date_made": "2023-09-01",
        "budget_allocated": "\u20a615 Billion",
        "progress_pct": 100,
        "milestones": [
          "Agency Operating Across All 31 LGAs",
          "Direct Food Redemption Centers Live"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-ak-2",
        "title": "Expansion of Victor Attah International Airport Terminal 2 & MRO Hangar",
        "category": "Infrastructure",
        "description": "Commercial activation of state-of-the-art international terminal and aircraft maintenance hangar.",
        "status": "in_progress",
        "date_made": "2023-10-12",
        "budget_allocated": "\u20a622 Billion",
        "progress_pct": 85,
        "milestones": [
          "Terminal 2 Civil Works 90% Completed",
          "MRO Hangar Flight Certification Active"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "AN": {
    "name": "Prof. Charles Chukwuma Soludo (CFR)",
    "office_title": "Executive Governor of Anambra State",
    "role": "governor",
    "party": "All Progressives Grand Alliance (APGA)",
    "term_period": "March 2022 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Charles_Chukwuma_Soludo.jpg/440px-Charles_Chukwuma_Soludo.jpg",
    "initials": "CS",
    "school": "Uga Boys High School, Anambra",
    "uni": "University of Nigeria Nsukka (1st Class Economics & Ph.D)",
    "past": "Governor of the Central Bank of Nigeria (2004\u20132009) & Chief Economic Adviser to the President",
    "bio": "World Bank consultant, Professor of Economics, and Governor of Anambra State driving the liveable and prosperous megacity vision.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 89,
      "total_votes": 21300,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.5,
        "transparency": 4.6,
        "security_or_education": 4.8
      }
    },
    "quality_of_life": {
      "score": 77,
      "rating_label": "Improving",
      "clean_water_pct": 93,
      "daily_power_hours": 15,
      "paved_roads_pct": 75,
      "primary_healthcare_access": "1 Clinic per 3,400 Citizens",
      "public_school_quality": "92% Literacy Rate",
      "youth_unemployment_pct": 14.8,
      "security_safety_score": 8.4
    },
    "promises": [
      {
        "id": "p-an-1",
        "title": "Merit-Based Recruitment of 5,000 Verified Public Teachers & Free Education",
        "category": "Education",
        "description": "Merit employment of 5,000 qualified teachers with free primary and junior secondary education across public schools.",
        "status": "fulfilled",
        "date_made": "2022-03-17",
        "budget_allocated": "\u20a612 Billion",
        "progress_pct": 100,
        "milestones": [
          "5,000 Teachers Deployed",
          "Zero Tuition Fee Enforced in Public Schools"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-an-2",
        "title": "Okpoko Slum Urban Regeneration & Dualized Road Corridors",
        "category": "Infrastructure",
        "description": "Transformation of the dense Okpoko community with 12km asphalt roads, pipe-borne water, and solar streetlights.",
        "status": "fulfilled",
        "date_made": "2022-03-18",
        "budget_allocated": "\u20a618 Billion",
        "progress_pct": 100,
        "milestones": [
          "12km Dual Carriage Asphalt Roads Commissioned",
          "Potable Piped Water and General Hospital Operational"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "BA": {
    "name": "Senator Bala Mohammed (Kauran Bauchi)",
    "office_title": "Executive Governor of Bauchi State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bala_Mohammed.jpg/440px-Bala_Mohammed.jpg",
    "initials": "BM",
    "school": "Government Secondary School, Bauchi",
    "uni": "University of Maiduguri (B.A. English)",
    "past": "Honourable Minister of the Federal Capital Territory (2010\u20132015) & Senator representing Bauchi South",
    "bio": "Administrator, former Federal Minister, and two-term Governor of Bauchi State expanding urban waterworks and township road networks.",
    "citizen_rating": {
      "overall_score": 4.3,
      "approval_pct": 85,
      "total_votes": 16900,
      "breakdown": {
        "infrastructure": 4.5,
        "economy": 4.2,
        "transparency": 4.3,
        "security_or_education": 4.4
      }
    },
    "quality_of_life": {
      "score": 72,
      "rating_label": "Improving",
      "clean_water_pct": 68,
      "daily_power_hours": 12,
      "paved_roads_pct": 69,
      "primary_healthcare_access": "1 Clinic per 4,300 Citizens",
      "public_school_quality": "83% Literacy Rate",
      "youth_unemployment_pct": 18.0,
      "security_safety_score": 8.1
    },
    "promises": [
      {
        "id": "p-ba-1",
        "title": "Revitalization of Bauchi Urban Water Treatment Scheme",
        "category": "Infrastructure",
        "description": "Overhaul of Gubi Dam Treatment Plant pumping 60 million litres of potable water daily to Bauchi metropolis.",
        "status": "fulfilled",
        "date_made": "2021-08-15",
        "budget_allocated": "\u20a625 Billion World Bank Co-Funded",
        "progress_pct": 100,
        "milestones": [
          "Gubi Dam Water Treatment Complex Commissioned"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "BY": {
    "name": "Senator Douye Diri",
    "office_title": "Executive Governor of Bayelsa State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "February 2020 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Douye_Diri.jpg/440px-Douye_Diri.jpg",
    "initials": "DD",
    "school": "Government Secondary School, Odi",
    "uni": "University of Port Harcourt (B.Ed Political Science)",
    "past": "Senator representing Bayelsa Central (2019\u20132020) & Member House of Representatives",
    "bio": "Educator and two-term Governor of Bayelsa State driving the prosperity agenda and connecting maritime riverine communities by bridges.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 86,
      "total_votes": 15800,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 73,
      "rating_label": "Improving",
      "clean_water_pct": 68,
      "daily_power_hours": 14,
      "paved_roads_pct": 70,
      "primary_healthcare_access": "1 Clinic per 3,900 Citizens",
      "public_school_quality": "88% Literacy Rate",
      "youth_unemployment_pct": 17.0,
      "security_safety_score": 8.2
    },
    "promises": [
      {
        "id": "p-by-1",
        "title": "Nembe-Brass Coastal Arterial Highway & Marine Bridges",
        "category": "Infrastructure",
        "description": "Construction of high-impact coastal highway connecting the Brass oil terminal and Island communities to the mainland.",
        "status": "in_progress",
        "date_made": "2023-04-12",
        "budget_allocated": "\u20a654 Billion",
        "progress_pct": 60,
        "milestones": [
          "First 15km Sandfilled and Piled over Swamp Corridors"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "BE": {
    "name": "Rev. Fr. Dr. Hyacinth Iormem Alia",
    "office_title": "Executive Governor of Benue State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Hyacinth_Alia.jpg/440px-Hyacinth_Alia.jpg",
    "initials": "HA",
    "school": "St. James Junior Seminary, Makurdi",
    "uni": "St. Augustine Major Seminary Jos (B.Th) & Fordham University New York (Ph.D)",
    "past": "Catholic Priest & Director of Pastoral Services, Catholic Diocese of Gboko",
    "bio": "Cleric, educationist, and Governor of Benue State prioritizing timely salary disbursements, urban drainage, and food basket security.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 91,
      "total_votes": 26500,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.6,
        "transparency": 4.8,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 75,
      "rating_label": "Improving",
      "clean_water_pct": 62,
      "daily_power_hours": 12,
      "paved_roads_pct": 72,
      "primary_healthcare_access": "1 Clinic per 3,800 Citizens",
      "public_school_quality": "87% Literacy Rate",
      "youth_unemployment_pct": 16.2,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-be-1",
        "title": "Prompt 25th of Every Month State Salary & Pension Payments",
        "category": "Governance",
        "description": "Guaranteed prompt 25th monthly salary and pension disbursements with continuous clearance of legacy wage arrears.",
        "status": "fulfilled",
        "date_made": "2023-05-29",
        "budget_allocated": "\u20a610 Billion / mo",
        "progress_pct": 100,
        "milestones": [
          "All State & LGA Civil Servants Paid Consistently on 25th"
        ],
        "evidence_url": "https://premiumtimesng.com"
      },
      {
        "id": "p-be-2",
        "title": "Construction of High-Capacity Urban Stormwater Tunnels in Makurdi",
        "category": "Infrastructure",
        "description": "Underground stormwater management to permanently eliminate perennial flooding in Makurdi capital city.",
        "status": "fulfilled",
        "date_made": "2023-08-10",
        "budget_allocated": "\u20a614 Billion",
        "progress_pct": 100,
        "milestones": [
          "Major Makurdi Township Drainage Channels Completed"
        ],
        "evidence_url": "https://thecable.ng"
      }
    ]
  },
  "BO": {
    "name": "Prof. Babagana Umara Zulum (CON)",
    "office_title": "Executive Governor of Borno State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Babagana_Umara_Zulum.jpg/440px-Babagana_Umara_Zulum.jpg",
    "initials": "BZ",
    "school": "Government Secondary School, Gwoza",
    "uni": "University of Maiduguri (B.Agric Eng) & University of Ibadan (Ph.D)",
    "past": "Honourable Commissioner for Reconstruction, Rehabilitation & Resettlement (RRR)",
    "bio": "Professor of Agricultural Engineering and Governor of Borno State leading post-conflict recovery, vocational megaschools, and resettlement.",
    "citizen_rating": {
      "overall_score": 4.8,
      "approval_pct": 95,
      "total_votes": 41200,
      "breakdown": {
        "infrastructure": 4.9,
        "economy": 4.7,
        "transparency": 4.9,
        "security_or_education": 4.9
      }
    },
    "quality_of_life": {
      "score": 76,
      "rating_label": "Improving",
      "clean_water_pct": 64,
      "daily_power_hours": 12,
      "paved_roads_pct": 74,
      "primary_healthcare_access": "1 Clinic per 3,600 Citizens",
      "public_school_quality": "84% Literacy Rate",
      "youth_unemployment_pct": 15.5,
      "security_safety_score": 8.6
    },
    "promises": [
      {
        "id": "p-bo-1",
        "title": "Resettlement of 100,000 Displaced Citizens in 5,000 Concrete Housing Units",
        "category": "Security",
        "description": "Construction of modern concrete homes with water, clinic, and schools restoring IDPs to ancestral communities.",
        "status": "fulfilled",
        "date_made": "2023-06-01",
        "budget_allocated": "\u20a622 Billion",
        "progress_pct": 100,
        "milestones": [
          "5,000 Housing Units Handed Over in Bama and Guzamala"
        ],
        "evidence_url": "https://dailytrust.com"
      },
      {
        "id": "p-bo-2",
        "title": "Maiduguri Mega Solar Independent Power Microgrid",
        "category": "Infrastructure",
        "description": "Dedicated solar power grid restoring 24-hour electricity to Maiduguri commercial and hospital facilities.",
        "status": "fulfilled",
        "date_made": "2023-09-12",
        "budget_allocated": "\u20a615 Billion",
        "progress_pct": 100,
        "milestones": [
          "Commercial Solar Microgrid Operational"
        ],
        "evidence_url": "https://thecable.ng"
      }
    ]
  },
  "CR": {
    "name": "Senator Prince Bassey Edet Otu",
    "office_title": "Executive Governor of Cross River State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bassey_Otu.jpg/440px-Bassey_Otu.jpg",
    "initials": "BO",
    "school": "Duke Town Secondary School, Calabar",
    "uni": "University of Calabar (UNICAL - B.Sc Social Sciences)",
    "past": "Senator representing Cross River South (2011\u20132015) & Member House of Representatives",
    "bio": "Lawmaker and Governor of Cross River State executing the People First governance blueprint focusing on agriculture and tourism revitalization.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 87,
      "total_votes": 18200,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 74,
      "rating_label": "Improving",
      "clean_water_pct": 56,
      "daily_power_hours": 13,
      "paved_roads_pct": 73,
      "primary_healthcare_access": "1 Clinic per 3,900 Citizens",
      "public_school_quality": "89% Literacy Rate",
      "youth_unemployment_pct": 16.5,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-cr-1",
        "title": "Full Rehabilitation of Calabar Urban Metropolis Road Network",
        "category": "Infrastructure",
        "description": "Complete asphalt resurfacing, pothole remediation, and solar streetlighting across Calabar Municipal and South.",
        "status": "fulfilled",
        "date_made": "2023-07-20",
        "budget_allocated": "\u20a69 Billion",
        "progress_pct": 100,
        "milestones": [
          "Over 35 Urban Corridors Resurfaced in Calabar"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "DE": {
    "name": "Rt. Hon. Sheriff Oborevwori",
    "office_title": "Executive Governor of Delta State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Sheriff_Oborevwori.jpg/440px-Sheriff_Oborevwori.jpg",
    "initials": "SO",
    "school": "Alegbo Secondary School, Effurun",
    "uni": "Ambrose Alli University (B.Sc Political Science) & Delta State University (M.Sc)",
    "past": "Speaker of the Delta State House of Assembly (2017\u20132023)",
    "bio": "Political scientist and Governor of Delta State advancing the MORE (Meaningful Development, Opportunities, Realistic Reforms, Enhanced Peace) agenda.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 86,
      "total_votes": 25100,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 75,
      "rating_label": "Improving",
      "clean_water_pct": 86,
      "daily_power_hours": 15,
      "paved_roads_pct": 75,
      "primary_healthcare_access": "1 Clinic per 3,700 Citizens",
      "public_school_quality": "90% Literacy Rate",
      "youth_unemployment_pct": 15.8,
      "security_safety_score": 8.2
    },
    "promises": [
      {
        "id": "p-de-1",
        "title": "Construction of 3 Flyovers and Cloverleaf Interchanges in Warri/Effurun",
        "category": "Infrastructure",
        "description": "Massive flyover bridges at DSC Roundabout, PTI Junction, and Enerhen Junction to decongest commercial hub.",
        "status": "in_progress",
        "date_made": "2023-10-18",
        "budget_allocated": "\u20a678 Billion (Julius Berger)",
        "progress_pct": 65,
        "milestones": [
          "Piling Foundation Completed at DSC Roundabout",
          "Piers Cast at PTI Junction"
        ],
        "evidence_url": "https://thecable.ng"
      }
    ]
  },
  "EB": {
    "name": "Rt. Hon. Francis Ogbonna Nwifuru",
    "office_title": "Executive Governor of Ebonyi State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Francis_Nwifuru.jpg/440px-Francis_Nwifuru.jpg",
    "initials": "FN",
    "school": "Community Secondary School, Ndufu-Alike",
    "uni": "Ebonyi State University (LL.B Bachelor of Laws)",
    "past": "Speaker of the Ebonyi State House of Assembly (2015\u20132023)",
    "bio": "Lawyer and Governor of Ebonyi State implementing the People's Charter of Needs on healthcare, clean water, and educational scholarships.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 89,
      "total_votes": 19400,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.4,
        "transparency": 4.7,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 74,
      "rating_label": "Improving",
      "clean_water_pct": 40,
      "daily_power_hours": 11,
      "paved_roads_pct": 74,
      "primary_healthcare_access": "1 Clinic per 3,800 Citizens",
      "public_school_quality": "88% Literacy Rate",
      "youth_unemployment_pct": 16.0,
      "security_safety_score": 8.4
    },
    "promises": [
      {
        "id": "p-eb-1",
        "title": "\u20a6100,000 State Civil Service Wage Award & Clearance of Gratuity Backlog",
        "category": "Governance",
        "description": "Payment of \u20a6100,000 bonus to civil servants and clearance of verified retired workers' gratuity arrears.",
        "status": "fulfilled",
        "date_made": "2023-12-05",
        "budget_allocated": "\u20a65.5 Billion",
        "progress_pct": 100,
        "milestones": [
          "All Verified Civil Servants and Retirees Credited"
        ],
        "evidence_url": "https://premiumtimesng.com"
      }
    ]
  },
  "ED": {
    "name": "Senator Monday Okpebholo",
    "office_title": "Executive Governor of Edo State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "November 2024 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Monday_Okpebholo.jpg/440px-Monday_Okpebholo.jpg",
    "initials": "MO",
    "school": "Udomi Community Secondary School, Esan Central",
    "uni": "University of Abuja (B.Sc Business Administration & M.Sc)",
    "past": "Senator representing Edo Central Senatorial District (2023\u20132024)",
    "bio": "Businessman and Governor of Edo State championing security, agricultural credit, and road pavement across Edo South, Central, and North.",
    "citizen_rating": {
      "overall_score": 4.3,
      "approval_pct": 85,
      "total_votes": 21800,
      "breakdown": {
        "infrastructure": 4.5,
        "economy": 4.2,
        "transparency": 4.3,
        "security_or_education": 4.4
      }
    },
    "quality_of_life": {
      "score": 75,
      "rating_label": "Improving",
      "clean_water_pct": 89,
      "daily_power_hours": 16,
      "paved_roads_pct": 74,
      "primary_healthcare_access": "1 Clinic per 3,700 Citizens",
      "public_school_quality": "91% Literacy Rate",
      "youth_unemployment_pct": 15.8,
      "security_safety_score": 8.2
    },
    "promises": [
      {
        "id": "p-ed-1",
        "title": "Emergency Reconstruction of Benin-Auchi-Ekpoma Highway Corridors",
        "category": "Infrastructure",
        "description": "Emergency road rehabilitation removing perennial bottlenecks along the busy Benin-Auchi corridor.",
        "status": "in_progress",
        "date_made": "2024-11-15",
        "budget_allocated": "\u20a620 Billion",
        "progress_pct": 50,
        "milestones": [
          "Emergency Asphalt Paving Mobilized on Ekpoma Axis"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "EK": {
    "name": "Biodun Abayomi Oyebanji",
    "office_title": "Executive Governor of Ekiti State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "October 2022 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Biodun_Oyebanji.jpg/440px-Biodun_Oyebanji.jpg",
    "initials": "BO",
    "school": "Ado Grammar School, Ado-Ekiti",
    "uni": "Ondo State University (B.Sc Political Science) & University of Ibadan (M.Sc)",
    "past": "Secretary to the State Government (SSG) & Chief of Staff to the Governor",
    "bio": "Academic and Governor of Ekiti State focused on shared prosperity, youth agribusiness, and rural infrastructure.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 90,
      "total_votes": 18700,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.4,
        "transparency": 4.7,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 76,
      "rating_label": "Improving",
      "clean_water_pct": 88,
      "daily_power_hours": 14,
      "paved_roads_pct": 75,
      "primary_healthcare_access": "1 Clinic per 3,500 Citizens",
      "public_school_quality": "93% Literacy Rate",
      "youth_unemployment_pct": 15.0,
      "security_safety_score": 8.5
    },
    "promises": [
      {
        "id": "p-ek-1",
        "title": "Revitalization of Ikogosi Warm Springs & Ekiti Knowledge Zone",
        "category": "Economy",
        "description": "Commercial concession of Ikogosi Warm Springs into a world-class resort and tech innovation hub.",
        "status": "fulfilled",
        "date_made": "2023-03-15",
        "budget_allocated": "\u20a610 Billion PPP",
        "progress_pct": 100,
        "milestones": [
          "Ikogosi Resort Fully Concessioned & Generating Commercial Revenue"
        ],
        "evidence_url": "https://thecable.ng"
      }
    ]
  },
  "EN": {
    "name": "Dr. Peter Ndubuisi Mbah",
    "office_title": "Executive Governor of Enugu State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Peter_Mbah.jpg/440px-Peter_Mbah.jpg",
    "initials": "PM",
    "school": "Owode High School, Lagos",
    "uni": "University of East London, UK (LL.B Honours), BL & IESE Business School Barcelona",
    "past": "Chief Executive Officer of Pinnacle Oil and Gas Ltd & Chief of Staff to the Governor",
    "bio": "Maritime energy entrepreneur and Governor of Enugu State driving disruptive economic transformation, 260 smart model schools, and pipe-borne water across Enugu.",
    "citizen_rating": {
      "overall_score": 4.7,
      "approval_pct": 94,
      "total_votes": 38400,
      "breakdown": {
        "infrastructure": 4.9,
        "economy": 4.7,
        "transparency": 4.8,
        "security_or_education": 4.9
      }
    },
    "quality_of_life": {
      "score": 79,
      "rating_label": "Improving",
      "clean_water_pct": 66,
      "daily_power_hours": 14,
      "paved_roads_pct": 77,
      "primary_healthcare_access": "1 Clinic per 3,400 Citizens",
      "public_school_quality": "92% Literacy Rate",
      "youth_unemployment_pct": 14.2,
      "security_safety_score": 8.7
    },
    "promises": [
      {
        "id": "p-en-1",
        "title": "Provision of 120 Million Litres of Potable Water Daily to Enugu Metropolis",
        "category": "Infrastructure",
        "description": "Revitalization of 9th Mile Crash Programme, Oji River, and Ajali Waterworks delivering 120M litres of clean water per day.",
        "status": "fulfilled",
        "date_made": "2023-05-29",
        "budget_allocated": "\u20a625 Billion",
        "progress_pct": 100,
        "milestones": [
          "9th Mile Ultra-Modern Solar Water Complex Commissioned",
          "Water Flowing to Wards Across Independence Layout, Abakpa & New Haven"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-en-2",
        "title": "Construction of 260 Smart Green Model Schools with Robotics Labs",
        "category": "Education",
        "description": "Building 260 digitized green model primary/secondary schools across every electoral ward in Enugu State.",
        "status": "in_progress",
        "date_made": "2023-09-10",
        "budget_allocated": "\u20a665 Billion (33% of Total State Budget)",
        "progress_pct": 80,
        "milestones": [
          "Over 130 Smart Schools Roofed and Fitted with Solar Power",
          "Robotics & AI Interactive Curricula Active"
        ],
        "evidence_url": "https://punchng.com"
      },
      {
        "id": "p-en-3",
        "title": "Enugu Command & Control Center and Distress Response Squad (DRS)",
        "category": "Security",
        "description": "Statewide CCTV surveillance network and Distress Response Squad with 100+ high-mobility patrol vehicles.",
        "status": "fulfilled",
        "date_made": "2023-06-15",
        "budget_allocated": "\u20a612 Billion",
        "progress_pct": 100,
        "milestones": [
          "Command & Control Center Commissioned with AI Facial Cameras",
          "DRS Rapid Intervention Live"
        ],
        "evidence_url": "https://premiumtimesng.com"
      }
    ]
  },
  "FC": {
    "name": "Barr. Ezenwo Nyesom Wike (CON)",
    "office_title": "Honourable Minister of the Federal Capital Territory",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP) / Federal Cabinet",
    "term_period": "August 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Nyesom_Wike.jpg/440px-Nyesom_Wike.jpg",
    "initials": "NW",
    "school": "Government Secondary School, Eneka",
    "uni": "Rivers State University of Science and Technology (LL.B Honours) & BL",
    "past": "Two-Term Governor of Rivers State (2015\u20132023) & Minister of State for Education",
    "bio": "Minister of the Federal Capital Territory executing rapid arterial road expansions, commercial rail activation, and infrastructure revitalization in Abuja.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 91,
      "total_votes": 33200,
      "breakdown": {
        "infrastructure": 4.9,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.4
      }
    },
    "quality_of_life": {
      "score": 81,
      "rating_label": "High",
      "clean_water_pct": 96,
      "daily_power_hours": 18,
      "paved_roads_pct": 84,
      "primary_healthcare_access": "1 Clinic per 2,900 Citizens",
      "public_school_quality": "94% Literacy Rate",
      "youth_unemployment_pct": 13.8,
      "security_safety_score": 8.5
    },
    "promises": [
      {
        "id": "p-fc-1",
        "title": "Commercial Passenger Activation of Abuja Metro Rail (Lot 1A & 3)",
        "category": "Infrastructure",
        "description": "Refurbishment and commercial activation of 12 metro rail stations connecting Abuja Central Business District to Nnamdi Azikiwe International Airport.",
        "status": "fulfilled",
        "date_made": "2023-09-01",
        "budget_allocated": "$820 Million",
        "progress_pct": 100,
        "milestones": [
          "Free Commuter Operations Commissioned by President Tinubu",
          "Daily Scheduled Train Service Live"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-fc-2",
        "title": "Completion of Southern Parkway and Outer Southern Expressway",
        "category": "Infrastructure",
        "description": "Construction of major 10-lane expressway corridors linking the National Christian Centre, Ring Road 1, and Villa axis.",
        "status": "fulfilled",
        "date_made": "2023-10-15",
        "budget_allocated": "\u20a635 Billion",
        "progress_pct": 100,
        "milestones": [
          "Southern Parkway 100% Paved with Streetlights Commissioned"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "GO": {
    "name": "Muhammadu Inuwa Yahaya (CON)",
    "office_title": "Executive Governor of Gombe State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Inuwa_Yahaya.jpg/440px-Inuwa_Yahaya.jpg",
    "initials": "IY",
    "school": "Central Primary School & Government Science Secondary School, Gombe",
    "uni": "Ahmadu Bello University (ABU Zaria - B.Sc Accounting)",
    "past": "Chairman of the Northern Governors' Forum & Commissioner for Finance",
    "bio": "Accountant and two-term Governor of Gombe State driving the DEVAGOM 10-year development agenda and the 1,000-hectare Dadin Kowa Industrial Park.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 88,
      "total_votes": 20400,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.5,
        "transparency": 4.5,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 74,
      "rating_label": "Improving",
      "clean_water_pct": 57,
      "daily_power_hours": 13,
      "paved_roads_pct": 73,
      "primary_healthcare_access": "1 Clinic per 4,000 Citizens",
      "public_school_quality": "84% Literacy Rate",
      "youth_unemployment_pct": 16.8,
      "security_safety_score": 8.4
    },
    "promises": [
      {
        "id": "p-go-1",
        "title": "Construction of 1,000-Hectare Mega Industrial Park in Dadin Kowa",
        "category": "Economy",
        "description": "Multi-billion Naira industrial park with dedicated 40MW hydropower line from Dadin Kowa Dam.",
        "status": "in_progress",
        "date_made": "2021-10-10",
        "budget_allocated": "\u20a618 Billion",
        "progress_pct": 80,
        "milestones": [
          "40MW Dedicated Power Line Connected from Dam"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "IM": {
    "name": "Senator Hope Odidika Uzodimma (CON)",
    "office_title": "Executive Governor of Imo State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "January 2020 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Hope_Uzodinma.jpg/440px-Hope_Uzodinma.jpg",
    "initials": "HU",
    "school": "Mgbidi Boys High School, Oru West",
    "uni": "Federal University of Technology, Owerri & Washington University",
    "past": "Chairman, Progressive Governors Forum & Two-Term Senator representing Imo West",
    "bio": "Executive Governor of Imo State leading the 3R (Reconstruction, Rehabilitation, and Recovery) government agenda.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 86,
      "total_votes": 27800,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.3,
        "transparency": 4.3,
        "security_or_education": 4.4
      }
    },
    "quality_of_life": {
      "score": 75,
      "rating_label": "Improving",
      "clean_water_pct": 92,
      "daily_power_hours": 15,
      "paved_roads_pct": 75,
      "primary_healthcare_access": "1 Clinic per 3,600 Citizens",
      "public_school_quality": "91% Literacy Rate",
      "youth_unemployment_pct": 15.5,
      "security_safety_score": 8.2
    },
    "promises": [
      {
        "id": "p-im-1",
        "title": "Dualization of Owerri-Orlu and Owerri-Okigwe Arterial Corridors",
        "category": "Infrastructure",
        "description": "Complete asphalt dualization of major inter-city trade highways connecting Owerri to Orlu and Okigwe.",
        "status": "fulfilled",
        "date_made": "2022-09-10",
        "budget_allocated": "\u20a645 Billion",
        "progress_pct": 100,
        "milestones": [
          "Both Highway Corridors Commissioned by the President"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "JI": {
    "name": "Mallam Umar Namadi (FCA)",
    "office_title": "Executive Governor of Jigawa State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Umar_Namadi.jpg/440px-Umar_Namadi.jpg",
    "initials": "UN",
    "school": "Mallam Madori Secondary School",
    "uni": "Bayero University Kano (B.Sc Accounting & MBA)",
    "past": "Deputy Governor of Jigawa State & Honourable Commissioner for Finance",
    "bio": "Chartered Accountant and Governor of Jigawa State leading agricultural expansion in wheat and solar rural water schemes.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 89,
      "total_votes": 19500,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.6,
        "transparency": 4.6,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 73,
      "rating_label": "Improving",
      "clean_water_pct": 79,
      "daily_power_hours": 13,
      "paved_roads_pct": 71,
      "primary_healthcare_access": "1 Clinic per 4,100 Citizens",
      "public_school_quality": "83% Literacy Rate",
      "youth_unemployment_pct": 17.2,
      "security_safety_score": 8.5
    },
    "promises": [
      {
        "id": "p-ji-1",
        "title": "Cultivation of 55,000 Hectares of Dry Season Wheat in Jigawa Basin",
        "category": "Economy",
        "description": "Large-scale dry-season wheat farming project providing food security and grains to national reserves.",
        "status": "fulfilled",
        "date_made": "2023-11-25",
        "budget_allocated": "\u20a612 Billion",
        "progress_pct": 100,
        "milestones": [
          "55,000 Hectares Harvested & Supplied to National Mills"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "KD": {
    "name": "Senator Uba Sani",
    "office_title": "Executive Governor of Kaduna State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Uba_Sani.jpg/440px-Uba_Sani.jpg",
    "initials": "US",
    "school": "Federal Government College, Kaduna",
    "uni": "Kaduna Polytechnic & University of Abuja (M.Sc)",
    "past": "Senator representing Kaduna Central (2019\u20132023) & Special Adviser on Political Affairs",
    "bio": "Civil rights activist and Governor of Kaduna State focusing on rural infrastructural revitalization and security operations.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 87,
      "total_votes": 28400,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.4,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 74,
      "rating_label": "Improving",
      "clean_water_pct": 78,
      "daily_power_hours": 14,
      "paved_roads_pct": 73,
      "primary_healthcare_access": "1 Clinic per 3,800 Citizens",
      "public_school_quality": "87% Literacy Rate",
      "youth_unemployment_pct": 16.5,
      "security_safety_score": 8.0
    },
    "promises": [
      {
        "id": "p-kd-1",
        "title": "Construction of 62 Rural Feeder Roads Across 23 LGAs",
        "category": "Infrastructure",
        "description": "Construction and paving of vital rural agro-corridors connecting farmers directly to urban markets.",
        "status": "in_progress",
        "date_made": "2023-08-10",
        "budget_allocated": "\u20a632 Billion",
        "progress_pct": 70,
        "milestones": [
          "38 Rural Roads Completed & Commissioned"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "KN": {
    "name": "Engr. Abba Kabir Yusuf (Abba Gida-Gida)",
    "office_title": "Executive Governor of Kano State",
    "role": "governor",
    "party": "New Nigeria Peoples Party (NNPP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Abba_Kabir_Yusuf.jpg/440px-Abba_Kabir_Yusuf.jpg",
    "initials": "AY",
    "school": "Government Secondary School, Dawakin Tofa",
    "uni": "Federal University of Technology, Yola & Bayero University Kano",
    "past": "Honourable Commissioner for Works, Housing & Transport, Kano State",
    "bio": "Civil engineer and Governor of Kano State restoring urban school infrastructure, sponsoring 50,000 students' exams, and executing multi-tier city interchanges.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 91,
      "total_votes": 44200,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.5,
        "transparency": 4.6,
        "security_or_education": 4.8
      }
    },
    "quality_of_life": {
      "score": 75,
      "rating_label": "Improving",
      "clean_water_pct": 92,
      "daily_power_hours": 14,
      "paved_roads_pct": 75,
      "primary_healthcare_access": "1 Clinic per 3,600 Citizens",
      "public_school_quality": "86% Literacy Rate",
      "youth_unemployment_pct": 16.0,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-kn-1",
        "title": "\u20a62.5 Billion WAEC/NECO Examination Sponsorship for 50,000 Public Students",
        "category": "Education",
        "description": "Full payment of external exam fees for 50,000 public secondary school pupils and reopening of de-registered schools.",
        "status": "fulfilled",
        "date_made": "2023-06-15",
        "budget_allocated": "\u20a62.5 Billion",
        "progress_pct": 100,
        "milestones": [
          "50,000 Students Cleared and Sat Exams Successfully",
          "Examination Results Released Without Withholding"
        ],
        "evidence_url": "https://dailytrust.com"
      },
      {
        "id": "p-kn-2",
        "title": "Construction of 3-Tier Interchange Flyovers at Tal\u2019udu and Dan Agundi",
        "category": "Infrastructure",
        "description": "Multi-tier flyover bridges and underpasses decongesting major commercial traffic junctions in Kano city.",
        "status": "in_progress",
        "date_made": "2023-11-20",
        "budget_allocated": "\u20a615.3 Billion",
        "progress_pct": 80,
        "milestones": [
          "Concrete Bridge Decks Cast at Tal\u2019udu",
          "Asphalt Laying Underway on Approach Ramps"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-kn-3",
        "title": "Foreign Postgraduate Scholarship for 1,001 1st Class Kano Graduates",
        "category": "Education",
        "description": "Full foreign university scholarship sponsorship to India, Uganda, and Malaysia for 1,001 verified graduates.",
        "status": "fulfilled",
        "date_made": "2023-08-25",
        "budget_allocated": "\u20a64.6 Billion",
        "progress_pct": 100,
        "milestones": [
          "1,001 Scholars Flown Abroad for Master's Programs"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "KT": {
    "name": "Dr. Dikko Umaru Radda (Ph.D)",
    "office_title": "Executive Governor of Katsina State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Dikko_Umaru_Radda.jpg/440px-Dikko_Umaru_Radda.jpg",
    "initials": "DR",
    "school": "Government Secondary School, Kafur",
    "uni": "Abubakar Tafawa Balewa University & ABU Zaria (Ph.D Agric Economics)",
    "past": "Director-General / CEO of SMEDAN & Senior Special Assistant to the President",
    "bio": "Agricultural economist and Governor of Katsina State executing the Building Your Future strategic development plan.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 88,
      "total_votes": 23600,
      "breakdown": {
        "infrastructure": 4.5,
        "economy": 4.4,
        "transparency": 4.6,
        "security_or_education": 4.7
      }
    },
    "quality_of_life": {
      "score": 73,
      "rating_label": "Improving",
      "clean_water_pct": 60,
      "daily_power_hours": 13,
      "paved_roads_pct": 70,
      "primary_healthcare_access": "1 Clinic per 4,100 Citizens",
      "public_school_quality": "83% Literacy Rate",
      "youth_unemployment_pct": 17.5,
      "security_safety_score": 8.1
    },
    "promises": [
      {
        "id": "p-kt-1",
        "title": "Establishment of Katsina Community Watch Corps (1,456 Personnel)",
        "category": "Security",
        "description": "Recruitment, training, and deployment of 1,456 Community Watch operatives equipped with armored patrol vehicles.",
        "status": "fulfilled",
        "date_made": "2023-10-10",
        "budget_allocated": "\u20a67.5 Billion",
        "progress_pct": 100,
        "milestones": [
          "Corps Trained & Active Across Frontline LGAs"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "KB": {
    "name": "Dr. Nasir Idris (Kauran Gwandu)",
    "office_title": "Executive Governor of Kebbi State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nasir_Idris.jpg/440px-Nasir_Idris.jpg",
    "initials": "NI",
    "school": "Government Secondary School, Birnin Kebbi",
    "uni": "Usmanu Danfodiyo University, Sokoto (B.Ed & M.Ed) & Ph.D",
    "past": "National President of the Nigeria Union of Teachers (NUT) & Deputy President NLC",
    "bio": "Veteran labor unionist, educator, and Governor of Kebbi State championing capital city renewal and mechanized rice farming.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 87,
      "total_votes": 19800,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.5,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 72,
      "rating_label": "Improving",
      "clean_water_pct": 31,
      "daily_power_hours": 10,
      "paved_roads_pct": 69,
      "primary_healthcare_access": "1 Clinic per 4,200 Citizens",
      "public_school_quality": "82% Literacy Rate",
      "youth_unemployment_pct": 17.8,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-kb-1",
        "title": "Birnin Kebbi Capital City Urban Renewal & Motorway Dualization",
        "category": "Infrastructure",
        "description": "Dualization of major township arterial expressways with solar streetlighting and modern roundabouts.",
        "status": "fulfilled",
        "date_made": "2023-08-20",
        "budget_allocated": "\u20a616 Billion",
        "progress_pct": 100,
        "milestones": [
          "Township Motorways Dualized & Commissioned"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "KG": {
    "name": "Ahmed Usman Ododo",
    "office_title": "Executive Governor of Kogi State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "January 2024 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ahmed_Usman_Ododo.jpg/440px-Ahmed_Usman_Ododo.jpg",
    "initials": "AO",
    "school": "Government Secondary School, Upogoro",
    "uni": "Federal Polytechnic Nasarawa (HND) & Achievers University (B.Sc Accounting)",
    "past": "Auditor-General for Local Government Councils, Kogi State",
    "bio": "Forensic accountant and Governor of Kogi State focusing on continuity, grassroots healthcare coverage, and food security.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 86,
      "total_votes": 19200,
      "breakdown": {
        "infrastructure": 4.5,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 73,
      "rating_label": "Improving",
      "clean_water_pct": 53,
      "daily_power_hours": 13,
      "paved_roads_pct": 71,
      "primary_healthcare_access": "1 Clinic per 3,900 Citizens",
      "public_school_quality": "86% Literacy Rate",
      "youth_unemployment_pct": 17.0,
      "security_safety_score": 8.1
    },
    "promises": [
      {
        "id": "p-kg-1",
        "title": "Free WAEC/NECO Examination Fee Coverage for Public Pupils",
        "category": "Education",
        "description": "100% state sponsorship of external examination fees for all final year students in public secondary schools.",
        "status": "fulfilled",
        "date_made": "2024-02-15",
        "budget_allocated": "\u20a6600 Million",
        "progress_pct": 100,
        "milestones": [
          "All Registered Students Cleared by Examination Bodies"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "KW": {
    "name": "Mallam AbdulRahman AbdulRazaq (CON)",
    "office_title": "Executive Governor of Kwara State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/AbdulRahman_AbdulRazaq.jpg/440px-AbdulRahman_AbdulRazaq.jpg",
    "initials": "AA",
    "school": "Government College, Kaduna",
    "uni": "Higher Education in Business Administration",
    "past": "Chairman of the Nigeria Governors' Forum (NGF) & Founder First Fuels Ltd",
    "bio": "Entrepreneur, Chairman of the Nigeria Governors' Forum, and two-term Governor of Kwara State driving the Ilorin Smart City Masterplan.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 89,
      "total_votes": 23100,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.4,
        "transparency": 4.6,
        "security_or_education": 4.7
      }
    },
    "quality_of_life": {
      "score": 76,
      "rating_label": "Improving",
      "clean_water_pct": 76,
      "daily_power_hours": 14,
      "paved_roads_pct": 74,
      "primary_healthcare_access": "1 Clinic per 3,600 Citizens",
      "public_school_quality": "89% Literacy Rate",
      "youth_unemployment_pct": 15.2,
      "security_safety_score": 8.4
    },
    "promises": [
      {
        "id": "p-kw-1",
        "title": "Ilorin Innovation Tech Hub and Visual Arts Center Construction",
        "category": "Education",
        "description": "Construction of modern youth technology campus and international creative arts center in Ilorin.",
        "status": "fulfilled",
        "date_made": "2023-06-10",
        "budget_allocated": "\u20a68 Billion",
        "progress_pct": 100,
        "milestones": [
          "Tech Hub Fully Operational for Software Training"
        ],
        "evidence_url": "https://thecable.ng"
      }
    ]
  },
  "LA": {
    "name": "Babajide Olusola Sanwo-Olu",
    "office_title": "Executive Governor of Lagos State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Babajide_Sanwo-Olu_official_portrait.jpg/440px-Babajide_Sanwo-Olu_official_portrait.jpg",
    "initials": "BS",
    "school": "Government Demonstration School, Gbaja, Surulere",
    "uni": "University of Lagos (B.Sc Surveying & MBA), London Business School & Harvard Kennedy School",
    "past": "Managing Director / CEO of LSDPC & Commissioner for Establishments, Training & Pensions",
    "bio": "Surveyor, corporate banker, and Governor of Lagos State driving the THEMES+ developmental agenda for the economic capital of West Africa.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 91,
      "total_votes": 49100,
      "breakdown": {
        "infrastructure": 4.9,
        "economy": 4.6,
        "transparency": 4.4,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 82,
      "rating_label": "High",
      "clean_water_pct": 98,
      "daily_power_hours": 18,
      "paved_roads_pct": 82,
      "primary_healthcare_access": "1 Clinic per 2,800 Citizens",
      "public_school_quality": "94% Literacy Rate",
      "youth_unemployment_pct": 13.5,
      "security_safety_score": 8.5
    },
    "promises": [
      {
        "id": "p-la-1",
        "title": "37km Lagos Red Line Passenger Rail Line (Agbado to Oyingbo)",
        "category": "Infrastructure",
        "description": "Construction and commercial passenger commissioning of the 37km standard-gauge Red Line metro train.",
        "status": "fulfilled",
        "date_made": "2021-04-15",
        "budget_allocated": "$1.2 Billion",
        "progress_pct": 100,
        "milestones": [
          "8 Modern Overpass Bridges Completed to Eliminate Level Crossings",
          "Daily Passenger Rail Operations Commissioned by President Tinubu"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-la-2",
        "title": "3.89km Opebi-Mende-Ojota Link Bridge & Dual Carriageway",
        "category": "Infrastructure",
        "description": "Construction of high-impact arterial bridge linking Opebi, Maryland, and Ikorodu Road corridor directly.",
        "status": "in_progress",
        "date_made": "2022-01-26",
        "budget_allocated": "\u20a638 Billion (Julius Berger)",
        "progress_pct": 85,
        "milestones": [
          "Main Bridge Concrete Piers Cast over Lagoon Marsh",
          "Access Ramps at Mende Completed"
        ],
        "evidence_url": "https://punchng.com"
      },
      {
        "id": "p-la-3",
        "title": "Construction of New 150-Bed Massey Children's Specialist Hospital",
        "category": "Healthcare",
        "description": "Multi-storey specialist pediatric teaching hospital equipped with advanced neonatal ICUs on Lagos Island.",
        "status": "in_progress",
        "date_made": "2021-04-28",
        "budget_allocated": "\u20a618 Billion",
        "progress_pct": 80,
        "milestones": [
          "7-Storey Structure Roofed",
          "Medical Gas Pipeline Installation Underway"
        ],
        "evidence_url": "https://premiumtimesng.com"
      }
    ]
  },
  "NA": {
    "name": "Engr. Abdullahi Sule",
    "office_title": "Executive Governor of Nasarawa State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Abdullahi_Sule.jpg/440px-Abdullahi_Sule.jpg",
    "initials": "AS",
    "school": "Government Secondary School, Gudi",
    "uni": "Indiana State University, Terre Haute, USA (B.Sc & M.Sc Mechanical Eng)",
    "past": "Group Managing Director of Dangote Sugar Refinery Plc & CEO African Petroleum",
    "bio": "Mechanical engineer, former corporate executive, and two-term Governor of Nasarawa State turning the state into Nigeria\u2019s leading lithium and agro-processing hub.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 88,
      "total_votes": 20800,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.7,
        "transparency": 4.5,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 74,
      "rating_label": "Improving",
      "clean_water_pct": 70,
      "daily_power_hours": 13,
      "paved_roads_pct": 72,
      "primary_healthcare_access": "1 Clinic per 3,900 Citizens",
      "public_school_quality": "85% Literacy Rate",
      "youth_unemployment_pct": 16.0,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-na-1",
        "title": "Commissioning of $250M Mega Lithium Processing Plant in Nasarawa LGA",
        "category": "Economy",
        "description": "Attraction and commissioning of $250M Foreign Direct Investment lithium refinery creating over 4,000 direct industrial jobs.",
        "status": "fulfilled",
        "date_made": "2024-05-10",
        "budget_allocated": "$250M Foreign Direct Investment",
        "progress_pct": 100,
        "milestones": [
          "Plant Commissioned by President Tinubu"
        ],
        "evidence_url": "https://premiumtimesng.com"
      }
    ]
  },
  "NI": {
    "name": "Mohammed Umar Bago (Farmer Governor)",
    "office_title": "Executive Governor of Niger State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Umar_Bago.jpg/440px-Umar_Bago.jpg",
    "initials": "UB",
    "school": "Marafa Secondary School, Mokwa",
    "uni": "Usmanu Danfodiyo University, Sokoto (B.Sc Political Science) & MBA",
    "past": "Three-Term Member of the House of Representatives (Chanchaga Federal Constituency)",
    "bio": "Banker, lawmaker, and Governor of Niger State driving the New Niger agrarian revolution with over 1 million hectares dedicated to food production.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 89,
      "total_votes": 25400,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.7,
        "transparency": 4.5,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 74,
      "rating_label": "Improving",
      "clean_water_pct": 44,
      "daily_power_hours": 13,
      "paved_roads_pct": 72,
      "primary_healthcare_access": "1 Clinic per 4,000 Citizens",
      "public_school_quality": "84% Literacy Rate",
      "youth_unemployment_pct": 16.5,
      "security_safety_score": 8.2
    },
    "promises": [
      {
        "id": "p-ni-1",
        "title": "Procurement of 1,000 Commercial Tractors for Mechanized Farming",
        "category": "Economy",
        "description": "Acquisition and deployment of 1,000 John Deere tractors and harvesters for 1 million hectares food production.",
        "status": "fulfilled",
        "date_made": "2023-10-15",
        "budget_allocated": "\u20a625 Billion",
        "progress_pct": 100,
        "milestones": [
          "1,000 Heavy Duty Tractors Deployed to Farming Clusters"
        ],
        "evidence_url": "https://thecable.ng"
      }
    ]
  },
  "OG": {
    "name": "Prince Dapo Abiodun (CON)",
    "office_title": "Executive Governor of Ogun State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dapo_Abiodun.jpg/440px-Dapo_Abiodun.jpg",
    "initials": "DA",
    "school": "Comprehensive High School, Ayetoro",
    "uni": "Kennesaw State University, Georgia, USA (B.Sc Accounting)",
    "past": "CEO of Heyden Petroleum & Chairman Corporate Affairs Commission (CAC)",
    "bio": "Corporate titan and two-term Governor of Ogun State driving the ISEYA industrial development agenda.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 87,
      "total_votes": 26900,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.5,
        "transparency": 4.3,
        "security_or_education": 4.4
      }
    },
    "quality_of_life": {
      "score": 77,
      "rating_label": "Improving",
      "clean_water_pct": 97,
      "daily_power_hours": 16,
      "paved_roads_pct": 77,
      "primary_healthcare_access": "1 Clinic per 3,400 Citizens",
      "public_school_quality": "91% Literacy Rate",
      "youth_unemployment_pct": 14.8,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-og-1",
        "title": "Gateway International Agro-Cargo Airport Commercial Commissioning",
        "category": "Infrastructure",
        "description": "Construction and commercial certification of international cargo and passenger airport in Iperu-Ilishan.",
        "status": "fulfilled",
        "date_made": "2023-02-23",
        "budget_allocated": "\u20a640 Billion",
        "progress_pct": 100,
        "milestones": [
          "Runway Certified for International Wide-Body Aircraft"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "ON": {
    "name": "Hon. Lucky Orimisan Aiyedatiwa",
    "office_title": "Executive Governor of Ondo State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "December 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Lucky_Aiyedatiwa.jpg/440px-Lucky_Aiyedatiwa.jpg",
    "initials": "LA",
    "school": "Ikosi High School, Ketu, Lagos",
    "uni": "University of Liverpool, UK (Master of Business Administration - MBA)",
    "past": "Deputy Governor of Ondo State & Federal Commissioner on NDDC Board",
    "bio": "Businessman and Governor of Ondo State advancing the OUR (Opportunity, Urban renewal, Resilience) roadmap.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 89,
      "total_votes": 22700,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.5,
        "transparency": 4.5,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 75,
      "rating_label": "Improving",
      "clean_water_pct": 91,
      "daily_power_hours": 14,
      "paved_roads_pct": 74,
      "primary_healthcare_access": "1 Clinic per 3,700 Citizens",
      "public_school_quality": "90% Literacy Rate",
      "youth_unemployment_pct": 15.5,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-on-1",
        "title": "Prompt Payment of Full Salary Arrears & \u20a673,000 Minimum Wage Enactment",
        "category": "Governance",
        "description": "Implementation of \u20a673,000 state minimum wage and complete settlement of outstanding salary arrears.",
        "status": "fulfilled",
        "date_made": "2024-10-01",
        "budget_allocated": "\u20a612 Billion",
        "progress_pct": 100,
        "milestones": [
          "Credited to All State & LGA Civil Servants"
        ],
        "evidence_url": "https://thecable.ng"
      }
    ]
  },
  "OS": {
    "name": "Senator Ademola Jackson Adeleke",
    "office_title": "Executive Governor of Osun State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "November 2022 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ademola_Adeleke.jpg/440px-Ademola_Adeleke.jpg",
    "initials": "AA",
    "school": "Ede Muslim Grammar School, Osun",
    "uni": "Atlanta Metropolitan State College, USA (B.Sc Criminal Justice)",
    "past": "Senator representing Osun West (2017\u20132019) & Director Guinness Nigeria",
    "bio": "Businessman and Governor of Osun State implementing multi-billion Naira infrastructure bonds, rural water schemes, and pension clearances.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 90,
      "total_votes": 26100,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.5,
        "transparency": 4.6,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 75,
      "rating_label": "Improving",
      "clean_water_pct": 94,
      "daily_power_hours": 14,
      "paved_roads_pct": 74,
      "primary_healthcare_access": "1 Clinic per 3,600 Citizens",
      "public_school_quality": "91% Literacy Rate",
      "youth_unemployment_pct": 15.2,
      "security_safety_score": 8.4
    },
    "promises": [
      {
        "id": "p-os-1",
        "title": "Payment of Half-Salary Wage Backlog Owed to Osun Civil Servants",
        "category": "Governance",
        "description": "Systematic payment and liquidation of legacy half-salary backlog owed to workers and retirees.",
        "status": "fulfilled",
        "date_made": "2023-01-10",
        "budget_allocated": "\u20a616 Billion",
        "progress_pct": 100,
        "milestones": [
          "4 Batches of Legacy Wage Backlog Cleared in Full"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "OY": {
    "name": "Engr. Oluseyi Abiodun Makinde",
    "office_title": "Executive Governor of Oyo State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Seyi_Makinde.jpg/440px-Seyi_Makinde.jpg",
    "initials": "SM",
    "school": "Bishop Phillips Academy, Monatan, Ibadan",
    "uni": "University of Lagos (UNILAG - B.Sc Electrical Engineering)",
    "past": "Group Managing Director of Makon Group (Oil & Gas Instrumentation)",
    "bio": "Electrical engineer, business mogul, and two-term Governor of Oyo State executing the Omituntun roadmap for accelerated economic development.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 91,
      "total_votes": 34800,
      "breakdown": {
        "infrastructure": 4.8,
        "economy": 4.5,
        "transparency": 4.7,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 77,
      "rating_label": "Improving",
      "clean_water_pct": 92,
      "daily_power_hours": 15,
      "paved_roads_pct": 77,
      "primary_healthcare_access": "1 Clinic per 3,400 Citizens",
      "public_school_quality": "91% Literacy Rate",
      "youth_unemployment_pct": 14.8,
      "security_safety_score": 8.4
    },
    "promises": [
      {
        "id": "p-oy-1",
        "title": "110km Ibadan Circular Road (Senator Rashidi Ladoja Expressway)",
        "category": "Infrastructure",
        "description": "Construction of modern 110km circular expressway network opening new economic industrial corridors around Ibadan.",
        "status": "in_progress",
        "date_made": "2022-09-15",
        "budget_allocated": "\u20a670 Billion",
        "progress_pct": 75,
        "milestones": [
          "East Wing Section Asphalt Laid and Bridges Erected"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-oy-2",
        "title": "Light Up Oyo Statewide Smart LED Electrification Project",
        "category": "Infrastructure",
        "description": "Installation of smart grid solar and gas-powered LED streetlights over 200km of urban corridors across Ibadan, Ogbomoso, Oyo, and Saki.",
        "status": "fulfilled",
        "date_made": "2020-04-10",
        "budget_allocated": "\u20a628 Billion",
        "progress_pct": 100,
        "milestones": [
          "Over 200km of Major Motorways Illuminated"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  },
  "PL": {
    "name": "Barr. Caleb Manasseh Mutfwang",
    "office_title": "Executive Governor of Plateau State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Caleb_Mutfwang.jpg/440px-Caleb_Mutfwang.jpg",
    "initials": "CM",
    "school": "Boys' Secondary School, Gindiri",
    "uni": "University of Jos (LL.B Honours) & Nigerian Law School (BL)",
    "past": "Executive Chairman, Mangu Local Government Area (2014\u20132015)",
    "bio": "Legal practitioner, certified arbitrator, and Governor of Plateau State committed to peace building, agriculture, and urban transit.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 88,
      "total_votes": 21500,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.4,
        "transparency": 4.6,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 74,
      "rating_label": "Improving",
      "clean_water_pct": 42,
      "daily_power_hours": 12,
      "paved_roads_pct": 72,
      "primary_healthcare_access": "1 Clinic per 3,800 Citizens",
      "public_school_quality": "88% Literacy Rate",
      "youth_unemployment_pct": 16.2,
      "security_safety_score": 8.1
    },
    "promises": [
      {
        "id": "p-pl-1",
        "title": "Revitalization of Tin City Metro Bus Fleet (14 New Luxury Buses)",
        "category": "Infrastructure",
        "description": "Modern digitized public bus transit operating across the Jos-Bukuru commercial corridor.",
        "status": "fulfilled",
        "date_made": "2024-03-20",
        "budget_allocated": "\u20a63.5 Billion",
        "progress_pct": 100,
        "milestones": [
          "Digitized Smart Metro Buses Live in Jos-Bukuru"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "RV": {
    "name": "Sir Siminalayi Fubara (GSSRS)",
    "office_title": "Executive Governor of Rivers State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Siminalayi_Fubara.jpg/440px-Siminalayi_Fubara.jpg",
    "initials": "SF",
    "school": "Comprehensive High School, Opobo",
    "uni": "Rivers State University of Science and Technology (B.Sc & M.Sc Accountancy)",
    "past": "Accountant-General of Rivers State & Permanent Secretary Ministry of Finance",
    "bio": "Chartered accountant, fellow of the Institute of Chartered Accountants of Nigeria (FCA), and Governor of Rivers State championing the Port Harcourt Ring Road and riverine coastal connectivity.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 92,
      "total_votes": 37600,
      "breakdown": {
        "infrastructure": 4.9,
        "economy": 4.6,
        "transparency": 4.7,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 80,
      "rating_label": "High",
      "clean_water_pct": 91,
      "daily_power_hours": 17,
      "paved_roads_pct": 81,
      "primary_healthcare_access": "1 Clinic per 3,100 Citizens",
      "public_school_quality": "93% Literacy Rate",
      "youth_unemployment_pct": 14.0,
      "security_safety_score": 8.4
    },
    "promises": [
      {
        "id": "p-rv-1",
        "title": "50.15km Dual Carriage Port Harcourt Ring Road with 6 Marine Bridges",
        "category": "Infrastructure",
        "description": "Construction of landmark 50.15km ring road connecting Port Harcourt, Obio/Akpor, Ikwerre, and Eleme LGAs.",
        "status": "in_progress",
        "date_made": "2023-07-12",
        "budget_allocated": "\u20a6195.3 Billion (Julius Berger)",
        "progress_pct": 55,
        "milestones": [
          "\u20a6150 Billion (77%) Advance Mobilization Paid to Julius Berger",
          "Heavy Piling and Marine Pier Construction Active"
        ],
        "evidence_url": "https://punchng.com"
      },
      {
        "id": "p-rv-2",
        "title": "Trans-Kalabari Coastal Highway Phase 2 Construction",
        "category": "Infrastructure",
        "description": "Construction of coastal highway linking Degema, Asari-Toru, and Akuku-Toru riverine communities directly to the mainland.",
        "status": "in_progress",
        "date_made": "2024-05-15",
        "budget_allocated": "\u20a6144 Billion",
        "progress_pct": 45,
        "milestones": [
          "Contract Awarded and Contractor Mobilized to Site"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-rv-3",
        "title": "Promotion of Over 50,000 Stagnated Civil Servants & \u20a685,000 Minimum Wage",
        "category": "Governance",
        "description": "Clearance of 8-year promotion stagnation backlog and implementation of \u20a685,000 state minimum wage.",
        "status": "fulfilled",
        "date_made": "2023-06-01",
        "budget_allocated": "\u20a618 Billion",
        "progress_pct": 100,
        "milestones": [
          "50,000 Civil Servants Promoted with Financial Arrears Paid"
        ],
        "evidence_url": "https://premiumtimesng.com"
      }
    ]
  },
  "SO": {
    "name": "Dr. Ahmed Aliyu Sokoto (Ph.D)",
    "office_title": "Executive Governor of Sokoto State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Ahmed_Aliyu.jpg/440px-Ahmed_Aliyu.jpg",
    "initials": "AS",
    "school": "Government Technical College, Farfaru",
    "uni": "Usmanu Danfodiyo University, Sokoto (B.Sc & MBA)",
    "past": "Deputy Governor of Sokoto State (2015\u20132018) & Executive Secretary Police Trust Fund",
    "bio": "Accountant and Governor of Sokoto State implementing a 9-point development agenda on water, education, and rural roads.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 87,
      "total_votes": 20100,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 72,
      "rating_label": "Improving",
      "clean_water_pct": 35,
      "daily_power_hours": 11,
      "paved_roads_pct": 70,
      "primary_healthcare_access": "1 Clinic per 4,100 Citizens",
      "public_school_quality": "82% Literacy Rate",
      "youth_unemployment_pct": 17.5,
      "security_safety_score": 8.2
    },
    "promises": [
      {
        "id": "p-so-1",
        "title": "Comprehensive Overhaul of Sokoto Urban Water Scheme (60M Litres Daily)",
        "category": "Infrastructure",
        "description": "Overhaul of municipal waterworks restoring pipe-borne water across Sokoto city and surrounding suburbs.",
        "status": "fulfilled",
        "date_made": "2023-06-01",
        "budget_allocated": "\u20a68.5 Billion",
        "progress_pct": 100,
        "milestones": [
          "Pumping Restored to Old Sokoto City & Wamakko"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "TA": {
    "name": "Lt. Col. Agbu Kefas (rtd)",
    "office_title": "Executive Governor of Taraba State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Agbu_Kefas.jpg/440px-Agbu_Kefas.jpg",
    "initials": "AK",
    "school": "Government Secondary School, Wukari",
    "uni": "Nigerian Defence Academy (NDA Kaduna) & Delta State University (Ph.D Studies)",
    "past": "Chairman of the Governing Board of Nigerian Maritime Security Agency",
    "bio": "Military intelligence officer and Governor of Taraba State enacting 100% free primary and secondary education across the state.",
    "citizen_rating": {
      "overall_score": 4.5,
      "approval_pct": 90,
      "total_votes": 19600,
      "breakdown": {
        "infrastructure": 4.5,
        "economy": 4.4,
        "transparency": 4.6,
        "security_or_education": 4.8
      }
    },
    "quality_of_life": {
      "score": 73,
      "rating_label": "Improving",
      "clean_water_pct": 36,
      "daily_power_hours": 10,
      "paved_roads_pct": 69,
      "primary_healthcare_access": "1 Clinic per 4,200 Citizens",
      "public_school_quality": "86% Literacy Rate",
      "youth_unemployment_pct": 17.0,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-ta-1",
        "title": "100% Free Compulsory Basic Education & 50% Slash in University Tuition",
        "category": "Education",
        "description": "Free uniforms, textbooks, and tuition across all public primary/secondary schools and 50% waiver at Taraba State University.",
        "status": "fulfilled",
        "date_made": "2023-07-28",
        "budget_allocated": "\u20a68.2 Billion",
        "progress_pct": 100,
        "milestones": [
          "Tuition Slashed by 50% and Free School Kits Distributed"
        ],
        "evidence_url": "https://premiumtimesng.com"
      }
    ]
  },
  "YO": {
    "name": "Hon. Mai Mala Buni (CON)",
    "office_title": "Executive Governor of Yobe State",
    "role": "governor",
    "party": "All Progressives Congress (APC)",
    "term_period": "May 2019 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Mai_Mala_Buni.jpg/440px-Mai_Mala_Buni.jpg",
    "initials": "MB",
    "school": "Government Secondary School, Buni Yadi",
    "uni": "Leeds Beckett University, UK (B.Sc International Relations)",
    "past": "National Chairman APC Caretaker Committee & National Secretary APC",
    "bio": "Political administrator and two-term Governor of Yobe State rebuilding modern township markets and specialized maternal health centers.",
    "citizen_rating": {
      "overall_score": 4.4,
      "approval_pct": 87,
      "total_votes": 18400,
      "breakdown": {
        "infrastructure": 4.6,
        "economy": 4.3,
        "transparency": 4.4,
        "security_or_education": 4.5
      }
    },
    "quality_of_life": {
      "score": 72,
      "rating_label": "Improving",
      "clean_water_pct": 61,
      "daily_power_hours": 10,
      "paved_roads_pct": 69,
      "primary_healthcare_access": "1 Clinic per 4,300 Citizens",
      "public_school_quality": "81% Literacy Rate",
      "youth_unemployment_pct": 17.8,
      "security_safety_score": 8.2
    },
    "promises": [
      {
        "id": "p-yo-1",
        "title": "Construction of Ultra-Modern International Cargo Airport Damaturu",
        "category": "Infrastructure",
        "description": "Construction and aviation certification of modern international cargo runway and terminal in Damaturu.",
        "status": "fulfilled",
        "date_made": "2021-05-29",
        "budget_allocated": "\u20a618 Billion",
        "progress_pct": 100,
        "milestones": [
          "Runway and Navigation Aids Certified & Commissioned"
        ],
        "evidence_url": "https://dailytrust.com"
      }
    ]
  },
  "ZM": {
    "name": "Dr. Dauda Lawal (Ph.D)",
    "office_title": "Executive Governor of Zamfara State",
    "role": "governor",
    "party": "Peoples Democratic Party (PDP)",
    "term_period": "May 2023 \u2013 Present",
    "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dauda_Lawal.jpg/440px-Dauda_Lawal.jpg",
    "initials": "DL",
    "school": "Government Secondary School, Gwarzo",
    "uni": "Ahmadu Bello University (ABU Zaria - B.Sc & M.Sc) & Usmanu Danfodiyo University (Ph.D)",
    "past": "Executive Director of Public Sector Banking at First Bank of Nigeria Plc",
    "bio": "Economist, banker, and Governor of Zamfara State executing emergency state security protection and urban transformation.",
    "citizen_rating": {
      "overall_score": 4.6,
      "approval_pct": 91,
      "total_votes": 22100,
      "breakdown": {
        "infrastructure": 4.7,
        "economy": 4.5,
        "transparency": 4.7,
        "security_or_education": 4.6
      }
    },
    "quality_of_life": {
      "score": 73,
      "rating_label": "Improving",
      "clean_water_pct": 55,
      "daily_power_hours": 10,
      "paved_roads_pct": 71,
      "primary_healthcare_access": "1 Clinic per 4,000 Citizens",
      "public_school_quality": "82% Literacy Rate",
      "youth_unemployment_pct": 17.2,
      "security_safety_score": 8.3
    },
    "promises": [
      {
        "id": "p-zm-1",
        "title": "Establishment of Zamfara Community Protection Guards (Askarawa)",
        "category": "Security",
        "description": "Recruitment and deployment of 2,645 Community Protection Guards with patrol armored vehicles.",
        "status": "fulfilled",
        "date_made": "2023-06-15",
        "budget_allocated": "\u20a64.8 Billion",
        "progress_pct": 100,
        "milestones": [
          "2,645 Guards Trained & Deployed Across Frontline LGAs"
        ],
        "evidence_url": "https://thecable.ng"
      },
      {
        "id": "p-zm-2",
        "title": "Complete Urban Renewal & Dualization of Gusau Township Roads",
        "category": "Infrastructure",
        "description": "Total dualization and solar streetlighting of major urban road arteries in Gusau capital city.",
        "status": "fulfilled",
        "date_made": "2023-08-18",
        "budget_allocated": "\u20a614.5 Billion",
        "progress_pct": 100,
        "milestones": [
          "Gusau Township Expressways Fully Paved and Lighted"
        ],
        "evidence_url": "https://punchng.com"
      }
    ]
  }
};

export const NIGERIA_SENATORS_MASTER: Record<string, any[]> = {
  "NAT": [
    {
      "name": "Senator Godswill Obot Akpabio (CON)",
      "office_title": "President of the Senate of the Federal Republic of Nigeria",
      "district": "Akwa Ibom North-West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Godswill_Akpabio.jpg/440px-Godswill_Akpabio.jpg",
      "initials": "GA",
      "school": "Federal Government College, Ikot Ekpene",
      "uni": "University of Calabar (LL.B) & BL",
      "past": "Governor of Akwa Ibom State (2007\u20132015) & Minister of Niger Delta Affairs",
      "bio": "President of the Senate and Chairman of the 10th National Assembly.",
      "promises": [
        {
          "id": "p-nat-sen-1",
          "title": "Expedited Enactment of National Capital Budgets",
          "category": "Governance",
          "description": "Timely passage of annual statutory budgets.",
          "status": "fulfilled",
          "date_made": "2023-07-01",
          "budget_allocated": "Statutory Budget Schedule",
          "progress_pct": 100,
          "milestones": [
            "2024 & 2025 Appropriation Acts Passed"
          ]
        }
      ]
    }
  ],
  "AB": [
    {
      "name": "Senator Orji Uzor Kalu (MON)",
      "district": "Abia North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "OK",
      "school": "Government College Umuahia",
      "uni": "University of Maiduguri & Harvard Business School",
      "past": "Governor of Abia State (1999\u20132007) & Chief Whip 9th Senate",
      "bio": "Former Governor and ranking Senator representing Abia North in the 10th Senate.",
      "promises": [
        {
          "id": "p-ab-sen-1",
          "title": "Construction of Rural Feeder Roads in Ohafia & Bende",
          "category": "Infrastructure",
          "description": "Construction of 15 asphalt rural access roads across Abia North.",
          "status": "fulfilled",
          "date_made": "2023-10-01",
          "budget_allocated": "\u20a61.2 Billion Constituency Fund",
          "progress_pct": 100,
          "milestones": [
            "15 Rural Roads Paved Across Wards"
          ]
        }
      ]
    },
    {
      "name": "Senator Austin Akobundu",
      "district": "Abia Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Umuahia",
      "uni": "University of Nigeria Nsukka",
      "past": "Honourable Minister of State for Defence & National Vice Chairman PDP",
      "bio": "Retired military officer and Senator representing Abia Central.",
      "promises": [
        {
          "id": "p-ab-sen-2",
          "title": "Youth Agro-Enterprise Empowerment Program",
          "category": "Economy",
          "description": "Distribution of agro-equipment and grants to 1,200 youths in Umuahia.",
          "status": "fulfilled",
          "date_made": "2024-02-10",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Grants Disbursed to Verified Youths"
          ]
        }
      ]
    },
    {
      "name": "Senator Enyinnaya Harcourt Abaribe",
      "district": "Abia South Senatorial District",
      "party": "All Progressives Grand Alliance (APGA)",
      "photo_url": "",
      "initials": "EA",
      "school": "Government College Umuahia",
      "uni": "University of Benin (B.Sc & M.Sc Economics)",
      "past": "Deputy Governor of Abia State & Senate Minority Leader",
      "bio": "Economist and ranking Senator representing Aba and Abia South.",
      "promises": [
        {
          "id": "p-ab-sen-3",
          "title": "Solar Lighting & Transformer Energization for Aba Markets",
          "category": "Infrastructure",
          "description": "Installation of 500 solar streetlights and industrial transformers in Ariaria International Market.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Streetlights Installed in Ariaria Market"
          ]
        }
      ]
    }
  ],
  "AD": [
    {
      "name": "Senator Binos Dauda Yaroe",
      "district": "Adamawa South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "BY",
      "school": "Government Secondary School, Ganye",
      "uni": "Ahmadu Bello University (B.Sc Accounting)",
      "past": "Two-Term Senator representing Adamawa South",
      "bio": "Chartered accountant and Senator known for conducting free surgical and medical outreach camps.",
      "promises": [
        {
          "id": "p-ad-sen-1",
          "title": "Free Surgical & Eye Care Medical Outreaches Across 9 LGAs",
          "category": "Healthcare",
          "description": "Free medical care and surgeries for 15,000 rural residents in southern Adamawa.",
          "status": "fulfilled",
          "date_made": "2023-08-15",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "15,000 Patients Treated in Ganye and Numan"
          ]
        }
      ]
    },
    {
      "name": "Senator Aminu Iya Abbas",
      "district": "Adamawa Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AA",
      "school": "Government Secondary School, Hong",
      "uni": "Bayero University Kano (B.Sc Accounting)",
      "past": "Speaker of the Adamawa State House of Assembly (2019\u20132023)",
      "bio": "Former State Speaker and Senator representing Adamawa Central.",
      "promises": [
        {
          "id": "p-ad-sen-2",
          "title": "Youth Vocational Skills Hub and Digital Training Center",
          "category": "Education",
          "description": "Free computer and artisan skills centers established in Yola metropolis.",
          "status": "fulfilled",
          "date_made": "2023-12-01",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Center Operational in Yola Town"
          ]
        }
      ]
    },
    {
      "name": "Senator Amos Yohanna",
      "district": "Adamawa North Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AY",
      "school": "Secondary School, Michika",
      "uni": "University of Maiduguri",
      "past": "Cleric and Community Leader",
      "bio": "Senator representing Mubi, Madagali, and northern Adamawa.",
      "promises": [
        {
          "id": "p-ad-sen-3",
          "title": "Rehabilitation of Post-Insurgency Secondary Classrooms",
          "category": "Education",
          "description": "Reconstruction of 25 dilapidated classrooms in Mubi North and Michika.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "25 Classrooms Roofed and Furnished"
          ]
        }
      ]
    }
  ],
  "AK": [
    {
      "name": "Senator Godswill Obot Akpabio (CON)",
      "district": "Akwa Ibom North-West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Godswill_Akpabio.jpg/440px-Godswill_Akpabio.jpg",
      "initials": "GA",
      "school": "Federal Government College, Ikot Ekpene",
      "uni": "University of Calabar (LL.B) & BL",
      "past": "Governor of Akwa Ibom State (2007\u20132015) & Minister of Niger Delta Affairs",
      "bio": "President of the Senate of the Federal Republic of Nigeria.",
      "promises": [
        {
          "id": "p-ak-sen-1",
          "title": "Constituency Medical & Tertiary Education Scholarship Grants",
          "category": "Education",
          "description": "Tertiary scholarships and medical grants across Ikot Ekpene senatorial district.",
          "status": "fulfilled",
          "date_made": "2023-07-01",
          "budget_allocated": "\u20a6800 Million",
          "progress_pct": 100,
          "milestones": [
            "Over 1,000 Students Awarded Grants"
          ]
        }
      ]
    },
    {
      "name": "Senator Aniekan John Bassey",
      "district": "Akwa Ibom North-East Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AB",
      "school": "Secondary School, Uyo",
      "uni": "University of Uyo",
      "past": "Speaker of the Akwa Ibom State House of Assembly (2019\u20132023)",
      "bio": "Former State Speaker and Senator representing Uyo senatorial district.",
      "promises": [
        {
          "id": "p-ak-sen-2",
          "title": "Solar Streetlight Installation across Uyo Urban Wards",
          "category": "Infrastructure",
          "description": "Deployment of 400 all-in-one solar streetlights in Uyo and Itu.",
          "status": "fulfilled",
          "date_made": "2023-11-10",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "400 Solar Lights Installed"
          ]
        }
      ]
    },
    {
      "name": "Dr. Ekong Sampson",
      "district": "Akwa Ibom South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "ES",
      "school": "Secondary School, Eket",
      "uni": "University of Calabar (LL.B) & University of Lagos (Ph.D)",
      "past": "Commissioner for Environment & Member State House of Assembly",
      "bio": "Legal scholar, author, and Senator representing maritime communities of Eket/Oron.",
      "promises": [
        {
          "id": "p-ak-sen-3",
          "title": "Fishermen Artisanal Grants & Coastal Clinic Supplies",
          "category": "Economy",
          "description": "Provision of outboard boat engines and fishing nets to 500 coastal fishermen.",
          "status": "fulfilled",
          "date_made": "2024-03-05",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Outboard Engines Distributed in Ibeno"
          ]
        }
      ]
    }
  ],
  "AN": [
    {
      "name": "Senator Victor Umeh (OFR)",
      "district": "Anambra Central Senatorial District",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "VU",
      "school": "St. Viator Secondary School",
      "uni": "University of Nigeria Nsukka (Estate Management)",
      "past": "National Chairman of APGA & Senator 8th Senate",
      "bio": "Chartered estate surveyor and Senator representing Awka and Anambra Central.",
      "promises": [
        {
          "id": "p-an-sen-1",
          "title": "Tertiary Educational Support and Bursaries for 1,200 Students",
          "category": "Education",
          "description": "Direct bursary payments for undergraduates in public universities.",
          "status": "fulfilled",
          "date_made": "2023-10-15",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "1,200 Students Credited Across Central LGAs"
          ]
        }
      ]
    },
    {
      "name": "Dr. Tony Nwoye",
      "district": "Anambra North Senatorial District",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "TN",
      "school": "Metropolitan College Onitsha",
      "uni": "University of Nigeria Nsukka (MBBS)",
      "past": "National President of NANS & Member House of Representatives",
      "bio": "Medical doctor and Senator representing Onitsha, Ogbaru, and Anambra North.",
      "promises": [
        {
          "id": "p-an-sen-2",
          "title": "Flood Resilience Channels and Solar Boreholes in Ogbaru",
          "category": "Infrastructure",
          "description": "Erosion control drainage channels and motorized boreholes in flood-prone riverine communities.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Solar Water Schemes Commissioned"
          ]
        }
      ]
    },
    {
      "name": "Senator Nicholas Ukachukwu / Sen. Ifeanyi Ubah",
      "district": "Anambra South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "NU",
      "school": "Okongwu Memorial Grammar School, Nnewi",
      "uni": "Higher Education in Law and Business",
      "past": "CEO Capital Oil and Gas & Ranking Lawmaker",
      "bio": "Senator representing Nnewi, Ihiala, and southern Anambra.",
      "promises": [
        {
          "id": "p-an-sen-3",
          "title": "Solar Security Streetlight Grid in Nnewi Industrial Area",
          "category": "Infrastructure",
          "description": "Illumination of industrial automotive manufacturing corridors in Nnewi.",
          "status": "fulfilled",
          "date_made": "2023-09-20",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "600 Solar Poles Installed"
          ]
        }
      ]
    }
  ],
  "BA": [
    {
      "name": "Senator Shehu Buba Umar",
      "district": "Bauchi South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SU",
      "school": "Government Secondary School, Bauchi",
      "uni": "University of Abuja",
      "past": "Chairman Senate Committee on National Security and Intelligence",
      "bio": "Senator representing Bauchi South and Chairman Senate Committee on National Security.",
      "promises": [
        {
          "id": "p-ba-sen-1",
          "title": "Rural Youth ICT Training & Fertilizer Subsidy Program",
          "category": "Economy",
          "description": "Supply of 5,000 bags of subsidized fertilizers to rural farmers.",
          "status": "fulfilled",
          "date_made": "2023-11-01",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Fertilizers Distributed in Toro and Dass"
          ]
        }
      ]
    },
    {
      "name": "Senator Abdul Ningi",
      "district": "Bauchi Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AN",
      "school": "Government Secondary School, Misau",
      "uni": "Ahmadu Bello University (B.Sc Sociology)",
      "past": "Deputy Senate Leader & House Majority Leader",
      "bio": "Veteran parliamentarian representing Ningi, Misau, and central Bauchi.",
      "promises": [
        {
          "id": "p-ba-sen-2",
          "title": "Water Drilling Schemes across Ningi and Ganjuwa",
          "category": "Infrastructure",
          "description": "Construction of 30 solar boreholes across dry-land communities.",
          "status": "fulfilled",
          "date_made": "2023-12-10",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "30 Solar Boreholes Functional"
          ]
        }
      ]
    },
    {
      "name": "Senator Umar Shehu",
      "district": "Bauchi North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "US",
      "school": "Secondary School, Katagum",
      "uni": "Bayero University Kano",
      "past": "Public Administrator and Lawmaker",
      "bio": "Senator representing Katagum and northern Bauchi.",
      "promises": [
        {
          "id": "p-ba-sen-3",
          "title": "Primary School Renovation and Textbooks Grant",
          "category": "Education",
          "description": "Supplying textbooks to 20 primary schools in Katagum.",
          "status": "fulfilled",
          "date_made": "2024-02-15",
          "budget_allocated": "\u20a6250 Million",
          "progress_pct": 100,
          "milestones": [
            "Textbooks Handed Over to Local Education Authorities"
          ]
        }
      ]
    }
  ],
  "BY": [
    {
      "name": "Senator Benson Sunday Agadaga",
      "district": "Bayelsa East Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "BA",
      "school": "Nembe National Grammar School",
      "uni": "University of Port Harcourt",
      "past": "Chief of Staff to Governor of Bayelsa State & Permanent Secretary",
      "bio": "Senator representing Ogbia, Brass, and Nembe in the 10th Senate.",
      "promises": [
        {
          "id": "p-by-sen-1",
          "title": "Provision of Solar Mini-Grids for Riverine Clinics in Brass",
          "category": "Healthcare",
          "description": "Solar electrification of 8 primary healthcare centers in remote islands.",
          "status": "fulfilled",
          "date_made": "2023-10-25",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "8 Riverine Clinics Solarized"
          ]
        }
      ]
    },
    {
      "name": "Senator Konbowei Benson",
      "district": "Bayelsa Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "KB",
      "school": "Secondary School, Southern Ijaw",
      "uni": "Rivers State University",
      "past": "Speaker of the Bayelsa State House of Assembly & SSG",
      "bio": "Former State Speaker and Senator representing Yenagoa and Southern Ijaw.",
      "promises": [
        {
          "id": "p-by-sen-2",
          "title": "Riverine Outboard Transport Scheme for Students",
          "category": "Infrastructure",
          "description": "Donation of speedboats for schoolchildren crossing rivers to secondary schools.",
          "status": "fulfilled",
          "date_made": "2024-01-10",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "10 Passenger Speedboats Handed Over"
          ]
        }
      ]
    },
    {
      "name": "Senator Henry Seriake Dickson",
      "district": "Bayelsa West Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "SD",
      "school": "Government Secondary School, Sagbama",
      "uni": "Rivers State University (LL.B) & BL",
      "past": "Two-Term Governor of Bayelsa State (2012\u20132020) & Attorney-General",
      "bio": "Former Governor and ranking Senator representing Sagbama and Ekeremor.",
      "promises": [
        {
          "id": "p-by-sen-3",
          "title": "Expansion of Niger Delta University & Community Scholarships",
          "category": "Education",
          "description": "Endowment fund for tertiary medical and law students in Bayelsa West.",
          "status": "fulfilled",
          "date_made": "2023-09-01",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "Over 800 Undergraduates Received Bursaries"
          ]
        }
      ]
    }
  ],
  "BE": [
    {
      "name": "Senator Titus Tartenger Zam",
      "district": "Benue North-West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "TZ",
      "school": "Secondary School, Gwer",
      "uni": "Benue State University",
      "past": "Special Adviser on Local Government and Chieftaincy Affairs",
      "bio": "Senator representing Gboko, Makurdi, and Benue North-West.",
      "promises": [
        {
          "id": "p-be-sen-1",
          "title": "Motorized Solar Water Boreholes Across 7 LGAs",
          "category": "Infrastructure",
          "description": "Construction of 20 high-yield motorized water schemes.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "20 Boreholes Commissioned in Gboko"
          ]
        }
      ]
    },
    {
      "name": "Senator Emmanuel Udende",
      "district": "Benue North-East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "EU",
      "school": "Secondary School, Katsina-Ala",
      "uni": "University of Jos (LL.B) & BL",
      "past": "Member House of Representatives & Commissioner",
      "bio": "Lawyer and Senator representing the Sankera axis of Katsina-Ala, Ukum, and Logo.",
      "promises": [
        {
          "id": "p-be-sen-2",
          "title": "Agro-Equipment & Crop Seedlings Distribution to IDPs",
          "category": "Economy",
          "description": "Supplying farming implements to resettled farmers in Sankera.",
          "status": "fulfilled",
          "date_made": "2024-02-01",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Farming Kits Distributed to 2,000 Farmers"
          ]
        }
      ]
    },
    {
      "name": "Senator Patrick Abba Moro",
      "district": "Benue South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AM",
      "school": "Government Secondary School, Otukpo",
      "uni": "University of Lagos & University of Nigeria Nsukka",
      "past": "Honourable Minister of Interior & Senate Minority Leader",
      "bio": "Senate Minority Leader representing Otukpo and the Idoma communities of Benue South.",
      "promises": [
        {
          "id": "p-be-sen-3",
          "title": "Free JAMB/WAEC Registration & Youth ICT Training in Otukpo",
          "category": "Education",
          "description": "Full payment of examination fees for 3,000 public school students.",
          "status": "fulfilled",
          "date_made": "2023-12-20",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "3,000 Candidates Paid in Full"
          ]
        }
      ]
    }
  ],
  "BO": [
    {
      "name": "Senator Kaka Shehu Lawan (SAN)",
      "district": "Borno Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "KL",
      "school": "Government College Maiduguri",
      "uni": "University of Maiduguri (LL.B) & BL",
      "past": "Attorney-General and Commissioner for Justice, Borno State",
      "bio": "Senior Advocate of Nigeria and Senator representing Maiduguri metropolis and Borno Central.",
      "promises": [
        {
          "id": "p-bo-sen-1",
          "title": "Establishment of Legal Aid & Youth Tech Centers in Maiduguri",
          "category": "Governance",
          "description": "Free legal representation and computer training for conflict-affected youths.",
          "status": "fulfilled",
          "date_made": "2023-10-10",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Tech Hub Opened in Maiduguri City"
          ]
        }
      ]
    },
    {
      "name": "Senator Mohammed Tahir Monguno",
      "district": "Borno North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "TM",
      "school": "Government Secondary School, Monguno",
      "uni": "University of Maiduguri (LL.B) & BL",
      "past": "Chief Whip of the House of Representatives & Commissioner",
      "bio": "Senate Majority Chief Whip and ranking lawmaker representing northern Borno Lake Chad basin.",
      "promises": [
        {
          "id": "p-bo-sen-2",
          "title": "Lake Chad Irrigation Water Pumps & Fertilizer Grant",
          "category": "Economy",
          "description": "Distribution of 2,000 solar irrigation water pumps to returnee farmers.",
          "status": "fulfilled",
          "date_made": "2023-11-25",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Pumps Handed Over in Monguno"
          ]
        }
      ]
    },
    {
      "name": "Senator Mohammed Ali Ndume",
      "district": "Borno South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AN",
      "school": "Comprehensive High School, Gwoza",
      "uni": "Federal Polytechnic Idah & University of Toledo, USA",
      "past": "Senate Leader & Chairman Senate Committee on Army",
      "bio": "Ranking Senator representing Gwoza, Biu, and southern Borno.",
      "promises": [
        {
          "id": "p-bo-sen-3",
          "title": "Rural Electrification & Transformer Installations in Biu",
          "category": "Infrastructure",
          "description": "Supplying 20 high-voltage transformers across rural farming communities.",
          "status": "fulfilled",
          "date_made": "2024-01-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Transformers Energized in Biu and Hawul"
          ]
        }
      ]
    }
  ],
  "CR": [
    {
      "name": "Senator Williams Eteng Jonah",
      "district": "Cross River Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "WJ",
      "school": "Secondary School, Yakurr",
      "uni": "University of Calabar",
      "past": "Speaker of the Cross River State House of Assembly (2019\u20132023)",
      "bio": "Former State Speaker and Senator representing Ikom and central Cross River.",
      "promises": [
        {
          "id": "p-cr-sen-1",
          "title": "Cocoa Processing Micro-Mills for Central Cross River Farmers",
          "category": "Economy",
          "description": "Supplying cocoa drying and processing machines to 1,000 farmers in Ikom.",
          "status": "fulfilled",
          "date_made": "2023-10-15",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Processing Mills Operational in Ikom"
          ]
        }
      ]
    },
    {
      "name": "Senator Jarigbe Agom Jarigbe",
      "district": "Cross River North Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "JJ",
      "school": "Secondary School, Ogoja",
      "uni": "University of Calabar (B.Sc & LL.B)",
      "past": "Member House of Representatives & Ranking Senator",
      "bio": "Ranking Senator representing Ogoja, Bekwarra, and northern Cross River.",
      "promises": [
        {
          "id": "p-cr-sen-2",
          "title": "Ogoja Solar Streetlighting and Rural Electrification Grid",
          "category": "Infrastructure",
          "description": "Installation of 800 solar streetlights across Ogoja and Yala LGAs.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "800 Solar Lights Installed"
          ]
        }
      ]
    },
    {
      "name": "Senator Asuquo Ekpenyong",
      "district": "Cross River South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AE",
      "school": "King's College, Lagos",
      "uni": "University of Reading, UK (Economics) & University of London (M.Sc)",
      "past": "Commissioner for Finance, Cross River State (2015\u20132022)",
      "bio": "Economist, banker, and youngest Senator in the 10th Senate representing Calabar.",
      "promises": [
        {
          "id": "p-cr-sen-3",
          "title": "Calabar Youth Fintech & Creative Entertainment Fund",
          "category": "Education",
          "description": "Direct startup grants for 500 young software and creative entrepreneurs in Calabar.",
          "status": "fulfilled",
          "date_made": "2024-02-10",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Youth Entrepreneurs Funded"
          ]
        }
      ]
    }
  ],
  "DE": [
    {
      "name": "Senator Ede Dafinone (FCA)",
      "district": "Delta Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "ED",
      "school": "King's College, Lagos",
      "uni": "University of Manchester (B.Sc Economics) & London Business School",
      "past": "Chairman NEXIM Bank & Managing Partner Horwath Dafinone",
      "bio": "Chartered accountant and Senator representing the Urhobo nation of Delta Central.",
      "promises": [
        {
          "id": "p-de-sen-1",
          "title": "Urhobo Youth Artisanal Tooling & Entrepreneurship Endowment",
          "category": "Economy",
          "description": "Vocational kits and startup capital for 1,500 youths in Ughelli and Sapele.",
          "status": "fulfilled",
          "date_made": "2023-11-05",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Tooling Kits Distributed in Ughelli"
          ]
        }
      ]
    },
    {
      "name": "Senator Ned Munir Nwoko",
      "district": "Delta North Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "NN",
      "school": "Secondary School, Aniocha",
      "uni": "Keele University, UK (B.A. Law) & King's College London (LL.M)",
      "past": "Member House of Representatives (1999\u20132003) & International Lawyer",
      "bio": "International legal consultant and Senator representing Anioma nation in Delta North.",
      "promises": [
        {
          "id": "p-de-sen-2",
          "title": "Establishment of Sports University & Anioma Tourism Grid",
          "category": "Education",
          "description": "Educational sports scholarships for 1,000 talented youths in Asaba.",
          "status": "fulfilled",
          "date_made": "2023-12-12",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "Scholarships Awarded to Verified Students"
          ]
        }
      ]
    },
    {
      "name": "Senator Joel-Onowakpo Thomas (FCA)",
      "district": "Delta South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JT",
      "school": "Comprehensive High School, Isoko",
      "uni": "Rivers State University & University of Lagos",
      "past": "Executive Chairman Delta State Internal Revenue Service (DBIR)",
      "bio": "Tax administrator, accountant, and Senator representing Warri and southern Delta.",
      "promises": [
        {
          "id": "p-de-sen-3",
          "title": "Riverine Community Solar Water Schemes in Warri Coastal Wards",
          "category": "Infrastructure",
          "description": "Solar water desalination and purification plants in Ijaw/Itsekiri coastal wards.",
          "status": "fulfilled",
          "date_made": "2024-03-01",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "12 Coastal Water Plants Functional"
          ]
        }
      ]
    }
  ],
  "EB": [
    {
      "name": "Senator Anthony Ani",
      "district": "Ebonyi South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Afikpo",
      "uni": "University of Nigeria Nsukka",
      "past": "Professor of Agriculture & Community Leader",
      "bio": "Agronomist and Senator representing Afikpo and southern Ebonyi.",
      "promises": [
        {
          "id": "p-eb-sen-1",
          "title": "Rice Milling Tech Support & Seedlings for 1,000 Farmers",
          "category": "Economy",
          "description": "High-yield seedlings and destoner machines for Afikpo rice cooperatives.",
          "status": "fulfilled",
          "date_made": "2024-03-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Destoners Distributed in Afikpo"
          ]
        }
      ]
    },
    {
      "name": "Senator Ken Eze",
      "district": "Ebonyi Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "KE",
      "school": "Secondary School, Ezza",
      "uni": "Ebonyi State University",
      "past": "Executive Chairman Ezza South LGA",
      "bio": "Senator representing Ezza, Ishielu, and central Ebonyi.",
      "promises": [
        {
          "id": "p-eb-sen-2",
          "title": "Rehabilitation of Rural Classrooms and Solar Streetlights",
          "category": "Education",
          "description": "Renovation of 15 primary schools and installation of 300 solar streetlights.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Classrooms Renovated"
          ]
        }
      ]
    },
    {
      "name": "Senator Peter Onyekachi Nwebonyi",
      "district": "Ebonyi North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "PN",
      "school": "Secondary School, Izzi",
      "uni": "Ebonyi State University (LL.B) & BL",
      "past": "State Chairman PDP & Commissioner for Special Projects",
      "bio": "Deputy Senate Chief Whip and Senator representing Abakaliki and Ebonyi North.",
      "promises": [
        {
          "id": "p-eb-sen-3",
          "title": "Abakaliki Urban Streetlighting & Market Solarization",
          "category": "Infrastructure",
          "description": "Solar power installation in Abakaliki Main Market.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Power Live in Abakaliki Market"
          ]
        }
      ]
    }
  ],
  "ED": [
    {
      "name": "Senator Adams Aliyu Oshiomhole (CON)",
      "district": "Edo North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Adams_Oshiomhole.jpg/440px-Adams_Oshiomhole.jpg",
      "initials": "AO",
      "school": "Secondary School, Iyamho",
      "uni": "Ruskin College, Oxford, UK (Industrial Relations)",
      "past": "National Chairman APC, Two-Term Governor of Edo State & President NLC",
      "bio": "Veteran labor union leader, former Governor, and Senator representing Auchi and Edo North.",
      "promises": [
        {
          "id": "p-ed-sen-1",
          "title": "Technical Vocational Institute and Skills Acquisition in Auchi",
          "category": "Education",
          "description": "State-of-the-art vocational academy training 2,000 youths in modern mechanics and carpentry.",
          "status": "fulfilled",
          "date_made": "2023-08-20",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "Technical Workshop Commissioned in Auchi"
          ]
        }
      ]
    },
    {
      "name": "Senator Neda Imasuen",
      "district": "Edo South Senatorial District",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "NI",
      "school": "Eghosa Grammar School, Benin City",
      "uni": "University of Maiduguri (LL.B) & Long Island University, New York",
      "past": "Senior Legislative Aide & Legal Practitioner",
      "bio": "Chairman Senate Committee on Ethics, Privileges and Public Petitions representing Benin City.",
      "promises": [
        {
          "id": "p-ed-sen-2",
          "title": "Benin City Flood Drainage Control & Community Water Boreholes",
          "category": "Infrastructure",
          "description": "Construction of 18 solar-powered water schemes in Benin metropolis.",
          "status": "fulfilled",
          "date_made": "2023-11-10",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "18 Water Schemes Handed Over"
          ]
        }
      ]
    },
    {
      "name": "Senator Monday Okpebholo",
      "district": "Edo Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "MO",
      "school": "Udomi Community Secondary School",
      "uni": "University of Abuja",
      "past": "Senator representing Edo Central (2023\u20132024) & Governor of Edo State",
      "bio": "Businessman, lawmaker, and Governor of Edo State.",
      "promises": [
        {
          "id": "p-ed-sen-3",
          "title": "Ekpoma Hospital Equipment & Road Grading in Esan Land",
          "category": "Healthcare",
          "description": "Supply of modern diagnostic ultrasound machines to General Hospital Ekpoma.",
          "status": "fulfilled",
          "date_made": "2023-12-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Ultrasound Units Installed"
          ]
        }
      ]
    }
  ],
  "EK": [
    {
      "name": "Senator Cyril Fasuyi",
      "district": "Ekiti North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "CF",
      "school": "Secondary School, Ikole",
      "uni": "University of Ibadan",
      "past": "Business Executive and Community Philanthropist",
      "bio": "Senator representing Ikole, Ido-Osi, and northern Ekiti in the 10th Senate.",
      "promises": [
        {
          "id": "p-ek-sen-1",
          "title": "Agricultural Tractorization & Cassava Processing Plants",
          "category": "Economy",
          "description": "Supplying cassava processing machines to 15 rural women cooperatives.",
          "status": "fulfilled",
          "date_made": "2023-10-01",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Processing Plants Operational"
          ]
        }
      ]
    },
    {
      "name": "Senator Michael Opeyemi Bamidele (CON)",
      "district": "Ekiti Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "OB",
      "school": "Annunciation School, Ikere",
      "uni": "Obafemi Awolowo University (LL.B) & Franklin Pierce Law Center, USA (LL.M)",
      "past": "Senate Majority Leader, Member House of Representatives & Commissioner in Lagos",
      "bio": "Senate Majority Leader and ranking parliamentarian representing Ado-Ekiti.",
      "promises": [
        {
          "id": "p-ek-sen-2",
          "title": "Ado-Ekiti Medical Center & Free Statewide Tertiary Bursaries",
          "category": "Healthcare",
          "description": "Modern medical diagnostic center and bursaries for 2,500 undergraduates.",
          "status": "fulfilled",
          "date_made": "2023-07-15",
          "budget_allocated": "\u20a6750 Million",
          "progress_pct": 100,
          "milestones": [
            "Diagnostic Center Commissioned in Ado-Ekiti"
          ]
        }
      ]
    },
    {
      "name": "Senator Yemi Adaramodu",
      "district": "Ekiti South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "YA",
      "school": "Secondary School, Ilawe",
      "uni": "University of Maiduguri",
      "past": "Spokesperson of the Senate & Chief of Staff to the Governor",
      "bio": "Chairman Senate Committee on Media and Public Affairs representing Ikere and southern Ekiti.",
      "promises": [
        {
          "id": "p-ek-sen-3",
          "title": "Ikere-Ekiti Agro-Market Modernization and Solar Streetlights",
          "category": "Infrastructure",
          "description": "Installation of 500 solar poles and market stalls in Ikere.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Market Solar Grid Live in Ikere"
          ]
        }
      ]
    }
  ],
  "EN": [
    {
      "name": "Senator Kelvin Chukwu",
      "district": "Enugu East Senatorial District",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "KC",
      "school": "College of the Immaculate Conception (CIC) Enugu",
      "uni": "University of Nigeria Nsukka",
      "past": "Legal Practitioner and Corporate Director",
      "bio": "Senator representing Enugu metropolis, Nkanu, and Isi-Uzo.",
      "promises": [
        {
          "id": "p-en-sen-1",
          "title": "Youth Tech Hub and Free WAEC Registration in Enugu Metropolis",
          "category": "Education",
          "description": "Full payment of examination fees for 2,000 public school students.",
          "status": "fulfilled",
          "date_made": "2023-10-10",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Students Paid in Full in Enugu East"
          ]
        }
      ]
    },
    {
      "name": "Senator Okey Ezea (Ideke)",
      "district": "Enugu North Senatorial District",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "OE",
      "school": "St. Teresa's College, Nsukka",
      "uni": "University of Nigeria Nsukka (LL.B) & University of Lagos",
      "past": "Maritime Lawyer & Managing Director Ideke Shipping",
      "bio": "Maritime attorney and Senator representing Nsukka cultural zone in Enugu North.",
      "promises": [
        {
          "id": "p-en-sen-2",
          "title": "Nsukka Rural Solar Boreholes & Agro-Input Grants for Women",
          "category": "Infrastructure",
          "description": "Construction of 25 motorized solar water schemes across rural Nsukka wards.",
          "status": "fulfilled",
          "date_made": "2023-12-01",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "25 Water Schemes Commissioned in Nsukka"
          ]
        }
      ]
    },
    {
      "name": "Senator Osita Ngwu",
      "district": "Enugu West Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "ON",
      "school": "Secondary School, Udi",
      "uni": "Enugu State University of Science and Technology & London South Bank University",
      "past": "Senate Minority Whip & Corporate Energy Executive",
      "bio": "Senate Minority Whip and engineer representing Udi, Ezeagu, and Oji River.",
      "promises": [
        {
          "id": "p-en-sen-3",
          "title": "Rural Electrification & Industrial Transformers in Udi and Awgu",
          "category": "Infrastructure",
          "description": "Installation of 15 high-capacity transformers restoring grid power to farming villages.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Transformers Energized in Udi"
          ]
        }
      ]
    }
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
      "promises": [
        {
          "id": "p-fc-sen-1",
          "title": "Solar Boreholes and Vocational Skills Centers in AMAC & Bwari",
          "category": "Infrastructure",
          "description": "Empowering rural women and providing clean water across FCT area councils.",
          "status": "fulfilled",
          "date_made": "2023-11-01",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "20 Solar Boreholes Handed Over in Kuje and Bwari"
          ]
        }
      ]
    }
  ],
  "GO": [
    {
      "name": "Senator Mohammed Danjuma Goje",
      "district": "Gombe Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DG",
      "school": "Bauchi Teachers College",
      "uni": "Ahmadu Bello University (B.Sc Political Science)",
      "past": "Two-Term Governor of Gombe State (2003\u20132011) & Minister of State for Power",
      "bio": "Former Governor and ranking Senator representing Akko and Yamaltu/Deba.",
      "promises": [
        {
          "id": "p-go-sen-1",
          "title": "Solar Streetlight Grid & Community Hospitals in Kumo",
          "category": "Infrastructure",
          "description": "Installation of 1,000 solar poles and medical equipment in Kumo General Hospital.",
          "status": "fulfilled",
          "date_made": "2023-09-15",
          "budget_allocated": "\u20a6550 Million",
          "progress_pct": 100,
          "milestones": [
            "1,000 Solar Poles Installed in Akko"
          ]
        }
      ]
    },
    {
      "name": "Senator Ibrahim Hassan Dankwambo (OON)",
      "district": "Gombe North Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "ID",
      "school": "Central Primary School Gombe",
      "uni": "Ahmadu Bello University (B.Sc Accounting) & University of Lagos (M.Sc)",
      "past": "Accountant-General of the Federation & Two-Term Governor of Gombe State",
      "bio": "Chartered accountant, former Governor, and Senator representing Gombe metropolis and northern LGAs.",
      "promises": [
        {
          "id": "p-go-sen-2",
          "title": "Tertiary Educational Bursary for 1,500 Undergraduates",
          "category": "Education",
          "description": "Direct tuition bursary payments to university students from Gombe North.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Students Credited in Full"
          ]
        }
      ]
    },
    {
      "name": "Senator Anthony Siyako Yaro",
      "district": "Gombe South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AY",
      "school": "Secondary School, Kaltungo",
      "uni": "Ahmadu Bello University",
      "past": "Corporate Executive & Lawmaker",
      "bio": "Senator representing Billiri, Kaltungo, and southern Gombe.",
      "promises": [
        {
          "id": "p-go-sen-3",
          "title": "Agro-Inputs & Solar Water Pumps for Tangale Farmers",
          "category": "Economy",
          "description": "Supplying dry-season irrigation pumps to 800 farming cooperatives.",
          "status": "fulfilled",
          "date_made": "2024-02-10",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "800 Pumps Handed Over in Billiri"
          ]
        }
      ]
    }
  ],
  "IM": [
    {
      "name": "Senator Osita Izunaso",
      "district": "Imo West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "OI",
      "school": "De La Salle Secondary School, Owerri",
      "uni": "University of Jos (B.A.) & University of Abuja (LL.B)",
      "past": "National Organizing Secretary APC & Ranking Lawmaker",
      "bio": "Chairman Senate Committee on Capital Markets representing Orlu zone.",
      "promises": [
        {
          "id": "p-im-sen-1",
          "title": "Kpakpando Foundation Grants for 2,000 Persons with Disabilities",
          "category": "Economy",
          "description": "Empowerment grants and mobility carts for physically challenged citizens in Orlu.",
          "status": "fulfilled",
          "date_made": "2023-10-30",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Beneficiaries Empowered in Orlu"
          ]
        }
      ]
    },
    {
      "name": "Senator Ezenwa Francis Onyewuchi",
      "district": "Imo East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "EO",
      "school": "Secondary School, Owerri",
      "uni": "University of Nigeria Nsukka",
      "past": "Member House of Representatives & Ranking Senator",
      "bio": "Senator representing Owerri municipal and the 9 LGAs of Owerri zone.",
      "promises": [
        {
          "id": "p-im-sen-2",
          "title": "Owerri Metropolis Solar Electrification and Youth Tech Training",
          "category": "Infrastructure",
          "description": "Installation of 600 solar streetlights across Owerri urban corridors.",
          "status": "fulfilled",
          "date_made": "2023-12-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "600 Solar Poles Installed in Owerri"
          ]
        }
      ]
    },
    {
      "name": "Senator Patrick Ndubueze",
      "district": "Imo North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "PN",
      "school": "Secondary School, Okigwe",
      "uni": "Federal University of Technology, Owerri",
      "past": "Member House of Representatives & Engineer",
      "bio": "Engineer and Senator representing Okigwe and northern Imo in the 10th Senate.",
      "promises": [
        {
          "id": "p-im-sen-3",
          "title": "Rural Water Boreholes & Classrooms Rehabilitation in Okigwe",
          "category": "Infrastructure",
          "description": "Construction of 15 motorized water boreholes in Okigwe communities.",
          "status": "fulfilled",
          "date_made": "2024-01-25",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Water Boreholes Handed Over"
          ]
        }
      ]
    }
  ],
  "JI": [
    {
      "name": "Senator Babangida Hussaini",
      "district": "Jigawa North-West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BH",
      "school": "Government Secondary School, Kazaure",
      "uni": "Bayero University Kano & Federal University of Technology Yola",
      "past": "Permanent Secretary Federal Ministry of Works and Housing",
      "bio": "Administrator and Senator representing Gumel, Kazaure, and north-western Jigawa.",
      "promises": [
        {
          "id": "p-ji-sen-1",
          "title": "Solar Irrigation Water Pumps for 1,500 Wheat Farmers",
          "category": "Economy",
          "description": "Supply of irrigation equipment to expand wheat yields in Kazaure.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Pumps Handed Over"
          ]
        }
      ]
    },
    {
      "name": "Senator Ahmed Abdulhamid",
      "district": "Jigawa North-East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Hadejia",
      "uni": "Bayero University Kano",
      "past": "Member House of Representatives & Community Leader",
      "bio": "Senator representing Hadejia and the fertile river basin of north-eastern Jigawa.",
      "promises": [
        {
          "id": "p-ji-sen-2",
          "title": "Hadejia Embankment Flood Control Drainage Channels",
          "category": "Infrastructure",
          "description": "Reinforcement of river embankments to prevent annual flood disaster.",
          "status": "fulfilled",
          "date_made": "2023-09-10",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "Embankment Works Completed in Hadejia"
          ]
        }
      ]
    },
    {
      "name": "Senator Mustapha Khabeeb",
      "district": "Jigawa South-West Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "MK",
      "school": "Secondary School, Dutse",
      "uni": "Ahmadu Bello University",
      "past": "Public Administrator & Lawmaker",
      "bio": "Senator representing Dutse, Birnin Kudu, and south-western Jigawa.",
      "promises": [
        {
          "id": "p-ji-sen-3",
          "title": "Dutse Urban School Rehabilitation and Solar Clinic Supplies",
          "category": "Education",
          "description": "Renovation of 20 primary schools across Dutse and Birnin Kudu.",
          "status": "fulfilled",
          "date_made": "2024-02-05",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "20 Schools Upgraded"
          ]
        }
      ]
    }
  ],
  "KD": [
    {
      "name": "Senator Sunday Marshall Katung",
      "district": "Kaduna South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "SK",
      "school": "Kufena College, Zaria",
      "uni": "University of Lagos (LL.B) & BL",
      "past": "Member House of Representatives & Commissioner for Finance",
      "bio": "Lawyer and Senator representing Kafanchan, Zangon Kataf, and southern Kaduna.",
      "promises": [
        {
          "id": "p-kd-sen-1",
          "title": "Ginger Processing Cooperative Grants & Solar Clinics in Kafanchan",
          "category": "Economy",
          "description": "Granting processing machines and financial relief to 2,000 ginger farmers.",
          "status": "fulfilled",
          "date_made": "2023-10-20",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Processing Grants Credited to Cooperatives"
          ]
        }
      ]
    },
    {
      "name": "Senator Lawal Adamu Usman (Mr. LA)",
      "district": "Kaduna Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "LU",
      "school": "Government Secondary School, Kaduna",
      "uni": "Ahmadu Bello University (B.Sc)",
      "past": "Chairman Senate Committee on Basic and Secondary Education",
      "bio": "Education advocate and Senator representing Kaduna North, South, Chikun, and Igabi.",
      "promises": [
        {
          "id": "p-kd-sen-2",
          "title": "Tertiary Scholarship Scheme for 3,000 Undergraduates",
          "category": "Education",
          "description": "100% tuition sponsorship for 3,000 students in tertiary institutions across Kaduna Central.",
          "status": "fulfilled",
          "date_made": "2023-09-01",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "3,000 Students Awarded Full Tuition Scholarships"
          ]
        }
      ]
    },
    {
      "name": "Senator Khalid Mustapha",
      "district": "Kaduna North Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "KM",
      "school": "Barewa College, Zaria",
      "uni": "Ahmadu Bello University",
      "past": "Public Administrator & Lawmaker",
      "bio": "Senator representing Zaria, Sabon Gari, and northern Kaduna.",
      "promises": [
        {
          "id": "p-kd-sen-3",
          "title": "Zaria Solar Streetlight Grid & Vocational Skills Center",
          "category": "Infrastructure",
          "description": "Installation of 500 solar poles across Zaria educational corridor.",
          "status": "fulfilled",
          "date_made": "2024-01-10",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Solar Poles Energized in Zaria"
          ]
        }
      ]
    }
  ],
  "KN": [
    {
      "name": "Senator Barau I. Jibrin (CON)",
      "district": "Kano North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BJ",
      "school": "Secondary School, Bichi",
      "uni": "Bayero University Kano (B.Sc Accounting & MBA)",
      "past": "Deputy President of the Senate & Chairman Senate Committee on Appropriations",
      "bio": "Deputy President of the Senate of the Federal Republic of Nigeria.",
      "promises": [
        {
          "id": "p-kn-sen-1",
          "title": "Establishment of Barau Foundation ICT Centers Across Kano North",
          "category": "Education",
          "description": "Building modern computer centers and granting tertiary scholarships to 1,000 students.",
          "status": "fulfilled",
          "date_made": "2023-09-01",
          "budget_allocated": "\u20a61 Billion",
          "progress_pct": 100,
          "milestones": [
            "ICT Centers Built in Bichi and Gwarzo"
          ]
        }
      ]
    },
    {
      "name": "Senator Rufai Sani Hanga",
      "district": "Kano Central Senatorial District",
      "party": "New Nigeria Peoples Party (NNPP)",
      "photo_url": "",
      "initials": "RH",
      "school": "Government College Kano",
      "uni": "Bayero University Kano",
      "past": "Founding National Chairman Congress for Progressive Change (CPC)",
      "bio": "Senator representing the commercial heartland of Kano Central in the 10th Senate.",
      "promises": [
        {
          "id": "p-kn-sen-2",
          "title": "Solar Water Boreholes & Youth Artisan Grants",
          "category": "Infrastructure",
          "description": "Construction of 40 solar boreholes across Dala, Fagge, and Kano Municipal.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "40 Solar Water Systems Handed Over"
          ]
        }
      ]
    },
    {
      "name": "Senator Abdurrahman Kawu Sumaila",
      "district": "Kano South Senatorial District",
      "party": "New Nigeria Peoples Party (NNPP)",
      "photo_url": "",
      "initials": "KS",
      "school": "Secondary School, Sumaila",
      "uni": "Bayero University Kano",
      "past": "Senior Special Assistant to the President on NASS Matters",
      "bio": "Three-term Federal Representative and Senator representing Kano South.",
      "promises": [
        {
          "id": "p-kn-sen-3",
          "title": "Primary Health Clinic Upgrades Across 16 LGAs of Kano South",
          "category": "Healthcare",
          "description": "Supply of ambulances and essential drugs to rural maternity clinics.",
          "status": "fulfilled",
          "date_made": "2024-01-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "16 Ambulances Deployed Across Wards"
          ]
        }
      ]
    }
  ],
  "KT": [
    {
      "name": "Senator Abdulaziz Musa Yar'Adua",
      "district": "Katsina Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AY",
      "school": "Nigerian Military School, Zaria",
      "uni": "Nigerian Defence Academy (NDA Kaduna)",
      "past": "Retired Military Officer & Chairman Senate Committee on Army",
      "bio": "Retired Colonel and Senator representing Katsina Central in the 10th Senate.",
      "promises": [
        {
          "id": "p-kt-sen-1",
          "title": "Security Vigilante Support & Solar Lighting in Katsina City",
          "category": "Security",
          "description": "Supplying communication radios and patrol gear to community watch teams.",
          "status": "fulfilled",
          "date_made": "2023-11-05",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Patrol Gear Handed Over to Watch Units"
          ]
        }
      ]
    },
    {
      "name": "Senator Nasir Zangon Daura",
      "district": "Katsina North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "ND",
      "school": "Secondary School, Daura",
      "uni": "Ahmadu Bello University",
      "past": "Four-Term Member House of Representatives",
      "bio": "Ranking lawmaker representing Daura and northern Katsina.",
      "promises": [
        {
          "id": "p-kt-sen-2",
          "title": "Daura Irrigation Water Schemes & Fertilizer Subsidy",
          "category": "Economy",
          "description": "Supplying 1,000 solar pumps to dry-season farmers in Daura.",
          "status": "fulfilled",
          "date_made": "2023-12-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "1,000 Solar Pumps Distributed"
          ]
        }
      ]
    },
    {
      "name": "Senator Dandutse Muntari",
      "district": "Katsina South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DM",
      "school": "Secondary School, Funtua",
      "uni": "Bayero University Kano",
      "past": "Member House of Representatives & Commissioner",
      "bio": "Senator representing Funtua, Malumfashi, and southern Katsina.",
      "promises": [
        {
          "id": "p-kt-sen-3",
          "title": "Funtua Agro-Cotton Farmers Cooperative Grants",
          "category": "Economy",
          "description": "Supplying quality cotton seeds and pesticides to 2,000 farmers in Funtua.",
          "status": "fulfilled",
          "date_made": "2024-02-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Inputs Handed Over to Cotton Farmers"
          ]
        }
      ]
    }
  ],
  "KB": [
    {
      "name": "Senator Muhammad Adamu Aliero",
      "district": "Kebbi Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AA",
      "school": "Government Secondary School, Koko",
      "uni": "Ahmadu Bello University (B.Sc Political Science)",
      "past": "Two-Term Governor of Kebbi State & Honourable Minister of FCT",
      "bio": "Former Governor, Federal Minister, and ranking Senator representing Birnin Kebbi.",
      "promises": [
        {
          "id": "p-kb-sen-1",
          "title": "Birnin Kebbi Solar Streetlights & Community Water Systems",
          "category": "Infrastructure",
          "description": "Installation of 600 solar streetlights across Birnin Kebbi metropolis.",
          "status": "fulfilled",
          "date_made": "2023-10-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "600 Solar Poles Installed in Birnin Kebbi"
          ]
        }
      ]
    },
    {
      "name": "Senator Yahaya Abdullahi",
      "district": "Kebbi North Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "YA",
      "school": "Secondary School, Argungu",
      "uni": "Ahmadu Bello University (Ph.D)",
      "past": "Senate Majority Leader 9th Senate & Permanent Secretary",
      "bio": "Former Senate Leader and Professor representing Argungu and northern Kebbi.",
      "promises": [
        {
          "id": "p-kb-sen-2",
          "title": "Argungu Rice Farmers Mechanization Support",
          "category": "Economy",
          "description": "Supplying power tillers and motorized sprayers to 1,200 farmers.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Tillers Distributed in Argungu"
          ]
        }
      ]
    },
    {
      "name": "Senator Garba Maidoki",
      "district": "Kebbi South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "GM",
      "school": "Secondary School, Zuru",
      "uni": "Usmanu Danfodiyo University",
      "past": "Public Administrator & Lawmaker",
      "bio": "Senator representing Zuru, Yauri, and southern Kebbi.",
      "promises": [
        {
          "id": "p-kb-sen-3",
          "title": "Yauri Artisanal Fishermen Grants and Clinic Upgrades",
          "category": "Economy",
          "description": "Outboard engines and fishing nets distributed to 600 fishermen in Yauri.",
          "status": "fulfilled",
          "date_made": "2024-01-30",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Fishing Equipment Handed Over"
          ]
        }
      ]
    }
  ],
  "KG": [
    {
      "name": "Senator Jibrin Isah Echocho",
      "district": "Kogi East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JI",
      "school": "St. Charles College, Ankpa",
      "uni": "Bayero University Kano & University of Lagos",
      "past": "Executive Director Afribank & Chairman Senate Committee on Customs",
      "bio": "Chartered banker, economist, and ranking Senator representing Igala land in Kogi East.",
      "promises": [
        {
          "id": "p-kg-sen-1",
          "title": "Cashew Processing Mills & Micro-Grants in Anyigba and Ankpa",
          "category": "Economy",
          "description": "Supplying cashew drying and bagging machines to 1,500 farmers in Kogi East.",
          "status": "fulfilled",
          "date_made": "2023-09-20",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "Processing Mills Operational in Anyigba"
          ]
        }
      ]
    },
    {
      "name": "Senator Sunday Steve Karimi",
      "district": "Kogi West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SK",
      "school": "Secondary School, Kabba",
      "uni": "University of Ilorin",
      "past": "Chairman Senate Committee on Senate Services & Two-Term House Member",
      "bio": "Engineer, businessman, and Senator representing Lokoja, Kabba, and Kogi West.",
      "promises": [
        {
          "id": "p-kg-sen-2",
          "title": "Construction of Ultra-Modern Military Base in Kabba/Yagba",
          "category": "Security",
          "description": "Building and equipping a Forward Operating Military Base in Yagba West to eliminate banditry.",
          "status": "fulfilled",
          "date_made": "2024-03-01",
          "budget_allocated": "\u20a6300 Million Personal/Endowment Fund",
          "progress_pct": 100,
          "milestones": [
            "Military Base Commissioned and Handed to Nigerian Army"
          ]
        }
      ]
    },
    {
      "name": "Senator Natasha Hadiza Akpoti-Uduaghan",
      "district": "Kogi Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "NA",
      "school": "Federal Government Girls College, Bwari",
      "uni": "University of Abuja (LL.B), BL & University of Dundee, UK (LL.M)",
      "past": "Legal Practitioner, Ajaokuta Steel Advocate & Social Entrepreneur",
      "bio": "Barrister, social crusader for industrialization, and Senator representing Okene and Kogi Central.",
      "promises": [
        {
          "id": "p-kg-sen-3",
          "title": "\u20a650,000 Micro-Grants for 1,500 Women Traders & 500 Solar Poles in Ebiraland",
          "category": "Economy",
          "description": "Direct cash grants to 1,500 petty market traders and solar electrification across Okene, Adavi, and Okehi.",
          "status": "fulfilled",
          "date_made": "2024-01-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Market Women Credited in Okene",
            "500 Solar Poles Energized"
          ]
        }
      ]
    }
  ],
  "KW": [
    {
      "name": "Senator Sadiq Umar",
      "district": "Kwara North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SU",
      "school": "Government Secondary School, Kaiama",
      "uni": "Ahmadu Bello University (B.Pharm)",
      "past": "Pharmacist, Public Health Consultant & Ranking Senator",
      "bio": "Pharmacist and Chairman Senate Committee on Trade & Investment representing Kwara North.",
      "promises": [
        {
          "id": "p-kw-sen-1",
          "title": "Construction of Primary Healthcare Centers in Kaiama & Edu",
          "category": "Healthcare",
          "description": "Equipping 6 rural cottage clinics with solar inverters and delivery beds.",
          "status": "fulfilled",
          "date_made": "2023-11-10",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "6 Rural Clinics Fully Equipped"
          ]
        }
      ]
    },
    {
      "name": "Senator Lola Ashiru",
      "district": "Kwara South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "LA",
      "school": "Iyeru Okin Grammar School, Offa",
      "uni": "University of Lagos (B.Sc Architecture)",
      "past": "Deputy Senate Leader & Architect",
      "bio": "Deputy Senate Leader and architect representing Offa, Omu-Aran, and Kwara South.",
      "promises": [
        {
          "id": "p-kw-sen-2",
          "title": "Offa Industrial Cottage Workshop & Solar Streetlights Grid",
          "category": "Infrastructure",
          "description": "Installation of 500 solar streetlights across Offa and Oyun LGAs.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Solar Poles Installed in Offa"
          ]
        }
      ]
    },
    {
      "name": "Senator Salihu Mustapha (Turaki of Ilorin)",
      "district": "Kwara Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SM",
      "school": "Federal Government College, Ilorin",
      "uni": "Kaduna Polytechnic (Business Administration)",
      "past": "National Deputy Chairman CPC & Philanthropist",
      "bio": "Chairman Senate Committee on Agriculture representing Ilorin metropolis and Kwara Central.",
      "promises": [
        {
          "id": "p-kw-sen-3",
          "title": "\u20a6200M Educational Scholarship & Free JAMB/WAEC for 2,500 Ilorin Youths",
          "category": "Education",
          "description": "Full payment of examination fees and tertiary education grants for indigent students in Ilorin.",
          "status": "fulfilled",
          "date_made": "2023-08-15",
          "budget_allocated": "\u20a6200 Million",
          "progress_pct": 100,
          "milestones": [
            "2,500 Students Sponsored in Ilorin Wards"
          ]
        }
      ]
    }
  ],
  "LA": [
    {
      "name": "Senator Mukhail Adetokunbo Abiru (FCA)",
      "district": "Lagos East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "TA",
      "school": "King's College, Lagos",
      "uni": "Lagos State University (B.Sc Economics) & Harvard Business School",
      "past": "MD/CEO of Polaris Bank & Commissioner for Finance Lagos State",
      "bio": "Chartered accountant, banker, and Chairman of the Southern Senators Forum.",
      "promises": [
        {
          "id": "p-la-sen-1",
          "title": "SAIL Innovation Lab Tech Training for 5,000 Youths",
          "category": "Education",
          "description": "Free tech training in AI, data science, and web development for youths in Ikorodu.",
          "status": "fulfilled",
          "date_made": "2023-08-10",
          "budget_allocated": "\u20a6500 Million Tech Endowment",
          "progress_pct": 100,
          "milestones": [
            "5,000 Youths Certified in Software Skills"
          ]
        }
      ]
    },
    {
      "name": "Senator Wasiu Eshilokun Sanni",
      "district": "Lagos Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "WS",
      "school": "Ansar-Ud-Deen College, Isolo",
      "uni": "University of Lagos & Ogun State University",
      "past": "Deputy Speaker Lagos State House of Assembly & Chairman Lagos Island LGA",
      "bio": "Lawmaker and Chairman Senate Committee on Marine Transport.",
      "promises": [
        {
          "id": "p-la-sen-2",
          "title": "Rehabilitation of Primary Healthcare Centers in Lagos Island",
          "category": "Healthcare",
          "description": "Provision of solar inverters and medical supplies to community health clinics.",
          "status": "fulfilled",
          "date_made": "2023-12-01",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "6 Clinics Solarized and Equipped"
          ]
        }
      ]
    },
    {
      "name": "Dr. Idiat Oluranti Adebule",
      "district": "Lagos West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "IA",
      "school": "Awori College, Ojo",
      "uni": "Lagos State University (B.Ed, M.Ed & Ph.D)",
      "past": "Deputy Governor of Lagos State (2015\u20132019) & Secretary to the State Government",
      "bio": "Educationist, former Deputy Governor, and Senator representing Lagos West.",
      "promises": [
        {
          "id": "p-la-sen-3",
          "title": "Scholarship Grants for 2,000 Tertiary Undergraduates",
          "category": "Education",
          "description": "Direct education grants for indigent undergraduates across Alimosho and Badagry.",
          "status": "fulfilled",
          "date_made": "2024-03-01",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Undergraduates Received Bursary"
          ]
        }
      ]
    }
  ],
  "NA": [
    {
      "name": "Senator Mohammed Ogoshi Onawo",
      "district": "Nasarawa South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "MO",
      "school": "Secondary School, Doma",
      "uni": "University of Jos",
      "past": "Speaker of the Nasarawa State House of Assembly & House Member",
      "bio": "Senator representing Lafia, Doma, and southern Nasarawa.",
      "promises": [
        {
          "id": "p-na-sen-1",
          "title": "Lafia Urban School Rehabilitation & Solar Borehole Project",
          "category": "Education",
          "description": "Renovation of 15 classrooms and provision of solar water in Lafia.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Classrooms Renovated"
          ]
        }
      ]
    },
    {
      "name": "Senator Godiya Akwashiki",
      "district": "Nasarawa North Senatorial District",
      "party": "Social Democratic Party (SDP)",
      "photo_url": "",
      "initials": "GA",
      "school": "Government Secondary School, Nassarawa Eggon",
      "uni": "University of Jos",
      "past": "Deputy Speaker Nasarawa Assembly & Chairman Senate Air Force Committee",
      "bio": "Chairman Senate Committee on Air Force representing Akwanga, Wamba, and Eggon communities.",
      "promises": [
        {
          "id": "p-na-sen-2",
          "title": "Rural Electrification & Transformer Grid in Akwanga and Wamba",
          "category": "Infrastructure",
          "description": "Supplying 15 high-voltage transformers to rural farming settlements.",
          "status": "fulfilled",
          "date_made": "2023-12-10",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Transformers Energized"
          ]
        }
      ]
    },
    {
      "name": "Senator Ahmed Aliyu Wadada",
      "district": "Nasarawa West Senatorial District",
      "party": "Social Democratic Party (SDP)",
      "photo_url": "",
      "initials": "AW",
      "school": "Government Secondary School, Keffi",
      "uni": "Federal Polytechnic Idah",
      "past": "Two-Term House Member & Chairman Senate Public Accounts Committee",
      "bio": "Chairman Senate Committee on Public Accounts representing Keffi, Karu, and western Nasarawa.",
      "promises": [
        {
          "id": "p-na-sen-3",
          "title": "Karu-Mararaba Youth ICT Empowerment Hub & Artisan Grants",
          "category": "Education",
          "description": "Modern software and digital academy training 1,000 youths in Karu corridor.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Tech Academy Operational in Karu"
          ]
        }
      ]
    }
  ],
  "NI": [
    {
      "name": "Senator Mohammed Sani Musa (313)",
      "district": "Niger East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SM",
      "school": "Government Secondary School, Minna",
      "uni": "Ahmadu Bello University (B.Sc Business Administration)",
      "past": "Chairman Senate Committee on Finance & Ranking Senator",
      "bio": "Chairman Senate Committee on Finance representing Minna, Suleja, and eastern Niger.",
      "promises": [
        {
          "id": "p-ni-sen-1",
          "title": "Suleja and Minna Township Solar Streetlight Network",
          "category": "Infrastructure",
          "description": "Installation of 800 solar streetlights across commercial roads in Minna and Suleja.",
          "status": "fulfilled",
          "date_made": "2023-10-15",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "800 Solar Poles Installed"
          ]
        }
      ]
    },
    {
      "name": "Senator Abubakar Sani Bello (Lolo)",
      "district": "Niger North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AB",
      "school": "Nigerian Military School, Zaria",
      "uni": "University of Maiduguri (B.Sc Economics)",
      "past": "Two-Term Governor of Niger State (2015\u20132023)",
      "bio": "Former Governor and Chairman Senate Committee on Foreign Affairs representing Kontagora.",
      "promises": [
        {
          "id": "p-ni-sen-2",
          "title": "Kontagora Hospital Modernization and Ultrasound Scanner Grant",
          "category": "Healthcare",
          "description": "Supplying modern medical equipment to General Hospital Kontagora.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Equipment Delivered to Kontagora Hospital"
          ]
        }
      ]
    },
    {
      "name": "Senator Peter Ndalikali Jiya",
      "district": "Niger South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "PJ",
      "school": "Secondary School, Bida",
      "uni": "Ahmadu Bello University (LL.B) & BL",
      "past": "Legal Practitioner & Lawmaker",
      "bio": "Lawyer and Senator representing Bida, Agaie, and the Nupe heartland in southern Niger.",
      "promises": [
        {
          "id": "p-ni-sen-3",
          "title": "Bida Rice Millers Modernization Grant & Solar Boreholes",
          "category": "Economy",
          "description": "Supplying destoners and milling gear to 1,000 Nupe rice farmers.",
          "status": "fulfilled",
          "date_made": "2024-02-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Milling Units Distributed in Bida"
          ]
        }
      ]
    }
  ],
  "OG": [
    {
      "name": "Senator Otunba Gbenga Daniel (OGD)",
      "district": "Ogun East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gbenga_Daniel.jpg/440px-Gbenga_Daniel.jpg",
      "initials": "GD",
      "school": "Baptist Boys' High School, Abeokuta",
      "uni": "University of Lagos (B.Sc Mechanical Eng & MBA)",
      "past": "Two-Term Governor of Ogun State (2003\u20132011) & Chairman Kresta Laurel",
      "bio": "Fellow of the Nigerian Society of Engineers, former Governor, and Senator representing Ijebu and Remo.",
      "promises": [
        {
          "id": "p-og-sen-1",
          "title": "Gateway Front Foundation Skills Tech Training & Empowerment in Sagamu",
          "category": "Education",
          "description": "Vocational kits and digital skills empowerment for 2,000 youths across Ijebu and Remo.",
          "status": "fulfilled",
          "date_made": "2023-09-15",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Youths Empowered in Sagamu"
          ]
        }
      ]
    },
    {
      "name": "Senator Shuaib Afolabi Salisu",
      "district": "Ogun Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SS",
      "school": "Secondary School, Abeokuta",
      "uni": "University of Lagos (B.Sc Computer Science & MBA)",
      "past": "Chief of Staff to the Governor & Chairman Senate Committee on ICT/Cybersecurity",
      "bio": "IT expert, corporate executive, and Chairman Senate Committee on ICT representing Abeokuta.",
      "promises": [
        {
          "id": "p-og-sen-2",
          "title": "Establishment of Tech Innovation Hubs Across Abeokuta Metropolis",
          "category": "Education",
          "description": "Free high-speed internet coding centers for tertiary students in Abeokuta.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Coding Hubs Opened in Abeokuta South"
          ]
        }
      ]
    },
    {
      "name": "Senator Solomon Olamilekan Adeola (Yayi - FCA)",
      "district": "Ogun West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SA",
      "school": "State High School, Alimosho",
      "uni": "Federal Polytechnic Ilaro (HND Accounting) & D.Sc",
      "past": "Chairman Senate Committee on Appropriations & Three-Term Senator",
      "bio": "Chairman Senate Committee on Appropriations representing Yewa/Awori in Ogun West.",
      "promises": [
        {
          "id": "p-og-sen-3",
          "title": "\u20a61 Billion Tertiary Scholarship Fund & Mega ICT Centers in Ilaro and Ota",
          "category": "Education",
          "description": "Bursary grants to 5,000 university students and ultra-modern computer testing centers in Ilaro.",
          "status": "fulfilled",
          "date_made": "2023-08-01",
          "budget_allocated": "\u20a61 Billion",
          "progress_pct": 100,
          "milestones": [
            "5,000 Undergraduates Received Bursaries",
            "Ilaro ICT Mega Center Commissioned"
          ]
        }
      ]
    }
  ],
  "ON": [
    {
      "name": "Senator Barr. Jimoh Ibrahim (CFR)",
      "district": "Ondo South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JI",
      "school": "Comprehensive High School, Okitipupa",
      "uni": "Lagos State University (LL.B), Harvard Law School (LL.M) & University of Cambridge (Ph.D)",
      "past": "Chairman Global Fleet Group, NICON Insurance & Philanthropist",
      "bio": "Billionaire investor, legal scholar, and Chairman Senate Committee on Inter-Parliamentary Affairs representing Ikale and Ilaje.",
      "promises": [
        {
          "id": "p-on-sen-1",
          "title": "\u20a6300M Financial Empowerment for 1,500 Women in Okitipupa and Ilaje",
          "category": "Economy",
          "description": "Direct cash grants to coastal market women and artisan fish traders.",
          "status": "fulfilled",
          "date_made": "2023-10-10",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Women Credited in Okitipupa"
          ]
        }
      ]
    },
    {
      "name": "Senator Adeniyi Adegbonmire (SAN)",
      "district": "Ondo Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "NA",
      "school": "Aquinas College, Akure",
      "uni": "University of Ife (LL.B) & BL",
      "past": "Senior Advocate of Nigeria & Chairman Senate Committee on Judiciary",
      "bio": "Senior Advocate of Nigeria and Chairman Senate Judiciary Committee representing Akure and Ondo town.",
      "promises": [
        {
          "id": "p-on-sen-2",
          "title": "Akure Metropolitan Solar Electrification and Classroom Upgrades",
          "category": "Infrastructure",
          "description": "Installation of 500 solar streetlights across Akure South and North.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Solar Poles Energized in Akure"
          ]
        }
      ]
    },
    {
      "name": "Senator Jide Ipinsagba",
      "district": "Ondo North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JI",
      "school": "Secondary School, Ikare-Akoko",
      "uni": "Federal University of Technology, Akure",
      "past": "Industrialist & Community Leader",
      "bio": "Senator representing Owo, Ikare, and the Akoko hills of northern Ondo.",
      "promises": [
        {
          "id": "p-on-sen-3",
          "title": "Cocoa Agro-Processing Support and Fertilizer Grants in Owo",
          "category": "Economy",
          "description": "Supplying farming chemicals and subsidized fertilizers to 1,200 farmers.",
          "status": "fulfilled",
          "date_made": "2024-02-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Fertilizers Handed Over in Owo and Ikare"
          ]
        }
      ]
    }
  ],
  "OS": [
    {
      "name": "Senator Francis Adenigba Fadahunsi (MFR)",
      "district": "Osun East Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "FF",
      "school": "Secondary School, Ilase",
      "uni": "Higher Education in Customs Administration",
      "past": "Assistant Comptroller-General of Nigeria Customs Service",
      "bio": "Retired customs chief and two-term Senator representing Ilesa and Ife in Osun East.",
      "promises": [
        {
          "id": "p-os-sen-1",
          "title": "Ilesa & Ile-Ife Urban Solar Streetlight Grid",
          "category": "Infrastructure",
          "description": "Installation of 600 all-in-one solar streetlights along commercial avenues.",
          "status": "fulfilled",
          "date_made": "2023-10-25",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "600 Solar Poles Energized in Ife and Ilesa"
          ]
        }
      ]
    },
    {
      "name": "Senator Olubiyi Fadeyi (Ajagunla)",
      "district": "Osun Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "OF",
      "school": "Secondary School, Ila Orangun",
      "uni": "University of Ife & Harvard Executive Education",
      "past": "Corporate Executive & Philanthropist",
      "bio": "Senator representing Osogbo metropolis, Ila Orangun, and central Osun.",
      "promises": [
        {
          "id": "p-os-sen-2",
          "title": "Tertiary Educational Bursary for 2,000 Students in Osogbo",
          "category": "Education",
          "description": "Direct bursary payments for undergraduates in state and federal institutions.",
          "status": "fulfilled",
          "date_made": "2023-11-30",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Students Credited"
          ]
        }
      ]
    },
    {
      "name": "Senator Kamorudeen Lere Oyewumi",
      "district": "Osun West Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "LO",
      "school": "Secondary School, Ikire",
      "uni": "University of Ife (Ph.D)",
      "past": "Deputy Senate Minority Leader & Chairman Irewole LGA",
      "bio": "Deputy Senate Minority Leader and academic representing Ede, Iwo, and western Osun.",
      "promises": [
        {
          "id": "p-os-sen-3",
          "title": "Iwo and Ede Motorized Solar Water Schemes",
          "category": "Infrastructure",
          "description": "Construction of 18 solar-powered water schemes in rural communities.",
          "status": "fulfilled",
          "date_made": "2024-01-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "18 Water Schemes Functional"
          ]
        }
      ]
    }
  ],
  "OY": [
    {
      "name": "Senator Sharafadeen Abiodun Alli",
      "district": "Oyo South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SA",
      "school": "Ibadan Grammar School",
      "uni": "University of Ibadan (LL.B) & BL",
      "past": "Secretary to the State Government (SSG) & Chairman Odu'a Investment",
      "bio": "Barrister, former SSG, and Chairman Senate Committee on INEC representing Ibadan.",
      "promises": [
        {
          "id": "p-oy-sen-1",
          "title": "\u20a6100M Micro-Credit Fund for Ibadan Traders & Solar Boreholes",
          "category": "Economy",
          "description": "Zero-interest micro grants to 2,000 market women in Bodija and Dugbe.",
          "status": "fulfilled",
          "date_made": "2023-11-10",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Market Traders Credited"
          ]
        }
      ]
    },
    {
      "name": "Senator Dr. Yunus Abiodun Akintunde",
      "district": "Oyo Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "YA",
      "school": "Secondary School, Oyo",
      "uni": "University of Ibadan (Ph.D Energy Studies)",
      "past": "Commissioner for Works and Transport & Energy Consultant",
      "bio": "Energy consultant and Chairman Senate Committee on Environment representing Oyo town and Ogbomoso axis.",
      "promises": [
        {
          "id": "p-oy-sen-2",
          "title": "Oyo and Ogbomoso Solar Mini-Grids & ICT Classrooms",
          "category": "Infrastructure",
          "description": "Installation of 500 solar streetlights across Oyo Central LGAs.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Solar Poles Commissioned"
          ]
        }
      ]
    },
    {
      "name": "Senator Dr. Abdulfatai Omotayo Buhari",
      "district": "Oyo North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "FB",
      "school": "Secondary School, Ogbomoso",
      "uni": "University of Ilorin & University of Abuja (Ph.D)",
      "past": "Three-Term Senator & Chairman Senate Committee on Aviation",
      "bio": "Chairman Senate Committee on Aviation representing Saki, Iseyin, and Oke-Ogun.",
      "promises": [
        {
          "id": "p-oy-sen-3",
          "title": "ICT Testing Centers & Fertilizer Grants for Oke-Ogun Farmers",
          "category": "Education",
          "description": "Modern JAMB computer testing mega-center built in Iseyin and Saki.",
          "status": "fulfilled",
          "date_made": "2024-02-20",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "JAMB Mega Center Commissioned in Iseyin"
          ]
        }
      ]
    }
  ],
  "PL": [
    {
      "name": "Senator Simon Bako Lalong (CON)",
      "district": "Plateau South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SL",
      "school": "GSS Shendam",
      "uni": "Ahmadu Bello University (LL.B) & BL",
      "past": "Two-Term Governor of Plateau State & Minister of Labour",
      "bio": "Former Governor and Federal Minister representing Shendam and southern Plateau.",
      "promises": [
        {
          "id": "p-pl-sen-1",
          "title": "Shendam Vocational Skills Center & Solar Irrigation Pumps",
          "category": "Economy",
          "description": "Supplying irrigation pumps to 1,000 farmers in Shendam.",
          "status": "fulfilled",
          "date_made": "2024-01-15",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Pumps Distributed in Shendam"
          ]
        }
      ]
    },
    {
      "name": "Senator Diket Plang",
      "district": "Plateau Central Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DP",
      "school": "Secondary School, Pankshin",
      "uni": "University of Jos",
      "past": "Chairman Senate Committee on Labour and Productivity",
      "bio": "Senator representing Mangu, Pankshin, and central Plateau.",
      "promises": [
        {
          "id": "p-pl-sen-2",
          "title": "Pankshin Rural Health Clinics Upgrades & Solar Water Boreholes",
          "category": "Healthcare",
          "description": "Equipping 10 community maternity centers with delivery kits.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "10 Clinics Equipped"
          ]
        }
      ]
    },
    {
      "name": "Senator Pam Mwadkon Dachungyang",
      "district": "Plateau North Senatorial District",
      "party": "Action Democratic Party (ADP)",
      "photo_url": "",
      "initials": "PD",
      "school": "Secondary School, Jos",
      "uni": "University of Jos",
      "past": "Community Leader & Parliamentarian",
      "bio": "Senator representing Jos North, South, and northern Plateau.",
      "promises": [
        {
          "id": "p-pl-sen-3",
          "title": "Jos Metropolis Peace Empowerment and Youth Artisan Tooling",
          "category": "Economy",
          "description": "Tooling kits and tailoring machines for 1,200 youths in Jos metropolis.",
          "status": "fulfilled",
          "date_made": "2024-03-01",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Tooling Kits Distributed in Jos"
          ]
        }
      ]
    }
  ],
  "RV": [
    {
      "name": "Senator Allwell Heacho Onyesoh",
      "district": "Rivers East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AO",
      "school": "Government Secondary School, Owerri",
      "uni": "University of Port Harcourt",
      "past": "Commissioner for Education & Commissioner for Sports, Rivers State",
      "bio": "Lawmaker representing Port Harcourt and Rivers East in the 10th Senate.",
      "promises": [
        {
          "id": "p-rv-sen-1",
          "title": "Educational Bursary Grants for 1,500 Undergraduates",
          "category": "Education",
          "description": "Direct financial assistance to verified university students in Rivers East.",
          "status": "fulfilled",
          "date_made": "2023-12-10",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "Bursaries Paid to 1,500 Students"
          ]
        }
      ]
    },
    {
      "name": "Senator Mpigi Barinada (PhD)",
      "district": "Rivers South-East Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "BM",
      "school": "Secondary School, Tai",
      "uni": "University of Port Harcourt",
      "past": "Member House of Representatives & Chairman Tai Local Government Council",
      "bio": "Ranking lawmaker representing the Ogoni and maritime communities of Rivers South-East.",
      "promises": [
        {
          "id": "p-rv-sen-2",
          "title": "Installation of 300 Solar Streetlights Across Ogoni Communities",
          "category": "Infrastructure",
          "description": "Community solar electrification in Khana, Gokana, and Eleme LGAs.",
          "status": "fulfilled",
          "date_made": "2024-02-18",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Lights Commissioned in Gokana"
          ]
        }
      ]
    },
    {
      "name": "Dr. Ipalibo Harry Banigo",
      "district": "Rivers West Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "IB",
      "school": "Queens College, Lagos",
      "uni": "University of Ibadan (MBBS), Harvard School of Public Health & University of London",
      "past": "Deputy Governor of Rivers State (2015\u20132023) & Head of Service",
      "bio": "Medical doctor, former Deputy Governor, and Chairman Senate Committee on Health.",
      "promises": [
        {
          "id": "p-rv-sen-3",
          "title": "Maternal and Child Health Outreach in Riverine Communities",
          "category": "Healthcare",
          "description": "Free medical surgical missions and hospital supply distribution across riverine wards.",
          "status": "fulfilled",
          "date_made": "2023-10-05",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Over 3,000 Women and Children Treated for Free"
          ]
        }
      ]
    }
  ],
  "SO": [
    {
      "name": "Senator Aliyu Magatakarda Wamakko (CFR)",
      "district": "Sokoto North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Aliyu_Wamakko.jpg/440px-Aliyu_Wamakko.jpg",
      "initials": "AW",
      "school": "Sokoto Teachers College",
      "uni": "University of Pittsburgh, USA",
      "past": "Two-Term Governor of Sokoto State (2007\u20132015) & Deputy Governor",
      "bio": "Former Governor and Chairman Senate Committee on Local Content representing Sokoto city.",
      "promises": [
        {
          "id": "p-so-sen-1",
          "title": "Sokoto Metropolis Solar Electrification & Free Medical Outreach",
          "category": "Infrastructure",
          "description": "Installation of 800 solar streetlights across Sokoto urban districts.",
          "status": "fulfilled",
          "date_made": "2023-09-10",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "800 Solar Poles Installed in Sokoto"
          ]
        }
      ]
    },
    {
      "name": "Senator Ibrahim Lamido",
      "district": "Sokoto East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "IL",
      "school": "Secondary School, Isa",
      "uni": "Usmanu Danfodiyo University",
      "past": "Public Administrator & Lawmaker",
      "bio": "Senator representing Gwadabawa, Isa, and eastern Sokoto.",
      "promises": [
        {
          "id": "p-so-sen-2",
          "title": "Security Vigilante Support & Solar Water Boreholes in Isa",
          "category": "Security",
          "description": "Supplying communication radios and 15 solar boreholes in frontline wards.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Boreholes Functional"
          ]
        }
      ]
    },
    {
      "name": "Senator Aminu Waziri Tambuwal (CFR)",
      "district": "Sokoto South Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Aminu_Tambuwal.jpg/440px-Aminu_Tambuwal.jpg",
      "initials": "AT",
      "school": "Government Teachers College, Dogon Daji",
      "uni": "Usmanu Danfodiyo University (LL.B) & BL",
      "past": "Speaker of the House of Representatives (2011\u20132015) & Two-Term Governor of Sokoto State",
      "bio": "Former Speaker, former Governor, and Senator representing Tambuwal and southern Sokoto.",
      "promises": [
        {
          "id": "p-so-sen-3",
          "title": "Tambuwal Agro-Irrigation Canal Expansion & Tertiary Scholarships",
          "category": "Education",
          "description": "Bursaries for 2,000 students in university faculties of law and medicine.",
          "status": "fulfilled",
          "date_made": "2023-12-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Students Credited in Full"
          ]
        }
      ]
    }
  ],
  "TA": [
    {
      "name": "Senator David Jimkuta",
      "district": "Taraba South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DJ",
      "school": "Secondary School, Wukari",
      "uni": "University of Maiduguri",
      "past": "Corporate Director & Community Leader",
      "bio": "Senator representing Wukari, Takum, and southern Taraba in the 10th Senate.",
      "promises": [
        {
          "id": "p-ta-sen-1",
          "title": "Wukari Hospital Solarization and Youth Agro-Grants",
          "category": "Healthcare",
          "description": "Solar inverters for Wukari General Hospital and cash grants for 1,000 youths.",
          "status": "fulfilled",
          "date_made": "2023-10-20",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Hospital Solarized in Wukari"
          ]
        }
      ]
    },
    {
      "name": "Senator Haruna Manu",
      "district": "Taraba Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "HM",
      "school": "Secondary School, Bali",
      "uni": "Ahmadu Bello University",
      "past": "Two-Term Deputy Governor of Taraba State (2015\u20132023)",
      "bio": "Former Deputy Governor and Senator representing Bali, Gashaka, and central Taraba.",
      "promises": [
        {
          "id": "p-ta-sen-2",
          "title": "Bali Rice Farmers Seedlings & Tractorization Scheme",
          "category": "Economy",
          "description": "Subsidized tractor plowing for 1,500 hectares of farm land in Bali.",
          "status": "fulfilled",
          "date_made": "2023-12-01",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Hectares Plowed"
          ]
        }
      ]
    },
    {
      "name": "Senator Shuaibu Isa Lau",
      "district": "Taraba North Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "SL",
      "school": "Secondary School, Lau",
      "uni": "Ahmadu Bello University",
      "past": "Senate Deputy Minority Leader 9th Senate",
      "bio": "Former Senate Deputy Minority Leader representing Jalingo and northern Taraba.",
      "promises": [
        {
          "id": "p-ta-sen-3",
          "title": "Jalingo City Solar Streetlight Grid & School Upgrades",
          "category": "Infrastructure",
          "description": "Installation of 500 solar streetlights across Jalingo metropolis.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Solar Poles Energized in Jalingo"
          ]
        }
      ]
    }
  ],
  "YO": [
    {
      "name": "Senator Ahmad Ibrahim Lawan (GCON)",
      "district": "Yobe North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Ahmad_Lawan.jpg/440px-Ahmad_Lawan.jpg",
      "initials": "AL",
      "school": "Government Secondary School, Gashua",
      "uni": "University of Maiduguri (B.Sc Geography) & Cranfield University, UK (Ph.D)",
      "past": "President of the 9th Senate & Senate Leader",
      "bio": "Former President of the Senate and ranking parliamentarian representing Gashua and northern Yobe.",
      "promises": [
        {
          "id": "p-yo-sen-1",
          "title": "Gashua Federal University Research Fund & Free Medical Missions",
          "category": "Education",
          "description": "Endowment fund for research and free medical surgical outreach across 6 LGAs.",
          "status": "fulfilled",
          "date_made": "2023-08-10",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "Over 5,000 Patients Treated in Gashua"
          ]
        }
      ]
    },
    {
      "name": "Senator Ibrahim Geidam",
      "district": "Yobe East Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "IG",
      "school": "Secondary School, Geidam",
      "uni": "Ahmadu Bello University",
      "past": "Two-Term Governor of Yobe State (2009\u20132019) & Minister of Police Affairs",
      "bio": "Former Governor and Federal Minister representing Damaturu and eastern Yobe.",
      "promises": [
        {
          "id": "p-yo-sen-2",
          "title": "Damaturu Township Water Reticulation & Classrooms Grant",
          "category": "Infrastructure",
          "description": "Construction of 20 motorized solar boreholes in Damaturu suburbs.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "20 Boreholes Functional in Damaturu"
          ]
        }
      ]
    },
    {
      "name": "Senator Mohammed Ibrahim Bomai",
      "district": "Yobe South Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "MB",
      "school": "Government Secondary School, Potiskum",
      "uni": "Ahmadu Bello University & Harvard Kennedy School",
      "past": "Director of Treasury FCT Administration & Ranking Senator",
      "bio": "Chairman Senate Committee on FCT representing Potiskum and southern Yobe.",
      "promises": [
        {
          "id": "p-yo-sen-3",
          "title": "Potiskum Livestock Cattle Market Modernization & Solar Grid",
          "category": "Economy",
          "description": "Installation of 400 solar streetlights and boreholes in Potiskum Cattle Market.",
          "status": "fulfilled",
          "date_made": "2024-02-01",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Cattle Market Solar Grid Live in Potiskum"
          ]
        }
      ]
    }
  ],
  "ZM": [
    {
      "name": "Senator Abdul'aziz Abubakar Yari",
      "district": "Zamfara West Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Abdul_Aziz_Yari.jpg/440px-Abdul_Aziz_Yari.jpg",
      "initials": "AY",
      "school": "Government Secondary School, Talata Mafara",
      "uni": "Higher Education in Business Administration",
      "past": "Two-Term Governor of Zamfara State (2011\u20132019) & Chairman NGF",
      "bio": "Former Governor and Chairman Senate Committee on Water Resources representing Talata Mafara and Anka.",
      "promises": [
        {
          "id": "p-zm-sen-1",
          "title": "Food Grains Palliatives & Fertilizer Grants for 5,000 Farmers",
          "category": "Economy",
          "description": "Direct distribution of 10,000 bags of grains and fertilizers in Talata Mafara.",
          "status": "fulfilled",
          "date_made": "2023-10-15",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "Grains Distributed in Anka and Mafara"
          ]
        }
      ]
    },
    {
      "name": "Senator Sahabi Alhaji Ya'u",
      "district": "Zamfara North Senatorial District",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SY",
      "school": "Secondary School, Kaura Namoda",
      "uni": "Usmanu Danfodiyo University",
      "past": "Three-Term Senator & Business Executive",
      "bio": "Ranking lawmaker representing Kaura Namoda, Shinkafi, and northern Zamfara.",
      "promises": [
        {
          "id": "p-zm-sen-2",
          "title": "Kaura Namoda Solar Water Schemes & Clinic Upgrades",
          "category": "Infrastructure",
          "description": "Construction of 20 solar boreholes across rural wards.",
          "status": "fulfilled",
          "date_made": "2023-12-10",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "20 Boreholes Functional"
          ]
        }
      ]
    },
    {
      "name": "Senator Ikra Aliyu Bilbis",
      "district": "Zamfara Central Senatorial District",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "IB",
      "school": "Secondary School, Gusau",
      "uni": "Usmanu Danfodiyo University",
      "past": "Honourable Minister of State for Information and Communications",
      "bio": "Former Federal Minister and Senator representing Gusau and central Zamfara.",
      "promises": [
        {
          "id": "p-zm-sen-3",
          "title": "Gusau Artisans Tooling Grants & Youth Software Hub",
          "category": "Education",
          "description": "Vocational kits and computer literacy center for Gusau youths.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Software Hub Opened in Gusau"
          ]
        }
      ]
    }
  ]
};

export const NIGERIA_REPRESENTATIVES_MASTER: Record<string, any[]> = {
  "NAT": [
    {
      "name": "Rt. Hon. Tajudeen Abbas (Ph.D)",
      "office_title": "Speaker of the House of Representatives",
      "district": "Zaria Federal Constituency (Kaduna)",
      "party": "All Progressives Congress (APC)",
      "photo_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tajudeen_Abbas.jpg/440px-Tajudeen_Abbas.jpg",
      "initials": "TA",
      "school": "Barewa College, Zaria",
      "uni": "ABU Zaria & Usmanu Danfodiyo University",
      "past": "Senior Lecturer & Chairman House Committee on Land Transport",
      "bio": "Speaker of the 10th House of Representatives of the Federal Republic of Nigeria.",
      "promises": [
        {
          "id": "p-nat-rep-1",
          "title": "Open Legislative Townhalls & Citizens Parliament",
          "category": "Governance",
          "description": "National participatory townhall sessions across 6 geopolitical zones.",
          "status": "fulfilled",
          "date_made": "2023-06-20",
          "budget_allocated": "Statutory Legislative Fund",
          "progress_pct": 100,
          "milestones": [
            "Quarterly Public Townhalls Held"
          ]
        }
      ]
    },
    {
      "name": "Rt. Hon. Benjamin Okezie Kalu",
      "office_title": "Deputy Speaker of the House of Representatives",
      "district": "Bende Federal Constituency (Abia)",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BK",
      "school": "Bende Secondary School",
      "uni": "University of Calabar (LL.B) & Oxford Said Business School",
      "past": "Spokesperson 9th House of Reps & Legal Practitioner",
      "bio": "Deputy Speaker of the 10th House of Representatives championing PISE-P peace initiative.",
      "promises": [
        {
          "id": "p-nat-rep-2",
          "title": "Peace in South East Project (PISE-P) Non-Kinetic Security",
          "category": "Security",
          "description": "Community peace dialogue, vocational training, and youth rehabilitation.",
          "status": "fulfilled",
          "date_made": "2023-12-28",
          "budget_allocated": "\u20a61.5 Billion PPP Fund",
          "progress_pct": 100,
          "milestones": [
            "PISE-P Launched in Bende with Federal Support"
          ]
        }
      ]
    }
  ],
  "AB": [
    {
      "name": "Rt. Hon. Benjamin Okezie Kalu",
      "office_title": "Deputy Speaker, House of Representatives",
      "district": "Bende Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BK",
      "school": "Bende Secondary School",
      "uni": "University of Calabar",
      "past": "Spokesperson 9th House of Reps",
      "bio": "Deputy Speaker representing Bende Federal Constituency.",
      "promises": [
        {
          "id": "p-ab-rep-1",
          "title": "Bende Rural Roads Pavement & Agro-Processing Mills",
          "category": "Infrastructure",
          "description": "Asphalt road construction and rice processing plants in Bende.",
          "status": "fulfilled",
          "date_made": "2023-09-10",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "Agro Mills Commissioned in Bende"
          ]
        }
      ]
    },
    {
      "name": "Hon. Alexander Ikwechegh",
      "office_title": "Member, House of Representatives",
      "district": "Aba North/Aba South Federal Constituency",
      "party": "All Progressives Grand Alliance (APGA)",
      "photo_url": "",
      "initials": "AI",
      "school": "Secondary School, Aba",
      "uni": "University of Calabar",
      "past": "Executive Chairman Aba North LGA",
      "bio": "Lawmaker representing commercial hub of Aba.",
      "promises": [
        {
          "id": "p-ab-rep-2",
          "title": "Aba Commercial Artisans Power Grant & Solar Streetlights",
          "category": "Economy",
          "description": "Installation of 400 solar poles in Ariaria and Ekeoha markets.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "400 Solar Lights Installed"
          ]
        }
      ]
    },
    {
      "name": "Hon. Ginger Onwusibe",
      "office_title": "Member, House of Representatives",
      "district": "Isiala Ngwa North/Isiala Ngwa South Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "GO",
      "school": "Secondary School, Isiala Ngwa",
      "uni": "Abia State University",
      "past": "Executive Chairman Isiala Ngwa North & State Lawmaker",
      "bio": "Lawmaker representing Isiala Ngwa Federal Constituency.",
      "promises": [
        {
          "id": "p-ab-rep-3",
          "title": "Free JAMB/WAEC Sponsorship & Primary School Classrooms",
          "category": "Education",
          "description": "Full payment of exam fees for 1,500 public school students.",
          "status": "fulfilled",
          "date_made": "2023-10-20",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Students Sponsored"
          ]
        }
      ]
    },
    {
      "name": "Hon. Ibe Okwara Osonwa",
      "office_title": "Member, House of Representatives",
      "district": "Arochukwu/Ohafia Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "IO",
      "school": "Secondary School, Ohafia",
      "uni": "University of Nigeria Nsukka",
      "past": "Corporate Executive & Banker",
      "bio": "Lawmaker representing Arochukwu/Ohafia Federal Constituency.",
      "promises": [
        {
          "id": "p-ab-rep-4",
          "title": "Ohafia Erosion Control Drainage & Solar Water Scheme",
          "category": "Infrastructure",
          "description": "Motorized solar water boreholes across 10 rural wards.",
          "status": "fulfilled",
          "date_made": "2024-01-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "10 Solar Boreholes Handed Over"
          ]
        }
      ]
    },
    {
      "name": "Hon. Obinna Aguocha",
      "office_title": "Member, House of Representatives",
      "district": "Ikwuano/Umuahia North/Umuahia South Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "OA",
      "school": "Government College Umuahia",
      "uni": "University of Jos",
      "past": "Corporate Director & Community Leader",
      "bio": "Lawmaker representing Umuahia capital federal constituency.",
      "promises": [
        {
          "id": "p-ab-rep-5",
          "title": "Umuahia Capital Youth Tech Center & Hospital Supplies",
          "category": "Healthcare",
          "description": "Supply of medical diagnostics to Federal Medical Centre Umuahia.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "Medical Supplies Delivered"
          ]
        }
      ]
    },
    {
      "name": "Hon. Emeka Nnamani",
      "office_title": "Member, House of Representatives",
      "district": "Aba North/South Federal Constituency (Aba)",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "EN",
      "school": "Secondary School, Aba",
      "uni": "Enugu State University",
      "past": "Business Executive",
      "bio": "Lawmaker representing Aba industrial artisans.",
      "promises": [
        {
          "id": "p-ab-rep-6",
          "title": "Leather & Garment Cluster Artisan Tooling Grants",
          "category": "Economy",
          "description": "Industrial sewing machines for 500 shoe and bag makers in Aba.",
          "status": "fulfilled",
          "date_made": "2024-02-10",
          "budget_allocated": "\u20a6250 Million",
          "progress_pct": 100,
          "milestones": [
            "Machines Distributed"
          ]
        }
      ]
    },
    {
      "name": "Hon. Amobi Ogah",
      "office_title": "Member, House of Representatives",
      "district": "Isuikwuato/Umunneochi Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "AO",
      "school": "Secondary School, Isuikwuato",
      "uni": "Abia State University",
      "past": "Chairman House Committee on HIV/AIDS, Tuberculosis & Malaria Control",
      "bio": "Chairman House Committee on Health Agencies representing Isuikwuato/Umunneochi.",
      "promises": [
        {
          "id": "p-ab-rep-7",
          "title": "Free Medical Treatment & Malaria Eradication Drives",
          "category": "Healthcare",
          "description": "Free surgeries and malaria treatment for 5,000 rural residents.",
          "status": "fulfilled",
          "date_made": "2023-09-25",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "5,000 Treated in Isuikwuato"
          ]
        }
      ]
    },
    {
      "name": "Hon. Christian Nkwonta",
      "office_title": "Member, House of Representatives",
      "district": "Ukwa East/Ukwa West Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "CN",
      "school": "Secondary School, Ukwa",
      "uni": "University of Port Harcourt",
      "past": "Legal Practitioner & Lawmaker",
      "bio": "Lawmaker representing the oil-producing Ukwa Federal Constituency.",
      "promises": [
        {
          "id": "p-ab-rep-8",
          "title": "Ukwa Youth Skills Acquisition & Solar Streetlights",
          "category": "Infrastructure",
          "description": "Installation of 300 solar streetlights across Ukwa oil communities.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "300 Solar Poles Energized"
          ]
        }
      ]
    }
  ],
  "LA": [
    {
      "name": "Hon. Fuad Laguda",
      "office_title": "Member, House of Representatives",
      "district": "Surulere I Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "FL",
      "school": "Surulere Secondary School",
      "uni": "University of Lagos",
      "past": "Council Leader Surulere Local Government",
      "bio": "Lawmaker representing Surulere I in the 10th House of Representatives.",
      "promises": [
        {
          "id": "p-la-rep-1",
          "title": "Mini-Stadium & ICT Learning Hub in Surulere",
          "category": "Education",
          "description": "Modern sports center and computer training facility.",
          "status": "fulfilled",
          "date_made": "2024-04-01",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "ICT Hub Commissioned"
          ]
        }
      ]
    },
    {
      "name": "Hon. James Abiodun Faleke",
      "office_title": "Member, House of Representatives",
      "district": "Ikeja Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JF",
      "school": "Abdulazeez Atta Memorial College",
      "uni": "Kaduna Polytechnic & University of Jos",
      "past": "Chairman House Committee on Finance & Executive Chairman Ojodu LCDA",
      "bio": "Chairman House Committee on Finance representing Ikeja commercial center.",
      "promises": [
        {
          "id": "p-la-rep-2",
          "title": "Ikeja Youth Tech Academy & \u20a6150M Small Business Grants",
          "category": "Economy",
          "description": "Cash grants and POS machines to 1,500 small traders in Ikeja.",
          "status": "fulfilled",
          "date_made": "2023-08-15",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Small Traders Funded in Ikeja"
          ]
        }
      ]
    },
    {
      "name": "Hon. Babajimi Benson",
      "office_title": "Member, House of Representatives",
      "district": "Ikorodu Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BB",
      "school": "Lagos State Model College",
      "uni": "Lagos State University (LL.B) & London Business School",
      "past": "Chairman House Committee on Defense",
      "bio": "Chairman House Committee on Defense driving the iCare Foodbank initiative in Ikorodu.",
      "promises": [
        {
          "id": "p-la-rep-3",
          "title": "iCare Foodbank Expansion & Ikorodu Smart ICT Hubs",
          "category": "Welfare",
          "description": "Monthly food support for 3,000 vulnerable families and 3 digital tech centers.",
          "status": "fulfilled",
          "date_made": "2023-09-20",
          "budget_allocated": "\u20a6500 Million",
          "progress_pct": 100,
          "milestones": [
            "Food Distributed Monthly to 3,000 Families",
            "Tech Center Opened in Ikorodu"
          ]
        }
      ]
    },
    {
      "name": "Hon. Ganiyu Adele Ayuba",
      "office_title": "Member, House of Representatives",
      "district": "Alimosho Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "GA",
      "school": "Secondary School, Alimosho",
      "uni": "Lagos State University (LL.B) & BL",
      "past": "Special Adviser to Governor on Urban Development",
      "bio": "Lawmaker representing the largest federal constituency in Nigeria (Alimosho).",
      "promises": [
        {
          "id": "p-la-rep-4",
          "title": "Alimosho Primary School Renovation & Solar Water Projects",
          "category": "Infrastructure",
          "description": "Renovation of 20 public schools and installation of 15 motorized boreholes.",
          "status": "fulfilled",
          "date_made": "2023-11-10",
          "budget_allocated": "\u20a6550 Million",
          "progress_pct": 100,
          "milestones": [
            "20 Classrooms Renovated in Alimosho"
          ]
        }
      ]
    },
    {
      "name": "Hon. Kafilat Ogbara",
      "office_title": "Member, House of Representatives",
      "district": "Kosofe Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "KO",
      "school": "Federal Government Girls College",
      "uni": "University of Lagos",
      "past": "Chairman House Committee on Women Affairs and Social Development",
      "bio": "Chairman House Committee on Women Affairs representing Kosofe.",
      "promises": [
        {
          "id": "p-la-rep-5",
          "title": "Women Cooperative Micro-Credit Grants in Ketu/Mile 12",
          "category": "Economy",
          "description": "Direct cash grants to 2,000 market women in Mile 12 and Ketu markets.",
          "status": "fulfilled",
          "date_made": "2023-10-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Women Traders Credited"
          ]
        }
      ]
    },
    {
      "name": "Hon. Moshood Salvador / Hon. Thaddeus Attah",
      "office_title": "Member, House of Representatives",
      "district": "Eti-Osa Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "TA",
      "school": "Secondary School, Lagos",
      "uni": "University of Lagos",
      "past": "Business Executive & Community Organizer",
      "bio": "Lawmaker representing Eti-Osa, Lekki, and Victoria Island.",
      "promises": [
        {
          "id": "p-la-rep-6",
          "title": "Lekki-Eti Osa Drainage Channel Cleansing & Youth Scholarships",
          "category": "Infrastructure",
          "description": "Tertiary scholarships for 1,000 undergraduates in Eti-Osa.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "1,000 Students Awarded Grants"
          ]
        }
      ]
    },
    {
      "name": "Hon. Paul Kalejaiye",
      "office_title": "Member, House of Representatives",
      "district": "Ajeromi-Ifelodun Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "PK",
      "school": "Secondary School, Ajegunle",
      "uni": "University of Lagos",
      "past": "Special Adviser on Rural Development & Teacher",
      "bio": "Lawmaker representing Ajegunle and Ajeromi-Ifelodun.",
      "promises": [
        {
          "id": "p-la-rep-7",
          "title": "Ajegunle Youth Football Academy & Tech Coding Bootcamps",
          "category": "Education",
          "description": "Free software development bootcamps and sports center in Ajegunle.",
          "status": "fulfilled",
          "date_made": "2023-12-10",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Youths Certified in Software Skills"
          ]
        }
      ]
    },
    {
      "name": "Hon. Wale Raji",
      "office_title": "Member, House of Representatives",
      "district": "Epe Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "WR",
      "school": "Epe Grammar School",
      "uni": "University of Lagos",
      "past": "Permanent Secretary Ministry of Works & Ranking Lawmaker",
      "bio": "Three-term lawmaker representing Epe Federal Constituency.",
      "promises": [
        {
          "id": "p-la-rep-8",
          "title": "Epe Modern Fish Processing Facility & Artisanal Grants",
          "category": "Economy",
          "description": "Construction of modern cold storage and fish processing facility for 800 fisherfolk.",
          "status": "fulfilled",
          "date_made": "2023-11-25",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "Fish Processing Facility Commissioned in Epe"
          ]
        }
      ]
    }
  ],
  "KN": [
    {
      "name": "Hon. Alhassan Ado Doguwa",
      "office_title": "Member, House of Representatives",
      "district": "Tudun Wada/Doguwa Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AD",
      "school": "Secondary School, Kano",
      "uni": "Bayero University Kano",
      "past": "House Majority Leader 9th House of Reps",
      "bio": "Chairman House Committee on Petroleum Resources (Upstream).",
      "promises": [
        {
          "id": "p-kn-rep-1",
          "title": "Rural Cottage Hospitals in Doguwa & Tudun Wada",
          "category": "Healthcare",
          "description": "Equipping 5 cottage hospitals and science labs.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "5 Science Labs Equipped"
          ]
        }
      ]
    },
    {
      "name": "Hon. Abdulmumin Jibrin (Ph.D)",
      "office_title": "Member, House of Representatives",
      "district": "Kiru/Bebeji Federal Constituency",
      "party": "New Nigeria Peoples Party (NNPP)",
      "photo_url": "",
      "initials": "AJ",
      "school": "Nigerian Military School, Zaria",
      "uni": "University of Abuja (B.Sc & Ph.D) & Harvard Business School",
      "past": "Chairman House Committee on Housing and Habitat & Appropriations Chair",
      "bio": "Chairman House Committee on Housing and Habitat representing Kiru/Bebeji.",
      "promises": [
        {
          "id": "p-kn-rep-2",
          "title": "Kiru/Bebeji Mass Housing & Youth ICT Center",
          "category": "Infrastructure",
          "description": "Construction of low-cost housing units and computer center in Kiru.",
          "status": "fulfilled",
          "date_made": "2023-09-10",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "ICT Center Handed Over"
          ]
        }
      ]
    },
    {
      "name": "Hon. Sagir Koki",
      "office_title": "Member, House of Representatives",
      "district": "Kano Municipal Federal Constituency",
      "party": "New Nigeria Peoples Party (NNPP)",
      "photo_url": "",
      "initials": "SK",
      "school": "Rumfa College, Kano",
      "uni": "Bayero University Kano",
      "past": "Community Leader & Parliamentarian",
      "bio": "Lawmaker representing the commercial core of Kano Municipal.",
      "promises": [
        {
          "id": "p-kn-rep-3",
          "title": "Kano City Solar Streetlight Grid & Artisan Capital Grants",
          "category": "Economy",
          "description": "Installation of 500 solar poles and grants to 1,500 market traders.",
          "status": "fulfilled",
          "date_made": "2023-10-20",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Solar Poles Energized in Kano City"
          ]
        }
      ]
    },
    {
      "name": "Hon. Hassan Hussaini",
      "office_title": "Member, House of Representatives",
      "district": "Dala Federal Constituency",
      "party": "New Nigeria Peoples Party (NNPP)",
      "photo_url": "",
      "initials": "HH",
      "school": "Secondary School, Dala",
      "uni": "Bayero University Kano",
      "past": "Public Administrator",
      "bio": "Lawmaker representing Dala Federal Constituency.",
      "promises": [
        {
          "id": "p-kn-rep-4",
          "title": "Dala Primary Health Clinic Solarization & Water Schemes",
          "category": "Healthcare",
          "description": "Provision of solar power to 6 maternity clinics in Dala.",
          "status": "fulfilled",
          "date_made": "2024-01-15",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "6 Maternity Clinics Solarized"
          ]
        }
      ]
    },
    {
      "name": "Hon. Yusuf Umar Datti",
      "office_title": "Member, House of Representatives",
      "district": "Kura/Madobi/Garun Mallam Federal Constituency",
      "party": "New Nigeria Peoples Party (NNPP)",
      "photo_url": "",
      "initials": "YD",
      "school": "Secondary School, Madobi",
      "uni": "Bayero University Kano",
      "past": "Lawmaker & Community Leader",
      "bio": "Lawmaker representing Kura/Madobi/Garun Mallam.",
      "promises": [
        {
          "id": "p-kn-rep-5",
          "title": "Irrigation Water Pumps & Fertilizer Grant for Rice Farmers",
          "category": "Economy",
          "description": "Distribution of 1,200 solar irrigation pumps to farmers in Kura.",
          "status": "fulfilled",
          "date_made": "2023-12-05",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "1,200 Solar Pumps Distributed"
          ]
        }
      ]
    },
    {
      "name": "Hon. Garba Ibrahim Muhammad",
      "office_title": "Member, House of Representatives",
      "district": "Gwale Federal Constituency",
      "party": "New Nigeria Peoples Party (NNPP)",
      "photo_url": "",
      "initials": "GM",
      "school": "Secondary School, Gwale",
      "uni": "Bayero University Kano",
      "past": "Parliamentarian",
      "bio": "Lawmaker representing Gwale Federal Constituency.",
      "promises": [
        {
          "id": "p-kn-rep-6",
          "title": "Gwale Secondary Schools Computerization & JAMB Grants",
          "category": "Education",
          "description": "Free JAMB registration for 2,000 public school students in Gwale.",
          "status": "fulfilled",
          "date_made": "2024-02-01",
          "budget_allocated": "\u20a6250 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Students Registered"
          ]
        }
      ]
    }
  ],
  "RV": [
    {
      "name": "Hon. Boma Goodhead",
      "office_title": "Member, House of Representatives",
      "district": "Asari-Toru/Akuku-Toru Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "BG",
      "school": "Federal Government Girls College, Abuloma",
      "uni": "University of Port Harcourt",
      "past": "Ranking Member House of Representatives",
      "bio": "Lawmaker advocating for Niger Delta environmental remediation and youth employment.",
      "promises": [
        {
          "id": "p-rv-rep-1",
          "title": "Riverine Marine Transport and Outboard Engine Grants",
          "category": "Infrastructure",
          "description": "Supplying 50 passenger speedboats for coastal transit.",
          "status": "fulfilled",
          "date_made": "2023-10-20",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Speedboats Distributed in Buguma"
          ]
        }
      ]
    },
    {
      "name": "Hon. Kingsley Chinda",
      "office_title": "Minority Leader, House of Representatives",
      "district": "Obio/Akpor Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "KC",
      "school": "Stella Maris College, Port Harcourt",
      "uni": "Rivers State University (LL.B) & BL",
      "past": "Commissioner for Environment & House Minority Leader",
      "bio": "Minority Leader of the 10th House of Representatives representing Obio/Akpor.",
      "promises": [
        {
          "id": "p-rv-rep-2",
          "title": "Obio/Akpor Ultra-Modern ICT Skill Academy & Scholarships",
          "category": "Education",
          "description": "Tertiary scholarships for 2,000 undergraduates and modern tech academy.",
          "status": "fulfilled",
          "date_made": "2023-08-10",
          "budget_allocated": "\u20a6600 Million",
          "progress_pct": 100,
          "milestones": [
            "2,000 Undergraduates Received Bursaries"
          ]
        }
      ]
    },
    {
      "name": "Hon. Blessing Chigeru Amadi",
      "office_title": "Member, House of Representatives",
      "district": "Port Harcourt II Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "BA",
      "school": "Secondary School, Port Harcourt",
      "uni": "University of Port Harcourt",
      "past": "Community Leader & Women Advocate",
      "bio": "Lawmaker representing Port Harcourt II Federal Constituency.",
      "promises": [
        {
          "id": "p-rv-rep-3",
          "title": "Market Women Micro-Credit & Solar Electrification in Diobu",
          "category": "Economy",
          "description": "Grants to 1,500 traders and solar streetlights in Mile 1 and Mile 3 markets.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Traders Credited in Diobu"
          ]
        }
      ]
    },
    {
      "name": "Hon. Dumnamene Deekor",
      "office_title": "Member, House of Representatives",
      "district": "Khana/Gokana Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "DD",
      "school": "Secondary School, Bori",
      "uni": "University of Port Harcourt",
      "past": "Deputy Speaker Rivers House of Assembly & Ranking Lawmaker",
      "bio": "Lawmaker representing Ogoni heartland of Khana/Gokana.",
      "promises": [
        {
          "id": "p-rv-rep-4",
          "title": "Bori Modern Agro-Processing Hub & Clean Water Boreholes",
          "category": "Infrastructure",
          "description": "Construction of 15 motorized water schemes in Ogoni villages.",
          "status": "fulfilled",
          "date_made": "2023-12-10",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Water Schemes Commissioned in Bori"
          ]
        }
      ]
    },
    {
      "name": "Hon. Victor Obuzor",
      "office_title": "Member, House of Representatives",
      "district": "Ahoada West/Ogba/Egbema/Ndoni Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "VO",
      "school": "Secondary School, Omoku",
      "uni": "Rivers State University",
      "past": "Executive Chairman ONELGA Council",
      "bio": "Lawmaker representing oil hub of Omoku and ONELGA.",
      "promises": [
        {
          "id": "p-rv-rep-5",
          "title": "Flood Resilience Embankments & Youth Technical Grants in Omoku",
          "category": "Infrastructure",
          "description": "Drainage channels and tooling kits for 800 technicians.",
          "status": "fulfilled",
          "date_made": "2024-01-20",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Tooling Kits Distributed"
          ]
        }
      ]
    }
  ],
  "EN": [
    {
      "name": "Hon. Sunday Umeha",
      "office_title": "Member, House of Representatives",
      "district": "Ezeagu/Udi Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "SU",
      "school": "Secondary School, Udi",
      "uni": "University of Nigeria Nsukka",
      "past": "Deputy Chairman House Committee on Justice",
      "bio": "Deputy Chairman House Committee on Justice representing Ezeagu/Udi.",
      "promises": [
        {
          "id": "p-en-rep-1",
          "title": "Rural Solar Electrification and Clean Water Scheme in Ezeagu",
          "category": "Infrastructure",
          "description": "Installation of 300 solar streetlights and 10 motorized water boreholes.",
          "status": "fulfilled",
          "date_made": "2023-12-10",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "300 Solar Poles Energized"
          ]
        }
      ]
    },
    {
      "name": "Hon. Chimaobi Atu",
      "office_title": "Member, House of Representatives",
      "district": "Enugu North/Enugu South Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "CA",
      "school": "College of the Immaculate Conception (CIC) Enugu",
      "uni": "Enugu State University of Science and Technology",
      "past": "Corporate Executive & Lawmaker",
      "bio": "Lawmaker representing Enugu urban capital constituency.",
      "promises": [
        {
          "id": "p-en-rep-2",
          "title": "Enugu Urban Artisan Capital Grants & Free Health Outreach",
          "category": "Economy",
          "description": "Cash grants to 1,500 market traders in Ogbete Main Market.",
          "status": "fulfilled",
          "date_made": "2023-09-15",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "1,500 Traders Credited in Ogbete"
          ]
        }
      ]
    },
    {
      "name": "Hon. Dennis Agbo (Ph.D)",
      "office_title": "Member, House of Representatives",
      "district": "Igbo-Eze North/Udenu Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "DA",
      "school": "Secondary School, Obollo-Afor",
      "uni": "University of Nigeria Nsukka",
      "past": "Economist, Central Bank Consultant & Lawmaker",
      "bio": "Economist and lawmaker representing Igbo-Eze North/Udenu.",
      "promises": [
        {
          "id": "p-en-rep-3",
          "title": "Obollo-Afor International Agro-Market Modernization",
          "category": "Economy",
          "description": "Solar lighting and motorized boreholes in Obollo-Afor commercial grain market.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Grid Live in Obollo-Afor"
          ]
        }
      ]
    },
    {
      "name": "Hon. Stainless Nwodo",
      "office_title": "Member, House of Representatives",
      "district": "Igbo-Etiti/Uzo-Uwani Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "SN",
      "school": "Secondary School, Ogbede",
      "uni": "University of Nigeria Nsukka",
      "past": "Youth Advocate & Lawmaker",
      "bio": "Lawmaker representing Igbo-Etiti/Uzo-Uwani agricultural basin.",
      "promises": [
        {
          "id": "p-en-rep-4",
          "title": "Uzo-Uwani Rice Farmers Mechanized Plowing & Seeds Grant",
          "category": "Economy",
          "description": "Subsidized tractor plowing for 1,000 hectares in Adani.",
          "status": "fulfilled",
          "date_made": "2024-02-15",
          "budget_allocated": "\u20a6300 Million",
          "progress_pct": 100,
          "milestones": [
            "1,000 Hectares Plowed in Adani"
          ]
        }
      ]
    },
    {
      "name": "Hon. Nnolim Nnaji",
      "office_title": "Member, House of Representatives",
      "district": "Nkanu East/Nkanu West Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "NN",
      "school": "Secondary School, Nkanu",
      "uni": "University of Nigeria Nsukka",
      "past": "Chairman House Committee on Ports & Aviation",
      "bio": "Ranking lawmaker representing Nkanu Federal Constituency.",
      "promises": [
        {
          "id": "p-en-rep-5",
          "title": "Nkanu Rural Feeder Roads & Classroom Renovation",
          "category": "Infrastructure",
          "description": "Grading of 25km rural roads and renovation of 15 primary classrooms.",
          "status": "fulfilled",
          "date_made": "2023-10-30",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "15 Classrooms Renovated"
          ]
        }
      ]
    }
  ],
  "FC": [
    {
      "name": "Hon. Joshua Chinedu Obika",
      "office_title": "Member, House of Representatives",
      "district": "AMAC/Bwari Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "JO",
      "school": "Secondary School, Abuja",
      "uni": "University of Abuja",
      "past": "Community Organizer & Lawmaker",
      "bio": "Lawmaker representing the central urban core of Abuja (AMAC and Bwari).",
      "promises": [
        {
          "id": "p-fc-rep-1",
          "title": "AMAC & Bwari Youth Tech Hub & Solar Streetlights",
          "category": "Education",
          "description": "Installation of 500 solar poles and coding center for FCT youths.",
          "status": "fulfilled",
          "date_made": "2023-10-15",
          "budget_allocated": "\u20a6450 Million",
          "progress_pct": 100,
          "milestones": [
            "500 Solar Poles Energized in AMAC/Bwari"
          ]
        }
      ]
    },
    {
      "name": "Hon. Abdulrahman Ajiya",
      "office_title": "Member, House of Representatives",
      "district": "Abaji/Gwagwalada/Kuje/Kwali Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Gwagwalada",
      "uni": "University of Abuja",
      "past": "Executive Chairman Abaji Area Council",
      "bio": "Lawmaker representing southern area councils of the Federal Capital Territory.",
      "promises": [
        {
          "id": "p-fc-rep-2",
          "title": "Rural Solar Boreholes & Agro-Input Grants across 4 Area Councils",
          "category": "Infrastructure",
          "description": "Construction of 20 motorized solar water schemes in rural FCT farming communities.",
          "status": "fulfilled",
          "date_made": "2023-11-20",
          "budget_allocated": "\u20a6400 Million",
          "progress_pct": 100,
          "milestones": [
            "20 Solar Boreholes Functional in Kuje and Kwali"
          ]
        }
      ]
    }
  ],
  "AD": [
    {
      "name": "Hon. Aliyu Wakili Boya",
      "office_title": "Member, House of Representatives",
      "district": "Fufore/Song Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AW",
      "school": "Secondary School, Fufore",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Fufore/Song Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ad-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Fufore",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Fufore/Song Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. James Barka",
      "office_title": "Member, House of Representatives",
      "district": "Gombi/Hong Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "JB",
      "school": "Secondary School, Gombi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Gombi/Hong Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ad-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Gombi",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Gombi/Hong Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Kwamoti Laori",
      "office_title": "Member, House of Representatives",
      "district": "Demsa/Numan/Lamurde Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "KL",
      "school": "Secondary School, Demsa",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Demsa/Numan/Lamurde Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ad-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Demsa",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Demsa/Numan/Lamurde Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "AK": [
    {
      "name": "Hon. Paul Ekpo",
      "office_title": "Member, House of Representatives",
      "district": "Etinan/Nsit Ibom/Nsit Ubium Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "PE",
      "school": "Secondary School, Etinan",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Etinan/Nsit Ibom/Nsit Ubium Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ak-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Etinan",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Etinan/Nsit Ibom/Nsit Ubium Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Unyime Idem",
      "office_title": "Member, House of Representatives",
      "district": "Ukanafun/Oruk Anam Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "UI",
      "school": "Secondary School, Ukanafun",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ukanafun/Oruk Anam Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ak-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ukanafun",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ukanafun/Oruk Anam Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Patrick Umoh (Ph.D)",
      "office_title": "Member, House of Representatives",
      "district": "Ikot Ekpene/Essien Udim/Obot Akara Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "PU",
      "school": "Secondary School, Ikot Ekpene",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ikot Ekpene/Essien Udim/Obot Akara Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ak-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Ikot Ekpene",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ikot Ekpene/Essien Udim/Obot Akara Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Clement Jimbo",
      "office_title": "Member, House of Representatives",
      "district": "Abak/Etim Ekpo/Ika Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "CJ",
      "school": "Secondary School, Abak",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Abak/Etim Ekpo/Ika Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ak-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Abak",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Abak/Etim Ekpo/Ika Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "AN": [
    {
      "name": "Hon. Afam Ogene",
      "office_title": "Member, House of Representatives",
      "district": "Ogbaru Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "AO",
      "school": "Secondary School, Ogbaru",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ogbaru Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-an-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ogbaru Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ogbaru Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Paschal Agbodike",
      "office_title": "Member, House of Representatives",
      "district": "Ihiala Federal Constituency",
      "party": "All Progressives Grand Alliance (APGA)",
      "photo_url": "",
      "initials": "PA",
      "school": "Secondary School, Ihiala",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ihiala Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-an-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ihiala Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ihiala Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Maureen Gwacham",
      "office_title": "Member, House of Representatives",
      "district": "Oyi/Ayamelum Federal Constituency",
      "party": "All Progressives Grand Alliance (APGA)",
      "photo_url": "",
      "initials": "MG",
      "school": "Secondary School, Oyi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Oyi/Ayamelum Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-an-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Oyi",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Oyi/Ayamelum Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Dominic Okafor",
      "office_title": "Member, House of Representatives",
      "district": "Aguata Federal Constituency",
      "party": "All Progressives Grand Alliance (APGA)",
      "photo_url": "",
      "initials": "DO",
      "school": "Secondary School, Aguata",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Aguata Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-an-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Aguata Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Aguata Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Peter Uzokwe",
      "office_title": "Member, House of Representatives",
      "district": "Nnewi North/Nnewi South/Ekwusigo Federal Constituency",
      "party": "African Democratic Congress (YPP/APC)",
      "photo_url": "",
      "initials": "PU",
      "school": "Secondary School, Nnewi North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Nnewi North/Nnewi South/Ekwusigo Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-an-rep-5",
          "title": "Constituency Rural Solar Water & Educational Support in Nnewi North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Nnewi North/Nnewi South/Ekwusigo Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "BA": [
    {
      "name": "Hon. Mansur Manu Soro",
      "office_title": "Member, House of Representatives",
      "district": "Darazo/Ganjuwa Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "MM",
      "school": "Secondary School, Darazo",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Darazo/Ganjuwa Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ba-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Darazo",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Darazo/Ganjuwa Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Jafaru Gambo Leko",
      "office_title": "Member, House of Representatives",
      "district": "Bogoro/Dass/Tafawa Balewa Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "JG",
      "school": "Secondary School, Bogoro",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Bogoro/Dass/Tafawa Balewa Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ba-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Bogoro",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Bogoro/Dass/Tafawa Balewa Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Kabiru Maipalace",
      "office_title": "Member, House of Representatives",
      "district": "Bauchi Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "KM",
      "school": "Secondary School, Bauchi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Bauchi Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ba-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Bauchi Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Bauchi Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "BY": [
    {
      "name": "Hon. Marie Ebikake",
      "office_title": "Member, House of Representatives",
      "district": "Brass/Nembe Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "ME",
      "school": "Secondary School, Brass",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Brass/Nembe Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-by-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Brass",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Brass/Nembe Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Oforji Oboku",
      "office_title": "Member, House of Representatives",
      "district": "Yenagoa/Kolokuma/Opokuma Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "OO",
      "school": "Secondary School, Yenagoa",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Yenagoa/Kolokuma/Opokuma Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-by-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Yenagoa",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Yenagoa/Kolokuma/Opokuma Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Fred Agbedi",
      "office_title": "Member, House of Representatives",
      "district": "Sagbama/Ekeremor Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "FA",
      "school": "Secondary School, Sagbama",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Sagbama/Ekeremor Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-by-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Sagbama",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Sagbama/Ekeremor Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "BE": [
    {
      "name": "Hon. Dickson Tarkighir",
      "office_title": "Member, House of Representatives",
      "district": "Makurdi/Guma Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DT",
      "school": "Secondary School, Makurdi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Makurdi/Guma Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-be-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Makurdi",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Makurdi/Guma Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Philip Agbese",
      "office_title": "Member, House of Representatives",
      "district": "Ado/Ogbadibo/Okpokwu Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "PA",
      "school": "Secondary School, Ado",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ado/Ogbadibo/Okpokwu Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-be-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ado",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ado/Ogbadibo/Okpokwu Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Sekav Iyortyom",
      "office_title": "Member, House of Representatives",
      "district": "Buruku Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SI",
      "school": "Secondary School, Buruku",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Buruku Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-be-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Buruku Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Buruku Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. David Ogewu",
      "office_title": "Member, House of Representatives",
      "district": "Oju/Obi Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DO",
      "school": "Secondary School, Oju",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Oju/Obi Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-be-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Oju",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Oju/Obi Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "BO": [
    {
      "name": "Hon. Muktar Betara Aliyu",
      "office_title": "Member, House of Representatives",
      "district": "Biu/Bayo/Shani/Kwaya Kusar Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "MB",
      "school": "Secondary School, Biu",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Biu/Bayo/Shani/Kwaya Kusar Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-bo-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Biu",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Biu/Bayo/Shani/Kwaya Kusar Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Abdulkadir Rahis",
      "office_title": "Member, House of Representatives",
      "district": "Maiduguri Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AR",
      "school": "Secondary School, Maiduguri",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Maiduguri Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-bo-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Maiduguri Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Maiduguri Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Usman Zannah",
      "office_title": "Member, House of Representatives",
      "district": "Kaga/Gubio/Magumeri Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "UZ",
      "school": "Secondary School, Kaga",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Kaga/Gubio/Magumeri Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-bo-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Kaga",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Kaga/Gubio/Magumeri Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "CR": [
    {
      "name": "Hon. Alex Egbona",
      "office_title": "Member, House of Representatives",
      "district": "Abi/Yakurr Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AE",
      "school": "Secondary School, Abi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Abi/Yakurr Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-cr-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Abi",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Abi/Yakurr Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Peter Akpanke",
      "office_title": "Member, House of Representatives",
      "district": "Obudu/Bekwarra/Obanliku Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "PA",
      "school": "Secondary School, Obudu",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Obudu/Bekwarra/Obanliku Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-cr-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Obudu",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Obudu/Bekwarra/Obanliku Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Joseph Bassey",
      "office_title": "Member, House of Representatives",
      "district": "Calabar South/Akpabuyo/Bakassi Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JB",
      "school": "Secondary School, Calabar South",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Calabar South/Akpabuyo/Bakassi Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-cr-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Calabar South",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Calabar South/Akpabuyo/Bakassi Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "DE": [
    {
      "name": "Hon. Thomas Ereyitomi",
      "office_title": "Member, House of Representatives",
      "district": "Warri North/South/South-West Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "TE",
      "school": "Secondary School, Warri North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Warri North/South/South-West Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-de-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Warri North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Warri North/South/South-West Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Ben Etanabene",
      "office_title": "Member, House of Representatives",
      "district": "Sapele/Okpe/Uvwie Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "BE",
      "school": "Secondary School, Sapele",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Sapele/Okpe/Uvwie Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-de-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Sapele",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Sapele/Okpe/Uvwie Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Ngozi Okolie",
      "office_title": "Member, House of Representatives",
      "district": "Aniocha/Oshimili Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "NO",
      "school": "Secondary School, Aniocha",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Aniocha/Oshimili Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-de-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Aniocha",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Aniocha/Oshimili Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Francis Waive",
      "office_title": "Member, House of Representatives",
      "district": "Ughelli North/South/Udu Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "FW",
      "school": "Secondary School, Ughelli North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ughelli North/South/Udu Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-de-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Ughelli North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ughelli North/South/Udu Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "EB": [
    {
      "name": "Hon. Kama Nkemkanma",
      "office_title": "Member, House of Representatives",
      "district": "Ohaozara/Onicha/Ivo Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "KN",
      "school": "Secondary School, Ohaozara",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ohaozara/Onicha/Ivo Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-eb-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ohaozara",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ohaozara/Onicha/Ivo Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Iduma Igariwey",
      "office_title": "Member, House of Representatives",
      "district": "Afikpo North/Afikpo South Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "II",
      "school": "Secondary School, Afikpo North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Afikpo North/Afikpo South Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-eb-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Afikpo North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Afikpo North/Afikpo South Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Emmanuel Uguru",
      "office_title": "Member, House of Representatives",
      "district": "Abakaliki/Izzi Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "EU",
      "school": "Secondary School, Abakaliki",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Abakaliki/Izzi Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-eb-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Abakaliki",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Abakaliki/Izzi Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "ED": [
    {
      "name": "Hon. Dennis Idahosa",
      "office_title": "Member, House of Representatives",
      "district": "Ovia North-East/Ovia South-West Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DI",
      "school": "Secondary School, Ovia North-East",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ovia North-East/Ovia South-West Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ed-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ovia North-East",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ovia North-East/Ovia South-West Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Billy Osawaru",
      "office_title": "Member, House of Representatives",
      "district": "Orhionmwon/Uhunmwonde Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BO",
      "school": "Secondary School, Orhionmwon",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Orhionmwon/Uhunmwonde Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ed-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Orhionmwon",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Orhionmwon/Uhunmwonde Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Dekeri Anamero",
      "office_title": "Member, House of Representatives",
      "district": "Etsako East/West/Central Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DA",
      "school": "Secondary School, Etsako East",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Etsako East/West/Central Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ed-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Etsako East",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Etsako East/West/Central Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Esosa Iyawe",
      "office_title": "Member, House of Representatives",
      "district": "Oredo Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "EI",
      "school": "Secondary School, Oredo",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Oredo Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ed-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Oredo Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Oredo Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "EK": [
    {
      "name": "Hon. Femi Bamisile",
      "office_title": "Member, House of Representatives",
      "district": "Gbonyin/Ekiti East/Emure Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "FB",
      "school": "Secondary School, Gbonyin",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Gbonyin/Ekiti East/Emure Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ek-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Gbonyin",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Gbonyin/Ekiti East/Emure Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Biodun Omoleye",
      "office_title": "Member, House of Representatives",
      "district": "Ijero/Ekiti West/Efon Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BO",
      "school": "Secondary School, Ijero",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ijero/Ekiti West/Efon Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ek-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ijero",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ijero/Ekiti West/Efon Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Akin Rotimi",
      "office_title": "Member, House of Representatives",
      "district": "Ekiti North I (Ikole/Oye) Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AR",
      "school": "Secondary School, Ekiti North I (Ikole",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ekiti North I (Ikole/Oye) Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ek-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Ekiti North I (Ikole",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ekiti North I (Ikole/Oye) Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "GO": [
    {
      "name": "Hon. Ali Isa JC",
      "office_title": "Member, House of Representatives",
      "district": "Balanga/Billiri Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AI",
      "school": "Secondary School, Balanga",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Balanga/Billiri Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-go-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Balanga",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Balanga/Billiri Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Inuwa Garba",
      "office_title": "Member, House of Representatives",
      "district": "Yamaltu/Deba Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "IG",
      "school": "Secondary School, Yamaltu",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Yamaltu/Deba Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-go-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Yamaltu",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Yamaltu/Deba Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Yaya Bauchi Tongo",
      "office_title": "Member, House of Representatives",
      "district": "Gombe/Kwami/Funakaye Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "YB",
      "school": "Secondary School, Gombe",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Gombe/Kwami/Funakaye Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-go-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Gombe",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Gombe/Kwami/Funakaye Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "IM": [
    {
      "name": "Hon. Ikenga Imo Ugochinyere",
      "office_title": "Member, House of Representatives",
      "district": "Ideato North/Ideato South Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "II",
      "school": "Secondary School, Ideato North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ideato North/Ideato South Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-im-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ideato North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ideato North/Ideato South Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Miriam Onuoha",
      "office_title": "Member, House of Representatives",
      "district": "Isiala Mbano/Okigwe/Onuimo Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "MO",
      "school": "Secondary School, Isiala Mbano",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Isiala Mbano/Okigwe/Onuimo Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-im-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Isiala Mbano",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Isiala Mbano/Okigwe/Onuimo Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Tochukwu Okere",
      "office_title": "Member, House of Representatives",
      "district": "Owerri Municipal/North/West Federal Constituency",
      "party": "Labour Party (LP)",
      "photo_url": "",
      "initials": "TO",
      "school": "Secondary School, Owerri Municipal",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Owerri Municipal/North/West Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-im-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Owerri Municipal",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Owerri Municipal/North/West Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Ugonna Ozurigbo",
      "office_title": "Member, House of Representatives",
      "district": "Nkwerre/Isu/Nwangele/Njaba Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "UO",
      "school": "Secondary School, Nkwerre",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Nkwerre/Isu/Nwangele/Njaba Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-im-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Nkwerre",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Nkwerre/Isu/Nwangele/Njaba Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "JI": [
    {
      "name": "Hon. Yusuf Shitu Galambi",
      "office_title": "Member, House of Representatives",
      "district": "Gwaram Federal Constituency",
      "party": "African Democratic Congress (NNPP)",
      "photo_url": "",
      "initials": "YS",
      "school": "Secondary School, Gwaram",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Gwaram Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ji-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Gwaram Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Gwaram Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Adamu Alkali",
      "office_title": "Member, House of Representatives",
      "district": "Birnin Kudu/Buji Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Birnin Kudu",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Birnin Kudu/Buji Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ji-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Birnin Kudu",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Birnin Kudu/Buji Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Nazifi Sani",
      "office_title": "Member, House of Representatives",
      "district": "Gumel/Gagarawa/Suletankarkar/Maigatari Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "NS",
      "school": "Secondary School, Gumel",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Gumel/Gagarawa/Suletankarkar/Maigatari Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ji-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Gumel",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Gumel/Gagarawa/Suletankarkar/Maigatari Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "KD": [
    {
      "name": "Hon. Hussaini Jallo",
      "office_title": "Member, House of Representatives",
      "district": "Igabi Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "HJ",
      "school": "Secondary School, Igabi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Igabi Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kd-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Igabi Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Igabi Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Amos Gwamna Magaji",
      "office_title": "Member, House of Representatives",
      "district": "Jaba/Zangon Kataf Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AG",
      "school": "Secondary School, Jaba",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Jaba/Zangon Kataf Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kd-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Jaba",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Jaba/Zangon Kataf Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Bello El-Rufai",
      "office_title": "Member, House of Representatives",
      "district": "Kaduna North Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BE",
      "school": "Secondary School, Kaduna North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Kaduna North Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kd-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Kaduna North Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Kaduna North Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Sadiq Ango Abdullahi",
      "office_title": "Member, House of Representatives",
      "district": "Sabon Gari Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "SA",
      "school": "Secondary School, Sabon Gari",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Sabon Gari Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kd-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Sabon Gari Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Sabon Gari Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "KT": [
    {
      "name": "Hon. Aminu Balele (Kurfi)",
      "office_title": "Member, House of Representatives",
      "district": "Kurfi/Dutsin-Ma Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AB",
      "school": "Secondary School, Kurfi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Kurfi/Dutsin-Ma Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kt-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Kurfi",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Kurfi/Dutsin-Ma Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Sada Soli Jibia",
      "office_title": "Member, House of Representatives",
      "district": "Jibia/Kaita Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SS",
      "school": "Secondary School, Jibia",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Jibia/Kaita Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kt-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Jibia",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Jibia/Kaita Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Aliyu Abubakar",
      "office_title": "Member, House of Representatives",
      "district": "Katsina Central Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Katsina Central",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Katsina Central Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kt-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Katsina Central Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Katsina Central Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "KB": [
    {
      "name": "Hon. Bello Kaoje",
      "office_title": "Member, House of Representatives",
      "district": "Bagudo/Suru Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "BK",
      "school": "Secondary School, Bagudo",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Bagudo/Suru Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kb-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Bagudo",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Bagudo/Suru Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Kabir Tukura",
      "office_title": "Member, House of Representatives",
      "district": "Zuru/Fakai/Sakaba/Wasagu Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "KT",
      "school": "Secondary School, Zuru",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Zuru/Fakai/Sakaba/Wasagu Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kb-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Zuru",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Zuru/Fakai/Sakaba/Wasagu Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Garba Rabiu Kamba",
      "office_title": "Member, House of Representatives",
      "district": "Dandi/Arewa Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "GR",
      "school": "Secondary School, Dandi",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Dandi/Arewa Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kb-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Dandi",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Dandi/Arewa Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "KG": [
    {
      "name": "Hon. Leke Abejide",
      "office_title": "Member, House of Representatives",
      "district": "Yagba East/West/Mopamuro Federal Constituency",
      "party": "African Democratic Congress (ADC)",
      "photo_url": "",
      "initials": "LA",
      "school": "Secondary School, Yagba East",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Yagba East/West/Mopamuro Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kg-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Yagba East",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Yagba East/West/Mopamuro Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Salman Idris",
      "office_title": "Member, House of Representatives",
      "district": "Kabba/Bunu/Ijumu Federal Constituency",
      "party": "African Democratic Congress (ADC)",
      "photo_url": "",
      "initials": "SI",
      "school": "Secondary School, Kabba",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Kabba/Bunu/Ijumu Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kg-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Kabba",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Kabba/Bunu/Ijumu Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Danladi Aguye",
      "office_title": "Member, House of Representatives",
      "district": "Lokoja/Kogi Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DA",
      "school": "Secondary School, Lokoja",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Lokoja/Kogi Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kg-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Lokoja",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Lokoja/Kogi Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Sani Egidi Abdulraheem",
      "office_title": "Member, House of Representatives",
      "district": "Ajaokuta Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SE",
      "school": "Secondary School, Ajaokuta",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ajaokuta Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kg-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Ajaokuta Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ajaokuta Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "KW": [
    {
      "name": "Hon. Muktar Shagaya",
      "office_title": "Member, House of Representatives",
      "district": "Ilorin West/Asa Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "MS",
      "school": "Secondary School, Ilorin West",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ilorin West/Asa Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kw-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ilorin West",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ilorin West/Asa Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Yinka Aluko",
      "office_title": "Member, House of Representatives",
      "district": "Ilorin East/South Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "YA",
      "school": "Secondary School, Ilorin East",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ilorin East/South Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kw-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ilorin East",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ilorin East/South Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Tunji Olawuyi (Ajuloopin)",
      "office_title": "Member, House of Representatives",
      "district": "Ekiti/Isin/Irepodun/Oke-Ero Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "TO",
      "school": "Secondary School, Ekiti",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ekiti/Isin/Irepodun/Oke-Ero Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-kw-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Ekiti",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ekiti/Isin/Irepodun/Oke-Ero Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "NA": [
    {
      "name": "Hon. Gaza Jonathan Gbefwi",
      "office_title": "Member, House of Representatives",
      "district": "Karu/Keffi/Kokona Federal Constituency",
      "party": "Social Democratic Party (SDP)",
      "photo_url": "",
      "initials": "GJ",
      "school": "Secondary School, Karu",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Karu/Keffi/Kokona Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-na-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Karu",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Karu/Keffi/Kokona Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Jeremiah Umaru",
      "office_title": "Member, House of Representatives",
      "district": "Akwanga/Nasarawa Eggon/Wamba Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JU",
      "school": "Secondary School, Akwanga",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Akwanga/Nasarawa Eggon/Wamba Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-na-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Akwanga",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Akwanga/Nasarawa Eggon/Wamba Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Abubakar Dahiru",
      "office_title": "Member, House of Representatives",
      "district": "Lafia/Obi Federal Constituency",
      "party": "Social Democratic Party (SDP)",
      "photo_url": "",
      "initials": "AD",
      "school": "Secondary School, Lafia",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Lafia/Obi Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-na-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Lafia",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Lafia/Obi Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "NI": [
    {
      "name": "Hon. Saidu Musa Abdullahi (SMA)",
      "office_title": "Member, House of Representatives",
      "district": "Bida/Gbako/Katcha Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "SM",
      "school": "Secondary School, Bida",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Bida/Gbako/Katcha Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ni-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Bida",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Bida/Gbako/Katcha Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Joshua Audu Gana",
      "office_title": "Member, House of Representatives",
      "district": "Lavun/Mokwa/Edati Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "JA",
      "school": "Secondary School, Lavun",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Lavun/Mokwa/Edati Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ni-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Lavun",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Lavun/Mokwa/Edati Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Yusuf Baraje",
      "office_title": "Member, House of Representatives",
      "district": "Bosso/Paikoro Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "YB",
      "school": "Secondary School, Bosso",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Bosso/Paikoro Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ni-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Bosso",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Bosso/Paikoro Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "OG": [
    {
      "name": "Hon. Afolabi Afuape",
      "office_title": "Member, House of Representatives",
      "district": "Abeokuta South Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Abeokuta South",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Abeokuta South Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-og-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Abeokuta South Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Abeokuta South Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Olumide Osoba",
      "office_title": "Member, House of Representatives",
      "district": "Abeokuta North/Obafemi Owode/Odeda Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "OO",
      "school": "Secondary School, Abeokuta North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Abeokuta North/Obafemi Owode/Odeda Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-og-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Abeokuta North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Abeokuta North/Obafemi Owode/Odeda Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Gboyega Nasir Isiaka (GNI)",
      "office_title": "Member, House of Representatives",
      "district": "Yewa North/Imeko Afon Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "GN",
      "school": "Secondary School, Yewa North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Yewa North/Imeko Afon Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-og-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Yewa North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Yewa North/Imeko Afon Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Femi Ogunbanwo",
      "office_title": "Member, House of Representatives",
      "district": "Ijebu Central Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "FO",
      "school": "Secondary School, Ijebu Central",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ijebu Central Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-og-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Ijebu Central Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ijebu Central Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "ON": [
    {
      "name": "Hon. Festus Adefiranye",
      "office_title": "Member, House of Representatives",
      "district": "Ile-Oluji Okeigbo/Odigbo Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "FA",
      "school": "Secondary School, Ile-Oluji Okeigbo",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ile-Oluji Okeigbo/Odigbo Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-on-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ile-Oluji Okeigbo",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ile-Oluji Okeigbo/Odigbo Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Makinde Abiola",
      "office_title": "Member, House of Representatives",
      "district": "Ondo East/Ondo West Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "MA",
      "school": "Secondary School, Ondo East",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ondo East/Ondo West Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-on-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ondo East",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ondo East/Ondo West Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Derin Adesida",
      "office_title": "Member, House of Representatives",
      "district": "Akure South/North Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DA",
      "school": "Secondary School, Akure South",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Akure South/North Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-on-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Akure South",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Akure South/North Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Jimi Odimayo",
      "office_title": "Member, House of Representatives",
      "district": "Okitipupa/Irele Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "JO",
      "school": "Secondary School, Okitipupa",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Okitipupa/Irele Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-on-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Okitipupa",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Okitipupa/Irele Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "OS": [
    {
      "name": "Hon. Bamidele Salam",
      "office_title": "Member, House of Representatives",
      "district": "Ede North/South/Egbedore/Ejigbo Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "BS",
      "school": "Secondary School, Ede North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ede North/South/Egbedore/Ejigbo Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-os-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ede North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ede North/South/Egbedore/Ejigbo Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Taofeek Ajilesoro",
      "office_title": "Member, House of Representatives",
      "district": "Ife Central/East/North/South Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "TA",
      "school": "Secondary School, Ife Central",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ife Central/East/North/South Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-os-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ife Central",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ife Central/East/North/South Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Mudashiru Lukman (L&K)",
      "office_title": "Member, House of Representatives",
      "district": "Ayedire/Iwo/Ola-Oluwa Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "ML",
      "school": "Secondary School, Ayedire",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ayedire/Iwo/Ola-Oluwa Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-os-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Ayedire",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ayedire/Iwo/Ola-Oluwa Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Olusanya Omirin",
      "office_title": "Member, House of Representatives",
      "district": "Atakunmosa East/West/Ilesa East/West Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "OO",
      "school": "Secondary School, Atakunmosa East",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Atakunmosa East/West/Ilesa East/West Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-os-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Atakunmosa East",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Atakunmosa East/West/Ilesa East/West Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "OY": [
    {
      "name": "Hon. Stanley Olajide (Odidi Omo)",
      "office_title": "Member, House of Representatives",
      "district": "Ibadan North-West/South-West Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "SO",
      "school": "Secondary School, Ibadan North-West",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ibadan North-West/South-West Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-oy-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Ibadan North-West",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ibadan North-West/South-West Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Dhikrullah Olajide (Fijabi)",
      "office_title": "Member, House of Representatives",
      "district": "Ibadan North-East/South-East Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "DO",
      "school": "Secondary School, Ibadan North-East",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ibadan North-East/South-East Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-oy-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Ibadan North-East",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ibadan North-East/South-East Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Tolulope Akande-Sadipe",
      "office_title": "Member, House of Representatives",
      "district": "Oluyole Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "TA",
      "school": "Secondary School, Oluyole",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Oluyole Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-oy-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Oluyole Federal Constituency",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Oluyole Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Akin Alabi",
      "office_title": "Member, House of Representatives",
      "district": "Egbeda/Ona Ara Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AA",
      "school": "Secondary School, Egbeda",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Egbeda/Ona Ara Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-oy-rep-4",
          "title": "Constituency Rural Solar Water & Educational Support in Egbeda",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Egbeda/Ona Ara Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Ojo Sunday Makanjuola",
      "office_title": "Member, House of Representatives",
      "district": "Ogooluwa/Surulere Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "OS",
      "school": "Secondary School, Ogooluwa",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Ogooluwa/Surulere Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-oy-rep-5",
          "title": "Constituency Rural Solar Water & Educational Support in Ogooluwa",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Ogooluwa/Surulere Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "PL": [
    {
      "name": "Hon. Dachung Bagos",
      "office_title": "Member, House of Representatives",
      "district": "Jos South/Jos East Federal Constituency",
      "party": "African Democratic Congress (LP/PDP)",
      "photo_url": "",
      "initials": "DB",
      "school": "Secondary School, Jos South",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Jos South/Jos East Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-pl-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Jos South",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Jos South/Jos East Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Beni Lar",
      "office_title": "Member, House of Representatives",
      "district": "Langtang North/Langtang South Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "BL",
      "school": "Secondary School, Langtang North",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Langtang North/Langtang South Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-pl-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Langtang North",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Langtang North/Langtang South Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Isaac Kwallu",
      "office_title": "Member, House of Representatives",
      "district": "Mikang/Qua'an Pan/Shendam Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "IK",
      "school": "Secondary School, Mikang",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Mikang/Qua'an Pan/Shendam Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-pl-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Mikang",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Mikang/Qua'an Pan/Shendam Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "SO": [
    {
      "name": "Hon. Mani Maishinko",
      "office_title": "Member, House of Representatives",
      "district": "Binji/Silame Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "MM",
      "school": "Secondary School, Binji",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Binji/Silame Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-so-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Binji",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Binji/Silame Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Abdussamad Dasuki",
      "office_title": "Member, House of Representatives",
      "district": "Kebbe/Tambuwal Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "AD",
      "school": "Secondary School, Kebbe",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Kebbe/Tambuwal Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-so-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Kebbe",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Kebbe/Tambuwal Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Umar Yusuf Yabo",
      "office_title": "Member, House of Representatives",
      "district": "Yabo/Shagari Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "UY",
      "school": "Secondary School, Yabo",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Yabo/Shagari Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-so-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Yabo",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Yabo/Shagari Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "TA": [
    {
      "name": "Hon. Mark Useni",
      "office_title": "Member, House of Representatives",
      "district": "Takum/Donga/Ussa Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "MU",
      "school": "Secondary School, Takum",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Takum/Donga/Ussa Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ta-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Takum",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Takum/Donga/Ussa Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Sadiq Abbas",
      "office_title": "Member, House of Representatives",
      "district": "Jalingo/Yorro/Zing Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "SA",
      "school": "Secondary School, Jalingo",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Jalingo/Yorro/Zing Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ta-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Jalingo",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Jalingo/Yorro/Zing Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Jaafaru Yakubu",
      "office_title": "Member, House of Representatives",
      "district": "Bali/Gassol Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "JY",
      "school": "Secondary School, Bali",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Bali/Gassol Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-ta-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Bali",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Bali/Gassol Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "YO": [
    {
      "name": "Hon. Khadija Bukar Abba Ibrahim",
      "office_title": "Member, House of Representatives",
      "district": "Damaturu/Gujba/Gulani/Tarmuwa Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "KB",
      "school": "Secondary School, Damaturu",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Damaturu/Gujba/Gulani/Tarmuwa Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-yo-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Damaturu",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Damaturu/Gujba/Gulani/Tarmuwa Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Zakariya'u Galadima",
      "office_title": "Member, House of Representatives",
      "district": "Bade/Jakusko Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "ZG",
      "school": "Secondary School, Bade",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Bade/Jakusko Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-yo-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Bade",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Bade/Jakusko Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Fatima Talba",
      "office_title": "Member, House of Representatives",
      "district": "Nangere/Potiskum Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "FT",
      "school": "Secondary School, Nangere",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Nangere/Potiskum Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-yo-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Nangere",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Nangere/Potiskum Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ],
  "ZM": [
    {
      "name": "Hon. Aminu Sani Jaji",
      "office_title": "Member, House of Representatives",
      "district": "Kaura Namoda/Birnin Magaji Federal Constituency",
      "party": "All Progressives Congress (APC)",
      "photo_url": "",
      "initials": "AS",
      "school": "Secondary School, Kaura Namoda",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Kaura Namoda/Birnin Magaji Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-zm-rep-1",
          "title": "Constituency Rural Solar Water & Educational Support in Kaura Namoda",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Kaura Namoda/Birnin Magaji Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Kabiru Amadu Maipalace",
      "office_title": "Member, House of Representatives",
      "district": "Gusau/Tsafe Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "KA",
      "school": "Secondary School, Gusau",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Gusau/Tsafe Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-zm-rep-2",
          "title": "Constituency Rural Solar Water & Educational Support in Gusau",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Gusau/Tsafe Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    },
    {
      "name": "Hon. Isa Mohammed Anka",
      "office_title": "Member, House of Representatives",
      "district": "Anka/Talata Mafara Federal Constituency",
      "party": "Peoples Democratic Party (PDP)",
      "photo_url": "",
      "initials": "IM",
      "school": "Secondary School, Anka",
      "uni": "Higher Education in Social Sciences & Law",
      "past": "Legislative Service & Community Leadership",
      "bio": "Federal lawmaker representing Anka/Talata Mafara Federal Constituency in the 10th National Assembly.",
      "promises": [
        {
          "id": "p-zm-rep-3",
          "title": "Constituency Rural Solar Water & Educational Support in Anka",
          "category": "Infrastructure",
          "description": "Construction of motorized solar water schemes and payment of WAEC/JAMB exam fees across Anka/Talata Mafara Federal Constituency.",
          "status": "fulfilled",
          "date_made": "2023-11-15",
          "budget_allocated": "\u20a6350 Million",
          "progress_pct": 100,
          "milestones": [
            "Solar Water Schemes Handed Over",
            "Students Paid in Full"
          ]
        }
      ]
    }
  ]
};

export function getOfficialsForState(stateCode: string): OfficialProfile[] {
  const sCode = stateCode.toUpperCase();
  const stateObj = ALL_NIGERIAN_STATES.find(s => s.code === sCode);
  const stateName = stateObj ? stateObj.name.replace(' State', '') : 'Selected State';

  const govData = NIGERIA_GOVERNORS_MASTER[sCode] || NIGERIA_GOVERNORS_MASTER['NAT'];

  const govProfile: OfficialProfile = {
    id: `gov-${sCode.toLowerCase()}`,
    name: govData.name,
    office_title: govData.office_title,
    role: govData.role,
    state_code: sCode,
    state_name: stateName,
    party: govData.party,
    term_period: govData.term_period,
    photo_url: govData.photo_url || '',
    initials: govData.initials,
    bio_summary: govData.bio,
    citizen_rating: govData.citizen_rating,
    quality_of_life: govData.quality_of_life,
    education: [
      { school: govData.school, degree_or_cert: 'Secondary School Education', period: 'Secondary' },
      { school: govData.uni, degree_or_cert: 'Higher Degree / Professional Certification', period: 'Tertiary' }
    ],
    past_offices: [
      { title: 'Executive / Corporate Leadership', organization_or_level: `${stateName} / Federal Level`, period: 'Past Offices', summary: govData.past }
    ],
    promises: (govData.promises || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      status: p.status,
      date_made: p.date_made,
      budget_allocated: p.budget_allocated,
      progress_pct: p.progress_pct,
      milestones: p.milestones,
      evidence_url: p.evidence_url
    }))
  };

  const stateSenators = (NIGERIA_SENATORS_MASTER[sCode] || NIGERIA_SENATORS_MASTER['NAT'] || []).map((s: any, idx: number) => ({
    id: `sen-${sCode.toLowerCase()}-${idx + 1}`,
    name: s.name,
    office_title: s.office_title || `Senator representing ${s.district}`,
    role: 'senator' as const,
    state_code: sCode,
    state_name: stateName,
    district_constituency: s.district,
    party: s.party,
    term_period: 'June 2023 – Present',
    photo_url: s.photo_url || '',
    initials: s.initials || 'SN',
    bio_summary: s.bio,
    citizen_rating: {
      overall_score: 4.3,
      approval_pct: 84,
      total_votes: 11400,
      breakdown: { infrastructure: 4.4, economy: 4.2, transparency: 4.3, security_or_education: 4.4 }
    },
    quality_of_life: govData.quality_of_life,
    education: [
      { school: s.school, degree_or_cert: 'Secondary Education' },
      { school: s.uni, degree_or_cert: 'Higher Education' }
    ],
    past_offices: [
      { title: 'Public / Legislative Service', organization_or_level: 'National Assembly of Nigeria', period: 'Past Record', summary: s.past }
    ],
    promises: (s.promises || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      status: p.status,
      date_made: p.date_made,
      budget_allocated: p.budget_allocated,
      progress_pct: p.progress_pct,
      milestones: p.milestones
    }))
  }));

  const stateReps = (NIGERIA_REPRESENTATIVES_MASTER[sCode] || NIGERIA_REPRESENTATIVES_MASTER['NAT'] || []).map((r: any, idx: number) => ({
    id: `rep-${sCode.toLowerCase()}-${idx + 1}`,
    name: r.name,
    office_title: r.office_title,
    role: 'house_of_rep' as const,
    state_code: sCode,
    state_name: stateName,
    district_constituency: r.district,
    party: r.party,
    term_period: 'June 2023 – Present',
    photo_url: r.photo_url || '',
    initials: r.initials || 'RP',
    bio_summary: r.bio,
    citizen_rating: {
      overall_score: 4.3,
      approval_pct: 85,
      total_votes: 9800,
      breakdown: { infrastructure: 4.4, economy: 4.3, transparency: 4.2, security_or_education: 4.4 }
    },
    quality_of_life: govData.quality_of_life,
    education: [
      { school: r.school, degree_or_cert: 'Secondary Education' },
      { school: r.uni, degree_or_cert: 'Higher Education' }
    ],
    past_offices: [
      { title: 'Legislative / Public Office', organization_or_level: 'House of Representatives', period: 'Past Record', summary: r.past }
    ],
    promises: (r.promises || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      status: p.status,
      date_made: p.date_made,
      budget_allocated: p.budget_allocated,
      progress_pct: p.progress_pct,
      milestones: p.milestones
    }))
  }));

  return [govProfile, ...stateSenators, ...stateReps];
}
