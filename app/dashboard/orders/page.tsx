'use client'

import { Tables, Tables as TablesType } from '@/lib/database.types'
import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import {
  ArrowUpDown,
  Ellipsis,
  Eye,
  Mail,
  MapPin,
  MapPinOff,
  Phone,
  ShoppingCart,
  User,
} from 'lucide-react'
import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createClient } from '@/supabase/utils/client'
import Link from 'next/link'
import { ChevronDown, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { CartItemType } from '@/lib/types'
import { CheckCircle2, Clock, Truck, PackageCheck, XCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Highlighter } from '@/components/magicui/highlighter'

const LIMIT = 12

type OrderType = TablesType<'orders'>

const statusMap: {
  [key: string]: {
    label: string
    icon: React.ComponentType<{ className?: string }>
    color: string
  }
} = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-gray-300' },
  processing: { label: 'Processing', icon: PackageCheck, color: 'bg-blue-500' },
  shipped: { label: 'Shipped', icon: Truck, color: 'bg-purple-500' },
  delivered: { label: 'Delivered', icon: CheckCircle2, color: 'bg-green-500' },
  cancelled_by_user: {
    label: 'Cancelled By User',
    icon: XCircle,
    color: 'bg-red-500',
  },
}
export default function Page() {
  const searchParams = useSearchParams()
  const statusParam = searchParams.get('status') || ''
  const userParam = searchParams.get('user') || ''
  const orderIdParam = searchParams.get('orderId')
  const offsetParam = Number(searchParams.get('offset')) || 0
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState({})
  const [filterUser, setFilterUser] = React.useState(userParam)

  const [data, setData] = React.useState<OrderType[]>([])
  const columns: ColumnDef<OrderType>[] = [
    {
      accessorKey: 'order_number',
      header: 'Order Number',
      cell: ({ row }) => (
        <div className="text-center"># {row.getValue('order_number')} </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => {
        return (
          <Button
            variant="noShadow"
            className="border-none bg-background"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Ordered On
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at'))
        const formattedDate = date.toLocaleString()
        return <div>{formattedDate} </div>
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="noShadow"
            className="border-none bg-background"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = String(row.getValue('status'))
        const normalized = status.toLowerCase()

        const Icon = statusMap[normalized]?.icon || Clock
        const color = statusMap[normalized]?.color || 'gray'
        const label = statusMap[normalized]?.label || 'Unknown'
        return (
          <Badge className={color}>
            <Icon className={`h-3.5 w-3.5`} />
            {label}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'cart',
      header: 'Cart',
      cell: ({ row }) => {
        const cart = row.getValue('cart') as CartItemType[]
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="reverse" className="bg-secondary-background">
                <ShoppingCart className="" />₹ {row.original.total_amount}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background">
              <DialogHeader>
                <DialogTitle className="text-2xl p-2">
                  <Highlighter>Cart Items</Highlighter>
                </DialogTitle>
                <DialogDescription> </DialogDescription>
              </DialogHeader>
              <div className="md:col-span-2 overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Items ({cart.length})</h4>
                  <div className="text-sm text-muted-foreground">
                    Total:{' '}
                    <span className="font-semibold text-foreground">
                      {row.original.total_amount}
                    </span>
                  </div>
                </div>
                <Separator className="mb-3" />
                <ul className="space-y-3">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="bg-background rounded-xl border-2 p-2"
                    >
                      <div className="flex justify-between relative min-h-16">
                        <div className="w-full">
                          <p className="font-medium wrap-break-word max-w-[70%]">
                            {item.product.name}
                          </p>
                          {Object.keys(item.options).map((key, index) => (
                            <p
                              key={index}
                              className="text-muted-foreground text-sm"
                            >
                              {key}: {item.options[key]}
                            </p>
                          ))}
                        </div>
                        <div className="absolute right-2">
                          <div className="h-20 aspect-square relative right-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              sizes="80"
                              className="rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="whitespace-nowrap">
                        {`₹ ${item.product.price} x ${item.quantity} = ₹ ${item.product.price * item.quantity}`}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        )
      },
    },
    {
      accessorKey: 'payment',
      header: 'Payment',
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="reverse">
              <Eye />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background">
            <DialogHeader>
              <DialogTitle className="text-2xl p-2">
                <Highlighter>Payment Image</Highlighter>
              </DialogTitle>
              <DialogDescription> </DialogDescription>
            </DialogHeader>
            <Image
              src={row.original.payment}
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
      accessorKey: 'tracking_link',
      header: 'Tracking',
      cell: ({ row }) => (
        <>
          {row.original.tracking_link ? (
            <Button asChild className="bg-rosePine-love">
              <Link href={row.original.tracking_link} target="_blank">
                <MapPin />
              </Link>
            </Button>
          ) : (
            <Button className="bg-main-foreground">
              <MapPinOff />
            </Button>
          )}
        </>
      ),
    },
    {
      accessorKey: 'users',
      header: 'User',
      cell: ({ row }) => {
        const user = row.getValue('users') as Tables<'users'>
        if (!user) {
          return <></>
        }
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-main-foreground ">
                <User className="" />
                {user.name}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background text-secondary-background grid gap-4">
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
      id: 'actions',
      cell: ({ row }) => {
        const options = [
          'Unconfirmed',
          'Confirmed',
          'Cancelled By Seller',
          'Payment Failed',
          'Out of Stock',
          'Dispatched',
        ]

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Open menu </span>
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-rosePineDawn-overlay"
            >
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              {options.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={async () => {
                    // const res = await update(orderId, { status: item }, 'orders', null, null)
                    // if (res.success) setData(data.map((order) => order.id === orderId ? { ...order, status: item } : order))
                    // else toast('Failed to update status')
                  }}
                >
                  {item}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <p>add tracking link</p>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  // React.useEffect(() => {
  //   console.log(data)
  // }, [data])

  React.useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      /**** get ordrs data ****/
      const ordersRes = orderIdParam
        ? await supabase
            .from('orders')
            .select('*, users!inner(*)')
            .eq('id', orderIdParam)
        : await supabase
            .from('orders')
            .select('*, users!inner(*)')
            .order('updated_at', { ascending: false })
            .ilike('users.name', userParam === '' ? '*' : `%${userParam}%`)
            .like(
              'status',
              statusParam === '' ? '*' : statusParam.replaceAll('-', ' ')
            )
            .neq('users.name', 'd')
            .range(offsetParam, offsetParam + LIMIT - 1)
      // console.log('orders fetched')

      if (ordersRes.error) {
        console.log(ordersRes.error)
        alert('cant fetch data')
        return
      }

      setData(ordersRes.data)
    }
    fetchData()
  }, [statusParam, userParam, offsetParam, orderIdParam])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const statuses = [
    'Unconfirmed',
    'Confirmed',
    'Cancelled',
    'Cancelled By Seller',
    'Payment Failed',
    'Out of Stock',
    'Dispatched',
    '',
  ]
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center py-4 justify-between">
        <div className="relative">
          <Input
            placeholder="Filter user names..."
            value={filterUser}
            onChange={(event) => setFilterUser(event.target.value)}
            className="max-w-sm"
          />
          <Button asChild className="absolute top-0 right-0">
            <Link
              href={`/dashboard/orders?status=${statusParam}&user=${filterUser}&offset=${offsetParam}`}
            >
              {' '}
              <Search />
            </Link>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-rosePineDawn-overlay text-rosePineDawn-text hover:bg-rosePineDawn-surface">
              Filter Status
              <ChevronDown className="ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-rosePineDawn-overlay">
            {statuses.map((item, index) => (
              <Link
                href={`/dashboard/orders?status=${item.replaceAll(' ', '-')}&user=${userParam}&offset=${offsetParam}`}
                key={index}
              >
                <DropdownMenuItem>
                  {item === '' ? 'All' : item}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.index === 0
                            ? 120
                            : header.index === 1
                              ? 200
                              : header.index === 2
                                ? 180
                                : header.index === 3
                                  ? 130
                                  : header.index === 4
                                    ? 20
                                    : header.index === 5
                                      ? 20
                                      : header.index === 6
                                        ? 270
                                        : 'auto',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className=""></div>
        <div className="space-x-2">
          {offsetParam - LIMIT >= 0 && (
            <Button
              size="sm"
              className="bg-rosePineDawn-pine text-white"
              asChild
            >
              <Link
                href={`/dashboard/orders?status=${statusParam}&user=${filterUser}&offset=${offsetParam - LIMIT}`}
              >
                Previous
              </Link>
            </Button>
          )}
          {data.length > 0 && (
            <Button
              size="sm"
              className="bg-rosePineDawn-love text-white"
              asChild
            >
              <Link
                href={`/dashboard/orders?status=${statusParam}&user=${filterUser}&offset=${offsetParam + LIMIT}`}
              >
                Next
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
