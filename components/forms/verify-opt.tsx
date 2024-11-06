"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { verify } from "@/lib/actions/auth"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function InputOTPForm({ email }: { email: string }) {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const res = await verify(email, data.pin)
    if (res?.success === false) alert(res.msg);
    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup >
                    <InputOTPSlot index={0} className="bg-rosePineDawn-base" />
                    <InputOTPSlot index={1} className="bg-rosePineDawn-base" />
                    <InputOTPSlot index={2} className="bg-rosePineDawn-base" />
                    <InputOTPSlot index={3} className="bg-rosePineDawn-base" />
                    <InputOTPSlot index={4} className="bg-rosePineDawn-base" />
                    <InputOTPSlot index={5} className="bg-rosePineDawn-base" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
              Sent to {email}<br/>
              <Link href="/auth?type=login" className="underline text-rosePineDawn-text">Change Email?</Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}
          className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
        >
          Verify
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}

