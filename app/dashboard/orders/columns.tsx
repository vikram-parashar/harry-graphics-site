"use client"

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ColumnDef,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Eye, Info, Mail, MapPin, Phone, ShoppingCart, User } from "lucide-react"
import { CartItemType, OrderType, UserType } from "@/lib/types"
import UserCard from "./user-card"
import Image from "next/image"
import { updateStatus } from "@/lib/actions/orders"
import AddTracingLink from "@/components/forms/add-tracking-link"

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "order_number",
    header: 'Order Number',
    cell: ({ row }) => <div className="text-center"># {row.getValue("order_number")} </div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Ordered On
          < CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{new Date(
      (new Date(row.getValue("created_at"))).getTime() + 5.5 * 60 * 60 * 1000
    ).toLocaleString('en-US')} </div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Status
          < CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const statusColor: { [key: string]: string } = {
        'Cancelled': 'bg-rosePineDawn-rose',
        'Cancelled By Seller': 'bg-rosePineDawn-rose',
        'Payment Failed': 'bg-rosePineDawn-rose',
        'Out of Stock': 'bg-rosePineDawn-rose',
        'Unconfirmed': 'bg-rosePineDawn-gold',
        'Dispatched': 'bg-rosePineDawn-pine',
        'Confirmed': 'bg-rosePineDawn-pine',
      }
      const status = String(row.getValue("status"))
      return <Badge className={`${statusColor[status]} hover:${statusColor[status]}`}> {status} </Badge>
    },
  },
  {
    accessorKey: "cart",
    header: "Cart",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="bg-rosePineDawn-overlay">
            <ShoppingCart className="" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-rosePineDawn-overlay">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          {(row.getValue('cart') as CartItemType[]).map((item: CartItemType, index: number) =>
            <div className="bg-rosePineDawn-surface rounded-lg shadow-md overflow-hidden flex" key={index}>
              <div className="relative">
                <Image
                  src={item.product.image}
                  alt="Product Image"
                  width="300"
                  height="200"
                  className="w-full h-48 object-cover"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="absolute bottom-2 left-2 text-rosePine-base" variant="ghost"><Info size={20} /></Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{item.product.name}</DialogTitle>
                      <DialogDescription>
                        {item.product.description}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="p-4 flex flex-col justify-between w-full">
                <h3 className="text-lg font-medium mb-2">{item.product.name}</h3>
                <div className="bg-gray-900 text-white px-2 py-1 rounded-md text-lg">{`₹${item.product.price * item.quantity} for ${item.quantity}`}</div>
              </div>
            </div>
          )
          }
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "payment_full",
    header: "Payment",
    cell: ({ row }) => (
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
            src={row.getValue('payment_full') || ''}
            alt="Product Image"
            width="300"
            height="200"
            className="w-full"
          />
        </DialogContent>
      </Dialog>
    ),
  },
  {
    accessorKey: "users",
    header: "User",
    cell: ({ row }) => {
      const user: UserType = row.getValue('users')
      if (!user) { return <></> }
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="bg-rosePineDawn-overlay ">
              <User className="" />
              {user.name}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-rosePineDawn-overlay grid gap-4">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <span>{user.name}</span>
              </DialogTitle>
              <DialogDescription> </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p>{user.address_line_1}</p>
                  {user.address_line_2 && <p>{user.address_line_2}</p>}
                  <p>{user.city}, {user.pincode}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {

      const options = [
        'Unconfirmed',
        'Confirmed',
        'Cancelled By Seller',
        'Payment Failed',
        'Out of Stock',
        'Dispatched'
      ]
      const orderId=row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button variant="ghost" className="h-8 w-8 p-0" >
              <span className="sr-only">Open menu </span>
              < DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          < DropdownMenuContent align="end" className="bg-rosePineDawn-overlay">
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            {options.map((item, index) =>
              <DropdownMenuItem
                key={index}
                onClick={() =>
                  updateStatus(orderId, item)
                }
              >
                {item}
              </DropdownMenuItem>
            )}
            < DropdownMenuSeparator />
            <AddTracingLink orderId={orderId}/>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
