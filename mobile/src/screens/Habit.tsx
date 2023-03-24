import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View, Text, Alert, ScrollView } from 'react-native'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { api } from '../lib/axios'
import { generateProgressPercent } from '../utils/generate-progress-percent'

import { BackButton } from '../components/BackButton'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'
import { Loading } from '../components/Loading'
import { HabitsEmpty } from '../components/HabitsEmpty'

interface IParams {
  date: string
}

interface IHabitInfoProps {
  possibleHabits: {
    id: string,
    title: string,
    created_at: string,
  }[],
  completedHabits: string[],
}

export function Habit() {
  const route = useRoute()
  const [habitInfo, setHabitInfo] = useState<IHabitInfoProps | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { date } = route.params as IParams
  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const progress = habitInfo?.possibleHabits.length
    ? generateProgressPercent(habitInfo?.completedHabits.length, habitInfo?.possibleHabits.length)
    : 0
  const isDayInPast = parsedDate.endOf('day').isBefore(new Date())

  useEffect(() => {
    getHabisList()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getHabisList = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/day', { params: { date } })
      setHabitInfo(response.data)
    } catch (err) {
      console.log(err)
      Alert.alert('Ops', 'Falha na conexão')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToogleHabit = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`)

      let _completedHabits: string[] = []
      if (habitInfo?.completedHabits.includes(habitId))
        _completedHabits = habitInfo?.completedHabits.filter((id) => id !== habitId)
      else
        _completedHabits = [...habitInfo!.completedHabits, habitId]

      setHabitInfo({
        possibleHabits: habitInfo!.possibleHabits,
        completedHabits: _completedHabits,
      })
    } catch (err) {
      console.log(err)
      Alert.alert('Ops', 'Falha na conexão, tente novamente')
    }
  }

  if (isLoading) return <Loading />

  return (
    <View className="flex-1 bg-background">
      <BackButton />

      <View className="mb-6">
        <Text className="font-semiBold text-base text-zinc-400">{dayOfWeek}</Text>
        <Text className="font-extraBold text-3xl text-white mt-2 mb-4">{dayAndMonth}</Text>
        <ProgressBar progress={progress} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {
          isDayInPast && (
            <Text className="text-white">
              Você não pode editar hábitos em datas antigas.
            </Text>
          )
        }
        <View className={clsx({ ['opacity-50']: isDayInPast })}>
          {
            habitInfo?.possibleHabits.map((habit) => {
              return (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  onPress={() => handleToogleHabit(habit.id)}
                  checked={habitInfo.completedHabits.includes(habit.id)}
                  disabled={isDayInPast}
                />
              )
            })
          }
          {
            (!habitInfo?.possibleHabits.length && !isDayInPast) && (
              <HabitsEmpty />
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}