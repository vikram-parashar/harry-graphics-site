import Link from 'next/link'
import { Package2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/supabase/utils/server";
import Orders from '@/components/user/Orders';

const getOrders = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('orders').select().order('created_at', { ascending: false })
  if (error || !data) {
    console.error('Error fetching orders: ', error)
    return []
  }
  return data
}

export default async function Page() {
  const orders = await getOrders();

  return (
    <div className="max-w-6xl mx-auto min-h-screen p-2 bg-background rounded-lg border-3">
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
