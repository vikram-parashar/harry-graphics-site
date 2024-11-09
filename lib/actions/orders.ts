'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CartItemType } from '../types'

export async function insertOrder(id: string, note: string, cart: CartItemType[], payment: string,ordered_on:string) {
  const supabase = createClient(cookies())

  const userRes = await supabase.auth.getUser();
  if (userRes.error) return {
    success: false,
    msg: 'Please login again.',
  }
  const user_id = userRes.data.user.id;

  const status = 'Unconfirmed'

  const ordersRes = await supabase.from('orders').select('')
  if (ordersRes.error) return {
    success: false,
    msg: 'Please check your connection.',
  }
  const order_number = ordersRes.data.length + 10000;

  const { error } = await supabase.from('orders').insert({
    id,
    created_at: new Date(Date.now()).toISOString(),
    updated_at: new Date(Date.now()).toISOString(),
    user_id,
    cart,
    note: `# ${ordered_on}\n${note}`,
    payment,
    status,
    order_number,
    ordered_on
  })

  if (error) {
    console.log(error)
    if (ordersRes.error) return {
      success: false,
      msg: 'Can\'t create order. Try again later.',
    }
  }

  // now empty user cart
  await supabase.from('users').update({
    cart: []
  }).eq('id', user_id);

  revalidatePath(`/user/orders`)
  redirect(`/user/orders`)
}

export async function cancelOrder(id: string) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('orders').update({
    status: 'Cancelled',
  }).eq('id', id)

  if (error) return {
    success: false,
    msg: 'Server Error. Try again later.',
  }

  revalidatePath(`/user/orders`)
  return {
    success: true,
    msg: 'Order Cancelled',
  }
}
export async function addNote(id: string,note:string) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('orders').update({
    note 
  }).eq('id', id)

  if (error) return {
    success: false,
    msg: 'Server Error. Try again later.',
  }

  revalidatePath(`/user/orders`)
  return {
    success: true,
    msg: 'Note Added :>',
  }
}
