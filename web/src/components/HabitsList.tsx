import { useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import dayjs from 'dayjs'

import { api } from '../lib/axios'

interface HabitsListProps {
  date: Date,
  onCompletedChanged: (completed: number) => void
}

interface HabitsListInfo {
  possibleHabits: {
    id: string,
    title: string,
    created_at: string,
  }[],
  completedHabits: string[],
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsListInfo>()
  const isDayInPast = dayjs(date).endOf('day').isBefore(new Date())

  async function handleToggleHabit(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)
    let _completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      _completedHabits = habitsInfo!.completedHabits.filter((id) => id !== habitId)
    } else {
      _completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits: _completedHabits,
    })

    onCompletedChanged(_completedHabits.length)
  }

  useEffect(() => {
    api.get('/day', {
      params: {
        date: date.toISOString(),
      },
    }).then((res) => setHabitsInfo(res.data))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <article className="flex flex-col gap-3 mt-6">
      {
        habitsInfo?.possibleHabits.map((item) => (
          <Checkbox.Root
            key={item.id}
            className="flex gap-3 items-center mt-5 group focus:outline-none disabled:cursor-not-allowed"
            onCheckedChange={() => handleToggleHabit(item.id)}
            checked={habitsInfo.completedHabits.includes(item.id)}
            disabled={isDayInPast}
          >
            <div className="flex items-center justify-center h-8 w-8 border-2 bg-zinc-900 border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:rounded-lg">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-white text-xl leading-tight">
              {item.title}
            </span>
          </Checkbox.Root>
        ))
      }
    </article>
  )
}