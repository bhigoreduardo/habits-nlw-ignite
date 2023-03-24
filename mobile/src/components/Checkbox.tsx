import { TouchableOpacity, View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

interface ICheckboxProps {
  title: string
}

export function Checkbox({ title }: ICheckboxProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-3 mt-1"
      activeOpacity={0.7}
    >
      <View className="w-8 h-8 bg-green-500 border-2 border-green-500 rounded-lg flex items-center justify-center">
        <Feather name="check" size={20} color={colors.white} />
      </View>

      <Text className="font-regular text-base text-white">{title}</Text>
    </TouchableOpacity>
  )
}