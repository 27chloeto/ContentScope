-- Adds the target platform (Instagram, TikTok, Facebook, ...) that an
-- analysis was generated for, alongside the existing age/region targeting.
alter table public.analyses
  add column if not exists platform text not null default 'instagram';

alter table public.analyses
  alter column platform drop default;
