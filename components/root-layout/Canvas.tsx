'use client'

import { DotPattern } from '@/components/magicui/dot-pattern'
import { cn } from '@/lib/utils'

export default function Canvas() {
  return (
    <div className="absolute -z-10 w-screen h-screen top-0 left-0">
      <div className="absolute h-[500px] w-screen overflow-hidden opacity-75">
        <DotPattern
          width={20}
          height={20}
          className={cn(
            '[mask-image:linear-gradient(to_bottom,white,transparent)] '
          )}
        />
      </div>
      <div className="w-full h-[300px] bg-overlay"></div>
    </div>
  )
}
