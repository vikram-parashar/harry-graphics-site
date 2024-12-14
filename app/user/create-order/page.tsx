import { CartItemType } from "@/lib/types";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link2 } from "lucide-react"
import Link from "next/link";
import QRCode from "react-qr-code";
import NewOrder from "@/components/forms/new-order";
import { addPrice } from "@/lib/utils";

export default async function UpiPaymentPage() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  /**** get cart items ****/
  const cartRes = await supabase.from('users').select('cart').eq('id', data.session.user.id).single();
  if (cartRes.error || !cartRes.data) {
    console.log(cartRes.error)
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Cart data</div>
  }

  const cart: CartItemType[] = cartRes.data.cart

  const upiLink = () => {
    return `upi://pay?pa=harrygraphics@icici&pn=Vikram%20Parashar&am=${addPrice(cart)}&cu=INR`
  }

  return (
    <div className="min-h-screen bg-rosePineDawn-base flex items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-md bg-rosePineDawn-surface">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Confirm Order & Pay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold">₹{new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(addPrice(cart))}</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center">Scan the QR code below to pay with UPI</p>
            <div className="bg-white p-4 rounded-lg">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={upiLink()}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="text-sm text-muted-foreground">Or pay to UPI ID: {" "}
              <Link href={upiLink()} target="_blank" className="underline md:hidden">
                harrygraphics21@oksbi{" "}<Link2 className="inline" size={12} />
              </Link>
              <span className="hidden md:inline">
                harrygraphics21@oksbi
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <NewOrder cart={cart} />
        </CardFooter>
      </Card>
    </div>
  )
}
