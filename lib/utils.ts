import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Database } from "@/lib/types"
type CartItemType = Database['public']['Tables']['users']['Row']['cart']

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addPrice = (cart: CartItemType[]) => {
  return cart.reduce((total: number, item) => {
    const price: number = item?.['product'].price ?? 0;
    const quantity: number = item?.['quantity'] ?? 0;
    return total + price * quantity;
  }, 0);
};

