'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { uploadImage } from '@/lib/actions/image_client'
import Image from 'next/image'
import { Button } from '../../ui/button'
import { LoaderCircle } from 'lucide-react'
import { createCategory, updateCategory } from '@/lib/actions/categories'
import { toast } from 'sonner'
import { Highlighter } from '@/components/magicui/highlighter'

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  heading: z.string().min(1, 'Heading is required'),
})

const headingOptions = [
  'ID Solutions',
  'Lanyard Solutions',
  'Merch',
  'Awards',
  'Others',
]

export default function CreateCategory() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      heading: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    if (!selectedFile) {
      toast.error('Please select an image')
      setPending(false)
      return
    }
    const image = await uploadImage('categories', selectedFile, null)
    if (!image.path) {
      toast.error(image.error)
      setPending(false)
      return
    }

    const res = await createCategory(data.name, data.heading, image.path)
    if (res.success) {
      toast.success(res.msg)
    } else toast.error(res.msg)

    setPending(false)
    setDialogOpen(false)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Category</Button>
      </DialogTrigger>
      <DialogContent className="bg-background max-h-screen overflow-y-scroll">
        <DialogDescription></DialogDescription>
        <DialogTitle className="text-2xl p-2">
          <Highlighter>Update Category</Highlighter>
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 lg:space-y-8 h-full flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category Name"
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
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-2xl">Belongs to</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow-shadow lg:text-xl lg:h-12 w-full bg-secondary-background">
                        <SelectValue placeholder="Select a heading" />
                      </SelectTrigger>
                      <SelectContent className="bg-secondary-background">
                        <SelectGroup>
                          {headingOptions.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="lg:text-xl"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              {selectedFile && (
                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                  <Image
                    fill
                    alt="preview"
                    className="object-contain"
                    src={URL.createObjectURL(selectedFile)}
                    sizes="(max-width: 1020px) 100vw, 50vw"
                  />
                </div>
              )}
              <FormLabel>Image</FormLabel>
              <Input
                className="shadow-shadow lg:h-12"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0])
                  }
                }}
              />
              <FormMessage />
            </FormItem>
            <Button type="submit" disabled={pending}>
              Update Category
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
