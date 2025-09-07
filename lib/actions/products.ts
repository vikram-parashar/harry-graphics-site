'use server'
import { createClient } from '@/supabase/utils/server'
import { removeImages } from './image_server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Json } from '../database.types'

export async function deleteProduct(id: string, image: string | null) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
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
  revalidateTag('products')
  revalidatePath('/category/[catId]')
  return {
    success: true,
    msg: 'Deleted successfully',
  }
}

export async function createProduct(
  category_id: string,
  name: string,
  price: number,
  min_quantity: number,
  unit: string,
  options: Json,
  image: string
) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').insert({
    name,
    price,
    min_quantity,
    unit,
    options,
    image,
    category_id,
  })
  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }
  revalidateTag('products')
  revalidatePath('/category/[catId]')
  return {
    success: true,
    msg: 'Created successfully',
  }
}

export async function updateProduct(
  id: string,
  name: string,
  price: number,
  min_quantity: number,
  unit: string,
  options: Json,
  image: string
) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('products')
    .update({
      name,
      price,
      min_quantity,
      unit,
      options,
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

  revalidateTag('products')
  revalidatePath('/category/[catId]')
  return {
    success: true,
    msg: 'Updated successfully',
  }
}
