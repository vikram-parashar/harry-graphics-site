import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import OurCustomers from "@/components/home/Customers";
import Canvas from "@/components/home/Canvas";
import { getCategories, getCustomers } from "@/lib/queries";

export const revalidate = 3600;
export default async function Home() {
  const categories = await getCategories();
  const customers = await getCustomers();

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
