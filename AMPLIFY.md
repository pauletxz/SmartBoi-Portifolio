# Colaboração no AWS Amplify

O formulário envia para `/api/leads` no mesmo domínio. A API valida e grava no Supabase; somente uma gravação confirmada retorna sucesso. Não há envio automático de e-mail/WhatsApp nem painel público de contatos. Os contatos aparecem no Table Editor do Supabase, tabela `leads`.

## Banco e teste local

1. Crie/escolha seu projeto Supabase e execute `supabase/migrations/202610070001_create_leads.sql` no SQL Editor. Para uma tabela já existente, confira se as colunas coincidem antes da migração.
2. Configure em `.env.local` apenas `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` reais. Não envie chaves pelo chat nem as adicione ao Git.
3. Execute `npm run dev`, abra `/colaborar` e envie um contato de teste autorizado. Confirme o registro no Table Editor. Sem configuração, a API retorna 503 e o formulário exibe indisponibilidade, nunca sucesso fictício.

## Publicação

1. No AWS Secrets Manager, crie um segredo JSON com `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`. Copie o ARN, não o conteúdo secreto.
2. No Amplify Hosting, conecte o repositório e configure aplicação Next.js SSR (não exportação estática). Use o `amplify.yml` na raiz deste projeto e Node 22.
3. Cadastre `LEADS_SECRET_ARN` e `LEADS_AWS_REGION` nas variáveis do Amplify. O build copia apenas essas referências para `.env.production`; a chave do banco não fica nos artefatos. Sem elas o build continua (com aviso) e o site é publicado, mas o formulário responde 503 até a configuração.
4. Associe uma **SSR compute role** ao app/branch, com confiança no serviço `amplify.amazonaws.com` e permissão `secretsmanager:GetSecretValue` limitada ao ARN desse segredo. A role de build sozinha não basta. Se usar chave KMS própria, conceda também `kms:Decrypt` nessa chave.
5. Publique e repita o teste pelo domínio HTTPS, conferindo o registro persistido. Consulte CloudWatch em caso de 503; o código evita registrar contatos/chaves nos logs.

Política mínima para a compute role (substitua o ARN):

```json
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"secretsmanager:GetSecretValue","Resource":"ARN_DO_SEU_SEGREDO"}]}
```

Antes de divulgar amplamente, configure limitação de requisições no AWS WAF para POST `/api/leads`. Validação de campos não impede spam automatizado. Defina também o processo de atendimento e exclusão dos contatos pela equipe.

## Compatibilidade

O projeto foi alinhado ao Next.js 15.5.27 porque o suporte SSR gerenciado documentado pelo Amplify vai até Next.js 15. A imagem prioritária usa `priority`, compatível com essa versão. O build precisa de rede para baixar dependências e a fonte Inter do Google.

Referências oficiais:
- https://docs.aws.amazon.com/amplify/latest/userguide/ssr-amplify-support.html
- https://docs.aws.amazon.com/amplify/latest/userguide/ssr-environment-variables.html
- https://docs.aws.amazon.com/amplify/latest/userguide/ssr-supported-features.html

Nenhum recurso AWS/Supabase é criado automaticamente por estes arquivos. Sem as credenciais e os recursos acima, o cadastro ainda não pode persistir contatos reais.
