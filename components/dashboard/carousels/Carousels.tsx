'use client'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import CreateCarousel from '@/components/dashboard/carousels/CreateCarousel'
import UpdateCarousel from '@/components/dashboard/carousels/UpdateCarousel'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Loader, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  deleteCarousel,
  toggleCarouselVisibility,
} from '@/lib/actions/carousels'
import { Tables } from '@/lib/database.types'

export default function Carousels({
  carousels,
}: {
  carousels: Tables<'carousels'>[]
}) {
  const [Carousels, setCarousels] = useState(carousels)

  const deleteItem = async (item: Tables<'carousels'>) => {
    toast('deleting...')
    const res = await deleteCarousel(item.id, item.image)
    if (res.success) {
      const newItems = Carousels.filter((i) => i.id !== item.id)
      setCarousels(newItems)
      toast('done :>')
    } else toast("Can't delete :/")
  }

  return (
    <div className="py-10">
      <div className="my-5">
        <CreateCarousel />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {Carousels.map((item) => (
          <CarouselItem key={item.id} item={item} setCarousels={setCarousels} />
        ))}
      </div>
    </div>
  )
}
const CarouselItem = ({
  item,
  setCarousels,
}: {
  item: Tables<'carousels'>
  setCarousels: React.Dispatch<React.SetStateAction<Tables<'carousels'>[]>>
}) => {
  const [visibilityBtnDisabled, setVisibilityBtnDisabled] = useState(false)
  const deleteItem = async () => {
    toast('deleting...')
    const res = await deleteCarousel(item.id, item.image)
    if (res.success) {
      setCarousels((prev) => prev.filter((i) => i.id !== item.id))
      toast('done :>')
    } else toast("Can't delete :/")
  }
  const handleToggleVisibility = async () => {
    setVisibilityBtnDisabled(true)
    const res = await toggleCarouselVisibility(item.id, !item.is_visible)
    if (res.success) {
      toast('done :>')
      setCarousels((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_visible: !i.is_visible } : i
        )
      )
    } else toast("Can't update :/")
    setVisibilityBtnDisabled(false)
  }

  return (
    <div
      key={item.id}
      className="bg-secondary-background p-5 rounded-lg flex justify-between items-center gap-5"
    >
      <UpdateCarousel item={item} />
      {/* Delete Btn with AlertDialog */}
      <div className="space-x-1">
        <Button
          size="icon"
          disabled={visibilityBtnDisabled}
          onClick={handleToggleVisibility}
        >
          {visibilityBtnDisabled ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : item.is_visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={() => deleteItem()}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
