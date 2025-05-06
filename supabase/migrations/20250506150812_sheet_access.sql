CREATE TABLE sheet_access( 
  sheet_id UUID NOT NULL REFERENCES public.sheets(id) on DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) on DELETE CASCADE
);
alter table sheet_access enable row level security;

create policy "Enable read access for all users for sheet_access"
on "public"."sheet_access"
as PERMISSIVE
for SELECT
to public
using (
  true
);

create policy "Enable insert access to public for sheet_access"
on "public"."sheet_access"
as PERMISSIVE
for INSERT
to public
with check (
  true
);
