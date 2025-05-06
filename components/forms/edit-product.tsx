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
import { ProductType } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { removeImages, update } from "@/lib/actions/crud"

const FormSchema = z.object({
  name: z.string({ required_error: "Please select a name.", }),
  price: z.string().regex(/^\d+$/, { message: "Please use a number." }),
  min_quantity: z.string().regex(/^\d+$/, { message: "Please use a number." }),
  unit: z.string({ required_error: "Please enter a value like pc/roll/kg", }),
  options: z.string(),
  image: z.any(),
})

export default function EditProduct({ item }: { item: ProductType }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: item.name,
      price: item.price?.toString(),
      min_quantity: item.min_quantity?.toString(),
      unit: item.unit,
      options: JSON.stringify(item.options),
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const id = item.id;

    if(selectedImage){
      await removeImages([item.image]);
    }

    const res = selectedImage ?
      await uploadImage('products', selectedImage, 50) :
      { path: item.image };

    if (res.path)
      await update(id, {
        name: data.name,
        price: data.price,
        image: res.path,
        min_quantity: data.min_quantity,
        unit: data.min_quantity,
        options: JSON.parse(data.options),
      }, 'products', '/dashboard/products', null)

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
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input className="bg-rosePineDawn-base" type="text" placeholder="My Product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input className="bg-rosePineDawn-base" type="text" placeholder="33" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="min_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Quantity</FormLabel>
                    <FormControl>
                      <Input className="bg-rosePineDawn-base" type="text" placeholder="1" {...field} />
                    </FormControl>
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
                  <FormLabel>Options</FormLabel>
                  <FormControl>
                    <Textarea className="bg-rosePineDawn-base min-h-40" placeholder="(Optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit of Measurement</FormLabel>
                  <FormControl>
                    <Input className="bg-rosePineDawn-base" type="text" placeholder="Pc/ Kg/ Roll" {...field} />
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
                src={selectedImage ? URL.createObjectURL(selectedImage) : item.image || '/notFoundP.jpg'}
              />
              <FormLabel>Product Image</FormLabel>
              <Input className="bg-rosePineDawn-base" type="file" accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0])} />
            </FormItem>
            <Button type="submit" disabled={pending}
              className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
            >
              Update Product
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

