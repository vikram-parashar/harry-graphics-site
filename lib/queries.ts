import { cache } from 'react'
import { createClient } from "@/supabase/utils/server";

export const getCarousels = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('carousels')
    .select()
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching carousels:', error)
    return []
  }

  return data
})

export const getCategories = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select().order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
})


export const getCustomers = cache(async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select().order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }

  return data
})

export const getProductsByCategory = cache(async (catId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`*, categories(name)`).eq('category_id', catId).order('updated_at', { ascending: false });
  console.log(data)

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }

  return data
})

export const getCategoryById = cache(async (id: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('name').eq('id', id).single()

  if (error) {
    console.error('Error fetching categories:', error)
    return {}
  }

  return data
})
