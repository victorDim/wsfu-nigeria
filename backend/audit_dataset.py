with open(r'C:\Users\dimvi\projects\wsfu\backend\build_authoritative_109_senators.py', 'r', encoding='utf-8') as f:
    code = f.read()

ns = {}
exec(code, ns)
govs = ns['governors']
sens = ns['full_109_senators']
states = ['NAT', 'AB', 'AD', 'AK', 'AN', 'BA', 'BY', 'BE', 'BO', 'CR', 'DE', 'EB', 'ED', 'EK', 'EN', 'FC', 'GO', 'IM', 'JI', 'KD', 'KN', 'KT', 'KB', 'KG', 'KW', 'LA', 'NA', 'NI', 'OG', 'ON', 'OS', 'OY', 'PL', 'RV', 'SO', 'TA', 'YO', 'ZM']

missing_govs = []
for s in states:
    g = govs.get(s)
    s_list = sens.get(s, [])
    gov_name = g['name'] if g else "MISSING"
    prom_count = len(g['promises']) if g else 0
    if not g or prom_count == 0:
        missing_govs.append(s)
    print(f"State {s:3s}: Gov: {gov_name[:30]:30s} | Promises: {prom_count} | Senators: {len(s_list)}")

print("Missing or zero promise governors in states:", missing_govs)
