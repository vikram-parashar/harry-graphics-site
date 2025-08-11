'use client'
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

export default function SideImage({ link }: { link: string }) {
  const [loading, setLoading] = useState(true)
  return (
    <div className="my-5 md:h-64 h-36 overflow-hidden relative">
      {loading &&
        <Skeleton
          className="object-cover w-full scale-125 md:scale-100 md:h-64 h-36 rounded-2xl bg-gray-700"
        />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={link || '/notFoundL.png'}
        alt={""}
        fill
        className={loading ? 'opacity-0 absolute' : "object-cover scale-125 md:scale-100 rounded-2xl"}
      />
    </div>
  )
}
