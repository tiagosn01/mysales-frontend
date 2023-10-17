/* eslint-disable @typescript-eslint/no-empty-interface */
export interface UsedSpaceWidgetProps {}

export function UsedSpaceWidget(props: UsedSpaceWidgetProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-orange-50 px-4 py-5 dark:bg-zinc-800">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium leading-5 text-orange-700 dark:text-zinc-100">
          Espaço utilizado
        </span>
        <span className="text-sm leading-5 text-orange-500 dark:text-zinc-400">
          Sua empresa ja utilizou 20% da capacidade.
        </span>
      </div>

      <div className="h-2 rounded-full bg-orange-100 dark:bg-zinc-600">
        <div className="h-2 w-1/4 rounded-full bg-orange-600 dark:bg-orange-400" />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          className="text-sm font-medium text-orange-500 dark:text-orange-300"
        >
          Esconder
        </button>

        <button
          type="button"
          className="text-sm font-medium text-orange-700 dark:text-zinc-300"
        >
          Upgrade de plano
        </button>
      </div>
    </div>
  )
}
