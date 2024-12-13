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
import { LoaderCircle } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { insert } from "@/lib/actions/crud"

const FormSchema = z.object({
  name: z.string({ required_error: "Please select a name.", }),
  price: z.string().regex(/^\d+$/, { message: "Please use a number." }),
  description: z.string().optional(),
  image: z.any(),
})

export default function NewProduct({ categoryId }: { categoryId: string }) {
  const [dialogOpen,setDialogOpen]=useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const id = crypto.randomUUID();

    const res = await uploadImage('products', id, selectedFile,300,300);

    if (res.path)
      await insert({
        id,
        name: data.name,
        price: data.price,
        image: res.path,
        description: data.description,
        category_id: categoryId
      },'products','/dashboard/products/[catId]',null)

    setPending(false)
    setDialogOpen(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild><Button>Add Product</Button></DialogTrigger>
      <DialogContent className="bg-rosePineDawn-surface border-rosePine-subtle">
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
                    <Input className="bg-rosePineDawn-base" type="text" placeholder="33" {...field} />
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
              {selectedFile &&
                <Image
                  height={150}
                  width={150}
                  alt="preview"
                  className="w-full h-auto"
                  src={URL.createObjectURL(selectedFile)}
                />}
              <FormLabel>Image</FormLabel>
              <Input className="bg-rosePineDawn-base" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0])} />
            </FormItem>
            <Button type="submit" disabled={pending}
              className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
            >
              Add Product
              {pending && <LoaderCircle className="inline animate-spin ml-1" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


