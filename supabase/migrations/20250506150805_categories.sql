CREATE TABLE categories( 
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  thumbnail_image TEXT,
  heading TEXT
);

create or replace function update_categories_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_categories_updated_at
before update on categories
for each row
execute procedure update_categories_updated_at();

alter table categories enable row level security;
-- Read
create policy "Allow read access to all"
on categories
for select
using (true);

-- Insert
create policy "Admins can insert categories"
on categories
for insert
with check (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));

-- Update
create policy "Admins can update categories"
on categories
for update
using (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));

-- Delete
create policy "Admins can delete categories"
on categories
for delete
using (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));

