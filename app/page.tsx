import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import OurCustomers from "@/components/home/Customers";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import Canvas from "@/components/home/Canvas";

export default async function Home() {
  const supabase = createClient(cookies());

  const categoriesRes = await supabase.from('categories').select().order('updated_at', { ascending: false });;
  const categories = categoriesRes?.data?.map(item => ({
    ...item,
    thumbnail_image: supabase.storage.from('images').getPublicUrl(item.thumbnail_image).data.publicUrl,
  })) || [];

  const customerRes = await supabase.from('customers').select().order('updated_at', { ascending: false });
  const customers = customerRes?.data?.map(item => ({
    ...item,
    image: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
  })) || [];

  return (
    <div className="bg-transparent w-screen overflow-hidden relative">
      <Canvas />
      <Hero />
      <Categories categories={categories} />
      <OurCustomers customers={customers} />
      <Footer />
    </div>
  );
}
