import { UUID } from 'crypto'
import { Tables } from './database.types'

export type ProductOptionType = {
  [key: string]: { name: string; price?: number }[]
}

export type CartItemType = {
  product: Tables<'products'>
  quantity: number
  options: { [key: string]: string }
}
export type AddressType = {
  address_line_1: string
  address_line_2?: string
  city: string
  pincode: string
}
export type ColumnType = {
  id: string
  name: string
  position: number
  description?: string
}
