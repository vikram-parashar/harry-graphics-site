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
import { useRouter } from 'next/navigation'

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirm_password: z.string().min(6, {
      message: 'Confirm Password must be at least 6 characters.',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export default function Page() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  })

  const [btnDisabled, setBtnDisabled] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnDisabled(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    })
    if (error) {
      toast.error(error.message)
      console.error(error)
      setBtnDisabled(false)
      return
    }
    toast.success('Password updated successfully! redirecting...')
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 lg:space-y-8 p-10 h-full flex flex-col justify-center"
      >
        <div className="lg:w-100 lg:h-100 w-50 h-50 relative mx-auto">
          <Image
            src="/reset-password.png"
            alt="Verify OTP"
            fill
            className="object-contain"
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-2xl">Password</FormLabel>
              <Button
                type="button"
                className="absolute top-[40px] scale-75 lg:scale-100 lg:top-[55px] right-3"
                variant="reverse"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </Button>
              <FormControl>
                <Input
                  placeholder="Top Secret"
                  {...field}
                  className="shadow-shadow lg:text-2xl lg:h-16"
                  type={passwordVisible ? 'text' : 'password'}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-2xl">Confirm Password</FormLabel>
              <Button
                type="button"
                className="absolute top-[40px] scale-75 lg:scale-100 lg:top-[55px] right-3"
                variant="reverse"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? 'Hide' : 'Show'}
              </Button>
              <FormControl>
                <Input
                  placeholder="Top Secret Confirmed"
                  {...field}
                  className="shadow-shadow lg:text-2xl lg:h-16"
                  type={confirmPasswordVisible ? 'text' : 'password'}
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
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
