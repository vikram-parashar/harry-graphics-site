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
import { createProduct } from '@/lib/actions/products';
import { toast } from 'sonner';
import { Highlighter } from "@/components/magicui/highlighter"

const FormSchema = z.object({
  name: z.string({ message: "Please select a name.", }),
  price: z.string().regex(/^\d+$/, { message: "Please use a number." }),
  min_quantity: z.string().regex(/^\d+$/, { message: "Please use a number." }),
  unit: z.string({ message: "Please enter a value like pc/roll/kg", }),
  options: z.string(),
  image: z.any(),
})

export default function CreateProduct({ category_id }: {
  category_id: string,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      price: '0',
      min_quantity: '100',
      unit: 'pc',
      options: JSON.stringify({
        "<Option heading>": [
          {
            "name": "<option 1>",
            "price": 5
          },
          {
            "name": "<option 2>",
            "price": -2
          },
        ],
        "<Option heading 2>": [
          {
            "name": "<option 1>",
            "price": 5
          },
          {
            "name": "<option 2>",
            "price": -2
          },
        ],
      }),
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)

    const image = await uploadImage('products', selectedFile, 50);

    if (image.path) {
      const res = await createProduct(
        category_id,
        data.name,
        parseInt(data.price),
        parseInt(data.min_quantity),
        data.unit,
        JSON.parse(data.options),
        image.path
      )
      if (res.success) {
        toast.success(res.msg)
        form.reset()
      } else toast.error(res.msg)
    } else toast.error("Error uploading image")

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
      <DialogTrigger asChild><Button>Add Product</Button></DialogTrigger>
      <DialogContent className="bg-background">
        <DialogDescription></DialogDescription>
        <DialogTitle className="text-2xl p-2">
          <Highlighter color="#EEBA58">Create Product</Highlighter>
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
              {selectedFile &&
                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                  <Image
                    fill
                    alt="preview"
                    className="object-contain"
                    src={URL.createObjectURL(selectedFile)}
                    sizes="(max-width: 1020px) 100vw, 50vw"
                  />
                </div>}
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
              Add Product
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}


