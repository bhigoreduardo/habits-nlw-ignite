import dayjs from 'dayjs'

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let _compareDate = firstDayOfTheYear

  while (_compareDate.isBefore(today)) {
    dates.push(_compareDate.toDate())
    _compareDate = _compareDate.add(1, 'day')
  }

  return dates
}