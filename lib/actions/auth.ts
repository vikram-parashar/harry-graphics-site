'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function login(email: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
    },
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  redirect(`/auth?type=verify&email=${email}`)
}

export async function verify(email: string, pin: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { session }, error, } = await supabase.auth.verifyOtp({
    email,
    token: pin,
    type: 'email',
  })

  if (error) {
    console.log(error)
    return {
      success: false,
      msg: 'wrong OTP'
    }
  }

  revalidatePath('/layout')
  redirect('/')
}
export async function logout() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const res = await supabase.auth.signOut()
  if (res.error) {
    console.log(res.error)
    redirect('/error')
  }
  else
    redirect('/')
}
