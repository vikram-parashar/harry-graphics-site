'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle, Plus } from 'lucide-react'
import { createColumn } from '@/lib/actions/sheets'
import { toast } from 'sonner'
import { ColumnType } from '@/lib/types'

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function CreateColumn({
  columns,
  columnsAction,
  sheetId,
}: {
  columns: ColumnType[]
  columnsAction: React.Dispatch<React.SetStateAction<ColumnType[]>>
  sheetId: string
}) {
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '' },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const newColumns: ColumnType[] = [
      ...columns,
      {
        id: Date.now().toString(),
        name: data.name,
        position: columns.length,
      },
    ]
    const res = await createColumn(newColumns, sheetId)
    if (res.success) {
      toast.success('Column added successfully')
      form.reset()
      columnsAction(newColumns)
    } else toast.error(res.msg)

    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Add Column"
                    {...field}
                    className="shadow-shadow lg:text-xl lg:h-12"
                    type="text"
                  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={pending}>
            <Plus />
            {pending && <LoaderCircle className="inline animate-spin ml-1" />}
          </Button>
        </div>
      </form>
    </Form>
  )
}
