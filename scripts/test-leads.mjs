// Execute após npm run build. Usa um banco simulado local; nunca grava contatos reais.
import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
const received = [];
let fail = false;
const database = http.createServer(async (req, res) => {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  if (new URL(req.url, 'http://localhost').pathname !== '/rest/v1/leads') { res.writeHead(404); res.end(); return; }
  if (fail) { res.writeHead(500, { 'content-type': 'application/json' }); res.end('{"code":"test_failure"}'); return; }
  received.push(JSON.parse(raw));
  res.writeHead(201, { 'content-type': 'application/json' });
  res.end('');
});
await new Promise(resolve => database.listen(0, '127.0.0.1', resolve));
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3105'], {
  env: { ...process.env, LEADS_SECRET_ARN: '', SUPABASE_URL: `http://127.0.0.1:${database.address().port}`, SUPABASE_SERVICE_ROLE_KEY: 'local-test-only' },
  stdio: 'pipe', windowsHide: true,
});
let logs = '';
app.stdout.on('data', d => { logs += d; });
app.stderr.on('data', d => { logs += d; });
const endpoint = 'http://localhost:3105/api/leads';
const post = (body, type = 'application/json') => fetch(endpoint, { method: 'POST', headers: { 'Content-Type': type }, body });
try {
  let ready = false;
  for (let n = 0; n < 80; n++) {
    try { if ((await fetch(endpoint)).status === 405) { ready = true; break; } } catch {}
    await delay(250);
  }
  assert.ok(ready, logs);
  assert.equal((await post('{')).status, 400);
  assert.equal((await post('{}', 'text/plain')).status, 415);
  assert.equal((await post(JSON.stringify({ name: 'A', email: 'bad', phone: '123' }))).status, 400);
  assert.equal((await post(' '.repeat(9000))).status, 413);
  const payload = { name: ' Teste Local ', email: 'TESTE@example.com', phone: '(11) 99999-9999', daily_liters: '0' };
  const success = await post(JSON.stringify(payload));
  assert.equal(success.status, 201);
  assert.deepEqual(await success.json(), { success: true });
  assert.equal(received.length, 1);
  assert.equal(received[0][0].daily_liters, 0);
  assert.equal(received[0][0].phone, '11999999999');
  assert.equal(received[0][0].email, 'teste@example.com');
  assert.equal(received[0][0].name, 'Teste Local');
  fail = true;
  assert.equal((await post(JSON.stringify(payload))).status, 503);
  console.log('PASS: JSON, tipo, tamanho, validação, persistência simulada, normalização, zero e falha do banco.');
} finally {
  app.kill();
  database.closeAllConnections();
  database.close();
}
