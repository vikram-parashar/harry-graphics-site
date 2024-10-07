import { useFormStatus } from "react-dom"
import { LoaderCircle } from "lucide-react"

export default function SubmitBtn({ text }: { text: string}) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}
      className="rounded-md bg-rosePine-gold px-16 py-3 font-bold text-rosePine-base cursor-pointer mt-5 disabled:opacity-70"
    >
      {text}
      {pending && <LoaderCircle className="inline animate-spin ml-1" />}
    </button>
  )
}
