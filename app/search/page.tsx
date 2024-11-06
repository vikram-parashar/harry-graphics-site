"use client";
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react";
import axios from 'axios'
import { ArrowUpRight, Search } from "lucide-react";

export default function Page() {
  const [data, setData] = useState<any>({})
  const [input, setInput] = useState<any>("")
  const [filteredData, setFilteredData] = useState<any>({})
  const [pageLoading, setPageLoading] = useState(true)

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

  const handleSearch = () => {
    if (input === "") {
      setFilteredData({})
      alert("No products found")
      return
    }
    const foundProducts: { [key: string]: any } = {}
    for (const cat in data) {
      if (cat === "categories" || cat === "carouselLinks" || cat==="customers") continue

      foundProducts[cat] = []
      for (const subCat in data[cat]) {
        if (subCat === "sideImage") continue
        for (const img of data[cat][subCat].pics) {
          if (img.name.toLowerCase().includes(input.toLowerCase())) foundProducts[cat].push(img)
        }
      }
    }
    setFilteredData(foundProducts)
  }

  return (
    <>
      {pageLoading ?
        <div className="h-screen w-screen bg-rosePine-base flex justify-center items-center">
          <span className="font-black uppercase text-5xl text-center leading-[4rem] text-rosePine-love">Harry graphics</span>
        </div> :
        <div className="bg-transparent w-screen min-h-screen overflow-hidden">
          <div className="w-screen h-36 bg-rosePine-base relative flex flex-col justify-center">
            <h1
              className="text-center bg-gradient-to-r from-rosePine-love via-rosePine-rose to-rosePine-love bg-clip-text md:text-6xl text-3xl font-extrabold uppercase text-transparent">
              Harry graphics
            </h1>
            <input
              className="absolute left-1/2 -translate-x-1/2 -bottom-5 border-2 border-rosePine-muted h-12 w-[90vw] rounded-lg pl-10"
              placeholder="Search Products...."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <Search className="absolute -bottom-3 left-[7vw] md:left-[5.5vw] stroke-rosePine-subtle" size={30} />
          </div>
          <div className="mt-10 px-5 ">
            {Object.keys(filteredData).map(cat => filteredData[cat].length > 0 &&
              <>
                <Link
                  target="_blank"
                  href={`/product/${cat}`}
                  className="scroll-m-20 border-b-2 border-rosePine-muted pb-2 text-3xl font-semibold tracking-tight first:mt-0 block">
                  {cat}
                  <ArrowUpRight className="inline ml-1" />
                </Link>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-5 gap-x-2 mt-4">
                  {filteredData[cat].map((img: any) =>
                    <ImageCard key={img.name} pic={img} />
                  )}
                </div>
              </>
            )}
          </div >
        </div>
      }</>
  );
}
const ImageCard = ({ pic }: { pic: { name: string, link: string } }) => {
  const [loading, setLoading] = useState(true)
  return (
    <div className="w-full overflow-hidden whitespace-nowrap text-rosePine-text"
      style={{
        textOverflow: "ellipsis"
      }}
    >
      {loading &&
        <Skeleton className="w-full h-full md:min-h-40 bg-gray-800" />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={pic.link}
        alt={pic.name}
        width={250}
        height={200}
        className={loading ? "opacity-0 absolute" : "object-cover w-full rounded-lg mb-2"}
      />
      <Link
        href={pic.link}
        target="_blank"
        className="relative rounded bg-rosePine-surface px-[0.3rem] text-center py-[0.2rem] font-mono text-sm font-semibold block"
      >
        <ArrowUpRight className="mr-1 inline" size={20} />
        {pic.name}

      </Link>
    </div>
  )
}
