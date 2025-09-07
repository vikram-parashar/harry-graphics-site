import { Meteors } from '@/components/magicui/meteors'
import { ExternalLink } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        404
        <ExternalLink />
      </span>
      <span className="text-4xl">Page Not Found</span>
    </div>
  )
}
