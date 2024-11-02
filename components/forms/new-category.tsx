"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { insertCategory } from "@/lib/actions/categories"

const FormSchema = z.object({
  name: z.string().min(3, 'min length 3'),
})

export default function NewCategory() {
  const [selectedHeader, setSelectedHeader] = useState<File | undefined>(undefined);
  const [selectedHeaderMobile, setSelectedHeaderMobile] = useState<File | undefined>(undefined);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | undefined>(undefined);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setPending(true)
    const id = crypto.randomUUID();

    const resH = await uploadImage('categories', `H-${id}`, selectedHeader);
    const resHM = await uploadImage('categories', `HM-${id}`, selectedHeaderMobile);
    const resT = await uploadImage('categories', `T-${id}`, selectedThumbnail);

    if (resH.path  && resHM.path && resT.path)
      await insertCategory(id, data.name, resH.path,resHM.path,resT.path)

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
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input className="bg-rosePineDawn-base" type="text" placeholder="My Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          {selectedHeader &&
            <Image
              height={150}
              width={150}
              alt="preview"
              className="w-full h-auto"
              src={URL.createObjectURL(selectedHeader)}
            />}
          <FormLabel>Header Image</FormLabel>
          <Input className="bg-rosePineDawn-base" type="file" accept="image/*"
            onChange={(e) => setSelectedHeader(e.target.files?.[0])} />
        </FormItem>
        <FormItem>
          {selectedHeaderMobile &&
            <Image
              height={150}
              width={150}
              alt="preview"
              className="w-full h-auto"
              src={URL.createObjectURL(selectedHeaderMobile)}
            />}
          <FormLabel>Header Image (Mobile)</FormLabel>
          <Input className="bg-rosePineDawn-base" type="file" accept="image/*"
            onChange={(e) => setSelectedHeaderMobile(e.target.files?.[0])} />
        </FormItem>
        <FormItem>
          {selectedThumbnail &&
            <Image
              height={150}
              width={150}
              alt="preview"
              className="w-full h-auto"
              src={URL.createObjectURL(selectedThumbnail)}
            />}
          <FormLabel>Thumbnail Image</FormLabel>
          <Input className="bg-rosePineDawn-base" type="file" accept="image/*"
            onChange={(e) => setSelectedThumbnail(e.target.files?.[0])} />
        </FormItem>
        <Button type="submit" disabled={pending}
          className="disabled:opacity-70 bg-rosePineDawn-rose hover:bg-rosePineDawn-love"
        >
          Add Category
          {pending && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </form>
    </Form>
  )
}


