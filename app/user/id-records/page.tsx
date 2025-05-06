import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import IDRecords from "@/components/id-records/page";
import { OrganizationType, SheetType } from "@/lib/types";

export default async function Page() {
  const supabase =await createClient();

  const { data, error } = await supabase.auth.getSession()
  if (error || data.session === null) redirect('/auth?type=login')

  /**** get organization ****/
  const orgRes = await supabase.from('organizations').select().eq('owner_id', data.session.user.id).single();
  if (orgRes.error && orgRes.error.details !== 'The result contains 0 rows') {
    return <div className="min-h-screen bg-rosePine-base flex items-center justify-center p-4 pt-20 text-rosePine-text">Error fetching organization</div>
  }

  const organization: OrganizationType = orgRes.data

  /**** get Sheets ****/
  const sheetRes = await supabase.from('sheets').select().eq('owner_id', data.session.user.id)
  if (sheetRes.error) {
    return <div className="min-h-screen bg-rosePine-base flex items-center justify-center p-4 pt-20 text-rosePine-text">Error fetching sheets</div>
  }

  const sheets: SheetType[] = sheetRes.data

  return (
    <div className="bg-rosePine-base text-rosePine-text min-h-screen px-2 md:pt-12">
      <IDRecords organization={organization} sheets={sheets}/>
    </div>
  )
}
