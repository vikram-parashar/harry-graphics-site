'use client'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { resendOTP, verify } from '@/lib/actions/auth'

const formSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters long'),
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const searchParams = useSearchParams()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const redirectTo = searchParams.get('redirectTo') || '/'
    const email = searchParams.get('email') || ''
    const res = await verify(email, values.otp, redirectTo)
    if (!res.success) {
      console.error(res.msg)
      toast.error(res.msg)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full justify-center items-center flex-col gap-2 w-auto"
      >
        <div className="lg:w-100 lg:h-100 w-50 h-50 relative mx-auto">
          <Image
            sizes="400px"
            src="/otp-verify.png"
            alt="Verify OTP"
            fill
            className="object-contain"
          />
        </div>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl text-center">
                Enter OTP Code
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} style={{ color: 'white' }} />
                    <InputOTPSlot index={1} style={{ color: 'white' }} />
                    <InputOTPSlot index={2} style={{ color: 'white' }} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} style={{ color: 'white' }} />
                    <InputOTPSlot index={4} style={{ color: 'white' }} />
                    <InputOTPSlot index={5} style={{ color: 'white' }} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          type="button"
          className="w-50 underline p-0"
          onClick={async () => {
            form.reset()
            const email = searchParams.get('email')
            if (!email) {
              toast.error('Email is required to resend OTP')
              return
            }
            const res = await resendOTP(email)
            if (!res.success) {
              console.error(res.msg)
              toast.error(res.msg)
            } else toast.success(res.msg)
          }}
        >
          Resend OTP ?
        </button>
        <Button type="submit" className="w-70 mt-5">
          Verify Code
        </Button>
      </form>
    </Form>
  )
}
