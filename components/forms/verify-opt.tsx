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
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
    if (res) {
      toast(res.msg);
    }
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
              <FormLabel className="text-2xl block font-bold text-center">Enter Verification Code </FormLabel>
              <p className="text-center mb-4 text-muted-foreground">
                We have sent a code to <span className="font-medium text-foreground">{email}</span>
              </p>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="w-full justify-center gap-2 my-5">
                    <InputOTPSlot index={0} className="w-12 h-12 text-center text-lg border-rosePineDawn-love rounded-md" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-center text-lg border-l rounded-md border-rosePineDawn-love" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-center text-lg border-l rounded-md border-rosePineDawn-love" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-center text-lg border-l rounded-md border-rosePineDawn-love" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-center text-lg border-l rounded-md border-rosePineDawn-love" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-center text-lg border-l rounded-md border-rosePineDawn-love" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                <Link href="/auth?type=login" className="underline text-rosePineDawn-text text-right block">Change Email?</Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={pending}
          className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love mx-auto block"
        >
          Verify
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}

