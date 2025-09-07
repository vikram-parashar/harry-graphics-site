'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Highlighter } from '@/components/magicui/highlighter'
import { createSheet } from '@/lib/actions/sheets'
import { Textarea } from '../ui/textarea'
import { Tables } from '@/lib/database.types'

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
  description: z
    .string()
    .max(500, {
      message: 'Description must be at most 500 characters.',
    })
    .optional(),
})

export default function CreateSheet({
  sheets,
  sheetsAction,
}: {
  sheets: Tables<'sheets'>[]
  sheetsAction: React.Dispatch<React.SetStateAction<Tables<'sheets'>[]>>
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    const res: {
      success: boolean
      msg: string
      sheet?: Tables<'sheets'> | null
    } = await createSheet(data.name)
    if (res.success) {
      toast.success(res.msg)
      form.reset()
      if (res.sheet) sheetsAction([...sheets, res.sheet])
    } else toast.error(res.msg)

    setPending(false)
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Sheet</Button>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogDescription></DialogDescription>
        <DialogTitle className="text-2xl p-2">
          <Highlighter>Create Sheet</Highlighter>
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 lg:space-y-5 h-full flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Sheet Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      className="shadow-shadow lg:text-xl lg:h-12"
                      type="text"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name of your sheet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      {...field}
                      className="shadow-shadow lg:text-xl lg:h-24"
                    />
                  </FormControl>
                  <FormDescription>
                    A brief description of your sheet (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={pending}>
              Add Sheet
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
