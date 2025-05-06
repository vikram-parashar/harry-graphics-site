'use client'
import { Minus, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CartItemType } from "@/lib/types"
import { removeFromCart, updateQuantityInCart } from "@/lib/actions/user"
import { toast } from "sonner"
import { useState } from "react"
import { Info } from "lucide-react"
import Link from "next/link"
import { addPrice } from "@/lib/utils"

export default function Cart({ cart }: { cart: CartItemType[] }) {
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
        }).format(addPrice(cart))}{' '}+ TAX</Link>
      </Button>
    </div>
  )
}
const CartItem = ({ item, index, cart }: { item: CartItemType, index: number, cart: CartItemType[] }) => {
  const MIN_QUANTITY = item.product.min_quantity || 1;
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const handleQuantityChange = (value: number) => {
    if (value >= MIN_QUANTITY) setQuantity(value)
  }
  return (
    <div className="bg-rosePineDawn-surface rounded-lg shadow-md overflow-hidden flex">
      <div className="relative">
        <Image
          src={item.product.image || '/notFoundP.jpg'}
          alt="Product Image"
          width="300"
          height="200"
          className="w-full h-48 object-cover"
          style={{ aspectRatio: "300/200", objectFit: "cover" }}
        />
        <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-1 rounded-md text-xs">{`₹${(item.product.price * item.quantity).toFixed(2)} for ${item.quantity}`}</div>
      </div>
      <div className="p-4 flex flex-col justify-between w-full">
        <h3 className="text-lg font-medium mb-2">{item.product.name}</h3>
        {Object.keys(JSON.parse(item.product.options)).map((opt, index) =>
          <p key={index}>{`${opt} : ${JSON.parse(item.product.options)[opt]}`}</p>
        )}
        <div className="w-full pt-3">
          <div className="flex items-center mb-2">
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
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value)) }
                  onBlur={() => { if (quantity < MIN_QUANTITY) setQuantity(MIN_QUANTITY) }}
                  className="w-16 text-center mx-2"
                />
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
