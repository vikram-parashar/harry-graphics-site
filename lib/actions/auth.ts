'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/utils/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function signup(data: {
  email: string,
  name: string,
  password: string,
  phone: string,
  address_line_1?: string,
  address_line_2?: string,
  city?: string,
  pincode?: string,
}, redirectTo: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const userRes = await supabase.from('users').select('id').eq('email', data.email).single();
  //if user exists rather login
  if (userRes.data?.id) {
    login(data.email,data.password, redirectTo);
    return
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: data
    }
  })

  if (error) {
    console.log(error, 'error')
    return {
      success: false,
      msg: error.name,
    }
  }

  redirect(`/auth?type=verify&email=${data.email}&redirect=${redirectTo || '/'}`)
}

export async function login(email: string,password:string, redirectTo: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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
      msg: error.code,
    }
  }

  redirect(redirectTo || '/')
}
export async function loginWithOTP(email: string, redirectTo: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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
      msg: error.name,
    }
  }

  redirect(`/auth?type=verify&email=${email}&redirect=${redirectTo}`)
}
export async function verify(email: string, pin: string, redirectTo: string) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

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
