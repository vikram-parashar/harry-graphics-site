insert into storage.buckets (id, name)
values ('images', 'images');

CREATE POLICY "all access to images 1ffg0oo_0" ON storage.objects FOR SELECT TO public USING (true);
CREATE POLICY "all access to images 1ffg0oo_1" ON storage.objects FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "all access to images 1ffg0oo_2" ON storage.objects FOR UPDATE TO public USING (true);
CREATE POLICY "all access to images 1ffg0oo_3" ON storage.objects FOR DELETE TO public USING (true);
