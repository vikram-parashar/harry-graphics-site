import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { OrganizationType, SheetType } from "@/lib/types";
import SheetTable from "@/components/id-records/sheetId/page";

export default async function Page({ params }: { params: { sheetId: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  /**** get Sheet ****/
  const sheetRes = await supabase.from('sheets').select('*').eq('id', params.sheetId).single();
  if (sheetRes.error) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Sheet data</div>
  }
  const sheet: SheetType = sheetRes.data

  /**** get Org ****/
  const orgRes = await supabase.from('organizations').select().eq('owner_id', sheet.owner_id).single();
  if (sheetRes.error) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Organization data</div>
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
