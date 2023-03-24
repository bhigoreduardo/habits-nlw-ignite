import { View, Text, ScrollView } from 'react-native'

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import { Header } from '../components/Header'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesFromYearBeginning()

const minimunSummaryDates = 15 * 7
const amountOfDaysToFill = minimunSummaryDates - summaryDates.length

export function Home() {
  return (
    <View className="flex-1 bg-background">
      <Header />

      <View className="flex-row items-center mt-6 mb-2">
        {
          weekDays.map((weekDay, i) => {
            return (
              <Text
                key={`${weekDay}-${i}`}
                className="mx-1 font-bold text-xl text-zinc-400 text-center"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              >
                {weekDay}
              </Text>
            )
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {
            summaryDates.map((date, i) => {
              return (
                <HabitDay
                  key={date.toString()}
                />
              )
            })
          }
          {
            amountOfDaysToFill > 0 &&
            Array
              .from({ length: amountOfDaysToFill })
              .map((_, i) => {
                return (
                  <Text
                    key={i}
                    className="m-1 rounded-lg bg-zinc-900 border-2 border-zinc-800"
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  ></Text>
                )
              })
          }
        </View>
      </ScrollView>
    </View>
  )
}