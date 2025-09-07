'use server'
import { createClient } from '@/supabase/utils/server'

export async function createRecord(data: Record<string, any>, sheetID: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('sheet_rows').insert([
    {
      data,
      sheet_id: sheetID,
    },
  ])

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
    record: data,
  }
}
export async function deleteRecord(recordId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('sheet_rows')
    .delete()
    .eq('id', recordId)

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.message,
    }
  }
  return {
    success: true,
    msg: 'Deleted successfully',
  }
}
