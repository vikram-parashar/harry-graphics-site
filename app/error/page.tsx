'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function ErrorPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground bg-rosePineDawn-base px-5">
      <AlertCircle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong.</h1>
      <p className="text-xl mb-8">We are sorry, but an error occurred while processing your request.</p>
      <div className="flex space-x-4">
        <Button 
          onClick={() => router.push('/')}
          variant="default"
        >
          Go to Homepage
        </Button>
        <Button 
          onClick={() => router.back()}
          variant="outline"
          className='bg-rosePineDawn-overlay'
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}
