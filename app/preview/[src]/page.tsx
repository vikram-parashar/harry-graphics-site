'use client'
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowDimension";
import { createUrl } from "@/lib/utils";

const Page = ({ params }: { params: { src: string } }) => {
  const [loading, setLoading] = useState(true)
  const { width, height } = useWindowDimensions()
  return (
    <div className="w-screen h-screen bg-gray-300">
      {loading &&
        <Skeleton className="w-full h-full bg-gray-900 rounded-none" />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={createUrl(params.src)}
        alt=""
        width={width}
        height={height}
        className={loading ? "opacity-0 absolute" : "object-contain w-full h-full mx-auto"}
      />
    </div>
  )
}
export default Page
