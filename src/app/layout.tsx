'use client'
import './globals.css'

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '@/utils/functions/check-route-is-public'
import { AppProvider } from '@/contexts'
import { useAuth } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  const pathName = usePathname()
  const isPublic = checkIsPublicRoute(pathName)
  console.log(isPublic)

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {!isPublic && !token && null}
          {isPublic && !token && (
            <div className="min-h-screen dark:bg-zinc-900">{children}</div>
          )}
          {isPublic && token && (
            <div className="relative min-h-screen dark:bg-zinc-900 lg:grid lg:grid-cols-app">
              <Sidebar />

              <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
                {children}
              </main>
            </div>
          )}
        </AppProvider>
      </body>
    </html>
  )
}
