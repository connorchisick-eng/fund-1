-- Trojan SMIF · Member email column
-- Adds the missing `email` column referenced by the enforce_usc_email
-- trigger in 01_schema.sql, and seeds known addresses. Safe to re-run.

alter table public.members
  add column if not exists email text;

create unique index if not exists members_email_key
  on public.members (lower(email))
  where email is not null;

-- Known emails — extend this list as members are onboarded.
update public.members set email = 'Guillermo.SanchezGarcia.2026@marshall.usc.edu'
  where username = 'guillermo.sanchez.garcia';

update public.members set email = 'Quynh-Ngau.TranDuc.2026@marshall.usc.edu'
  where username = 'quynh-ngau.tran.duc';
