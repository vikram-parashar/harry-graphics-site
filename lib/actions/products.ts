'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { ProductType } from '../types'


export async function insertProduct(
  id: string,
  name: string,
  price: string,
  image: string,
  description: string | undefined,
  category_id: string,
) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('products').insert({
    id,
    name,
    price,
    image,
    description,
    category_id
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath(`/dashboard/products`)
}
export async function updateProduct(
  id: string,
  name: string,
  price: string,
  image: string,
  description: string | undefined,
  category_id: string,
) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('products').update({
    name,
    price,
    image,
    updated_at: new Date(Date.now()).toISOString(),
    description,
    category_id
  }).eq('id', id)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath(`/dashboard/products`)
}

export async function deleteProduct(
  id: string,
  image: string,
) {

  const supabase = createClient(cookies())

  const imageRes = await supabase.storage.from('images').remove([image])
  if (imageRes.error) {
    console.log(imageRes.error)
    return { success: false }
  }

  const tableRes = await supabase.from('products').delete().eq('id', id)
  if (tableRes.error) {
    console.log(tableRes.error)
    return { success: false }
  }

  revalidatePath(`/dashboard/products`)
  return { success: true }
}

export async function updateOrder(products: ProductType[]) {
  const supabase = createClient(cookies())

  products.forEach(async (item, index) => {
    const { error } = await supabase.from('products').update({
      updated_at: new Date(Date.now() - index * 10000).toISOString(),
    }).eq('id', item.id)

    if (error) return { success: false }
  })

  return {
    success: true,
  }
}

