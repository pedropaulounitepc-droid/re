# Revalida Live

Plataforma de preparação para o Revalida INEP e ENARE.

## O que já está pronto nesta etapa

- Landing page (`/`)
- Cadastro (`/cadastro`) — e-mail/senha + Google
- Login (`/login`) — e-mail/senha + Google
- Recuperação de senha (`/recuperar-senha`)
- Callback de autenticação (`/auth/callback`)
- Middleware de proteção de rotas por role (ALUNO / PROFESSOR / ADMIN)
- Schema completo do banco de dados (`prisma/schema.prisma`)
- Trigger SQL de sincronização Supabase Auth ↔ tabela `users` (`docs/supabase-trigger.sql`)

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha com suas chaves reais
npx prisma migrate dev --name init
npm run dev
```

Depois, no **SQL Editor do Supabase**, rode o conteúdo de `docs/supabase-trigger.sql`.

## Como colocar no ar (Vercel)

1. Suba este projeto para um repositório no GitHub
2. Em vercel.com → "Add New Project" → selecione o repositório
3. Em "Environment Variables", cole todas as variáveis do seu `.env.local`
4. Clique em Deploy

A cada `git push`, a Vercel gera um novo deploy automaticamente.

## Próximas etapas (ainda não implementadas)

- Dashboard do aluno (estatísticas, ranking, últimos simulados)
- Banco de questões: filtros, resolução, favoritos, revisão
- Simulados (execução, correção, relatório)
- Videoaulas e progresso
- Flashcards com repetição espaçada
- Plano de estudos
- Revalida IA (rota de API + interface de chat)
- Painel administrativo (usuários, questões, importação CSV/Excel/JSON, cupons)
- Checkout (Stripe + Mercado Pago + PIX) e webhooks
- Gamificação (pontos, níveis, conquistas, sequência diária)

Peça para eu continuar por qualquer um desses blocos — cada um pode ser
construído de forma independente sobre esta base.
