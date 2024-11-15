import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CarouselType, CategoryType } from "@/lib/types";
import EditCarousels from "@/components/dashboard/carousels/edit-carousels";


export default async function Page() {
  const supabase = createClient(cookies());

  /**** get carousel links ****/
  const carouselRes = await supabase.from('carousels')
    .select(`*, categories!inner(name)`)
    .order('updated_at', { ascending: false });;
  if (carouselRes.error) {
    console.log(carouselRes.error)
    redirect('/error')
  }
  const carousels: CarouselType[] = carouselRes.data.map(item => ({
    ...item,
    image_full: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
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
      <EditCarousels carousels={carousels} categories={categories} />
    </div>
  )
}
