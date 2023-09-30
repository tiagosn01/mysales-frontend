/* eslint-disable @typescript-eslint/no-empty-interface */
'use client'

import { UploadCloud } from 'lucide-react'
import { useFileInput } from './Root'

export interface TriggerProps {}

export function Trigger(props: TriggerProps) {
  const { id } = useFileInput()

  return (
    <label
      htmlFor={id}
      className="group flex w-full flex-1 cursor-pointer flex-col items-center gap-3 rounded-lg border border-zinc-200 px-6 py-4 text-center text-zinc-500 group-focus-within:border-orange-300 group-focus-within:ring-4 group-focus-within:ring-orange-100 hover:border-orange-200 hover:bg-orange-25 hover:text-orange-500 dark:border-zinc-800 dark:text-zinc-400 dark:group-focus-within:border-orange-500 dark:group-focus-within:ring-orange-500/10 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-orange-300"
    >
      <span className="relative rounded-full border-6 border-zinc-50 bg-zinc-100 p-2 group-hover:border-orange-50 group-hover:bg-orange-100 dark:border-zinc-700 dark:bg-zinc-800 dark:group-hover:border-zinc-600 dark:group-hover:bg-zinc-700">
        <UploadCloud className="h-5 w-5 text-zinc-600 group-hover:text-orange-600 dark:text-zinc-500 dark:group-hover:text-orange-300" />
      </span>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm">
          <span className="font-semibold text-orange-700 dark:text-orange-300">
            Clique para importar
          </span>{' '}
          ou arraste e solte
        </span>

        <span className="text-xs">XLXS, XLS, CSV (max. 5mb)</span>
      </div>
    </label>
  )
}
