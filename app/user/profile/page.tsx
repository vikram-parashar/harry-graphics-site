import UserProfile from "@/components/forms/user-profile";
import { getUser } from "@/lib/queries";
import { redirect } from "next/navigation";

export const revalidate = 3600;
export default async function Page() {
  const user = await getUser();
  if (user.success == false && user.msg == 'not logged in') redirect('/auth?type=login')

  if (user.success == false)
    return <div className="min-h-screen bg-rosePineDawn-base flex items-center justify-center p-4 pt-20 text-rosePine-text">Error fetching user data</div>

  return (
    <div className="bg-rosePineDawn-base min-h-screen px-5">
      <UserProfile user={user} />
    </div>
  )
}
