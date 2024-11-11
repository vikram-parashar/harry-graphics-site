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
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { handleMail } from "@/lib/actions/mail"
import { toast } from "sonner"

const FormSchema = z.object({
  name: z.string({
    required_error: "Please fill your name"
  }),
  contact: z.string({
    required_error: "Please fill your contact"
  }),
  message: z.string({
    required_error: "Please fill your message"
  }),
})


export default function ContactForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const res = await handleMail("Message from harrygraphics.in", `
                         <h2>From: ${data.name}</h2>
                         <h3>Contact(s): ${data.contact}</h3>
                         <p>Message: ${data.message}</p>
                        `)

    toast(res.msg)
    setPending(false)
  }

  return (
    <div className="bg-rosePine-base pb-10">
      <div className="mx-auto max-w-md px-5 py-16 lg:mx-auto lg:flex lg:max-w-6xl">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="mb-6 text-3xl text-rosePine-iris lg:text-5xl lg:leading-snug">
            SEND US A MESSAGE
          </h1>
          <p className="mb-8 w-4/5 text-rosePine-iris">
            If you are interested in hearing more about the way we work, have a
            business proposal, or are interested in making a purchase, we would
            love to hear from you.
          </p>
          {/* Seprator */}
          <div className="clr-invert mb-6 h-[6px] w-12 lg:h-4 lg:w-24"></div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-1/2 text-rosePine-text flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='bg-rosePine-base px-1 relative top-3 left-5'>Your Name</FormLabel>
                  <FormControl>
                    <Input className="block w-full border-2 rounded-md border-rosePine-gold bg-rosePine-base h-12 text-rosePine-rose placeholder-rosePine-subtle focus:outline-none" placeholder="My name is"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='bg-rosePine-base px-1 relative top-3 left-5'>Contact</FormLabel>
                  <FormControl>
                    <Input className="block w-full border-2 rounded-md border-rosePine-gold bg-rosePine-base h-12 text-rosePine-rose placeholder-rosePine-subtle focus:outline-none" placeholder="Phone number/ email/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='bg-rosePine-base px-1 relative top-3 left-5'>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="block w-full border-2 rounded-md border-rosePine-gold bg-rosePine-base p-3 text-rosePine-rose placeholder-rosePine-subtle focus:outline-none" placeholder="query about a product/service..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}
              className="rounded-md bg-rosePine-gold px-16 py-3 font-bold text-rosePine-base cursor-pointer mt-5 disabled:opacity-70 hover:bg-rosePineDawn-gold"
            >
              Send Message
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
