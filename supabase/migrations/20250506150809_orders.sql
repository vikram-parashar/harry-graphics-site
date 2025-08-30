CREATE TABLE orders( 
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id  UUID REFERENCES public.users(id) on DELETE CASCADE,
  cart JSONB NOT NULL,
  note TEXT,
  payment TEXT NOT NULL,
  status TEXT NOT NULL,
  order_number bigint generated always as identity,
  tracking_link TEXT,
  address JSONB NOT NULL,
  total_amount NUMERIC NOT NULL
);

create or replace function update_orders_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_orders_updated_at
before update on orders
for each row
execute procedure update_orders_updated_at();

alter table orders enable row level security;
-- Select
create policy "Users can read their own orders"
on orders
for select
using (
  auth.uid() = user_id
  or exists (
    select 1 from users where id = auth.uid() and is_admin = true
  )
);

-- Insert
create policy "Users can insert their own orders"
on orders
for insert
with check (auth.uid() = user_id);

-- Update
create policy "Admins can update any order"
on orders
for update
using (exists (select 1 from users where id = auth.uid() and is_admin = true));
