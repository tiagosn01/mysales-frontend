'use client'
import { Button } from '@/components/Button'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { SettingsTabs } from './SettingsTabs'
import * as FileInput from '@/components/Form/FileInput'
import * as Tabs from '@radix-ui/react-tabs'
import api from '@/services/api'
import { MySwal } from '@/utils/sweetAlert'

export default function Sales() {
  const [currentTab, setCurrentTab] = useState('tab2')
  const [clearForm, setClearForm] = useState(false)
  async function onSubmit(e: any) {
    try {
      e.preventDefault()
      console.log('submit')
      const files = e.target.clientValues.files
      console.log(files)
      const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name)
      }

      await api.post('/sales/import', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=---011000010111000001101001`,
          'Cache-Control': 'no-cache',
        },
      })
      e.target.reset()
      setClearForm(!clearForm)

      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Arquivo importado com sucesso!',
        showConfirmButton: false,
        timer: 1700,
      })
    } catch (error) {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro ao importar planilha, confira os dados e tente novamente',
      })
    }
  }
  return (
    <>
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Clientes
      </h1>

      <SettingsTabs currentTab={currentTab} setCurrentTab={setCurrentTab}>
        <form
          id="importClients"
          className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
          onSubmit={onSubmit}
        >
          <div className="mt-6 flex flex-col">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Importe suas vendas
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" form="importClients" variant="primary">
                  Save
                </Button>
              </div>
            </div>
          </div>
          <Tabs.TabsContent className="mt-6 flex w-full" value="tab2">
            <div className="grid gap-3 pt-5 lg:grid-cols-form">
              <label
                htmlFor="projects"
                className="flex flex-col text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-100"
              >
                Importar vendas
                <span className="text-sm font-normal text-zinc-500">
                  A extensão do arquivo deve ser do tipo xlsx
                </span>
              </label>
              <FileInput.Root
                id="projects"
                typeof="xlsx"
                multiple={false}
                clearInput={clearForm}
              >
                <FileInput.Trigger />
                <FileInput.FileList />
                <FileInput.Control
                  accept=".csv,.xls,.xlsx"
                  multiple={false}
                  name="clientValues"
                />
              </FileInput.Root>
            </div>
          </Tabs.TabsContent>
        </form>
      </SettingsTabs>
    </>
  )
}
