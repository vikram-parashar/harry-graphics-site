'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CustomerType } from '../types'


export async function insertCustomer(id: string, web_link: string, image: string) {
  const supabase = createClient(cookies())


  const { error } = await supabase.from('customers').insert({
    id,
    web_link,
    image
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath(`/dashboard/customers`)
}

export async function deleteCustomer(id: string, image: string) {
  const supabase = createClient(cookies())

  const imageRes = await supabase.storage.from('images').remove([image])
  if (imageRes.error) {
    console.log(imageRes.error)
    return { success: false }
  }

  const tableRes = await supabase.from('customers').delete().eq('id', id)
  if (tableRes.error) {
    console.log(tableRes.error)
    return { success: false }
  }

  revalidatePath(`/dashboard/customers`)
    return { success: true }
}

export async function updateOrder(customers: CustomerType[]) {
  const supabase = createClient(cookies())

  customers.forEach(async (item, index) => {
    const { error } = await supabase.from('customers').update({
      updated_at: new Date(Date.now() - index * 10000).toISOString(),
    }).eq('id', item.id)

    if (error) return {
      success: false,
    }
  })

  return {
    success: true,
  }
}

