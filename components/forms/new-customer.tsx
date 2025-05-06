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
import { uploadImage } from "@/lib/actions/image"
import Image from "next/image"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"
import { insert } from "@/lib/actions/crud"

const FormSchema = z.object({
  image: z.any(),
})

export default function NewCustomer() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const id = crypto.randomUUID();

    const res = await uploadImage('customers', selectedFile, 50);

    if (res.path) {
      const insertRes = await insert({
        id,
        image: res.path
      }, 'customers', '/dashboard/customers', null)
      if (!insertRes.success) {
        toast(insertRes.msg)
      }
    }

    setPending(false)
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild><Button>Add Customer</Button></DialogTrigger>
      <DialogContent className="bg-rosePineDawn-surface border-rosePine-subtle">
        <DialogDescription></DialogDescription>
        <DialogTitle></DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <FormItem>
              {selectedFile &&
                <Image
                  height={150}
                  width={150}
                  alt="preview"
                  className="w-full h-auto"
                  src={URL.createObjectURL(selectedFile)}
                />}
              <FormLabel>Image</FormLabel>
              <Input className="bg-rosePineDawn-base" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0])} />
            </FormItem>
            <Button type="submit" disabled={pending}
              className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
            >
              Add Customer
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


