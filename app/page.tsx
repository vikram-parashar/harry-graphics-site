"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";

export default function Home() {
  return (
    <div className="bg-transparent">
      <Hero />
      <Products />
      <Footer/>
    </div>
  );
}
