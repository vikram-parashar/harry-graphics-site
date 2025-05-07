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
import { Database } from "@/lib/types"
type CustomerType = Database['public']['Tables']['customers']['Row']
import { LoaderCircle, Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from "sonner"
import { removeImages, removeRow, update } from "@/lib/actions/crud";

const ItemType = 'ITEM';

export default function EditCustomers({ customers }: { customers: CustomerType[] }) {
  const [Customers, setCustomers] = useState(customers)
  const [reordering, setReordering] = useState(false)

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
          disabled={reordering}
          onClick={async () => {
            setReordering(true)
            Customers.reverse().forEach(async (item, index) => {
              const res = await update(item.id, {
                updated_at: new Date(new Date().getTime() + index * 1000).toISOString(),
              }, "customers", null, null)
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
      <div className="flex justify-between relative items-center ">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="absolute top-3 left-3" size="icon">
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
                toast('deleting item...');
                const res = await removeRow(item.id, 'customers', '/dashboard/customers')
                if(item.image) await removeImages([item.image])
                if (!res.success) toast(res.msg)
                else toast('done :>');
              }}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Image
        src={item.image || '/notFoundL.png'}
        width={200}
        height={100}
        alt={'custumer'}
        className="object-cover h-28 item w-full"
      />
    </div>
  );
};
