"use client"

import { v4 as uuidv4 } from 'uuid';
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
import { Link2, LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { insert } from "@/lib/actions/crud"
import { createClient } from "@/supabase/utils/client"
import QRCode from "react-qr-code"
import { Separator } from "../ui/separator"

const FormSchema = z.object({
  name: z.string({
    required_error: "Organization name is required"
  })
})

export default function NewOrganization() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const supabase = createClient()
    const id = uuidv4();
    const res = await uploadImage('payments', selectedFile, 50);

    const userRes = await supabase.auth.getSession();
    if (userRes.error || !userRes.data.session) {
      toast('Please login to continue')
      return
    }
    const user_id = userRes.data.session.user.id;

    if (res.path) {
      const orderRes = await insert({
        id,
        name: data.name,
        payment: res.path,
        status: 'Unconfirmed',
        owner_id: user_id,
        ordered_on: new Date(Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      }, 'organizations', '/user/id-records', '/user/id-records');

      if (orderRes && !orderRes.success) toast('Something went wrong')
      else {
        // await handleMail(`New Organization Request from ${userRes.data.session.user.email}`, `
        //                  <h3>Organization Name: ${data.name}</h3>
        //                  <p>Payment Reciept: <a href="${supabase.storage.from('images').getPublicUrl(res.path).data.publicUrl}">View</a></p>
        // `)
      }
    }

    setPending(false)
  }
  const upiLink = () => {
    return `upi://pay?pa=harrygraphics@icici&pn=Vikram%20Parashar&am=${300}&cu=INR`
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl w-full mx-auto space-y-4 relative text-rosePine-text dark bg-rosePine-surface p-5 rounded-lg">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input className="bg-rosePine-base" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">Sign Up Charges</p>
          <p className="text-lg font-bold">₹{new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(300)}</p>
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
          <Input className="bg-rosePine-base" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0])} />
        </FormItem>
        <Button type="submit" disabled={pending} className="disabled:opacity-70 bg-rosePine-rose hover:bg-rosePine-love ml-auto block" >
          Create Organization
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}


