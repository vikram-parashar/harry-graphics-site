"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  ExternalLink,
  Phone,
  MapPin,
  CalendarClock,
} from "lucide-react";
import { RelationTypes } from "@/lib/types";
import Image from "next/image";
import { Highlighter } from "@/components/magicui/highlighter";
import Link from "next/link";

/**
 * Replace these with your actual app types if they already exist.
 */
export type CartItemType = {
  id: string;
  title: string;
  quantity: number;
  price: number; // in minor units or major — adjust currency formatter accordingly
  image?: string;
  variant?: string;
};

export type UserLite = {
  id: string;
  name?: string | null;
  email?: string | null;
};

export type Orders = {
  id: string;
  created_at: string;
  updated_at: string;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | string;
  cart: CartItemType[];
  note: string;
  order_number: string;
  user: UserLite; // RelationTypes['User']
  address_line_1: string;
  address_line_2?: string;
  city: string;
  pincode: string;
  phone: string;
  tracking_link?: string;
  payment: string; // e.g., "COD", "UPI", "Card"
};

function money(value: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    ...opts,
  }).format(value);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

function StatusBadge({ status }: { status: Orders["status"]; }) {
  const normalized = String(status).toLowerCase();
  const map: Record<string, { label: string; icon: React.ElementType; variant?: "default" | "secondary" | "destructive" | "outline" }> = {
    pending: { label: "Pending", icon: Clock, variant: "secondary" },
    paid: { label: "Paid", icon: CheckCircle2 },
    processing: { label: "Processing", icon: PackageCheck },
    shipped: { label: "Shipped", icon: Truck },
    delivered: { label: "Delivered", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", icon: XCircle, variant: "destructive" },
  };

  const cfg = map[normalized] || { label: status, icon: Clock, variant: "outline" as const };
  const Icon = cfg.icon;
  return (
    <Badge>
      <Icon className="h-3.5 w-3.5" />
      {cfg.label}
    </Badge>
  );
}

export default function OrdersList({ orders }: {
  orders: RelationTypes['Orders'][]
}) {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <h1 className="text-5xl my-5 p-2"><Highlighter color="#EEBA58">Your Orders</Highlighter></h1>
      {orders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  )
}

function OrderCard({ order }: {
  order: RelationTypes['Orders'];
}) {
  return (
    <Card className="bg-secondary-background border-3">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <CardDescription>
          <p className="flex items-center text-xs gap-1 mb-5"><CalendarClock className="h-3.5 w-3.5" /> {formatDate(order.created_at)}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 md:grid-cols-3">
        {/* Items */}
        <div className="md:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Items ({order.cart.length})</h4>
            <div className="text-sm text-muted-foreground">Total: <span className="font-semibold text-foreground">{order.total_amount}</span></div>
          </div>
          <Separator className="mb-3" />
          <ul className="space-y-3">
            {order.cart.map((item, index) => (
              <li key={index} className="bg-background rounded-xl border-2 p-2">
                <div className="flex justify-between relative min-h-16">
                  <div className="w-full">
                    <p className="font-medium wrap-break-word max-w-[70%]">
                      {item.product.name}
                    </p>
                    {Object.keys(item.options).map((key, index) => (
                      <p key={index} className="text-muted-foreground text-sm">
                        {key}: {item.options[key]}
                      </p>
                    ))}
                  </div>
                  <div className="absolute right-2">
                    <div className="h-20 aspect-square relative right-0">
                      <Image src={item.product.image || '/dummy/notFoundP.jpg'} alt={item.product.name} fill className="rounded-lg" />
                    </div>
                  </div>
                </div>
                <div className="whitespace-nowrap">
                  {money(item.product.price)}x{item.quantity} = {money(item.product.price * item.quantity)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping & Customer */}
        <div className="space-y-4">
          <div className="rounded-2xl border-2 p-4 bg-background">
            <h5 className="mb-2 text-sm font-semibold tracking-tight">Shipping to</h5>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <p className="font-medium">{order.user?.name || "Customer"}</p>
                <p className="text-muted-foreground">{order.address_line_1}</p>
                {order.address_line_2 ? <p className="text-muted-foreground">{order.address_line_2}</p> : null}
                <p className="text-muted-foreground">{order.city} — {order.pincode}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> {order.phone}
            </div>
          </div>

          <div className="rounded-2xl border-2 p-4 bg-background">
            <h5 className="mb-2 text-sm font-semibold tracking-tight">Notes</h5>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{order.note || "—"}</p>
          </div>

        </div>
      </CardContent>

      <CardFooter className="flex gap-5">
        {order.payment ?
          <Button asChild>
            <Link href={order.payment} target="_blank" rel="noreferrer">
              View Payment
            </Link>
          </Button> :
          <Button variant="noShadow" className="relative top-1" asChild>
            <span> Payment Unavailable </span>
          </Button>
        }
        {order.tracking_link ? (
          <Button asChild>
            <a href={order.tracking_link} target="_blank" rel="noreferrer">
              Track Package <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button variant="noShadow" className="relative top-1" asChild>
            <span> Tracking Unavailable </span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
