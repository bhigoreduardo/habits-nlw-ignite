import { useState } from 'react'
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { api } from '../lib/axios'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'

const availableWeekDays = ['Domingo', 'Segunda', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex))
      setWeekDays((prevState) => prevState.filter((weekDay) => weekDay !== weekDayIndex))
    else
      setWeekDays((prevState) => [...prevState, weekDayIndex])
  }

  const handleCreateNewHabit = async () => {
    if (!title.trim() || weekDays.length === 0)
      return Alert.alert('Ops', 'Dados inválidos')

    try {
      await api.post('/habits', { title, weekDays })
      setTitle('')
      setWeekDays([])
      Alert.alert('Sucesso', 'Hábito cadastrado')
    } catch (err) {
      console.log(err)
      Alert.alert('Ops', 'Ocorreu um erro, tente novamente')
    }
  }

  return (
    <View className="flex-1 bg-background">
      <BackButton />

      <Text className="font-extraBold text-3xl text-white">Criar hábito</Text>

      <View className="mt-4 mb-6">
        <Text className="font-semiBold text-base text-zinc-300 mb-3">Qual o seu comprometimento</Text>
        <TextInput
          className="h-auto px-4 py-2 bg-zinc-900 border-2 border-zinc-800 rounded-lg text-base text-white focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className="font-semiBold text-base text-zinc-300 mt-4 mb-3">Qual a recorrência?</Text>
        {
          availableWeekDays.map((weekDay, i) => {
            return (
              <Checkbox
                key={`${weekDay}-${i}`}
                title={weekDay}
                onPress={() => handleToggleWeekDay(i)}
                checked={weekDays.includes(i)}
              />
            )
          })
        }
      </View>

      <TouchableOpacity
        className="flex-row items-center justify-center py-3 bg-green-600 rounded-lg"
        activeOpacity={0.7}
      >
        <Feather name="check" size={20} color={colors.white} />
        <Text
          className="font-semiBold text-base text-white ml-3"
          onPress={handleCreateNewHabit}
        >
          Confirmar
        </Text>
      </TouchableOpacity>
    </View>
  )
}