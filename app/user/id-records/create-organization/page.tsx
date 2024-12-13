import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NewOrganization from "@/components/forms/new-organization";

export default async function Page() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  /**** get organization ****/
  const orgRes = await supabase.from('organizations').select().eq('owner_id', data.session.user.id).single();
  if (orgRes.data) {
    return (
      <div className="min-h-screen bg-rosePine-base flex items-center justify-center p-4 pt-20 text-rosePine-text">
        You already have an organization
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-rosePine-base flex items-center justify-center p-4 pt-20">
      <NewOrganization />
    </div>
  )
}
