'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/supabase/utils/client'
import { toast } from 'sonner'
import Image from 'next/image'

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const [btnDisabled, setBtnDisabled] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnDisabled(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    })
    if (error) {
      toast.error(error.message)
      setBtnDisabled(false)
      return
    }
    toast.success('Password reset link sent to your email.')
    form.reset()
    setTimeout(() => {
      setBtnDisabled(false)
    }, 40 * 1000)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 lg:space-y-8 p-10 h-full flex flex-col justify-center"
      >
        <div className="lg:w-100 lg:h-100 w-80 h-80 relative mx-auto">
          <Image
            src="/forgot-password.png"
            alt="Verify OTP"
            fill
            sizes="400px"
            className="object-contain"
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-2xl">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="jhon@doe.com"
                  {...field}
                  className="shadow-shadow lg:text-2xl lg:h-16 "
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={btnDisabled}
          className="text-xl lg:text-2xl h-12 mb-3 mr-2"
        >
          Send reset link
        </Button>
      </form>
    </Form>
  )
}
