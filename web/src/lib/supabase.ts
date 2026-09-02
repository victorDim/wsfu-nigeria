import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://fpeoujphkejtzhclifbm.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zA26s-Vc0iGMvL_knCwj8w_ZMSpsEr9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
