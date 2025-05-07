'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import * as React from 'react'
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Settings2, PlusIcon, Type, FileDigit, ImageIcon, Trash2, TimerReset, CloudUpload, Loader, } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Database } from "@/lib/types"
type OrganizationType = Database['public']['Tables']['organizations']['Row']
type SheetType = Database['public']['Tables']['sheets']['Row']
import { Button } from '../ui/button'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import NewSheet from '../forms/new-sheet'
import { removeImageFolder, removeRow, update } from "@/lib/actions/crud"
import { toast } from "sonner"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"


const SheetItem = ({ sheet }: { sheet: SheetType }) => {
  const [columns, setColumns] = React.useState(sheet.columns)
  const [updatingColumns, setUpdatingColumns] = React.useState(false)

  const genrateIndex = () => {
    // return columns.reduce((acc, column) => {
    //   return Math.max(acc, column['id']||0)
    // }, 0) + 1
    return 0;
  }

  const types: { [key: string]: { icon: JSX.Element, bg: string } } = {
    'text': { icon: <Type />, bg: 'bg-rosePine-iris' },
    'number': { icon: <FileDigit />, bg: 'bg-rosePine-gold' },
    'image': { icon: <ImageIcon />, bg: 'bg-rosePine-foam' },
  }

  return (
    <div className="flex items-center justify-between p-2 hover:bg-rosePine-surface rounded-lg dark">
      <Link href={`/user/id-records/${sheet.id}/`} target="_blank">{sheet.name}</Link>
      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button size='icon' className='bg-rosePine-love hover:bg-rosePineDawn-love mr-2'><Trash2 /></Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-rosePine-surface text-rosePine-text border-rosePine-highlightLow">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Once the sheet is deleted, it cannot be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-rosePine-love text-rosePineDawn-text hover:bg-rosePineDawn-love border-rosePine-highlightHigh">Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rosePine-foam text-rosePineDawn-text hover:bg-rosePineDawn-foam"
                onClick={async () => {
                  const res = await removeRow(sheet.id, 'sheets', '/user/id-records')
                  if (!res.success) {
                    toast(res.msg)
                    return
                  }
                  const res2 = await removeImageFolder(`sheets/${sheet.id}`)
                  if (!res2.success) {
                    toast(res2.msg)
                    return
                  }
                }}
              >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog>
          <DialogTrigger>
            <Button size='icon' className='bg-rosePine-iris hover:bg-rosePineDawn-iris'><Settings2 /></Button>
          </DialogTrigger>
          <DialogContent className="bg-rosePine-surface text-rosePine-text border-rosePine-highlightLow">
            <DialogHeader>
              <div>
                <div className="space-y-2 mb-5">
                  <h4 className="font-medium leading-none">Configure Sheet</h4>
                  <p className="text-sm text-muted-foreground">
                    Managage sheet columns
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex gap-2 justify-between">
                    {Object.keys(types).map((type) => (
                      <div className="border border-dashed border-rosePine-foam rounded-lg px-3" key={type}>
                        <button onClick={() => setColumns(prev => [
                          { name: 'New Column', id: genrateIndex(), type: type },
                          ...prev
                        ])}
                          className='text-rosePine-foam mx-auto block py-1'
                        >
                          <PlusIcon className='inline' size={20} /> {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      </div>
                    ))}
                  </div>
                  {columns.map((column, index) => (
                    <div className="flex items-center gap-4" key={index}>
                      <Button size='icon' variant="ghost" className="hover:bg-rosePine-overlay hover:text-rosePine-text h-8 w-12"
                        onClick={() => {
                          setColumns(prev => {
                            const newColumns = [...prev]
                            const newIndex = index === newColumns.length - 1 ? 0 : index + 1
                            const temp = newColumns[newIndex]
                            newColumns[newIndex] = newColumns[index]
                            newColumns[index] = temp
                            return newColumns
                          })
                        }}
                      ><ChevronDown /></Button>
                      <Input
                        value={column?.['name']}
                        onChange={(e) => {
                          const newColumns = [...columns]
                          // newColumns[index]?.['name'] = e.target.value
                          setColumns(newColumns)
                        }}
                        className="col-span-2 h-8 border-rosePine-highlightHigh"
                      />
                      <div className={`h-8 rounded-lg w-8 p-1 text-black ${types[column?.['type']].bg}`}>
                        {types[column?.['type']].icon}
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button size='icon' className='bg-rosePine-love hover:bg-rosePineDawn-love'><Trash2 /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-rosePine-surface text-rosePine-text border-rosePine-highlightLow">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Once the column is deleted, it cannot be recovered.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-rosePine-love text-rosePineDawn-text hover:bg-rosePineDawn-love border-rosePine-highlightHigh">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-rosePine-foam text-rosePineDawn-text hover:bg-rosePineDawn-foam"
                              onClick={() => {
                                const newColumns = [...columns]
                                newColumns.splice(index, 1)
                                setColumns(newColumns)
                              }}
                            >Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
                <div className="mt-3 gap-3 flex justify-end">
                  <Button size='icon'
                    className='bg-rosePine-pine text-black hover:bg-rosePineDawn-pine'
                    onClick={() => setColumns(sheet.columns)}
                  ><TimerReset /></Button>
                  <Button
                    className='bg-rosePine-gold text-black hover:bg-rosePineDawn-gold disabled:bg-rosePine-highlightLow'
                    disabled={updatingColumns}
                    onClick={async () => {
                      setUpdatingColumns(true)
                      const res = await update(sheet.id, { columns }, 'sheets', null, null);
                      if (res.success) {
                        toast('Sheet Updated')
                        sheet.columns = columns
                      }
                      else toast(res.msg)
                      setUpdatingColumns(false)
                    }}
                  >
                    {updatingColumns ?
                      <Loader className="animate-spin" /> :
                      <CloudUpload />
                    }Save Changes
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild >
            <Button variant="ghost" className="h-8 w-8 p-5" >
              <span className="sr-only">Open menu </span>
              < DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          < DropdownMenuContent align="end" className="bg-rosePine-overlay border-rosePine-highlightLow text-rosePine-text">
            <DropdownMenuItem
              className="hover:bg-rosePine-love"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/user/id-records/my-records/${sheet.id}`)
                toast('Link Copied')
              }}
            >
              Copy Public Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div >
  )
}

const SheetSection = ({ title, sheets }: { title: string, sheets: SheetType[] }) => {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-bold text-left text-rosePine-love bg-rosePine-surface hover:bg-rosePine-overlay rounded-lg">
        <span>{title}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {sheets.length > 0 ?
          sheets.map((sheet) => (
            <SheetItem key={sheet.id} sheet={sheet} />
          )) :
          <div className="p-4 text-center text-rosePine-text">
            No sheets found
          </div>
        }
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function IDSheets({ organization, sheets }: {
  organization: OrganizationType,
  sheets: SheetType[],
}) {
  return (
    <div className="container mx-auto p-4 space-y-6 dark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6 text-rosePine-rose">My Sheets</h1>
        {!organization &&
          <Button className="bg-rosePine-iris hover:bg-rosePineDawn-gold" asChild>
            <Link href="/user/id-records/create-organization">
              Setup Organization
            </Link>
          </Button>
        }
        {organization && organization.status === 'Unconfirmed' &&
          <Badge className="bg-rosePine-gold h-10">Pending Confirmation</Badge>
        }
        {organization && organization.status === 'Paused By Admin' &&
          <Badge className="bg-rosePine-love h-10">Paused By Admin</Badge>
        }
        {organization && organization.status === 'Paused' &&
          <Badge className="bg-rosePine-love h-10">Paused By User</Badge>
        }
        {organization && organization.status === 'Confirmed' &&
          <NewSheet sheets={sheets} />
        }
      </div>
      {organization && organization.status === 'Confirmed' &&
        <SheetSection title="Sheets I Own" sheets={sheets} />
      }
      {/* <SheetSection title="Sheets I Can Edit" sheets={editableSheets} /> */}
    </div>
  )
}
