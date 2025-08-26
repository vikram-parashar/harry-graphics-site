"use client";
import Cart from "./components/cart";
import Link from 'next/link'
import { ArrowLeft, Home, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { CartItemType } from "@/lib/types";

export default function Page() {
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartItems);
  }, []);

  return (
    <div className="min-h-screen px-2 md:pt-12 pb-10">
      <Button asChild>
        <Link href="/explore" className="absolute top-9 right-4 lg:top-20 lg:left-20 w-10">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back to cart</span>
        </Link>
      </Button>
      {cart.length > 0 ?
        <Cart cart={cart} /> :
        <div className="flex items-center justify-center min-h-screen px-5">
          <Card className="w-full max-w-md bg-secondary-background">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold">Your cart is empty</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Looks like you have not added anything to your cart yet.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/explore">
                  Continue Shopping
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      }
    </div>
  )
}
