import { writeFileSync } from 'node:fs';

// Somente referências não secretas são incluídas nos artefatos SSR.
// Sem elas o site é publicado normalmente e /api/leads responde 503 até a configuração.
const keys = ['LEADS_SECRET_ARN', 'LEADS_AWS_REGION'];
const present = keys.filter(key => process.env[key]);
for (const key of present) {
  if (/[\r\n]/.test(process.env[key])) throw new Error(`${key} contém quebra de linha.`);
}
if (present.length !== keys.length) {
  console.warn(`Aviso: ${keys.filter(key => !process.env[key]).join(', ')} ausente(s); o formulário ficará indisponível (503).`);
}
writeFileSync('.env.production', present.map(key => `${key}=${JSON.stringify(process.env[key])}`).join('\n') + '\n');
