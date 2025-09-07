'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Tables } from '@/lib/database.types'
import CreateSheet from './CreateSheet'

export default function Navbar({ sheets }: { sheets: Tables<'sheets'>[] }) {
  const pathname = usePathname()
  const sheetId = pathname.split('/')[2]
  const [open, setOpen] = useState(false)
  const [Sheets, setSheets] = useState(sheets)

  return (
    <div className="lg:h-screen bg-secondary-background p-5 border-b-3 flex flex-col justify-between ">
      <div>
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="w-[187px] lg:w-[350px] h-[60px] lg:h-[112px] bg-background rounded-xl relative block"
          >
            <Image src="/logo/nobg.png" alt="logo" fill />
          </Link>
          <button
            className="relative w-16 h-16 lg:hidden bg-background rounded-full border-3"
            onClick={() => setOpen((curr) => !curr)}
          >
            {open ? (
              <Image
                alt="menu"
                src="/shut-down.png"
                className="scale-[0.6]"
                fill
              />
            ) : (
              <Image
                src="/hamburger.png"
                alt="menu"
                className="scale-[0.6]"
                fill
              />
            )}
          </button>
        </div>
        <div
          className={cn(
            open ? 'flex' : 'hidden',
            'lg:flex mt-5 flex-col gap-5'
          )}
        >
          <CreateSheet sheets={Sheets} sheetsAction={setSheets} />
          {Sheets.map((sheet) => (
            <div key={sheet.id}>
              {sheet.id === sheetId ? (
                <p className="bg-overlay p-2 rounded-md text-center border-2 text-sm text-background">
                  {sheet.name}
                </p>
              ) : (
                <Button asChild variant="reverse" className="w-full">
                  <Link href={`/sheets/${sheet.id}`}>{sheet.name}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={cn(open ? 'block' : 'hidden', 'lg:block w-full mt-5')}>
        <Button asChild className="w-full">
          <Link href="/contact" className="">
            Contact Us
          </Link>
        </Button>
      </div>
    </div>
  )
}
