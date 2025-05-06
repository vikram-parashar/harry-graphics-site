'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { revalidatePath } from 'next/cache'
import { CartItemType, ProductType } from '../types'
import { getCartItems } from '../queries'


export async function updateUser(
  id: string,
  name: string,
  phone: string,
  address_line_1: string | undefined,
  address_line_2: string | undefined,
  city: string | undefined,
  pincode: string | undefined,
) {
  const supabase = await createClient()

  const { error } = await supabase.from('users').update({
    updated_at: new Date(Date.now()).toISOString(),
    name,
    phone,
    address_line_1,
    address_line_2,
    city,
    pincode,
  }).eq('id', id)

  if (error) {
    console.log(error)
    redirect('/error')
  }
  revalidatePath('/')
  redirect('/')
}
export async function addToCart(product: ProductType, options: { [key: string]: string }, quantity: number,customPrice:number) {
  const supabase = await createClient();
  product.options = JSON.stringify(options);
  product.price = customPrice;

  const getCart = await getCartItems();
  const cart: CartItemType[] = getCart.cart
  cart.push({
    product,
    quantity
  })

  /**** update cart ****/
  const updateCart = await supabase.from('users').update({
    cart
  }).eq('id', getCart.userId);

  if (updateCart.error) {
    console.log(updateCart.error)
    return false
  }

  revalidatePath('/user/cart')
  return true
}


export async function removeFromCart(index: number, cart: CartItemType[]) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  /**** update cart ****/
  cart.splice(index, 1)
  const updateCart = await supabase.from('users').update({
    cart
  }).eq('id', data.session.user.id)

  if (updateCart.error) {
    console.log(updateCart.error)
    redirect('/error')
  }

  revalidatePath('/user/cart')
}
export async function updateQuantityInCart(index: number, quantity: number, cart: CartItemType[]) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  /**** update cart ****/
  cart[index].quantity = quantity;
  const updateCart = await supabase.from('users').update({
    cart
  }).eq('id', data.session.user.id)

  if (updateCart.error) {
    console.log(updateCart.error)
    redirect('/error')
  }

  revalidatePath('/user/cart')
}
