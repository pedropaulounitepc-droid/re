-- Execute este script no SQL Editor do Supabase, DEPOIS de rodar
-- `npx prisma migrate dev` pela primeira vez (a tabela "users" precisa existir).
--
-- Objetivo: sempre que alguém se cadastra (email/senha ou Google) via
-- Supabase Auth, um registro correspondente é criado automaticamente
-- na tabela `users` do nosso schema Prisma.

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, "supabaseAuthId", nome, email, "avatarUrl", role, "criadoEm", "atualizadoEm")
  values (
    gen_random_uuid(),
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'role', 'ALUNO')::"Role",
    now(),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- Row Level Security (RLS) — ativar nas tabelas sensíveis
-- ==========================================
alter table public.users enable row level security;

create policy "Usuários veem apenas o próprio registro"
  on public.users for select
  using (auth.uid() = "supabaseAuthId");

create policy "Usuários atualizam apenas o próprio registro"
  on public.users for update
  using (auth.uid() = "supabaseAuthId");
