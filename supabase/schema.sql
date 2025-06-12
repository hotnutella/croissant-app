-- Supabase schema for comments, likes and top croissants view

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  croissant_id uuid references croissants(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

create table if not exists likes (
  id uuid primary key default gen_random_uuid(),
  croissant_id uuid references croissants(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique (croissant_id, user_id)
);

create or replace function get_top_croissants_of_week()
returns table(
  id uuid,
  name text,
  like_count bigint
)
language sql
as $$
  select c.id, c.name, count(l.id) as like_count
  from croissants c
  left join likes l on l.croissant_id = c.id
    and l.created_at >= now() - interval '7 days'
  group by c.id, c.name
  order by like_count desc;
$$;
