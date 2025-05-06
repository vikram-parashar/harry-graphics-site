"use client"
import * as React from "react"
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

import { Badge } from "@/components/ui/badge"
import { Eye, Mail, MapPin, Phone, User } from "lucide-react"
import { OrganizationType, UserType } from "@/lib/types"
import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from "@/supabase/utils/client"
import Link from "next/link"
import { ChevronDown, Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { update } from "@/lib/actions/crud"
import { toast } from "sonner"

const LIMIT = 12;

export const revalidate = 3600;
export default function Page() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') || ''
  const orgParam = searchParams.get('org') || ''
  const orgIdParam = searchParams.get('orderId')
  const offsetParam = Number(searchParams.get('offset')) || 0
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [filterOrg, setFilterOrg] = React.useState(orgParam)

  const [data, setData] = React.useState<OrganizationType[]>([])
  const columns: ColumnDef<OrganizationType>[] = [
    {
      accessorKey: "name",
      header: 'Organization Name',
      cell: ({ row }) => <div className="text-center">{row.getValue("name")} </div>,
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
          'Unconfirmed': 'bg-rosePineDawn-gold',
          'Confirmed': 'bg-rosePineDawn-pine',
          'Paused': 'bg-rosePineDawn-love',
          'Paused By Admin': 'bg-rosePineDawn-love',
        }
        const status = String(row.getValue("status"))
        return <Badge className={`${statusColor[status]} hover:${statusColor[status]}`}> {status} </Badge>
      },
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
          'Paused By Admin',
        ]
        const orderId = row.original.id;

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
                  onClick={async () => {
                    const res = await update(orderId, { status: item }, 'organizations', null, null)
                    if (res.success) setData(data.map((order) => order.id === orderId ? { ...order, status: item } : order))
                    else toast('Failed to update status')
                  }
                  }
                >
                  {item}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
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

      /**** get orgs data ****/
      const orgRes = orgIdParam ?
        await supabase.from('organizations')
          .select('*, users!inner(*)').eq('id', orgIdParam) :
        await supabase.from('organizations')
          .select('*, users!inner(*)')
          .order('updated_at', { ascending: false })
          .ilike('name', orgParam === '' ? '*' : `%${orgParam}%`)
          .like('status', statusParam === '' ? '*' : statusParam.replaceAll('-', ' '))
          .range(offsetParam, offsetParam + LIMIT - 1)
      // console.log('organizations fetched')

      if (orgRes.error) {
        console.log(orgRes.error)
        alert('cant fetch data')
        return;
      }

      const organizations: OrganizationType[] = orgRes.data.map(item => ({
        ...item,
        payment_full: supabase.storage.from('images').getPublicUrl(item.payment).data.publicUrl
      }))

      setData(organizations)
    }
    fetchData();
  }, [statusParam, orgParam, offsetParam, orgIdParam])

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
    'Paused',
    'Paused By Admin',
    '',
  ]
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center py-4 justify-between">
        <div className="relative">
          <Input
            placeholder="Filter organization names..."
            value={filterOrg}
            onChange={(event) =>
              setFilterOrg(event.target.value)
            }
            className="w-96 max-w-lg"
          />
          <Button asChild variant={'ghost'} className="absolute top-0 right-0">
            <Link href={`/dashboard/organizations?status=${statusParam}&org=${filterOrg}&offset=${offsetParam}`}> <Search /></Link>
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
            {statuses.map((item, index) =>
              <Link href={`/dashboard/organizations?status=${item.replaceAll(' ', '-')}&user=${orgParam}&offset=${offsetParam}`} key={index}>
                <DropdownMenuItem >
                  {item === '' ? 'All' : item}
                </DropdownMenuItem>
              </Link>
            )}
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
                    <TableHead key={header.id}
                      style={{
                        width: header.index === 0 ? 150 :
                          header.index === 1 ? 150 :
                            header.index === 2 ? 120 :
                              header.index === 3 ? 20 :
                                header.index === 4 ? 120 :
                                  header.index === 5 ? 20 :
                                    "auto",
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
                  data-state={row.getIsSelected() && "selected"}
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
        <div className="">
        </div>
        <div className="space-x-2">
          {offsetParam - LIMIT >= 0 &&
            <Button
              variant="outline"
              size="sm"
              className="bg-rosePineDawn-pine text-white"
              asChild
            >
              <Link href={`/dashboard/organizations?status=${statusParam}&user=${filterOrg}&offset=${offsetParam - LIMIT}`}>
                Previous
              </Link>
            </Button>
          }
          {data.length > 0 &&
            <Button
              variant="outline"
              size="sm"
              className="bg-rosePineDawn-love text-white"
              asChild
            >
              <Link href={`/dashboard/organizations?status=${statusParam}&user=${filterOrg}&offset=${offsetParam + LIMIT}`}>
                Next
              </Link>
            </Button>
          }
        </div>
      </div>
    </div>
  )
}

