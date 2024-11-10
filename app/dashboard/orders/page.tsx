"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
import { columns } from "./columns"
import { OrderType } from "@/lib/types"
import { createClient } from "@/supabase/utils/client"
import Link from "next/link"
import { ChevronDown, Search } from "lucide-react"
import { useSearchParams } from "next/navigation"

const LIMIT = 12;

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [filterUser, setFilterUser] = React.useState('')
  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status') || ''
  const userParam = searchParams.get('user') || ''
  const offsetParam = Number(searchParams.get('offset')) || 0

  const [data, setData] = React.useState<OrderType[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      /**** get ordrs data ****/
      const ordersRes = await supabase.from('orders')
        .select('*, users!inner(*)')
        .order('updated_at', { ascending: false })
        .ilike('users.name', userParam === '' ? '*' : `%${userParam}%`)
        .like('status', statusParam === '' ? '*' : statusParam.replaceAll('-', ' '))
        .neq('users.name', null)
        .range(offsetParam, offsetParam + LIMIT - 1)
      console.log('orders fetched')

      if (ordersRes.error || !ordersRes.data) {
        console.log(ordersRes.error)
        alert('cant fetch data')
        return;
      }

      const orders: OrderType[] = ordersRes.data.map(item => ({
        ...item,
        payment_full: supabase.storage.from('images').getPublicUrl(item.payment).data.publicUrl
      }))

      setData(orders)
    }
    fetchData();
  }, [statusParam, userParam, offsetParam])

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
    'Dispatched'
  ]
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center py-4 justify-between">
        <div className="relative">
          <Input
            placeholder="Filter user names..."
            value={filterUser}
            onChange={(event) =>
              setFilterUser(event.target.value)
            }
            className="max-w-sm"
          />
          <Button asChild variant={'ghost'} className="absolute top-0 right-0">
            <Link href={`/dashboard/orders?status=${statusParam}&user=${filterUser}&offset=${offsetParam}`}> <Search /></Link>
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
              <Link href={`/dashboard/orders?status=${item.replaceAll(' ', '-')}&user=${userParam}&offset=${offsetParam}`} key={index}>
                <DropdownMenuItem >
                  {item}
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
                        width: header.index === 0 ? 120 :
                          header.index === 1 ? 200 :
                            header.index === 2 ? 200 :
                              header.index === 3 ? 20 :
                                header.index === 4 ? 20 :
                                  header.index === 5 ? 270 :
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
              <Link href={`/dashboard/orders?status=${statusParam}&user=${filterUser}&offset=${offsetParam - LIMIT}`}>
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
              <Link href={`/dashboard/orders?status=${statusParam}&user=${filterUser}&offset=${offsetParam + LIMIT}`}>
                Next
              </Link>
            </Button>
          }
        </div>
      </div>
    </div>
  )
}

