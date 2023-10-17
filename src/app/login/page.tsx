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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    signIn({ email, password })
  }

  const { email, password } = formData

  return (
    <div className="max-w-screen flex min-h-screen items-center justify-center bg-slate-200 px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
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
          />
        </Input.Root>
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  )
}
