'use client'

import {
  HTMLAttributes,
  createContext,
  useContext,
  useId,
  useState,
  useEffect,
} from 'react'
import { twMerge } from 'tailwind-merge'

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean
  clearInput?: boolean
}

interface FileInputContextType {
  id: string
  files: File[]
  multiple: boolean
  onFilesSelected: (files: File[]) => void
}

const FileInputContext = createContext({} as FileInputContextType)

export function Root({
  multiple = false,
  id,
  clearInput = false,
  ...props
}: RootProps) {
  const customId = useId()
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    setFiles([])
  }, [clearInput])

  return (
    <FileInputContext.Provider
      value={{ id: id ?? customId, files, multiple, onFilesSelected: setFiles }}
    >
      <div {...props} className={twMerge('group w-full', props.className)} />
    </FileInputContext.Provider>
  )
}

export const useFileInput = () => useContext(FileInputContext)
