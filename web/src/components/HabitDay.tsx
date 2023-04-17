import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import dayjs from 'dayjs'

import { HabitsList } from './HabitsList'
import { Progress } from './Progress'

interface HabitDayProps {
  date: Date,
  defaultCompleted?: number,
  amount?: number,
}

export function HabitDay({ date, defaultCompleted = 0, amount = 0 }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const progress = amount > 0 ? Math.round(completed / amount * 100) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  const dayOfWeek = dayjs(date).format('dddd')
  const dayAndMonth = dayjs(date).format('DD/MM')

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('flex items-center justify-center h-10 w-10 border-2 rounded-lg', {
          'bg-zinc-900 border-zinc-800': progress === 0,
          'bg-violet-900 border-violet-700': progress > 0 && progress < 20,
          'bg-violet-800 border-violet-600': progress >= 20 && progress < 40,
          'bg-violet-700 border-violet-500': progress >= 40 && progress < 60,
          'bg-violet-600 border-violet-400': progress >= 60 && progress < 80,
          'bg-violet-500 border-violet-300': progress >= 80,
          'border-white border-2': isCurrentDay,
        })}
      />

      <Popover.Portal>
        <Popover.Content className="flex flex-col min-w-[320px] p-6 rounded-2xl bg-zinc-900">
          <span className="font-semibold text-zinc-400 text-base lowercase">{dayOfWeek}</span>
          <span className="font-extrabold text-white text-3xl leading-tight mt-2">{dayAndMonth}</span>

          <Progress progress={progress} />
          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow width={16} height={8} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}