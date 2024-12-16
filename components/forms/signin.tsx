"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login, loginWithOTP } from "@/lib/actions/auth"
import { useState } from "react"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import { toast } from "sonner"

const FormSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().optional(),
})

export default function Signin({ redirect }: { redirect: string }) {
  const [pending, setPending] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [passVisible, setPassVisible] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    console.log(loginMethod)
    if (loginMethod === "otp") {
      console.log(data.email, redirect)
      const res = await loginWithOTP(data.email, redirect);
      if (res?.success === false) toast(res?.msg)
    } else if(loginMethod === "password" && data.password) {
      const res = await login(data.email, data.password, redirect);
      if (res?.success === false) toast(res?.msg)
    }
    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 my-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" type="email" placeholder="your@email.is" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loginMethod === "password" && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <>
                    <Input className="bg-rosePineDawn-base"
                      type={passVisible ? "text" : "password"}
                      placeholder="password" {...field} />
                    <Button size='icon' className="absolute top-6 right-2" variant="ghost" type="button" onClick={() => setPassVisible(prev => !prev)}>
                      {passVisible ? <EyeOff /> : <Eye />}
                    </Button>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end">
          <Button onClick={() => setLoginMethod(prev => prev === "password" ? "otp" : "password")}
            className="bg-rosePine-love hover:bg-rosePineDawn-rose"
            type="button"
          >
            {loginMethod === "password" ? "Login with OTP" : "Login with Password"}?
          </Button>
        </div>
        <Button type="submit" disabled={pending}
          className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
        >
          Login
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}

