import { createClient } from "@supabase/supabase-js";
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { z } from "zod";

const credentialsSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});
let cachedSecret: { expires: number; value: z.infer<typeof credentialsSchema> } | undefined;

// Credenciais exclusivas do servidor, sem fallback para chaves públicas/fictícias.
export async function getSupabaseServer() {
  let url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  let key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (process.env.LEADS_SECRET_ARN) {
    if (!cachedSecret || cachedSecret.expires < Date.now()) {
      const client = new SecretsManagerClient({ region: process.env.LEADS_AWS_REGION, maxAttempts: 2 });
      const result = await client.send(new GetSecretValueCommand({ SecretId: process.env.LEADS_SECRET_ARN }), { abortSignal: AbortSignal.timeout(3000) });
      const value = credentialsSchema.parse(JSON.parse(result.SecretString || "{}"));
      cachedSecret = { value, expires: Date.now() + 300000 };
    }
    url = cachedSecret.value.SUPABASE_URL;
    key = cachedSecret.value.SUPABASE_SERVICE_ROLE_KEY;
  }
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
