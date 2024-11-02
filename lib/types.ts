export type CategoryType = {
  id: string,
  created_at: string,
  updated_at: string,
  name: string,
  thumbnail_image: string,
  header_image: string,
  header_image_mobile: string,
  thumbnail_image_full: string,
  header_image_full: string,
  header_image_mobile_full: string,
}
export type CarouselType = {
  id: string,
  created_at: string,
  updated_at: string,
  category_id: string,
  image: string,
}
export type CustomerType = {
  id: string,
  created_at: string,
  updated_at: string,
  web_link: string,
  image: string,
  image_full: string,
}
export type ProductType = {
  id :string,
  created_at :string,
  updated_at :string,
  name :string,
  price :string,
  image :string,
  description :string,
  category_id  :string
}
