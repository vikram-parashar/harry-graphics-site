import { createClient } from '@/supabase/utils/server'
import { redirect } from 'next/navigation'
import UserProfile from '@/components/user/UserProfile'
import { Highlighter } from '@/components/magicui/highlighter'

export default async function Page() {
  const supabase = await createClient()

  const userRes = await supabase.from('users').select('*').single()
  if (userRes.error || !userRes.data) redirect('/auth/login')

  return (
    <div className="min-h-screen p-5 bg-background rounded-lg border-3">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl my-5 p-2">
          <Highlighter>User Profile</Highlighter>
        </h1>
        <UserProfile user={userRes.data} />
      </div>
    </div>
  )
}
