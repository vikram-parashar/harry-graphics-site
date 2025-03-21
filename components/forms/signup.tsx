"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { PhoneInput } from "../ui/phone-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signup } from "@/lib/actions/auth"
import { useState } from "react"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import { toast } from "sonner"

const FormSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  phone: z.string( {required_error: "Please provide a phone number."}).
    regex(/^\+\d{12}$/, { message: "Invalid phone number. Must be in the format +<CountryCode><10-digit number>." }),
  name: z.string({ required_error: "Please provide a name.", }),
})

export default function Signup({ redirect }: { redirect: string }) {
  const [passVisible, setPassVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const res = await signup(data, redirect);
    if (res) toast(`Something went wrong (${JSON.stringify(res)})\ntry agin later.`)
    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="max-w-md">
              <FormLabel>Your Name*</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" placeholder="my name is..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" type="email" placeholder="your@email.is" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <>
                  <Input className="bg-rosePineDawn-base"
                    type={passVisible ? "text" : "password"}
                    placeholder="password" {...field} />
                  <Button size='icon' className="absolute top-6 right-2" variant="ghost" type="button" onClick={() => setPassVisible(prev=>!prev)}>
                    {passVisible ? <EyeOff /> : <Eye />}
                  </Button>
                </>
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
                  <PhoneInput placeholder="Enter a phone number" {...field} defaultCountry="IN" className="bg-rosePineDawn-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

