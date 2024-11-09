"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { Button } from "../ui/button"
import { LoaderCircle, Plus } from "lucide-react"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"
import { addNote } from "@/lib/actions/orders"

const FormSchema = z.object({
  note: z.string({
    required_error: "Type something first mannnn :?"
  }),
})

export default function AddNote({ order_id, oldNote }: { order_id: string, oldNote: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const id = crypto.randomUUID();

    const res = await addNote(order_id,
      `# ${new Date(Date.now()).toLocaleString()}\n${data.note}\n\n${oldNote}`,
    )

    toast(res.msg)
    setPending(false)
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="absolute top-2 right-2 bg-rosePineDawn-overlay" variant='outline'><Plus /></Button>
      </DialogTrigger>
      <DialogContent className="bg-rosePineDawn-base">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription> </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea className="bg-rosePineDawn-base" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}
              className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
            >
              Add Note
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


