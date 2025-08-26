import { cache } from 'react'
import { createClient } from "@/supabase/utils/server";
import { redirect } from 'next/navigation';

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

export const getCategoryById = cache(async (id: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select().eq('id', id).single()

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
    .select(`*, categories(name)`).eq('category_id', catId).order('updated_at', { ascending: true });

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }

  return data
})

export const getUser = cache(async () => {
  const supabase = await createClient()
  const session = await supabase.auth.getSession()
  if (session.error || session.data.session == null) return;

  const { data, error } = await supabase.from('users').select().eq('id', session.data.session.user.id).single();

  if (error) {
    console.error('Error fetching user:', error)
    return;
  }

  return data
})
export const getCartItems = cache(async () => {
  const supabase = await createClient()
  const session = await supabase.auth.getSession()
  if (session.error || session.data.session == null) redirect('/auth?type=login');
  const userId = session.data.session.user.id;

  const { data, error } = await supabase.from('users').select('cart').eq('id', userId).single();
  if (error || !data) {
    console.error('Error fetching cart items:', error)
    return;
  }

  return {
    success: true,
    cart: data.cart,
    userId
  }
})
export const getOrders = cache(async () => {
  const supabase = await createClient()
  const session = await supabase.auth.getSession()
  if (session.error || session.data.session == null) redirect('/auth?type=login');
  const userId = session.data.session.user.id;

  const { data, error } = await supabase.from('orders').select().order('created_at', { ascending: false }).eq('user_id', userId)
  if (error || !data) {
    console.error('Error fetching orders: ', error)
    return []
  }

  return data
})
