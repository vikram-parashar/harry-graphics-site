import Products from '@/components/dashboard/products/Products'
import { Highlighter } from '@/components/magicui/highlighter'
import { createClient } from '@/supabase/utils/client'

const getProductsByCategory = async (catID: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*,categories(name)')
    .eq('category_id', catID)
    .order('updated_at', { ascending: false })
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data
}
export default async function Page({
  params,
}: {
  params: Promise<{ catId: string }>
}) {
  const { catId } = await params
  const products = await getProductsByCategory(catId)

  return (
    <div>
      <h1 className="text-5xl my-5 p-2">
        <Highlighter>
          {products[0]?.categories?.name || '0 product inserted'}
        </Highlighter>
      </h1>
      <Products products={products} category_id={catId} />
    </div>
  )
}
