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
import { ExternalLink, LoaderCircle } from "lucide-react"
import { CartItemType } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { insertOrder } from "@/lib/actions/orders"

const FormSchema = z.object({
  profile_check: z.literal(true, {
    message: 'Please check the box'
  }),
  note: z.string().optional(),
})

export default function NewOrder({ cart }: { cart: CartItemType[] }) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    toast('creating order...')
    const id = crypto.randomUUID();

    const res = await uploadImage('payments', id, selectedFile);

    if (res.path) {
      const orderRes = await insertOrder(id, data.note || '', cart, res.path,
        new Date(Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      );
      if (orderRes) {
        if (!orderRes.success) toast(orderRes.msg)
      }
    }

    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 relative">
        <FormField
          control={form.control}
          name="profile_check"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <div className="flex justify-start gap-5 w-full text-xl items-center">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <p>Have you reviewed your profile?</p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href="/user/profile" className="underline flex justify-end w-full text-sm absolute top-8" target="_blank">Update Profile<ExternalLink className="ml-1" size={16} /></Link>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extra Note</FormLabel>
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


