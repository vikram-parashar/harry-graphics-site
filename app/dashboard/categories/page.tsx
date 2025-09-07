import Categories from '@/components/dashboard/categories/Categories'
import { createClient } from '@/supabase/utils/client'
import { unstable_cache } from 'next/cache'

const getCategories = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select()
    .order('updated_at', { ascending: false })
  if (error) {
    console.log('Error fetching categories:', error)
    return []
  }
  return data
}

export default async function Page() {
  const categories = await getCategories()

  return <Categories categories={categories} />
}
