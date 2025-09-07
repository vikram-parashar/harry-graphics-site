'use server'
import { createClient } from '@/supabase/utils/server'
import { removeImages } from './image_server'
import { ColumnType } from '../types'
import { Json } from '../database.types'

export async function deleteSheet(id: string, image: string | null) {
  const supabase = await createClient()
  const { error } = await supabase.from('sheets').delete().eq('id', id)
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
  return {
    success: true,
    msg: 'Deleted successfully',
  }
}

export async function createSheet(name: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sheets')
    .insert({
      name,
    })
    .select()
    .single()

  if (error) {
    console.log(error, 'error')
    console.log(data, 'data')
    return {
      success: false,
      msg: error.message,
      sheet: data,
    }
  }
  return {
    success: true,
    msg: 'Created successfully',
  }
}

export async function updateSheet(
  id: string,
  title: string,
  link: string,
  points: string[],
  image: string
) {
  // const supabase = await createClient()
  // const { error } = await supabase
  //   .from('sheets')
  //   .update({
  //     link,
  //     points,
  //     image,
  //   })
  //   .eq('id', id)
  //
  // if (error) {
  //   console.log(error, 'error')
  //   return {
  //     success: false,
  //     msg: error.message,
  //   }
  // }

  return {
    success: true,
    msg: 'Updated successfully',
  }
}
export async function createColumn(columns: ColumnType[], sheetID: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('sheets')
    .update({
      columns: columns as Json,
    })
    .eq('id', sheetID)

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }
  return {
    success: true,
    msg: 'Created successfully',
  }
}
