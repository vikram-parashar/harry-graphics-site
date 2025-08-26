CREATE TABLE users(
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  addresses JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Trigger to update `updated_at` column on row update
create or replace function update_users_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on public.users
for each row
execute procedure update_users_updated_at();

-- Trigger to sync auth.users to public.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable Row Level Security (RLS) on users table
alter table users enable row level security;

create policy "Users can read own row"
on users
for select
using (auth.uid() = id);

create policy "Users can update own row"
on users
for update
using (auth.uid() = id);
