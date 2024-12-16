import SideImage from "@/components/products/sideImage";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { CategoryType, ProductType } from "@/lib/types";
import ProductItem from "@/components/products/product-item";

export default async function Page({ params, }: {
  params: { catID: string };
}) {
  const supabase = createClient(cookies());

  /**** get categories ****/
  const categoriesRes = await supabase.from('categories').select().eq('id', params.catID).single()
  if (categoriesRes.error || !categoriesRes.data) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Category data</div>
  }
  const category: CategoryType = categoriesRes.data
  category.header_image = supabase.storage.from('images').getPublicUrl(category.header_image).data.publicUrl;
  category.header_image_mobile = supabase.storage.from('images').getPublicUrl(category.header_image_mobile).data.publicUrl;


  /**** get products ****/
  const productsRes = await supabase.from('products').select().eq('category_id', params.catID).order('updated_at', { ascending: false });
  if (productsRes.error) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Products data</div>
  }
  const products: ProductType[] = productsRes.data.map(item => ({
    ...item,
    image: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
  }))

  return (
    <div className="px-5 w-screen overflow-hidden md:pt-12">
      <div className="flex items-center py-5 pr-24 md:pr-0">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {category.name}
        </h1>
      </div>
      <div className="hidden md:block">
        <SideImage link={category.header_image} />
      </div>
      <div className="md:hidden">
        <SideImage link={category.header_image_mobile} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-10">
        {products.map((item, index) =>
          <ProductItem item={item} key={index} />
        )}
      </div>
    </div>
  );
}
