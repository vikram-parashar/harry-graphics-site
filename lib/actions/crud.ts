'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'


export async function insert(data: Object, tableName: string, revalidate: string | null, redirectPath: string | null) {
  const supabase = createClient(cookies())
  const res = await supabase.from(tableName).insert({
    ...data
  }).select()

  if (res.error) {
    console.log(res.error)
    return {
      success: false,
      msg: res.error.message
    }
  }

  revalidate && revalidatePath(revalidate)
  redirectPath && redirect(redirectPath)
  return {
    success: true,
    data: res.data
  }
}
export async function update(id: string, data: Object, tableName: string, revalidate: string | null, redirectPath: string | null) {
  const supabase = createClient(cookies())
  const res = await supabase.from(tableName).update({
    ...data
  }).eq('id', id)

  if (res.error) {
    console.log(res.error)
    return {
      success: false,
      msg: res.error.message
    }
  }

  revalidate && revalidatePath(revalidate)
  redirectPath && redirect(redirectPath)
  return {
    success: true,
  }
}

export async function removeRow(id: string, tableName: string, revalidate: string | null) {
  const supabase = createClient(cookies())
  const res = await supabase.from(tableName).delete().eq('id', id)

  if (res.error) {
    console.log(res.error)
    return {
      success: false,
      msg: res.error.message
    }
  }

  revalidate && revalidatePath(revalidate)
  return {
    success: true,
  }
}
export async function removeImages(urls:string[]) {
  const supabase = createClient(cookies())

  await supabase.storage.from('images').remove(urls)
}
