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
import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import { LoaderCircle, Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from "sonner"
import NewProduct from "@/components/forms/new-product";
import EditProduct from "@/components/forms/edit-product"
import { removeImages, removeRow, update } from "@/lib/actions/crud";

const ItemType = 'ITEM';

export default function EditProducts({ products, categoryId }: { products: ProductType[], categoryId: string }) {
  const [Products, setProducts] = useState(products)
  const [reordering, setReordering] = useState(false)

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...Products];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setProducts(newItems);
  };

  return (
    <div className="">
      <div className="flex my-5 gap-5">
        <NewProduct categoryId={categoryId} />
        <Button
          disabled={reordering}
          onClick={async () => {
            setReordering(true)
            Products.reverse().forEach(async (item, index) => {
              const res = await update(item.id, {
                updated_at: new Date(new Date().getTime() + index * 1000).toISOString(),
              }, "products", null, null)
              if (!res.success) {
                toast("Reorder failed :<")
                setReordering(false)
                return;
              }
            })
            toast("Reordered :>")
            setReordering(false)
          }}
        >
          Reorder
          {reordering && <LoaderCircle className="inline animate-spin ml-1" />}
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-5" >
        <DndProvider backend={HTML5Backend}>
          {Products.map((item, index) =>
            <DraggableItem key={item.id} index={index} item={item} moveItem={moveItem} categoryId={categoryId} />
          )}
        </DndProvider>
      </div >
    </div>
  )
}

const DraggableItem = ({ item, index, moveItem, categoryId }:
  {
    item: ProductType,
    index: number,
    moveItem: any,
    categoryId: string
  }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index; // Update index for dragging
      }
    },
  });

  return (
    <div
      ref={(node: HTMLDivElement | null) => {
        if (node) {
          ref(drop(node)); // Ensure node is not null before calling
        }
      }}
      className="bg-rosePineDawn-surface p-5 rounded-lg"
    >
      <div className="flex justify-between items-center gap-5 my-4">
        <span className="block break-words w-32 text-wrap" >
          {item.name}
        </span>
        <div className="">
          <EditProduct item={item} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={async () => {
                  const res = await removeRow(item.id, 'products', '/dashboard/products/[catId]')
                  await removeImages([item.image])
                  if (!res.success) toast(res.msg)
                }}>Continue</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Image
        src={item.image_full}
        width={200}
        height={100}
        alt={item.name}
        className="object-cover h-52 item w-full"
      />
    </div>
  );
};
