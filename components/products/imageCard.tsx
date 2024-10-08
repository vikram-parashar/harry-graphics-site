'use client'
import { parseGlink } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Skeleton } from "../ui/skeleton"

const ImageCard = ({ pic }: { pic: { name: string, link: string } }) => {
  const [loading, setLoading] = useState(true)
  return (
    <div className="relative overflow-hidden rounded-xl">
      <Link
        href={parseGlink(pic.link)}
        target="_blank"
        className="w-full h-10 flex items-center rounded-xl justify-center text-center absolute opacity-80 md:opacity-0 z-10 bg-black text-white hover:opacity-80 transition-opacity"
      >
        {pic.name}
        <ArrowUpRight className="ml-1" size={20} />
      </Link>
      {loading &&
        <Skeleton className="w-full h-[70vw] md:min-h-40 bg-gray-800" />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={parseGlink(pic.link)}
        alt={pic.name}
        width={250}
        height={200}
        className="object-cover w-full"
      />
    </div>
  )
}
export default ImageCard
