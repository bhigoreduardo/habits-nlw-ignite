import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'

interface ICheckboxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export function Checkbox({ title, checked = false, ...rest }: ICheckboxProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center gap-3 mt-1"
      activeOpacity={0.7}
      {...rest}
    >
      {
        checked ? (
          <Animated.View
            className="w-8 h-8 bg-green-500 border-2 border-green-500 rounded-lg flex items-center justify-center"
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Feather name="check" size={20} color={colors.white} />
          </Animated.View>
        ) : (
          <View className="w-8 h-8 bg-zinc-900 border-2 border-zinc-800 rounded-lg"></View>
        )
      }

      <Text className="font-regular text-base text-white">{title}</Text>
    </TouchableOpacity>
  )
}