'use client'
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

export default function SideImage({ link }: { link: string }) {
  const [loadingMob, setLoadingMob] = useState(true)
  const [loadingDesk, setLoadingDesk] = useState(true)
  return (
    <>
      {loadingMob &&
        <Skeleton
          className="w-full scale-125 my-3 h-36 top-[53%] md:hidden bg-gray-700"
        />
      }
      {/* mobile */}
      <Image
        onLoad={() => setLoadingMob(false)}
        src={link}
        alt={"slide"}
        width={250}
        height={250}
        className={loadingMob ? "opacity-0 absolute" : "object-cover w-full scale-125 my-3 h-36 top-[53%] md:hidden"}
      />
      {loadingDesk &&
        <Skeleton
          className="hidden md:block w-[45vw] h-[67vh] fixed top-[53%] -translate-y-1/2 rounded-2xl bg-gray-700"
        />
      }
      {/* desktop */}
      <Image
        onLoad={() => setLoadingDesk(false)}
        src={link}
        alt={"slide"}
        width={700}
        height={500}
        className={loadingDesk ? 'opacity-0 absolute' : "object-cover hidden md:block w-[45vw] h-[67vh] fixed top-[53%] -translate-y-1/2 rounded-2xl"}
      />
    </>
  )
}
