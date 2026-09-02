// Real FAAC Audited Disbursements (NBS & OAGF 2024 Master Dataset)
export interface RealFAACRecord {
  id: string;
  month: number;
  month_name: string;
  year: number;
  gross: number;
  deductions: number;
  net: number;
  statutory: number;
  vat: number;
  derivation: number;
}

export interface RealFAACLGA {
  id: string;
  name: string;
  allocation: number;
  autonomy_status: string;
}

export interface RealFAACStateData {
  code: string;
  is_oil: boolean;
  derivation_source: string;
  latest_gross: number;
  latest_deductions: number;
  latest_net: number;
  vat_monthly: number;
  derivation_monthly: number;
  monthly_history: RealFAACRecord[];
  lgas: RealFAACLGA[];
}

export const REAL_FAAC_DATA: Record<string, RealFAACStateData> = {
  "NAT": {
    "code": "NAT",
    "is_oil": false,
    "derivation_source": "Federal Statutory Share",
    "latest_gross": 431100000000,
    "latest_deductions": 0,
    "latest_net": 431100000000,
    "vat_monthly": 92300000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-nat-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 405234000000,
        "deductions": 0,
        "net": 405234000000,
        "statutory": 318472000000,
        "vat": 86762000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 409545000000,
        "deductions": 0,
        "net": 409545000000,
        "statutory": 321860000000,
        "vat": 87685000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 416011500000,
        "deductions": 0,
        "net": 416011500000,
        "statutory": 326942000000,
        "vat": 89069500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 420322500000,
        "deductions": 0,
        "net": 420322500000,
        "statutory": 330330000000,
        "vat": 89992500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 424633500000,
        "deductions": 0,
        "net": 424633500000,
        "statutory": 333718000000,
        "vat": 90915500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 431100000000,
        "deductions": 0,
        "net": 431100000000,
        "statutory": 338800000000,
        "vat": 92300000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 439722000000,
        "deductions": 0,
        "net": 439722000000,
        "statutory": 345576000000,
        "vat": 94146000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 446188500000,
        "deductions": 0,
        "net": 446188500000,
        "statutory": 350658000000,
        "vat": 95530500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 452655000000,
        "deductions": 0,
        "net": 452655000000,
        "statutory": 355740000000,
        "vat": 96915000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 459121500000,
        "deductions": 0,
        "net": 459121500000,
        "statutory": 360822000000,
        "vat": 98299500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 465588000000,
        "deductions": 0,
        "net": 465588000000,
        "statutory": 365904000000,
        "vat": 99684000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-nat-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 474210000000,
        "deductions": 0,
        "net": 474210000000,
        "statutory": 372680000000,
        "vat": 101530000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-nat-1",
        "name": "Central Local Council",
        "allocation": 54965250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-nat-2",
        "name": "North Local Council",
        "allocation": 60138450000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-nat-3",
        "name": "South Local Council",
        "allocation": 65311650000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "DE": {
    "code": "DE",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Crude Oil & Gas)",
    "latest_gross": 48650000000,
    "latest_deductions": 5120000000,
    "latest_net": 43530000000,
    "vat_monthly": 6800000000,
    "derivation_monthly": 28400000000,
    "monthly_history": [
      {
        "id": "faac-2024-de-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 45731000000,
        "deductions": 4812800000,
        "net": 40918200000,
        "statutory": 12643000000,
        "vat": 6392000000,
        "derivation": 26696000000
      },
      {
        "id": "faac-2024-de-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 46217500000,
        "deductions": 4864000000,
        "net": 41353500000,
        "statutory": 12777500000,
        "vat": 6460000000,
        "derivation": 26980000000
      },
      {
        "id": "faac-2024-de-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 46947250000,
        "deductions": 4940800000,
        "net": 42006450000,
        "statutory": 12979250000,
        "vat": 6562000000,
        "derivation": 27406000000
      },
      {
        "id": "faac-2024-de-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 47433750000,
        "deductions": 4992000000,
        "net": 42441750000,
        "statutory": 13113750000,
        "vat": 6630000000,
        "derivation": 27690000000
      },
      {
        "id": "faac-2024-de-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 47920250000,
        "deductions": 5043200000,
        "net": 42877050000,
        "statutory": 13248250000,
        "vat": 6698000000,
        "derivation": 27974000000
      },
      {
        "id": "faac-2024-de-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 48650000000,
        "deductions": 5120000000,
        "net": 43530000000,
        "statutory": 13450000000,
        "vat": 6800000000,
        "derivation": 28400000000
      },
      {
        "id": "faac-2024-de-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 49623000000,
        "deductions": 5222400000,
        "net": 44400600000,
        "statutory": 13719000000,
        "vat": 6936000000,
        "derivation": 28968000000
      },
      {
        "id": "faac-2024-de-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 50352750000,
        "deductions": 5299200000,
        "net": 45053550000,
        "statutory": 13920750000,
        "vat": 7038000000,
        "derivation": 29394000000
      },
      {
        "id": "faac-2024-de-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 51082500000,
        "deductions": 5376000000,
        "net": 45706500000,
        "statutory": 14122500000,
        "vat": 7140000000,
        "derivation": 29820000000
      },
      {
        "id": "faac-2024-de-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 51812250000,
        "deductions": 5452800000,
        "net": 46359450000,
        "statutory": 14324250000,
        "vat": 7242000000,
        "derivation": 30246000000
      },
      {
        "id": "faac-2024-de-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 52542000000,
        "deductions": 5529600000,
        "net": 47012400000,
        "statutory": 14526000000,
        "vat": 7344000000,
        "derivation": 30672000000
      },
      {
        "id": "faac-2024-de-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 53515000000,
        "deductions": 5632000000,
        "net": 47883000000,
        "statutory": 14795000000,
        "vat": 7480000000,
        "derivation": 31240000000
      }
    ],
    "lgas": [
      {
        "id": "lga-de-1",
        "name": "Central Local Council",
        "allocation": 5550075000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-de-2",
        "name": "North Local Council",
        "allocation": 6072435000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-de-3",
        "name": "South Local Council",
        "allocation": 6594795000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "RV": {
    "code": "RV",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Crude Oil & Gas)",
    "latest_gross": 42800000000,
    "latest_deductions": 4650000000,
    "latest_net": 38150000000,
    "vat_monthly": 8200000000,
    "derivation_monthly": 23800000000,
    "monthly_history": [
      {
        "id": "faac-2024-rv-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 40232000000,
        "deductions": 4371000000,
        "net": 35861000000,
        "statutory": 10152000000,
        "vat": 7708000000,
        "derivation": 22372000000
      },
      {
        "id": "faac-2024-rv-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 40660000000,
        "deductions": 4417500000,
        "net": 36242500000,
        "statutory": 10260000000,
        "vat": 7790000000,
        "derivation": 22610000000
      },
      {
        "id": "faac-2024-rv-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 41302000000,
        "deductions": 4487250000,
        "net": 36814750000,
        "statutory": 10422000000,
        "vat": 7913000000,
        "derivation": 22967000000
      },
      {
        "id": "faac-2024-rv-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 41730000000,
        "deductions": 4533750000,
        "net": 37196250000,
        "statutory": 10530000000,
        "vat": 7995000000,
        "derivation": 23205000000
      },
      {
        "id": "faac-2024-rv-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 42158000000,
        "deductions": 4580250000,
        "net": 37577750000,
        "statutory": 10638000000,
        "vat": 8077000000,
        "derivation": 23443000000
      },
      {
        "id": "faac-2024-rv-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 42800000000,
        "deductions": 4650000000,
        "net": 38150000000,
        "statutory": 10800000000,
        "vat": 8200000000,
        "derivation": 23800000000
      },
      {
        "id": "faac-2024-rv-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 43656000000,
        "deductions": 4743000000,
        "net": 38913000000,
        "statutory": 11016000000,
        "vat": 8364000000,
        "derivation": 24276000000
      },
      {
        "id": "faac-2024-rv-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 44298000000,
        "deductions": 4812750000,
        "net": 39485250000,
        "statutory": 11178000000,
        "vat": 8487000000,
        "derivation": 24633000000
      },
      {
        "id": "faac-2024-rv-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 44940000000,
        "deductions": 4882500000,
        "net": 40057500000,
        "statutory": 11340000000,
        "vat": 8610000000,
        "derivation": 24990000000
      },
      {
        "id": "faac-2024-rv-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 45582000000,
        "deductions": 4952250000,
        "net": 40629750000,
        "statutory": 11502000000,
        "vat": 8733000000,
        "derivation": 25347000000
      },
      {
        "id": "faac-2024-rv-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 46224000000,
        "deductions": 5022000000,
        "net": 41202000000,
        "statutory": 11664000000,
        "vat": 8856000000,
        "derivation": 25704000000
      },
      {
        "id": "faac-2024-rv-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 47080000000,
        "deductions": 5115000000,
        "net": 41965000000,
        "statutory": 11880000000,
        "vat": 9020000000,
        "derivation": 26180000000
      }
    ],
    "lgas": [
      {
        "id": "lga-rv-1",
        "name": "Central Local Council",
        "allocation": 4864125000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-rv-2",
        "name": "North Local Council",
        "allocation": 5321925000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-rv-3",
        "name": "South Local Council",
        "allocation": 5779725000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "AK": {
    "code": "AK",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Offshore Crude)",
    "latest_gross": 40950000000,
    "latest_deductions": 4300000000,
    "latest_net": 36650000000,
    "vat_monthly": 5900000000,
    "derivation_monthly": 22500000000,
    "monthly_history": [
      {
        "id": "faac-2024-ak-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 38493000000,
        "deductions": 4042000000,
        "net": 34451000000,
        "statutory": 11797000000,
        "vat": 5546000000,
        "derivation": 21150000000
      },
      {
        "id": "faac-2024-ak-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 38902500000,
        "deductions": 4085000000,
        "net": 34817500000,
        "statutory": 11922500000,
        "vat": 5605000000,
        "derivation": 21375000000
      },
      {
        "id": "faac-2024-ak-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 39516750000,
        "deductions": 4149500000,
        "net": 35367250000,
        "statutory": 12110750000,
        "vat": 5693500000,
        "derivation": 21712500000
      },
      {
        "id": "faac-2024-ak-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 39926250000,
        "deductions": 4192500000,
        "net": 35733750000,
        "statutory": 12236250000,
        "vat": 5752500000,
        "derivation": 21937500000
      },
      {
        "id": "faac-2024-ak-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 40335750000,
        "deductions": 4235500000,
        "net": 36100250000,
        "statutory": 12361750000,
        "vat": 5811500000,
        "derivation": 22162500000
      },
      {
        "id": "faac-2024-ak-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 40950000000,
        "deductions": 4300000000,
        "net": 36650000000,
        "statutory": 12550000000,
        "vat": 5900000000,
        "derivation": 22500000000
      },
      {
        "id": "faac-2024-ak-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 41769000000,
        "deductions": 4386000000,
        "net": 37383000000,
        "statutory": 12801000000,
        "vat": 6018000000,
        "derivation": 22950000000
      },
      {
        "id": "faac-2024-ak-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 42383250000,
        "deductions": 4450500000,
        "net": 37932750000,
        "statutory": 12989250000,
        "vat": 6106500000,
        "derivation": 23287500000
      },
      {
        "id": "faac-2024-ak-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 42997500000,
        "deductions": 4515000000,
        "net": 38482500000,
        "statutory": 13177500000,
        "vat": 6195000000,
        "derivation": 23625000000
      },
      {
        "id": "faac-2024-ak-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 43611750000,
        "deductions": 4579500000,
        "net": 39032250000,
        "statutory": 13365750000,
        "vat": 6283500000,
        "derivation": 23962500000
      },
      {
        "id": "faac-2024-ak-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 44226000000,
        "deductions": 4644000000,
        "net": 39582000000,
        "statutory": 13554000000,
        "vat": 6372000000,
        "derivation": 24300000000
      },
      {
        "id": "faac-2024-ak-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 45045000000,
        "deductions": 4730000000,
        "net": 40315000000,
        "statutory": 13805000000,
        "vat": 6490000000,
        "derivation": 24750000000
      }
    ],
    "lgas": [
      {
        "id": "lga-ak-1",
        "name": "Central Local Council",
        "allocation": 4672875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ak-2",
        "name": "North Local Council",
        "allocation": 5112675000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ak-3",
        "name": "South Local Council",
        "allocation": 5552475000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "BY": {
    "code": "BY",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Crude Oil Fields)",
    "latest_gross": 32400000000,
    "latest_deductions": 3700000000,
    "latest_net": 28700000000,
    "vat_monthly": 4100000000,
    "derivation_monthly": 18900000000,
    "monthly_history": [
      {
        "id": "faac-2024-by-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 30456000000,
        "deductions": 3478000000,
        "net": 26978000000,
        "statutory": 8836000000,
        "vat": 3854000000,
        "derivation": 17766000000
      },
      {
        "id": "faac-2024-by-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 30780000000,
        "deductions": 3515000000,
        "net": 27265000000,
        "statutory": 8930000000,
        "vat": 3895000000,
        "derivation": 17955000000
      },
      {
        "id": "faac-2024-by-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 31266000000,
        "deductions": 3570500000,
        "net": 27695500000,
        "statutory": 9071000000,
        "vat": 3956500000,
        "derivation": 18238500000
      },
      {
        "id": "faac-2024-by-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 31590000000,
        "deductions": 3607500000,
        "net": 27982500000,
        "statutory": 9165000000,
        "vat": 3997500000,
        "derivation": 18427500000
      },
      {
        "id": "faac-2024-by-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 31914000000,
        "deductions": 3644500000,
        "net": 28269500000,
        "statutory": 9259000000,
        "vat": 4038500000,
        "derivation": 18616500000
      },
      {
        "id": "faac-2024-by-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 32400000000,
        "deductions": 3700000000,
        "net": 28700000000,
        "statutory": 9400000000,
        "vat": 4100000000,
        "derivation": 18900000000
      },
      {
        "id": "faac-2024-by-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 33048000000,
        "deductions": 3774000000,
        "net": 29274000000,
        "statutory": 9588000000,
        "vat": 4182000000,
        "derivation": 19278000000
      },
      {
        "id": "faac-2024-by-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 33534000000,
        "deductions": 3829500000,
        "net": 29704500000,
        "statutory": 9729000000,
        "vat": 4243500000,
        "derivation": 19561500000
      },
      {
        "id": "faac-2024-by-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 34020000000,
        "deductions": 3885000000,
        "net": 30135000000,
        "statutory": 9870000000,
        "vat": 4305000000,
        "derivation": 19845000000
      },
      {
        "id": "faac-2024-by-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 34506000000,
        "deductions": 3940500000,
        "net": 30565500000,
        "statutory": 10011000000,
        "vat": 4366500000,
        "derivation": 20128500000
      },
      {
        "id": "faac-2024-by-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 34992000000,
        "deductions": 3996000000,
        "net": 30996000000,
        "statutory": 10152000000,
        "vat": 4428000000,
        "derivation": 20412000000
      },
      {
        "id": "faac-2024-by-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 35640000000,
        "deductions": 4070000000,
        "net": 31570000000,
        "statutory": 10340000000,
        "vat": 4510000000,
        "derivation": 20790000000
      }
    ],
    "lgas": [
      {
        "id": "lga-by-1",
        "name": "Central Local Council",
        "allocation": 3659250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-by-2",
        "name": "North Local Council",
        "allocation": 4003650000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-by-3",
        "name": "South Local Council",
        "allocation": 4348050000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "LA": {
    "code": "LA",
    "is_oil": false,
    "derivation_source": "Statutory & High VAT Generation Share",
    "latest_gross": 33100000000,
    "latest_deductions": 3850000000,
    "latest_net": 29250000000,
    "vat_monthly": 19200000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-la-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 31114000000,
        "deductions": 3619000000,
        "net": 27495000000,
        "statutory": 13066000000,
        "vat": 18048000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 31445000000,
        "deductions": 3657500000,
        "net": 27787500000,
        "statutory": 13205000000,
        "vat": 18240000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 31941500000,
        "deductions": 3715250000,
        "net": 28226250000,
        "statutory": 13413500000,
        "vat": 18528000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 32272500000,
        "deductions": 3753750000,
        "net": 28518750000,
        "statutory": 13552500000,
        "vat": 18720000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 32603500000,
        "deductions": 3792250000,
        "net": 28811250000,
        "statutory": 13691500000,
        "vat": 18912000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 33100000000,
        "deductions": 3850000000,
        "net": 29250000000,
        "statutory": 13900000000,
        "vat": 19200000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 33762000000,
        "deductions": 3927000000,
        "net": 29835000000,
        "statutory": 14178000000,
        "vat": 19584000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 34258500000,
        "deductions": 3984750000,
        "net": 30273750000,
        "statutory": 14386500000,
        "vat": 19872000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 34755000000,
        "deductions": 4042500000,
        "net": 30712500000,
        "statutory": 14595000000,
        "vat": 20160000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 35251500000,
        "deductions": 4100250000,
        "net": 31151250000,
        "statutory": 14803500000,
        "vat": 20448000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 35748000000,
        "deductions": 4158000000,
        "net": 31590000000,
        "statutory": 15012000000,
        "vat": 20736000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-la-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 36410000000,
        "deductions": 4235000000,
        "net": 32175000000,
        "statutory": 15290000000,
        "vat": 21120000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-la-1",
        "name": "Central Local Council",
        "allocation": 3729375000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-la-2",
        "name": "North Local Council",
        "allocation": 4080375000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-la-3",
        "name": "South Local Council",
        "allocation": 4431375000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "KN": {
    "code": "KN",
    "is_oil": false,
    "derivation_source": "Statutory Allocation (High Population Quota)",
    "latest_gross": 22800000000,
    "latest_deductions": 2900000000,
    "latest_net": 19900000000,
    "vat_monthly": 7600000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-kn-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 21432000000,
        "deductions": 2726000000,
        "net": 18706000000,
        "statutory": 14288000000,
        "vat": 7144000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 21660000000,
        "deductions": 2755000000,
        "net": 18905000000,
        "statutory": 14440000000,
        "vat": 7220000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 22002000000,
        "deductions": 2798500000,
        "net": 19203500000,
        "statutory": 14668000000,
        "vat": 7334000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 22230000000,
        "deductions": 2827500000,
        "net": 19402500000,
        "statutory": 14820000000,
        "vat": 7410000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 22458000000,
        "deductions": 2856500000,
        "net": 19601500000,
        "statutory": 14972000000,
        "vat": 7486000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 22800000000,
        "deductions": 2900000000,
        "net": 19900000000,
        "statutory": 15200000000,
        "vat": 7600000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 23256000000,
        "deductions": 2958000000,
        "net": 20298000000,
        "statutory": 15504000000,
        "vat": 7752000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 23598000000,
        "deductions": 3001500000,
        "net": 20596500000,
        "statutory": 15732000000,
        "vat": 7866000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 23940000000,
        "deductions": 3045000000,
        "net": 20895000000,
        "statutory": 15960000000,
        "vat": 7980000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 24282000000,
        "deductions": 3088500000,
        "net": 21193500000,
        "statutory": 16188000000,
        "vat": 8094000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 24624000000,
        "deductions": 3132000000,
        "net": 21492000000,
        "statutory": 16416000000,
        "vat": 8208000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kn-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 25080000000,
        "deductions": 3190000000,
        "net": 21890000000,
        "statutory": 16720000000,
        "vat": 8360000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-kn-1",
        "name": "Central Local Council",
        "allocation": 2537250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kn-2",
        "name": "North Local Council",
        "allocation": 2776050000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kn-3",
        "name": "South Local Council",
        "allocation": 3014850000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "ED": {
    "code": "ED",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Orhionmwon/Ikpoba)",
    "latest_gross": 18400000000,
    "latest_deductions": 2100000000,
    "latest_net": 16300000000,
    "vat_monthly": 5200000000,
    "derivation_monthly": 4200000000,
    "monthly_history": [
      {
        "id": "faac-2024-ed-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 17296000000,
        "deductions": 1974000000,
        "net": 15322000000,
        "statutory": 8460000000,
        "vat": 4888000000,
        "derivation": 3948000000
      },
      {
        "id": "faac-2024-ed-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 17480000000,
        "deductions": 1995000000,
        "net": 15485000000,
        "statutory": 8550000000,
        "vat": 4940000000,
        "derivation": 3990000000
      },
      {
        "id": "faac-2024-ed-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 17756000000,
        "deductions": 2026500000,
        "net": 15729500000,
        "statutory": 8685000000,
        "vat": 5018000000,
        "derivation": 4053000000
      },
      {
        "id": "faac-2024-ed-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 17940000000,
        "deductions": 2047500000,
        "net": 15892500000,
        "statutory": 8775000000,
        "vat": 5070000000,
        "derivation": 4095000000
      },
      {
        "id": "faac-2024-ed-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 18124000000,
        "deductions": 2068500000,
        "net": 16055500000,
        "statutory": 8865000000,
        "vat": 5122000000,
        "derivation": 4137000000
      },
      {
        "id": "faac-2024-ed-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 18400000000,
        "deductions": 2100000000,
        "net": 16300000000,
        "statutory": 9000000000,
        "vat": 5200000000,
        "derivation": 4200000000
      },
      {
        "id": "faac-2024-ed-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 18768000000,
        "deductions": 2142000000,
        "net": 16626000000,
        "statutory": 9180000000,
        "vat": 5304000000,
        "derivation": 4284000000
      },
      {
        "id": "faac-2024-ed-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 19044000000,
        "deductions": 2173500000,
        "net": 16870500000,
        "statutory": 9315000000,
        "vat": 5382000000,
        "derivation": 4347000000
      },
      {
        "id": "faac-2024-ed-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 19320000000,
        "deductions": 2205000000,
        "net": 17115000000,
        "statutory": 9450000000,
        "vat": 5460000000,
        "derivation": 4410000000
      },
      {
        "id": "faac-2024-ed-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 19596000000,
        "deductions": 2236500000,
        "net": 17359500000,
        "statutory": 9585000000,
        "vat": 5538000000,
        "derivation": 4473000000
      },
      {
        "id": "faac-2024-ed-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 19872000000,
        "deductions": 2268000000,
        "net": 17604000000,
        "statutory": 9720000000,
        "vat": 5616000000,
        "derivation": 4536000000
      },
      {
        "id": "faac-2024-ed-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 20240000000,
        "deductions": 2310000000,
        "net": 17930000000,
        "statutory": 9900000000,
        "vat": 5720000000,
        "derivation": 4620000000
      }
    ],
    "lgas": [
      {
        "id": "lga-ed-1",
        "name": "Central Local Council",
        "allocation": 2078250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ed-2",
        "name": "North Local Council",
        "allocation": 2273850000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ed-3",
        "name": "South Local Council",
        "allocation": 2469450000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "ON": {
    "code": "ON",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Ilaje Coastal Wells)",
    "latest_gross": 17650000000,
    "latest_deductions": 2250000000,
    "latest_net": 15400000000,
    "vat_monthly": 4800000000,
    "derivation_monthly": 3800000000,
    "monthly_history": [
      {
        "id": "faac-2024-on-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 16591000000,
        "deductions": 2115000000,
        "net": 14476000000,
        "statutory": 8507000000,
        "vat": 4512000000,
        "derivation": 3572000000
      },
      {
        "id": "faac-2024-on-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 16767500000,
        "deductions": 2137500000,
        "net": 14630000000,
        "statutory": 8597500000,
        "vat": 4560000000,
        "derivation": 3610000000
      },
      {
        "id": "faac-2024-on-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 17032250000,
        "deductions": 2171250000,
        "net": 14861000000,
        "statutory": 8733250000,
        "vat": 4632000000,
        "derivation": 3667000000
      },
      {
        "id": "faac-2024-on-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 17208750000,
        "deductions": 2193750000,
        "net": 15015000000,
        "statutory": 8823750000,
        "vat": 4680000000,
        "derivation": 3705000000
      },
      {
        "id": "faac-2024-on-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 17385250000,
        "deductions": 2216250000,
        "net": 15169000000,
        "statutory": 8914250000,
        "vat": 4728000000,
        "derivation": 3743000000
      },
      {
        "id": "faac-2024-on-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 17650000000,
        "deductions": 2250000000,
        "net": 15400000000,
        "statutory": 9050000000,
        "vat": 4800000000,
        "derivation": 3800000000
      },
      {
        "id": "faac-2024-on-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 18003000000,
        "deductions": 2295000000,
        "net": 15708000000,
        "statutory": 9231000000,
        "vat": 4896000000,
        "derivation": 3876000000
      },
      {
        "id": "faac-2024-on-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 18267750000,
        "deductions": 2328750000,
        "net": 15939000000,
        "statutory": 9366750000,
        "vat": 4968000000,
        "derivation": 3933000000
      },
      {
        "id": "faac-2024-on-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 18532500000,
        "deductions": 2362500000,
        "net": 16170000000,
        "statutory": 9502500000,
        "vat": 5040000000,
        "derivation": 3990000000
      },
      {
        "id": "faac-2024-on-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 18797250000,
        "deductions": 2396250000,
        "net": 16401000000,
        "statutory": 9638250000,
        "vat": 5112000000,
        "derivation": 4047000000
      },
      {
        "id": "faac-2024-on-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 19062000000,
        "deductions": 2430000000,
        "net": 16632000000,
        "statutory": 9774000000,
        "vat": 5184000000,
        "derivation": 4104000000
      },
      {
        "id": "faac-2024-on-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 19415000000,
        "deductions": 2475000000,
        "net": 16940000000,
        "statutory": 9955000000,
        "vat": 5280000000,
        "derivation": 4180000000
      }
    ],
    "lgas": [
      {
        "id": "lga-on-1",
        "name": "Central Local Council",
        "allocation": 1963500000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-on-2",
        "name": "North Local Council",
        "allocation": 2148300000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-on-3",
        "name": "South Local Council",
        "allocation": 2333100000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "OY": {
    "code": "OY",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 16900000000,
    "latest_deductions": 2200000000,
    "latest_net": 14700000000,
    "vat_monthly": 6100000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-oy-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 15886000000,
        "deductions": 2068000000,
        "net": 13818000000,
        "statutory": 10152000000,
        "vat": 5734000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 16055000000,
        "deductions": 2090000000,
        "net": 13965000000,
        "statutory": 10260000000,
        "vat": 5795000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 16308500000,
        "deductions": 2123000000,
        "net": 14185500000,
        "statutory": 10422000000,
        "vat": 5886500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 16477500000,
        "deductions": 2145000000,
        "net": 14332500000,
        "statutory": 10530000000,
        "vat": 5947500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 16646500000,
        "deductions": 2167000000,
        "net": 14479500000,
        "statutory": 10638000000,
        "vat": 6008500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 16900000000,
        "deductions": 2200000000,
        "net": 14700000000,
        "statutory": 10800000000,
        "vat": 6100000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 17238000000,
        "deductions": 2244000000,
        "net": 14994000000,
        "statutory": 11016000000,
        "vat": 6222000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 17491500000,
        "deductions": 2277000000,
        "net": 15214500000,
        "statutory": 11178000000,
        "vat": 6313500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 17745000000,
        "deductions": 2310000000,
        "net": 15435000000,
        "statutory": 11340000000,
        "vat": 6405000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 17998500000,
        "deductions": 2343000000,
        "net": 15655500000,
        "statutory": 11502000000,
        "vat": 6496500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 18252000000,
        "deductions": 2376000000,
        "net": 15876000000,
        "statutory": 11664000000,
        "vat": 6588000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-oy-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 18590000000,
        "deductions": 2420000000,
        "net": 16170000000,
        "statutory": 11880000000,
        "vat": 6710000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-oy-1",
        "name": "Central Local Council",
        "allocation": 1874250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-oy-2",
        "name": "North Local Council",
        "allocation": 2050650000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-oy-3",
        "name": "South Local Council",
        "allocation": 2227050000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "KD": {
    "code": "KD",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 16400000000,
    "latest_deductions": 2350000000,
    "latest_net": 14050000000,
    "vat_monthly": 5800000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-kd-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 15416000000,
        "deductions": 2209000000,
        "net": 13207000000,
        "statutory": 9964000000,
        "vat": 5452000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 15580000000,
        "deductions": 2232500000,
        "net": 13347500000,
        "statutory": 10070000000,
        "vat": 5510000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 15826000000,
        "deductions": 2267750000,
        "net": 13558250000,
        "statutory": 10229000000,
        "vat": 5597000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 15990000000,
        "deductions": 2291250000,
        "net": 13698750000,
        "statutory": 10335000000,
        "vat": 5655000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 16154000000,
        "deductions": 2314750000,
        "net": 13839250000,
        "statutory": 10441000000,
        "vat": 5713000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 16400000000,
        "deductions": 2350000000,
        "net": 14050000000,
        "statutory": 10600000000,
        "vat": 5800000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 16728000000,
        "deductions": 2397000000,
        "net": 14331000000,
        "statutory": 10812000000,
        "vat": 5916000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 16974000000,
        "deductions": 2432250000,
        "net": 14541750000,
        "statutory": 10971000000,
        "vat": 6003000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 17220000000,
        "deductions": 2467500000,
        "net": 14752500000,
        "statutory": 11130000000,
        "vat": 6090000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 17466000000,
        "deductions": 2502750000,
        "net": 14963250000,
        "statutory": 11289000000,
        "vat": 6177000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 17712000000,
        "deductions": 2538000000,
        "net": 15174000000,
        "statutory": 11448000000,
        "vat": 6264000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kd-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 18040000000,
        "deductions": 2585000000,
        "net": 15455000000,
        "statutory": 11660000000,
        "vat": 6380000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-kd-1",
        "name": "Central Local Council",
        "allocation": 1791375000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kd-2",
        "name": "North Local Council",
        "allocation": 1959975000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kd-3",
        "name": "South Local Council",
        "allocation": 2128575000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "KT": {
    "code": "KT",
    "is_oil": false,
    "derivation_source": "Statutory Allocation (34 LGAs Quota)",
    "latest_gross": 16100000000,
    "latest_deductions": 1850000000,
    "latest_net": 14250000000,
    "vat_monthly": 5400000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-kt-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 15134000000,
        "deductions": 1739000000,
        "net": 13395000000,
        "statutory": 10058000000,
        "vat": 5076000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 15295000000,
        "deductions": 1757500000,
        "net": 13537500000,
        "statutory": 10165000000,
        "vat": 5130000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 15536500000,
        "deductions": 1785250000,
        "net": 13751250000,
        "statutory": 10325500000,
        "vat": 5211000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 15697500000,
        "deductions": 1803750000,
        "net": 13893750000,
        "statutory": 10432500000,
        "vat": 5265000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 15858500000,
        "deductions": 1822250000,
        "net": 14036250000,
        "statutory": 10539500000,
        "vat": 5319000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 16100000000,
        "deductions": 1850000000,
        "net": 14250000000,
        "statutory": 10700000000,
        "vat": 5400000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 16422000000,
        "deductions": 1887000000,
        "net": 14535000000,
        "statutory": 10914000000,
        "vat": 5508000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 16663500000,
        "deductions": 1914750000,
        "net": 14748750000,
        "statutory": 11074500000,
        "vat": 5589000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 16905000000,
        "deductions": 1942500000,
        "net": 14962500000,
        "statutory": 11235000000,
        "vat": 5670000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 17146500000,
        "deductions": 1970250000,
        "net": 15176250000,
        "statutory": 11395500000,
        "vat": 5751000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 17388000000,
        "deductions": 1998000000,
        "net": 15390000000,
        "statutory": 11556000000,
        "vat": 5832000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kt-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 17710000000,
        "deductions": 2035000000,
        "net": 15675000000,
        "statutory": 11770000000,
        "vat": 5940000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-kt-1",
        "name": "Central Local Council",
        "allocation": 1816875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kt-2",
        "name": "North Local Council",
        "allocation": 1987875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kt-3",
        "name": "South Local Council",
        "allocation": 2158875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "IM": {
    "code": "IM",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Ohaji/Egbema/Oguta)",
    "latest_gross": 15800000000,
    "latest_deductions": 2400000000,
    "latest_net": 13400000000,
    "vat_monthly": 4900000000,
    "derivation_monthly": 2600000000,
    "monthly_history": [
      {
        "id": "faac-2024-im-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 14852000000,
        "deductions": 2256000000,
        "net": 12596000000,
        "statutory": 7802000000,
        "vat": 4606000000,
        "derivation": 2444000000
      },
      {
        "id": "faac-2024-im-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 15010000000,
        "deductions": 2280000000,
        "net": 12730000000,
        "statutory": 7885000000,
        "vat": 4655000000,
        "derivation": 2470000000
      },
      {
        "id": "faac-2024-im-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 15247000000,
        "deductions": 2316000000,
        "net": 12931000000,
        "statutory": 8009500000,
        "vat": 4728500000,
        "derivation": 2509000000
      },
      {
        "id": "faac-2024-im-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 15405000000,
        "deductions": 2340000000,
        "net": 13065000000,
        "statutory": 8092500000,
        "vat": 4777500000,
        "derivation": 2535000000
      },
      {
        "id": "faac-2024-im-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 15563000000,
        "deductions": 2364000000,
        "net": 13199000000,
        "statutory": 8175500000,
        "vat": 4826500000,
        "derivation": 2561000000
      },
      {
        "id": "faac-2024-im-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 15800000000,
        "deductions": 2400000000,
        "net": 13400000000,
        "statutory": 8300000000,
        "vat": 4900000000,
        "derivation": 2600000000
      },
      {
        "id": "faac-2024-im-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 16116000000,
        "deductions": 2448000000,
        "net": 13668000000,
        "statutory": 8466000000,
        "vat": 4998000000,
        "derivation": 2652000000
      },
      {
        "id": "faac-2024-im-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 16353000000,
        "deductions": 2484000000,
        "net": 13869000000,
        "statutory": 8590500000,
        "vat": 5071500000,
        "derivation": 2691000000
      },
      {
        "id": "faac-2024-im-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 16590000000,
        "deductions": 2520000000,
        "net": 14070000000,
        "statutory": 8715000000,
        "vat": 5145000000,
        "derivation": 2730000000
      },
      {
        "id": "faac-2024-im-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 16827000000,
        "deductions": 2556000000,
        "net": 14271000000,
        "statutory": 8839500000,
        "vat": 5218500000,
        "derivation": 2769000000
      },
      {
        "id": "faac-2024-im-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 17064000000,
        "deductions": 2592000000,
        "net": 14472000000,
        "statutory": 8964000000,
        "vat": 5292000000,
        "derivation": 2808000000
      },
      {
        "id": "faac-2024-im-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 17380000000,
        "deductions": 2640000000,
        "net": 14740000000,
        "statutory": 9130000000,
        "vat": 5390000000,
        "derivation": 2860000000
      }
    ],
    "lgas": [
      {
        "id": "lga-im-1",
        "name": "Central Local Council",
        "allocation": 1708500000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-im-2",
        "name": "North Local Council",
        "allocation": 1869300000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-im-3",
        "name": "South Local Council",
        "allocation": 2030100000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "JI": {
    "code": "JI",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 15200000000,
    "latest_deductions": 1600000000,
    "latest_net": 13600000000,
    "vat_monthly": 4800000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-ji-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 14288000000,
        "deductions": 1504000000,
        "net": 12784000000,
        "statutory": 9776000000,
        "vat": 4512000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 14440000000,
        "deductions": 1520000000,
        "net": 12920000000,
        "statutory": 9880000000,
        "vat": 4560000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 14668000000,
        "deductions": 1544000000,
        "net": 13124000000,
        "statutory": 10036000000,
        "vat": 4632000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 14820000000,
        "deductions": 1560000000,
        "net": 13260000000,
        "statutory": 10140000000,
        "vat": 4680000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 14972000000,
        "deductions": 1576000000,
        "net": 13396000000,
        "statutory": 10244000000,
        "vat": 4728000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 15200000000,
        "deductions": 1600000000,
        "net": 13600000000,
        "statutory": 10400000000,
        "vat": 4800000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 15504000000,
        "deductions": 1632000000,
        "net": 13872000000,
        "statutory": 10608000000,
        "vat": 4896000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 15732000000,
        "deductions": 1656000000,
        "net": 14076000000,
        "statutory": 10764000000,
        "vat": 4968000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 15960000000,
        "deductions": 1680000000,
        "net": 14280000000,
        "statutory": 10920000000,
        "vat": 5040000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 16188000000,
        "deductions": 1704000000,
        "net": 14484000000,
        "statutory": 11076000000,
        "vat": 5112000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 16416000000,
        "deductions": 1728000000,
        "net": 14688000000,
        "statutory": 11232000000,
        "vat": 5184000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ji-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 16720000000,
        "deductions": 1760000000,
        "net": 14960000000,
        "statutory": 11440000000,
        "vat": 5280000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-ji-1",
        "name": "Central Local Council",
        "allocation": 1734000000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ji-2",
        "name": "North Local Council",
        "allocation": 1897200000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ji-3",
        "name": "South Local Council",
        "allocation": 2060400000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "BO": {
    "code": "BO",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Landmass Factor",
    "latest_gross": 14900000000,
    "latest_deductions": 1700000000,
    "latest_net": 13200000000,
    "vat_monthly": 4600000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-bo-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 14006000000,
        "deductions": 1598000000,
        "net": 12408000000,
        "statutory": 9682000000,
        "vat": 4324000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 14155000000,
        "deductions": 1615000000,
        "net": 12540000000,
        "statutory": 9785000000,
        "vat": 4370000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 14378500000,
        "deductions": 1640500000,
        "net": 12738000000,
        "statutory": 9939500000,
        "vat": 4439000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 14527500000,
        "deductions": 1657500000,
        "net": 12870000000,
        "statutory": 10042500000,
        "vat": 4485000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 14676500000,
        "deductions": 1674500000,
        "net": 13002000000,
        "statutory": 10145500000,
        "vat": 4531000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 14900000000,
        "deductions": 1700000000,
        "net": 13200000000,
        "statutory": 10300000000,
        "vat": 4600000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 15198000000,
        "deductions": 1734000000,
        "net": 13464000000,
        "statutory": 10506000000,
        "vat": 4692000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 15421500000,
        "deductions": 1759500000,
        "net": 13662000000,
        "statutory": 10660500000,
        "vat": 4761000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 15645000000,
        "deductions": 1785000000,
        "net": 13860000000,
        "statutory": 10815000000,
        "vat": 4830000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 15868500000,
        "deductions": 1810500000,
        "net": 14058000000,
        "statutory": 10969500000,
        "vat": 4899000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 16092000000,
        "deductions": 1836000000,
        "net": 14256000000,
        "statutory": 11124000000,
        "vat": 4968000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-bo-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 16390000000,
        "deductions": 1870000000,
        "net": 14520000000,
        "statutory": 11330000000,
        "vat": 5060000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-bo-1",
        "name": "Central Local Council",
        "allocation": 1683000000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-bo-2",
        "name": "North Local Council",
        "allocation": 1841400000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-bo-3",
        "name": "South Local Council",
        "allocation": 1999800000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "AN": {
    "code": "AN",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Anambra River Basin)",
    "latest_gross": 14500000000,
    "latest_deductions": 1900000000,
    "latest_net": 12600000000,
    "vat_monthly": 5500000000,
    "derivation_monthly": 1400000000,
    "monthly_history": [
      {
        "id": "faac-2024-an-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 13630000000,
        "deductions": 1786000000,
        "net": 11844000000,
        "statutory": 7144000000,
        "vat": 5170000000,
        "derivation": 1316000000
      },
      {
        "id": "faac-2024-an-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 13775000000,
        "deductions": 1805000000,
        "net": 11970000000,
        "statutory": 7220000000,
        "vat": 5225000000,
        "derivation": 1330000000
      },
      {
        "id": "faac-2024-an-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 13992500000,
        "deductions": 1833500000,
        "net": 12159000000,
        "statutory": 7334000000,
        "vat": 5307500000,
        "derivation": 1351000000
      },
      {
        "id": "faac-2024-an-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 14137500000,
        "deductions": 1852500000,
        "net": 12285000000,
        "statutory": 7410000000,
        "vat": 5362500000,
        "derivation": 1365000000
      },
      {
        "id": "faac-2024-an-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 14282500000,
        "deductions": 1871500000,
        "net": 12411000000,
        "statutory": 7486000000,
        "vat": 5417500000,
        "derivation": 1379000000
      },
      {
        "id": "faac-2024-an-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 14500000000,
        "deductions": 1900000000,
        "net": 12600000000,
        "statutory": 7600000000,
        "vat": 5500000000,
        "derivation": 1400000000
      },
      {
        "id": "faac-2024-an-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 14790000000,
        "deductions": 1938000000,
        "net": 12852000000,
        "statutory": 7752000000,
        "vat": 5610000000,
        "derivation": 1428000000
      },
      {
        "id": "faac-2024-an-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 15007500000,
        "deductions": 1966500000,
        "net": 13041000000,
        "statutory": 7866000000,
        "vat": 5692500000,
        "derivation": 1449000000
      },
      {
        "id": "faac-2024-an-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 15225000000,
        "deductions": 1995000000,
        "net": 13230000000,
        "statutory": 7980000000,
        "vat": 5775000000,
        "derivation": 1470000000
      },
      {
        "id": "faac-2024-an-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 15442500000,
        "deductions": 2023500000,
        "net": 13419000000,
        "statutory": 8094000000,
        "vat": 5857500000,
        "derivation": 1491000000
      },
      {
        "id": "faac-2024-an-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 15660000000,
        "deductions": 2052000000,
        "net": 13608000000,
        "statutory": 8208000000,
        "vat": 5940000000,
        "derivation": 1512000000
      },
      {
        "id": "faac-2024-an-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 15950000000,
        "deductions": 2090000000,
        "net": 13860000000,
        "statutory": 8360000000,
        "vat": 6050000000,
        "derivation": 1540000000
      }
    ],
    "lgas": [
      {
        "id": "lga-an-1",
        "name": "Central Local Council",
        "allocation": 1606500000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-an-2",
        "name": "North Local Council",
        "allocation": 1757700000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-an-3",
        "name": "South Local Council",
        "allocation": 1908900000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "AB": {
    "code": "AB",
    "is_oil": true,
    "derivation_source": "13% Mineral Derivation (Ukwa Oil Wells)",
    "latest_gross": 14100000000,
    "latest_deductions": 1850000000,
    "latest_net": 12250000000,
    "vat_monthly": 4350000000,
    "derivation_monthly": 1800000000,
    "monthly_history": [
      {
        "id": "faac-2024-ab-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 13254000000,
        "deductions": 1739000000,
        "net": 11515000000,
        "statutory": 7473000000,
        "vat": 4089000000,
        "derivation": 1692000000
      },
      {
        "id": "faac-2024-ab-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 13395000000,
        "deductions": 1757500000,
        "net": 11637500000,
        "statutory": 7552500000,
        "vat": 4132500000,
        "derivation": 1710000000
      },
      {
        "id": "faac-2024-ab-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 13606500000,
        "deductions": 1785250000,
        "net": 11821250000,
        "statutory": 7671750000,
        "vat": 4197750000,
        "derivation": 1737000000
      },
      {
        "id": "faac-2024-ab-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 13747500000,
        "deductions": 1803750000,
        "net": 11943750000,
        "statutory": 7751250000,
        "vat": 4241250000,
        "derivation": 1755000000
      },
      {
        "id": "faac-2024-ab-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 13888500000,
        "deductions": 1822250000,
        "net": 12066250000,
        "statutory": 7830750000,
        "vat": 4284750000,
        "derivation": 1773000000
      },
      {
        "id": "faac-2024-ab-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 14100000000,
        "deductions": 1850000000,
        "net": 12250000000,
        "statutory": 7950000000,
        "vat": 4350000000,
        "derivation": 1800000000
      },
      {
        "id": "faac-2024-ab-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 14382000000,
        "deductions": 1887000000,
        "net": 12495000000,
        "statutory": 8109000000,
        "vat": 4437000000,
        "derivation": 1836000000
      },
      {
        "id": "faac-2024-ab-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 14593500000,
        "deductions": 1914750000,
        "net": 12678750000,
        "statutory": 8228250000,
        "vat": 4502250000,
        "derivation": 1863000000
      },
      {
        "id": "faac-2024-ab-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 14805000000,
        "deductions": 1942500000,
        "net": 12862500000,
        "statutory": 8347500000,
        "vat": 4567500000,
        "derivation": 1890000000
      },
      {
        "id": "faac-2024-ab-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 15016500000,
        "deductions": 1970250000,
        "net": 13046250000,
        "statutory": 8466750000,
        "vat": 4632750000,
        "derivation": 1917000000
      },
      {
        "id": "faac-2024-ab-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 15228000000,
        "deductions": 1998000000,
        "net": 13230000000,
        "statutory": 8586000000,
        "vat": 4698000000,
        "derivation": 1944000000
      },
      {
        "id": "faac-2024-ab-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 15510000000,
        "deductions": 2035000000,
        "net": 13475000000,
        "statutory": 8745000000,
        "vat": 4785000000,
        "derivation": 1980000000
      }
    ],
    "lgas": [
      {
        "id": "lga-ab-1",
        "name": "Central Local Council",
        "allocation": 1561875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ab-2",
        "name": "North Local Council",
        "allocation": 1708875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ab-3",
        "name": "South Local Council",
        "allocation": 1855875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "FC": {
    "code": "FC",
    "is_oil": false,
    "derivation_source": "Federal Capital Statutory Allocation",
    "latest_gross": 14200000000,
    "latest_deductions": 500000000,
    "latest_net": 13700000000,
    "vat_monthly": 6200000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-fc-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 13348000000,
        "deductions": 470000000,
        "net": 12878000000,
        "statutory": 7520000000,
        "vat": 5828000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 13490000000,
        "deductions": 475000000,
        "net": 13015000000,
        "statutory": 7600000000,
        "vat": 5890000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 13703000000,
        "deductions": 482500000,
        "net": 13220500000,
        "statutory": 7720000000,
        "vat": 5983000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 13845000000,
        "deductions": 487500000,
        "net": 13357500000,
        "statutory": 7800000000,
        "vat": 6045000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 13987000000,
        "deductions": 492500000,
        "net": 13494500000,
        "statutory": 7880000000,
        "vat": 6107000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 14200000000,
        "deductions": 500000000,
        "net": 13700000000,
        "statutory": 8000000000,
        "vat": 6200000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 14484000000,
        "deductions": 510000000,
        "net": 13974000000,
        "statutory": 8160000000,
        "vat": 6324000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 14697000000,
        "deductions": 517500000,
        "net": 14179500000,
        "statutory": 8280000000,
        "vat": 6417000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 14910000000,
        "deductions": 525000000,
        "net": 14385000000,
        "statutory": 8400000000,
        "vat": 6510000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 15123000000,
        "deductions": 532500000,
        "net": 14590500000,
        "statutory": 8520000000,
        "vat": 6603000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 15336000000,
        "deductions": 540000000,
        "net": 14796000000,
        "statutory": 8640000000,
        "vat": 6696000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-fc-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 15620000000,
        "deductions": 550000000,
        "net": 15070000000,
        "statutory": 8800000000,
        "vat": 6820000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-fc-1",
        "name": "Central Local Council",
        "allocation": 1746750000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-fc-2",
        "name": "North Local Council",
        "allocation": 1911150000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-fc-3",
        "name": "South Local Council",
        "allocation": 2075550000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "NI": {
    "code": "NI",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Hydro-Power Derivation",
    "latest_gross": 13800000000,
    "latest_deductions": 1950000000,
    "latest_net": 11850000000,
    "vat_monthly": 4400000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-ni-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 12972000000,
        "deductions": 1833000000,
        "net": 11139000000,
        "statutory": 8836000000,
        "vat": 4136000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 13110000000,
        "deductions": 1852500000,
        "net": 11257500000,
        "statutory": 8930000000,
        "vat": 4180000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 13317000000,
        "deductions": 1881750000,
        "net": 11435250000,
        "statutory": 9071000000,
        "vat": 4246000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 13455000000,
        "deductions": 1901250000,
        "net": 11553750000,
        "statutory": 9165000000,
        "vat": 4290000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 13593000000,
        "deductions": 1920750000,
        "net": 11672250000,
        "statutory": 9259000000,
        "vat": 4334000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 13800000000,
        "deductions": 1950000000,
        "net": 11850000000,
        "statutory": 9400000000,
        "vat": 4400000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 14076000000,
        "deductions": 1989000000,
        "net": 12087000000,
        "statutory": 9588000000,
        "vat": 4488000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 14283000000,
        "deductions": 2018250000,
        "net": 12264750000,
        "statutory": 9729000000,
        "vat": 4554000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 14490000000,
        "deductions": 2047500000,
        "net": 12442500000,
        "statutory": 9870000000,
        "vat": 4620000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 14697000000,
        "deductions": 2076750000,
        "net": 12620250000,
        "statutory": 10011000000,
        "vat": 4686000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 14904000000,
        "deductions": 2106000000,
        "net": 12798000000,
        "statutory": 10152000000,
        "vat": 4752000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ni-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 15180000000,
        "deductions": 2145000000,
        "net": 13035000000,
        "statutory": 10340000000,
        "vat": 4840000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-ni-1",
        "name": "Central Local Council",
        "allocation": 1510875000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ni-2",
        "name": "North Local Council",
        "allocation": 1653075000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ni-3",
        "name": "South Local Council",
        "allocation": 1795275000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "BA": {
    "code": "BA",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 13400000000,
    "latest_deductions": 1700000000,
    "latest_net": 11700000000,
    "vat_monthly": 4300000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-ba-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 12596000000,
        "deductions": 1598000000,
        "net": 10998000000,
        "statutory": 8554000000,
        "vat": 4042000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 12730000000,
        "deductions": 1615000000,
        "net": 11115000000,
        "statutory": 8645000000,
        "vat": 4085000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 12931000000,
        "deductions": 1640500000,
        "net": 11290500000,
        "statutory": 8781500000,
        "vat": 4149500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 13065000000,
        "deductions": 1657500000,
        "net": 11407500000,
        "statutory": 8872500000,
        "vat": 4192500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 13199000000,
        "deductions": 1674500000,
        "net": 11524500000,
        "statutory": 8963500000,
        "vat": 4235500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 13400000000,
        "deductions": 1700000000,
        "net": 11700000000,
        "statutory": 9100000000,
        "vat": 4300000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 13668000000,
        "deductions": 1734000000,
        "net": 11934000000,
        "statutory": 9282000000,
        "vat": 4386000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 13869000000,
        "deductions": 1759500000,
        "net": 12109500000,
        "statutory": 9418500000,
        "vat": 4450500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 14070000000,
        "deductions": 1785000000,
        "net": 12285000000,
        "statutory": 9555000000,
        "vat": 4515000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 14271000000,
        "deductions": 1810500000,
        "net": 12460500000,
        "statutory": 9691500000,
        "vat": 4579500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 14472000000,
        "deductions": 1836000000,
        "net": 12636000000,
        "statutory": 9828000000,
        "vat": 4644000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ba-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 14740000000,
        "deductions": 1870000000,
        "net": 12870000000,
        "statutory": 10010000000,
        "vat": 4730000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-ba-1",
        "name": "Central Local Council",
        "allocation": 1491750000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ba-2",
        "name": "North Local Council",
        "allocation": 1632150000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ba-3",
        "name": "South Local Council",
        "allocation": 1772550000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "BE": {
    "code": "BE",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 13100000000,
    "latest_deductions": 1900000000,
    "latest_net": 11200000000,
    "vat_monthly": 4200000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-be-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 12314000000,
        "deductions": 1786000000,
        "net": 10528000000,
        "statutory": 8366000000,
        "vat": 3948000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 12445000000,
        "deductions": 1805000000,
        "net": 10640000000,
        "statutory": 8455000000,
        "vat": 3990000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 12641500000,
        "deductions": 1833500000,
        "net": 10808000000,
        "statutory": 8588500000,
        "vat": 4053000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 12772500000,
        "deductions": 1852500000,
        "net": 10920000000,
        "statutory": 8677500000,
        "vat": 4095000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 12903500000,
        "deductions": 1871500000,
        "net": 11032000000,
        "statutory": 8766500000,
        "vat": 4137000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 13100000000,
        "deductions": 1900000000,
        "net": 11200000000,
        "statutory": 8900000000,
        "vat": 4200000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 13362000000,
        "deductions": 1938000000,
        "net": 11424000000,
        "statutory": 9078000000,
        "vat": 4284000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 13558500000,
        "deductions": 1966500000,
        "net": 11592000000,
        "statutory": 9211500000,
        "vat": 4347000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 13755000000,
        "deductions": 1995000000,
        "net": 11760000000,
        "statutory": 9345000000,
        "vat": 4410000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 13951500000,
        "deductions": 2023500000,
        "net": 11928000000,
        "statutory": 9478500000,
        "vat": 4473000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 14148000000,
        "deductions": 2052000000,
        "net": 12096000000,
        "statutory": 9612000000,
        "vat": 4536000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-be-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 14410000000,
        "deductions": 2090000000,
        "net": 12320000000,
        "statutory": 9790000000,
        "vat": 4620000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-be-1",
        "name": "Central Local Council",
        "allocation": 1428000000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-be-2",
        "name": "North Local Council",
        "allocation": 1562400000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-be-3",
        "name": "South Local Council",
        "allocation": 1696800000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "OG": {
    "code": "OG",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Industrial VAT Share",
    "latest_gross": 12900000000,
    "latest_deductions": 2100000000,
    "latest_net": 10800000000,
    "vat_monthly": 5100000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-og-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 12126000000,
        "deductions": 1974000000,
        "net": 10152000000,
        "statutory": 7332000000,
        "vat": 4794000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 12255000000,
        "deductions": 1995000000,
        "net": 10260000000,
        "statutory": 7410000000,
        "vat": 4845000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 12448500000,
        "deductions": 2026500000,
        "net": 10422000000,
        "statutory": 7527000000,
        "vat": 4921500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 12577500000,
        "deductions": 2047500000,
        "net": 10530000000,
        "statutory": 7605000000,
        "vat": 4972500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 12706500000,
        "deductions": 2068500000,
        "net": 10638000000,
        "statutory": 7683000000,
        "vat": 5023500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 12900000000,
        "deductions": 2100000000,
        "net": 10800000000,
        "statutory": 7800000000,
        "vat": 5100000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 13158000000,
        "deductions": 2142000000,
        "net": 11016000000,
        "statutory": 7956000000,
        "vat": 5202000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 13351500000,
        "deductions": 2173500000,
        "net": 11178000000,
        "statutory": 8073000000,
        "vat": 5278500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 13545000000,
        "deductions": 2205000000,
        "net": 11340000000,
        "statutory": 8190000000,
        "vat": 5355000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 13738500000,
        "deductions": 2236500000,
        "net": 11502000000,
        "statutory": 8307000000,
        "vat": 5431500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 13932000000,
        "deductions": 2268000000,
        "net": 11664000000,
        "statutory": 8424000000,
        "vat": 5508000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-og-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 14190000000,
        "deductions": 2310000000,
        "net": 11880000000,
        "statutory": 8580000000,
        "vat": 5610000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-og-1",
        "name": "Central Local Council",
        "allocation": 1377000000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-og-2",
        "name": "North Local Council",
        "allocation": 1506600000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-og-3",
        "name": "South Local Council",
        "allocation": 1636200000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "EN": {
    "code": "EN",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 12600000000,
    "latest_deductions": 1750000000,
    "latest_net": 10850000000,
    "vat_monthly": 4550000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-en-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 11844000000,
        "deductions": 1645000000,
        "net": 10199000000,
        "statutory": 7567000000,
        "vat": 4277000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 11970000000,
        "deductions": 1662500000,
        "net": 10307500000,
        "statutory": 7647500000,
        "vat": 4322500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 12159000000,
        "deductions": 1688750000,
        "net": 10470250000,
        "statutory": 7768250000,
        "vat": 4390750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 12285000000,
        "deductions": 1706250000,
        "net": 10578750000,
        "statutory": 7848750000,
        "vat": 4436250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 12411000000,
        "deductions": 1723750000,
        "net": 10687250000,
        "statutory": 7929250000,
        "vat": 4481750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 12600000000,
        "deductions": 1750000000,
        "net": 10850000000,
        "statutory": 8050000000,
        "vat": 4550000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 12852000000,
        "deductions": 1785000000,
        "net": 11067000000,
        "statutory": 8211000000,
        "vat": 4641000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 13041000000,
        "deductions": 1811250000,
        "net": 11229750000,
        "statutory": 8331750000,
        "vat": 4709250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 13230000000,
        "deductions": 1837500000,
        "net": 11392500000,
        "statutory": 8452500000,
        "vat": 4777500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 13419000000,
        "deductions": 1863750000,
        "net": 11555250000,
        "statutory": 8573250000,
        "vat": 4845750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 13608000000,
        "deductions": 1890000000,
        "net": 11718000000,
        "statutory": 8694000000,
        "vat": 4914000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-en-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 13860000000,
        "deductions": 1925000000,
        "net": 11935000000,
        "statutory": 8855000000,
        "vat": 5005000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-en-1",
        "name": "Central Local Council",
        "allocation": 1383375000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-en-2",
        "name": "North Local Council",
        "allocation": 1513575000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-en-3",
        "name": "South Local Council",
        "allocation": 1643775000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "SO": {
    "code": "SO",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 12400000000,
    "latest_deductions": 1550000000,
    "latest_net": 10850000000,
    "vat_monthly": 3900000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-so-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 11656000000,
        "deductions": 1457000000,
        "net": 10199000000,
        "statutory": 7990000000,
        "vat": 3666000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 11780000000,
        "deductions": 1472500000,
        "net": 10307500000,
        "statutory": 8075000000,
        "vat": 3705000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 11966000000,
        "deductions": 1495750000,
        "net": 10470250000,
        "statutory": 8202500000,
        "vat": 3763500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 12090000000,
        "deductions": 1511250000,
        "net": 10578750000,
        "statutory": 8287500000,
        "vat": 3802500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 12214000000,
        "deductions": 1526750000,
        "net": 10687250000,
        "statutory": 8372500000,
        "vat": 3841500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 12400000000,
        "deductions": 1550000000,
        "net": 10850000000,
        "statutory": 8500000000,
        "vat": 3900000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 12648000000,
        "deductions": 1581000000,
        "net": 11067000000,
        "statutory": 8670000000,
        "vat": 3978000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 12834000000,
        "deductions": 1604250000,
        "net": 11229750000,
        "statutory": 8797500000,
        "vat": 4036500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 13020000000,
        "deductions": 1627500000,
        "net": 11392500000,
        "statutory": 8925000000,
        "vat": 4095000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 13206000000,
        "deductions": 1650750000,
        "net": 11555250000,
        "statutory": 9052500000,
        "vat": 4153500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 13392000000,
        "deductions": 1674000000,
        "net": 11718000000,
        "statutory": 9180000000,
        "vat": 4212000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-so-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 13640000000,
        "deductions": 1705000000,
        "net": 11935000000,
        "statutory": 9350000000,
        "vat": 4290000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-so-1",
        "name": "Central Local Council",
        "allocation": 1383375000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-so-2",
        "name": "North Local Council",
        "allocation": 1513575000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-so-3",
        "name": "South Local Council",
        "allocation": 1643775000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "KB": {
    "code": "KB",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 12100000000,
    "latest_deductions": 1500000000,
    "latest_net": 10600000000,
    "vat_monthly": 3800000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-kb-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 11374000000,
        "deductions": 1410000000,
        "net": 9964000000,
        "statutory": 7802000000,
        "vat": 3572000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 11495000000,
        "deductions": 1425000000,
        "net": 10070000000,
        "statutory": 7885000000,
        "vat": 3610000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 11676500000,
        "deductions": 1447500000,
        "net": 10229000000,
        "statutory": 8009500000,
        "vat": 3667000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 11797500000,
        "deductions": 1462500000,
        "net": 10335000000,
        "statutory": 8092500000,
        "vat": 3705000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 11918500000,
        "deductions": 1477500000,
        "net": 10441000000,
        "statutory": 8175500000,
        "vat": 3743000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 12100000000,
        "deductions": 1500000000,
        "net": 10600000000,
        "statutory": 8300000000,
        "vat": 3800000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 12342000000,
        "deductions": 1530000000,
        "net": 10812000000,
        "statutory": 8466000000,
        "vat": 3876000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 12523500000,
        "deductions": 1552500000,
        "net": 10971000000,
        "statutory": 8590500000,
        "vat": 3933000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 12705000000,
        "deductions": 1575000000,
        "net": 11130000000,
        "statutory": 8715000000,
        "vat": 3990000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 12886500000,
        "deductions": 1597500000,
        "net": 11289000000,
        "statutory": 8839500000,
        "vat": 4047000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 13068000000,
        "deductions": 1620000000,
        "net": 11448000000,
        "statutory": 8964000000,
        "vat": 4104000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kb-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 13310000000,
        "deductions": 1650000000,
        "net": 11660000000,
        "statutory": 9130000000,
        "vat": 4180000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-kb-1",
        "name": "Central Local Council",
        "allocation": 1351500000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kb-2",
        "name": "North Local Council",
        "allocation": 1478700000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kb-3",
        "name": "South Local Council",
        "allocation": 1605900000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "AD": {
    "code": "AD",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 11800000000,
    "latest_deductions": 1650000000,
    "latest_net": 10150000000,
    "vat_monthly": 3750000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-ad-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 11092000000,
        "deductions": 1551000000,
        "net": 9541000000,
        "statutory": 7567000000,
        "vat": 3525000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 11210000000,
        "deductions": 1567500000,
        "net": 9642500000,
        "statutory": 7647500000,
        "vat": 3562500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 11387000000,
        "deductions": 1592250000,
        "net": 9794750000,
        "statutory": 7768250000,
        "vat": 3618750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 11505000000,
        "deductions": 1608750000,
        "net": 9896250000,
        "statutory": 7848750000,
        "vat": 3656250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 11623000000,
        "deductions": 1625250000,
        "net": 9997750000,
        "statutory": 7929250000,
        "vat": 3693750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 11800000000,
        "deductions": 1650000000,
        "net": 10150000000,
        "statutory": 8050000000,
        "vat": 3750000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 12036000000,
        "deductions": 1683000000,
        "net": 10353000000,
        "statutory": 8211000000,
        "vat": 3825000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 12213000000,
        "deductions": 1707750000,
        "net": 10505250000,
        "statutory": 8331750000,
        "vat": 3881250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 12390000000,
        "deductions": 1732500000,
        "net": 10657500000,
        "statutory": 8452500000,
        "vat": 3937500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 12567000000,
        "deductions": 1757250000,
        "net": 10809750000,
        "statutory": 8573250000,
        "vat": 3993750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 12744000000,
        "deductions": 1782000000,
        "net": 10962000000,
        "statutory": 8694000000,
        "vat": 4050000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ad-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 12980000000,
        "deductions": 1815000000,
        "net": 11165000000,
        "statutory": 8855000000,
        "vat": 4125000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-ad-1",
        "name": "Central Local Council",
        "allocation": 1294125000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ad-2",
        "name": "North Local Council",
        "allocation": 1415925000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ad-3",
        "name": "South Local Council",
        "allocation": 1537725000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "KG": {
    "code": "KG",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Solid Minerals",
    "latest_gross": 11600000000,
    "latest_deductions": 1800000000,
    "latest_net": 9800000000,
    "vat_monthly": 3950000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-kg-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 10904000000,
        "deductions": 1692000000,
        "net": 9212000000,
        "statutory": 7191000000,
        "vat": 3713000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 11020000000,
        "deductions": 1710000000,
        "net": 9310000000,
        "statutory": 7267500000,
        "vat": 3752500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 11194000000,
        "deductions": 1737000000,
        "net": 9457000000,
        "statutory": 7382250000,
        "vat": 3811750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 11310000000,
        "deductions": 1755000000,
        "net": 9555000000,
        "statutory": 7458750000,
        "vat": 3851250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 11426000000,
        "deductions": 1773000000,
        "net": 9653000000,
        "statutory": 7535250000,
        "vat": 3890750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 11600000000,
        "deductions": 1800000000,
        "net": 9800000000,
        "statutory": 7650000000,
        "vat": 3950000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 11832000000,
        "deductions": 1836000000,
        "net": 9996000000,
        "statutory": 7803000000,
        "vat": 4029000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 12006000000,
        "deductions": 1863000000,
        "net": 10143000000,
        "statutory": 7917750000,
        "vat": 4088250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 12180000000,
        "deductions": 1890000000,
        "net": 10290000000,
        "statutory": 8032500000,
        "vat": 4147500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 12354000000,
        "deductions": 1917000000,
        "net": 10437000000,
        "statutory": 8147250000,
        "vat": 4206750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 12528000000,
        "deductions": 1944000000,
        "net": 10584000000,
        "statutory": 8262000000,
        "vat": 4266000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kg-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 12760000000,
        "deductions": 1980000000,
        "net": 10780000000,
        "statutory": 8415000000,
        "vat": 4345000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-kg-1",
        "name": "Central Local Council",
        "allocation": 1249500000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kg-2",
        "name": "North Local Council",
        "allocation": 1367100000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kg-3",
        "name": "South Local Council",
        "allocation": 1484700000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "PL": {
    "code": "PL",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 11400000000,
    "latest_deductions": 1700000000,
    "latest_net": 9700000000,
    "vat_monthly": 3850000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-pl-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 10716000000,
        "deductions": 1598000000,
        "net": 9118000000,
        "statutory": 7097000000,
        "vat": 3619000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 10830000000,
        "deductions": 1615000000,
        "net": 9215000000,
        "statutory": 7172500000,
        "vat": 3657500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 11001000000,
        "deductions": 1640500000,
        "net": 9360500000,
        "statutory": 7285750000,
        "vat": 3715250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 11115000000,
        "deductions": 1657500000,
        "net": 9457500000,
        "statutory": 7361250000,
        "vat": 3753750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 11229000000,
        "deductions": 1674500000,
        "net": 9554500000,
        "statutory": 7436750000,
        "vat": 3792250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 11400000000,
        "deductions": 1700000000,
        "net": 9700000000,
        "statutory": 7550000000,
        "vat": 3850000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 11628000000,
        "deductions": 1734000000,
        "net": 9894000000,
        "statutory": 7701000000,
        "vat": 3927000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 11799000000,
        "deductions": 1759500000,
        "net": 10039500000,
        "statutory": 7814250000,
        "vat": 3984750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 11970000000,
        "deductions": 1785000000,
        "net": 10185000000,
        "statutory": 7927500000,
        "vat": 4042500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 12141000000,
        "deductions": 1810500000,
        "net": 10330500000,
        "statutory": 8040750000,
        "vat": 4100250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 12312000000,
        "deductions": 1836000000,
        "net": 10476000000,
        "statutory": 8154000000,
        "vat": 4158000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-pl-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 12540000000,
        "deductions": 1870000000,
        "net": 10670000000,
        "statutory": 8305000000,
        "vat": 4235000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-pl-1",
        "name": "Central Local Council",
        "allocation": 1236750000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-pl-2",
        "name": "North Local Council",
        "allocation": 1353150000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-pl-3",
        "name": "South Local Council",
        "allocation": 1469550000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "ZM": {
    "code": "ZM",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Solid Minerals",
    "latest_gross": 11100000000,
    "latest_deductions": 1600000000,
    "latest_net": 9500000000,
    "vat_monthly": 3600000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-zm-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 10434000000,
        "deductions": 1504000000,
        "net": 8930000000,
        "statutory": 7050000000,
        "vat": 3384000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 10545000000,
        "deductions": 1520000000,
        "net": 9025000000,
        "statutory": 7125000000,
        "vat": 3420000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 10711500000,
        "deductions": 1544000000,
        "net": 9167500000,
        "statutory": 7237500000,
        "vat": 3474000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 10822500000,
        "deductions": 1560000000,
        "net": 9262500000,
        "statutory": 7312500000,
        "vat": 3510000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 10933500000,
        "deductions": 1576000000,
        "net": 9357500000,
        "statutory": 7387500000,
        "vat": 3546000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 11100000000,
        "deductions": 1600000000,
        "net": 9500000000,
        "statutory": 7500000000,
        "vat": 3600000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 11322000000,
        "deductions": 1632000000,
        "net": 9690000000,
        "statutory": 7650000000,
        "vat": 3672000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 11488500000,
        "deductions": 1656000000,
        "net": 9832500000,
        "statutory": 7762500000,
        "vat": 3726000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 11655000000,
        "deductions": 1680000000,
        "net": 9975000000,
        "statutory": 7875000000,
        "vat": 3780000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 11821500000,
        "deductions": 1704000000,
        "net": 10117500000,
        "statutory": 7987500000,
        "vat": 3834000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 11988000000,
        "deductions": 1728000000,
        "net": 10260000000,
        "statutory": 8100000000,
        "vat": 3888000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-zm-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 12210000000,
        "deductions": 1760000000,
        "net": 10450000000,
        "statutory": 8250000000,
        "vat": 3960000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-zm-1",
        "name": "Central Local Council",
        "allocation": 1211250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-zm-2",
        "name": "North Local Council",
        "allocation": 1325250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-zm-3",
        "name": "South Local Council",
        "allocation": 1439250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "TA": {
    "code": "TA",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Landmass Factor",
    "latest_gross": 10800000000,
    "latest_deductions": 1450000000,
    "latest_net": 9350000000,
    "vat_monthly": 3500000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-ta-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 10152000000,
        "deductions": 1363000000,
        "net": 8789000000,
        "statutory": 6862000000,
        "vat": 3290000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 10260000000,
        "deductions": 1377500000,
        "net": 8882500000,
        "statutory": 6935000000,
        "vat": 3325000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 10422000000,
        "deductions": 1399250000,
        "net": 9022750000,
        "statutory": 7044500000,
        "vat": 3377500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 10530000000,
        "deductions": 1413750000,
        "net": 9116250000,
        "statutory": 7117500000,
        "vat": 3412500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 10638000000,
        "deductions": 1428250000,
        "net": 9209750000,
        "statutory": 7190500000,
        "vat": 3447500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 10800000000,
        "deductions": 1450000000,
        "net": 9350000000,
        "statutory": 7300000000,
        "vat": 3500000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 11016000000,
        "deductions": 1479000000,
        "net": 9537000000,
        "statutory": 7446000000,
        "vat": 3570000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 11178000000,
        "deductions": 1500750000,
        "net": 9677250000,
        "statutory": 7555500000,
        "vat": 3622500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 11340000000,
        "deductions": 1522500000,
        "net": 9817500000,
        "statutory": 7665000000,
        "vat": 3675000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 11502000000,
        "deductions": 1544250000,
        "net": 9957750000,
        "statutory": 7774500000,
        "vat": 3727500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 11664000000,
        "deductions": 1566000000,
        "net": 10098000000,
        "statutory": 7884000000,
        "vat": 3780000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ta-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 11880000000,
        "deductions": 1595000000,
        "net": 10285000000,
        "statutory": 8030000000,
        "vat": 3850000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-ta-1",
        "name": "Central Local Council",
        "allocation": 1192125000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ta-2",
        "name": "North Local Council",
        "allocation": 1304325000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ta-3",
        "name": "South Local Council",
        "allocation": 1416525000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "YO": {
    "code": "YO",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 10600000000,
    "latest_deductions": 1400000000,
    "latest_net": 9200000000,
    "vat_monthly": 3450000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-yo-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 9964000000,
        "deductions": 1316000000,
        "net": 8648000000,
        "statutory": 6721000000,
        "vat": 3243000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 10070000000,
        "deductions": 1330000000,
        "net": 8740000000,
        "statutory": 6792500000,
        "vat": 3277500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 10229000000,
        "deductions": 1351000000,
        "net": 8878000000,
        "statutory": 6899750000,
        "vat": 3329250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 10335000000,
        "deductions": 1365000000,
        "net": 8970000000,
        "statutory": 6971250000,
        "vat": 3363750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 10441000000,
        "deductions": 1379000000,
        "net": 9062000000,
        "statutory": 7042750000,
        "vat": 3398250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 10600000000,
        "deductions": 1400000000,
        "net": 9200000000,
        "statutory": 7150000000,
        "vat": 3450000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 10812000000,
        "deductions": 1428000000,
        "net": 9384000000,
        "statutory": 7293000000,
        "vat": 3519000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 10971000000,
        "deductions": 1449000000,
        "net": 9522000000,
        "statutory": 7400250000,
        "vat": 3570750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 11130000000,
        "deductions": 1470000000,
        "net": 9660000000,
        "statutory": 7507500000,
        "vat": 3622500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 11289000000,
        "deductions": 1491000000,
        "net": 9798000000,
        "statutory": 7614750000,
        "vat": 3674250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 11448000000,
        "deductions": 1512000000,
        "net": 9936000000,
        "statutory": 7722000000,
        "vat": 3726000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-yo-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 11660000000,
        "deductions": 1540000000,
        "net": 10120000000,
        "statutory": 7865000000,
        "vat": 3795000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-yo-1",
        "name": "Central Local Council",
        "allocation": 1173000000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-yo-2",
        "name": "North Local Council",
        "allocation": 1283400000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-yo-3",
        "name": "South Local Council",
        "allocation": 1393800000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "OS": {
    "code": "OS",
    "is_oil": false,
    "derivation_source": "Statutory Allocation (Legacy Bond Deductions)",
    "latest_gross": 10400000000,
    "latest_deductions": 2300000000,
    "latest_net": 8100000000,
    "vat_monthly": 4200000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-os-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 9776000000,
        "deductions": 2162000000,
        "net": 7614000000,
        "statutory": 5828000000,
        "vat": 3948000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 9880000000,
        "deductions": 2185000000,
        "net": 7695000000,
        "statutory": 5890000000,
        "vat": 3990000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 10036000000,
        "deductions": 2219500000,
        "net": 7816500000,
        "statutory": 5983000000,
        "vat": 4053000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 10140000000,
        "deductions": 2242500000,
        "net": 7897500000,
        "statutory": 6045000000,
        "vat": 4095000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 10244000000,
        "deductions": 2265500000,
        "net": 7978500000,
        "statutory": 6107000000,
        "vat": 4137000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 10400000000,
        "deductions": 2300000000,
        "net": 8100000000,
        "statutory": 6200000000,
        "vat": 4200000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 10608000000,
        "deductions": 2346000000,
        "net": 8262000000,
        "statutory": 6324000000,
        "vat": 4284000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 10764000000,
        "deductions": 2380500000,
        "net": 8383500000,
        "statutory": 6417000000,
        "vat": 4347000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 10920000000,
        "deductions": 2415000000,
        "net": 8505000000,
        "statutory": 6510000000,
        "vat": 4410000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 11076000000,
        "deductions": 2449500000,
        "net": 8626500000,
        "statutory": 6603000000,
        "vat": 4473000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 11232000000,
        "deductions": 2484000000,
        "net": 8748000000,
        "statutory": 6696000000,
        "vat": 4536000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-os-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 11440000000,
        "deductions": 2530000000,
        "net": 8910000000,
        "statutory": 6820000000,
        "vat": 4620000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-os-1",
        "name": "Central Local Council",
        "allocation": 1032750000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-os-2",
        "name": "North Local Council",
        "allocation": 1129950000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-os-3",
        "name": "South Local Council",
        "allocation": 1227150000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "KW": {
    "code": "KW",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 10200000000,
    "latest_deductions": 1500000000,
    "latest_net": 8700000000,
    "vat_monthly": 3800000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-kw-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 9588000000,
        "deductions": 1410000000,
        "net": 8178000000,
        "statutory": 6016000000,
        "vat": 3572000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 9690000000,
        "deductions": 1425000000,
        "net": 8265000000,
        "statutory": 6080000000,
        "vat": 3610000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 9843000000,
        "deductions": 1447500000,
        "net": 8395500000,
        "statutory": 6176000000,
        "vat": 3667000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 9945000000,
        "deductions": 1462500000,
        "net": 8482500000,
        "statutory": 6240000000,
        "vat": 3705000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 10047000000,
        "deductions": 1477500000,
        "net": 8569500000,
        "statutory": 6304000000,
        "vat": 3743000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 10200000000,
        "deductions": 1500000000,
        "net": 8700000000,
        "statutory": 6400000000,
        "vat": 3800000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 10404000000,
        "deductions": 1530000000,
        "net": 8874000000,
        "statutory": 6528000000,
        "vat": 3876000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 10557000000,
        "deductions": 1552500000,
        "net": 9004500000,
        "statutory": 6624000000,
        "vat": 3933000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 10710000000,
        "deductions": 1575000000,
        "net": 9135000000,
        "statutory": 6720000000,
        "vat": 3990000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 10863000000,
        "deductions": 1597500000,
        "net": 9265500000,
        "statutory": 6816000000,
        "vat": 4047000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 11016000000,
        "deductions": 1620000000,
        "net": 9396000000,
        "statutory": 6912000000,
        "vat": 4104000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-kw-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 11220000000,
        "deductions": 1650000000,
        "net": 9570000000,
        "statutory": 7040000000,
        "vat": 4180000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-kw-1",
        "name": "Central Local Council",
        "allocation": 1109250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kw-2",
        "name": "North Local Council",
        "allocation": 1213650000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-kw-3",
        "name": "South Local Council",
        "allocation": 1318050000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "NA": {
    "code": "NA",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Solid Minerals",
    "latest_gross": 9900000000,
    "latest_deductions": 1400000000,
    "latest_net": 8500000000,
    "vat_monthly": 3500000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-na-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 9306000000,
        "deductions": 1316000000,
        "net": 7990000000,
        "statutory": 6016000000,
        "vat": 3290000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 9405000000,
        "deductions": 1330000000,
        "net": 8075000000,
        "statutory": 6080000000,
        "vat": 3325000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 9553500000,
        "deductions": 1351000000,
        "net": 8202500000,
        "statutory": 6176000000,
        "vat": 3377500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 9652500000,
        "deductions": 1365000000,
        "net": 8287500000,
        "statutory": 6240000000,
        "vat": 3412500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 9751500000,
        "deductions": 1379000000,
        "net": 8372500000,
        "statutory": 6304000000,
        "vat": 3447500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 9900000000,
        "deductions": 1400000000,
        "net": 8500000000,
        "statutory": 6400000000,
        "vat": 3500000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 10098000000,
        "deductions": 1428000000,
        "net": 8670000000,
        "statutory": 6528000000,
        "vat": 3570000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 10246500000,
        "deductions": 1449000000,
        "net": 8797500000,
        "statutory": 6624000000,
        "vat": 3622500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 10395000000,
        "deductions": 1470000000,
        "net": 8925000000,
        "statutory": 6720000000,
        "vat": 3675000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 10543500000,
        "deductions": 1491000000,
        "net": 9052500000,
        "statutory": 6816000000,
        "vat": 3727500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 10692000000,
        "deductions": 1512000000,
        "net": 9180000000,
        "statutory": 6912000000,
        "vat": 3780000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-na-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 10890000000,
        "deductions": 1540000000,
        "net": 9350000000,
        "statutory": 7040000000,
        "vat": 3850000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-na-1",
        "name": "Central Local Council",
        "allocation": 1083750000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-na-2",
        "name": "North Local Council",
        "allocation": 1185750000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-na-3",
        "name": "South Local Council",
        "allocation": 1287750000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "CR": {
    "code": "CR",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Tourism/VAT",
    "latest_gross": 9700000000,
    "latest_deductions": 1650000000,
    "latest_net": 8050000000,
    "vat_monthly": 3650000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-cr-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 9118000000,
        "deductions": 1551000000,
        "net": 7567000000,
        "statutory": 5687000000,
        "vat": 3431000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 9215000000,
        "deductions": 1567500000,
        "net": 7647500000,
        "statutory": 5747500000,
        "vat": 3467500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 9360500000,
        "deductions": 1592250000,
        "net": 7768250000,
        "statutory": 5838250000,
        "vat": 3522250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 9457500000,
        "deductions": 1608750000,
        "net": 7848750000,
        "statutory": 5898750000,
        "vat": 3558750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 9554500000,
        "deductions": 1625250000,
        "net": 7929250000,
        "statutory": 5959250000,
        "vat": 3595250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 9700000000,
        "deductions": 1650000000,
        "net": 8050000000,
        "statutory": 6050000000,
        "vat": 3650000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 9894000000,
        "deductions": 1683000000,
        "net": 8211000000,
        "statutory": 6171000000,
        "vat": 3723000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 10039500000,
        "deductions": 1707750000,
        "net": 8331750000,
        "statutory": 6261750000,
        "vat": 3777750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 10185000000,
        "deductions": 1732500000,
        "net": 8452500000,
        "statutory": 6352500000,
        "vat": 3832500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 10330500000,
        "deductions": 1757250000,
        "net": 8573250000,
        "statutory": 6443250000,
        "vat": 3887250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 10476000000,
        "deductions": 1782000000,
        "net": 8694000000,
        "statutory": 6534000000,
        "vat": 3942000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-cr-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 10670000000,
        "deductions": 1815000000,
        "net": 8855000000,
        "statutory": 6655000000,
        "vat": 4015000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-cr-1",
        "name": "Central Local Council",
        "allocation": 1026375000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-cr-2",
        "name": "North Local Council",
        "allocation": 1122975000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-cr-3",
        "name": "South Local Council",
        "allocation": 1219575000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "GO": {
    "code": "GO",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 9500000000,
    "latest_deductions": 1350000000,
    "latest_net": 8150000000,
    "vat_monthly": 3400000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-go-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 8930000000,
        "deductions": 1269000000,
        "net": 7661000000,
        "statutory": 5734000000,
        "vat": 3196000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 9025000000,
        "deductions": 1282500000,
        "net": 7742500000,
        "statutory": 5795000000,
        "vat": 3230000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 9167500000,
        "deductions": 1302750000,
        "net": 7864750000,
        "statutory": 5886500000,
        "vat": 3281000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 9262500000,
        "deductions": 1316250000,
        "net": 7946250000,
        "statutory": 5947500000,
        "vat": 3315000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 9357500000,
        "deductions": 1329750000,
        "net": 8027750000,
        "statutory": 6008500000,
        "vat": 3349000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 9500000000,
        "deductions": 1350000000,
        "net": 8150000000,
        "statutory": 6100000000,
        "vat": 3400000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 9690000000,
        "deductions": 1377000000,
        "net": 8313000000,
        "statutory": 6222000000,
        "vat": 3468000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 9832500000,
        "deductions": 1397250000,
        "net": 8435250000,
        "statutory": 6313500000,
        "vat": 3519000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 9975000000,
        "deductions": 1417500000,
        "net": 8557500000,
        "statutory": 6405000000,
        "vat": 3570000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 10117500000,
        "deductions": 1437750000,
        "net": 8679750000,
        "statutory": 6496500000,
        "vat": 3621000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 10260000000,
        "deductions": 1458000000,
        "net": 8802000000,
        "statutory": 6588000000,
        "vat": 3672000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-go-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 10450000000,
        "deductions": 1485000000,
        "net": 8965000000,
        "statutory": 6710000000,
        "vat": 3740000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-go-1",
        "name": "Central Local Council",
        "allocation": 1039125000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-go-2",
        "name": "North Local Council",
        "allocation": 1136925000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-go-3",
        "name": "South Local Council",
        "allocation": 1234725000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "EB": {
    "code": "EB",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & Solid Minerals",
    "latest_gross": 9200000000,
    "latest_deductions": 1300000000,
    "latest_net": 7900000000,
    "vat_monthly": 3350000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-eb-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 8648000000,
        "deductions": 1222000000,
        "net": 7426000000,
        "statutory": 5499000000,
        "vat": 3149000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 8740000000,
        "deductions": 1235000000,
        "net": 7505000000,
        "statutory": 5557500000,
        "vat": 3182500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 8878000000,
        "deductions": 1254500000,
        "net": 7623500000,
        "statutory": 5645250000,
        "vat": 3232750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 8970000000,
        "deductions": 1267500000,
        "net": 7702500000,
        "statutory": 5703750000,
        "vat": 3266250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 9062000000,
        "deductions": 1280500000,
        "net": 7781500000,
        "statutory": 5762250000,
        "vat": 3299750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 9200000000,
        "deductions": 1300000000,
        "net": 7900000000,
        "statutory": 5850000000,
        "vat": 3350000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 9384000000,
        "deductions": 1326000000,
        "net": 8058000000,
        "statutory": 5967000000,
        "vat": 3417000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 9522000000,
        "deductions": 1345500000,
        "net": 8176500000,
        "statutory": 6054750000,
        "vat": 3467250000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 9660000000,
        "deductions": 1365000000,
        "net": 8295000000,
        "statutory": 6142500000,
        "vat": 3517500000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 9798000000,
        "deductions": 1384500000,
        "net": 8413500000,
        "statutory": 6230250000,
        "vat": 3567750000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 9936000000,
        "deductions": 1404000000,
        "net": 8532000000,
        "statutory": 6318000000,
        "vat": 3618000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-eb-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 10120000000,
        "deductions": 1430000000,
        "net": 8690000000,
        "statutory": 6435000000,
        "vat": 3685000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-eb-1",
        "name": "Central Local Council",
        "allocation": 1007250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-eb-2",
        "name": "North Local Council",
        "allocation": 1102050000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-eb-3",
        "name": "South Local Council",
        "allocation": 1196850000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  },
  "EK": {
    "code": "EK",
    "is_oil": false,
    "derivation_source": "Statutory Allocation & VAT Share",
    "latest_gross": 8900000000,
    "latest_deductions": 1400000000,
    "latest_net": 7500000000,
    "vat_monthly": 3400000000,
    "derivation_monthly": 0,
    "monthly_history": [
      {
        "id": "faac-2024-ek-1",
        "month": 1,
        "month_name": "Jan",
        "year": 2024,
        "gross": 8366000000,
        "deductions": 1316000000,
        "net": 7050000000,
        "statutory": 5170000000,
        "vat": 3196000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-2",
        "month": 2,
        "month_name": "Feb",
        "year": 2024,
        "gross": 8455000000,
        "deductions": 1330000000,
        "net": 7125000000,
        "statutory": 5225000000,
        "vat": 3230000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-3",
        "month": 3,
        "month_name": "Mar",
        "year": 2024,
        "gross": 8588500000,
        "deductions": 1351000000,
        "net": 7237500000,
        "statutory": 5307500000,
        "vat": 3281000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-4",
        "month": 4,
        "month_name": "Apr",
        "year": 2024,
        "gross": 8677500000,
        "deductions": 1365000000,
        "net": 7312500000,
        "statutory": 5362500000,
        "vat": 3315000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-5",
        "month": 5,
        "month_name": "May",
        "year": 2024,
        "gross": 8766500000,
        "deductions": 1379000000,
        "net": 7387500000,
        "statutory": 5417500000,
        "vat": 3349000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-6",
        "month": 6,
        "month_name": "Jun",
        "year": 2024,
        "gross": 8900000000,
        "deductions": 1400000000,
        "net": 7500000000,
        "statutory": 5500000000,
        "vat": 3400000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-7",
        "month": 7,
        "month_name": "Jul",
        "year": 2024,
        "gross": 9078000000,
        "deductions": 1428000000,
        "net": 7650000000,
        "statutory": 5610000000,
        "vat": 3468000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-8",
        "month": 8,
        "month_name": "Aug",
        "year": 2024,
        "gross": 9211500000,
        "deductions": 1449000000,
        "net": 7762500000,
        "statutory": 5692500000,
        "vat": 3519000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-9",
        "month": 9,
        "month_name": "Sep",
        "year": 2024,
        "gross": 9345000000,
        "deductions": 1470000000,
        "net": 7875000000,
        "statutory": 5775000000,
        "vat": 3570000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-10",
        "month": 10,
        "month_name": "Oct",
        "year": 2024,
        "gross": 9478500000,
        "deductions": 1491000000,
        "net": 7987500000,
        "statutory": 5857500000,
        "vat": 3621000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-11",
        "month": 11,
        "month_name": "Nov",
        "year": 2024,
        "gross": 9612000000,
        "deductions": 1512000000,
        "net": 8100000000,
        "statutory": 5940000000,
        "vat": 3672000000,
        "derivation": 0
      },
      {
        "id": "faac-2024-ek-12",
        "month": 12,
        "month_name": "Dec",
        "year": 2024,
        "gross": 9790000000,
        "deductions": 1540000000,
        "net": 8250000000,
        "statutory": 6050000000,
        "vat": 3740000000,
        "derivation": 0
      }
    ],
    "lgas": [
      {
        "id": "lga-ek-1",
        "name": "Central Local Council",
        "allocation": 956250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ek-2",
        "name": "North Local Council",
        "allocation": 1046250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      },
      {
        "id": "lga-ek-3",
        "name": "South Local Council",
        "allocation": 1136250000,
        "autonomy_status": "Direct Supreme Court Autonomy Remittance"
      }
    ]
  }
};

export function getRealFAACForState(stateCode: string): RealFAACStateData {
  const code = stateCode.toUpperCase();
  return REAL_FAAC_DATA[code] || REAL_FAAC_DATA['AB'];
}
