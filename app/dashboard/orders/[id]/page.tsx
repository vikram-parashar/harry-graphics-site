import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { OrderType } from "@/lib/types";
import { OrderItem } from "@/components/user/orders";
import UserCard from "../user-card";
import UpdateOrderStatus from "@/components/dashboard/orders/update-order-status";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient(cookies());

  /**** get order ****/
  const orderRes = await supabase.from('orders').select().eq('id', params.id).single()
  if (orderRes.error || !orderRes.data) {
    console.log(orderRes.error)
    return (
      <div className="flex text-2xl font-black h-screen justify-center items-center">
        ORDER WITH ID {params.id} NOT FOUND
      </div>
    )
  }
  const order: OrderType = orderRes.data
  order.payment_full = supabase.storage.from('images').getPublicUrl(order.payment).data.publicUrl

  return (
    <div className="mt-10 max-w-3xl mx-auto flex flex-col gap-5">
      <UserCard id={order.user_id} />
      <OrderItem item={order} cancelBy="admin"/>
      <UpdateOrderStatus orderId={order.id} oldStatus={order.status}/>
    </div >
  )
}
