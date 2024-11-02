import { House } from "lucide-react";
import Link from "next/link";
import SideImage from "@/components/products/sideImage";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CategoryType, ProductType } from "@/lib/types";
import ProductCard from "@/components/products/product-card";

export default async function Page({ params, }: {
  params: { pID: string };
}) {
  const supabase = createClient(cookies());

  /**** get category data ****/
  const categoryRes = await supabase.from('categories').select().eq('id', params.pID).single();
  if (categoryRes.error || !categoryRes.data) {
    console.log(categoryRes.error)
    redirect('/error')
  }
  const category: CategoryType = categoryRes.data
  category.header_image = supabase.storage.from('images').getPublicUrl(category.header_image).data.publicUrl
  category.header_image_mobile = supabase.storage.from('images').getPublicUrl(category.header_image_mobile).data.publicUrl

  /**** get products ****/
  const productsRes = await supabase.from('products').select().eq('category_id', params.pID);
  if (productsRes.error) {
    console.log(categoryRes.error)
    redirect('/error')
  }
  const products: ProductType[] = productsRes.data.map(item => ({
    ...item,
    image: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
  }))

  return (
    <div className="px-5 w-screen overflow-hidden">
      <div className="flex justify-between items-center py-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {category.name}
        </h1>
        <Link href="/">
          <House className="" />
        </Link>
      </div>
      <div className="hidden md:block">
        <SideImage link={category.header_image} />
      </div>
      <div className="md:hidden">
        <SideImage link={category.header_image_mobile} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {products.map((item, index) =>
          <ProductCard data={item} key={index}/>
        )}
      </div>
    </div>
  );
}
