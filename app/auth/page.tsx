'use client'
import Image from "next/image"
import Signin from "@/components/forms/signin"
import { useSearchParams } from "next/navigation"
import InputOTPForm from "@/components/forms/verify-opt"

export default function Page() {
  const searchParams = useSearchParams()
  const form = searchParams.get('type')
  const email = searchParams.get('email')

  return (
    <>
      <div className="flex flex-1 py-10 justify-center items-center min-h-screen md:w-1/2 px-5 bg-rosePineDawn-base">
        <div defaultValue="signup" className="md:w-[400px] mx-auto bg-rosePineDawn-rose bg-opacity-30 rounded-md p-5">
          {form === 'login' ?
            <Signin /> :
            form === 'verify' ?
              <InputOTPForm email={email}/> :
              <p>Invalid url</p>}
        </div>
      </div>
      <div className="hidden bg-muted lg:block fixed top-0 right-0 w-1/2">
        <Image
          src="/auth.jpg"
          alt="Image"
          width="1020"
          height="1080"
          className="max-h-screen w-full object-cover dark:brightness-[0.6] dark:grayscale"
        />
      </div>
    </>
  )
}
