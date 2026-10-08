# Registro de mudanças

<!-- O arquivo .env.example é versionado para documentar a configuração sem expor credenciais. -->

## 2026-10-06

- Arquivos: `AGENTS.md`, `CHANGELOG.md`.
- Criados o guia do projeto em português, preservando as instruções Next.js já existentes, e este changelog para documentar alterações futuras e registrar esta criação.

- Arquivos: `.gitignore`, `.env.example`, `CHANGELOG.md`.
- Permitido o versionamento do arquivo de exemplo de variáveis de ambiente para documentar a configuração necessária sem expor credenciais reais.

## 2026-10-07

- Arquivos: `src/components/hero/HeroSection.tsx`, `src/components/story/PrototypeSection.tsx`, `src/app/globals.css`, `CHANGELOG.md`; imagens de `src/assets/IMG-20261003-WA0018.jpg`, `IMG-20261003-WA0017.jpg` e `IMG-20261003-WA0012.jpg`.
- Substituída a ilustração conceitual da abertura por uma foto da medição e adicionados dois registros complementares na seção do protótipo. Preservados os enquadramentos verticais, com legendas, textos alternativos, tamanhos responsivos e otimização por `next/image`.
- Arquivos: `src/app/globals.css`, `CHANGELOG.md`. Reduzida a foto de abertura e padronizadas as três imagens em proporção 3:4, com largura máxima de 360px; galeria alinhada em colunas iguais e enquadramentos ajustados para manter a medição visível.
- Arquivos: `src/components/story/ConfidenceMap.tsx`, `src/app/globals.css`, `CHANGELOG.md`. Movido o título e o texto do mapa de confiança para um cabeçalho anterior ao painel fixo da animação, eliminando a sobreposição; centralizada a área dinâmica no celular.
- Arquivos: `src/components/story/ConfidenceMap.tsx`, `src/app/globals.css`, `CHANGELOG.md`. Compactado o mapa em duas colunas no desktop e blocos empilhados no celular; reduzidos os elementos gráficos, removida a altura de 320vh e adaptada a animação à passagem normal da seção pela tela.
- Arquivos: `src/components/hero/HeroSection.tsx`, `src/app/globals.css`, `src/assets/hero-campo.png`, `src/assets/hero-campo.prompt.md`, `CHANGELOG.md`. Adicionada paisagem rural gerada por IA ao fundo da abertura, com camada clara para legibilidade e conexões animadas discretas. Animações respeitam a preferência por movimento reduzido; fundo suavizado no celular.
- Arquivos: `src/components/story/ConfidenceMap.tsx`, `CHANGELOG.md`. Corrigido o progresso da animação para acompanhar o próprio mapa, desde sua entrada até o centro da tela; a sequência agora termina com o mapa inteiro visível, em vez de continuar durante a saída da seção.
- Arquivos: `src/components/story/ConfidenceMap.tsx`, `src/app/globals.css`, `src/assets/prototipo.png`, `CHANGELOG.md`. Restaurada a entrada sequencial dos boxes com opacidade, deslocamento e escala durante a rolagem com o mapa visível. Inserida a imagem do protótipo no centro, com halo pulsante e conexões suaves; preservado o modo de movimento reduzido.
- Arquivos: `src/components/story/ConfidenceMap.tsx`, `src/app/globals.css`, `CHANGELOG.md`. Ampliada a imagem central em 50%, com largura máxima de 420px e 90% do painel no celular; aumentado o espaço entre os boxes e ajustada a resolução responsiva para melhorar a visualização do equipamento.
- Arquivos: `src/components/hero/HeroSection.tsx`, `src/assets/parte-inicial.png`, `CHANGELOG.md`. Substituída a foto de abertura pela imagem `parte-inicial.png`, conforme solicitado, mantendo o tamanho do cartão.
- Arquivos: `src/components/hero/HeroSection.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/app/globals.css`, `next.config.ts`, `src/assets/logosmartboi.svg`, `CHANGELOG.md`. Ampliada a abertura para formato horizontal 16:9, até 680px, com qualidade de imagem 90 e resolução responsiva ajustada. Aplicada a logo SVG oficial no cabeçalho e rodapé.
- Colaboração/Amplify: alterados `src/components/hero/LeadCaptureForm.tsx`, `src/lib/validations/lead.ts`, `src/lib/supabase/server.ts`, `src/app/api/leads/route.ts`, `.env.example`, `package.json`, `package-lock.json`, `eslint.config.mjs`, `src/components/hero/HeroSection.tsx`; adicionados `supabase/migrations/202610070001_create_leads.sql`, `amplify.yml`, `scripts/amplify-env.mjs` e `AMPLIFY.md`. Validação real, confirmação somente após persistência, timeout, retorno 503 sem configuração, normalização dos contatos e leitura de segredo via IAM no Amplify. Next.js alinhado à versão 15.5.27 suportada pelo hosting documentado. Ativação depende da criação/configuração do banco e segredo na conta do proprietário.
- Arquivos: `AGENTS.md`, `tsconfig.json`, `scripts/test-leads.mjs`, `CHANGELOG.md`. Documentada a versão compatível, aplicada a configuração JSX exigida pelo build e adicionado teste isolado da API com persistência simulada, sem envio de dados a serviços reais.
- Arquivos: `.gitignore`, `amplify.yml`, `scripts/amplify-env.mjs`, `AMPLIFY.md`, `CHANGELOG.md`. Preparação da hospedagem: ignorados `.npm-cache/`, `.npm/` e logs do servidor local; `npm ci` passa a usar a pasta `.npm` declarada no cache do Amplify; ausência de `LEADS_SECRET_ARN`/`LEADS_AWS_REGION` deixa de interromper o build (apenas avisa), permitindo publicar o site antes de configurar o banco, com o formulário respondendo 503.
