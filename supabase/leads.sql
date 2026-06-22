-- Run this in the Supabase SQL editor for lead capture from landing page modals.

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  type text not null check (type in ('brochure', 'enroll')),
  full_name text not null,
  email text not null,
  country_code text not null,
  phone text not null,
  city text not null,
  qualification text not null,
  profession text,
  experience_level text,
  course text,
  preferred_batch text,
  terms_accepted boolean not null default false,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Allow anonymous inserts"
  on public.leads
  for insert
  to anon
  with check (true);
