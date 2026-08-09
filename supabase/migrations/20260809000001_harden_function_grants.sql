revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.invite_collaborator(text) from public, anon, authenticated;
grant execute on function public.invite_collaborator(text) to authenticated;

create index if not exists teams_owner_id_idx on public.teams (owner_id);
create index if not exists patterns_category_id_idx on public.patterns (category_id);
