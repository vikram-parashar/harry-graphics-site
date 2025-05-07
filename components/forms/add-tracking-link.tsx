"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import { update } from "@/lib/actions/crud"
import { Database } from "@/lib/types"
type OrderType = Database['public']['Tables']['orders']['Row']

const FormSchema = z.object({
  link: z.string().url().optional(),
})

export default function AddTracingLink({ orderId, setData }: {
  orderId: string,
  setData: React.Dispatch<React.SetStateAction<OrderType[]>>
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    const res = await update(orderId, {
      tracking_link: data.link||''
    }, 'orders', null, null)

    !res.success && toast(res.msg)

    if (res.success) {
      setData((prev) => {
        const index = prev.findIndex((order) => order.id === orderId)
        if (index === -1) return prev
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            tracking_link: data.link||'',
          },
          ...prev.slice(index + 1)
        ]
      })
    }

    setPending(false)
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild><Button className="bg-rosePineDawn-base text-black hover:bg-rosePineDawn-surface">Update Tracing Link</Button></DialogTrigger>
      <DialogContent className="bg-rosePineDawn-surface border-rosePine-subtle">
        <DialogDescription></DialogDescription>
        <DialogTitle></DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking link</FormLabel>
                  <FormControl>
                    <Input type="text" className="bg-rosePineDawn-base" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}
              className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
            >
              Add/Update Link
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


