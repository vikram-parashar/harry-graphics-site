'use server'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { removeImages, update } from './crud'
import { SheetType } from '../types'

export const handleDataInsert = async (Record: any, sheetId: string) => {
  const supabase = createClient(cookies())


  const { data, error } = await supabase.from('sheets').select('data').eq('id', sheetId).single()
  if (error) {
    console.log(error)
    return {
      success: false,
      msg: error.message
    }

  }
  const oldData: {
    index: number,
    created_by: string,
    [key: string]: any
  }[] = data.data

  /**** get user data ****/
  const userRes = await supabase.auth.getSession()
  Record['created_by'] = userRes.data.session?.user.id || cookies().get('anon-user')?.value

  //set entry index
  let index = 0;
  for (let i = 0; i < oldData.length; i++) {
    index = Math.max(index, oldData[i].index || 0)
  }
  Record['index'] = index + 1

  const newData = [Record, ...oldData]
  const res = await update(sheetId, { data: newData }, 'sheets', '/user/id-records/new-record/[sheetId]', null)
  return res
}

export const handleDataUpdate = async (Record: any, sheetId: string) => {
  const supabase = createClient(cookies())

  const { data, error } = await supabase.from('sheets').select('data').eq('id', sheetId).single()
  if (error) {
    console.log(error)
    return {
      success: false,
      msg: error.message
    }

  }

  const oldData = data.data
  const newData = oldData.map((row: any) => {
    if (row.index === Record.index) {
      return Record
    }
    return row
  })

  const res = await update(sheetId, { data: newData }, 'sheets', '/user/id-records/new-record/[sheetId]', null)
  return res
}
export const handleDataDelete = async (Record: any, sheetId: string) => {
  const supabase = createClient(cookies())

  const res = await supabase.from('sheets').select().eq('id', sheetId).single()
  if (res.error) {
    console.log(res.error)
    return {
      success: false,
      msg: res.error.message
    }
  }

  const sheet: SheetType = res.data

  const oldData = sheet.data
  const newData = oldData.filter((row: any) => row.index !== Record.index)

  const imgToRemove = []

  for (const field of sheet.columns) {
    if (field.type === 'image') {
      imgToRemove.push(Record[field.id])
    }
  }

  await removeImages(imgToRemove)

  const updateRes = await update(sheetId, { data: newData }, 'sheets', '/user/id-records/new-record/[sheetId]', null)
  return updateRes
}
