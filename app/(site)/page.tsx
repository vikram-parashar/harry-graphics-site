import Carousel from '@/components/home/Carousel'
import Categories from '@/components/home/Categories'
import { createClient } from '@/supabase/utils/client'
import { unstable_cache } from 'next/cache'

export default async function Home() {
  const getCategories = unstable_cache(
    async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('categories')
        .select()
        .order('updated_at', { ascending: false })
        .eq('is_visible', true)
      if (error) {
        console.error('Error fetching categories:', error)
        return []
      }
      return data
    },
    [],
    { tags: ['categories'] }
  )
  const categories = await getCategories()
  const getCarousels = unstable_cache(
    async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('carousels')
        .select()
        .order('updated_at', { ascending: false })
        .eq('is_visible', true)
      if (error) {
        console.error('Error fetching carousels:', error)
        return []
      }
      return data
    },
    [],
    { tags: ['carousels'] }
  )
  const carousels = await getCarousels()
  return (
    <>
      <Carousel carousels={carousels} />
      <Categories categories={categories} />
    </>
  )
}
