'use client'
import { Separator } from "@/components/ui/separator";
import { CartItemType } from "@/lib/types";

const addPrice = (cart: CartItemType[]) => {
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}

export default function CartItems() {
  if (typeof window === "undefined") {
    return null; // Ensure this runs only in the browser
  }
  const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItemType[];

  return (
    <>
      <div className="space-y-2 font-semibold text-xl">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p>{item.product.name}</p>
              {Object.keys(item.options).map((key, index) => (
                <p key={index} className="text-muted-foreground text-sm">
                  {key}: {item.options[key]}
                </p>
              ))}
              <p className="text-lg text-muted-foreground">Quantity: {item.quantity}</p>
            </div>
            <p>₹{(item.product.price * item.quantity).toFixed(2)}</p>
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
    </>
  );
}
