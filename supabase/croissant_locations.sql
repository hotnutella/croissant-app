-- Table for storing croissant locations
create table if not exists public.croissant_locations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  lat double precision not null,
  lng double precision not null,
  created_at timestamp with time zone default now()
);
