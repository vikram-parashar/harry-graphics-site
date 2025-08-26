import Link from 'next/link'
import { ArrowLeft, Package2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getOrders } from "@/lib/queries";
import OrderList from './components/orderList';

export default async function Page() {
  const orders = await getOrders();

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-2 pb-20">
      <Button asChild>
        <Link href="/explore" className="absolute top-10 right-4 lg:top-16 lg:left-20 max-w-10">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back to cart</span>
        </Link>
      </Button>
      {orders.length > 0 ?
        <OrderList orders={orders} /> :
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
