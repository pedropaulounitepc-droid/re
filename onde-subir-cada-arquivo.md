# Guia: o que subir e onde

Existem **3 lugares diferentes** envolvidos. Cada arquivo do zip vai para UM deles.

```
┌─────────────────────────────────────────────────────────────┐
│  1. GITHUB (repositório)   →   quase TUDO do zip vai aqui    │
│  2. VERCEL (variáveis)     →   conteúdo do .env.example      │
│  3. SUPABASE (SQL Editor)  →   docs/supabase-trigger.sql     │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. GitHub — sobe o projeto inteiro, tal como está no zip

Extraia o zip e suba **a pasta inteira** (mantendo a estrutura) para um novo
repositório no GitHub. Não precisa mover nada manualmente — é isso que
torna esse pacote "pegar e hospedar".

```
revalida-live/                     ← raiz do repositório no GitHub
│
├── package.json                   ✅ sobe
├── next.config.js                 ✅ sobe
├── tailwind.config.ts             ✅ sobe
├── postcss.config.js              ✅ sobe
├── tsconfig.json                  ✅ sobe
├── README.md                      ✅ sobe
│
├── .env.example                   ✅ sobe (é só um MODELO, sem senhas reais)
├── .env.local                     ⛔ NUNCA sobe (você cria isso localmente,
│                                     e o Git já ignora por padrão)
│
├── prisma/
│   └── schema.prisma              ✅ sobe
│
├── docs/
│   └── supabase-trigger.sql       ✅ sobe no GitHub também (fica documentado),
│                                     MAS além disso precisa ser colado
│                                     manualmente no Supabase — passo 3 abaixo
│
└── src/
    ├── middleware.ts              ✅ sobe
    ├── app/
    │   ├── layout.tsx             ✅ sobe
    │   ├── globals.css            ✅ sobe
    │   ├── (public)/
    │   │   ├── page.tsx           ✅ sobe   (landing page = "/")
    │   │   ├── login/page.tsx     ✅ sobe   ("/login")
    │   │   ├── cadastro/page.tsx  ✅ sobe   ("/cadastro")
    │   │   └── recuperar-senha/
    │   │       └── page.tsx       ✅ sobe   ("/recuperar-senha")
    │   └── auth/callback/
    │       └── route.ts           ✅ sobe   (rota de callback do login)
    └── lib/
        ├── prisma.ts              ✅ sobe
        └── supabase/
            ├── client.ts          ✅ sobe
            └── server.ts          ✅ sobe
```

**Passo a passo GitHub:**
1. Crie um repositório novo (ex: `revalida-live`) em github.com
2. Extraia o zip no seu computador
3. Dentro da pasta extraída, rode:
   ```bash
   git init
   git add .
   git commit -m "Primeira versão"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/revalida-live.git
   git push -u origin main
   ```

---

## 2. Vercel — não é arquivo, são variáveis de ambiente

O arquivo `.env.example` **não sobe com valores reais**. Ele é só o molde.
Você pega cada linha dele e cadastra manualmente na Vercel:

1. vercel.com → **Add New Project** → importe o repositório do GitHub
2. Antes de clicar em Deploy, abra **Environment Variables**
3. Copie cada chave do `.env.example` e cole o **valor real** (que você
   pegou no painel do Supabase, Stripe, etc. — vide README):

| Nome da variável | De onde vem o valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API |
| `DATABASE_URL` / `DIRECT_URL` | Supabase → Project Settings → Database |
| `STRIPE_SECRET_KEY` etc. | Dashboard Stripe |
| `MERCADO_PAGO_ACCESS_TOKEN` | Painel Mercado Pago |
| `NEXT_PUBLIC_APP_URL` | URL final do seu site na Vercel |

4. Clique em **Deploy**

---

## 3. Supabase — o único arquivo colado manualmente fora do Git

`docs/supabase-trigger.sql` **não é executado pelo deploy** — ele precisa
ser colado por você, uma única vez, direto no banco:

1. Rode primeiro `npx prisma migrate dev` localmente (cria as tabelas)
2. Entre no Supabase → **SQL Editor** → New query
3. Abra o arquivo `docs/supabase-trigger.sql`, copie todo o conteúdo, cole
   ali e clique em **Run**

Isso garante que todo cadastro feito no site crie automaticamente o
registro correspondente na tabela `users`.

---

## Resumo em uma frase por item

- **Tudo dentro de `src/`, `prisma/`, e os arquivos de config na raiz** → GitHub → Vercel puxa e builda sozinho
- **`.env.example`** → só de referência; os valores reais vão nas Environment Variables da Vercel
- **`docs/supabase-trigger.sql`** → cola manualmente no SQL Editor do Supabase, uma vez só
