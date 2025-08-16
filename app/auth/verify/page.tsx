'use client'
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
import { Input } from '@/components/ui/input'
import { flagEmojiFromPhone } from '@/lib/utils'
import { createClient } from '@/supabase/utils/client'
import { signup } from '@/lib/actions/auth'
import { redirect, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  phone: z.string().min(1, {
    message: 'Phone number is required.',
  }).regex(/^\+?\d{1,3}\s?\d{1,14}$/, {
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
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
})

function signupWithGoogle() {
  const supabase = createClient()
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  }).then(({ error }) => {
    if (error) {
      console.error('Error signing in with Google:', error.message);
    } else {
      console.log('Sign in with Google initiated successfully.');
    }
  });
}

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "+91 ",
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const searchParams = useSearchParams();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const redirectTo = searchParams.get('redirectTo') || '/';
    const res = await signup({
      email: values.email,
      name: values.username,
      password: values.password,
      phone: values.phone,
    }, redirectTo)
    if (!res.success) {
      toast.error(res.msg)
    }
  }

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 lg:space-y-8 p-10 ">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-2xl'>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="O-namae wa?" {...field} className='shadow-shadow lg:text-2xl lg:h-16' />
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
            <FormItem className='relative'>
              <FormLabel className='text-2xl'>Email</FormLabel>
              <FormControl>
                <Input placeholder="jhon@doe.com"
                  {...field} className='shadow-shadow lg:text-2xl lg:h-16 ' />
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
            <FormItem className='relative'>
              <FormLabel className='text-2xl'>Phone Number</FormLabel>
              <span className='absolute lg:text-2xl top-[55px] left-3'>
                {flagEmojiFromPhone(field.value)}
              </span>
              <FormControl>
                <Input placeholder="+91 xxxxx xxxxx" {...field} className='shadow-shadow lg:text-2xl lg:h-16 pl-10' />
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
                <Input placeholder="Top Secret" {...field} className='shadow-shadow lg:text-2xl lg:h-16' type={passwordVisible ? 'text' : 'password'} />
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
            <FormItem className='relative'>
              <FormLabel className='text-2xl'>Confirm Password</FormLabel>
              <Button
                type="button"
                className='absolute top-[40px] scale-75 lg:scale-100 lg:top-[55px] right-3'
                variant="reverse"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} >
                {confirmPasswordVisible ? 'Hide' : 'Show'}
              </Button>
              <FormControl>
                <Input placeholder="Top Secret Confirmed" {...field} className='shadow-shadow lg:text-2xl lg:h-16' type={confirmPasswordVisible ? 'text' : 'password'} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center flex-col gap-2 mt-5'>
          <Button type="submit" className='text-2xl h-12 mb-3'>Sign Up</Button>
          <span>OR</span>
          <svg onClick={signupWithGoogle} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="lg:w-40 lg:h-40 w-20 h-20 cursor-pointer" viewBox="0 0 100 100">
            <path fill="#78a0cf" d="M13 27A2 2 0 1 0 13 31A2 2 0 1 0 13 27Z"></path><path fill="#f1bc19" d="M77 12A1 1 0 1 0 77 14A1 1 0 1 0 77 12Z"></path><path fill="#cee1f4" d="M50 13A37 37 0 1 0 50 87A37 37 0 1 0 50 13Z"></path><path fill="#f1bc19" d="M83 11A4 4 0 1 0 83 19A4 4 0 1 0 83 11Z"></path><path fill="#78a0cf" d="M87 22A2 2 0 1 0 87 26A2 2 0 1 0 87 22Z"></path><path fill="#fbcd59" d="M81 74A2 2 0 1 0 81 78 2 2 0 1 0 81 74zM15 59A4 4 0 1 0 15 67 4 4 0 1 0 15 59z"></path><path fill="#78a0cf" d="M25 85A2 2 0 1 0 25 89A2 2 0 1 0 25 85Z"></path><path fill="#fff" d="M18.5 51A2.5 2.5 0 1 0 18.5 56A2.5 2.5 0 1 0 18.5 51Z"></path><path fill="#f1bc19" d="M21 66A1 1 0 1 0 21 68A1 1 0 1 0 21 66Z"></path><path fill="#fff" d="M80 33A1 1 0 1 0 80 35A1 1 0 1 0 80 33Z"></path><g><path fill="#ea5167" d="M35.233,47.447C36.447,40.381,42.588,35,50,35c3.367,0,6.464,1.123,8.968,2.996l6.393-6.885 C61.178,27.684,55.83,25.625,50,25.625c-11.942,0-21.861,8.635-23.871,20.001L35.233,47.447z"></path><path fill="#00a698" d="M58.905,62.068C56.414,63.909,53.335,65,50,65c-7.842,0-14.268-6.02-14.934-13.689l-8.909,2.97 C28.23,65.569,38.113,74.125,50,74.125c6.261,0,11.968-2.374,16.27-6.27L58.905,62.068z"></path><path fill="#48bed8" d="M68.5,45.5h-4.189H50.5v9h13.811c-1.073,3.414-3.333,6.301-6.296,8.179l7.245,6.038 c5.483-4.446,8.99-11.233,8.99-18.842c0-1.495-0.142-2.955-0.401-4.375H68.5z"></path><path fill="#fde751" d="M35,50c0-2.183,0.477-4.252,1.316-6.123l-7.818-5.212c-1.752,3.353-2.748,7.164-2.748,11.21 c0,3.784,0.868,7.365,2.413,10.556L36,55C35.634,53.702,35,51.415,35,50z"></path></g><g><path fill="#472b29" d="M50,74.825c-13.757,0-24.95-11.192-24.95-24.95S36.243,24.925,50,24.925 c5.75,0,11.362,2.005,15.804,5.646l0.576,0.472l-7.327,7.892l-0.504-0.377C56.051,36.688,53.095,35.7,50,35.7 c-7.885,0-14.3,6.415-14.3,14.3S42.115,64.3,50,64.3c5.956,0,11.195-3.618,13.324-9.1L50,55.208l-0.008-10.184l24.433-0.008 l0.104,0.574c0.274,1.503,0.421,2.801,0.421,4.285C74.95,63.633,63.758,74.825,50,74.825z M50,26.325 c-12.985,0-23.55,10.564-23.55,23.55S37.015,73.425,50,73.425s23.55-10.564,23.55-23.55c0-1.211-0.105-2.228-0.3-3.458H51.192 L51.2,53.8h14.065l-0.286,0.91C62.914,61.283,56.894,65.7,50,65.7c-8.657,0-15.7-7.043-15.7-15.7S41.343,34.3,50,34.3 c3.19,0,6.245,0.955,8.875,2.768l5.458-5.878C60.238,28.048,55.178,26.325,50,26.325z"></path></g>
          </svg>
        </div>
      </form>
    </Form>
  );
}
