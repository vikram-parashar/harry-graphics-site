import Link from 'next/link'
import { Package2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Orders from "@/components/user/orders";
import { getOrders } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page() {
  const orders=await getOrders();

  return (
    <div className="bg-rosePineDawn-base min-h-screen px-2 md:pt-12">
      {orders.length > 0 ?
        <Orders orders={orders} /> :
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md bg-rosePineDawn-overlay">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Package2 className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold">You have not ordered anything yet.</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Browse though our products, add to cart, go to cart and create an order :?
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
