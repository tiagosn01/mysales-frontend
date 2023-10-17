'use client'
import { Button } from '@/components/Button'
import React, { useState } from 'react'
import { SettingsTabs } from './SettingsTabs'
import * as FileInput from '@/components/Form/FileInput'
import * as Input from '@/components/Form/Input'
import * as Tabs from '@radix-ui/react-tabs'
import api from '@/services/api'
import { MySwal } from '@/utils/sweetAlert'
import { useForm } from 'react-hook-form'

export default function Clients() {
  const [currentTab, setCurrentTab] = useState('tab1')
  const [clearForm, setClearForm] = useState(false)

  type Inputs = {
    name: string
    email: string
    phone: string
    secondPhone: string
    document: string
    profession: string
    salary: string
    zipCode: string
    country: string
    street: string
    number: number
    birthDate: Date
    state: string
    city: string
    neighborhood: string
    occupation: string
    course: string
    technicalCourse: boolean
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

      await api.post('/customers', data)
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

      await api.post('/customers/import', formData, {
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
        <Tabs.TabsContent className="flex w-full" value="tab1">
          <form
            id="registerClients"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                  Cadastrar cliente
                </h2>
              </div>
            </div>
            <div className="grid gap-6 pt-4 lg:grid-cols-3">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Nome:
                <Input.Root className="mt-1">
                  <Input.Control
                    id="name"
                    placeholder="Nome"
                    type="text"
                    register={register}
                    name="name"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Email:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="text"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="document"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                CPF:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="document"
                    name="document"
                    placeholder="CPF"
                    type="text"
                  />
                </Input.Root>
              </label>
            </div>
            <div className="grid gap-6 pt-4 lg:grid-cols-3">
              <label
                htmlFor="birthDate"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Data de Nascimento:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="birthDate"
                    name="birthDate"
                    placeholder="Idade"
                    type="Date"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Contato:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="phone"
                    name="phone"
                    placeholder="Contato"
                    type="text"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="secondPhone"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Contato secundário:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="secondPhone"
                    name="secondPhone"
                    placeholder="Contato secundário"
                    type="text"
                  />
                </Input.Root>
              </label>
            </div>
            <div className="grid gap-6 pt-4 lg:grid-cols-3">
              <label
                htmlFor="profession"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Profissão:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="profession"
                    name="profession"
                    placeholder="Profissão"
                    type="text"
                  />
                </Input.Root>
              </label>
              <label
                htmlFor="course"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
              >
                Curso:
                <Input.Root className="mt-1">
                  <Input.Control
                    register={register}
                    id="course"
                    name="course"
                    placeholder="Curso"
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
            <div>
              <div className="grid gap-6 pt-4 lg:grid-cols-4">
                <label
                  htmlFor="zipCode"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
                >
                  CEP:
                  <Input.Root className="mt-1">
                    <Input.Control
                      register={register}
                      id="zipCode"
                      name="zipCode"
                      placeholder="xxxxx-xxx"
                      type="text"
                    />
                  </Input.Root>
                </label>
                <label
                  htmlFor="country"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
                >
                  País:
                  <Input.Root className="mt-1">
                    <Input.Control
                      register={register}
                      id="country"
                      name="country"
                      placeholder="País"
                      type="text"
                    />
                  </Input.Root>
                </label>
                <label
                  htmlFor="state"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
                >
                  Estado:
                  <Input.Root className="mt-1">
                    <Input.Control
                      register={register}
                      id="state"
                      name="state"
                      placeholder="Estado"
                      type="text"
                    />
                  </Input.Root>
                </label>
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
                >
                  Cidade:
                  <Input.Root className="mt-1">
                    <Input.Control
                      register={register}
                      id="city"
                      name="city"
                      placeholder="Cidade"
                      type="text"
                    />
                  </Input.Root>
                </label>
              </div>
              <div className="grid gap-6 pt-4 lg:grid-cols-4">
                <label
                  htmlFor="street"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
                >
                  Rua:
                  <Input.Root className="mt-1">
                    <Input.Control
                      register={register}
                      id="street"
                      name="street"
                      placeholder="Rua"
                      type="text"
                    />
                  </Input.Root>
                </label>
                <label
                  htmlFor="number"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-100"
                >
                  Número:
                  <Input.Root className="mt-1">
                    <Input.Control
                      register={register}
                      id="number"
                      name="number"
                      placeholder="Rua"
                      type="number"
                    />
                  </Input.Root>
                </label>
              </div>
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
                    Importe seus clientes
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
                Importar clientes
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
