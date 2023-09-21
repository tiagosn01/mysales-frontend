'use client'
import { Button } from '@/components/Button'
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
    <div className="max-w-screen flex min-h-screen items-center justify-center px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
      <form
        onSubmit={onSubmit}
        id="login"
        className=" border- flex w-2/4 flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
      >
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <Button>Submit</Button>
      </form>
    </div>
  )
}
