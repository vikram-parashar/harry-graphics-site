"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react"
import { CategoryType, ProductType } from "@/lib/types"
import { Textarea } from "../ui/textarea"
import { updateProduct } from "@/lib/actions/products"
import { toast } from "sonner"

const FormSchema = z.object({
  name: z.string({ required_error: "Please select a name.", }),
  category: z.string({ required_error: "Please select a category.", }),
  price: z.string({ required_error: "Please select a price.", }),
  description: z.string().optional(),
  image: z.any(),
})

export default function EditProduct({ categories, item }: { categories: CategoryType[], item: ProductType }) {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category_id
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    toast('updating product...')
    const id = item.id;

    const res = selectedImage ?
      await uploadImage('categories', `H-${id}`, selectedImage) :
      { path: item.image };

    if (res.path)
      await updateProduct(id, data.name, data.price, res.path, data.description, data.category);

    toast('update success :>')
    setPending(false)
  }

  return (
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between bg-rosePineDawn-base",
                        !field.value && "text-rosePineDawn-text"
                      )}
                    >
                      {field.value
                        ? categories.find(
                          (item) => item.id === field.value
                        )?.name
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 bg-rosePineDawn-base text-rosePineDawn-text">
                  <Command className="bg-rosePineDawn-base">
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((item) => (
                          <CommandItem
                            value={item.name}
                            key={item.id}
                            onSelect={() => {
                              form.setValue("category", item.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                item.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
  )
}

