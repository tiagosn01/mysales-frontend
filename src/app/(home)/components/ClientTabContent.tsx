'use client'
import api from '@/services/api'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from 'react-query'

type HomeTabsProps = {
  value: string
}

export default function ClientTabContent({ value }: HomeTabsProps) {
  const { data, isLoading } = useQuery('customers', () => {
    return api.get('/customers/count').then((response) => response.data)
  })
  return (
    <Tabs.TabsContent className="flex w-full" value={value}>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <p>Total de clientes cadastrados: {data}</p>
      )}
    </Tabs.TabsContent>
  )
}
