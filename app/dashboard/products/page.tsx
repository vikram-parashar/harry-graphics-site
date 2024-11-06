import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CategoryType, ProductType } from "@/lib/types";
import EditProducts from "@/components/dashboard/products/edit-products";

export default async function Page() {
  const supabase = createClient(cookies());

  /**** get products links ****/
  const productRes = await supabase.from('products').select().order('updated_at',{ascending:false});
  if (productRes.error || !productRes.data) {
    console.log(productRes.error)
    redirect('/error')
  }
  const products: ProductType[] = productRes.data.map(item => ({
    ...item,
    image_full: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl,
  }))

  /**** get categories ****/
  const categoriesRes = await supabase.from('categories').select().order('updated_at', { ascending: false });;
  if (categoriesRes.error || !categoriesRes.data) {
    console.log(categoriesRes.error)
    redirect('/error')
  }
  const categories: CategoryType[] = categoriesRes.data;

  return (
    <div>
      <EditProducts products={products} categories={categories}/>
    </div>
  )
}
