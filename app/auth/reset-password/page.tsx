'use client'
import Image from "next/image"
import RecoveryCard from "@/components/auth/recoveryCard"
import ResetPassword from "@/components/auth/resetPassword"

export default function Page() {
  return (
    <div className="">
      <div className="flex flex-1 py-10 justify-center items-center min-h-screen md:w-1/2 px-5">
        <div className="md:w-[400px] mx-auto">
          <ResetPassword />
        </div>
      </div>
      <div className="hidden bg-muted lg:block fixed top-0 right-0 w-1/2"> <Image
          src="/bgs/signup.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="max-h-screen w-full object-cover dark:brightness-[0.6] dark:grayscale"
        />
      </div>
    </div >
  )
}
