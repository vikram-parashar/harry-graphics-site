import Navbar from '@/components/dashboard/Navbar'
import { ReactNode } from 'react'
import { createClient } from '@/supabase/utils/server'

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('users')
    .select('is_admin')
    .single()
  if (error) {
    console.log('user layout error:', error)
    return (
      <div>Error: User not found. Try loggin in again. {error.message}</div>
    )
  }
  if (!data.is_admin) {
    return <div>Access Denied</div>
  }

  return (
    <div className="bg-rosePineDawn-base min-h-screen">
      <Navbar />
      <div className="px-3 md:px-10">{children}</div>
    </div>
  )
}
