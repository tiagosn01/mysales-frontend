'use client'
import api from '@/services/api'
import * as Tabs from '@radix-ui/react-tabs'
import { useQuery } from 'react-query'

type HomeTabsProps = {
  value: string
}

export default function SaleTabContent({ value }: HomeTabsProps) {
  const { data, isLoading } = useQuery('sales', () => {
    return api.get('/sales/count').then((response) => response.data)
  })
  return (
    <Tabs.TabsContent className="flex w-full" value={value}>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <p>Total de vendas cadastradas: {data}</p>
      )}
    </Tabs.TabsContent>
  )
}
