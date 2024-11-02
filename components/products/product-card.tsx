'use client'
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight,  ShoppingCart} from "lucide-react";
import {useState} from 'react'
import { Button } from "../ui/button";
import Link from "next/link";
import { ProductType } from "@/lib/types";

const ProductCard = ({ data }: { data: ProductType }) => {
  const [loading, setLoading] = useState(true)
  return (
    <div className="w-full overflow-hidden whitespace-nowrap text-rosePine-text relative"
      style={{
        textOverflow: "ellipsis"
      }}
    >
      {loading &&
        <Skeleton className="w-full md:h-48 mb-3  bg-gray-800" />
      }
      <Button size="icon" className="absolute bottom-10 right-2">
        <ShoppingCart className="h-4 w-4" />
      </Button>
      <Image
        onLoad={() => setLoading(false)}
        src={data.image}
        alt={data.name}
        width={250}
        height={200}
        className={loading ? "opacity-0 absolute" : "object-cover w-full rounded-lg mb-2 md:h-48"}
      />
      <span
        className="relative rounded bg-rosePine-surface px-[0.3rem] text-center py-[0.2rem] font-mono text-sm font-semibold block"
      >
        {data.name}{" "}{data.price}
      </span>
    </div>
  )
}
export default ProductCard;
