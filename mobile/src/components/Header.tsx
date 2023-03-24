import { View, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { useNavigation } from '@react-navigation/native'

import Logo from '../assets/logo.svg'

export function Header() {
  const { navigate } = useNavigation()

  return (
    <View className="flex-row items-center justify-between">
      <Logo width={116} height={64} />

      <TouchableOpacity
        className="flex-row items-center px-4 py-3 border border-violet-500 rounded-lg"
        activeOpacity={0.7}
        onPress={() => navigate('new')}
      >
        <Feather name="plus" size={20} color={colors.violet[500]} />
        <Text className="font-semiBold text-base text-white ml-3">Novo</Text>
      </TouchableOpacity>
    </View>
  )
}