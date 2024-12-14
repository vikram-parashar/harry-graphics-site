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
    return <div className="min-h-screen bg-rosePineDawn-base flex items-center justify-center p-4 pt-20 text-rosePine-text">Error fetching user data</div>
  }

  return (
    <div className="bg-rosePineDawn-base min-h-screen px-5">
      <UserProfile user={userRes.data} />
    </div>
  )
}
