import { createClient } from '@/supabase/utils/client'
import { unstable_cache } from 'next/cache'
import ProductItem from '@/components/product/Product'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const getProductName = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('products')
      .select('image,name,categories(name)')
      .eq('id', id)
      .single()
    if (error) {
      console.error('Error fetching products:', error)
      return {
        name: 'Product Not Found',
        image: 'https://harrygraphics.in/logo/bg.png',
        categories: { name: 'NULL' },
      }
    }
    return data
  }

  const res = await getProductName()

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: res.name + ' - ' + (res.categories?.name || 'Product'),
    openGraph: {
      images: [res.image, ...previousImages],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const getProduct = unstable_cache(
    async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select('*,categories(name)')
        .eq('id', id)
        .eq('is_visible', true)
        .single()
      if (error) {
        console.log('Error fetching product:', error)
        return null
      }
      return data
    },
    [id],
    { tags: ['products'] }
  )
  const product = await getProduct()
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    )
  }

  return (
    <div className="lg:border-5 bg-background py-10 lg:py-20 px-5">
      <ProductItem product={product} />
    </div>
  )
}
