'use client'
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
import { flagEmojiFromPhone } from '@/lib/utils'
import { toast } from 'sonner'
import { RelationTypes } from '@/lib/types'
import { addAddress, updatePhone, updateUsername } from '@/lib/actions/user'
import { Highlighter } from '@/components/magicui/highlighter'

const nameSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})
const phoneSchema = z.object({
  phone: z.string().min(1, {
    message: 'Phone number is required.',
  }).regex(/^\+?\d{1,3}\s?\d{1,14}$/, {
    message: 'Invalid phone number format.',
  }),
})
const addrSchema = z.object({
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
})

export default function UserProfile({ user }: {
  user: RelationTypes['User']
}) {
  const [userState, setUserState] = useState(user);
  const [nameBtnDisabled, setNameBtnDisabled] = useState(false);
  const [addrBtnDisabled, setAddrBtnDisabled] = useState(false);
  const [phnBtnDisabled, setPhnBtnDisabled] = useState(false);
  const [addrSheetOpen, setAddrSheetOpen] = useState(false);

  const nameForm = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      username: user.name || '',
    },
  });
  async function nameUpdate(values: z.infer<typeof nameSchema>) {
    setNameBtnDisabled(true);
    const res = await updateUsername(user.id, values.username);
    if (!res.success) {
      toast.error(res.msg)
      setNameBtnDisabled(false);
      return;
    }
    else {
      toast.success(res.msg)
      setUserState(prev => ({ ...prev, name: values.username }));
    }
    setNameBtnDisabled(false);
  }

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: user.phone || "+91 ",
    },
  });
  async function phoneUpdate(values: z.infer<typeof phoneSchema>) {
    setPhnBtnDisabled(true);
    const res = await updatePhone(user.id, values.phone);
    if (!res.success) {
      toast.error(res.msg)
      setPhnBtnDisabled(false);
      return;
    }
    else {
      toast.success(res.msg)
      setUserState(prev => ({ ...prev, phone: values.phone }));
    }
    setPhnBtnDisabled(false);
  }

  const addrForm = useForm<z.infer<typeof addrSchema>>({
    resolver: zodResolver(addrSchema),
    defaultValues: {
      address_line_1: '',
      address_line_2: '',
      city: '',
      pincode: '',
    },
  });
  async function addAddr(values: z.infer<typeof addrSchema>) {
    setAddrBtnDisabled(true);

    const new_addresses = userState.addresses;
    new_addresses.push({
      address_line_1: values.address_line_1,
      address_line_2: values.address_line_2,
      city: values.city,
      pincode: values.pincode,
    });

    const res = await addAddress(user.id, new_addresses);
    if (!res.success) {
      setAddrSheetOpen(false);
      console.log(res.msg);
      toast.error(res.msg)
    } else {
      setUserState(prev => ({ ...prev, addresses: new_addresses }));
      setAddrSheetOpen(false);
      toast.success("Address added successfully!");
    }
    addrForm.reset();
    setAddrBtnDisabled(false);
  }

  return (
    <>
      <Form {...nameForm}>
        <form
          onSubmit={nameForm.handleSubmit(nameUpdate)}
          className="flex flex-col space-y-3"
        >
          {/* Email field (disabled) */}
          <FormItem className="relative">
            <FormLabel className="text-2xl">Email</FormLabel>
            <FormControl>
              <Input
                disabled
                className="shadow-shadow lg:text-xl lg:h-12"
                value={userState.email}
                type="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* Username field */}
          <FormField
            control={nameForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="O-namae wa?"
                    {...field}
                    className="shadow-shadow lg:text-xl lg:h-12"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button (only when name is changed) */}
          {userState.name !== nameForm.watch("username") && (
            <Button type="submit" className="w-40" disabled={nameBtnDisabled}>
              Update Name
            </Button>
          )}
        </form>
      </Form>
      <Form {...phoneForm}>
        <form
          onSubmit={phoneForm.handleSubmit(phoneUpdate)}
          className="mt-4"
        >
          <FormField
            control={phoneForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='text-2xl'>Phone Number</FormLabel>
                <span className='absolute lg:text-xl top-[50px] lg:top-[50px] left-3'>
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

          {/* Submit button (only when name is changed) */}
          {userState.phone !== phoneForm.watch("phone") && (
            <Button type="submit" className="w-40 mt-4" disabled={phnBtnDisabled}>
              Update Phone
            </Button>
          )}
        </form>
      </Form>
      <h1 className="text-4xl my-5 mt-20 p-2"><Highlighter color="#4B908D">Saved Addresses</Highlighter></h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-10'>
        {userState.addresses && userState.addresses.length > 0 && userState.addresses.map((addr, index) => (
          <div key={index} className='border p-5 rounded-lg shadow-shadow flex flex-col gap-2 bg-secondary-background'>
            <Label className='text-lg'>Address {index + 1}</Label>
            <p className='lg:text-xl'>{`${addr.address_line_1}, ${addr.address_line_2 ? addr.address_line_2 + ', ' : ''}${addr.city} - ${addr.pincode}`}</p>
          </div>
        ))}
        {/* Add New Address Button */}
        <Sheet open={addrSheetOpen} onOpenChange={setAddrSheetOpen}>
          <SheetTrigger asChild>
            <Button type="button" className='min-h-40 text-xl font-bold'>Add New Address</Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-screen w-[90vw] lg:w-[30vw]">
            <SheetHeader>
              <SheetTitle>Add new address</SheetTitle>
              <SheetDescription>you can select one of addresses in create-order page.</SheetDescription>
            </SheetHeader>
            <Form {...addrForm}>
              <form onSubmit={addrForm.handleSubmit(addAddr)} className="p-5 flex flex-col gap-5 h-full">
                <FormField
                  control={addrForm.control}
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
                  control={addrForm.control}
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
                    control={addrForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className='relative w-1/2'>
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
                    control={addrForm.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem className='relative w-1/2'>
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
                <SheetFooter>
                  <Button
                    disabled={addrBtnDisabled}
                    type="submit">
                    Add address
                  </Button>
                  <SheetClose asChild>
                    <Button variant="neutral">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </form >
            </Form >
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
