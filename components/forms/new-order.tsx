"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { uploadImage } from "@/lib/actions/image"
import Image from "next/image"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { CartItemType } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import { insert, update } from "@/lib/actions/crud"
import { createClient } from "@/supabase/utils/client"
import { handleMail } from "@/lib/actions/mail"

const FormSchema = z.object({
  note: z.string().optional(),
})

export default function NewOrder({ cart }: { cart: CartItemType[] }) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('helll')
    setPending(true)
    const supabase = createClient()
    const id = crypto.randomUUID();
    const res = await uploadImage('payments', selectedFile,50);

    const ordersRes = await supabase.from('orders').select('')
    if (ordersRes.error) return {
      success: false,
      msg: 'Please check your connection.',
    }
    const order_number = ordersRes.data.length + 10000;

    const userRes = await supabase.auth.getSession();
    if (userRes.error || !userRes.data.session) {
      toast('Please login again.')
      return
    }

    const user_id = userRes.data.session.user.id;
    if (res.path) {
      const orderRes = await insert({
        id,
        user_id,
        cart,
        note: data.note,
        payment: res.path,
        status: 'Unconfirmed',
        order_number,
        ordered_on: new Date(Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }, 'orders', '/user/orders', null);

      if (!orderRes.success) toast('Something went wrong')
      else {
        await handleMail(`New Order from ${userRes.data.session.user.email}`, `
                   <h1>Order Details</h1>
                   <p>Order Number: ${order_number}</p>
                   <p>Ordered on: ${new Date(Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                   <p>Payment Reciept: <a href="${supabase.storage.from('images').getPublicUrl(res.path).data.publicUrl}">View</a></p>
                   <p>Extra Note: ${data.note}</p>
                   <h1>Products</h1>
                   <ul>
                   <li> ${cart.map(item => item.product.name).join('</li><li>')} </li>
                   </ul>
                   <a href="https://harrygraphics.in/dashboard/orders?orderId=${id}>Visit on Site</a>
        `)

        await update(user_id, {
          cart: []
        }, 'users', '/user/cart', '/user/orders')

      }
    }

    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 relative">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extra Notes</FormLabel>
              <FormControl>
                <Textarea className="bg-rosePineDawn-base" placeholder="different address from profile? Is it urgent? Note for payment?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          {selectedFile &&
            <Image
              height={150}
              width={150}
              alt="preview"
              className="w-full h-auto"
              src={URL.createObjectURL(selectedFile)}
            />}
          <FormLabel>Payment Reciept</FormLabel>
          <Input className="bg-rosePineDawn-base" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0])} />
        </FormItem>
        <Button type="submit" disabled={pending}
          className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
        >
          Create Order
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}


