'use client'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import { SettingsTabs } from './SettingsTabs'
import * as FileInput from '@/components/Form/FileInput'
import * as Tabs from '@radix-ui/react-tabs'
import api from '@/services/api'
import { MySwal } from '@/utils/sweetAlert'
import * as Input from '@/components/Form/Input'
import { useForm } from 'react-hook-form'

export default function Sales() {
  const [currentTab, setCurrentTab] = useState('tab1')
  const [clearForm, setClearForm] = useState(false)

  type Inputs = {
    courseName: string
    description: string
    dateSale: string
    value: number
    retainedValue: number
    paymentType: string
    status: string
    document: string
    seller_id: string
    avatar: string
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  async function onSubmit(data: Inputs) {
    try {
      console.log('submit')

      await api.post('/sales', data)
      setClearForm(!clearForm)

      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1700,
      })
    } catch (error) {
      MySwal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro ao cadastrar novo cliente, confira os dados e tente novamente',
      })
    }
  }
  async function onSubmitImport(e: any) {
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
        Vendas
      </h1>

      <SettingsTabs currentTab={currentTab} setCurrentTab={setCurrentTab}>
        <Tabs.TabsContent className="flex w-full" value="tab1">
          <form
            id="registerClients"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Cadastrar Venda
                </h2>
              </div>
            </div>
            <div className="grid gap-6 pt-4 lg:grid-cols-3">
              <label
                htmlFor="courseName"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Nome:
                <Input.Root className="mt-1">
                  <Input.Control
                    id="courseName"
                    placeholder="Nome"
                    type="text"
                    register={register}
                    name="courseName"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="description"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Email:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="description"
                    name="description"
                    placeholder="Email"
                    type="text"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="value"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Valor da venda:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="value"
                    name="value"
                    placeholder="CPF"
                    type="number"
                  />
                </Input.Root>
              </label>
            </div>
            <div className="grid gap-6 pt-4 lg:grid-cols-3">
              <label
                htmlFor="dateSale"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Data da venda:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="dateSale"
                    name="dateSale"
                    placeholder="Data da venda"
                    type="Date"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="retainedValue"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Valor retido:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="retainedValue"
                    name="retainedValue"
                    placeholder="Contato"
                    type="text"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="paymentType"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Tipo de pagamento:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="paymentType"
                    name="paymentType"
                    placeholder="Tipo de pagamento"
                    type="text"
                  />
                </Input.Root>
              </label>
            </div>
            <div className="grid gap-6 pt-4 lg:grid-cols-3">
              <label
                htmlFor="status"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Status:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="status"
                    name="status"
                    placeholder="Status da venda"
                    type="text"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="clientDocument"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Documento do cliente(CPF/CNPJ):
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="clientDocument"
                    name="clientDocument"
                    placeholder="CPF/CNPJ"
                    type="text"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="salary"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Salário:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="salary"
                    name="salary"
                    placeholder="R$ 0,00"
                    type="number"
                  />
                </Input.Root>
              </label>
            </div>

            <div className="flex flex-col justify-between lg:flex-row lg:items-center lg:justify-end">
              <div className="flex items-center gap-2 pt-4">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit" form="registerClients" variant="primary">
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </Tabs.TabsContent>
        <Tabs.TabsContent className="flex w-full" value="tab2">
          <form
            id="importClients"
            className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
            onSubmit={onSubmitImport}
          >
            <div className="flex flex-col">
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
          </form>
        </Tabs.TabsContent>
      </SettingsTabs>
    </>
  )
}
