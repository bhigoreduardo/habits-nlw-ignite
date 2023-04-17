import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { api } from '../lib/axios'
import { weekDays, amountOfDaysToFill } from '../utils'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import { HabitDay } from './HabitDay'

const summaryDates = generateDatesFromYearBeginning()

type Summary = Array<{
  id: string,
  date: string,
  completed: number,
  amount: number,
}>

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('/summary').then((res) => {
      setSummary(res.data)
    })
  }, [])

  return (
    <article className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          weekDays.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center justify-center font-bold text-xl text-zinc-400 h-10 w-10">
              {item}
            </span>
          ))
        }
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {
          summary.length > 0 && summaryDates.map((item) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(item).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={item.toString()}
                date={item}
                defaultCompleted={dayInSummary?.completed}
                amount={dayInSummary?.amount}
              />
            )
          })
        }
        {
          amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <span
              key={i}
              className="flex items-center justify-center h-10 w-10 border-2 rounded-lg bg-zinc-900 border-zinc-800 cursor-not-allowed opacity-40"
            >
            </span>
          ))
        }
      </div>
    </article>
  )
}