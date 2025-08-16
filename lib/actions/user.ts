'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { revalidatePath } from 'next/cache'
import { Database } from "@/lib/types"
type CartItemType = Database['public']['Tables']['users']['Row']['cart']
type ProductType = Database['public']['Tables']['products']['Row']
import { getCartItems } from '../queries'


export async function updateUser(
  id: string,
  name: string,
  phone: string,
  address_line_1: string | undefined,
  address_line_2: string | undefined,
  city: string | undefined,
  pincode: string | undefined,
) {
  const supabase = await createClient()

  const { error } = await supabase.from('users').update({
    updated_at: new Date(Date.now()).toISOString(),
    name,
    phone,
    address_line_1,
    address_line_2,
    city,
    pincode,
  }).eq('id', id)

  if (error) {
    console.log(error)
    redirect('/error')
  }
  revalidatePath('/')
  redirect('/')
}
