import { Plus } from 'phosphor-react'

import logoImage from '../assets/logo.svg'

export function Header() {
  return (
    <nav className="flex items-center justify-between">
      <img src={logoImage} alt="Habits" />

      <button
        type="button"
        className="flex items-center gap-3 font-semibold text-base text-white px-6 py-4 border border-violet-500 hover:border-violet-300 transition-colors rounded-lg focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
      >
        <Plus size={20} className="text-violet-500" />
        Novo hábito
      </button>
    </nav>
  )
}