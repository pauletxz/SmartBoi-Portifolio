import { createClient } from "@supabase/supabase-js";

// Usando as variaveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Exportando uma unica instancia do cliente Supabase para o lado do cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
