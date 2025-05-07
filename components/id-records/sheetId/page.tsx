"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ColumnResizer from "react-table-column-resizer";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowDown01, ArrowDownAz, ArrowUp01, ArrowUpAz, DownloadIcon, SlidersHorizontal } from 'lucide-react'
import { Database } from "@/lib/types"
type ColumnType = Database['public']['Tables']['sheets']['Row']['columns']
type RecordType = Database['public']['Tables']['sheets']['Row']['columns']
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from "@/supabase/utils/client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { EditRecord } from "../new-record/page";
import { Checkbox } from "@/components/ui/checkbox";
import { handleMultipleRowDelete } from "@/lib/actions/sheets";


export default function SheetTable({ records, columnDefs, sheetId }: { records: RecordType, columnDefs: ColumnType[], sheetId: string }) {
  const [Records, setRecords] = React.useState(records)
  const [selectedRows, setSelectedRows] = React.useState<number[]>([])

  return (
    <div className="min-h-screen text-rosePine-text ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={`fixed transition left-1/2 -translate-x-1/2 top-0 dark bg-rosePine-iris text-rosePineDawn-text hover:bg-rosePineDawn-iris hover:text-rosePineDawn-text
              ${selectedRows.length ? 'md:translate-y-[3vh] translate-y-[94vh]' : 'md:-translate-y-[4vh] translate-y-[103vh]'}`}>
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-rosePine-base border-rosePine-overlay text-rosePine-text">
          <AlertDialog>
            <AlertDialogTrigger className="text-sm p-2">
              Delete Rows
            </AlertDialogTrigger>
            <AlertDialogContent className="dark text-rosePine-text ">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the entry.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={() => handleMultipleRowDelete(selectedRows, sheetId)}>Continue</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DropdownMenuItem>Export to xlsx</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Table className="column_resize_table overflow-y-scroll max-w-[98vw]">
        <TableCaption> ---End of Records--- </TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-rosePine-overlay px-2 border-none">
            <TableHead >
              <Checkbox
                checked={selectedRows.length === Records.length}
                onCheckedChange={(checked) => {
                  setSelectedRows(checked ? Records.map((record) => record?.['index']) : [])
                }}
                className="w-5 h-5 dark mx-2"
              />
            </TableHead>
            {columnDefs.map((column, index) => (
              <>
                {index !== 0 && <ColumnResizer
                  className="columnResizer w-1 bg-rosePine-highlightMed"
                  minWidth={0}
                  maxWidth={null}
                  id={index * 2}
                  resizeStart={() => console.log('resize start')}
                  resizeEnd={(width) => console.log('resize end', width)}
                  disabled={false}
                />
                }
                {/* <TableHead */}
                {/*   key={index * 2 + 1} */}
                {/*   className={`text-rosePine-foam hover:text-rosePine-pine overflow-hidden */}
                {/*     ${column['type'] === 'image' ? 'w-16 md:w-20' : 'w-auto'}`} */}
                {/* > */}
                {/*   {column['type'] !== 'image' ? */}
                {/*     <ColumnPopOver column={column} Records={records} CurrRecords={Records} setRecords={setRecords} /> : */}
                {/*     column['name'] */}
                {/*   } */}
                {/* </TableHead> */}
              </>
            ))}
            <TableHead > </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border border-rosePine-highlightMed bg-rosePine-base">
          {Records.map((record, index) => (
            <TableRow className="hover:bg-rosePine-overlay border-rosePine-highlightMed" key={index}>
              <TableCell className="text-rosePine-text hover:text-rosePine-iris break-words font-bold w-2">
                {/* <Checkbox */}
                {/*   checked={selectedRows.includes(record['index'])} */}
                {/*   onCheckedChange={(checked) => { */}
                {/*     setSelectedRows(checked ? [...selectedRows, record['index']] : selectedRows.filter((i) => i !== record['index'])) */}
                {/*   }} */}
                {/*   className="w-5 h-5 dark mx-2" */}
                {/* /> */}
              </TableCell>
              {columnDefs.map((column, index) => (
                <>
                  {index !== 0 && <td ></td>}
                  {/* <TableCell */}
                  {/*   className="text-rosePine-text hover:text-rosePine-iris p-3 break-words font-bold" */}
                  {/*   key={index}> */}
                  {/*   {column['type'] === 'image' ? */}
                  {/*     <PreviewImage src={String(record?.[column['id']])} recordIndex={record['index']} /> */}
                  {/*     : <p onDoubleClick={(e) => { */}
                  {/*       e.preventDefault() */}
                  {/*       navigator.clipboard.writeText(String(record?.[column['id']])) */}
                  {/*       toast('value copied to clipboard') */}
                  {/*     }} */}
                  {/*     >{JSON.stringify(record?.[column['id']])}</p> */}
                  {/*   } */}
                  {/* </TableCell> */}
                </>
              ))}
              <TableCell className="text-rosePine-text hover:text-rosePine-iris p-2 break-words font-bold w-3">
                <EditRecord sheetId={sheetId} columns={columnDefs} entry={record} trigger="icon" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const PreviewImage = ({ src, recordIndex }: { src: string, recordIndex: number }) => {
  const supabase = createClient()
  const [open, setOpen] = React.useState(false)
  const srcUrl = supabase.storage.from('images').getPublicUrl(src).data.publicUrl
  return (
    <div className="relative">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Image
            src={srcUrl}
            alt="preview"
            width={200}
            height={200}
            className="w-full object-cover"
          />
        </DialogTrigger>
        <DialogContent className="bg-rosePine-base text-rosePine-text border-rosePine-highlightMed pt-12">
          <Image
            src={srcUrl}
            alt="preview"
            width={800}
            height={800}
          />
          {/* Download Button */}
          <a
            href={srcUrl}
            target="_blank"
            className="absolute top-3 left-6"
            download={true}
          // download={`${recordIndex}.${src.split('.').pop()}`}
          >
            <DownloadIcon />
          </a>
        </DialogContent>
      </Dialog>
    </div>
  )
}
const btnClass = "w-full gap-4 flex justify-start text-rosePine-iris hover:bg-rosePine-overlay hover:text-rosePine-iris"
const ColumnPopOver = ({ column, Records, setRecords, CurrRecords }: {
  CurrRecords: RecordType[],
  column: ColumnType,
  Records: RecordType,
  setRecords: React.Dispatch<React.SetStateAction<RecordType>>
}) => {
  const [open, setOpen] = React.useState(false)
  const [compareMode, setCompareMode] = React.useState('=')
  const [choosingMode, setChoosingMode] = React.useState(false)
  const [numInput, setNumInput] = React.useState('')
  const modes = ['=', '>', '<', '>=', '<=', '!=']

  React.useEffect(() => {
      const search = () => {
        const NumInput = Number(numInput)
        if (!NumInput) return setRecords([...Records])
        compareMode === '=' ? setRecords([...Records.filter(record => Number(record?.[column['id']]) == NumInput)]) :
          compareMode === '>' ? setRecords([...Records.filter(record => Number(record?.[column['id']]) > NumInput)]) :
            compareMode === '<' ? setRecords([...Records.filter(record => Number(record?.[column['id']]) < NumInput)]) :
              compareMode === '>=' ? setRecords([...Records.filter(record => Number(record?.[column['id']]) >= NumInput)]) :
                compareMode === '<=' ? setRecords([...Records.filter(record => Number(record?.[column['id']]) <= NumInput)]) :
                  compareMode === '!=' ? setRecords([...Records.filter(record => Number(record?.[column['id']]) != NumInput)]) :
                    setRecords([...Records])

      }
  
    search()
  }, [compareMode, numInput, Records, column['id'], setRecords])


return (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerTrigger asChild>
      <Button variant="ghost" className="hover:bg-rosePine-surface hover:text-rosePineDawn-pine">
        <SlidersHorizontal size={16} />{column['name']}
      </Button>
    </DrawerTrigger>
    <DrawerContent
      className="bg-rosePine-base md:max-w-3xl mx-auto px-5 border-rosePine-highlightMed flex flex-col gap-2 ">
      {column['type'] === 'text' &&
        <Input placeholder="Search" className="bg-rosePine-base border-rosePine-highlightMed text-rosePine-rose"
          onChange={(event) => {
            const search = event.target.value.toLowerCase()
            setRecords([...Records.filter(record => String(record?.[column['id']]).toLowerCase().includes(search))])
          }}
        />}
      {column['type'] === 'number' &&
        <div className="flex items-center gap-5">
          <div className="text-rosePine-text w-28">Value is</div>
          <Button className="bg-rosePine-surface text-rosePine-love hover:bg-rosePine-overlay hover:text-rosePineDawn-love"
            onClick={() => { setChoosingMode(!choosingMode) }} >
            {compareMode}
          </Button>
          <Input placeholder="value" type="tel"
            value={numInput}
            onChange={(event) => { setNumInput(event.target.value); }}
            className="bg-rosePine-base border-rosePine-highlightMed text-rosePine-rose"
          />
        </div>
      }
      {choosingMode && <div className="flex gap-2">
        {modes.map((mode, index) =>
          <Button key={index} className="bg-rosePine-surface text-rosePine-love hover:bg-rosePine-overlay hover:text-rosePineDawn-love"
            onClick={() => {
              setCompareMode(mode);
              setChoosingMode(false);
            }} >
            {mode}
          </Button>)}
      </div>}
      <Button variant="ghost" className={btnClass}
        onClick={() => {
          setOpen(false)
          // setRecords([...CurrRecords.sort((a, b) => a[column['id']] > b[column['id']] ? 1 : -1)])
        }}
      >
        <span className="text-rosePineDawn-iris">
          {column['type'] === 'text' ? <ArrowDownAz /> : <ArrowDown01 />}
        </span>
        Sort Ascending
      </Button>
      <Button variant="ghost" className={btnClass}
        onClick={() => {
          setOpen(false)
          // setRecords([...CurrRecords.sort((a, b) => a[column['id']] < b[column['id']] ? 1 : -1)])
        }}
      >
        <span className="text-rosePineDawn-iris">
          {column['type'] === 'text' ? <ArrowUpAz /> : <ArrowUp01 />}
        </span>
        Sort Descending
      </Button>
      <Separator className="bg-rosePine-highlightHigh" />
    </DrawerContent>
  </Drawer>
)
}
