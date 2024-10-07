"use server";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import productData from "@/public/products.json"

export default async function Home() {
  const categories = productData.categories
  const carouselLinks = productData.carouselLinks

  return (
    <div className="bg-transparent">
      <Hero carouselLinks={carouselLinks}/>
      <Products categories={categories}/>
      <Footer/>
    </div>
  );
}
