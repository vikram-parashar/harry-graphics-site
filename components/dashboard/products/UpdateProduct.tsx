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
import { updateProduct } from '@/lib/actions/products';
import { toast } from 'sonner';
import { Tables } from "@/lib/database.types"
import { Highlighter } from "@/components/magicui/highlighter"

const FormSchema = z.object({
  name: z.string({ message: "Please select a name.", }),
  price: z.string().regex(/^\d+$/, { message: "Please use a number." }),
  min_quantity: z.string().regex(/^\d+$/, { message: "Please use a number." }),
  unit: z.string({ message: "Please enter a value like pc/roll/kg", }),
  options: z.string(),
  image: z.any(),
})

export default function UpdteProduct({ item }: {
  item: Tables<'products'>,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: item.name || '',
      price: item.price?.toString(),
      min_quantity: item.min_quantity?.toString(),
      unit: item.unit || '',
      options: JSON.stringify(item.options),
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    const image = { path: item.image }
    if (selectedFile) {
      const res = await uploadImage('products', selectedFile, 50);
      if (res.path) {
        image.path = res.path
      } else {
        toast.error("Error uploading image")
        setPending(false)
        return
      }
    }

    const res = await updateProduct(
      item.id,
      data.name,
      parseInt(data.price),
      parseInt(data.min_quantity),
      data.unit,
      JSON.parse(data.options),
      image.path,
    )
    if (res.success) {
      toast.success(res.msg)
    } else toast.error(res.msg)

    setPending(false)
    setDialogOpen(false);
  }
  const formattedJSON = (raw: string) => {
    try {
      return JSON.stringify(JSON.parse(raw), null, 2);
    } catch (e) {
      return raw; // show as-is if invalid
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild><Button className="bg-background" variant="reverse">{item.name}</Button></DialogTrigger>
      <DialogContent className="bg-background max-h-screen overflow-y-scroll">
        <DialogDescription></DialogDescription>
        <DialogTitle className="text-2xl p-2">
          <Highlighter color="#EEBA58">Update Product</Highlighter>
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 lg:space-y-8 h-full flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} className='shadow-shadow lg:text-xl lg:h-12' type='text' />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Price</FormLabel>
                    <FormControl>
                      <Input {...field} className='shadow-shadow lg:text-xl lg:h-12' />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="min_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Min Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} className='shadow-shadow lg:text-xl lg:h-12' />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xl'>Unit</FormLabel>
                    <FormControl>
                      <Input {...field} className='shadow-shadow lg:text-xl lg:h-12' />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl'>Options</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Point 1;Point 2;Point 3;..."
                      style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                      {...field}
                      value={formattedJSON(field.value)}
                      className='shadow-shadow lg:text-xl lg:h-12' />
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
              Update Product
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}


