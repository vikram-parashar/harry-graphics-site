"use server";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import { fetchJSON } from "@/lib/actions";

export default async function Home() {
  const res = await fetchJSON()
  const categories = res?.categories
  const carouselLinks = res?.carouselLinks
  console.log(carouselLinks)

  return (
    <div className="bg-transparent w-screen overflow-hidden">
      <Hero carouselLinks={carouselLinks} />
      <Products categories={categories} />
      <Footer />
    </div>
  );
}
