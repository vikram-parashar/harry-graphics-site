"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "../ui/phone-input"
import { Database } from "@/lib/types"
type UserType = Database['public']['Tables']['users']['Row']
import { toast } from "sonner"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import { updateUser } from "@/lib/actions/user"

const FormSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  name: z.string({ required_error: "Please provide a name.", }),
  phone: z.string().regex(/^\+\d{12}$/, { message: "Invalid phone number. Must be in the format +<CountryCode><10-digit number>." }),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, { message: "Invalid Pincode. Must be a 6 digit number." }).optional(),
})

export default function UserProfile({ user }: { user: UserType }) {
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: user.email || "",
      name: user.name || "",
      phone: user.phone || "",
      address_line_1: user.address_line_1 || "",
      address_line_2: user.address_line_2 || "",
      city: user.city || "",
      pincode: user.pincode || "",
    }

  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('hello');
    console.log(data)
    setPending(true)
    toast('updating profile...')
    await updateUser(user.id, data.name, data.phone, data.address_line_1, data.address_line_2, data.city, data.pincode);
    toast('profile updated :>')
    setPending(false)
  }

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center py-5 pt-16">
        My Profile
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-3xl mx-auto space-y-2 border p-5 md:p-10 border-rosePineDawn-subtle bg-rosePineDawn-surface rounded-lg">
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
          <FormItem className="max-w-md">
            <FormLabel>Your Email</FormLabel>
            <FormControl>
              <Input className="bg-rosePineDawn-base" value={user.email} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="max-w-md">
                <FormLabel className="text-left">Phone Number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput placeholder="Enter a phone number" {...field} defaultCountry="IN" className="bg-rosePineDawn-base" />
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
            Update Profile
            {pending && <LoaderCircle className="inline animate-spin ml-1" />}
          </Button>
        </form>
      </Form>
    </>
  )
}

