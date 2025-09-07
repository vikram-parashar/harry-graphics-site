import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/supabase/utils/server'
import CreateOrder from '@/components/user/CreateOrder'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .single()
  if (error || !user) {
    console.log('user fetch error', error)
    redirect('/auth/login?redirect=/user/create-order')
  }

  return (
    <div className="bg-secondary-background min-h-screen lg:p-5 rounded-lg lg:border-3">
      <Card className="mx-auto max-w-xl bg-background lg:min-h-auto font-semibold">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Confirm Order & Pay
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateOrder user={user} />
        </CardContent>
      </Card>
    </div>
  )
}
