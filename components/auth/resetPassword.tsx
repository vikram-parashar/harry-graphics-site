import { useFormState } from "react-dom"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { resetPassword } from "@/actions/auth"
import SubmitBtn from "@/components/ui/submit-btn"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "../ui/button"

const labelStyle = "absolute scale-90 text-gray-400 -top-1 left-3 bg-gray-950"
export default function ResetPassword() {
  const { toast } = useToast()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [passwordCVisible, setPasswordCVisible] = useState(false)
  const [state, formAction] = useFormState(resetPassword, { fieldErrors: {} })
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
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="pb-0 flex flex-col gap-2">
          <div className="space-y-1 relative">
            <Label htmlFor="password" className={labelStyle}>Password</Label>
            <Input className="py-5" id="password" name="password" placeholder="mybirthday?" type={passwordVisible ? "text" : "password"} />
            <p aria-live="polite" className="text-rosePine-subtle text-right text-sm text-pink-500">
              {state?.fieldErrors?.password}
            </p>
            <Button variant='outline' size='icon' type="button"
              className="absolute top-0 right-2 scale-75"
              onClick={() => setPasswordVisible(prev => !prev)}
            >
              {passwordVisible ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          <div className="space-y-1 relative">
            <Label htmlFor="passwordC" className={labelStyle}>Password</Label>
            <Input className="py-5" id="passwordC" name="passwordC" placeholder="mybirthday?" type={passwordCVisible ? "text" : "password"} />
            <p aria-live="polite" className="text-rosePine-subtle text-right text-sm text-pink-500">
              {state?.fieldErrors?.passwordC}
            </p>
            <Button variant='outline' size='icon' type="button"
              className="absolute top-0 right-2 scale-75"
              onClick={() => setPasswordCVisible(prev => !prev)}
            >
              {passwordCVisible ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          <CardFooter>
            <SubmitBtn text="Send Link" className="ml-auto" />
          </CardFooter>
        </CardContent>
      </Card>
    </form>
  )
}
