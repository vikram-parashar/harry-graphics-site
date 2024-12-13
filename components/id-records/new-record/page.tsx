'use client'

import { useEffect, useState } from 'react'
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
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SheetType } from '@/lib/types'
import Image from 'next/image'
import { Eye, LoaderCircle, X } from 'lucide-react'
import { uploadImage } from '@/lib/actions/image'
import { handleDataDelete, handleDataInsert, handleDataUpdate } from '@/lib/actions/sheets'
import { toast } from 'sonner'
import { createClient } from '@/supabase/utils/client'
import { removeImages } from '@/lib/actions/crud'

export default function NewRecord({ sheetId, oldEnties, columns }: {
  sheetId: string,
  oldEnties: any,
  columns: SheetType['columns'],
}) {
  const [pending, setPending] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [record, setRecord] = useState<any>({})

  useEffect(() => {
    setRecord({})
  }, [isDialogOpen])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setPending(true)
    const Record: { [key: string]: string | number } = {}
    for (const field of columns) {
      if (field.type === 'image') {
        const image = record[field.id]?.value
        if (image) {
          const res = await uploadImage(`sheets/${sheetId}`, String(crypto.randomUUID()), image, 800, 800)
          if (res.path) {
            Record[field.id] = res.path
          }
        }
      } else {
        Record[field.id] = record[field.id]?.value
      }
    }
    const res = await handleDataInsert(Record, sheetId)
    if (!res.success) {
      toast(res.msg)
    }
    setIsDialogOpen(false)
    setPending(false)
  }

  return (
    <div className="container mx-auto p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-rosePine-love text-black hover:bg-rosePineDawn-love">Add Person</Button>
        </DialogTrigger>
        <DialogContent className='bg-rosePine-base border-rosePine-highlightLow text-rosePine-text'>
          <DialogHeader>
            <DialogTitle className='text-rosePine-rose'>Add New Person</DialogTitle>
          </DialogHeader>
          <div className='relative'>
            {columns.map((field,index) => (
              <div key={index}>
                {(field.type === 'text' || field.type === 'number') ? (
                  <div key={field.name}>
                    <Label htmlFor={field.name}>{field.name}
                      {field.type === 'number' && <span className="text-rosePine-rose ml-2">*{field.type}</span>}
                    </Label>
                    <Input
                      type='text'
                      className='border-rosePine-highlightHigh'
                      value={record[field.id]?.value || ''}
                      onChange={(e) => {
                        const input = e.target.value
                        setRecord(
                          field.type === 'number' ?
                            { ...record, [field.id]: { value: input.replace(/\D/g, '') } } :
                            { ...record, [field.id]: { value: input } }
                        )
                      }}
                    />
                  </div>
                ) : field.type === 'image' ? (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.name}</Label>
                    <div className="flex items-center space-x-2">
                      {record[field.id] &&
                        <Button
                          size="icon"
                          className="text-rosePine-foam"
                          onClick={() => setRecord((prev: any) => {
                            const newRecord = { ...prev }
                            newRecord[field.id].preview = true
                            return newRecord
                          })}><Eye /></Button>
                      }
                      {record[field.id]?.preview &&
                        <Image
                          src={URL.createObjectURL(record[field.id]?.value)}
                          height={400}
                          width={400}
                          alt="preview"
                          className="absolute w-full left-[48%] -translate-x-1/2"
                          onClick={() => setRecord((prev: any) => {
                            const newRecord = { ...prev }
                            newRecord[field.id].preview = false
                            return newRecord
                          })}
                        />
                      }
                      <Input
                        type="file"
                        className='border-rosePine-highlightHigh dark'
                        accept="image/*"
                        onChange={(e) => {
                          const input = e.target.files?.[0]
                          setRecord({ ...record, [field.id]: { value: input, preview: false } })
                        }}
                      />
                    </div>
                  </div>
                ) :
                  (<></>)
                }
              </div>
            ))}
          </div>
          <Button type="submit"
            disabled={pending}
            className="disabled:opacity-70 bg-rosePine-love text-black hover:bg-rosePineDawn-love"
            onClick={handleSubmit}
          >
            Add Entry
            {pending && <LoaderCircle className="inline animate-spin ml-1" />}
          </Button>
        </DialogContent>
      </Dialog>

      <div className="grid md:grid-cols-3 gap-3 mt-10">
        {oldEnties.map((entry: any, index: number) => (
          <EditRecord key={index} sheetId={sheetId} entry={entry} columns={columns} />
        ))}
      </div>
    </div>
  )
}
const EditRecord = ({ sheetId, entry, columns }: {
  sheetId: string,
  entry: SheetType['data'][0],
  columns: SheetType['columns'],
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [record, setRecord] = useState<any>({})

  useEffect(() => {
    setRecord(() => {
      const newRecord: any = {}
      for (const field of columns) {
        if (field.type === 'image') {
          newRecord[field.id] = { value: entry[field.id], preview: false }
        } else {
          newRecord[field.id] = { value: entry[field.id] }
        }
      }
      return newRecord
    })
  }, [isDialogOpen, columns, entry])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setPending(true)

    const imgToRemove: string[] = []

    const Record: { [key: string]: string | number } = {}
    for (const field of columns) {
      if (field.type === 'image') {
        const image = record[field.id]?.value
        if (typeof image === 'string') Record[field.id] = record[field.id]?.value
        else {
          imgToRemove.push(String(entry[field.id]))
          const res = await uploadImage(`sheets/${sheetId}`, String(crypto.randomUUID()), image, 800, 800)
          if (res.path) Record[field.id] = res.path
        }
      } else Record[field.id] = record[field.id]?.value

    }
    await removeImages(imgToRemove)

    Record['index'] = entry.index
    Record['created_by'] = entry.created_by
    const res = await handleDataUpdate(Record, sheetId)
    if (!res.success) toast(res.msg)

    setIsDialogOpen(false)
    setPending(false)
  }

  const thumbnailTxt = (entry: any) => {
    let firstTextID = -1;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].type === 'text') {
        firstTextID = columns[i].id
        break
      }
    }

    if (firstTextID === -1) return ''
    return entry[firstTextID]
  }
  const thumbnailImg = (entry: any) => {
    let firstImgID = -1;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].type === 'image') {
        firstImgID = columns[i].id
        break
      }
    }

    if (firstImgID === -1) return ''
    const supabase = createClient()
    return supabase.storage.from('images').getPublicUrl(entry[firstImgID]).data.publicUrl
  }
  const previewImage = (value: File | string) => {
    if (typeof value === 'string') {
      const supabase = createClient()
      return supabase.storage.from('images').getPublicUrl(value).data.publicUrl

    }
    return URL.createObjectURL(value)
  }

  return (
    <div className="relative w-full">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className='absolute right-3 top-1 hover:text-white hover:bg-rosePine-overlay' > <X /> </Button>
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
            <Button onClick={() => handleDataDelete(entry, sheetId)} >Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="bg-rosePine-surface border-rosePine-highlightLow p-2 rounded-xl flex gap-5 items-center w-full py-3">
            {thumbnailImg(entry) &&
              <Image
                src={thumbnailImg(entry)}
                height={100}
                width={100}
                alt="preview"
                className="rounded-lg w-12 h-12 md:h-[80px] md:w-[80px] object-cover"
              />
            }
            {thumbnailTxt(entry)}
          </button>
        </DialogTrigger>
        <DialogContent className='bg-rosePine-base border-rosePine-highlightLow text-rosePine-text'>
          <DialogHeader>
            <DialogTitle className='text-rosePine-rose'>Edit Entry</DialogTitle>
          </DialogHeader>
          <div className='relative'>
            {columns.map((field) => (
              <>
                {(field.type === 'text' || field.type === 'number') ? (
                  <div key={field.name}>
                    <Label htmlFor={field.name}>{field.name}
                      {field.type === 'number' && <span className="text-rosePine-rose ml-2">*{field.type}</span>}
                    </Label>
                    <Input
                      type='text'
                      className='border-rosePine-highlightHigh'
                      value={record[field.id]?.value || ''}
                      onChange={(e) => {
                        const input = e.target.value
                        setRecord(
                          field.type === 'number' ?
                            { ...record, [field.id]: { value: input.replace(/\D/g, '') } } :
                            { ...record, [field.id]: { value: input } }
                        )
                      }}
                    />
                  </div>
                ) : field.type === 'image' ? (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.name}</Label>
                    <div className="flex items-center space-x-2">
                      {record[field.id] &&
                        <Button
                          size="icon"
                          className="text-rosePine-foam"
                          onClick={() => setRecord((prev: any) => {
                            const newRecord = { ...prev }
                            newRecord[field.id].preview = true
                            return newRecord
                          })}><Eye /></Button>
                      }
                      {record[field.id]?.preview &&
                        <Image
                          src={previewImage(record[field.id]?.value)}
                          height={400}
                          width={400}
                          alt="preview"
                          className="absolute w-full left-[48%] -translate-x-1/2"
                          onClick={() => setRecord((prev: any) => {
                            const newRecord = { ...prev }
                            newRecord[field.id].preview = false
                            return newRecord
                          })}
                        />
                      }
                      <Button className="bg-rosePine-foam text-black hover:bg-rosePineDawn-foam" asChild>
                        <Label htmlFor={String(`update-${field.id}`)} className="cursor-pointer">Update Image</Label>
                      </Button>
                      <Input
                        type="file"
                        id={String(`update-${field.id}`)}
                        className='hidden'
                        accept="image/*"
                        onChange={(e) => {
                          const input = e.target.files?.[0]
                          setRecord({ ...record, [field.id]: { value: input, preview: false } })
                        }}
                      />
                    </div>
                  </div>
                ) : <></>}
              </>
            ))}
          </div>
          <Button type="submit"
            disabled={pending}
            className="disabled:opacity-70 bg-rosePine-love text-black hover:bg-rosePineDawn-love"
            onClick={handleSubmit}
          >
            Update Entry
            {pending && <LoaderCircle className="inline animate-spin ml-1" />}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
