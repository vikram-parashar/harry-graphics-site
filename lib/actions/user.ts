'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/utils/server'
import { AddressType, CartItemType } from '../types'

export async function addAddress(
  user_id: string,
  new_addresses: AddressType[]
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({
      addresses: new_addresses,
    })
    .eq('id', user_id)
  if (error) {
    return {
      success: false,
      msg: error.message,
    }
  }
  return {
    success: true,
    msg: 'Address added successfully',
  }
}

export async function updateUsername(id: string, name: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('users')
    .update({
      name,
    })
    .eq('id', id)
  if (error) {
    return {
      success: false,
      msg: error.message,
    }
  }
  return {
    success: true,
    msg: 'Name updated successfully',
  }
}

export async function updatePhone(id: string, phone: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')
  if (user.id !== id) redirect('/error')

  const { error } = await supabase
    .from('users')
    .update({
      phone,
    })
    .eq('id', id)
  if (error) {
    return {
      success: false,
      msg: error.message,
    }
  }
  return {
    success: true,
    msg: 'Phone updated successfully',
  }
}
export async function createOrderAction(
  cart: CartItemType[],
  address: AddressType,
  payment: string,
  total_amount: number,
  note?: string
) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  if (cart.length === 0) {
    return {
      success: false,
      msg: 'Cart is empty',
    }
  }

  const { error } = await supabase.from('orders').insert({
    user_id: user.id,
    cart,
    address: address,
    payment: payment,
    note: note,
    status: 'PENDING',
    total_amount: total_amount,
  })

  if (error) {
    console.log(error)
    return {
      success: false,
      msg: error.message,
    }
  }
  return {
    success: true,
  }
}
