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
import { flagEmojiFromPhone } from '@/lib/utils'
import { createClient } from '@/supabase/utils/client'
import { signup } from '@/lib/actions/auth'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    phone: z
      .string()
      .min(1, {
        message: 'Phone number is required.',
      })
      .regex(/^\+?\d{1,3}\s?\d{1,14}$/, {
        message: 'Invalid phone number format.',
      }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
    confirm_password: z.string().min(6, {
      message: 'Confirm Password must be at least 6 characters.',
    }),
    email: z.string().email({
      message: 'Invalid email address.',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export default function Page() {
  const params = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '+91 ',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  })

  const [btnDisabled, setBtnDisabled] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnDisabled(true)
    const redirectTo = params.get('redirectTo') || '/'
    const res = await signup(
      {
        email: values.email,
        name: values.username,
        password: values.password,
        phone: values.phone,
      },
      redirectTo
    )
    if (!res.success) {
      toast.error(res.msg)
    }
    setBtnDisabled(false)
  }
  function signupWithGoogle() {
    const supabase = createClient()
    console.log('Redirecting to Google OAuth...')
    supabase.auth
      .signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=${params.get('redirectTo') || '/'}`,
        },
      })
      .then(({ error }) => {
        if (error) {
          console.error('Error signing in with Google:', error.message)
        } else {
          console.log('Sign in with Google initiated successfully.')
        }
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 lg:space-y-8 p-5 mt-10 h-full flex flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="O-namae wa?"
                  {...field}
                  className="shadow-shadow lg:text-xl lg:h-12"
                  type="text"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-xl">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="jhon@doe.com"
                  {...field}
                  className="shadow-shadow lg:text-xl lg:h-12 "
                  type="email"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-xl">Phone Number</FormLabel>
              <span className="absolute lg:text-xl top-[50px] lg:top-[50px] left-3">
                {flagEmojiFromPhone(field.value)}
              </span>
              <FormControl>
                <Input
                  placeholder="+91 xxxxx xxxxx"
                  {...field}
                  className="shadow-shadow lg:text-xl lg:h-12 pl-10"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-xl">Password</FormLabel>
              <Button
                type="button"
                className="absolute top-[36px] scale-75 lg:scale-100 lg:top-[40px] right-3"
                variant="reverse"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </Button>
              <FormControl>
                <Input
                  placeholder="Top Secret"
                  {...field}
                  className="shadow-shadow lg:text-xl lg:h-12"
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
              <FormLabel className="text-xl">Confirm Password</FormLabel>
              <Button
                type="button"
                className="absolute top-[36px] scale-75 lg:scale-100 lg:top-[40px] right-3"
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
                  className="shadow-shadow lg:text-xl lg:h-12"
                  type={confirmPasswordVisible ? 'text' : 'password'}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Button
              type="submit"
              disabled={btnDisabled}
              className="text-lg lg:text-xl h-12 mb-3 mr-2"
            >
              Sign Up
            </Button>
            <span>OR</span>
            <Button
              type="button"
              onClick={signupWithGoogle}
              disabled={btnDisabled}
              className="text-lg lg:text-xl rounded-full h-12 mb-3 ml-2 bg-blue-500 text-white"
            >
              <span className="mr-1">G</span>
              Continue with Google
            </Button>
          </div>
          <Link
            href={`/auth/login?redirectTo=${params.get('redirectTo') || '/'}`}
            className="text-center text-lg block lg:text-xl"
            style={{ color: 'black' }}
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
