import { useFormState } from "react-dom"
import { useEffect } from "react"
import { sendResetPasswordLink } from "@/actions/auth"
import SubmitBtn from "@/components/ui/submit-btn"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

const labelStyle = "absolute scale-90 text-gray-400 -top-1 left-3 bg-gray-950"
export default function RecoveryCard() {
  const { toast } = useToast()
  const [state, formAction] = useFormState(sendResetPasswordLink, { fieldErrors: {} })
  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message,
        variant: state.success ? "default" : "destructive",
      })
    }
  }, [state, toast])

  return (
    <form action={formAction}>
      <Card className="border-muted">
        <CardHeader>
          <CardTitle>Passoword recovery</CardTitle>
        </CardHeader>
        <CardContent className="pb-0 flex flex-col gap-2">
          <div className="space-y-1 relative">
            <Label htmlFor="user_email" className={labelStyle}>Email</Label>
            <Input className="py-5" id="user_email" name="user_email" placeholder="example@email.com" />
            <p aria-live="polite" className="text-rosePine-subtle text-right text-sm text-pink-500">
              {state?.fieldErrors?.user_email}
            </p>
          </div>
          <CardFooter>
            <SubmitBtn text="Send Link" className="ml-auto" />
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  )
}
