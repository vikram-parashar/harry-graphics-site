import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CategoryType, CustomerType } from "@/lib/types";
import EditCategories from "@/components/dashboard/categories/edit-categories"

export default async function Page() {
  const supabase = createClient(cookies());

  /**** get categories links ****/
  const customerRes = await supabase.from('categories').select().order('updated_at',{ascending:false});
  if (customerRes.error || !customerRes.data) {
    console.log(customerRes.error)
    redirect('/error')
  }
  const categories: CategoryType[] = customerRes.data.map(item => ({
    ...item,
    header_image_full: supabase.storage.from('images').getPublicUrl(item.header_image).data.publicUrl,
    header_image_mobile_full: supabase.storage.from('images').getPublicUrl(item.header_image_mobile).data.publicUrl,
    thumbnail_image_full: supabase.storage.from('images').getPublicUrl(item.thumbnail_image).data.publicUrl
  }))

  return (
    <div>
      {/* {JSON.stringify(categories)} */}
      <EditCategories categories={categories}/>
    </div>
  )
}
