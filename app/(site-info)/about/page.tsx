'use client'
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import Footer from "@/components/Footer";
import { Home, Printer } from "lucide-react";
import Link from "next/link";
import SocialIcons from "@/components/socialIcons";

const aboutUs1 = `
          Looking for a reliable PVC ID card manufacturer in India? Look no further than 
          Harry Graphics! Like their Facebook page ((link unavailable)) to stay updated 
          on their latest products, services, and offers. With a reputation for quality, 
          economic prices, and timely delivery, Harry Graphics is a trusted choice for 
          all your ID card printing needs!
`
const aboutUs2 = `
          Located in Subhash Colony, Sector 60, Faridabad, Haryana, Harry Graphics is a 
          trusted manufacturer of PVC ID cards, known for their excellent quality, 
          economic prices, and timely delivery. They are a favorite among printers who 
          want their ID cards printed with precision and care.
`
export default function About() {
  const [loading, setLoading] = useState(true)
  return (
    <div>
      {/* tablet / mobile view */}
      <div className="mx-auto mb-10 max-w-md px-5 lg:hidden">
        {/* Printer icon */}
        <Printer className="mt-10 h-16 w-16 fill-rosePine-muted" />
        <h1 className="my-8 text-4xl">About Us</h1>
        <p className="mb-2">{aboutUs1} </p>
        <p className="mb-5"> {aboutUs2}</p>
        {/* social icons */}
        <div className="mb-8 flex gap-5">
          <SocialIcons />
        </div>
        {/* seprator */}
        <div className="mb-3 h-[6px] w-12 bg-rosePine-base"></div>
        {loading&&
          <Skeleton className="w-full h-[500px] bg-gray-800 max-h-[500px]" />
        }
        <Image
          onLoad={() => setLoading(false)}
          width={324}
          height={566}
          className={loading ? 'absolute opacity-0' : "w-full h-full max-h-[500px] object-cover"}
          src="/about.jpg"
          alt="main" />
      </div>

      {/* Desktop view */}
      <div className="relative mx-auto mt-24 hidden max-w-[1280px] px-5 lg:block">
        <div className="flex">
          {/* floating side */}
          <div className="absolute top-12 flex w-full justify-between">
            <span></span>
            <h1 className="mr-28 bg-gradient-to-b from-slate-600 to-slate-950 bg-clip-text text-8xl text-transparent">
              ABOUT US
            </h1>
          </div>
          {/* Left side */}
          <div className="w-1/2">
            {loading &&
              <div className="pl-24">
              <Skeleton className="w-full bg-gray-800 h-[700px]" />
              </div>
            }
            <Image
              onLoad={() => setLoading(false)}
              className={loading ? 'absolute opacity-0' : "pl-24 w-full h-full max-h-[700px] object-cover"}
              src="/about.jpg"
              alt="main"
              width={700}
              height={700}
            />
          </div>
          {/* Right side */}
          <div className="mt-56 w-1/2">
            <p className="mb-8 ml-24 "> {aboutUs1} </p>
            <p className="mb-5 ml-24"> {aboutUs2} </p>
          </div>
        </div>
        {/* Bottom side */}
        <div className="flex">
          {/* social icons */}
          <div className="mb-8 mt-5 flex w-1/2 justify-end gap-5">
            <SocialIcons />
          </div>
          {/* seprator */}
          <div className="flex w-1/2 justify-end">
            <div className="mt-5  h-4 w-24 bg-rosePine-base"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
