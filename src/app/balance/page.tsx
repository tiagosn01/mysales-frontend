'use client'
import { useState } from 'react'
import { SettingsTabs } from '@/components/Tabs/SettingTabs'
import * as Tabs from '@radix-ui/react-tabs'

export default function Balance() {
  const titles = ['Mensal', 'Anual']
  const [currentTab, setCurrentTab] = useState(titles[0])
  const [clearForm, setClearForm] = useState(false)
  return (
    <div>
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Balanço
      </h1>

      <SettingsTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        titles={titles}
      >
        <Tabs.TabsContent className="flex w-full" value={titles[0]}>
          Mensal
        </Tabs.TabsContent>
        <Tabs.TabsContent className="flex w-full" value={titles[1]}>
          Anual
        </Tabs.TabsContent>
      </SettingsTabs>
    </div>
  )
}
