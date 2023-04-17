import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import { NewHabitForm } from './NewHabitForm'
import logoImage from '../assets/logo.svg'

export function Header() {
  return (
    <nav className="flex items-center justify-between w-full max-w-3xl mx-auto">
      <img src={logoImage} alt="Habits" />

      <Dialog.Root>
        <Dialog.Trigger>
          <button
            type="button"
            className="flex items-center gap-3 font-semibold text-base text-white px-6 py-4 border border-violet-500 hover:border-violet-300 transition-colors rounded-lg focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Plus size={20} className="text-violet-500" />
            Novo hábito
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-screen h-screen bg-background/80" />

          <Dialog.Content className="absolute top-1/2 left-1/2 -translate-x-12 -translate-y-1/2 w-full max-w-md p-7 bg-zinc-900 rounded-2xl">
            <Dialog.Close className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:rounded-lg">
              <X size={20} arial-label="Fechar" />
            </Dialog.Close>

            <Dialog.Title className="font-extrabold text-3xl text-white leading-tight">
              Criar hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  )
}