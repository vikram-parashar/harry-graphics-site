import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Link2 } from "lucide-react"
import Link from "next/link";
import QRCode from "react-qr-code";
import NewOrder from "@/components/forms/new-order";
import { addPrice } from "@/lib/utils";
import { getCartItems, getUser } from "@/lib/queries";

export default async function UpiPaymentPage() {
  const cartFetch = await getCartItems();
  const user = await getUser();
  if (!cartFetch) return <>Cant fetch data :(</>

  const cart = cartFetch.cart;
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
          {(!user.address_line_1 || !user.city || !user.pincode) ?
            <p className="text-red-400"><b>Complete your address in Profile !!!</b></p> :
            (user.address_line_2) ?
              <p><b>Delivery @</b> {`${user.address_line_1},${user.address_line_2}, ${user.city}, ${user.pincode}`}</p> :
              <p><b>Delivery @</b> {`${user.address_line_1}, ${user.city}, ${user.pincode}`}</p>
          }
          <Link href="/user/profile" className="w-full underline" target="_blank">Update Profile<ExternalLink className="ml-1 inline" size={16} /></Link>
          <NewOrder cart={cart} />
        </CardFooter>
      </Card>
    </div>
  )
}
