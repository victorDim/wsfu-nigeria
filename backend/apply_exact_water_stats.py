import json

target_file = r"C:\Users\dimvi\projects\wsfu\web\src\lib\officials_data.ts"

with open(r"C:\Users\dimvi\projects\wsfu\backend\build_authoritative_109_senators.py", "r", encoding="utf-8") as f:
    code = f.read()

namespace = {}
exec(code, namespace)

with open(r"C:\Users\dimvi\projects\wsfu\backend\update_water_metrics_in_dataset.py", "r", encoding="utf-8") as f:
    code_w = f.read()

exec(code_w, namespace)

governors = namespace['governors']
full_109_senators = namespace['full_109_senators']
reps_by_state = namespace['reps_by_state']
STATE_WATER_DATA = namespace['STATE_WATER_DATA']

# Update every governor's quality_of_life with the exact clean_water_pct
for scode, gdata in governors.items():
    if scode in STATE_WATER_DATA:
        gdata['quality_of_life']['clean_water_pct'] = STATE_WATER_DATA[scode]['clean_water_pct']

# Write out the updated officials_data.ts
with open(r"C:\Users\dimvi\projects\wsfu\backend\write_complete_master_bundle.py", "r", encoding="utf-8") as f:
    bundle_code = f.read()

exec(bundle_code, namespace)
print("Updated all official profiles with verified WASHNORM water access statistics!")
