import Carousel from '@/components/home/Carousel'
import Categories from '@/components/home/Categories'
import { createClient } from '@/supabase/utils/client'
import { unstable_cache } from 'next/cache'

const getCategories = () =>
  unstable_cache(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('id,name,heading,thumbnail_image')
      .order('updated_at', { ascending: false })
    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }
    return data
  }, ['categories'])()

const getCarousels = () =>
  unstable_cache(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('carousels')
      .select<'image,link,title,points'>()
      .order('updated_at', { ascending: false })
    if (error) {
      console.error('Error fetching carousels:', error)
      return []
    }
    return data
  }, ['carousels'])()

export default async function Home() {
  const categories = await getCategories()
  const carousels = await getCarousels()
  return (
    <>
      <Carousel carousels={carousels} />
      <Categories categories={categories} />
    </>
  )
}
