ALTER TABLE public.carousels 
DROP COLUMN IF EXISTS "category_id";

ALTER TABLE public.carousels
ADD COLUMN IF NOT EXISTS "link" TEXT NOT NULL DEFAULT '/';

ALTER TABLE public.carousels
ADD COLUMN IF NOT EXISTS "title" TEXT NOT NULL DEFAULT '';

ALTER TABLE public.carousels
ADD COLUMN IF NOT EXISTS "points" TEXT[] NOT NULL DEFAULT '{}';

ALTER TABLE public.categories
ADD COLUMN IF NOT EXISTS "heading" TEXT NOT NULL DEFAULT '';

ALTER TABLE public.categories 
DROP COLUMN IF EXISTS "header_image";

ALTER TABLE public.categories 
DROP COLUMN IF EXISTS "header_image_mobile";

ALTER TABLE public.users 
DROP COLUMN IF EXISTS "cart";
