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
import { LoaderCircle, Pencil } from "lucide-react"
import { Database } from "@/lib/types"
type CategoryType = Database['public']['Tables']['categories']['Row']
import { removeImages, update } from "@/lib/actions/crud"

const FormSchema = z.object({
  name: z.string().min(3, 'min length 3'),
})

export default function EditCategory({ item }: { item: CategoryType }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState<File | undefined>(undefined);
  const [selectedHeaderMobile, setSelectedHeaderMobile] = useState<File | undefined>(undefined);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: item.name || '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const id = item.id;

    const toRemove: string[] = [];
    if (item.header_image_mobile && selectedHeaderMobile) toRemove.push(item.header_image_mobile);
    if (selectedHeader && item.header_image) toRemove.push(item.header_image)
    if (selectedThumbnail && item.thumbnail_image) toRemove.push(item.thumbnail_image);
    await removeImages(toRemove);

    const resH = selectedHeader ?
      await uploadImage('categories', selectedHeader, 150) :
      { path: item.header_image };
    const resHM = selectedHeaderMobile ?
      await uploadImage('categories', selectedHeaderMobile, 100) :
      { path: item.header_image_mobile };
    const resT = selectedThumbnail ?
      await uploadImage('categories', selectedThumbnail, 50) :
      { path: item.thumbnail_image };

    await update(id, {
      name: data.name,
      header_image: resH.path,
      header_image_mobile: resHM.path,
      thumbnail_image: resT.path,
      updated_at: new Date(Date.now()),
    }, 'categories', '/dashboard/categories', null)

    setPending(false)
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="mr-2 bg-rosePineDawn-base" variant="outline"><Pencil /></Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-scroll bg-rosePineDawn-surface border-rosePine-subtle">
        <DialogDescription></DialogDescription>
        <DialogTitle></DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input className="bg-rosePineDawn-base" type="text" placeholder="My Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <Image
                height={150}
                width={150}
                alt="preview"
                className="w-full h-auto"
                src={selectedHeader ? URL.createObjectURL(selectedHeader) : (item.header_image || '/notFoundL.png')}
              />
              <FormLabel>Header Image</FormLabel>
              <Input className="bg-rosePineDawn-base" type="file" accept="image/*"
                onChange={(e) => setSelectedHeader(e.target.files?.[0])} />
            </FormItem>
            <FormItem>
              <Image
                height={150}
                width={150}
                alt="preview"
                className="w-full h-auto"
                src={selectedHeaderMobile ? URL.createObjectURL(selectedHeaderMobile) : item.header_image_mobile || '/notFoundL.png'}
              />
              <FormLabel>Header Image (Mobile)</FormLabel>
              <Input className="bg-rosePineDawn-base" type="file" accept="image/*"
                onChange={(e) => setSelectedHeaderMobile(e.target.files?.[0])} />
            </FormItem>
            <FormItem>
              <Image
                height={150}
                width={150}
                alt="preview"
                className="w-full h-auto"
                src={selectedThumbnail ? URL.createObjectURL(selectedThumbnail) : item.thumbnail_image || '/notFoundL.png'}
              />
              <FormLabel>Thumbnail Image</FormLabel>
              <Input className="bg-rosePineDawn-base" type="file" accept="image/*"
                onChange={(e) => setSelectedThumbnail(e.target.files?.[0])} />
            </FormItem>
            <Button type="submit" disabled={pending}
              className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
            >
              Update Category
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


