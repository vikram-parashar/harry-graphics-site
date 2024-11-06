'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { CarouselType } from '../types'


export async function insertCarousel(id: string, category_id: string, image: string) {
  const supabase = createClient(cookies())


  const { error } = await supabase.from('carousels').insert({
    id,
    category_id,
    image
  })

  if (error) {
    console.log("error",error)
    redirect('/error')
  }

  revalidatePath(`/dashboard/carousels`)
}

export async function deleteCarousel(id: string, image: string) {
  const supabase = createClient(cookies())

  const imageRes = await supabase.storage.from('images').remove([image])
  if (imageRes.error) {
    console.log(imageRes.error)
    return { success: false }
  }

  const tableRes = await supabase.from('carousels').delete().eq('id', id)
  if (tableRes.error) {
    console.log(tableRes.error)
    return { success: false }
  }

  revalidatePath(`/dashboard/carousels`)
  return { success: true }
}

export async function updateOrder(carousels: CarouselType[]) {
  const supabase = createClient(cookies())

  carousels.forEach(async (item, index) => {
    const { error } = await supabase.from('carousels').update({
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

