import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import dayjs from 'dayjs'

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { api } from '../lib/axios'

import { Header } from '../components/Header'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { Loading } from '../components/Loading'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesFromYearBeginning()

const minimunSummaryDates = 15 * 7 // 15 weeks
const amountOfDaysToFill = minimunSummaryDates - summaryDates.length

type ISummary = {
  id: string;
  date: string;
  completed: number;
  amount: number;
}[]

export function Home() {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [summary, setSummary] = useState<ISummary | null>(null)

  async function getSummary() {
    try {
      setIsLoading(true)
      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (err) {
      console.log(err)
      Alert.alert('Ops', 'Falha na conexão')
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    getSummary()
  }, [])) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <Loading />

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
            summaryDates.map((date) => {
              const dayWithHabits = summary?.find((day) => {
                return dayjs(date).isSame(day.date, 'day')
              })

              return (
                <HabitDay
                  key={date.toString()}
                  date={date}
                  completed={dayWithHabits?.completed}
                  amount={dayWithHabits?.amount}
                  onPress={() => navigate('habit', { date: date.toISOString() })}
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
                    className="m-1 rounded-lg bg-zinc-900 border-2 border-zinc-800 opacity-40"
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