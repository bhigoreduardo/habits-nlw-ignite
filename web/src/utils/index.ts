import { generateDatesFromYearBeginning } from './generate-dates-from-year-beginning'

export const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S',
]

const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7 // 18 weeks
export const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length
