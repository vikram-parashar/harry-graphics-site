'use client'
import Image from "next/image";
import { useEffect } from "react";
import { createClient } from "@/supabase/utils/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Layout({ children }: {
  children: React.ReactNode,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const redirectTo = searchParams.get('redirectTo') || '/';
        router.push(redirectTo);
      } else {
        console.log('No user is signed in.');
      }
    }).catch((error) => {
      console.error('Error checking session:', error.message);
    });
  }, []);
  return (
    <div className="flex">
      <div className="lg:w-1/2 h-screen w-full overflow-y-scroll">
        {children}
      </div>
      <div className="hidden md:block lg:w-1/2 h-screen relative">
        <Image
          src="/auth.jpg"
          fill
          alt="Authentication Image"
          className="object-cover"
        />
      </div>
    </div>
  )
}
