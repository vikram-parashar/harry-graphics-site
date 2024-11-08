DROP POLICY "Enable users to view their own data only" ON public.users;

create policy "Enable read access for all users"
on "public"."users"
as PERMISSIVE
for SELECT
to public
using (
  true
);
