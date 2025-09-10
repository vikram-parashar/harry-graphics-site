'use server'
import { createClient } from '@/supabase/utils/server'
import { removeImages } from './image'
import { revalidateTag } from 'next/cache'

export async function deleteCategory(id: string, image: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }

  removeImages([image])
  revalidateTag('categories')
  return {
    success: true,
    msg: 'Deleted successfully',
  }
}

export async function createCategory(
  name: string,
  heading: string,
  thumbnail_image: string
) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').insert({
    name,
    heading,
    thumbnail_image,
  })
  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }
  revalidateTag('categories')
  return {
    success: true,
    msg: 'Created successfully',
  }
}

export async function updateCategory(
  id: string,
  name: string,
  heading: string,
  thumbnail_image: string
) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .update({
      name,
      heading,
      thumbnail_image,
    })
    .eq('id', id)

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }

  revalidateTag('categories')
  return {
    success: true,
    msg: 'Updated successfully',
  }
}

export async function toggleCategoryVisibility(id: string, visible: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .update({
      is_visible: visible,
    })
    .eq('id', id)
  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }
  revalidateTag('categories')
  return {
    success: true,
    msg: 'Updated successfully',
  }
}
