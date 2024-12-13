import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import IDRecords from "@/components/id-records/page";
import { OrganizationType, SheetType } from "@/lib/types";

export default async function Page() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  /**** get organization ****/
  const orgRes = await supabase.from('organizations').select().eq('owner_id', data.session.user.id).single();
  if (orgRes.error && orgRes.error.details !== 'The result contains 0 rows') {
    console.log(orgRes.error)
    redirect('/error')
  }

  const organization: OrganizationType = orgRes.data
  if (organization) {
    organization.payment_full = supabase.storage.from('images').getPublicUrl(organization.payment).data.publicUrl
  }

  /**** get Sheets ****/
  const sheetRes = await supabase.from('sheets').select().eq('owner_id', data.session.user.id)
  if (sheetRes.error) {
    console.log(sheetRes.error)
    redirect('/error')
  }

  const sheets: SheetType[] = sheetRes.data

  return (
    <div className="bg-rosePine-base text-rosePine-text min-h-screen px-2 md:pt-12">
      <IDRecords organization={organization} sheets={sheets}/>
    </div>
  )
}
