"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState<any>({})
  const categories = data?.categories
  const carouselLinks = data?.carouselLinks

  const fetchJSON = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_JSON_URL || "", {
        headers: {
          'X-SILO-KEY': process.env.NEXT_PUBLIC_JSON_API,
          'Content-Type': 'application/json'
        }
      });
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => { fetchJSON() }, [])

  return (
    <div className="bg-transparent w-screen overflow-hidden">
      <Hero carouselLinks={carouselLinks} />
      <Products categories={categories} />
      <Footer />
    </div>
  );
}
