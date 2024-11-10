'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateStatus } from "@/lib/actions/orders"


export default function UpdateOrderStatus({ orderId, oldStatus }: { orderId: string, oldStatus: string }) {
  const options = [
    'Unconfirmed',
    'Confirmed',
    'Cancelled By Seller',
    'Payment Failed',
    'Out of Stock',
    'Dispatched'
  ]
  return (
    <div className="flex justify-end">
      <Select onValueChange={(val) => {
        updateStatus(orderId, val)
      }}>
        <SelectTrigger className="w-[180px] bg-rosePineDawn-overlay">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent defaultValue={oldStatus} className="bg-rosePineDawn-overlay">
          {options.map((item, index) =>
            <SelectItem key={index} value={item}>{item}</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
