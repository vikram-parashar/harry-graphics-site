import UserProfile from "@/components/forms/user-profile";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient(cookies());

  /**** get user data ****/
  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  const userRes = await supabase.from('users').select().eq('id', data.session.user.id).single();
  if (userRes.error || !userRes.data) {
    console.log(userRes.error)
    redirect('/auth?type=login')
  }

  return (
    <div className="bg-rosePineDawn-base min-h-screen px-5">
      <UserProfile user={userRes.data} />
    </div>
  )
}
