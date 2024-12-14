import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { OrganizationType, SheetType } from "@/lib/types";
import NewRecord from "@/components/id-records/new-record/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({ params }: { params: { sheetId: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const anonUser = cookieStore.get('anon-user')
  const { data } = await supabase.auth.getSession();

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

  const entiesForUser = sheet.data.filter((entry) => entry.created_by === (data?.session?.user.id || anonUser?.value))

  return (
    <div className="bg-rosePine-base text-rosePine-text min-h-screen px-2 md:pt-12">
      {entiesForUser.length == 0 && (!data?.session?.user.id || !anonUser?.value) && (
        <Button asChild className="absolute top-5 right-12 dark bg-rosePine-rose">
          <Link href={`/auth?type=signup&redirect=/user/id-records/my-records/${params.sheetId}`}>
            Create Permanent Account
          </Link>
        </Button>
      )}
      {entiesForUser.length != 0 && (!data?.session?.user.id && anonUser?.value) && (
        <Button className="absolute top-5 right-12 dark bg-rosePine-highlightHigh text-rosePine-text pointer-events-none">
          Working on Temporary Account
        </Button>
      )}
      <h1 className="text-3xl text-center py-4 text-rosePine-love font-black">{org.name}</h1>
      <h2 className="text-xl font-bold text-center text-rosePine-iris">{sheet.name}</h2>
      <NewRecord sheetId={params.sheetId} oldEnties={entiesForUser} columns={sheet.columns} />
    </div>
  )
}
