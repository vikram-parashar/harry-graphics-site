'use client'
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

export default function SideImage({ link }: { link: string }) {
  const [loading, setLoading] = useState(true)
  return (
    <div className="my-5">
      {loading &&
        <Skeleton
          className="hidden md:block w-[45vw] h-[67vh] fixed top-[53%] -translate-y-1/2 rounded-2xl bg-gray-700"
        />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={link}
        alt={""}
        width={700}
        height={500}
        className={loading ? 'opacity-0 absolute' : "object-cover w-full scale-125 md:scale-100 h-36 md:w-[45vw] md:h-[67vh] md:fixed top-[53%] md:-translate-y-1/2 rounded-2xl"}
      />
    </div>
  )
}
