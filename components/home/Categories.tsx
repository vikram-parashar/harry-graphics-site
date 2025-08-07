'use client'
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowBigRightDash, ChevronDown, ChevronsDown } from "lucide-react";
import { Database } from "@/lib/types"
import { LineShadowText } from "../magicui/line-shadow-text";
type CategoryType = Database['public']['Tables']['categories']['Row']

const MORE_COUNT = 16;
export default function Categories({ categories }: {
  categories: CategoryType[]
}) {
  const [count, setCount] = useState(24);
  return (
    <div className="">
      <div className="flex justify-evenly items-center md:gap-5 bg-main">
        <ChevronsDown size={48} strokeWidth={3} strokeLinecap="square" className="scale-x-[1.2]" />
        <LineShadowText className="italic text-[2rem] md:text-[3rem] font-black relative -top-2 text-nowrap scale-[1.2]">Shop Now</LineShadowText>
        <ChevronsDown size={48} strokeWidth={3} strokeLinecap="square" className="scale-x-[1.2]" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-5 px-5" >
        {categories.slice(0, count).map((category, index) => (
          <Card
            key={index}
            name={category.name || ''}
            link={category.thumbnail_image || ''}
            pID={category.id}
          />
        ))}
      </div>
      {count <= categories.length &&
        <Button onClick={() => setCount(prev => Math.min(prev + MORE_COUNT, categories.length))} className="block mx-auto">View More</Button>
      }
    </div>
  );
}

const Card = ({ name, link, pID }: { name: string, link: string, pID: string }) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="border-2 border-border shadow-shadow" >
      {loading &&
        <Skeleton className="w-full h-full bg-gray-800" />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={link || '/notFoundP.jpg'}
        className={loading ? "absolute opacity-0" : "object-cover aspect-square border-b-2 border-border"}
        alt={name}
        width={400}
        height={400}
      />
      <div className="flex p-1 items-center justify-between">
        <span className="">{name || 'No Name'}</span>
      </div>
    </div>
  );
};
