import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rednmvryjhzsiuckggpw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZG5tdnJ5amh6c2l1Y2tnZ3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTY0MjEsImV4cCI6MjA5MDczMjQyMX0.TECmXrI1odlT6TA9LEvTUt3b3WVSy0idYffFixD7HEU";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
