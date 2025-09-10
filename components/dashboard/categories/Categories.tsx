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
import { Eye, EyeOff, Loader, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  deleteCategory,
  toggleCategoryVisibility,
} from '@/lib/actions/categories'
import { Tables } from '@/lib/database.types'

export default function Categories({
  categories,
}: {
  categories: Tables<'categories'>[]
}) {
  const [Categories, setCategories] = useState(categories)

  return (
    <div className="py-10">
      <div className="my-5">
        <CreateCategory />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {Categories.map((item) => (
          <CategoryItem
            key={item.id}
            item={item}
            setCategories={setCategories}
          />
        ))}
      </div>
    </div>
  )
}
const CategoryItem = ({
  item,
  setCategories,
}: {
  item: Tables<'categories'>
  setCategories: React.Dispatch<React.SetStateAction<Tables<'categories'>[]>>
}) => {
  const [visibilityBtnDisabled, setVisibilityBtnDisabled] = useState(false)

  const deleteItem = async () => {
    toast('deleting...')
    const res = await deleteCategory(item.id, item.thumbnail_image)
    if (res.success) {
      setCategories((prev) => prev.filter((i) => i.id !== item.id))
      toast('done :>')
    } else toast("Can't delete :/")
  }

  const handleToggleVisibility = async () => {
    setVisibilityBtnDisabled(true)
    const res = await toggleCategoryVisibility(item.id, !item.is_visible)
    if (res.success) {
      toast('done :>')
      item.is_visible = !item.is_visible
    } else toast("Can't update :/")
    setVisibilityBtnDisabled(false)
  }

  return (
    <div
      key={item.id}
      className="bg-secondary-background p-5 rounded-lg flex justify-between items-center gap-5"
    >
      <UpdateCategory item={item} />
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
