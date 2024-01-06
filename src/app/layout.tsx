'use client'
import './globals.css'

import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'
import { usePathname } from 'next/navigation'
import { checkIsPublicRoute } from '@/utils/functions/check-route-is-public'
import { AppProvider } from '@/contexts'
import { QueryClient, QueryClientProvider } from 'react-query'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname()
  const isPublic = checkIsPublicRoute(pathName)
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            {isPublic && (
              <div className="flex min-h-screen flex-col dark:bg-zinc-900">
                <nav className="bg-orange-700 p-5">
                  <div className="container mx-auto flex items-center justify-between">
                    <Link
                      href="/landing"
                      className="text-3xl font-bold text-white"
                    >
                      Logo
                    </Link>
                    <div className="flex space-x-4">
                      <Link href="/landing" className="text-white">
                        Home
                      </Link>
                      <Link href="/login" className="text-white">
                        Login
                      </Link>
                      <Link href="/signup" className="text-white">
                        Cadastro
                      </Link>
                    </div>
                  </div>
                </nav>

                {children}
              </div>
            )}
            {!isPublic && (
              <div className="relative min-h-screen dark:bg-zinc-900 lg:grid lg:grid-cols-app">
                <Sidebar />

                <main className="max-w-screen px-4 pb-12 pt-24 lg:col-start-2 lg:w-auto lg:px-8 lg:pt-8">
                  {children}
                </main>
              </div>
            )}
          </AppProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
