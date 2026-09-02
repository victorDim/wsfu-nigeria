import json

output_file = r"C:\Users\dimvi\projects\wsfu\web\src\lib\officials_data.ts"

with open(r"C:\Users\dimvi\projects\wsfu\backend\populate_all_real_data.py", "r", encoding="utf-8") as f:
    code = f.read()

# Let's execute populate_all_real_data.py in memory to get the dictionaries
namespace = {}
exec(code, namespace)

governors = namespace['governors']
real_senators = namespace['real_senators']
real_reps = namespace['real_reps']

# Let's build the TypeScript file
ts = '''import { OfficialProfile, TrackedPromise, StateData } from '../types';

export const ALL_NIGERIAN_STATES: StateData[] = [
  { id: 'nat', name: 'Federal Republic of Nigeria (Presidency & National Assembly)', code: 'NAT', geopolitical_zone: 'Federal Government' },
  { id: 'ab', name: 'Abia State', code: 'AB', geopolitical_zone: 'South East' },
  { id: 'ad', name: 'Adamawa State', code: 'AD', geopolitical_zone: 'North East' },
  { id: 'ak', name: 'Akwa Ibom State', code: 'AK', geopolitical_zone: 'South South' },
  { id: 'an', name: 'Anambra State', code: 'AN', geopolitical_zone: 'South East' },
  { id: 'ba', name: 'Bauchi State', code: 'BA', geopolitical_zone: 'North East' },
  { id: 'by', name: 'Bayelsa State', code: 'BY', geopolitical_zone: 'South South' },
  { id: 'be', name: 'Benue State', code: 'BE', geopolitical_zone: 'North Central' },
  { id: 'bo', name: 'Borno State', code: 'BO', geopolitical_zone: 'North East' },
  { id: 'cr', name: 'Cross River State', code: 'CR', geopolitical_zone: 'South South' },
  { id: 'de', name: 'Delta State', code: 'DE', geopolitical_zone: 'South South' },
  { id: 'eb', name: 'Ebonyi State', code: 'EB', geopolitical_zone: 'South East' },
  { id: 'ed', name: 'Edo State', code: 'ED', geopolitical_zone: 'South South' },
  { id: 'ek', name: 'Ekiti State', code: 'EK', geopolitical_zone: 'South West' },
  { id: 'en', name: 'Enugu State', code: 'EN', geopolitical_zone: 'South East' },
  { id: 'fc', name: 'Federal Capital Territory (Abuja)', code: 'FC', geopolitical_zone: 'North Central' },
  { id: 'go', name: 'Gombe State', code: 'GO', geopolitical_zone: 'North East' },
  { id: 'im', name: 'Imo State', code: 'IM', geopolitical_zone: 'South East' },
  { id: 'ji', name: 'Jigawa State', code: 'JI', geopolitical_zone: 'North West' },
  { id: 'kd', name: 'Kaduna State', code: 'KD', geopolitical_zone: 'North West' },
  { id: 'kn', name: 'Kano State', code: 'KN', geopolitical_zone: 'North West' },
  { id: 'kt', name: 'Katsina State', code: 'KT', geopolitical_zone: 'North West' },
  { id: 'kb', name: 'Kebbi State', code: 'KB', geopolitical_zone: 'North West' },
  { id: 'kg', name: 'Kogi State', code: 'KG', geopolitical_zone: 'North Central' },
  { id: 'kw', name: 'Kwara State', code: 'KW', geopolitical_zone: 'North Central' },
  { id: 'la', name: 'Lagos State', code: 'LA', geopolitical_zone: 'South West' },
  { id: 'na', name: 'Nasarawa State', code: 'NA', geopolitical_zone: 'North Central' },
  { id: 'ni', name: 'Niger State', code: 'NI', geopolitical_zone: 'North Central' },
  { id: 'og', name: 'Ogun State', code: 'OG', geopolitical_zone: 'South West' },
  { id: 'on', name: 'Ondo State', code: 'ON', geopolitical_zone: 'South West' },
  { id: 'os', name: 'Osun State', code: 'OS', geopolitical_zone: 'South West' },
  { id: 'oy', name: 'Oyo State', code: 'OY', geopolitical_zone: 'South West' },
  { id: 'pl', name: 'Plateau State', code: 'PL', geopolitical_zone: 'North Central' },
  { id: 'rv', name: 'Rivers State', code: 'RV', geopolitical_zone: 'South South' },
  { id: 'so', name: 'Sokoto State', code: 'SO', geopolitical_zone: 'North West' },
  { id: 'ta', name: 'Taraba State', code: 'TA', geopolitical_zone: 'North East' },
  { id: 'yo', name: 'Yobe State', code: 'YO', geopolitical_zone: 'North East' },
  { id: 'zm', name: 'Zamfara State', code: 'ZM', geopolitical_zone: 'North West' }
];

export const NIGERIA_STATE_LGAS: Record<string, string[]> = {
  AB: ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obingwa', 'Ohafia', 'Osisioma', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'],
  AD: ['Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'Mayo Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'],
  AK: ['Uyo', 'Eket', 'Ikot Ekpene', 'Oron', 'Abak', 'Etinan', 'Ikot Abasi', 'Ibeno', 'Ibiono-Ibom', 'Ibesikpo Asutan', 'Essien Udim', 'Etim Ekpo', 'Ini', 'Itu', 'Mbo', 'Mkpat-Enin', 'Nsit-Atai', 'Nsit-Ibom', 'Nsit-Ubium', 'Onna', 'Oruk Anam', 'Ukanafun', 'Uruan'],
  AN: ['Awka North', 'Awka South', 'Onitsha North', 'Onitsha South', 'Nnewi North', 'Nnewi South', 'Aguata', 'Idemili North', 'Idemili South', 'Ihiala', 'Ogbaru', 'Orumba North', 'Orumba South', 'Oyi', 'Dunukofia', 'Anaocha', 'Njikoka', 'Ayamelum', 'Anambra East', 'Anambra West', 'Ekwusigo'],
  BA: ['Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 'Giade', 'Itas/Gadau', 'Jama\\'are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'],
  BY: ['Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'],
  BE: ['Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West', 'Katsina-Ala', 'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu', 'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'],
  BO: ['Maiduguri', 'Jere', 'Bama', 'Gwoza', 'Biu', 'Hawul', 'Askira/Uba', 'Chibok', 'Damboa', 'Gubio', 'Kaga', 'Konduga', 'Kukawa', 'Mafa', 'Magumeri', 'Marte', 'Mobbar', 'Monguno', 'Ngala', 'Nganzai', 'Shani'],
  CR: ['Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal', 'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 'Yakuur', 'Yala'],
  DE: ['Warri South', 'Warri North', 'Warri South West', 'Sapele', 'Ughelli North', 'Ughelli South', 'Uvwie', 'Oshimili South', 'Oshimili North', 'Aniocha North', 'Aniocha South', 'Ethiope East', 'Ethiope West', 'Ika North East', 'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 'Okpe', 'Patani', 'Ukwuani'],
  EB: ['Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'],
  ED: ['Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West', 'Etsako Central', 'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba-Okha', 'Oredo', 'Orhionmwon', 'Ovia North-East', 'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'],
  EK: ['Ado-Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin', 'Ido-Osi', 'Ijero', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun', 'Moba', 'Oye'],
  EN: ['Enugu North', 'Enugu South', 'Enugu East', 'Nsukka', 'Udi', 'Ezeagu', 'Awgu', 'Aninri', 'Oji River', 'Igbo-Eze North', 'Igbo-Eze South', 'Nkanu East', 'Nkanu West', 'Uzo-Uwani', 'Isi-Uzo', 'Igbo-Etiti', 'Udenu'],
  FC: ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council (AMAC)'],
  GO: ['Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 'Nafada', 'Shongom', 'Yamaltu/Deba'],
  IM: ['Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South', 'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 'Nkwerre', 'Nwangele', 'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Onuimo', 'Orlu', 'Orsu', 'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North', 'Owerri West'],
  JI: ['Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki', 'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kazaure', 'Kiri Kasama', 'Kiyawa', 'Maigatari', 'Malam Madori', 'Miga', 'Ringim', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'],
  KD: ['Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\\'a', 'Kachia', 'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'],
  KN: ['Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'],
  KT: ['Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dan Musa', 'Dandume', 'Danja', 'Daura', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa', 'Jibia', 'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi', 'Kusada', 'Mai\\'Adua', 'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 'Sandamu', 'Zango'],
  KB: ['Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza', 'Dandi', 'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 'Sakaba', 'Shanga', 'Suru', 'Danko/Wasagu', 'Yauri', 'Zuru'],
  KG: ['Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela-Odolu', 'Ijumu', 'Kabba/Bunu', 'Kogi', 'Lokoja', 'Mopa-Muro', 'Ofu', 'Ogori/Magongo', 'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'],
  KW: ['Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South', 'Ilorin West', 'Irepodun', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'],
  LA: ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],
  NA: ['Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 'Nasarawa Egon', 'Obi', 'Toto', 'Wamba'],
  NI: ['Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gurara', 'Katcha', 'Kontagora', 'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu', 'Mokwa', 'Moya', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja', 'Tafa', 'Wushishi'],
  OG: ['Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Ewekoro', 'Ifo', 'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside', 'Remo North', 'Shagamu', 'Yewa North', 'Yewa South'],
  ON: ['Akoko North-East', 'Akoko North-West', 'Akoko South-East', 'Akoko South-West', 'Akure North', 'Akure South', 'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo', 'Irele', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West', 'Ose', 'Owo'],
  OS: ['Atakunmosa East', 'Atakunmosa West', 'Aiyedaade', 'Aiyedire', 'Boluwaduro', 'Boripe', 'Ede North', 'Ede South', 'Ife Central', 'Ife East', 'Ife North', 'Ife South', 'Egbedore', 'Ejigbo', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesa East', 'Ilesa West', 'Irepodun', 'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa', 'Olorunda', 'Oriade', 'Orolu', 'Osogbo'],
  OY: ['Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North-East', 'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 'Ogbomosho North', 'Ogbomosho South', 'Ogo Oluwa', 'Olorunsogo', 'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West', 'Surulere'],
  PL: ['Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Mikang', 'Pankshin', 'Qua\\'an Pan', 'Riyom', 'Shendam', 'Wase'],
  RV: ['Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru', 'Bonny', 'Degema', 'Eleme', 'Emuoha', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro', 'Oyigbo', 'Port Harcourt', 'Tai'],
  SO: ['Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela', 'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North', 'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta', 'Wamako', 'Wurno', 'Yabo'],
  TA: ['Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido', 'Kumi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'],
  YO: ['Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko', 'Karasuwa', 'Machina', 'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'],
  ZM: ['Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau', 'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Tsafe', 'Zurmi']
};

export const NIGERIA_GOVERNORS_MASTER: Record<string, any> = ''' + json.dumps(governors, indent=2) + ''';

export const NIGERIA_SENATORS_MASTER: Record<string, any[]> = ''' + json.dumps(real_senators, indent=2) + ''';

export const NIGERIA_REPRESENTATIVES_MASTER: Record<string, any[]> = ''' + json.dumps(real_reps, indent=2) + ''';

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
    promises: govData.promises.map((p: any) => ({
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
'''

with open(output_file, "w", encoding="utf-8") as f:
    f.write(ts)

print("Generated clean officials_data.ts successfully!")
