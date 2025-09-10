'use client'
import { Minus, Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CartItemType } from '@/lib/types'
import { Highlighter } from '@/components/magicui/highlighter'
import { ShoppingCart } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const addPrice = (cart: any[]) => {
  return cart.reduce((total, item) => {
    return total + (item.product.price ? item.product.price * item.quantity : 0)
  }, 0)
}

export default function Cart() {
  const [cart, setCart] = useState<CartItemType[]>([])

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(cartItems)
  }, [])

  return (
    <div className="min-h-screen p-5 bg-background border-3 rounded-lg">
      {cart.length > 0 ? (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl my-5 p-2">
            <Highlighter>Shopping Cart</Highlighter>
          </h1>
          <div className="flex flex-col gap-5">
            {cart.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                setCartState={setCart}
                index={index}
              />
            ))}
          </div>
          <Button className="mt-5 font-bold text-xl" asChild>
            <Link href="/user/create-order">
              Create Order for ₹
              {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(addPrice(cart))}{' '}
              + TAX
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen px-5">
          <Card className="w-full max-w-md bg-secondary-background text-background">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Your cart is empty
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Looks like you have not added anything to your cart yet.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
const CartItem = ({
  item,
  index,
  setCartState,
}: {
  item: CartItemType
  index: number
  setCartState: React.Dispatch<React.SetStateAction<CartItemType[]>>
}) => {
  const MIN_QUANTITY = item.product.min_quantity

  const [quantity, setQuantity] = useState<number>(item.quantity)

  const handleQuantityChange = (value: number) => {
    const retVal = value < MIN_QUANTITY ? MIN_QUANTITY : value

    setQuantity(retVal)
    setCartState((prevCart) => {
      prevCart[index].quantity = retVal
      localStorage.setItem('cart', JSON.stringify(prevCart))
      return [...prevCart]
    })
  }
  const handleRemoveItem = () => {
    setCartState((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    })
  }

  return (
    <div className="rounded-lg border-3 border-secondary-background flex flex-col lg:flex-row py-2 px-5 gap-5 justify-between">
      {/* Left Side - Product Image and Details */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex h-full justify-center items-center gap-5 relative">
          <Button
            onClick={handleRemoveItem}
            className="absolute left-5 lg:static"
            size="icon"
          >
            <X
              style={{
                stroke: 'white',
              }}
            />
          </Button>
          <div className="h-40 aspect-square relative">
            <Image
              src={item.product.image}
              fill
              sizes="(max-width:1000px) 40vw, 10vw"
              alt={item.product.name}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="h-full">
          <h2 className="text-xl">{item.product.name}</h2>
          <div className="ml-3">
            {Object.keys(item.options).map((key, index) => (
              <p key={index} className="text-muted-foreground">
                {key}: {item.options[key]}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side - Quantity and Price */}
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
              onBlur={() => {
                handleQuantityChange(quantity)
              }}
              style={{
                color: 'black',
              }}
              className="w-20 text-center mx-2 font-black text-2xl bg-transparent border-none"
            />
            <Button
              size="icon"
              onClick={() => handleQuantityChange(quantity + 10)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Price Display */}
        <span className="text-2xl font-bold block">
          ₹
          {item.product.price
            ? (item.product.price * quantity).toFixed(2)
            : 'price not available'}
        </span>
      </div>
    </div>
  )
}
