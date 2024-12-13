import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OrganizationType, SheetType } from "@/lib/types";
import SheetTable from "@/components/id-records/sheetId/page";

export default async function Page({ params }: { params: { sheetId: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getSession();

  /**** get Sheet ****/
  const sheetRes = await supabase.from('sheets').select('*').eq('id', params.sheetId).single();
  if (sheetRes.error) {
    console.log(sheetRes.error)
    redirect('/error')
  }
  const sheet: SheetType = sheetRes.data

  /**** get Org ****/
  const orgRes = await supabase.from('organizations').select().eq('owner_id', sheet.owner_id).single();
  if (sheetRes.error) {
    console.log(orgRes.error)
    redirect('/error')
  }
  const org: OrganizationType = orgRes.data

  return (
    <div className="bg-rosePine-surface text-rosePine-text min-h-screen px-3 py-5">
      <h2 className="text-2xl font-bold uppercase md:pl-10 text-rosePine-iris">{sheet.name}</h2>
      <h6 className="text-rosePine-highlightHigh text-xl md:pl-10">{" "}{org.name}</h6>
      <SheetTable records={sheet.data} columnDefs={sheet.columns} />
    </div>
  )
}
