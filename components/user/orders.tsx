'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { OrderType } from "@/lib/types"
import { Eye } from "lucide-react"
import { Badge } from "../ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { toast } from "sonner"
import { cancelOrder } from "@/lib/actions/orders"
import AddNote from "../forms/add-note-to-order"

export default function Orders({ orders }: { orders: OrderType[] }) {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((item, index) =>
          <OrderItem item={item} key={index} />
        )}
      </div>
    </div>
  )
}
const OrderItem = ({ item }: { item: OrderType }) => {
  return (
    <div className="bg-rosePineDawn-surface rounded-lg shadow-md overflow-hidden p-2">
      <div className="flex justify-between my-3">
        <span><b>Order No</b>:#{item.order_number}</span>
        <Popover>
          <PopoverTrigger className="">
            <Badge className="bg-rosePineDawn-overlay hover:bg-transparent text-rosePineDawn-text">{item.status}</Badge>
          </PopoverTrigger>
          <PopoverContent className="bg-rosePineDawn-base">
            {item.status === 'Unconfirmed' ?
              'Your order status will be updated after being reviewed' :
              item.status === 'Cancelled' ?
                'You have cancelled your order.' :
                'Unknown Status'
            }
          </PopoverContent>
        </Popover>
      </div>
      <p><b>Ordered on</b>: {item.ordered_on}</p>
      <div className="flex items-center gap-2 my-2">
        <span><b>Payment</b>:</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant='outline' className="bg-rosePineDawn-overlay"><Eye /></Button>
          </DialogTrigger>
          <DialogContent className="bg-rosePineDawn-base">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription> </DialogDescription>
            </DialogHeader>
            <Image
              src={item.payment_full}
              alt="Product Image"
              width="300"
              height="200"
              className="w-full"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative">
        <p><b>Note</b>:</p>
        <div className="border border-rosePineDawn-overlay text-sm p-2 rounded-md my-2"
          dangerouslySetInnerHTML={{ __html: item.note.replace(/\n/g, "<br />") }} />
        <AddNote order_id={item.id} oldNote={item.note} />
      </div>
      <div className="space-y-2 mt-3">
        <p><b>Products</b>:</p>
        {item.cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      {(item.status === 'Unconfirmed' || item.status === 'Confirmed') &&
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="block ml-auto bg-rosePine-love my-2">Cancel Order</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-rosePineDawn-base">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>Do you want to cancel your order </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  toast('Cancelling Order')
                  const res = await cancelOrder(item.id)
                  toast(res.msg)
                }}
              >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    </div>
  )
}
