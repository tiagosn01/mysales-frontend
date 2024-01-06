'use client'
import { Button } from '@/components/Button'
import * as Input from '@/components/Form/Input'
import { Logo } from '@/components/Sidebar/Logo'
import { useAuth } from '@/contexts/AuthContext'
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from 'react'

export default function Login() {
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const { email, password } = formData

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    signIn({ email, password })
  }

  return (
    <div className="max-w-screen flex-1 bg-gray-100 px-4 pb-12 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
      <div className="mt-24 flex items-center justify-center self-center">
        <form
          onSubmit={onSubmit}
          id="login"
          className="flex w-full max-w-md flex-col gap-5 divide-y divide-zinc-200 bg-slate-50 dark:divide-zinc-800 md:max-w-lg md:rounded md:border md:px-6 md:py-14 md:shadow-md"
        >
          <div className="mb-10 flex w-full items-center justify-center">
            <Logo />
          </div>
          <Input.Root>
            <Input.Control
              placeholder="Email"
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </Input.Root>

          <Input.Root>
            <Input.Control
              placeholder="Senha"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          </Input.Root>
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  )
}
