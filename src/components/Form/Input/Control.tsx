import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export type ControlProps = InputHTMLAttributes<HTMLInputElement>

type InputRegister = {
  register?: UseFormRegister<any>
} & ControlProps

export function Control({ register, name, ...props }: InputRegister) {
  if (register && name) {
    return (
      <input
        {...register(name)}
        {...props}
        className={twMerge(
          'flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-300 outline-none placeholder:text-sm focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400',
          props.className,
        )}
      />
    )
  }
  return (
    <input
      {...props}
      name={name}
      className={twMerge(
        'flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-300 outline-none placeholder:text-sm focus:ring-0 dark:text-zinc-100 dark:placeholder-zinc-400',
        props.className,
      )}
    />
  )
}
