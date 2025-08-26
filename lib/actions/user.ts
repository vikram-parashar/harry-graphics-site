'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { revalidatePath } from 'next/cache'
import { CartItemType, RelationTypes } from '../types'

export async function addAddress(
  user_id: string,
  new_address: RelationTypes['User']['addresses']
) {
  const supabase = await createClient()

  const { error } = await supabase.from('users').update({
    addresses: new_address,
  }).eq('id', user_id)
  if (error) {
    return {
      success: false,
      msg: error.message
    }
  }
  return {
    success: true,
    msg: 'Address added successfully'
  }
}

export async function updateUsername(id: string, name: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('users').update({
    name,
  }).eq('id', id)
  if (error) {
    return {
      success: false,
      msg: error.code
    }
  }
  return {
    success: true,
    msg: 'Name updated successfully'
  }
}

export async function updatePhone(id: string, phone: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')
  if (user.id !== id) redirect('/error')

  const { error } = await supabase.from('users').update({
    phone
  }).eq('id', id)
  if (error) {
    return {
      success: false,
      msg: error.code
    }
  }
  return {
    success: true,
    msg: 'Phone updated successfully'
  }
}
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
  redirect('/explore')
}
export async function createOrderAction(formData: {
  phone: string
  address_line_1: string,
  address_line_2?: string | undefined,
  city: string,
  pincode: string,
  payment_receipt: File,
  note?: string | undefined
}, user_id: string, cart: CartItemType[], payment: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('orders').insert({
    user_id,
    cart,
    phone: formData.phone,
    address_line_1: formData.address_line_1,
    address_line_2: formData.address_line_2,
    city: formData.city,
    pincode: formData.pincode,
    payment: payment,
    note: formData.note || '',
    status: 'PENDING',
  })

  if (error) {
    console.log(error)
    return {
      success: false,
      msg: error.code
    }
  }
  redirect('/user/orders')
}
