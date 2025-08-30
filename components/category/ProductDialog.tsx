"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Minus, ShoppingCart, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Tables } from "@/lib/database.types"
import { ProductOptionType } from "@/lib/types"

export default function ProductItem({ product }: {
  product: Tables<'products'> & { categories: { name: string } | null }
}) {
  const router = useRouter()

  const MIN_QUANTITY = product.min_quantity || 1;

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(() => {
    const initialOptions: { [key: string]: string } = {};
    const productOptions = product.options as ProductOptionType
    for (const key in productOptions)
      initialOptions[key] = productOptions[key][0].name;
    return initialOptions;
  });
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY);
  const [customPrice, setCustomPrice] = useState<number>(product.price || 0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleQuantityChange = (value: number) => {
    if (value >= MIN_QUANTITY) setQuantity(value)
    else setQuantity(MIN_QUANTITY);
  }

  useEffect(() => {
    let basePrice = product.price;
    const productOptions = product.options as ProductOptionType
    if (product.options) {
      Object.keys(selectedOptions).forEach((key) => {
        const option = productOptions[key].find(opt => opt.name === selectedOptions[key]);
        if (option && option.price) {
          basePrice += option.price;
        }
      });
    }
    setCustomPrice(basePrice || 0);
  }, [selectedOptions, product]);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div>
          <div className="relative aspect-square">
            <Image
              src={product.image || "/dummy/product.png"}
              alt={product.name}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="px-1">
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="lg:flex max-h-screen overflow-scroll mt-10 lg:mt-0 lg:max-w-[60vw] pt-10 pb-20">
        {/* Product Image - Left Side */}
        <div
          className="lg:w-1/2 relative aspect-square">
          <Image
            src={product.image || "/dummy/product.png"}
            alt={product.name}
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>
        {/* Product Details - Right Side */}
        <div className="lg:w-1/2 relative pb-20">
          <DialogHeader className="text-left">
            <div className="space-y-1.5">
              <Badge className="text-xs font-normal">
                {product.categories?.name}
              </Badge>
              <DialogTitle className="text-3xl font-bold">{product.name}</DialogTitle>
            </div>
          </DialogHeader>
          <div className="max-h-90 overflow-y-scroll">
            <OptionsSection selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} options={product.options as ProductOptionType} />
          </div>

          {/* Quantity Input */}
          <div className="space-y-2 pt-7">
            <label htmlFor="quantity" className="text-sm font-bold">
              Quantity (Minimum: {MIN_QUANTITY})
            </label>
            <div className="flex items-center my-2">
              <Button
                size="icon"
                onClick={() => handleQuantityChange(quantity - 10)}
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
                className="w-20 text-center mx-2 font-black text-2xl bg-transparent border-none"
              />
              <Button
                size="icon"
                onClick={() => handleQuantityChange(quantity + 10)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Price Display */}
          <div className="absolute bottom-0 left-0">
            <span className="text-sm text-muted-foreground block font-bold">Price</span>
            <span className="text-2xl font-bold block">₹{product.price ? (customPrice * quantity).toFixed(2) : 'price not available'}</span>
          </div>
          <Button
            onClick={() => {
              const newProduct = product;
              newProduct.price = customPrice;

              localStorage.setItem('cart', JSON.stringify([
                { product: newProduct, quantity, options: selectedOptions },
                ...(JSON.parse(localStorage.getItem('cart') || '[]'))
              ]))

              toast.success(`${product.name} added to cart :>`, {
                action: {
                  label: "View Cart",
                  onClick: () => router.push('/user/cart')
                }
              })

              setDialogOpen(false);
            }}
            className="absolute right-5 bottom-0"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog >
  )
}

const OptionsSection = ({ selectedOptions, setSelectedOptions, options }: {
  selectedOptions: { [key: string]: string },
  setSelectedOptions: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  options: ProductOptionType,
}) => {
  if (!options) return <></>;

  return (
    <div className="space-y-4 pt-5">
      {Object.keys(options).map((optionKey) => (
        <div key={optionKey}>
          <label className="block text-sm mb-1 font-bold">{optionKey}</label>
          <Select
            value={selectedOptions[optionKey]}
            onValueChange={(value) => setSelectedOptions({ ...selectedOptions, [optionKey]: value })} >
            <SelectTrigger className="w-full text-xl">
              <SelectValue placeholder={`Select ${optionKey}`} />
            </SelectTrigger>
            <SelectContent>
              {options[optionKey].map((opt) => (
                <SelectItem key={opt.name} value={opt.name} className="text-xl">
                  {`${opt.name} ${opt.price !== 0 ? ` (+₹${opt.price})` : ''}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}
