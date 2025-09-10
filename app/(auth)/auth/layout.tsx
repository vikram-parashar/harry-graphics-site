import Image from 'next/image'
import { ArrowBigLeftDash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in or Sign up to access your account',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="lg:w-1/2 h-screen w-full overflow-y-scroll pt-10">
        <Link href="/">
          <Button size="icon" className="fixed top-5 left-10">
            <ArrowBigLeftDash />
          </Button>
        </Link>
        {children}
      </div>
      <div className="hidden md:block lg:w-1/2 h-screen relative">
        <Image
          src="/auth.jpg"
          fill
          alt="Authentication Image"
          className="object-cover"
          sizes="(max-width: 1020px) 0vw, 50vw"
        />
      </div>
    </div>
  )
}
