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
import { uploadImage } from "@/lib/actions/image_client"
import Image from "next/image"
import { Button } from "../../ui/button"
import { LoaderCircle } from "lucide-react"
import { Textarea } from '@/components/ui/textarea';
import { createCarousel, updateCarousel } from '@/lib/actions/carousels';
import { toast } from 'sonner';
import { Tables } from "@/lib/database.types"
import { Highlighter } from "@/components/magicui/highlighter"

const FormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }).max(50, { message: "Title must be at most 50 characters." }),
  link: z.string({
    message: "Link is required",
  }),
  points: z.any().optional(),
})

export default function UpdteCarousel({ item }: {
  item: Tables<'carousels'>,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: item.title,
      link: item.link,
      points: item.points?.join(';') || '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    const image = { path: item.image }
    if (selectedFile) {
      const res = await uploadImage('carousels', selectedFile, 50);
      if (res.path) {
        image.path = res.path
      } else {
        toast.error("Error uploading image")
        setPending(false)
        return
      }
    }

    const res = await updateCarousel(item.id, data.title, data.link, data.points?.split(';') || [], image.path)
    if (res.success) {
      toast.success(res.msg)
    } else toast.error(res.msg)

    setPending(false)
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild><Button className="bg-background" variant="reverse">{item.title}</Button></DialogTrigger>
      <DialogContent className="bg-background max-h-screen overflow-y-scroll">
        <DialogDescription></DialogDescription>
        <DialogTitle className="text-2xl p-2">
          <Highlighter color="#EEBA58">Update Carousel</Highlighter>
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 lg:space-y-8 h-full flex flex-col">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Carousel Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title"
                      {...field} className='shadow-shadow lg:text-xl lg:h-12' type='text' />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Links To</FormLabel>
                  <FormControl>
                    <Input placeholder="https://harrygraphics.in/..."
                      {...field} className='shadow-shadow lg:text-xl lg:h-12' type='text' />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Points</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Point 1;Point 2;Point 3;..."
                      {...field} className='shadow-shadow lg:text-xl lg:h-12' />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <Image
                  fill
                  alt="preview"
                  className="object-contain"
                  src={selectedFile ? URL.createObjectURL(selectedFile) : item.image}
                  sizes="(max-width: 1020px) 100vw, 50vw"
                />
              </div>
              <FormLabel>Image</FormLabel>
              <Input
                className='shadow-shadow lg:h-12'
                type="file" accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <FormMessage />
            </FormItem>
            <Button type="submit" disabled={pending} >
              Update Carousel
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}


