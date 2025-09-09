'use client'
import { Separator } from '@/components/ui/separator'
import { AddressType, CartItemType } from '@/lib/types'
import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { flagEmojiFromPhone } from '@/lib/utils'
import { createOrderAction } from '@/lib/actions/user'
import { Textarea } from '@/components/ui/textarea'
import { uploadImage } from '@/lib/actions/image'
import { OctagonAlert } from 'lucide-react'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import QRCode from 'react-qr-code'
import { useRouter } from 'next/navigation'
import { Tables } from '@/lib/database.types'

export default function CreateOrder({ user }: { user: Tables<'users'> }) {
  return (
    <>
      <CartItems />
      <CardTitle className="text-2xl font-bold text-center">
        Contact Info
        <Link
          target="_blank"
          href="/user/profile"
          className="mx-2 font-medium underline"
        >
          [Update
          <ExternalLink className="inline mx-2" />]
        </Link>
      </CardTitle>
      <CreateOrderForm user={user} />
    </>
  )
}
const addPrice = (cart: CartItemType[]) => {
  return cart.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
}

function CartItems() {
  const [cart, setCart] = useState<CartItemType[]>([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  return (
    <>
      <div className="space-y-2 font-semibold text-xl">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p>{`${item.quantity} x ${item.product.name}`}</p>
              {Object.keys(item.options).map((key, index) => (
                <p key={index} className="text-muted-foreground text-sm">
                  {key}: {item.options[key]}
                </p>
              ))}
            </div>
            <p>₹{(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Total</p>
        <p className="text-lg font-bold">
          ₹
          {new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(addPrice(cart))}
        </p>
      </div>
    </>
  )
}

const formSchema = z.object({
  address: z.string().min(1, { message: 'Please select an address' }),
  payment_receipt: z.instanceof(File, { message: 'Please upload a image' }),
  note: z.string().optional(),
})

const addrToString = (address: AddressType) => {
  return `${address.address_line_1}, ${address.address_line_2 ? address.address_line_2 + ', ' : ''}${address.city} - ${address.pincode}`
}

function CreateOrderForm({ user }: { user: Tables<'users'> }) {
  const router = useRouter()
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [cart, setCart] = useState<CartItemType[]>([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: '',
      address: user.addresses ? '0' : '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnDisabled(true)
    const addresses = user.addresses as AddressType[]
    if (addresses.length === 0) {
      toast.error(
        'Please add an address to your profile before creating an order.'
      )
      setBtnDisabled(false)
      return
    }
    const uploadRes = await uploadImage(
      'payment_receipt',
      values.payment_receipt,
      200
    )
    if (!uploadRes.success) {
      toast.error(uploadRes.msg)
      setBtnDisabled(false)
      return
    }
    const payment: string = uploadRes.path
    const address = addresses[parseInt(values.address)]
    const res = await createOrderAction(
      cart,
      address,
      payment,
      addPrice(cart),
      values.note
    )
    if (!res.success) toast.error(res.msg)
    else {
      localStorage.setItem('cart', JSON.stringify([]))
      router.push('/user/orders')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 lg:space-y-4"
      >
        <div className="relative">
          <span className="text-xl font-bold block">Phone Number</span>
          {!user.phone ? (
            <Button asChild>
              <Link href="/user/profile" target="_blank">
                <OctagonAlert />
                <span>To change phone number, please update your profile.</span>
              </Link>
            </Button>
          ) : (
            <>
              <span className="absolute lg:text-2xl top-[40px] lg:top-[45px] left-3">
                {flagEmojiFromPhone(user.phone)}
              </span>
              <Input
                value={user.phone}
                disabled
                className="lg:text-xl lg:h-12 pl-10 my-2"
              />
            </>
          )}
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-xl">Select Address</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue="0"
                  onValueChange={field.onChange}
                  className="space-y-2 text-background"
                >
                  {(user.addresses as AddressType[]).length ? (
                    (user.addresses as AddressType[]).map((address, index) => {
                      const addrString = addrToString(address)
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-secondary-background p-3 rounded-lg mb-2 border-2"
                        >
                          <RadioGroupItem
                            value={index.toString()}
                            id={`address-${index}`}
                          />
                          <Label htmlFor={`address-${index}`}>
                            {addrString}
                          </Label>
                        </div>
                      )
                    })
                  ) : (
                    <Button asChild>
                      <Link href="/user/profile" target="_blank">
                        <OctagonAlert />
                        <span>
                          No saved addresses. Please update your profile to add
                          addresses.
                        </span>
                      </Link>
                    </Button>
                  )}
                </RadioGroup>
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <PaymentOptions />
        <FormField
          control={form.control}
          name="payment_receipt"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-xl">Payment Reciept</FormLabel>
              <FormControl>
                <Input
                  accept="image/*"
                  className="lg:text-xl lg:h-12"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    field.onChange(file ?? null)
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
            <FormItem className="relative">
              <FormLabel className="text-xl">Extra Note</FormLabel>
              <FormControl>
                <Textarea
                  className="lg:text-xl lg:h-12"
                  {...field}
                  placeholder="Add any additional notes or instructions for the order (optional)"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={btnDisabled}
          className="w-full lg:text-xl lg:h-12"
        >
          {btnDisabled ? 'Processing...' : 'Create Order'}
        </Button>
      </form>
    </Form>
  )
}
function PaymentOptions() {
  const [cart, setCart] = useState<CartItemType[]>([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  const upiLink = () => {
    return `upi://pay?pa=harrygraphics@icici&pn=Vikram%20Parashar&am=${addPrice(cart)}&cu=INR`
  }

  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-center">Scan the QR code below to pay with UPI</p>
        <div className="bg-white p-4 rounded-lg">
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={upiLink()}
            viewBox={`0 0 256 256`}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Or pay to UPI ID:{' '}
          <Link
            href={upiLink()}
            target="_blank"
            className="underline md:hidden"
          >
            harrygraphics21@oksbi <Link2 className="inline" size={12} />
          </Link>
          <span className="hidden md:inline">harrygraphics21@oksbi</span>
        </p>
      </div>
    </div>
  )
}
