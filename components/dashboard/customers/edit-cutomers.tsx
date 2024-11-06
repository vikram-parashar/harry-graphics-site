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

import NewCustomer from "@/components/forms/new-customer";
import { Button } from "@/components/ui/button";
import { deleteCustomer, updateOrder } from "@/lib/actions/customers";
import { CustomerType } from "@/lib/types";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from "sonner"

const ItemType = 'ITEM';

export default function EditCustomers({ customers }: { customers: CustomerType[] }) {
  const [Customers, setCustomers] = useState(customers)

  useEffect(() => {
    setCustomers(customers)
  }, [customers])

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...Customers];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setCustomers(newItems);
  };

  return (
    <div className="py-10">
      <div className="flex my-5 gap-5">
        <NewCustomer />
        <Button
          onClick={async () => {
            toast("Reordering...")
            const res = await updateOrder(Customers)
            if (res.success) toast("Reorder success :>")
            else toast("Reorder failed :<")
          }}
        >
          Reorder
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-5" >
        <DndProvider backend={HTML5Backend}>
          {Customers.map((item, index) =>
            <DraggableItem key={item.id} index={index} item={item} moveItem={moveItem} />
          )}
        </DndProvider>
      </div >
    </div>
  )
}

const DraggableItem = ({ item, index, moveItem }:
  { item: CustomerType, index: number, moveItem: any }) => {
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
        <Link
          href={item.web_link}
          className="underline block break-words w-32 text-wrap"
        >
          {item.web_link}
        </Link>
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
                const res = await deleteCustomer(item.id, item.image)
                if (res.success) toast("deleted :>")
                else toast("Can't delete :<")
              }}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Image
        src={item.image_full}
        width={200}
        height={100}
        alt={item.web_link}
        className="object-cover h-28 item w-full"
      />
    </div>
  );
};
