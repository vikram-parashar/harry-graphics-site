'use client'
import { Copy, Check } from 'lucide-react'
import { Highlighter } from '@/components/magicui/highlighter'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import CreateColumn from './CreateColumn'
import { useState } from 'react'
import { ColumnType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Tables } from '@/lib/database.types'

export default function Columns({
  columns,
  sheet,
}: {
  columns: ColumnType[]
  sheet: Tables<'sheets'>
}) {
  const [Columns, setColumns] = useState(columns || [])
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-5xl my-5 p-2">
          <Highlighter>{sheet.name}</Highlighter>
        </h1>
        <div>
          <CopyButton
            copyText={`${process.env.NEXT_PUBLIC_APP_URL}/s/${sheet.id}`}
            btnText="Copy Insert Link"
          />
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-base border-2 border-border text-main-foreground shadow-shadow min-h-[80vh]"
        style={{ height: 'auto' }}
      >
        <ResizablePanel
          className="p-5 flex flex-col gap-3"
          defaultSize={30}
          minSize={20}
        >
          {Columns.map((column) => (
            <div key={column.id}>
              {column.id === selectedColumn ? (
                <p className="bg-overlay w-full p-2 rounded-md text-center border-2 text-sm">
                  {column.name}
                </p>
              ) : (
                <Button
                  className="w-full  border-none"
                  variant="reverse"
                  onClick={() => setSelectedColumn(column.id as string)}
                >
                  {column.name}
                </Button>
              )}
            </div>
          ))}
          <CreateColumn
            columns={Columns}
            columnsAction={setColumns}
            sheetId={sheet.id}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div></div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
export function CopyButton({
  copyText,
  btnText,
}: {
  copyText: string
  btnText: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // reset after 2s
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <Button size="sm" onClick={handleCopy} className="flex items-center gap-2">
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {btnText}
        </>
      )}
    </Button>
  )
}
