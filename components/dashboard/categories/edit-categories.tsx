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
import { CategoryType } from "@/lib/types";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from "sonner"
import NewCategory from "@/components/forms/new-category";
import { deleteCategory, updateOrder } from "@/lib/actions/categories";
import EditCategory from "@/components/forms/edit-category";

const ItemType = 'ITEM';

export default function EditCategories({ categories }: { categories: CategoryType[] }) {
  const [Categories, setCategories] = useState(categories)

  useEffect(() => {
    setCategories(categories)
  }, [categories])


  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...Categories];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setCategories(newItems);
  };

  return (
    <div className="py-10">
      <div className="flex my-5 gap-5">
        <NewCategory />
        <Button
          onClick={async () => {
            toast("Reordering...")
            const res = await updateOrder(Categories)
            if (res.success) toast("Reorder success :>")
            else toast("Reorder failed :<")
          }}
        >
          Reorder
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-5" >
        <DndProvider backend={HTML5Backend}>
          {Categories.map((item, index) =>
            <DraggableItem key={item.id} index={index} item={item} moveItem={moveItem} />
          )}
        </DndProvider>
      </div >
    </div>
  )
}

const DraggableItem = ({ item, index, moveItem }:
  { item: CategoryType, index: number, moveItem: any }) => {
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
        <div>
          <EditCategory item={item} />
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
                  toast("deleting...")
                  const res = await deleteCategory(item.id, item.header_image, item.header_image_mobile, item.thumbnail_image)
                  if (res.success) toast("deleted :>")
                  else toast("Can't delete :<")
                }}>Continue</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Image
        src={item.thumbnail_image_full}
        width={200}
        height={100}
        alt={item.name}
        className="object-cover h-52 item w-full"
      />
    </div>
  );
};
