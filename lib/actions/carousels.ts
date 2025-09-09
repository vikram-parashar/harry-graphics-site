'use server'
import { createClient } from '@/supabase/utils/server'
import { revalidateTag } from 'next/cache'
import { removeImages } from './image'

export async function deleteCarousel(id: string, image: string | null) {
  const supabase = await createClient()
  const { error } = await supabase.from('carousels').delete().eq('id', id)
  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }

  if (image) {
    removeImages([image])
  }
  revalidateTag('carousels')
  return {
    success: true,
    msg: 'Deleted successfully',
  }
}

export async function createCarousel(
  title: string,
  link: string,
  points: string[],
  image: string
) {
  const supabase = await createClient()
  const { error } = await supabase.from('carousels').insert({
    title,
    link,
    points,
    image,
  })
  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }
  revalidateTag('carousels')
  return {
    success: true,
    msg: 'Created successfully',
  }
}

export async function updateCarousel(
  id: string,
  title: string,
  link: string,
  points: string[],
  image: string
) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('carousels')
    .update({
      title,
      link,
      points,
      image,
    })
    .eq('id', id)

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }

  revalidateTag('carousels')
  return {
    success: true,
    msg: 'Updated successfully',
  }
}
