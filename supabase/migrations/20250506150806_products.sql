CREATE TABLE products( 
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  price FLOAT4,
  min_quantity INT4,
  image TEXT,
  unit TEXT,
  options JSON DEFAULT '{}',
  category_id  UUID REFERENCES public.categories(id) on DELETE CASCADE
);

create or replace function update_products_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_products_updated_at
before update on products
for each row
execute procedure update_products_updated_at();

alter table products enable row level security;
-- Select
create policy "Allow read access to all"
on products
for select
using (true);

-- Insert
create policy "Admins can insert products"
on products
for insert
with check (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));

-- Update
create policy "Admins can update products"
on products
for update
using (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));

-- Delete
create policy "Admins can delete products"
on products
for delete
using (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));
