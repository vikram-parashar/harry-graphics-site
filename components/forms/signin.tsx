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
import { login } from "@/lib/actions/auth"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"

const FormSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
})

export default function Signin({redirect}: {redirect: string}) {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const res=await login(data.email,redirect);
    if(res?.success===false)toast(res?.msg)
    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 my-5">
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
        <Button type="submit" disabled={pending}
          className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
        >
          Login
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}

