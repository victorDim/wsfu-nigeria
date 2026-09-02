
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
