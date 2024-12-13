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
  image: string,
  image_full: string,
  category_id: string,
  categories: CategoryType,
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
  id: string,
  created_at: string,
  updated_at: string,
  name: string,
  price: number,
  image: string,
  image_full: string,
  description: string,
  category_id: string
}
export type UserType = {
  id: string,
  created_at: string,
  updated_at: string,
  name: string,
  email: string,
  phone: string,
  address_line_1: string,
  address_line_2: string,
  city: string,
  pincode: string,
}
export type CartItemType = {
  product: ProductType,
  quantity: number,
}
export type OrderType = {
  id: string,
  created_at: string,
  updated_at: string,
  user_id: string,
  cart: CartItemType[],
  note: string,
  payment: string,
  payment_full?: string,
  status: string,
  order_number: number,
  ordered_on: string
  user?: UserType,
  tracking_link: string,
}
export type OrganizationType = {
  id: string,
  created_at: string,
  updated_at: string,
  name: string,
  payment: string,
  payment_full?: string,
  status: string,
  owner_id: string,
  ordered_on: string
}
export type SheetType = {
  id: string,
  created_at: string,
  updated_at: string,
  name: string,
  columns: ColumnType[],
  data: RecordType[],
  owner_id: string,
  users?: UserType
}
export type RecordType = {
  created_by: string,
  index: number,
  [key: string]: string | number,
}
export type ColumnType = {
  id: number,
  name: string,
  type: string
}
