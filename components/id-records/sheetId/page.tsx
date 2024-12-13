"use client"

import * as React from "react"
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
import { ArrowDown01, ArrowDownAz, ArrowUp01, ArrowUpAz, DownloadIcon, Filter, SlidersHorizontal, X } from 'lucide-react'
import { ColumnType, RecordType } from "@/lib/types"
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


export default function SheetTable({ records, columnDefs }: { records: RecordType[], columnDefs: ColumnType[] }) {
  const [Records, setRecords] = React.useState(records)
  const [Columns, setColumns] = React.useState(columnDefs)
  const [thumbnailsize, setThumbnailSize] = React.useState(50)
  const thumnailSizes = {
    small: 55,
    medium: 100,
    large: 150
  }

  return (
    <div className="min-h-screen text-rosePine-text">
      <div className="flex items-center py-4 justify-between">
        {/* <div className="relative"> */}
        {/*   <Input */}
        {/*     placeholder="Filter user names..." */}
        {/*     value={filterUser} */}
        {/*     onChange={(event) => */}
        {/*       setFilterUser(event.target.value) */}
        {/*     } */}
        {/*     className="max-w-sm" */}
        {/*   /> */}
        {/*   <Button asChild variant={'ghost'} className="absolute top-0 right-0"> */}
        {/*     <Link href={`/dashboard/sheets?status=${statusParam}&user=${filterUser}&offset=${offsetParam}`}> <Search /></Link> */}
        {/*   </Button> */}
        {/* </div> */}
        {/* <DropdownMenu> */}
        {/*   <DropdownMenuTrigger asChild> */}
        {/*     <Button className="bg-rosePine-overlay text-rosePine-text hover:bg-rosePine-surface"> */}
        {/*       Filter Status */}
        {/*       <ChevronDown className="ml-1" /> */}
        {/*     </Button> */}
        {/*   </DropdownMenuTrigger> */}
        {/*   <DropdownMenuContent className="bg-rosePine-overlay"> */}
        {/*     {statuses.map((item, index) => */}
        {/*       <Link href={`/dashboard/sheets?status=${item.replaceAll(' ', '-')}&user=${userParam}&offset=${offsetParam}`} key={index}> */}
        {/*         <DropdownMenuItem > */}
        {/*           {item === '' ? 'All' : item} */}
        {/*         </DropdownMenuItem> */}
        {/*       </Link> */}
        {/*     )} */}
        {/*   </DropdownMenuContent> */}
        {/* </DropdownMenu> */}
      </div>

      <Table className="column_resize_table overflow-y-scroll max-w-[98vw]">
        <TableCaption> ---End of Records--- </TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-rosePine-overlay px-2 border-none">
            {Columns.map((column, index) => (
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
                <TableHead
                  key={index * 2 + 1}
                  className={`text-rosePine-foam hover:text-rosePine-pine overflow-hidden
                    ${column.type === 'image' ? 'w-16 md:w-20' : 'w-auto'}`}
                >
                  {column.type !== 'image' ?
                    <ColumnPopOver column={column} Records={records} CurrRecords={Records} setRecords={setRecords} /> :
                    column.name
                  }
                </TableHead>
              </>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="border border-rosePine-highlightMed bg-rosePine-base">
          {Records.map((record, index) => (
            <TableRow className="hover:bg-rosePine-overlay border-rosePine-highlightMed" key={index}>
              {Columns.map((column, index) => (
                <>
                  {index !== 0 && <td ></td>}
                  <TableCell
                    className="text-rosePine-text hover:text-rosePine-iris p-3 break-words font-bold"
                    key={index}>
                    {column.type === 'image' ?
                      <PreviewImage src={String(record[column.id])} recordIndex={record.index} />
                      : <p onDoubleClick={(e) => {
                        e.preventDefault()
                        navigator.clipboard.writeText(String(record[column.id]))
                        toast('value copied to clipboard')
                      }}
                      >{record[column.id]}</p>
                    }
                  </TableCell>
                </>
              ))}
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
  Records: RecordType[],
  setRecords: React.Dispatch<React.SetStateAction<RecordType[]>>
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
      compareMode === '=' ? setRecords([...Records.filter(record => Number(record[column.id]) == NumInput)]) :
        compareMode === '>' ? setRecords([...Records.filter(record => Number(record[column.id]) > NumInput)]) :
          compareMode === '<' ? setRecords([...Records.filter(record => Number(record[column.id]) < NumInput)]) :
            compareMode === '>=' ? setRecords([...Records.filter(record => Number(record[column.id]) >= NumInput)]) :
              compareMode === '<=' ? setRecords([...Records.filter(record => Number(record[column.id]) <= NumInput)]) :
                compareMode === '!=' ? setRecords([...Records.filter(record => Number(record[column.id]) != NumInput)]) :
                  setRecords([...Records])

    }
    search()
  }, [compareMode, numInput, Records,column.id, setRecords])


  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="hover:bg-rosePine-surface hover:text-rosePineDawn-pine">
          <SlidersHorizontal size={16} />{column.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="bg-rosePine-base md:max-w-3xl mx-auto px-5 border-rosePine-highlightMed flex flex-col gap-2 ">
        {column.type === 'text' &&
          <Input placeholder="Search" className="bg-rosePine-base border-rosePine-highlightMed text-rosePine-rose"
            onChange={(event) => {
              const search = event.target.value.toLowerCase()
              setRecords([...Records.filter(record => String(record[column.id]).toLowerCase().includes(search))])
            }}
          />}
        {column.type === 'number' &&
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
            setRecords([...CurrRecords.sort((a, b) => a[column.id] > b[column.id] ? 1 : -1)])
          }}
        >
          <span className="text-rosePineDawn-iris">
            {column.type === 'text' ? <ArrowDownAz /> : <ArrowDown01 />}
          </span>
          Sort Ascending
        </Button>
        <Button variant="ghost" className={btnClass}
          onClick={() => {
            setOpen(false)
            setRecords([...CurrRecords.sort((a, b) => a[column.id] < b[column.id] ? 1 : -1)])
          }}
        >
          <span className="text-rosePineDawn-iris">
            {column.type === 'text' ? <ArrowUpAz /> : <ArrowUp01 />}
          </span>
          Sort Descending
        </Button>
        <Separator className="bg-rosePine-highlightHigh" />
      </DrawerContent>
    </Drawer>
  )
}
