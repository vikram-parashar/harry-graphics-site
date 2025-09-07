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
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { deleteProduct } from '@/lib/actions/products'
import { Tables } from '@/lib/database.types'

export default function Products({
  products,
  category_id,
}: {
  products: Tables<'products'>[]
  category_id: string
}) {
  const [Products, setProducts] = useState(products)

  const deleteItem = async (item: Tables<'products'>) => {
    toast('deleting...')
    const res = await deleteProduct(item.id, item.image)
    if (res.success) {
      const newItems = Products.filter((i) => i.id !== item.id)
      setProducts(newItems)
      toast('done :>')
    } else toast("Can't delete :/")
  }

  return (
    <div>
      <div className="my-5">
        <CreateProduct category_id={category_id} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {Products.map((item) => (
          <div
            key={item.id}
            className="bg-secondary-background p-5 rounded-lg flex justify-between items-center gap-5"
          >
            <UpdateProduct item={item} />
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
