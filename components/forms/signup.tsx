"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login, signup } from "@/lib/actions/auth"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import { PhoneInput } from "../ui/phone-input"

const FormSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  name: z.string({ required_error: "Please provide a name.", }),
  phone: z.string().regex(/^\+\d{12}$/, { message: "Invalid phone number. Must be in the format +<CountryCode><10-digit number>." }),
  address_line_1: z.string({ required_error: "Please provide an address.", }),
  address_line_2: z.string().optional(),
  city: z.string({ required_error: "Please select a city.", }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Invalid Pincode. Must be a 6 digit number." }),
})

export default function Signup() {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const res = await signup(data);
    if (res) toast(`Something went wrong (${JSON.stringify(res)})\ntry agin later.`)
    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" type="email" placeholder="your@email.is" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="max-w-md">
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" placeholder="my name is..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="max-w-md">
              <FormLabel className="text-left">Phone Number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="Enter a phone number" {...field} defaultCountry="IN" className="bg-rosePineDawn-base rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_line_1"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_line_2"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Address Line 2</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input className="bg-rosePineDawn-base" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input className="bg-rosePineDawn-base" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={pending}
          className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
        >
          Sign up
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}

