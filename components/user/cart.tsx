'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CartItemType } from "@/lib/types"
import { removeFromCart, updateQuantityInCart } from "@/lib/actions/user"
import { toast } from "sonner"
import { useState } from "react"
import { Info } from "lucide-react"
import Link from "next/link"

export default function Cart({ cart }: { cart: CartItemType[] }) {
  const addPrice = () => {
    return cart.reduce((total, item) =>
      (total + item.product.price * item.quantity)
      , 0);
  }
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cart.map((item, index) =>
          <CartItem item={item} index={index} cart={cart} key={index} />
        )}
      </div>
      <Button size="lg" className="fixed bottom-5 right-[2.5vw] w-[95vw] md:w-[300px] md:right-[50vw] translate-x-1/2" asChild>
        <Link href="/user/create-order">Create Order for ₹{new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(addPrice())}{' '}+ TAX</Link>
      </Button>
    </div>
  )
}
const CartItem = ({ item, index, cart }: { item: CartItemType, index: number, cart: CartItemType[] }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  return (
    <div className="bg-rosePineDawn-surface rounded-lg shadow-md overflow-hidden flex">
      <div className="relative">
        <Image
          src={item.product.image}
          alt="Product Image"
          width="300"
          height="200"
          className="w-full h-48 object-cover"
          style={{ aspectRatio: "300/200", objectFit: "cover" }}
        />
        <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">{`₹${item.product.price * item.quantity} for ${item.quantity}`}</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-2 left-2 text-rosePine-base" variant="ghost"><Info size={20} /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{item.product.name}</DialogTitle>
              <DialogDescription>
                {item.product.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4 flex flex-col justify-between w-full">
        <h3 className="text-lg font-medium mb-2">{item.product.name}</h3>
        <div className="w-full">
          <div className="flex items-center mb-2">
            <Input type="number" min="1" value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              step={10} className="w-16 px-2 py-1 border rounded-md bg-rosePineDawn-overlay" />
            <Button variant="outline" size="sm" className="ml-2 bg-rosePineDawn-overlay"
              onClick={async () => {
                toast('updating quantity...')
                await updateQuantityInCart(index, quantity, cart)
                toast('quantity updated :>')
              }}
            >
              Update
            </Button>
          </div>
          <Button variant="outline" size="sm" className="w-full bg-rosePineDawn-overlay block"
            onClick={async () => {
              toast('removing...')
              await removeFromCart(index, cart)
              toast('removed from cart :>')
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
