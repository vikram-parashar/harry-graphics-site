CREATE TABLE orders( 
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id  UUID NOT NULL REFERENCES public.users(id) on DELETE CASCADE,
  cart JSONB,
  note TEXT,
  payment TEXT,
  status TEXT,
  order_number INT4,
  tracking_link TEXT,
  ordered_on TEXT
);
alter table orders enable row level security;

create policy "Enable read access for authenticated"
on "public"."orders"
as PERMISSIVE
for SELECT
to authenticated
using (
  true
);

create policy "Enable insert access to authenticated"
on "public"."orders"
as PERMISSIVE
for INSERT
to authenticated
with check (
  true
);

create policy "Enable update access to owner and update"
on "public"."orders"
as PERMISSIVE
for UPDATE
to authenticated
using (true)
with check (
  auth.uid() = user_id OR
  auth.email() = 'vikramparashar24@gmail.com'::text OR 
  auth.email() = 'harrygraphics21@gmail.com'::text
);
