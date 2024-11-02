CREATE TABLE products( 
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  name TEXT,
  price TEXT,
  image TEXT,
  description TEXT,
  category_id  UUID NOT NULL REFERENCES public.categories(id) on DELETE CASCADE
);
