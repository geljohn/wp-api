import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY,PUBLIC_SUPABASE_URL } from '$env/static/public';

// const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
