'use client'
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, LoaderCircle, ShoppingCart } from "lucide-react";
import { useState } from 'react'
import { Button } from "../ui/button";
import { ProductType } from "@/lib/types";
import { addToCart } from "@/lib/actions/user";
import { toast } from "sonner";

const ProductItem = ({ item }: { item: ProductType }) => {
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [added, setAdded] = useState(false)

  return (
    <div className="w-full overflow-hidden whitespace-nowrap text-rosePine-text relative bg-rosePineDawn-overlay rounded-md"
      style={{
        textOverflow: "ellipsis"
      }}
    >
      {loading &&
        <Skeleton className="w-full md:h-48 mb-3  bg-gray-800" />
      }
      <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">{item.price}</div>
      <Image
        onLoad={() => setLoading(false)}
        src={item.image}
        alt={item.name}
        width={250}
        height={200}
        className={loading ? "opacity-0 absolute" : "object-cover w-full md:h-48"}
      />
      <span className="text-rosePineDawn-text block font-bold p-2"> {item.name} </span>
      <Button
        disabled={addingToCart}
        onClick={async () => {
          setAddingToCart(true)
          const res = await addToCart(item)
          res ?
            toast(`${item.name} added to cart :>`) :
            toast(`Something went wrong.`)
          setAdded(true)
        }}
        size="icon" className="absolute bottom-12 right-2">
        {added ?
          <Check className="h-4 w-4 text-green-400" /> :
          addingToCart ?
            <LoaderCircle className="h-4 w-4" /> :
            <ShoppingCart className="h-4 w-4" />
        }
      </Button>
    </div>
  )
}
export default ProductItem;
