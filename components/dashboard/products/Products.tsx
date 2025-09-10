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

import CreateProduct from '@/components/dashboard/products/CreateProduct'
import UpdateProduct from '@/components/dashboard/products/UpdateProduct'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Loader, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { deleteProduct, toggleProductVisibility } from '@/lib/actions/products'
import { Tables } from '@/lib/database.types'

export default function Products({
  products,
  category_id,
}: {
  products: Tables<'products'>[]
  category_id: string
}) {
  const [Products, setProducts] = useState(products)

  return (
    <div>
      <div className="my-5">
        <CreateProduct category_id={category_id} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {Products.map((item) => (
          <ProductItem key={item.id} item={item} setProducts={setProducts} />
        ))}
      </div>
    </div>
  )
}
const ProductItem = ({
  item,
  setProducts,
}: {
  item: Tables<'products'>
  setProducts: React.Dispatch<React.SetStateAction<Tables<'products'>[]>>
}) => {
  const [visibilityBtnDisabled, setVisibilityBtnDisabled] = useState(false)

  const deleteItem = async () => {
    toast('deleting...')
    const res = await deleteProduct(item.id, item.image)
    if (res.success) {
      setProducts((prev) => prev.filter((i) => i.id !== item.id))
      toast('done :>')
    } else toast("Can't delete :/")
  }
  const handleToggleVisibility = async () => {
    setVisibilityBtnDisabled(true)
    const res = await toggleProductVisibility(item.id, !item.is_visible)
    if (res.success) {
      setProducts((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_visible: !i.is_visible } : i
        )
      )
      toast('done :>')
    } else toast("Can't update :/")
    setVisibilityBtnDisabled(false)
  }

  return (
    <div
      key={item.id}
      className="bg-secondary-background p-5 rounded-lg flex justify-between items-center gap-5"
    >
      <UpdateProduct item={item} />
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
