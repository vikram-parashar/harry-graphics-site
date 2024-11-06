'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CartItemType } from "@/lib/types"
import { removeFromCart, updateQuantityInCart } from "@/lib/actions/user"
import { toast } from "sonner"
import { useState } from "react"

export default function Cart({ cart }: { cart: CartItemType[] }) {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cart.map((item, index) =>
          <CartItem item={item} index={index} cart={cart} key={index} />
        )}
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between items-center mb-2">
          <span>Subtotal</span>
          <span>$99.97</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>Shipping</span>
          <span>$4.99</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Total</span>
          <span className="text-lg font-bold">$104.96</span>
        </div>
        <Button size="lg" className="w-full">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}
const CartItem = ({ item, index, cart }: { item: CartItemType, index: number, cart: CartItemType[] }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  return (
    <div className="bg-rosePineDawn-surface rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={item.product.image}
          alt="Product Image"
          width="300"
          height="200"
          className="w-full h-48 object-cover"
          style={{ aspectRatio: "300/200", objectFit: "cover" }}
        />
        <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">{item.product.price}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{item.product.name}</h3>
        <div className="flex items-center mb-2">
          <Input type="number" min="1" value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            step={10} className="w-16 px-2 py-1 border rounded-md bg-rosePineDawn-overlay" />
          <Button variant="outline" size="sm" className="ml-2 bg-rosePineDawn-overlay"
            onClick={async () => {
              toast('updating quantity...')
              await updateQuantityInCart(index, quantity,cart)
              toast('quantity updated :>')
            }}
          >
            Update
          </Button>
        </div>
        <Button variant="outline" size="sm" className="w-full bg-rosePineDawn-overlay"
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
  )
}
