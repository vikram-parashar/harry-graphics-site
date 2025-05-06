CREATE TABLE products( 
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  name TEXT,
  price FLOAT4,
  min_quantity INT4,
  image TEXT,
  unit TEXT,
  options JSON DEFAULT '{}',
  category_id  UUID NOT NULL REFERENCES public.categories(id) on DELETE CASCADE
);
alter table products enable row level security;

create policy "Enable read access for all users for products"
on "public"."products"
as PERMISSIVE
for SELECT
to public
using (
  true
);

create policy "Enable insert access to only admin for products"
on "public"."products"
as PERMISSIVE
for INSERT
to authenticated
with check (
  (auth.email() IS NOT NULL) AND 
  (auth.email() = 'vikramparashar24@gmail.com'::text OR 
   auth.email() = 'harrygraphics21@gmail.com'::text)
);

create policy "Enable update access to only admin for products"
on "public"."products"
as PERMISSIVE
for UPDATE
to authenticated
using (true)
with check (
  (auth.email() IS NOT NULL) AND 
  (auth.email() = 'vikramparashar24@gmail.com'::text OR 
   auth.email() = 'harrygraphics21@gmail.com'::text)
);

create policy "Enable delete access to only admin for products"
on "public"."products"
as PERMISSIVE
for DELETE
to authenticated
using (
  (auth.email() IS NOT NULL) AND 
  (auth.email() = 'vikramparashar24@gmail.com'::text OR 
   auth.email() = 'harrygraphics21@gmail.com'::text)
);
