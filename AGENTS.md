<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SmartBoi

## Sobre o projeto

O repositório contém uma aplicação web SmartBoi, com uma página para o produto Lacta IA e uma página de colaboração. A interface apresenta o protótipo e permite enviar dados de contato pela API de leads. Essa descrição se baseia nas páginas e nos componentes presentes; detalhes de operação do produto no campo estão a confirmar.

## Tecnologias

- Next.js 15.5.27 com App Router e React 19 (compatibilidade com AWS Amplify Hosting).
- TypeScript 5, com modo `strict` habilitado.
- Tailwind CSS 4, integrado pelo PostCSS.
- Supabase JavaScript para acesso aos dados de leads.
- Zod para validação, React Hook Form e `@hookform/resolvers` para formulários.
- Motion para animações e Lucide React para ícones.
- ESLint 9 com as configurações Core Web Vitals e TypeScript do Next.js.
- Um servidor MCP local em Node.js está disponível em `mcp/`; seu uso é descrito em `mcp/README.md`.

## Como executar

Requer Node.js e npm; as versões mínimas estão a confirmar. Na raiz do projeto:

```bash
npm install
npm run dev
```

A aplicação de desenvolvimento fica normalmente disponível em `http://localhost:3000`.

Comandos disponíveis em `package.json`:

- `npm run dev`: inicia o servidor de desenvolvimento Next.js.
- `npm run build`: cria a compilação de produção.
- `npm run start`: inicia a aplicação compilada.
- `npm run lint`: executa ESLint.
- `npm run mcp:astra`: inicia `mcp/astra-server.mjs`; configuração e requisitos estão em `mcp/README.md`.

As variáveis de ambiente usadas pela integração Supabase incluem `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY`, conforme o código em `src/lib/supabase/`. Os valores necessários para cada ambiente estão a confirmar; consulte `.env.example`. Não há script de testes automatizados definido em `package.json`; a estratégia de testes está a confirmar.

## Estrutura de pastas

- `src/app/`: rotas e layout do Next.js, estilos globais e endpoint `api/leads`.
- `src/app/colaborar/`: página de colaboração.
- `src/components/`: componentes de interface agrupados por área (`bento`, `cta`, `hero`, `layout`, `story` e `ui`).
- `src/lib/`: clientes Supabase e validações.
- `src/types/`: tipos compartilhados, incluindo os dados de leads.
- `public/`: recursos estáticos servidos pela aplicação.
- `mcp/`: servidor MCP e documentação correspondente.
- `verificacao/` e `verificacao-final/`: relatórios e capturas de tela de verificações visuais.
- Arquivos da raiz: configuração do Next.js, TypeScript, ESLint e PostCSS, dependências e documentos de planejamento/design.

## Convenções identificadas

- Rotas seguem a estrutura do App Router dentro de `src/app/`.
- Componentes e módulos usam TypeScript/TSX; componentes observados são exportados por nome e usam funções React.
- O alias `@/*` aponta para `src/*` e é usado nos imports internos.
- Componentes com interatividade no navegador podem declarar a diretiva `"use client"` no início do arquivo.
- A estilização observada usa classes utilitárias Tailwind e variáveis CSS definidas nos estilos globais.
- Schemas de validação ficam em `src/lib/validations/`; tipos relacionados ficam em `src/types/`.
- Regras adicionais sobre nomenclatura, formatação automática e cobertura de testes estão a confirmar.

## Registro de mudanças

Depois de cada modificação feita no projeto, adicione ao final do arquivo `CHANGELOG.md` uma entrada com a data, os arquivos alterados e um resumo curto do que mudou e por quê.
