# Área piloto SmartBoi

Demonstração pública: /prototipo, acessível pelo botão Testar protótipo na página inicial, sem login e somente com dados fictícios. A demonstração não usa Supabase. Área real: /prototipo/acesso. Desativada por padrão (404),
com noindex/nofollow e CSS restrito à rota. Não houve publicação nem mudança no banco remoto.

## Preparar em homologação

1. Use um projeto Supabase de homologação. Aplique supabase/migrations/202610080001_prototype_portal.sql nele.
2. Desative novos cadastros nas configurações de Auth. Crie os usuários autorizados no painel administrativo e entregue suas credenciais por canal privado.
3. Cadastre prototype_devices com owner_id igual ao UUID do usuário em Auth, name e serial_number.
4. Configure localmente PROTOTYPE_PORTAL_ENABLED=true, NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY. Nunca use service_role como chave pública.
5. Rode npm run dev e abra http://localhost:3000/prototipo/acesso.

A sessão fica apenas em memória; recarregar a página exige novo login. Não há cadastro público.
A autorização real é feita por RLS no banco, inclusive em chamadas diretas à API.
Usuários autenticados só podem consultar seus dispositivos e respectivas leituras. Não podem cadastrar, alterar ou remover dados.
A ocultação e noindex não substituem autenticação.

## Integração do dispositivo

O painel consulta prototype_readings: device_id, recorded_at (ISO 8601 com fuso),
ph (0–14, opcional) e temperature_c (-50–150, opcional). Pelo menos uma medida é obrigatória.
Insira os dados somente por backend confiável. Nunca coloque a chave service_role no firmware ou navegador.
O transporte e a autenticação do hardware ainda precisam ser definidos; não foi criado endpoint público de ingestão.
As unidades e limites devem ser confirmados com a equipe do hardware antes do uso real.
O painel mostra as últimas 100 leituras da seleção, com atualização manual e filtro por dispositivo.

## Validar antes de liberar

Com dois usuários e dispositivos distintos, confirme que cada conta só enxerga suas linhas,
inclusive pela API REST. Sem token, nenhuma tabela deve ser acessível. INSERT/UPDATE/DELETE
com token de usuário devem falhar. Confira login incorreto, sair, conta sem dispositivo,
dispositivo sem leituras, falha de conexão e visualização móvel.

## Hospedagem

A ativação remota é uma etapa separada. O script atual scripts/amplify-env.mjs só persiste
referências do serviço de leads. Para uma futura homologação no Amplify, a flag precisa
estar disponível no runtime SSR e as duas variáveis públicas no build.
Não habilite a rota na produção antes de validar RLS com duas contas.
Para desativar, remova PROTOTYPE_PORTAL_ENABLED ou use false.

Referências: https://nextjs.org/docs/15/app/api-reference/functions/not-found
e https://supabase.com/docs/guides/database/postgres/row-level-security

## Revisão conjunta com Claude

Corrigidos o filtro remoto por dispositivo e a preservação da seleção durante renovação de token.
Um vínculo de dispositivo não pode trocar de proprietário: o banco bloqueia a alteração.
Antes de reaproveitar hardware, arquive o registro anterior e suas leituras por procedimento
administrativo, preservando o acesso do produtor anterior; depois crie um novo vínculo.
Não execute db push contra produção para testar esta migração.
A flag desliga a rota, não o Supabase Auth nem a API; desativar cadastro público é obrigatório.
O JavaScript da interface pode integrar o build, sem dados privados ou segredos.
## Demonstração pública
Abra /prototipo em desenvolvimento ou produção para explorar seis animais e leituras fictícias, sem conta ou consulta ao Supabase. Use Voltar ao site para retornar à página inicial. A flag PROTOTYPE_PORTAL_ENABLED controla somente /prototipo/acesso, nunca a demonstração pública.

## Painel demonstrativo por animal
A demonstracao agora possui seis animais e 180 registros diarios ficticios entre 09/09 e 08/10/2026. Selecione animal, indicador e periodo (7/14/30 dias). O grafico compara com a media aritmetica dos seis animais em cada dia. O controle Explorar dia funciona com teclado e toque; a tabela apresenta todos os valores do animal selecionado.
Producao e dados de laboratorio sao exemplos de integracoes futuras, nao capacidades confirmadas do hardware. Nao ha classificacao automatica de qualidade. A area autenticada real continua baseada nos dispositivos: vinculo historico animal/dispositivo e ingestao de resultados laboratoriais precisam ser implementados antes do uso com dados reais.

## Deploy na Vercel
Importe o repositório SmartBoi-Portifolio e selecione a branch main, com o preset Next.js e comando npm run build. A demonstração pública em /prototipo não exige banco, migração ou variáveis de ambiente. Mantenha PROTOTYPE_PORTAL_ENABLED desativada para publicar somente a demonstração. O portal real em /prototipo/acesso continua dependendo das configurações e validações de homologação descritas acima.
