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
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
import { Check, ChevronsUpDown, LoaderCircle, Pencil } from "lucide-react"
import { CategoryType, ProductType } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import { update } from "@/lib/actions/crud"

const FormSchema = z.object({
  name: z.string({ required_error: "Please select a name.", }),
  price: z.number({ required_error: "Please select a number.", }),
  description: z.string().optional(),
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
      price: item.price,
      description: item.description,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const id = item.id;

    const res = selectedImage ?
      await uploadImage('products', id, selectedImage,300,300) :
      { path: item.image };

    if (res.path)
      await update(id, {
        name: data.name,
        price: data.price,
        image: res.path,
        description: data.description,
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
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input className="bg-rosePineDawn-base" type="text" placeholder="Rs.33 per pc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="bg-rosePineDawn-base" placeholder="(Optional)" {...field} />
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
                src={selectedImage ? URL.createObjectURL(selectedImage) : item.image_full}
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

