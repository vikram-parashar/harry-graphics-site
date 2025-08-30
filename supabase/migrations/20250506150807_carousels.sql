CREATE TABLE carousels( 
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  image TEXT NOT NULL,
  link TEXT NOT NULL,
  title TEXT NOT NULL,
  points TEXT[] NOT NULL
);

create or replace function update_carousels_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_carousels_updated_at
before update on carousels
for each row
execute procedure update_carousels_updated_at();

alter table carousels enable row level security;
-- Select
create policy "Allow read access to all"
on carousels
for select
using (true);

-- Insert
create policy "Admins can insert carousels"
on carousels
for insert
with check (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));

-- Update
create policy "Admins can update carousels"
on carousels
for update
using (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));

-- Delete
create policy "Admins can delete carousels"
on carousels
for delete
using (exists (
  select 1
  from users
  where id = auth.uid()
  and is_admin = true
));
