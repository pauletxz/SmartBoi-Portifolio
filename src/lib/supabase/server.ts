import { createClient } from "@supabase/supabase-js";

// Usando as variaveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Cliente para funcoes no servidor
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);
