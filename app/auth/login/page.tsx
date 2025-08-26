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
import { login } from '@/lib/actions/auth'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const formSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
})

export default function Page() {
  const params = useSearchParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnDisabled(true);
    const redirectTo = params.get("redirectTo") || '/explore';
    const res = await login(values.email, values.password, redirectTo)
    if (!res.success) {
      toast.error(res.msg)
    }
    setBtnDisabled(false);
  }
  function signupWithGoogle() {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000/auth/callback?next=${params.get("redirectTo") || '/explore'}`,
      },
    }).then(({ error }) => {
      if (error) {
        console.error('Error signing in with Google:', error.message);
      } else {
        console.log('Sign in with Google initiated successfully.');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 lg:space-y-8 p-10 h-full flex flex-col justify-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-2xl'>Email</FormLabel>
              <FormControl>
                <Input placeholder="jhon@doe.com"
                  {...field} className='shadow-shadow lg:text-xl lg:h-12 ' />
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
            <FormItem className='relative'>
              <FormLabel className='text-2xl'>Password</FormLabel>
              <Button
                type="button"
                className='absolute top-[40px] scale-75 lg:scale-100 lg:top-[55px] right-3'
                variant="reverse"
                onClick={() => setPasswordVisible(!passwordVisible)} >
                {passwordVisible ? 'Hide' : 'Show'}
              </Button>
              <FormControl>
                <Input placeholder="Top Secret" {...field} className='shadow-shadow lg:text-xl lg:h-12' type={passwordVisible ? 'text' : 'password'} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className='flex flex-col items-center justify-center gap-1'>
            <Button
              type="submit"
              disabled={btnDisabled}
              className='text-lg lg:text-xl h-12 mb-3 mr-2'>
              Login
            </Button>
            <span>OR</span>
            <Button
              type="button"
              onClick={signupWithGoogle}
              disabled={btnDisabled}
              className='text-lg lg:text-xl rounded-full h-12 mb-3 ml-2 bg-blue-500 text-white' >
              <span className='mr-1'>G</span>
              Continue with Google
            </Button>
          </div>
          <Link href={`/auth/signup?redirectTo=${params.get("redirectTo") || '/explore'}`} className='text-center text-lg block lg:text-xl'>Don't have an account? Sign up</Link>
          <Link href='/auth/forgot-password' className='text-center text-lg block lg:text-xl'>Forgot Password?</Link>
        </div>
      </form>
    </Form>
  );
}
