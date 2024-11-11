'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CartItemType } from '../types'
import { handleMail } from './mail'

export async function insertOrder(id: string, note: string, cart: CartItemType[], payment: string, ordered_on: string) {
  const supabase = createClient(cookies())

  const userRes = await supabase.auth.getSession();
  if (userRes.error || !userRes.data.session) return {
    success: false,
    msg: 'Please login again.',
  }
  const user_id = userRes.data.session.user.id;

  const status = 'Unconfirmed'

  const ordersRes = await supabase.from('orders').select('')
  if (ordersRes.error) return {
    success: false,
    msg: 'Please check your connection.',
  }
  const order_number = ordersRes.data.length + 10000;

  const { error } = await supabase.from('orders').insert({
    id,
    user_id,
    cart,
    note,
    payment,
    status,
    order_number,
    ordered_on
  })
  if (error) {
    console.log(error)
    return {
      success: false,
      msg: 'Can\'t create order. Try again later.',
    }
  }

  handleMail("NEW ORDER CREATED",`
    <h1>Order No.${order_number}</h1>
    <p>From ${userRes.data.session.user.email}</p>
    <a href="harrygraphics.in/dashboard/orders/${id}">Check Out</a>
  `)

  // now empty user cart
  await supabase.from('users').update({
    cart: []
  }).eq('id', user_id);

  revalidatePath(`/user/orders`)
  redirect(`/user/orders`)
}

export async function cancelOrder(id: string,order_number:number) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('orders').update({
    status: 'Cancelled',
  }).eq('id', id)

  if (error) return {
    success: false,
    msg: 'Server Error. Try again later.',
  }

  handleMail("ORDER CANCELLED",`
    <h1>Order No.${order_number}</h1>
    <a href="harrygraphics.in/dashboard/orders/${id}">Check Out</a>
  `)

  revalidatePath(`/user/orders`)
  return {
    success: true,
    msg: 'Order Cancelled',
  }
}
export async function updateStatus(id: string,status:string) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('orders').update({
    status
  }).eq('id', id)

  if (error) return {
    success: false,
    msg: 'Server Error. Try again later.',
  }

  return {
    success: true,
    msg: 'Status Updated',
  }
}
export async function updateTrackingLink(id: string,tracking_link:string) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('orders').update({
    tracking_link
  }).eq('id', id)

  if (error) return {
    success: false,
    msg: 'Server Error. Try again later.',
  }

  return {
    success: true,
    msg: 'Link Updated',
  }
}
