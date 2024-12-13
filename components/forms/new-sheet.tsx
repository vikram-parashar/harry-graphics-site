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
import { LoaderCircle, PlusIcon } from "lucide-react"
import { toast } from "sonner"
import { insert } from "@/lib/actions/crud"
import { SheetType } from "@/lib/types"
import { createClient } from "@/supabase/utils/client"
import { redirect } from "next/navigation"

const FormSchema = z.object({
  name: z.string({
    required_error: "Name is required"
  }),
})

export default function NewSheet({ sheets }: { sheets: SheetType[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    for (const sheet of sheets)
      if (sheet.name === data.name) {
        toast('Sheet already exists')
        setPending(false)
        return
      }

    const supabase = createClient();
    const user = await supabase.auth.getSession()
    if (user.error || user.data.session === null) redirect('/auth?type=login')

    const res = await insert({
      name: data.name,
      columns: [],
      data: [],
      owner_id: user.data.session.user.id,
    }, 'sheets', '/user/id-records', null)
    if (!res.success) {
      toast(res.msg)
    }

    setPending(false)
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-rosePine-iris hover:bg-rosePine-gold" >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="dark border-rosePine-overlay text-rosePine-text">
        <DialogDescription></DialogDescription>
        <DialogTitle></DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Record Name</FormLabel>
                  <FormControl>
                    <Input className="" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}
              className="disabled:opacity-70 bg-rosePine-rose hover:bg-rosePine-love"
            >
              Add Record
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


