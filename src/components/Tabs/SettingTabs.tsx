'use client'

import { ReactNode } from 'react'
import { TabItem } from './TabItem'
import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'

type SettingsTabsProps = {
  currentTab: string
  setCurrentTab: (e: string) => void
  children: ReactNode
  titles: string[]
}

export function SettingsTabs({
  currentTab,
  setCurrentTab,
  children,
  titles,
}: SettingsTabsProps) {
  return (
    <Tabs.Root value={currentTab} onValueChange={setCurrentTab}>
      <ScrollArea.Root className="w-full" type="hover">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200 dark:border-zinc-800">
            {titles.map((title, index) => (
              <TabItem
                key={index}
                isSelected={currentTab === titles[index]}
                value={titles[index]}
                title={title}
              />
            ))}
          </Tabs.List>
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex h-2.5 touch-none select-none flex-col bg-zinc-100 p-0.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Tabs.Root>
  )
}
