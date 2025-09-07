import Carousels from '@/components/dashboard/carousels/Carousels'
import { createClient } from '@/supabase/utils/client'
import { unstable_cache } from 'next/cache'

const getCarousels = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('carousels')
    .select()
    .order('updated_at', { ascending: false })
  if (error) {
    console.log('Error fetching carousels:', error)
    return []
  }
  return data
}

export default async function Page() {
  const carousels = await getCarousels()

  return <Carousels carousels={carousels} />
}
