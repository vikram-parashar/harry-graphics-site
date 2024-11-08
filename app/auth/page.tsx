'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Signin from "@/components/forms/signin"
import { useSearchParams } from "next/navigation"
import InputOTPForm from "@/components/forms/verify-opt"
import Signup from "@/components/forms/signup"

export default function Page() {
  const searchParams = useSearchParams()
  const form = searchParams.get('type')
  const email = searchParams.get('email')

  return (
    <>
      <div className="flex flex-1 py-10 justify-center items-center min-h-screen md:w-1/2 px-5 bg-rosePineDawn-base">
        <div defaultValue="signup" className="md:w-[500px] mx-auto bg-rosePineDawn-rose bg-opacity-30 rounded-md p-5">
          {form === 'signup' || form === 'login' ?
            <Tabs defaultValue={form} className="w-full">
              <TabsList className="w-full bg-rosePineDawn-rose">
                <TabsTrigger value="signup" className="w-1/2 data-[state=active]:bg-rosePineDawn-overlay text-white">Sign up</TabsTrigger>
                <TabsTrigger value="login" className="w-1/2 data-[state=active]:bg-rosePineDawn-overlay text-white">Sign in</TabsTrigger>
              </TabsList>
              <TabsContent value="signup"><Signup /></TabsContent>
              <TabsContent value="login"><Signin /></TabsContent>
            </Tabs> :
            form === 'verify' && email ?
              <InputOTPForm email={email} /> :
              form === 'check-mail' && email ?
                <EmailConfirmation email={email} /> :
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

function EmailConfirmation({ email = "your email" }) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md bg-rosePineDawn-surface">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            We've sent a confirmation link to:
          </p>
          <p className="font-medium">{email}</p>
          <p className="text-sm text-muted-foreground">
            Please check your inbox and click on the link to confirm your email address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className='bg-rosePineDawn-rose'>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
