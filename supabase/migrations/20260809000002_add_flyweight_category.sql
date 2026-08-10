insert into public.categories (name)
values ('flyweight')
on conflict (name) do nothing;
