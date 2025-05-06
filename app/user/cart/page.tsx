import Cart from "@/components/user/cart";
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCartItems } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page() {
  const data = await getCartItems();
  if (data.success == false) return <>{data.msg}</>

  return (
    <div className="bg-rosePineDawn-base min-h-screen px-2 md:pt-12">
      {data.cart.length > 0 ?
        <Cart cart={data.cart} /> :
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md bg-rosePineDawn-overlay">
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
                <Link href="/">
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
