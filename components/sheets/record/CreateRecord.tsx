'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Tables } from '@/lib/database.types'
import { ColumnType } from '@/lib/types'
import { createRecord } from '@/lib/actions/records'
import Link from 'next/link'

export default function CreateRecord({ sheet }: { sheet: Tables<'sheets'> }) {
  const [pending, setPending] = useState(false)
  const columns = (sheet.columns || []) as ColumnType[]

  const shape: Record<string, any> = {}
  columns.forEach((col) => {
    shape[col.id] = z.string().optional()
  })
  const FormSchema = z.object(shape)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: columns.reduce(
      (acc, col) => {
        acc[col.name] = ''
        return acc
      },
      {} as Record<string, any>
    ),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    const res = await createRecord(data, sheet.id)
    if (res.success) {
      toast.success(res.msg)
      form.reset()
    } else {
      toast.error(`Error: ${res.msg}`)
    }

    setPending(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 lg:space-y-5 h-full flex flex-col"
      >
        {columns.length === 0 ? (
          <div className="p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded">
            <Highlighter>No columns</Highlighter> found in this sheet. Please
            add columns to the sheet before adding records.
          </div>
        ) : (
          columns.map((col) => (
            <FormField
              key={col.id}
              control={form.control}
              name={col.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">{col.name}</FormLabel>
                  <FormControl>
                    <Input
                      className="lg:text-xl lg:h-12"
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value as string}
                      placeholder={col.name}
                    />
                  </FormControl>
                  <FormDescription>{col.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))
        )}
        <Button type="submit" disabled={pending}>
          Submit
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
        <Link
          href={`/s/${sheet.id}/view`}
          className="hover:underline text-center"
          style={{ color: 'var(--secondary-background)' }}
        >
          VIEW MY RECORDS
        </Link>
      </form>
    </Form>
  )
}
