create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  name text not null check (char_length(trim(name)) > 0),
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0),
  shared boolean not null default false,
  team_id uuid references public.teams(id) on delete set null,
  created_at timestamptz not null default now(),
  check ((shared and team_id is not null) or (not shared and team_id is null))
);

create table public.patterns (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  pattern jsonb not null,
  created_at timestamptz not null default now(),
  category_id uuid not null references public.categories(id),
  project_id uuid not null references public.projects(id) on delete cascade
);

create index projects_user_id_created_at_idx on public.projects (user_id, created_at desc);
create index projects_team_id_created_at_idx on public.projects (team_id, created_at desc) where shared;
create index teams_owner_id_idx on public.teams (owner_id);
create index patterns_category_id_idx on public.patterns (category_id);
create index patterns_project_id_idx on public.patterns (project_id);
create index patterns_user_id_idx on public.patterns (user_id);
create index patterns_team_id_idx on public.patterns (team_id) where team_id is not null;
create index profiles_team_id_idx on public.profiles (team_id) where team_id is not null;

insert into public.categories (name)
values ('state'), ('singleton'), ('flyweight')
on conflict (name) do nothing;

create or replace function private.current_user_team_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select team_id from public.profiles where user_id = auth.uid()
$$;

create or replace function private.is_current_user_team_owner(candidate_team_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.teams
    where id = candidate_team_id and owner_id = auth.uid()
  )
$$;

revoke all on function private.current_user_team_id() from public;
revoke all on function private.is_current_user_team_owner(uuid) from public;
grant usage on schema private to authenticated;
grant execute on function private.current_user_team_id() to authenticated;
grant execute on function private.is_current_user_team_owner(uuid) to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.invite_collaborator(email_param text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  inviter_team_id uuid;
  collaborator_user_id uuid;
  collaborator_team_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  select team_id into inviter_team_id
  from public.profiles
  where user_id = auth.uid();

  if inviter_team_id is null then
    raise exception 'You do not belong to a team' using errcode = '42501';
  end if;

  select p.user_id, p.team_id
  into collaborator_user_id, collaborator_team_id
  from public.profiles p
  join auth.users u on u.id = p.user_id
  where lower(u.email) = lower(trim(email_param));

  if collaborator_user_id is null then
    raise exception 'No registered user exists with that email' using errcode = 'P0002';
  end if;

  if collaborator_team_id is not null then
    raise exception 'User already belongs to a team' using errcode = '23505';
  end if;

  update public.profiles
  set team_id = inviter_team_id
  where user_id = collaborator_user_id and team_id is null;

  if not found then
    raise exception 'User could not be added to team' using errcode = '40001';
  end if;

  return true;
end;
$$;

revoke all on function public.handle_new_user() from public;
revoke all on function public.invite_collaborator(text) from public;
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.invite_collaborator(text) from anon, authenticated;
grant execute on function public.invite_collaborator(text) to authenticated;

alter table public.categories enable row level security;
alter table public.teams enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.patterns enable row level security;

create policy "Anyone can view categories"
  on public.categories for select
  to anon, authenticated
  using (true);

create policy "Users can view their profile and teammates"
  on public.profiles for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or team_id = (select private.current_user_team_id())
  );

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (
    user_id = (select auth.uid())
    and (
      team_id is null
      or team_id is not distinct from (select private.current_user_team_id())
      or (select private.is_current_user_team_owner(team_id))
    )
  );

create policy "Users can view their teams"
  on public.teams for select
  to authenticated
  using (
    id = (select private.current_user_team_id())
    or owner_id = (select auth.uid())
  );

create policy "Users can create teams they own"
  on public.teams for insert
  to authenticated
  with check (owner_id = (select auth.uid()));

create policy "Users can view own and shared projects"
  on public.projects for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or (shared and team_id = (select private.current_user_team_id()))
  );

create policy "Users can create own projects"
  on public.projects for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and (
      (not shared and team_id is null)
      or (shared and team_id = (select private.current_user_team_id()))
    )
  );

create policy "Users can delete own projects"
  on public.projects for delete
  to authenticated
  using (user_id = (select auth.uid()));

create policy "Users can view own and shared patterns"
  on public.patterns for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or team_id = (select private.current_user_team_id())
  );

create policy "Users can create own patterns"
  on public.patterns for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and (
      team_id is null
      or team_id = (select private.current_user_team_id())
    )
    and exists (
      select 1 from public.projects
      where projects.id = project_id and projects.user_id = (select auth.uid())
    )
  );

grant select on public.categories to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert on public.teams to authenticated;
grant select, insert, delete on public.projects to authenticated;
grant select, insert on public.patterns to authenticated;
