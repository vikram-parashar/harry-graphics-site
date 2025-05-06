'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/utils/server'
import { revalidatePath } from 'next/cache'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function insert(data: Object, tableName: string, revalidate: string | null, redirectPath: string | null) {
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
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
export async function removeImages(urls: string[]) {
  const keys: string[] = [];
  urls.forEach(url => {
    if (url) {
      const ky = url.split('/').slice(3).join('/');
      keys.push(ky);
    }
  });

  if (keys.length) {
    await fetch(`${baseUrl}/api/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys }),
    });
  }
}

export async function removeImageFolder(folder: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .storage
    .from('images')
    .list(folder)

  if (error) {
    console.log(error)
    return {
      success: false,
      msg: error.message
    }
  }

  const urls = data.map((file: any) => `${folder}/${file.name}`)
  await removeImages(urls)
  return {
    success: true
  }
}
