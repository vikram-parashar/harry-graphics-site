CREATE TABLE users(
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  name TEXT ,
  email TEXT NOT NULL UNIQUE,
  phone TEXT , 
  address_line_1 TEXT,
  address_line_2 TEXT,
  city TEXT,
  pincode TEXT,
  cart JSONB NOT NULL DEFAULT '[]'::jsonb
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email)
  values (new.id,new.email);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table users enable row level security;

create policy "Enable users to view their own data only"
on "public"."users"
as PERMISSIVE
for SELECT
to authenticated
using (
  (select auth.uid()) = id
);

create policy "Enable insert for users based on user_id"
on "public"."users"
as PERMISSIVE
for UPDATE
to authenticated
using (true)
with check (
  (select auth.uid()) = id
);

create policy "Enable users to delete their own data only"
on "public"."users"
as PERMISSIVE
for DELETE
to authenticated
using (
  (select auth.uid()) = id
);
