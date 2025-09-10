import { Highlighter } from '@/components/magicui/highlighter'
import { createClient } from '@/supabase/utils/client'
import { unstable_cache } from 'next/cache'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata(
  { params }: { params: Promise<{ catID: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { catID } = await params
  const getCategoryName = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('categories')
      .select('name,thumbnail_image')
      .eq('id', catID)
      .single()
    if (error) {
      console.error('Error fetching products:', error)
      return {
        name: 'Category Not Found',
        thumbnail_image: 'https://harrygraphics.in/logo/bg.png',
      }
    }
    return data
  }

  const res = await getCategoryName()

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: res.name + ' - Harry Graphics',
    openGraph: {
      images: [res.thumbnail_image, ...previousImages],
    },
  }
}

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
        .select('image,name,id,categories(name)')
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
          <Link
            key={index}
            style={{ color: 'black' }}
            href={`${process.env.NEXT_PUBLIC_APP_URL}/product/${product.id}`}
          >
            <div className="relative aspect-square">
              <Image
                sizes="(max-width:1000px) 40vw, 14vw"
                src={product.image || '/dummy/product.png'}
                alt={product.name}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="px-1">
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
