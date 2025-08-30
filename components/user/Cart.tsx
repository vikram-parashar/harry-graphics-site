'use client'
import { Minus, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CartItemType } from "@/lib/types"
import { Highlighter } from "@/components/magicui/highlighter"

const addPrice = (cart: any[]) => {
  return cart.reduce((total, item) => {
    return total + (item.product.price ? item.product.price * item.quantity : 0);
  }, 0);
}

export default function Cart({ cart }: {
  cart: any[]
}) {
  const [cartState, setCartState] = useState<CartItemType[]>(cart);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl my-5 p-2"><Highlighter color="#EEBA58">Shopping Cart</Highlighter></h1>
      <div className="flex flex-col gap-5">
        {cartState.map((item, index) =>
          <CartItem
            key={index}
            item={item}
            setCartState={setCartState}
            index={index} />
        )}
      </div>
      <Button className="mt-5 font-bold text-xl" asChild>
        <Link href="/user/create-order">Create Order for ₹{new Intl.NumberFormat('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(addPrice(cart))}{' '}+ TAX</Link>
      </Button>
    </div>
  )
}
const CartItem = ({ item, index, setCartState }: {
  item: CartItemType,
  index: number,
  setCartState: React.Dispatch<React.SetStateAction<CartItemType[]>>
}) => {
  const MIN_QUANTITY = item.product.min_quantity;

  const [quantity, setQuantity] = useState<number>(item.quantity)

  const handleQuantityChange = (value: number) => {
    const retVal = value < MIN_QUANTITY ? MIN_QUANTITY : value;

    setQuantity(retVal);
    setCartState((prevCart) => {
      prevCart[index].quantity = retVal;
      localStorage.setItem('cart', JSON.stringify(prevCart));
      return [...prevCart];
    });
  }
  const handleRemoveItem = () => {
    setCartState((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  return (
    <div className="rounded-lg bg-secondary-background shadow-shadow border-3 flex flex-col lg:flex-row py-2 px-5 gap-5 justify-between">
      { /* Left Side - Product Image and Details */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex h-full justify-center items-center gap-5 relative">
          <Button
            onClick={handleRemoveItem}
            className="absolute left-5 lg:static"
            size="icon">
            <X />
          </Button>
          <div className="h-40 aspect-square relative">
            <Image
              src={item.product.image}
              fill
              alt={item.product.name}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="h-full">
          <h2 className="text-xl">{item.product.name}</h2>
          {Object.keys(item.options).map((key, index) => (
            <p key={index} className="text-muted-foreground">
              {key}: {item.options[key]}
            </p>
          ))}
        </div>
      </div>
      { /* Right Side - Quantity and Price */}
      <div className="flex h-full items-center gap-5">
        {/* Quantity Input */}
        <div className="">
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
              onBlur={() => { handleQuantityChange(quantity) }}
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
        <span className="text-2xl font-bold block">₹{item.product.price ? (item.product.price * quantity).toFixed(2) : 'price not available'}</span>
      </div>
    </div>
  )
}
