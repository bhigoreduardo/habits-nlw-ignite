import { View, Text } from 'react-native'

import { BackButton } from '../components/BackButton'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'

export function Habit() {
  return (
    <View className="flex-1 bg-background">
      <BackButton />

      <View className="mb-6">
        <Text className="font-semiBold text-base text-zinc-400">terça-feira</Text>
        <Text className="font-extraBold text-3xl text-white mt-2 mb-4">03/01</Text>
        <ProgressBar />
      </View>

      <Checkbox title="2L de água" />
    </View>
  )
}