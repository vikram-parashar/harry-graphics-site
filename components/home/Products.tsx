'use client'
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

export default function Products({ categories }: {
  categories: string[][]
}) {
  return (
    <div className="min-h-screen bg-rosePineDawn-base px-5 md:px-10 py-10">
      <div className="flex flex-col md:flex-row text-[25vw] justify-between leading-[5rem] md:text-[10vw] font-black mb-10 md:mb-20 md:mt-10">
        <span>SHOP</span>
        <span>NOW</span>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5"
      >
        {categories?.map(category => (
          <ProductCard
            key={category[0]}
            name={category[0]}
            link={category[1]}
          />
        ))}
      </div>
    </div>
  );
}

const ProductCard = ({ name, link }: { name: string, link: string }) => {
  const colors = ["#f6c177", "#ebbcba", "#31748f", "#9ccfd8", "#c4a7e7"];
  const getRandomId = Math.floor(Math.random() * colors.length);
  const ColorBg = colors[getRandomId];
  const ColorBtn = colors[(getRandomId + 1) % colors.length];
  const rename = name.toLowerCase().replaceAll(' ', '-')
  const [loading, setLoading] = useState(true)

  return (
    <div
      className="bg-opacity-50 h-[22rem] md:h-[27vw] group relative overflow-hidden flex"
      style={{ backgroundColor: ColorBg }}
    >
      {loading &&
        <Skeleton className="w-full h-full bg-gray-800" />
      }
      <Image
        onLoad={() => setLoading(false)}
        src={link}
        className={loading?"absolute opacity-0":"mx-auto drop-shadow-2xl object-cover"}
        alt={name}
        width={400}
        height={400}
      />
      <span className="absolute top-0 left-0 p-3 font-bold text-xl text-rosePine-highlightLow md:-translate-y-10 transition group-hover:translate-y-0 opacity-70">
        {name}
      </span>
      <span className="absolute bottom-3 right-3 text-sm text-rosePine-highlightLow md:translate-y-20 transition group-hover:translate-y-0 flex justify-between items-center">
        <Link
          href={`/product/${rename}`}
          className="product-btn text-rosePine-black"
          style={{
            backgroundColor: ColorBtn,
          }}
        >
          View Product
        </Link>
      </span>
    </div>
  );
};
