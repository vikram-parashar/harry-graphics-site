CREATE TABLE categories( 
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  name TEXT,
  thumbnail_image TEXT,
  header_image Text,
  header_image_mobile Text
);
