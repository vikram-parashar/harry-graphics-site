"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { createClient } from "@/supabase/utils/client";
import { ProductType } from "@/lib/types";
import ProductItem from "@/components/products/product-item";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const [data, setData] = useState<ProductType[]>([])
  const [input, setInput] = useState('')
  const params = useSearchParams()
  const query = params.get('q') || ''
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      /**** get data ****/
      const res1 = await supabase.from('products').select('*,categories(*)')
        .ilike('name', `%${query}%`).limit(10)
      const res2 = await supabase.from('products').select('*,categories(*)')
        .ilike('description', `%${query}%`).limit(10)
      const res3 = await supabase.from('products').select('*,categories!inner(*)')
        .ilike('categories.name', `%${query}%`).limit(10)

      if (res1.error || res2.error || res3.error) {
        console.log(res1.error, res2.error, res3.error)
        alert('cant fetch data')
        return;
      }

      const resArr=[...res1.data, ...res2.data, ...res3.data]

      const products: ProductType[] = resArr.map(item => ({
        ...item,
        image: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
      }))

      //remove duplicates
      const uniqueProducts = products.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

      setData(uniqueProducts)
    }
    query && fetchData()
  }, [query])

  return (
    <div className="bg-transparent w-screen min-h-screen overflow-hidden">
      <div className="w-screen h-36 bg-rosePine-base relative flex flex-col justify-center">
        <h1
          className="text-center bg-gradient-to-r from-rosePine-love via-rosePine-rose to-rosePine-love bg-clip-text md:text-6xl text-3xl font-extrabold uppercase text-transparent">
          Harry graphics
        </h1>
        <input
          className="absolute left-1/2 -translate-x-1/2 -bottom-5 border-2 border-rosePine-muted h-12 w-[90vw] rounded-lg pl-10"
          placeholder="Search Products...."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              router.push(`/search?q=${input}`)
            }
          }}
        />
        <Search className="absolute -bottom-3 left-[7vw] md:left-[5.5vw] stroke-rosePine-subtle" size={30} />
      </div>
      <div className="mt-10 px-5 grid md:grid-cols-6 gap-5">
        {data.map((item, index) => (
          <ProductItem key={index} item={item} />
        ))}
      </div >
    </div>
  );
}
