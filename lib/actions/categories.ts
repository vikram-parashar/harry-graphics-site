'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CategoryType, CustomerType } from '../types'


export async function insertCategory(
  id: string,
  name: string,
  header_image: string,
  header_image_mobile: string,
  thumbnail_image: string) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('categories').insert({
    id,
    name,
    header_image,
    header_image_mobile,
    thumbnail_image
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath(`/dashboard/categories`)
}
export async function updateCategory(
  id: string,
  name: string,
  header_image: string,
  header_image_mobile: string,
  thumbnail_image: string) {
  const supabase = createClient(cookies())

  const { error } = await supabase.from('categories').update({
    name,
    header_image,
    header_image_mobile,
    thumbnail_image
  }).eq('id',id)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath(`/dashboard/categories`)
}

export async function deleteCategory(id: string,
  header_image: string,
  header_image_mobile: string,
  thumbnail_image: string) {

  const supabase = createClient(cookies())

  const imageResHM = await supabase.storage.from('images').remove([header_image_mobile])
  if (imageResHM.error) {
    console.log(imageResHM.error)
    return { success: false }
  }
  const imageResH = await supabase.storage.from('images').remove([header_image])
  if (imageResH.error) {
    console.log(imageResH.error)
    return { success: false }
  }
  const imageResT = await supabase.storage.from('images').remove([thumbnail_image])
  if (imageResT.error) {
    console.log(imageResT.error)
    return { success: false }
  }

  const tableRes = await supabase.from('categories').delete().eq('id', id)
  if (tableRes.error) {
    console.log(tableRes.error)
    return { success: false }
  }

  revalidatePath(`/dashboard/categories`)
  return { success: true }
}

export async function updateOrder(categories: CategoryType[]) {
  const supabase = createClient(cookies())

  categories.forEach(async (item, index) => {
    const { error } = await supabase.from('categories').update({
      updated_at: new Date(Date.now() - index * 10000).toISOString(),
    }).eq('id', item.id)

    if (error) return { success: false }
  })

  return {
    success: true,
  }
}

