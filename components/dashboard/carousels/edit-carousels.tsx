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

import NewCarousel from "@/components/forms/new-carousel";
import { Button } from "@/components/ui/button";
import { CarouselType, CategoryType } from "@/lib/types";
import { LoaderCircle, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from "sonner"
import {  removeImages, removeRow, update } from "@/lib/actions/crud";

const ItemType = 'ITEM';

export default function EditCarousels({ carousels, categories }: { categories: CategoryType[], carousels: CarouselType[] }) {
  const [Carousels, setCarousels] = useState(carousels)
  const [reordering, setReordering] = useState(false)

  useEffect(() => {
    setCarousels(carousels)
  }, [carousels])


  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...Carousels];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setCarousels(newItems);
  };

  return (
    <div className="py-10">
      <div className="flex my-5 gap-5">
        <NewCarousel categories={categories} />
        <Button
          disabled={reordering}
          onClick={async () => {
            setReordering(true)
            Carousels.reverse().forEach(async (item, index) => {
              const res = await update(item.id, {
                updated_at: new Date(new Date().getTime() + index * 1000).toISOString(),
              }, "carousels", null, null)
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
          {Carousels.map((item, index) =>
            <DraggableItem key={item.id} index={index} item={item} moveItem={moveItem} setItems={setCarousels} />
          )}
        </DndProvider>
      </div >
    </div>
  )
}

const DraggableItem = ({ item, index, moveItem, setItems }: {
  item: CarouselType,
  index: number,
  moveItem: any,
  setItems: React.Dispatch<React.SetStateAction<CarouselType[]>>
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
          Links to:{" "}
          <Link href={`/product/${item.category_id}`} target="_blank" className="underline">
            {item.categories?.name}
          </Link>
        </span>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-rosePineDawn-surface">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
              onClick={async () => {
                toast('deleting...')
                const res = await removeRow(item.id, 'carousels', null)
                await removeImages([item.image])
                if (res.success){
                  setItems((prev) => prev.filter((i) => i.id !== item.id))
                  toast('done :>');
                }
                else toast("Can't delete :/")
              }}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Image
        src={item.image||'/notFoundL.png'}
        width={200}
        height={100}
        alt="image"
        className="object-cover h-28 item w-full"
      />
    </div>
  );
};
