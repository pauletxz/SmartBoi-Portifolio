# OpenAI Astra MCP

Este servidor local disponibiliza a ferramenta `consultar_gpt6_astra` para o Antigravity. Ele usa `gpt-6-astra` pela API Responses da OpenAI.

## Segurança

- A chave é lida apenas da variável de ambiente `OPENAI_API_KEY`.
- Nenhuma chave é registrada no repositório ou em `.agents/mcp_config.json`.
- Apenas os campos enviados à ferramenta (`prompt` e, opcionalmente, `context`) seguem para a OpenAI. Arquivos do projeto não são lidos automaticamente.
- As consultas usam `store: false`.

## Ativação no Windows

1. Crie uma chave de API no painel da OpenAI.
2. No Windows, adicione `OPENAI_API_KEY` às Variáveis de Ambiente do seu usuário.
3. Feche completamente e reabra o Antigravity para que ele herde a variável.
4. Abra o painel do agente, acesse **MCP Servers** e confirme que `openai-astra` está conectado.

O arquivo `.agents/mcp_config.json` já registra este servidor somente para este workspace. O Antigravity solicitará aprovação antes de executar a ferramenta; aprove apenas quando quiser enviar aquele pedido para a OpenAI.

## Teste manual

Com `OPENAI_API_KEY` configurada no terminal:

```powershell
npm run mcp:astra
```

O processo fica aguardando o Antigravity pela entrada padrão. Não o execute junto com `npm run dev` esperando uma interface visual.
