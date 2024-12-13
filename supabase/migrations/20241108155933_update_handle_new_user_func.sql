create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, name, email, phone, address_line_1, address_line_2, city, pincode)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'email',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'address_line_1',
    new.raw_user_meta_data->>'address_line_2',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'pincode'
  );
  return new;
end;
$$;
