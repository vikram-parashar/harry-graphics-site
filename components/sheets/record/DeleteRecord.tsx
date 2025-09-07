import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteRecord } from '@/lib/actions/records'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export default function DeleteRecord({
  recordId,
  filteredRecordsAction,
}: {
  recordId: string
  filteredRecordsAction: React.Dispatch<React.SetStateAction<any[]>>
}) {
  const deleteItem = async () => {
    const res = await deleteRecord(recordId)
    if (res.success) {
      filteredRecordsAction((prev) => prev.filter((i) => i.id !== recordId))
      toast.success(res.msg)
    } else toast.error(res.msg)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this record?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={() => deleteItem()}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
