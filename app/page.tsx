import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import OurCustomers from "@/components/home/Customers";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CategoryType, CustomerType } from "@/lib/types";

export default async function Home() {
  const supabase = createClient(cookies());

  /**** get carousel links ****/
  const carouselRes = await supabase.from('carousels').select().order('updated_at',{ascending:false});;
  if (carouselRes.error || !carouselRes.data) {
    console.log(carouselRes.error)
    redirect('/error')
  }
  const carousels = carouselRes.data.map(item => ({
    ...item,
    image: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
  }))

  /**** get categories ****/
  const categoriesRes = await supabase.from('categories').select().order('updated_at',{ascending:false});;
  if (categoriesRes.error || !categoriesRes.data) {
    console.log(categoriesRes.error)
    redirect('/error')
  }
  const categories:CategoryType[] = categoriesRes.data.map(item => ({
    ...item,
    thumbnail_image: supabase.storage.from('images').getPublicUrl(item.thumbnail_image).data.publicUrl,
  }))

  /**** get customers links ****/
  const customerRes = await supabase.from('customers').select().order('updated_at',{ascending:false});
  if (customerRes.error || !customerRes.data) {
    console.log(customerRes.error)
    redirect('/error')
  }
  const customers:CustomerType[] = customerRes.data.map(item => ({
    ...item,
    image: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
  }))

  return (
    <>
      <div className="bg-transparent w-screen overflow-hidden">
        <Hero carousels={carousels} categories={categories} />
        <Products categories={categories} />
        <OurCustomers customers={customers} />
        <Footer />
      </div>
    </>
  );
}
