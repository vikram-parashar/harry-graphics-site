'use client'
import { Highlighter } from '@/components/magicui/highlighter'
import { Tables } from '@/lib/database.types'
import { ColumnType } from '@/lib/types'
import { useEffect, useState } from 'react'
import DeleteRecord from './DeleteRecord'
export default function ViewRecords({
  records,
  columns,
}: {
  records: Tables<'sheet_rows'>[]
  columns: ColumnType[]
}) {
  const [filteredRecords, setFilteredRecords] = useState(records)
  // const [visibleColumns, setVisibleColumns] = useState<string[]>([])
  // useEffect(() => {
  //   const stored = localStorage.getItem('visibleColumns')
  //   if (stored) {
  //     setVisibleColumns(JSON.parse(stored))
  //   } else {
  //     if (records.length === 0) return
  //     if (records[0].data.length === 0) return
  //     setVisibleColumns([records[0].data[0].id])
  //     localStorage.setItem('visibleColumns', JSON.stringify(visibleColumns))
  //   }
  // }, [])
  return (
    <>
      <h1 className="text-5xl my-5 p-2">
        <Highlighter>My Records</Highlighter>
      </h1>
      <ul className="p-5 flex gap-5 flex-wrap justify-between">
        {filteredRecords.map((record) => (
          <li
            key={record.id}
            className="p-4 lg:min-w-[30%] bg-secondary-background text-background rounded-lg"
          >
            <div className="flex justify-between gap-2">
              {/*
              <div>
                {Object.entries(record.data).map(([key, value]) => {
                  const column = columns.find((col) => col.id === key)
                  return (
                    <div key={key} className="mb-2">
                      <span className="font-bold">
                        {column ? column.name : key}:
                      </span>{' '}
                      {value}
                    </div>
                  )
                })}
              </div>
              <div>
                <DeleteRecord
                  recordId={record.id}
                  filteredRecordsAction={setFilteredRecords}
                />
              </div>
              */}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
