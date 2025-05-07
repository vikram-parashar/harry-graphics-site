"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, ShoppingCart, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "../ui/input"
import { Database } from "@/lib/types"
type dbTypes = Database['public']['Tables']
import { toast } from "sonner"
import { addToCart } from "@/lib/actions/user"
import { useRouter } from "next/navigation"

export default function ProductItem({ item }: {
  item: any
}) {
  return (
    <div className="w-full flex flex-col justify-between">
      <Image
        src={item.image || '/notFoundP.jpg'}
        alt={item.name}
        height={350}
        width={350}
        className="object-cover w-full h-full"
      />
      <div className="px-5">
        <ProductPopup product={item} trigger={<p className="font-bold hover:cursor-pointer hover:underline">{item.name}</p>} />
        <p className="text-sm">{item.price ? `₹ ${item.price}/${item.unit}` : 'Price not available'}</p>
      </div>
    </div>
  )
}

interface ProductPopupProps {
  product: dbTypes['products']['Row'] & {
    categories: dbTypes['categories']['Row'];
  },
  trigger?: React.ReactNode
}

export function ProductPopup({ product, trigger }: ProductPopupProps) {
  const router = useRouter()

  const defOptions = {};
  if (product.options) {
    const productOptions: any = product.options;
    for (const option in productOptions) { defOptions[option] = productOptions[option][0].name }
  }
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(defOptions)

  const MIN_QUANTITY = product.min_quantity || 1;
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY);
  const handleQuantityChange = (value: number) => {
    if (value >= MIN_QUANTITY) setQuantity(value)
  }

  const [addingToCart, setAddingToCart] = useState(false);

  const [customPrice, setCustomPrice] = useState<number>(product.price || 0);
  useEffect(() => {
    if (product.options) {
      var basePrice = product.price;
      for (const option in selectedOptions) {
        for (let id = 0; id < product.options[option].length; id++) {
          if (product.options[option][id].name == selectedOptions[option]) {
            basePrice += product.options[option][id].price;
          }
        }
      }
      setCustomPrice(basePrice || 0);
    }
  }, [selectedOptions, product]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || <Button variant="outline">Quick View</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden min-h-[500px]">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Details - Left Side */}
          <div className="p-6 flex flex-col h-full">
            <DialogHeader className="text-left">
              <div className="space-y-1.5">
                <Badge variant="outline" className="text-xs font-normal">
                  {product.categories.name}
                </Badge>
                <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
              </div>
            </DialogHeader>

            {product.options && (
              <div className="mt-6 space-y-3 flex-grow">
                {Object.keys(product.options).map((option, index) =>
                  product.options?.[option].length == 1 ?
                    <label key={index} htmlFor="size" className="text-sm block font-medium"> {`${option} : ${product.options[option][0].name}`} </label> :
                    <div className="" key={index}>
                      <label htmlFor="size" className="text-sm font-medium "> {`${option} :`} </label>
                      <Select
                        value={selectedOptions[option]}
                        onValueChange={(value) => {
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [option]: value,
                          }));
                        }}
                      >
                        <SelectTrigger id={option} className="w-full">
                          <SelectValue placeholder={`Select ${option}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {product.options?.[option].map((opt: { name: string, price: number }) => (
                            <SelectItem key={opt.name} value={opt.name}>
                              {`${opt.name} ${opt.price == 0 ? '' : opt.price > 0 ? `₹+${opt.price}` : ` ₹-${-1 * opt.price}`}/${product.unit}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                )}
              </div>
            )}
            {/* Quantity Input */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity (Minimum: {MIN_QUANTITY})
              </label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= MIN_QUANTITY}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="string"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  onBlur={() => { if (quantity < MIN_QUANTITY) setQuantity(MIN_QUANTITY) }}
                  className="w-16 text-center mx-2"
                />
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="text-2xl font-bold">₹{product.price ? (customPrice * quantity).toFixed(2) : 'price not available'}</span>
              </div>

              <Button
                disabled={addingToCart}
                onClick={async () => {
                  setAddingToCart(true)
                  const res = await addToCart(product, selectedOptions, quantity, customPrice)
                  res ?
                    toast(`${product.name} added to cart :>`, {
                      action: {
                        label: "View Cart",
                        onClick: () => router.push('/user/cart')
                      }
                    }) :
                    toast(`Please login to add to cart.`)
                  setAddingToCart(false)
                }}
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
          {/**/}
          {/* Product Image - Right Side */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-muted">
            <Image
              src={product.image || "/notFoundP.jpg"}
              alt={product.name || ''}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog >
  )
}
