import json

# NDHS 2024 / StatiSense Basic Drinking Water Access Dataset
NDHS_2024_WATER = {
    "LA": 98,
    "OG": 97,
    "FC": 96,
    "OS": 94,
    "AN": 93,
    "IM": 92,
    "KN": 92,
    "OY": 92,
    "ON": 91,
    "RV": 91,
    "ED": 89,
    "EK": 88,
    "DE": 86,
    "AB": 85,
    "AK": 84,
    "JI": 79,
    "KD": 78,
    "KW": 76,
    "NA": 70,
    "BA": 68,
    "BY": 68,
    "EN": 66,
    "BO": 64,
    "BE": 62,
    "YO": 61,
    "KT": 60,
    "GO": 57,
    "CR": 56,
    "ZM": 55,
    "KG": 53,
    "AD": 49,
    "NI": 44,
    "PL": 42,
    "EB": 40,
    "TA": 36,
    "SO": 35,
    "KB": 31,
    "NAT": 72
}

# Update build_flawless_master_dataset.py and officials_data.ts
with open(r"C:\Users\dimvi\projects\wsfu\backend\build_flawless_master_dataset.py", "r", encoding="utf-8") as f:
    code = f.read()

ns = {}
exec(code, ns)

all_governors = ns['all_governors']
all_senators = ns['all_senators']
all_reps = ns['all_reps']

# Apply NDHS 2024 water access data to all governors
for scode, gdata in all_governors.items():
    if scode in NDHS_2024_WATER:
        gdata['quality_of_life']['clean_water_pct'] = NDHS_2024_WATER[scode]

# Write back to officials_data.ts
output_ts = r"C:\Users\dimvi\projects\wsfu\web\src\lib\officials_data.ts"

with open(r"C:\Users\dimvi\projects\wsfu\backend\build_flawless_master_dataset.py", "r", encoding="utf-8") as f:
    orig_builder = f.read()

# We can re-execute the save portion with the updated governors
ts_header = orig_builder.split("export const NIGERIA_GOVERNORS_MASTER: Record<string, any> =")[0]
ts_footer = orig_builder.split("export const NIGERIA_REPRESENTATIVES_MASTER: Record<string, any[]> =")[1].split("export function getOfficialsForState")[1]

new_ts = ts_header + "export const NIGERIA_GOVERNORS_MASTER: Record<string, any> = " + json.dumps(all_governors, indent=2) + ";\n\n"
new_ts += "export const NIGERIA_SENATORS_MASTER: Record<string, any[]> = " + json.dumps(all_senators, indent=2) + ";\n\n"
new_ts += "export const NIGERIA_REPRESENTATIVES_MASTER: Record<string, any[]> = " + json.dumps(all_reps, indent=2) + ";\n\n"
new_ts += "export function getOfficialsForState" + ts_footer

# Remove any python wrappers if they were in the template
final_ts = new_ts.split("'''")[0] if "'''" in new_ts else new_ts

with open(output_ts, "w", encoding="utf-8") as f:
    f.write(final_ts)

print("Applied exact NDHS 2024 / StatiSense water statistics to officials_data.ts!")
