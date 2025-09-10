import { Highlighter } from '@/components/magicui/highlighter'
import ProductItem from '@/components/category/ProductDialog'
import { createClient } from '@/supabase/utils/client'
import { unstable_cache } from 'next/cache'

export default async function Page({
  params,
}: {
  params: Promise<{ catID: string }>
}) {
  const { catID } = await params
  const getProductsByCategory = unstable_cache(
    async (catID: string) => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select('*,categories(name)')
        .eq('category_id', catID)
        .eq('is_visible', true)
        .order('updated_at', { ascending: false })
      if (error) {
        console.error('Error fetching products:', error)
        return []
      }
      return data
    },
    [catID],
    { tags: ['products'] }
  )
  const products = await getProductsByCategory(catID)

  return (
    <div className="lg:border-5 bg-background py-10 lg:py-20 px-5">
      <h1 className="text-5xl my-5 p-2">
        <Highlighter>
          {products[0]?.categories?.name || '0 product inserted'}
        </Highlighter>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-x-2 gap-y-5 md:gap-5 mt-10">
        {products.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </div>
  )
}
