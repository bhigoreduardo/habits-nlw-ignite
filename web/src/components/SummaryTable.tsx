import { weekDays, amountOfDaysToFill } from '../utils'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import { HabitDay } from './HabitDay'

const summaryDates = generateDatesFromYearBeginning()

export function SummaryTable() {
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
          summaryDates.map((item) => (
            <HabitDay
              key={item.toString()}
            />
          ))
        }
        {
          amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <HabitDay
              key={i}
            />
          ))
        }
      </div>
    </article>
  )
}