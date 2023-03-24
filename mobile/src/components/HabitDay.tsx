import { TouchableOpacity, TouchableOpacityProps, Dimensions } from 'react-native'
import clsx from 'clsx'
import dayjs from 'dayjs'

import { generateProgressPercent } from '../utils/generate-progress-percent'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

// export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface IHabitDayProps extends TouchableOpacityProps {
  date: Date,
  completed?: number,
  amount?: number,
}

export function HabitDay({ date, completed = 0, amount = 0, ...rest }: IHabitDayProps) {
  const progress = generateProgressPercent(completed, amount)
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  return (
    <TouchableOpacity
      className={clsx('m-1 rounded-lg border-2', {
        ['bg-zinc-900 border-zinc-800']: progress === 0,
        ['bg-violet-900 border-violet-700']: progress > 0 && progress < 20,
        ['bg-violet-800 border-violet-600']: progress >= 20 && progress < 40,
        ['bg-violet-700 border-violet-500']: progress >= 40 && progress < 60,
        ['bg-violet-600 border-violet-400']: progress >= 60 && progress < 80,
        ['bg-violet-500 border-violet-400']: progress >= 80,
        ['border-white border-4']: isCurrentDay,
      })}
      activeOpacity={0.7}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      {...rest}
    ></TouchableOpacity>
  )
}