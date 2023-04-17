import { FormEvent, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

import { availableWeekDays } from '../utils/index'
import { api } from '../lib/axios'

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDays(weekDay: number, shouldRemoveToList: boolean) {
    if (shouldRemoveToList) setWeekDays(weekDays.filter((item) => item !== weekDay))
    else setWeekDays((prevState) => ([...prevState, weekDay]))
  }
  async function createNewHabit(event: FormEvent) {
    event.preventDefault()
    
    if (!title || weekDays.length === 0)
      return alert('Informe um título e selecione um dia da semana')
    
    await api.post('habits', {
      title,
      weekDays,
    }).then(() => {
      alert('Hábito cadastrado com sucesso!')
    })

    setTitle('')
    setWeekDays([])
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold text-white leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercício, dormir bem, etc..."
        className="text-white p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-white-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold text-white leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {
          availableWeekDays.map((item, i) => (
            <Checkbox.Root
              key={`${item}-${i}`}
              onCheckedChange={() => handleToggleWeekDays(i, weekDays.includes(i))}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(i)}
            >
              <div className="flex items-center justify-center h-8 w-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:rounded-lg">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className="text-base text-white leading-tight">{item}</span>
            </Checkbox.Root>
          ))
        }
      </div>

      <button
        type="submit"
        className="flex items-center justify-center font-semibold text-white gap-3 mt-6 p-4 rounded-lg bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-800"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}