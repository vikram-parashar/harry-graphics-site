import Link from 'next/link'
import { createClient } from '@/supabase/utils/client'
import { Highlighter } from '@/components/magicui/highlighter'
import { Button } from '@/components/ui/button'

const getCategories = async () => {
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
}

export default async function Page() {
  const categories = await getCategories()
  const headings = [
    'ID Solutions',
    'Lanyard Solutions',
    'Merch',
    'Awards',
    'Others',
  ]

  return (
    <div className="mt-10">
      {headings.map((heading, index) => (
        <div key={index}>
          <h1 className="text-2xl lg:text-5xl my-5 p-2">
            <Highlighter>{heading}</Highlighter>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 ">
            {categories
              .filter((category) => category.heading === heading)
              .map((category) => (
                <Button
                  asChild
                  variant="reverse"
                  className="bg-secondary-background"
                  key={category.id}
                >
                  <Link href={`/dashboard/products/${category.id}`}>
                    {category.name}{' '}
                  </Link>
                </Button>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
