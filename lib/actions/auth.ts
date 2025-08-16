'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { revalidatePath } from 'next/cache'

export async function signup(data: {
  email: string,
  name: string,
  password: string,
  phone: string,
}, redirectTo: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        phone: data.phone
      }
    }
  })

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.code,
    }
  }

  redirect(`/auth/verify?email=${data.email}&redirectTo=${redirectTo}`)
}

export async function login(email: string, password: string, redirectTo: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.code,
    }
  }

  redirect(redirectTo)
}

export async function verify(email: string, pin: string, redirectTo: string) {
  const supabase = await createClient()

  const { error, } = await supabase.auth.verifyOtp({
    email,
    token: pin,
    type: 'email',
  })

  if (error) {
    console.log(error)
    return {
      success: false,
      msg: error.code,
    }
  }

  redirect(redirectTo)
}

export async function logout() {
  const supabase = await createClient()
  const res = await supabase.auth.signOut()
  if (res.error) {
    console.log(res.error)
    return {
      success: false,
      msg: res.error.code,
    }
  }
  redirect('/')
}

export async function resendOTP(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email
  })

  if (error) {
    console.log(error)
    return {
      success: false,
      msg: error.code,
    }
  }
  return {
    success: true,
    msg: 'OTP resent successfully',
  }
}
