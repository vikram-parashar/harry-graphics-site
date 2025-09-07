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

import CreateCategory from '@/components/dashboard/categories/CreateCategory'
import UpdateCategory from '@/components/dashboard/categories/UpdateCategory'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { deleteCategory } from '@/lib/actions/categories'
import { Tables } from '@/lib/database.types'

export default function Categories({
  categories,
}: {
  categories: Tables<'categories'>[]
}) {
  const [Categories, setCategories] = useState(categories)

  const deleteItem = async (item: Tables<'categories'>) => {
    toast('deleting...')
    const res = await deleteCategory(item.id, item.thumbnail_image)
    if (res.success) {
      const newItems = Categories.filter((i) => i.id !== item.id)
      setCategories(newItems)
      console.log(newItems)
      toast('done :>')
    } else toast("Can't delete :/")
  }

  return (
    <div className="py-10">
      <div className="my-5">
        <CreateCategory />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {Categories.map((item) => (
          <div
            key={item.id}
            className="bg-secondary-background p-5 rounded-lg flex justify-between items-center gap-5"
          >
            <UpdateCategory item={item} />
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
                    This action cannot be undone. This will permanently delete
                    the item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={() => deleteItem(item)}>Continue</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  )
}
