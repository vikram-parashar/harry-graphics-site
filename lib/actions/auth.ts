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

  const userRes = await supabase.from('users').select('id').eq('email', data.email).single();
  if (userRes.data?.id) return {
    success: false,
    msg: 'Email already registered. Please Sign in'
  }

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
      msg: JSON.stringify(error),
    }
  }

  redirect(`/auth?type=verify&email=${data.email}&redirect=${redirectTo || '/'}`)
}

export async function login(email: string, password: string, redirectTo: string) {
  const supabase = await createClient()

  const userRes = await supabase.from('users').select('id').eq('email', email).single();
  if (!userRes.data) return {
    success: false,
    msg: `User with email ${email} not found`
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: JSON.stringify(error),
    }
  }

  redirect(redirectTo || '/')
}
export async function loginWithOTP(email: string, redirectTo: string) {
  const supabase = await createClient()

  const userRes = await supabase.from('users').select('id').eq('email', email).single();
  if (!userRes.data) return {
    success: false,
    msg: `User with email ${email} not found`
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: false,
    },
  })

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: JSON.stringify(error),
    }
  }

  redirect(`/auth?type=verify&email=${email}&redirect=${redirectTo}`)
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
      msg: 'wrong OTP'
    }
  }

  revalidatePath('/layout')
  redirect(redirectTo || '/')
}
export async function logout() {
  const supabase = await createClient()
  const res = await supabase.auth.signOut()
  if (res.error) {
    console.log(res.error)
    redirect('/error')
  }
  else
    redirect('/')
}
