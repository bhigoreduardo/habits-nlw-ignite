import { View, Text } from 'react-native'

import Logo from '../assets/logo.svg'

export function Home() {
  return (
    <View className="flex-1 bg-background">
      <Logo />
      <Text className="text-zinc-50">Home</Text>
    </View>
  )
}