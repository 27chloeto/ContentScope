-- Stores ContentScope audience-fit analysis results, one row per analyzed
-- post, scoped to the authenticated user who requested the analysis.
create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  content_type text not null,
  post_text text not null,
  age_group text not null,
  location text not null,
  target_customer text not null,
  fit_score integer not null check (fit_score between 0 and 100),
  strengths jsonb not null default '[]'::jsonb,
  weaknesses jsonb not null default '[]'::jsonb,
  issues jsonb not null default '[]'::jsonb,
  recommendations jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analyses_user_id_idx on public.analyses (user_id);

alter table public.analyses enable row level security;

create policy "analyses_select_own"
on public.analyses
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "analyses_insert_own"
on public.analyses
for insert
to authenticated
with check ((select auth.uid()) = user_id);
