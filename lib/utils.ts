import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CartItemType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addPrice = (cart:CartItemType[]) => {
  return cart.reduce((total, item) =>
    (total + item.product.price * item.quantity)
    , 0);
}
