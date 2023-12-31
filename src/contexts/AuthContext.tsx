'use client'
import { checkIsPublicRoute } from '@/utils/functions/check-route-is-public'
import { redirect, usePathname } from 'next/navigation'
import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
} from 'react'

import api from '@/services/api'
import { MySwal } from '@/utils/sweetAlert'

interface AuthProviderProps {
  children: ReactNode
}

interface UserData {
  name: string
  email: string
  avatar: string
}

interface AuthData {
  token: string
  user: UserData
}

interface SignInCredencials {
  email: string
  password: string
}

interface AuthContextState {
  user: UserData
  token: string
  signIn(credentials: SignInCredencials): void
  signOut(): void
  loading: boolean
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState)

export function AuthProvider({ children }: AuthProviderProps) {
  const storage = typeof window !== 'undefined' ? window.localStorage : null
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AuthData>(() => {
    const token = storage?.getItem('@MjTele:token')
    const user = storage?.getItem('@MjTele:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthData
  })

  const signIn = useCallback(
    async ({ email, password }: SignInCredencials) => {
      try {
        setLoading(true)
        const response = await api.post('auth/login', {
          email,
          password,
        })
        const { token, avatar, name } = response.data

        const user = { name, email: response.data.email, avatar }

        storage?.setItem('@MjTele:token', token)
        storage?.setItem('@MjTele:user', JSON.stringify(user))

        setData({ token, user })
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Login ou senha incorretos!',
          // footer: '<a href="">Why do I have this issue?</a>',
        })
      }
    },
    [storage],
  )
  const signOut = useCallback(() => {
    storage?.removeItem('@MjTele:token')
    storage?.removeItem('@MjTele:user')

    setData({} as AuthData)
  }, [storage])

  const userContext = useMemo(
    () => ({
      user: data.user,
      token: data.token,
      signIn,
      signOut,
      loading,
    }),
    [data, signIn, signOut, loading],
  )

  const pathName = usePathname()
  const isPublic = checkIsPublicRoute(pathName)

  useEffect(() => {
    if (data.token && isPublic) {
      redirect('/')
    } else if (!data.token && !isPublic) {
      redirect('/landing')
    }
  }, [data.token, isPublic])

  return (
    <AuthContext.Provider value={userContext}>
      {!isPublic && !data.token ? (
        <html lang="en">
          <body></body>
        </html>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
