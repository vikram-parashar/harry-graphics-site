"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import { useEffect, useState } from "react";
import axios from 'axios'
import OurCustomers from "@/components/home/Customers";

export default function Home() {
  const [data, setData] = useState<any>({})
  const [pageLoading, setPageLoading] = useState(true)
  const categories = data?.categories
  const customers = data?.customers
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
      setPageLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setPageLoading(false)
    }
  }

  useEffect(() => { fetchJSON() }, [])

  return (
    <>
      {pageLoading ?
        <div className="h-screen w-screen bg-rosePine-base flex justify-center items-center">
          <span className="font-black uppercase text-5xl text-center leading-[4rem] text-rosePine-love">Harry graphics</span>
        </div> :
        <div className="bg-transparent w-screen overflow-hidden">
          <Hero carouselLinks={carouselLinks} />
          <Products categories={categories} />
          <OurCustomers customers={customers}/>
          <Footer />
        </div>}
    </>
  );
}
