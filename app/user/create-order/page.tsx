import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CartItems from "./components/cartItems";
import CreateOrderForm from "./components/form";
import { createClient } from "@/supabase/utils/server";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const supabase = await createClient()
  const session = await supabase.auth.getSession()
  if (!session.data.session) redirect('/auth/login?redirectTo=/user/create-order')

  const { data: user, error } = await supabase.from('users').select('*').eq('id', session.data.session.user.id).single();
  if (error || !user) return (
    <div>
      <p className="text-center text-red-500 mt-10">Failed to fetch user data. Please try login again.</p>
    </div>
  )

  return (
    <div className="bg-secondary-background min-h-screen lg:pt-20 relative">
      <Button asChild>
        <Link href="/user/cart" className="absolute top-4 left-4 lg:top-20 lg:left-20">
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Go back to cart</span>
        </Link>
      </Button>
      <Card className="mx-auto max-w-xl bg-background lg:min-h-auto font-semibold">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Confirm Order & Pay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CartItems />
          <CardTitle className="text-2xl font-bold text-center">Contact Info</CardTitle>
          <CreateOrderForm user={user} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {/* <CreateOrderForm cart={cart} />*/}
        </CardFooter>
      </Card>
    </div>
  )
}
