'use client'
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { CategoryType } from "@/lib/types";
import { Button } from "../ui/button";
import { ArrowBigRightDash } from "lucide-react";

const MORE_COUNT = 16;
export default function Categories({ categories }: {
  categories: CategoryType[]
}) {
  const [count, setCount] = useState(24);
  return (
    <div className="bg-rosePineDawn-base px-5 md:px-10 pt-10 w-full">
      <div className="text-[15vw] text-center leading-[5rem] md:text-[5vw] font-black mb-10">
        SHOP NOW
      </div>
      <div className="grid grid-cols-2 md:grid-cols-8 gap-3 mb-5" >
        {categories.slice(0, count).map((category, index) => (
          <Card
            key={index}
            name={category.name}
            link={category.thumbnail_image}
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
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];
  const getRandomId = Math.floor(Math.random() * colors.length);
  const ColorBg = colors[getRandomId];
  const ColorBtn = colors[(getRandomId + 1) % colors.length];
  const [loading, setLoading] = useState(true)

  return (
    <div
      className="bg-opacity-50 h-[14rem] md:h-[12vw] group relative overflow-hidden flex"
      style={{ backgroundColor: ColorBg }}
    >
      {loading &&
        <Skeleton className="w-full h-full bg-gray-800" />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={link}
        className={loading ? "absolute opacity-0" : "mx-auto drop-shadow-2xl object-cover"}
        alt={name}
        width={400}
        height={400}
      />
      <span className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 scale-95 text-[14px] text-rosePine-highlightLow md:translate-y-20 transition group-hover:-translate-y-2 flex justify-between items-center">
        <Link
          href={`/product/${pID}`}
          className="product-btn flex items-center text-rosePine-black"
          style={{
            backgroundColor: ColorBtn,
          }}
        >
          {name} <ArrowBigRightDash />
        </Link>
      </span>
    </div>
  );
};
