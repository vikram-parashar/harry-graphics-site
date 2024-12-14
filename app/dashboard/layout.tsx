import Navbar from "@/components/dashboard/navbar";
import { ReactNode } from "react";
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: ReactNode }) {
  const supabase = createClient(cookies());

  const { data: { user },error } = await supabase.auth.getUser()
  if (!user||error) {
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">Could not fetch User data</div>
  }

  if(user.email!==process.env.ADMIN_MAIL_1 &&user.email!==process.env.ADMIN_MAIL_2){
    return <div className="text-center bg-black text-white h-screen flex justify-center items-center">You are not authorized to view this page</div>
  }
  
  return (
    <div className="bg-rosePineDawn-base min-h-screen">
      <Navbar />
      <div className="px-3 md:px-10">
        {children}
      </div>
    </div>
  )
}
