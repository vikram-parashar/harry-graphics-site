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
} from "@/components/ui/alert-dialog"

import CreateCarousel from "@/components/dashboard/carousels/CreateCarousel";
import UpdateCarousel from "@/components/dashboard/carousels/UpdateCarousel";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { toast } from "sonner"
import { deleteCarousel } from "@/lib/actions/carousels";
import { Tables } from "@/lib/database.types";

export default function Carousels({ carousels }: {
  carousels: Tables<'carousels'>[]
}) {
  const [Carousels, setCarousels] = useState(carousels)

  const deleteItem = async (item: Tables<'carousels'>) => {
    toast('deleting...')
    const res = await deleteCarousel(item.id, item.image)
    if (res.success) {
      const newItems = Carousels.filter(i => i.id !== item.id)
      setCarousels(newItems)
      toast('done :>');
    }
    else toast("Can't delete :/")
  }


  return (
    <div className="py-10">
      <div className="my-5">
        <CreateCarousel />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5" >
        {Carousels.map(item =>
          <div
            key={item.id}
            className="bg-secondary-background p-5 rounded-lg flex justify-between items-center gap-5">
            <UpdateCarousel item={item} />
            {/* Delete Btn with AlertDialog */}
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
                    This action cannot be undone. This will permanently delete the item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={() => deleteItem(item)}>Continue</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div >
    </div>
  )
}
