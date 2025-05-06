CREATE TABLE organizations( 
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  name TEXT,
  status TEXT,
  ordered_on TEXT,
  payment TEXT,
  owner_id  UUID NOT NULL REFERENCES public.users(id) on DELETE CASCADE
);
alter table organizations enable row level security;

create policy "Enable read access for all users for organizations"
on "public"."organizations"
as PERMISSIVE
for SELECT
to public
using (
  true
);

create policy "Enable insert access to public for organizations"
on "public"."organizations"
as PERMISSIVE
for INSERT
to public
with check (
  true
);

create policy "Enable update access to only admin and owner for organizations"
on "public"."organizations"
as PERMISSIVE
for UPDATE
to public
using (true)
with check (
  (auth.uid()   = owner_id OR
  auth.email() = 'vikramparashar24@gmail.com'::text OR 
  auth.email() = 'harrygraphics21@gmail.com'::text)
);

create policy "Enable delete access to only owner of organizations"
on "public"."organizations"
as PERMISSIVE
for DELETE
to public
using (
  auth.uid() = owner_id
);

