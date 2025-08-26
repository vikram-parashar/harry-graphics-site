import { createClient } from "@/supabase/utils/server";
import { redirect } from "next/navigation";
import UserProfile from "./components/user-profile";
import { Highlighter } from "@/components/magicui/highlighter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const userRes = await supabase.from('users').select('*').eq('id', user?.id).single()
  if (userRes.error || !userRes.data) redirect('/auth/login')

  return (
    <div className="min-h-screen px-5 max-w-5xl mx-auto mt-5 lg:mt-16 pb-10">
      <Button asChild>
        <Link href="/explore" className="fixed top-9 right-4 lg:top-20 lg:left-20 w-10">
          <Home className="h-6 w-6" />
          <span className="sr-only">Go back to cart</span>
        </Link>
      </Button>
      <h1 className="text-5xl my-5 p-2"><Highlighter color="#EEBA58">User Profile</Highlighter></h1>
      <UserProfile user={userRes.data} />
    </div>
  )
}
