import Navbar from "@/components/dashboard/navbar";
import { ReactNode } from "react";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = createClient(cookies());

  const { data: { user },error } = await supabase.auth.getUser()
  if (!user||error) {
    console.log(error)
    redirect('/error')
  }

  if(user.email!==process.env.ADMIN_MAIL_1 &&user.email!==process.env.ADMIN_MAIL_2){
    console.log('not admin')
    redirect('/error')
  }
  
  return (
    <div className="bg-rosePineDawn-base min-h-screen">
      <Navbar />
      <div className="px-10">
        {children}
      </div>
    </div>
  )
}
