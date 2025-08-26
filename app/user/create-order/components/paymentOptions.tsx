'use client'
import { Link2 } from "lucide-react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { CartItemType } from "@/lib/types";

const addPrice = (cart: CartItemType[]) => {
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}


export default function PaymentOptions() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItemType[];

  const upiLink = () => {
    return `upi://pay?pa=harrygraphics@icici&pn=Vikram%20Parashar&am=${addPrice(cart)}&cu=INR`
  }

  return (
    <div>
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
    </div>
  );
}
