import json

# Let's inspect officials_data.ts
with open(r"C:\Users\dimvi\projects\wsfu\web\src\lib\officials_data.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Let's check where governors and senators promises might be missing or incomplete
# Let's write a node script to run getOfficialsForState for all 36 states + NAT and print the output
node_script = """
import { ALL_NIGERIAN_STATES, getOfficialsForState, NIGERIA_GOVERNORS_MASTER } from './src/lib/officials_data.ts';

for (const state of ALL_NIGERIAN_STATES) {
  const officials = getOfficialsForState(state.code);
  const gov = officials.find(o => o.role === 'governor' || o.role === 'president');
  const sens = officials.filter(o => o.role === 'senator');
  const reps = officials.filter(o => o.role === 'house_of_rep');
  console.log(`State: ${state.code} (${state.name}) -> Gov: ${gov?.name} (${gov?.promises?.length} promises), Senators: ${sens.length}, Reps: ${reps.length}`);
  if (!gov || !gov.promises || gov.promises.length === 0) {
    console.warn(`WARNING: Missing promises for governor in ${state.code}`);
  }
}
"""

with open(r"C:\Users\dimvi\projects\wsfu\web\test_all_states.js", "w", encoding="utf-8") as f:
    f.write(node_script)

print("Created test script.")
