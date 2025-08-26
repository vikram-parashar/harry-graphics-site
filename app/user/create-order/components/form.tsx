'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { CartItemType, RelationTypes } from '@/lib/types'
import { flagEmojiFromPhone } from '@/lib/utils'
import PaymentOptions from './paymentOptions'
import { createOrderAction } from '@/lib/actions/user'
import { Textarea } from '@/components/ui/textarea'
import { uploadImage } from '@/lib/actions/image'

const formSchema = z.object({
  phone: z.string().min(1, {
    message: 'Phone number is required.',
  }).regex(/^\+?\d{1,3}\s?\d{1,14}$/, {
    message: 'Invalid phone number format.',
  }),
  address_line_1: z.string().min(1, {
    message: 'Address line 1 is required.',
  }),
  address_line_2: z.string().optional(),
  city: z.string().min(1, {
    message: 'City is required.',
  }),
  pincode: z.string().min(1, {
    message: 'Pincode is required.',
  }).regex(/^\d{6}$/, {
    message: 'Pincode must be a 6-digit number.',
  }),
  payment_receipt: z.instanceof(File, { message: "Please upload a image" }).refine((file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
  }, {
    message: 'Payment receipt must be an image file (JPEG, PNG, GIF).',
  }),
  note: z.string().optional(),
})


export default function CreateOrderForm({ user }: {
  user: RelationTypes['User'],
}) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItemType[];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user.phone || '+91 ',
      address_line_1: user.address_line_1 || '',
      address_line_2: user.address_line_2 || '',
      city: user.city || '',
      pincode: user.pincode || '',
      note: '',
    },
  });

  const [btnDisabled, setBtnDisabled] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnDisabled(true);
    const uploadRes = await uploadImage("payment_receipt", values.payment_receipt, 200);
    if (!uploadRes.success) {
      toast.error(uploadRes.msg);
      setBtnDisabled(false);
      return;
    }
    const payment: string = uploadRes.path;
    const res = await createOrderAction(values, user.id, cart, payment);
    if (!res.success) toast.error(res.msg)
    else toast.success(res.msg)

    setBtnDisabled(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 lg:space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-xl'>Phone Number</FormLabel>
              <span className='absolute lg:text-2xl top-[40px] lg:top-[45px] left-3'>
                {flagEmojiFromPhone(field.value)}
              </span>
              <FormControl>
                <Input placeholder="+91 xxxxx xxxxx" {...field} className='shadow-shadow lg:text-xl lg:h-12 pl-10' />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_line_1"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-xl'>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="Shipping Destination" {...field} className='shadow-shadow lg:text-xl lg:h-12' />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address_line_2"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-xl'>Address Line 2</FormLabel>
              <FormControl>
                <Input placeholder="Shipping Destination" {...field} className='shadow-shadow lg:text-xl lg:h-12' />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-xl'>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} className='shadow-shadow lg:text-xl lg:h-12' />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-xl'>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="XXXXXX" {...field} className='shadow-shadow lg:text-xl lg:h-12' />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <PaymentOptions />
        <FormField
          control={form.control}
          name="payment_receipt"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-xl'>Payment Reciept</FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  className="shadow-shadow lg:text-xl lg:h-12"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file ?? null);
                  }}
                  type="file"
                  multiple={false}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel className='text-xl'>Payment Reciept</FormLabel>
              <FormControl>
                <Textarea
                  className="shadow-shadow lg:text-xl lg:h-12"
                  {...field}
                  placeholder="Add any additional notes or instructions for the order (optional)"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={btnDisabled} className='w-full lg:text-xl lg:h-12'>
          {btnDisabled ? 'Processing...' : 'Create Order'}
        </Button>
      </form>
    </Form>
  );
}
