'use client'
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowBigLeftDash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Layout({ children }: {
  children: React.ReactNode,
}) {
  const searchParams = useSearchParams();

  return (
    <div className="flex">
      <div className="lg:w-1/2 h-screen w-full overflow-y-scroll pt-10">
        <Link href={searchParams.get('redirectTo') || '/explore'}>
          <Button asChild size="icon" className="fixed top-5 left-10"><ArrowBigLeftDash /></Button>
        </Link>
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
