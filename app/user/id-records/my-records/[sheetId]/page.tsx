import { createClient } from "@/supabase/utils/server";
import { OrganizationType, SheetType } from "@/lib/types";
import NewRecord from "@/components/id-records/new-record/page";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { sheetId: string } }) {
  const supabase =await createClient();

  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    redirect(`/auth?type=login&redirect=/user/id-records/my-records/${params.sheetId}`);
  }


  /**** get Sheet ****/
  const sheetRes = await supabase.from('sheets').select('*,users(id)').eq('id', params.sheetId).single();
  if (sheetRes.error) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Sheet data</div>
  }
  const sheet: SheetType = sheetRes.data

  if (!sheet?.users?.id) return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Sheet data</div>
  /**** get Org ****/
  const orgRes = await supabase.from('organizations').select().eq('owner_id', sheet.users.id).single();
  if (sheetRes.error) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch Organization data</div>
  }
  const org: OrganizationType = orgRes.data

  const entiesForUser = sheet.data.filter((entry) => entry.created_by === session.data.session?.user.id);

  return (
    <div className="bg-rosePine-base text-rosePine-text min-h-screen px-2 md:pt-12">
      <h1 className="text-3xl text-center py-4 text-rosePine-love font-black">{org.name}</h1>
      <h2 className="text-xl font-bold text-center text-rosePine-iris">{sheet.name}</h2>
      <NewRecord sheetId={params.sheetId} oldEnties={entiesForUser} columns={sheet.columns} />
    </div>
  )
}
