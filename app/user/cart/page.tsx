import Cart from "@/components/cart/cart";
import { CartItemType } from "@/lib/types";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  /**** get cart items ****/
  const cartRes = await supabase.from('users').select('cart').eq('id', data.session.user.id).single();
  if (cartRes.error || !cartRes.data) {
    console.log(cartRes.error)
    redirect('/error')
  }

  const cart: CartItemType[] = cartRes.data.cart

  return (
    <div className="bg-rosePineDawn-base min-h-screen px-5 md:pt-12">
      <Cart cart={cart} />
    </div>
  )
}
