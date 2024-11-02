'use client'

import { createClient } from "@/supabase/utils/client"

export const uploadImage = async (folder: string, id: string, file: File | undefined) => {
  const supabase = createClient()

  try {
    if (!file) {
      alert('image not selected!!')
      return {
        success: false,
      }
    }
    if (file.size > 5 * 1024 * 1024) { //5Mb
      alert(file.name + ' too big!!')
      return {
        success: false,
      }
    }
    const fileExt = file.name.split('.').pop()
    const filePath = `${folder}/${id}.${fileExt}`

    const { data, error: uploadError } = await supabase.storage.from('images')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      throw uploadError
    }
    return {
      success: true,
      path: data.path,
    }
  } catch (error) {
    console.log(error)
    alert('Error uploading image!')
    return {
      success: false,
    }
  }
}
